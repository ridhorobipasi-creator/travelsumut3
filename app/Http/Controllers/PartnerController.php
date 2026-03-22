<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Partner::query();
        if ($s = $request->query('search')) {
            $query->where('name', 'like', "%$s%")->orWhere('email', 'like', "%$s%");
        }
        return response()->json($query->orderByDesc('id')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'nullable|email|max:255',
            'phone'   => 'nullable|string|max:30',
            'address' => 'nullable|string|max:500',
            'logo'    => 'nullable|string|max:2048',
        ]);
        return response()->json(Partner::create($data), 201);
    }

    public function update(Request $request, Partner $partner): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'nullable|email|max:255',
            'phone'   => 'nullable|string|max:30',
            'address' => 'nullable|string|max:500',
            'logo'    => 'nullable|string|max:2048',
        ]);
        $partner->update($data);
        return response()->json($partner);
    }

    public function destroy(Partner $partner): JsonResponse
    {
        $partner->delete();
        return response()->json(['message' => 'deleted']);
    }

    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate(['logo' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048']);
        $path = $request->file('logo')->store('public/partners');
        return response()->json(['url' => asset(str_replace('public/', 'storage/', $path))]);
    }
}
