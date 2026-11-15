<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and assigned to the "api"
| middleware group. Enjoy building your API!
|
*/

// ==========================================
// 🔑 1. AUTHENTICATION & RATE LIMITING
// ==========================================
Route::middleware(['throttle:auth-throttle'])->group(function () {
    // Register customer
    Route::post('/register', function (Request $request) {
        // ✅ Input Validation
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|max:255',
            'phone' => 'nullable|string|max:40',
            'address' => 'nullable|array',
        ]);

        $data['email'] = strtolower(trim($data['email']));
        // 🔒 Password is automatically hashed by User model casts
        $user = User::create($data);

        // 🔑 Generate Sanctum Bearer Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
            'token' => $token,
        ], 201);
    });

    // Login customer / admin
    Route::post('/login', function (Request $request) {
        // ✅ Input Validation
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 💉 SQL Injection Protection via Eloquent parameter binding
        $user = User::where('email', strtolower(trim($credentials['email'])))->first();

        // 🔒 Constant-time secure password hash verification
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        // 🔑 Generate Sanctum Bearer Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user' => $user,
            'token' => $token,
        ]);
    });
});

// ==========================================
// 🛍️ 2. PUBLIC PRODUCT CATALOG
// ==========================================
Route::middleware(['throttle:api'])->group(function () {
    // List & search products (💉 SQL Injection Protection with PDO parameter binding)
    Route::get('/products', function (Request $request) {
        $validated = $request->validate([
            'search' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
        ]);

        return Product::query()
            ->when($validated['search'] ?? null, function ($q, $search) {
                // Escape LIKE wildcard characters
                $escaped = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $search);
                // In PostgreSQL, ILIKE provides case-insensitive matching securely
                $operator = DB::getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';
                return $q->where('name', $operator, "%{$escaped}%");
            })
            ->when($validated['category'] ?? null, function ($q, $category) {
                return $q->where('category', $category);
            })
            ->orderBy('id')
            ->paginate($validated['per_page'] ?? 24);
    });

    // View single product
    Route::get('/products/{product}', function (Product $product) {
        return response()->json($product);
    });
});

// ==========================================
// 👤 3. AUTHENTICATED USER ROUTES
// ==========================================
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    // Get current authenticated user
    Route::get('/me', function (Request $request) {
        return response()->json($request->user());
    });

    // Update profile (Mass-assignment guarded)
    Route::patch('/me', function (Request $request) {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:40',
            'address' => 'nullable|array',
        ]);

        $request->user()->update($validated);
        return response()->json($request->user()->fresh());
    });

    // Logout and revoke token
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    });

    // 🛡️ Authorization: User can only see their OWN orders
    Route::get('/orders', function (Request $request) {
        return Order::where('user_id', $request->user()->id)
            ->with('items')
            ->latest()
            ->paginate(20);
    });

    // 🛡️ Authorization: User can only see specific order if it belongs to them
    Route::get('/orders/{order}', function (Request $request, Order $order) {
        if ($order->user_id !== $request->user()->id && ! $request->user()->is_admin) {
            abort(403, 'Unauthorized access to this order.');
        }
        return response()->json($order->load('items'));
    });

    // Create Order with Transaction & Row Locking (Concurrency & Data Integrity)
    Route::post('/orders', function (Request $request) {
        $data = $request->validate([
            'shipping_address' => 'required|array',
            'shipping_address.name' => 'required|string|max:255',
            'shipping_address.address' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:255',
            'shipping_address.country' => 'required|string|max:100',
            'shipping_address.phone' => 'nullable|string|max:40',
            'shipping_method' => ['required', Rule::in(['standard', 'express', 'overnight'])],
            'items' => 'required|array|min:1|max:100',
            'items.*.product_id' => 'required|integer|distinct|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1|max:100',
            'items.*.size' => 'nullable|string|max:50',
            'items.*.color' => 'nullable|string|max:50',
        ]);

        $order = DB::transaction(function () use ($request, $data) {
            $ids = collect($data['items'])->pluck('product_id')->sort()->values();
            // Lock rows for update to prevent negative inventory race conditions
            $products = Product::whereIn('id', $ids)->orderBy('id')->lockForUpdate()->get()->keyBy('id');

            $subtotalCents = 0;
            foreach ($data['items'] as $item) {
                $product = $products->get($item['product_id']);
                if (! $product || $product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["Product '{$product?->name}' has insufficient stock."],
                    ]);
                }
                $subtotalCents += (int) round((float) $product->price * 100) * $item['quantity'];
            }

            $taxCents = (int) round($subtotalCents * 0.08);
            $shippingCents = match ($data['shipping_method']) {
                'express' => 1500,
                'overnight' => 3500,
                default => 0,
            };

            $order = Order::create([
                'user_id' => $request->user()->id,
                'status' => 'pending',
                'shipping_address' => $data['shipping_address'],
                'subtotal' => $subtotalCents / 100,
                'tax' => $taxCents / 100,
                'shipping' => $shippingCents / 100,
                'total' => ($subtotalCents + $taxCents + $shippingCents) / 100,
            ]);

            foreach ($data['items'] as $item) {
                $product = $products->get($item['product_id']);
                $order->items()->create([
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                    'size' => $item['size'] ?? null,
                    'color' => $item['color'] ?? null,
                ]);
                $product->decrement('stock', $item['quantity']);
            }

            return $order->load('items');
        });

        return response()->json($order, 201);
    });

    // ==========================================
    // 🛡️ 4. ADMIN-ONLY ROUTES
    // ==========================================
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        // View all customer orders
        Route::get('/orders', function () {
            return Order::with(['items', 'user'])->latest()->paginate(25);
        });

        // Update order status
        Route::patch('/orders/{order}/status', function (Request $request, Order $order) {
            $validated = $request->validate([
                'status' => ['required', Rule::in(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])],
            ]);

            $order->update($validated);
            return response()->json($order);
        });

        // Create product
        Route::post('/products', function (Request $request) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'sku' => 'required|string|max:255|unique:products,sku',
                'category' => 'required|string|max:255',
                'price' => 'required|numeric|min:0|max:99999999',
                'stock' => 'required|integer|min:0',
                'description' => 'nullable|string',
                'image' => 'nullable|string',
                'details' => 'nullable|array',
            ]);

            return response()->json(Product::create($validated), 201);
        });

        // Update product
        Route::put('/products/{product}', function (Request $request, Product $product) {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'sku' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('products')->ignore($product->id)],
                'category' => 'sometimes|required|string|max:255',
                'price' => 'sometimes|required|numeric|min:0|max:99999999',
                'stock' => 'sometimes|required|integer|min:0',
                'description' => 'nullable|string',
                'image' => 'nullable|string',
                'details' => 'nullable|array',
            ]);

            $product->update($validated);
            return response()->json($product->fresh());
        });

        // Delete product
        Route::delete('/products/{product}', function (Product $product) {
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully.',
            ]);
        });
    });
});
