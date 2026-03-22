<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Review::query();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('text', 'like', "%$search%")
                  ->orWhere('source', 'like', "%$search%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $perPage = $request->query('per_page', 15);
        return response()->json($query->orderByDesc('id')->paginate($perPage));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => 'nullable|email|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'text'   => 'required|string|max:2000',
            'source' => 'nullable|string|max:100',
            'status' => 'nullable|in:published,pending,hidden',
        ]);

        return response()->json(Review::create($data), 201);
    }

    public function update(Request $request, Review $review): JsonResponse
    {
        $data = $request->validate([
            'name'   => 'sometimes|required|string|max:255',
            'email'  => 'nullable|email|max:255',
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'text'   => 'sometimes|required|string|max:2000',
            'source' => 'nullable|string|max:100',
            'status' => 'nullable|in:published,pending,hidden',
        ]);

        $review->update($data);
        return response()->json($review);
    }

    public function destroy(Review $review): JsonResponse
    {
        $review->delete();
        return response()->json(['message' => 'deleted']);
    }
}
