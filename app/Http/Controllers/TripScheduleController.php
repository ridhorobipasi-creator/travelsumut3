<?php

namespace App\Http\Controllers;

use App\Models\TripSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TripScheduleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = TripSchedule::query();
        if ($s = $request->query('search')) {
            $query->where('title', 'like', "%$s%")->orWhere('location', 'like', "%$s%");
        }
        return response()->json($query->orderBy('date')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'    => 'required|string|max:255',
            'date'     => 'required|date',
            'location' => 'nullable|string|max:255',
            'status'   => 'nullable|in:scheduled,ongoing,completed,cancelled',
        ]);
        return response()->json(TripSchedule::create($data), 201);
    }

    public function update(Request $request, TripSchedule $tripSchedule): JsonResponse
    {
        $data = $request->validate([
            'title'    => 'sometimes|required|string|max:255',
            'date'     => 'sometimes|required|date',
            'location' => 'nullable|string|max:255',
            'status'   => 'nullable|in:scheduled,ongoing,completed,cancelled',
        ]);
        $tripSchedule->update($data);
        return response()->json($tripSchedule);
    }

    public function destroy(TripSchedule $tripSchedule): JsonResponse
    {
        $tripSchedule->delete();
        return response()->json(['message' => 'deleted']);
    }
}
