<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    protected $fillable = [
        'title', 'location', 'province', 'duration', 'price', 'rating', 'image', 'category', 'pax', 'description', 'itinerary', 'includes', 'excludes', 'status'
    ];

    protected function casts(): array
    {
        return [
            'itinerary' => 'array',
            'includes' => 'array',
            'excludes' => 'array',
        ];
    }
}
