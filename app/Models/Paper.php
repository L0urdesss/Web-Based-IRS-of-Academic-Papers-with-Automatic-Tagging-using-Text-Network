<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Paper extends Model
{
    use HasFactory;

    protected $guarded =[];

    protected $casts = [
        'author' => 'array',
        'file' => 'string', // Assuming 'file' attribute is a string
    ];

    // Define an accessor to manipulate the value when accessed
    public function getFileAttribute($value)
    {
        return $value ? Storage::url($value) : '';
    }
    
    public function requestpapers(): HasMany
    {
        return $this->hasMany(RequestPaper::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    
}
