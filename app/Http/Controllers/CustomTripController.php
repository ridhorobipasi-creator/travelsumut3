<?php

namespace App\Http\Controllers;

use App\Models\CustomTrip;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomTripController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = CustomTrip::query();
        if ($s = $request->query('search')) {
            $query->where('name', 'like', "%$s%")
                  ->orWhere('destination', 'like', "%$s%")
                  ->orWhere('email', 'like', "%$s%");
        }
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        return response()->json($query->orderByDesc('id')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'phone'       => 'nullable|string|max:30',
            'destination' => 'required|string|max:255',
            'date'        => 'nullable|date',
            'status'      => 'nullable|in:pending,confirmed,cancelled,completed',
            'notes'       => 'nullable|string|max:2000',
        ]);
        return response()->json(CustomTrip::create($data), 201);
    }

    public function update(Request $request, CustomTrip $customTrip): JsonResponse
    {
        $data = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'phone'       => 'nullable|string|max:30',
            'destination' => 'sometimes|required|string|max:255',
            'date'        => 'nullable|date',
            'status'      => 'nullable|in:pending,confirmed,cancelled,completed',
            'notes'       => 'nullable|string|max:2000',
        ]);
        $customTrip->update($data);
        return response()->json($customTrip);
    }

    public function destroy(CustomTrip $customTrip): JsonResponse
    {
        $customTrip->delete();
        return response()->json(['message' => 'deleted']);
    }
}
