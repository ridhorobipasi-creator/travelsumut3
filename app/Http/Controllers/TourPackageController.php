<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\AdminLog;
use Illuminate\Http\Request;

class TourPackageController extends Controller
{
    /**
     * Upload gambar paket wisata.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $path = $request->file('image')->store('public/packages');
        $url = asset(str_replace('public/', 'storage/', $path));
        return response()->json(['url' => $url, 'path' => $path]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TourPackage::query();
        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('location', 'like', "%$search%")
                  ->orWhere('province', 'like', "%$search%")
                  ->orWhere('category', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%") ;
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
    public function store(\App\Http\Requests\StoreTourPackageRequest $request)
    {
        $data = $request->validated();
        $data['itinerary'] = isset($data['itinerary']) ? json_encode($data['itinerary']) : null;
        $data['includes'] = isset($data['includes']) ? json_encode($data['includes']) : null;
        $data['excludes'] = isset($data['excludes']) ? json_encode($data['excludes']) : null;
        $tourPackage = TourPackage::create($data);
        AdminLog::record('create', 'TourPackage', $tourPackage->id, "Tambah paket: {$tourPackage->title}");
        return response()->json($tourPackage, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TourPackage $tourPackage)
    {
        return response()->json($tourPackage);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TourPackage $tourPackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\UpdateTourPackageRequest $request, TourPackage $tourPackage)
    {
        $data = $request->validated();
        if(isset($data['itinerary'])) $data['itinerary'] = json_encode($data['itinerary']);
        if(isset($data['includes'])) $data['includes'] = json_encode($data['includes']);
        if(isset($data['excludes'])) $data['excludes'] = json_encode($data['excludes']);
        $tourPackage->update($data);
        AdminLog::record('update', 'TourPackage', $tourPackage->id, "Edit paket: {$tourPackage->title}");
        return response()->json($tourPackage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TourPackage $tourPackage)
    {
        AdminLog::record('delete', 'TourPackage', $tourPackage->id, "Hapus paket: {$tourPackage->title}");
        $tourPackage->delete();
        return response()->json(['message' => 'deleted']);
    }
}
