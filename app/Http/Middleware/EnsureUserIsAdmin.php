<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the authenticated user is either an admin or sub-admin
        if (auth()->check() && in_array(auth()->user()->role, ['admin', 'assistant-admin'])) {
            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have access to this resource.');
    }
}
