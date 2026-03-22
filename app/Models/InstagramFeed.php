<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstagramFeed extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_url',
        'caption',
        'link',
        'is_active',
    ];
}
