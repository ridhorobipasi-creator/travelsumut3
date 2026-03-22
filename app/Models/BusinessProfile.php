<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessProfile extends Model
{
    protected $fillable = [
        'name', 'address', 'phone', 'email', 'website', 'logo',
        'description', 'social_media',
    ];

    protected function casts(): array
    {
        return [
            'social_media' => 'array',
        ];
    }

    /**
     * Ambil profil bisnis (selalu satu baris).
     */
    public static function getSingle(): self
    {
        return static::firstOrCreate([], [
            'name'    => 'SumutTour',
            'address' => '',
            'phone'   => '',
            'email'   => '',
            'website' => '',
        ]);
    }
}
