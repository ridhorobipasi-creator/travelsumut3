<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'name', 'email', 'rating', 'text', 'source', 'status',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
        ];
    }
}
