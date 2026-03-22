<?php

namespace App\Http\Controllers;

use App\Models\AdminLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AdminLog::with('user:id,name,email')->orderByDesc('id');

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', "%$search%")
                  ->orWhere('model', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%");
            });
        }

        if ($action = $request->query('action')) {
            $query->where('action', $action);
        }

        $perPage = $request->query('per_page', 20);
        $data = $query->paginate($perPage);

        return response()->json($data);
    }
}
