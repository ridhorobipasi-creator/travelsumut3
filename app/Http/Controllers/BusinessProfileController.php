<?php

namespace App\Http\Controllers;

use App\Models\BusinessProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BusinessProfileController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(BusinessProfile::getSingle());
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'address'      => 'required|string|max:500',
            'phone'        => 'required|string|max:30',
            'email'        => 'required|email|max:255',
            'website'      => 'nullable|string|max:255',
            'logo'         => 'nullable|string|max:2048',
            'description'  => 'nullable|string|max:2000',
            'social_media' => 'nullable|array',
        ]);

        $profile = BusinessProfile::getSingle();
        $profile->update($data);

        return response()->json($profile);
    }
}
