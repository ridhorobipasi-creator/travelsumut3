<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|string',
            'category' => 'sometimes|required|string',
            'date' => 'nullable|date',
            'read_time' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'status' => 'nullable|in:published,draft,archived',
            'views' => 'nullable|integer|min:0',
        ];
    }
}
