<?php

namespace App\Http\Controllers;

use App\Models\GalleryPhoto;
use Illuminate\Http\Request;

class GalleryPhotoController extends Controller
{
    /**
     * Upload gambar galeri.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $path = $request->file('image')->store('public/gallery');
        $url = asset(str_replace('public/', 'storage/', $path));
        return response()->json(['url' => $url, 'path' => $path]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GalleryPhoto::query();
        if ($search = $request->query('search')) {
            $query->where('alt', 'like', "%$search%")
                  ->orWhere('category', 'like', "%$search%") ;
        }
        $perPage = $request->query('per_page', 12);
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
    public function store(\App\Http\Requests\StoreGalleryPhotoRequest $request)
    {
        $data = $request->validated();
        $photo = GalleryPhoto::create($data);
        return response()->json($photo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(GalleryPhoto $galleryPhoto)
    {
        return response()->json($galleryPhoto);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GalleryPhoto $galleryPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\UpdateGalleryPhotoRequest $request, GalleryPhoto $galleryPhoto)
    {
        $data = $request->validated();
        $galleryPhoto->update($data);
        return response()->json($galleryPhoto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GalleryPhoto $galleryPhoto)
    {
        $galleryPhoto->delete();
        return response()->json(['message' => 'deleted']);
    }
}
