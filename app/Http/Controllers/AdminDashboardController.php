<?php

namespace App\Http\Controllers;

use App\Models\BlogArticle;
use App\Models\GalleryPhoto;
use App\Models\TourPackage;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'totalPackages' => TourPackage::count(),
            'activePackages' => TourPackage::where('status', 'active')->count(),
            'totalVehicles' => Vehicle::count(),
            'availableVehicles' => Vehicle::where('status', 'available')->count(),
            'totalArticles' => BlogArticle::count(),
            'publishedArticles' => BlogArticle::where('status', 'published')->count(),
            'totalPhotos' => GalleryPhoto::count(),
        ];

        $recentPackages = TourPackage::orderByDesc('id')
            ->limit(5)
            ->get(['id', 'title', 'category', 'price', 'status', 'created_at']);

        $recentArticles = BlogArticle::orderByDesc('id')
            ->limit(5)
            ->get(['id', 'title', 'category', 'status', 'created_at']);

        return Inertia::render('AdminDashboard', [
            'stats' => $stats,
            'recentPackages' => $recentPackages,
            'recentArticles' => $recentArticles,
        ]);
    }
}
