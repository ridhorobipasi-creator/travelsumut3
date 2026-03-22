<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\BlogArticleController;
use App\Http\Controllers\BusinessProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomTripController;
use App\Http\Controllers\GalleryPhotoController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\RentalScheduleController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\TripScheduleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── Public Pages ────────────────────────────────────────────────────────────
Route::get('/', [PublicPageController::class, 'home']);
Route::get('/paket-wisata', [PublicPageController::class, 'paketWisata']);
Route::get('/paket-wisata/{id}', [PublicPageController::class, 'paketWisataDetail'])->name('paket.detail');
Route::get('/rental-mobil', [PublicPageController::class, 'rentalMobil']);
Route::get('/rental-mobil/{id}', [PublicPageController::class, 'rentalMobilDetail'])->name('rental.detail');
Route::get('/galeri', [PublicPageController::class, 'galeri']);
Route::get('/blog', [PublicPageController::class, 'blog']);
Route::get('/blog/{id}', [PublicPageController::class, 'blogDetail'])->name('blog.detail');

// ─── Public Contact Form ──────────────────────────────────────────────────────
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// ─── Admin Auth ───────────────────────────────────────────────────────────────
Route::get('/secret-admin-login', [AdminAuthController::class, 'create'])->name('admin.login');
Route::post('/secret-admin-login', [AdminAuthController::class, 'store']);
Route::post('/admin-logout', [AdminAuthController::class, 'destroy'])->name('admin.logout');

// ─── Admin Panel ──────────────────────────────────────────────────────────────
Route::group([
    'middleware' => ['auth', 'admin.auth'],
    'prefix'     => 'admin',
], function () {

    // Dashboard dengan statistik nyata
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings');
    Route::get('/settings/data', [SettingController::class, 'getData'])->name('admin.settings.data');
    Route::put('/settings/data', [SettingController::class, 'update'])->name('admin.settings.update');

    // Static admin pages
    Route::get('/order-report', fn () => Inertia::render('AdminOrderReport'))->name('admin.orderreport');
    Route::get('/reports', fn () => Inertia::render('AdminReports'))->name('admin.reports');

    // Language & Currency (via settings)
    Route::get('/language-currency', fn () => Inertia::render('AdminLanguageCurrency'))->name('admin.languagecurrency');

    // Categories
    Route::get('/categories', fn () => Inertia::render('AdminCategories'))->name('admin.categories');
    Route::get('/categories/data', [CategoryController::class, 'index'])->name('admin.categories.data');
    Route::post('/categories/data', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/categories/data/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/data/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Partners
    Route::get('/partners', fn () => Inertia::render('AdminPartners'))->name('admin.partners');
    Route::post('/partners/upload-logo', [PartnerController::class, 'uploadLogo'])->name('admin.partners.uploadLogo');
    Route::get('/partners/data', [PartnerController::class, 'index'])->name('admin.partners.data');
    Route::post('/partners/data', [PartnerController::class, 'store'])->name('admin.partners.store');
    Route::put('/partners/data/{partner}', [PartnerController::class, 'update'])->name('admin.partners.update');
    Route::delete('/partners/data/{partner}', [PartnerController::class, 'destroy'])->name('admin.partners.destroy');

    // Hotels
    Route::get('/hotels', fn () => Inertia::render('AdminHotels'))->name('admin.hotels');
    Route::post('/hotels/upload-image', [HotelController::class, 'uploadImage'])->name('admin.hotels.uploadImage');
    Route::get('/hotels/data', [HotelController::class, 'index'])->name('admin.hotels.data');
    Route::post('/hotels/data', [HotelController::class, 'store'])->name('admin.hotels.store');
    Route::put('/hotels/data/{hotel}', [HotelController::class, 'update'])->name('admin.hotels.update');
    Route::delete('/hotels/data/{hotel}', [HotelController::class, 'destroy'])->name('admin.hotels.destroy');

    // Assets
    Route::get('/assets', fn () => Inertia::render('AdminAssets'))->name('admin.assets');
    Route::post('/assets/upload-image', [AssetController::class, 'uploadImage'])->name('admin.assets.uploadImage');
    Route::get('/assets/data', [AssetController::class, 'index'])->name('admin.assets.data');
    Route::post('/assets/data', [AssetController::class, 'store'])->name('admin.assets.store');
    Route::put('/assets/data/{asset}', [AssetController::class, 'update'])->name('admin.assets.update');
    Route::delete('/assets/data/{asset}', [AssetController::class, 'destroy'])->name('admin.assets.destroy');

    // Custom Trip
    Route::get('/custom-trip', fn () => Inertia::render('AdminCustomTrip'))->name('admin.customtrip');
    Route::get('/custom-trip/data', [CustomTripController::class, 'index'])->name('admin.customtrip.data');
    Route::post('/custom-trip/data', [CustomTripController::class, 'store'])->name('admin.customtrip.store');
    Route::put('/custom-trip/data/{customTrip}', [CustomTripController::class, 'update'])->name('admin.customtrip.update');
    Route::delete('/custom-trip/data/{customTrip}', [CustomTripController::class, 'destroy'])->name('admin.customtrip.destroy');

    // Trip Schedule
    Route::get('/trip-schedule', fn () => Inertia::render('AdminTripSchedule'))->name('admin.tripschedule');
    Route::get('/trip-schedule/data', [TripScheduleController::class, 'index'])->name('admin.tripschedule.data');
    Route::post('/trip-schedule/data', [TripScheduleController::class, 'store'])->name('admin.tripschedule.store');
    Route::put('/trip-schedule/data/{tripSchedule}', [TripScheduleController::class, 'update'])->name('admin.tripschedule.update');
    Route::delete('/trip-schedule/data/{tripSchedule}', [TripScheduleController::class, 'destroy'])->name('admin.tripschedule.destroy');

    // Rental Schedule
    Route::get('/rental-schedule', fn () => Inertia::render('AdminRentalSchedule'))->name('admin.rentalschedule');
    Route::get('/rental-schedule/data', [RentalScheduleController::class, 'index'])->name('admin.rentalschedule.data');
    Route::post('/rental-schedule/data', [RentalScheduleController::class, 'store'])->name('admin.rentalschedule.store');
    Route::put('/rental-schedule/data/{rentalSchedule}', [RentalScheduleController::class, 'update'])->name('admin.rentalschedule.update');
    Route::delete('/rental-schedule/data/{rentalSchedule}', [RentalScheduleController::class, 'destroy'])->name('admin.rentalschedule.destroy');

    // Trip Data (static page with mock data - no backend needed)
    Route::get('/trip-data', fn () => Inertia::render('AdminTripData'))->name('admin.tripdata');

    // Instagram & Pages CRUD
    Route::resource('instagram-feeds', \App\Http\Controllers\AdminInstagramController::class);
    Route::resource('pages-data', \App\Http\Controllers\AdminPagesController::class);

    // Contacts (admin view)
    Route::get('/contacts', fn () => Inertia::render('AdminContacts'))->name('admin.contacts');
    Route::get('/contacts/data', [ContactController::class, 'index'])->name('admin.contacts.data');
    Route::get('/contacts/data/{contact}', [ContactController::class, 'show'])->name('admin.contacts.show');
    Route::patch('/contacts/data/{contact}', [ContactController::class, 'update'])->name('admin.contacts.update');
    Route::delete('/contacts/data/{contact}', [ContactController::class, 'destroy'])->name('admin.contacts.destroy');

    // Activity Log
    Route::get('/activity-log', fn () => Inertia::render('AdminActivityLog'))->name('admin.activitylog');
    Route::get('/activity-log/data', [ActivityLogController::class, 'index'])->name('admin.activitylog.data');

    // Users
    Route::get('/users', fn () => Inertia::render('AdminUsers'))->name('admin.users');
    Route::apiResource('users-data', UserController::class);

    // Reviews
    Route::get('/reviews', fn () => Inertia::render('AdminReviews'))->name('admin.reviews');
    Route::get('/reviews/data', [ReviewController::class, 'index'])->name('admin.reviews.data');
    Route::post('/reviews/data', [ReviewController::class, 'store'])->name('admin.reviews.store');
    Route::put('/reviews/data/{review}', [ReviewController::class, 'update'])->name('admin.reviews.update');
    Route::delete('/reviews/data/{review}', [ReviewController::class, 'destroy'])->name('admin.reviews.destroy');

    // Business Profile
    Route::get('/business-profile', fn () => Inertia::render('AdminBusinessProfile'))->name('admin.businessprofile');
    Route::get('/business-profile/data', [BusinessProfileController::class, 'show'])->name('admin.businessprofile.data');
    Route::put('/business-profile/data', [BusinessProfileController::class, 'update'])->name('admin.businessprofile.update');

    // Regions
    Route::get('/regions', fn () => Inertia::render('AdminRegions'))->name('admin.regions');
    Route::get('/regions/{province}', [RegionController::class, 'showByProvince'])->name('admin.regions.detail');
    Route::get('/regions-data', [RegionController::class, 'index'])->name('admin.regions.data');
    Route::post('/regions-data', [RegionController::class, 'store'])->name('admin.regions.store');
    Route::get('/regions-data/{region}', [RegionController::class, 'show'])->name('admin.regions.show');
    Route::put('/regions-data/{region}', [RegionController::class, 'update'])->name('admin.regions.update');
    Route::delete('/regions-data/{region}', [RegionController::class, 'destroy'])->name('admin.regions.destroy');
    Route::post('/regions-data/{region}/cities', [RegionController::class, 'storeCity'])->name('admin.regions.cities.store');
    Route::delete('/regions-data/{region}/cities/{city}', [RegionController::class, 'destroyCity'])->name('admin.regions.cities.destroy');

    // ── Image upload routes MUST be before resource routes ──
    Route::post('packages/upload-image', [TourPackageController::class, 'uploadImage'])->name('packages.uploadImage');
    Route::post('vehicles/upload-image', [VehicleController::class, 'uploadImage'])->name('vehicles.uploadImage');
    Route::post('blog/upload-image', [BlogArticleController::class, 'uploadImage'])->name('blog.uploadImage');
    Route::post('gallery/upload-image', [GalleryPhotoController::class, 'uploadImage'])->name('gallery.uploadImage');

    // Resource CRUD
    Route::resource('packages', TourPackageController::class);
    Route::resource('vehicles', VehicleController::class);
    Route::resource('blog', BlogArticleController::class);
    Route::resource('gallery', GalleryPhotoController::class);

    // Admin rental & blog page views
    Route::get('/instagram', fn () => Inertia::render('AdminInstagram'))->name('admin.instagram');
    Route::get('/pages', fn () => Inertia::render('AdminPages'))->name('admin.pages');
    Route::get('/rental', fn () => Inertia::render('AdminRental'))->name('admin.rental');
    Route::get('/rental/{id}', [PublicPageController::class, 'adminRentalVehicleDetail'])->name('admin.rental.detail');
    Route::get('/blog', fn () => Inertia::render('AdminBlog'))->name('admin.blog');
});

// ─── User Auth & Profile ──────────────────────────────────────────────────────
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
