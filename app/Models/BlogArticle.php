<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogArticle extends Model
{
    protected $fillable = [
        'title', 'excerpt', 'image', 'category', 'date', 'read_time', 'content', 'status', 'views'
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }
}
