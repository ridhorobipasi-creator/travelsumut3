<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
            'name' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'seats' => 'sometimes|required|integer',
            'fuel' => 'sometimes|required|string',
            'transmission' => 'sometimes|required|string',
            'price_per_day' => 'sometimes|required|integer',
            'rating' => 'nullable|numeric|min:0|max:5',
            'available' => 'nullable|boolean',
            'image' => 'nullable|string|max:2048',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'status' => 'nullable|in:available,rented,maintenance',
        ];
    }
}
