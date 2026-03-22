<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\AdminLog;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Upload gambar kendaraan.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $path = $request->file('image')->store('public/vehicles');
        $url = asset(str_replace('public/', 'storage/', $path));
        return response()->json(['url' => $url, 'path' => $path]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Vehicle::query();
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('type', 'like', "%$search%")
                  ->orWhere('fuel', 'like', "%$search%")
                  ->orWhere('transmission', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%");
            });
        }
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        $perPage = $request->query('per_page', 10);
        $data = $query->orderByDesc('id')->paginate($perPage);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(\App\Http\Requests\StoreVehicleRequest $request)
    {
        $data = $request->validated();
        if(isset($data['features'])) $data['features'] = json_encode($data['features']);
        $vehicle = Vehicle::create($data);
        AdminLog::record('create', 'Vehicle', $vehicle->id, "Tambah kendaraan: {$vehicle->name}");
        return response()->json($vehicle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return response()->json($vehicle);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();
        if(isset($data['features'])) $data['features'] = json_encode($data['features']);
        $vehicle->update($data);
        AdminLog::record('update', 'Vehicle', $vehicle->id, "Edit kendaraan: {$vehicle->name}");
        return response()->json($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        AdminLog::record('delete', 'Vehicle', $vehicle->id, "Hapus kendaraan: {$vehicle->name}");
        $vehicle->delete();
        return response()->json(['message' => 'deleted']);
    }
}
