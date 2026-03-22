<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query()->select('id', 'name', 'email', 'is_admin', 'created_at');

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
            });
        }

        $perPage = $request->query('per_page', 15);
        return response()->json($query->orderByDesc('id')->paginate($perPage));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => ['required', Password::min(8)],
            'role'     => 'nullable|in:admin,user',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => ($data['role'] ?? 'user') === 'admin',
        ]);

        return response()->json($user->only('id', 'name', 'email', 'is_admin', 'created_at'), 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->only('id', 'name', 'email', 'is_admin', 'created_at'));
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => ['nullable', Password::min(8)],
            'role'     => 'nullable|in:admin,user',
        ]);

        $update = [];
        if (isset($data['name']))     $update['name']     = $data['name'];
        if (isset($data['email']))    $update['email']    = $data['email'];
        if (!empty($data['password'])) $update['password'] = Hash::make($data['password']);
        if (isset($data['role']))     $update['is_admin'] = $data['role'] === 'admin';

        $user->update($update);

        return response()->json($user->only('id', 'name', 'email', 'is_admin', 'created_at'));
    }

    public function destroy(User $user): JsonResponse
    {
        // Jangan hapus diri sendiri
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Tidak dapat menghapus akun sendiri.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'deleted']);
    }
}
