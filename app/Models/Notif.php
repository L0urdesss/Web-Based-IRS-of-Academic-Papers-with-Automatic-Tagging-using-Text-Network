<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notif extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'count',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'id');
    }

}
