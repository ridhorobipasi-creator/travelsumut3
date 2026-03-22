import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PublicLayout from "@/components/PublicLayout";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

type PackageRow = {
  id: number;
  title: string;
  location: string;
  province: string;
  duration: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  reviews: number;
};

const fallbackPackages: PackageRow[] = [
  {
    id: 1,
    title: "Pesona Danau Toba",
    location: "Samosir",
    province: "Sumatera Utara",
    duration: "4 Hari 3 Malam",
    price: 3500000,
    rating: 4.9,
    category: "Alam",
    image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=800&auto=format&fit=crop",
    reviews: 48,
  },
];
const sortOptions = [
  { label: "Harga: Termurah", value: "price-asc" },
  { label: "Harga: Termahal", value: "price-desc" },
  { label: "Rating Tertinggi", value: "rating-desc" },
  { label: "Terbaru", value: "newest" },
];

export default function PaketWisata({
  packages,
  filterCategories = [],
  filterProvinces = [],
}: {
  packages?: PackageRow[];
  filterCategories?: string[];
  filterProvinces?: string[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [province, setProvince] = useState("Semua Wilayah");
  const [sort, setSort] = useState("rating-desc");

  const mockPackages = packages?.length ? packages : fallbackPackages;

  const categories = ["Semua", ...new Set([...filterCategories])];
  const provinces = ["Semua Wilayah", ...new Set([...filterProvinces])];

  const filtered = mockPackages
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || p.category === category;
      const matchProvince = province === "Semua Wilayah" || p.province === province;
      return matchSearch && matchCategory && matchProvince;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating-desc") return b.rating - a.rating;
      return b.id - a.id;
    });

  return (
    <PublicLayout>
      <Head>
        <title>Paket Wisata Sumatera Utara - SumutTour</title>
        <meta name="description" content="Temukan paket wisata terbaik di Sumatera Utara. Danau Toba, Berastagi, Bukit Lawang, dan ratusan destinasi menarik lainnya." />
        <meta name="keywords" content="paket wisata sumut, wisata danau toba, tour sumatera utara, paket liburan murah" />
      </Head>

      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">🗺️ Jelajahi Sumatera Utara</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Paket Wisata Pilihan
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Temukan paket perjalanan impian Anda ke destinasi terbaik Sumatera Utara dengan harga terjangkau dan layanan premium.
          </p>
          {/* Search */}
          <div className="max-w-lg mx-auto bg-background rounded-2xl p-2 flex gap-2 shadow-elevated">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari destinasi atau paket..."
                className="border-0 bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="gradient-hero border-0 text-primary-foreground rounded-xl px-6">
              Cari
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={category === cat ? "default" : "outline"}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full text-xs transition-all ${category === cat ? "gradient-hero border-0 text-primary-foreground" : ""}`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Sort & Filter */}
            <div className="flex gap-2 items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border border-border rounded-lg px-3 py-2 bg-background text-foreground outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="text-xs border border-border rounded-lg px-3 py-2 bg-background text-foreground outline-none cursor-pointer"
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari {mockPackages.length} paket
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">Tidak ada paket ditemukan</h3>
              <p className="text-muted-foreground text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
              <Button className="mt-4" variant="outline" onClick={() => { setSearch(""); setCategory("Semua"); setProvince("Semua Wilayah"); }}>
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all group h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-primary border-0 text-xs">
                        {pkg.category}
                      </Badge>
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
                        <Star className="w-3 h-3 fill-tropical-gold text-tropical-gold" /> {pkg.rating}
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" /> {pkg.location}, {pkg.province}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" /> {pkg.duration}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">{pkg.reviews} ulasan</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-xs text-muted-foreground">Mulai dari</span>
                          <div className="font-bold text-primary">{formatRupiah(pkg.price)}</div>
                        </div>
                        <Link href={`/paket-wisata/${pkg.id}`}>
                          <Button size="sm" className="gradient-hero border-0 text-primary-foreground rounded-full text-xs">
                            Pesan <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Tidak menemukan paket yang cocok?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Ceritakan rencana perjalanan Anda dan kami akan buatkan itinerary custom sesuai keinginan.
          </p>
          <Button className="gradient-hero border-0 text-primary-foreground px-8 rounded-full">
            Buat Custom Trip
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
