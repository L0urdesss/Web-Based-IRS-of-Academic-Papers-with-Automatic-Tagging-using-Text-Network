<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'tup_id',
        'password',
        'email_verified_at',
        'role', // Add role here
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if the user is an assistant-admin.
     */
    public function isAssistantAdmin(): bool
    {
        return $this->role === 'assistant-admin'; // Check if role is assistant-admin
    }

    /**
     * The papers requested by the user.
     */
    public function requestpapers(): HasMany
    {
        return $this->hasMany(RequestPaper::class);
    }

    /**
     * Get the student associated with the user.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'tup_id');
    }

    /**
     * The notifications for the user.
     */
    public function notif(): HasOne
    {
        return $this->hasOne(Notif::class);
    }

    /**
     * Ensure that if the role is empty or NULL, it defaults to 'user'.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->role)) {
                $user->role = 'user';  // Default to 'user' only when creating a user
            }
        });
    }

}
