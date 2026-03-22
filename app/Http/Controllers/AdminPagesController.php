<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPagesController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();
        if ($request->search) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }
        $pages = $query->orderByDesc('id')->paginate($request->per_page ?? 10);
        return response()->json($pages);
    }

    public function show($id)
    {
        return response()->json(Page::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:pages,slug',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $page = Page::create($data);
        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:pages,slug,'.$id,
            'content' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $page = Page::findOrFail($id);
        $page->update($data);
        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();
        return response()->json(['success' => true]);
    }
}
