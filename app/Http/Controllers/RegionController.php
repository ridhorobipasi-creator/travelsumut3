<?php

namespace App\Http\Controllers;

use App\Models\Region;
use App\Models\RegionCity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Region::with('cities');

        if ($search = $request->query('search')) {
            $query->where('province', 'like', "%$search%");
        }

        $perPage = $request->query('per_page', 20);
        return response()->json($query->orderBy('province')->paginate($perPage));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'province' => 'required|string|max:255|unique:regions,province',
            'status'   => 'nullable|in:active,inactive',
            'cities'   => 'nullable|array',
            'cities.*' => 'string|max:255',
        ]);

        $region = Region::create([
            'province' => $data['province'],
            'status'   => $data['status'] ?? 'active',
        ]);

        if (!empty($data['cities'])) {
            foreach ($data['cities'] as $cityName) {
                $region->cities()->create(['name' => $cityName]);
            }
        }

        return response()->json($region->load('cities'), 201);
    }

    public function show(Region $region): JsonResponse
    {
        return response()->json($region->load('cities'));
    }

    public function showByProvince(string $province): Response
    {
        $region = Region::with('cities')->where('province', $province)->firstOrFail();
        return Inertia::render('AdminRegionDetail', ['region' => $region]);
    }

    public function update(Request $request, Region $region): JsonResponse
    {
        $data = $request->validate([
            'province' => 'sometimes|required|string|max:255|unique:regions,province,' . $region->id,
            'status'   => 'nullable|in:active,inactive',
        ]);

        $region->update($data);
        return response()->json($region->load('cities'));
    }

    public function destroy(Region $region): JsonResponse
    {
        $region->cities()->delete();
        $region->delete();
        return response()->json(['message' => 'deleted']);
    }

    // ── City management ──────────────────────────────────────────────────────

    public function storeCity(Request $request, Region $region): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $city = $region->cities()->create($data);
        return response()->json($city, 201);
    }

    public function destroyCity(Region $region, RegionCity $city): JsonResponse
    {
        abort_if($city->region_id !== $region->id, 404);
        $city->delete();
        return response()->json(['message' => 'deleted']);
    }
}
