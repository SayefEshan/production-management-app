<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /**
         * @var \App\Models\User $authUser
         */
        $authUser = Auth::user();
        // Check if the user is authenticated and has the 'admin' role
        if (!Auth::check() || !$authUser->hasRole("admin")) {
            // If not, redirect to the home page or show an error
            return redirect()->route('dashboard')->with('error', 'You do not have access to this page.');
        }
        return $next($request);
    }
}
