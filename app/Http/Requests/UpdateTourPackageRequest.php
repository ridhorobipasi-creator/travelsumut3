<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTourPackageRequest extends FormRequest
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
            'location' => 'sometimes|required|string',
            'province' => 'sometimes|required|string',
            'duration' => 'sometimes|required|string',
            'price' => 'sometimes|required|integer',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'nullable|string|max:2048',
            'category' => 'sometimes|required|string|max:100',
            'pax' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'itinerary' => 'nullable|array',
            'itinerary.*.day' => 'required|integer|min:1',
            'itinerary.*.title' => 'required|string',
            'itinerary.*.activities' => 'nullable|array',
            'itinerary.*.activities.*' => 'string',
            'includes' => 'nullable|array',
            'includes.*' => 'string',
            'excludes' => 'nullable|array',
            'excludes.*' => 'string',
            'status' => 'nullable|in:active,draft,archived',
        ];
    }
}
