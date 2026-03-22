<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Hotel::query();
        if ($s = $request->query('search')) {
            $query->where('name', 'like', "%$s%")
                  ->orWhere('city', 'like', "%$s%")
                  ->orWhere('province', 'like', "%$s%");
        }
        return response()->json($query->orderByDesc('id')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'address'  => 'nullable|string|max:500',
            'city'     => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'phone'    => 'nullable|string|max:30',
            'image'    => 'nullable|string|max:2048',
        ]);
        return response()->json(Hotel::create($data), 201);
    }

    public function update(Request $request, Hotel $hotel): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'address'  => 'nullable|string|max:500',
            'city'     => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'phone'    => 'nullable|string|max:30',
            'image'    => 'nullable|string|max:2048',
        ]);
        $hotel->update($data);
        return response()->json($hotel);
    }

    public function destroy(Hotel $hotel): JsonResponse
    {
        $hotel->delete();
        return response()->json(['message' => 'deleted']);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate(['image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048']);
        $path = $request->file('image')->store('public/hotels');
        return response()->json(['url' => asset(str_replace('public/', 'storage/', $path))]);
    }
}
