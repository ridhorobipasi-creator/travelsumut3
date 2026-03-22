<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
            'name' => 'required|string',
            'type' => 'required|string',
            'seats' => 'required|integer',
            'fuel' => 'required|string',
            'transmission' => 'required|string',
            'price_per_day' => 'required|integer',
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
