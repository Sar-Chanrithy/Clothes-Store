<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     * Ensures only authenticated admin users can access the route.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! (bool) $user->is_admin) {
            return response()->json([
                'message' => 'Forbidden. Administrator privileges required.',
            ], 403);
        }

        return $next($request);
    }
}
