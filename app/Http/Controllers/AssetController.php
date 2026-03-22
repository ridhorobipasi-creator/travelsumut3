<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Asset::query();
        if ($s = $request->query('search')) {
            $query->where('name', 'like', "%$s%")->orWhere('type', 'like', "%$s%");
        }
        return response()->json($query->orderByDesc('id')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'type'    => 'nullable|string|max:100',
            'license' => 'nullable|string|max:100',
            'status'  => 'nullable|string|max:50',
            'image'   => 'nullable|string|max:2048',
        ]);
        return response()->json(Asset::create($data), 201);
    }

    public function update(Request $request, Asset $asset): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'type'    => 'nullable|string|max:100',
            'license' => 'nullable|string|max:100',
            'status'  => 'nullable|string|max:50',
            'image'   => 'nullable|string|max:2048',
        ]);
        $asset->update($data);
        return response()->json($asset);
    }

    public function destroy(Asset $asset): JsonResponse
    {
        $asset->delete();
        return response()->json(['message' => 'deleted']);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate(['image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048']);
        $path = $request->file('image')->store('public/assets');
        return response()->json(['url' => asset(str_replace('public/', 'storage/', $path))]);
    }
}
