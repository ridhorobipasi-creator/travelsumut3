<?php

namespace App\Http\Controllers;

use App\Models\BlogArticle;
use App\Models\GalleryPhoto;
use App\Models\TourPackage;
use App\Models\Vehicle;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function home(): Response
    {
        $featured = TourPackage::query()
            ->where('status', 'active')
            ->orderByDesc('rating')
            ->orderByDesc('id')
            ->limit(4)
            ->get()
            ->map(fn (TourPackage $p) => $this->packageSummary($p));

        return Inertia::render('Index', [
            'featuredPackages' => $featured->values()->all(),
        ]);
    }

    public function paketWisata(): Response
    {
        $packages = TourPackage::query()
            ->where('status', 'active')
            ->orderByDesc('id')
            ->get()
            ->map(fn (TourPackage $p) => $this->packageSummary($p));

        $categories = $packages->pluck('category')->unique()->filter()->sort()->values()->all();
        $provinces = $packages->pluck('province')->unique()->filter()->sort()->values()->all();

        return Inertia::render('PaketWisata', [
            'packages' => $packages->values()->all(),
            'filterCategories' => $categories,
            'filterProvinces' => $provinces,
        ]);
    }

    public function paketWisataDetail(int $id): Response
    {
        $p = TourPackage::query()
            ->where('status', 'active')
            ->findOrFail($id);

        return Inertia::render('PaketWisataDetail', [
            'pkg' => $this->packageDetail($p),
        ]);
    }

    public function rentalMobil(): Response
    {
        $vehicles = Vehicle::query()
            ->orderByDesc('id')
            ->get()
            ->map(fn (Vehicle $v) => $this->vehicleSummary($v));

        return Inertia::render('RentalMobil', [
            'vehicles' => $vehicles->values()->all(),
        ]);
    }

    public function rentalMobilDetail(int $id): Response
    {
        $v = Vehicle::query()->findOrFail($id);

        return Inertia::render('RentalMobilDetail', [
            'vehicle' => $this->vehicleDetail($v),
        ]);
    }

    public function blog(): Response
    {
        $articles = BlogArticle::query()
            ->where('status', 'published')
            ->orderByDesc('id')
            ->get()
            ->map(fn (BlogArticle $a) => $this->articleSummary($a));

        return Inertia::render('Blog', [
            'articles' => $articles->values()->all(),
        ]);
    }

    public function blogDetail(int $id): Response
    {
        $article = BlogArticle::query()
            ->where('status', 'published')
            ->findOrFail($id);

        $related = BlogArticle::query()
            ->where('status', 'published')
            ->where('id', '!=', $article->id)
            ->orderByDesc('id')
            ->limit(3)
            ->get()
            ->map(fn (BlogArticle $a) => $this->articleSummary($a));

        return Inertia::render('BlogDetail', [
            'article' => $this->articleDetail($article),
            'relatedArticles' => $related->values()->all(),
        ]);
    }

    public function galeri(): Response
    {
        $photos = GalleryPhoto::query()
            ->orderByDesc('id')
            ->get()
            ->map(fn (GalleryPhoto $g) => [
                'id' => $g->id,
                'src' => $g->src,
                'alt' => $g->alt ?? '',
                'category' => $g->category,
            ]);

        $categories = $photos->pluck('category')->unique()->filter()->sort()->values()->all();

        return Inertia::render('Galeri', [
            'photos' => $photos->values()->all(),
            'photoCategories' => $categories,
        ]);
    }

    public function adminRentalVehicleDetail(int $id): Response
    {
        $v = Vehicle::query()->findOrFail($id);

        return Inertia::render('AdminRentalMobilDetail', [
            'vehicle' => $this->vehicleDetail($v),
        ]);
    }

    private function packageSummary(TourPackage $p): array
    {
        $rating = (float) $p->rating;

        return [
            'id' => (int) $p->id,
            'title' => $p->title,
            'location' => $p->location,
            'province' => $p->province,
            'duration' => $p->duration,
            'price' => (int) $p->price,
            'rating' => $rating,
            'category' => $p->category,
            'image' => $p->image ?? '',
            'reviews' => (int) max(0, round(12 + $rating * 8)),
        ];
    }

    private function packageDetail(TourPackage $p): array
    {
        $summary = $this->packageSummary($p);

        return array_merge($summary, [
            'description' => $p->description ?? '',
            'pax' => $p->pax ?? '',
            'itinerary' => $this->decodeJsonList($p->itinerary),
            'includes' => $this->decodeStringList($p->includes),
            'excludes' => $this->decodeStringList($p->excludes),
        ]);
    }

    private function vehicleSummary(Vehicle $v): array
    {
        return [
            'id' => (int) $v->id,
            'name' => $v->name,
            'type' => $v->type,
            'seats' => (int) $v->seats,
            'fuel' => $v->fuel,
            'transmission' => $v->transmission,
            'pricePerDay' => (int) $v->price_per_day,
            'rating' => (float) $v->rating,
            'available' => (bool) $v->available && $v->status === 'available',
            'image' => $v->image ?? '',
        ];
    }

    private function vehicleDetail(Vehicle $v): array
    {
        return array_merge($this->vehicleSummary($v), [
            'description' => $v->description ?? '',
            'features' => $this->decodeStringList($v->features),
            'status' => $v->status,
        ]);
    }

    private function articleSummary(BlogArticle $a): array
    {
        return [
            'id' => (int) $a->id,
            'title' => $a->title,
            'excerpt' => $a->excerpt ?? '',
            'image' => $a->image ?? '',
            'category' => $a->category,
            'date' => $this->formatArticleDate($a),
            'readTime' => $a->read_time ?? '5 min',
        ];
    }

    private function articleDetail(BlogArticle $a): array
    {
        return array_merge($this->articleSummary($a), [
            'content' => $a->content,
        ]);
    }

    private function formatArticleDate(BlogArticle $a): string
    {
        if ($a->date) {
            return $a->date instanceof Carbon
                ? $a->date->format('d M Y')
                : Carbon::parse($a->date)->format('d M Y');
        }

        return $a->updated_at ? $a->updated_at->format('d M Y') : '';
    }

    /**
     * @param  mixed  $value
     * @return array<int, array{day:int, title:string, activities:array<int, string>}>
     */
    private function decodeJsonList($value): array
    {
        $raw = $value;
        if (is_string($raw) && $raw !== '') {
            $raw = json_decode($raw, true);
        }
        if (! is_array($raw)) {
            return [];
        }

        $out = [];
        foreach ($raw as $row) {
            if (! is_array($row)) {
                continue;
            }
            $day = isset($row['day']) ? (int) $row['day'] : count($out) + 1;
            $title = isset($row['title']) ? (string) $row['title'] : '';
            $activities = [];
            if (isset($row['activities']) && is_array($row['activities'])) {
                $activities = array_map('strval', $row['activities']);
            }
            $out[] = ['day' => $day, 'title' => $title, 'activities' => $activities];
        }

        return $out;
    }

    /**
     * @param  mixed  $value
     * @return array<int, string>
     */
    private function decodeStringList($value): array
    {
        if (is_array($value)) {
            return array_values(array_map('strval', $value));
        }
        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return array_values(array_map('strval', $decoded));
            }
        }

        return [];
    }
}
