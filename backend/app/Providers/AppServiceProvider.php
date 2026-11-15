<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 🔐 HTTPS Enforcement when configured or in production
        if ($this->app->environment('production') || env('FORCE_HTTPS', false)) {
            URL::forceScheme('https');
        }

        // 🚦 Global API Rate Limiting: 60 requests/minute per authenticated user or IP
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(
                $request->user()?->id ?: $request->ip()
            );
        });

        // 🚦 Strict Rate Limiting for Auth (Login / Register): 5 requests/minute to prevent brute-force attacks
        RateLimiter::for('auth-throttle', function (Request $request) {
            $identifier = ($request->input('email') ?: 'guest').'|'.$request->ip();
            return Limit::perMinute(5)->by($identifier)->response(function () {
                return response()->json([
                    'message' => 'Too many attempts. Please wait 1 minute before trying again.',
                ], 429);
            });
        });
    }
}
