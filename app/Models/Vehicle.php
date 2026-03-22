<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'name', 'type', 'seats', 'fuel', 'transmission', 'price_per_day', 'rating', 'available', 'image', 'description', 'features', 'status'
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'available' => 'boolean',
        ];
    }
}
