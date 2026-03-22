<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:30',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $contact = Contact::create($data);

        return response()->json(['message' => 'Pesan berhasil dikirim.', 'id' => $contact->id], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Contact::query();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('subject', 'like', "%$search%")
                  ->orWhere('message', 'like', "%$search%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $perPage = $request->query('per_page', 15);
        $data = $query->orderByDesc('id')->paginate($perPage);

        return response()->json($data);
    }

    public function show(Contact $contact): JsonResponse
    {
        // Tandai sebagai sudah dibaca
        if ($contact->status === 'unread') {
            $contact->update(['status' => 'read']);
        }

        return response()->json($contact);
    }

    public function update(Request $request, Contact $contact): JsonResponse
    {
        $data = $request->validate([
            'status' => 'required|in:unread,read,replied',
            'notes'  => 'nullable|string|max:1000',
        ]);

        $contact->update($data);

        return response()->json($contact);
    }

    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json(['message' => 'deleted']);
    }
}
