<?php

namespace App\Http\Middleware;

use App\Models\Notif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $authUser = null;
        $notifCount = 0;

        // Check if user is authenticated
        if ($user = Auth::user()) {
            // Load the user's data only if user is authenticated
            $authUser = $user->load(['student', 'notif']);
            $notif = Notif::where('user_id', $user->id)->first();
            $notifCount = $notif ? $notif->count : 0;
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $authUser,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'urlPrev' => function() {
                if (url()->previous() !== route('login') && url()->previous() !== '' && url()->previous() !== url()->current()) {
                    return url()->previous();
                } else {
                    return 'empty'; // used in javascript to disable back button behavior
                }
            },
            'notifCount' => $notifCount,
        ]);
    }
}
