<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;
    
    public $incrementing = false;

    protected $fillable = [
        'name', 'email', 'course', 'college'
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'id');
    }

    protected static function booted()
    {
        // Generate a custom ID before creating a new student if role is not admin
        static::creating(function ($student) {
            if ($student->role !== 'admin') {
                do {
                    $student->id = 'TUPM-21-' . str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT);
                } while (self::where('id', $student->id)->exists());
            }
        });
    }

}
