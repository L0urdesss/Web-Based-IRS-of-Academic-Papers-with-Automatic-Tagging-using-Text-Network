<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestPaper extends Model
{
    use HasFactory;
    protected $guarded =[

    ];

    protected $fillable = [
        'purpose',
        'user_id',
        'paper_id',
    ];

    public function paper()
    {
        return $this->belongsTo(Paper::class, 'paper_id');
    }

}
