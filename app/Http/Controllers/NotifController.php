<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notif;

class NotifController extends Controller
{
    public function count()
    {
        $user = auth()->user();
        $notif = Notif::where('user_id', $user->id)->first();
        dd($notif);
        return response()->json(['count' => $notif->count]);
    }
}
