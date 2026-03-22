<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    private array $allowedKeys = [
        // General
        'site_name', 'tagline', 'contact_email', 'whatsapp', 'office_address',
        // SEO
        'meta_description', 'meta_keywords', 'google_analytics_id', 'facebook_pixel_id',
        // Language & Currency
        'language', 'currency', 'currency_symbol',
        // Email
        'smtp_host', 'smtp_port', 'smtp_user', 'smtp_from_name',
    ];

    public function index(): Response
    {
        $settings = Setting::getMany($this->allowedKeys);
        return Inertia::render('AdminSettings', ['settings' => $settings]);
    }

    public function getData(): JsonResponse
    {
        return response()->json(Setting::getMany($this->allowedKeys));
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'settings'   => 'required|array',
            'settings.*' => 'nullable|string|max:2000',
        ]);

        $filtered = array_intersect_key($data['settings'], array_flip($this->allowedKeys));
        Setting::setMany($filtered);

        return response()->json(['message' => 'Pengaturan berhasil disimpan.', 'settings' => Setting::getMany($this->allowedKeys)]);
    }
}
