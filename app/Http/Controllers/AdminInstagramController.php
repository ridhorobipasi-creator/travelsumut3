<?php

namespace App\Http\Controllers;

use App\Models\InstagramFeed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminInstagramController extends Controller
{
    public function index(Request $request)
    {
        $query = InstagramFeed::query();
        if ($request->search) {
            $query->where('caption', 'like', '%'.$request->search.'%');
        }
        $feeds = $query->orderByDesc('id')->paginate($request->per_page ?? 10);
        return response()->json($feeds);
    }

    public function show($id)
    {
        return response()->json(InstagramFeed::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image_url' => 'required|string',
            'caption' => 'nullable|string',
            'link' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $feed = InstagramFeed::create($data);
        return response()->json($feed, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'image_url' => 'required|string',
            'caption' => 'nullable|string',
            'link' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $feed = InstagramFeed::findOrFail($id);
        $feed->update($data);
        return response()->json($feed);
    }

    public function destroy($id)
    {
        $feed = InstagramFeed::findOrFail($id);
        $feed->delete();
        return response()->json(['success' => true]);
    }
}
