<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        // Periksa apakah pengguna sudah login
        if (!Auth::check()) {
            return redirect('/login');
        }

        // Periksa apakah pengguna memiliki role yang sesuai
        if (Auth::user()->role !== $role) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
