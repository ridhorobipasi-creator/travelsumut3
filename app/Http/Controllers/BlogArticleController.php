<?php

namespace App\Http\Controllers;

use App\Models\BlogArticle;
use App\Models\AdminLog;
use Illuminate\Http\Request;

class BlogArticleController extends Controller
{
    /**
     * Upload gambar blog.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $path = $request->file('image')->store('public/blog');
        $url = asset(str_replace('public/', 'storage/', $path));
        return response()->json(['url' => $url, 'path' => $path]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BlogArticle::query();
        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('category', 'like', "%$search%")
                  ->orWhere('excerpt', 'like', "%$search%")
                  ->orWhere('content', 'like', "%$search%") ;
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
    public function store(\App\Http\Requests\StoreBlogArticleRequest $request)
    {
        $data = $request->validated();
        $blog = BlogArticle::create($data);
        AdminLog::record('create', 'BlogArticle', $blog->id, "Tambah artikel: {$blog->title}");
        return response()->json($blog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogArticle $blogArticle)
    {
        return response()->json($blogArticle);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogArticle $blogArticle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\App\Http\Requests\UpdateBlogArticleRequest $request, BlogArticle $blogArticle)
    {
        $data = $request->validated();
        $blogArticle->update($data);
        AdminLog::record('update', 'BlogArticle', $blogArticle->id, "Edit artikel: {$blogArticle->title}");
        return response()->json($blogArticle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogArticle $blogArticle)
    {
        AdminLog::record('delete', 'BlogArticle', $blogArticle->id, "Hapus artikel: {$blogArticle->title}");
        $blogArticle->delete();
        return response()->json(['message' => 'deleted']);
    }
}
