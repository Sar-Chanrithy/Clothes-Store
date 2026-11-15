<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Products
        $productsJsonPath = database_path('products.json');
        if (file_exists($productsJsonPath)) {
            $json = file_get_contents($productsJsonPath);
            $products = json_decode(ltrim($json, "\xEF\xBB\xBF"), true, 512, JSON_THROW_ON_ERROR);
            foreach ($products as $product) {
                Product::firstOrCreate(['sku' => $product['sku']], $product);
            }
        }

        // Align Postgres sequence for auto-increment IDs
        if (DB::getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('products', 'id'), GREATEST(COALESCE((SELECT MAX(id) FROM products), 1), 1))");
        }

        // 2. 🛡️ Seed Admin Account
        $admin = User::firstOrCreate(
            ['email' => 'admin@rithy.com'],
            [
                'name' => 'Store Administrator',
                'password' => 'Admin@123456',
                'phone' => '+85512345678',
                'address' => [
                    'street' => '123 Monivong Blvd',
                    'city' => 'Phnom Penh',
                    'country' => 'Cambodia',
                ],
            ]
        );
        $admin->is_admin = true;
        $admin->save();

        // 3. 👤 Seed Customer Account
        $customer = User::firstOrCreate(
            ['email' => 'customer@rithy.com'],
            [
                'name' => 'John Customer',
                'password' => 'Customer@123456',
                'phone' => '+85598765432',
                'address' => [
                    'street' => '456 Russian Federation Blvd',
                    'city' => 'Phnom Penh',
                    'country' => 'Cambodia',
                ],
            ]
        );
        $customer->is_admin = false;
        $customer->save();
    }
}
