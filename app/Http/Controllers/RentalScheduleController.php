<?php

namespace App\Http\Controllers;

use App\Models\RentalSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RentalScheduleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = RentalSchedule::query();
        if ($s = $request->query('search')) {
            $query->where('title', 'like', "%$s%")->orWhere('vehicle', 'like', "%$s%");
        }
        return response()->json($query->orderBy('date')->paginate($request->query('per_page', 20)));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'   => 'required|string|max:255',
            'date'    => 'required|date',
            'vehicle' => 'nullable|string|max:255',
            'status'  => 'nullable|in:booked,ongoing,completed,cancelled',
        ]);
        return response()->json(RentalSchedule::create($data), 201);
    }

    public function update(Request $request, RentalSchedule $rentalSchedule): JsonResponse
    {
        $data = $request->validate([
            'title'   => 'sometimes|required|string|max:255',
            'date'    => 'sometimes|required|date',
            'vehicle' => 'nullable|string|max:255',
            'status'  => 'nullable|in:booked,ongoing,completed,cancelled',
        ]);
        $rentalSchedule->update($data);
        return response()->json($rentalSchedule);
    }

    public function destroy(RentalSchedule $rentalSchedule): JsonResponse
    {
        $rentalSchedule->delete();
        return response()->json(['message' => 'deleted']);
    }
}
