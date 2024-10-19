<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tag extends Model
{
    use HasFactory;
    
    public $incrementing = false;

    protected $fillable = [
        'name',
    ];

    public function papers()
    {
        return $this->belongsToMany(Paper::class);
    }

}