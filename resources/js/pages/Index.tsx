import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/components/PublicLayout";
const heroImage = "https://images.unsplash.com/photo-1542289947-83eb06f86047?q=80&w=1600&auto=format&fit=crop"; // Danau Toba style
const dest1 = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop";   // Danau Toba Landscape
const dest2 = "https://images.unsplash.com/photo-1579308102431-7e50c76cebb9?q=80&w=800&auto=format&fit=crop";   // Berastagi Highland
const dest3 = "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=800&auto=format&fit=crop";   // Bukit Lawang Jungle
const dest4 = "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop";   // Medan Maimun/Culture style

type FeaturedPackage = {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  category: string;
};

const fallbackFeaturedPackages: FeaturedPackage[] = [
  { id: 1, title: "Pesona Danau Toba", location: "Samosir", duration: "4 Hari 3 Malam", price: 3500000, rating: 4.9, image: dest1, category: "Alam" },
  { id: 2, title: "Berastagi Highland", location: "Karo", duration: "3 Hari 2 Malam", price: 2500000, rating: 4.8, image: dest2, category: "Pegunungan" },
  { id: 3, title: "Trekking Bukit Lawang", location: "Langkat", duration: "3 Hari 2 Malam", price: 2200000, rating: 4.7, image: dest3, category: "Petualangan" },
  { id: 4, title: "City Tour Medan", location: "Medan", duration: "2 Hari 1 Malam", price: 1500000, rating: 4.9, image: dest4, category: "Budaya" },
];

const testimonials = [
  { name: "Rina Sari", text: "Pengalaman tak terlupakan di Danau Toba! Tim sangat profesional dan ramah.", rating: 5, trip: "Pesona Danau Toba" },
  { name: "Budi Hartono", text: "Udara Berastagi sangat segar. Semua diatur dengan sempurna dari awal hingga akhir.", rating: 5, trip: "Berastagi Highland" },
  { name: "Dewi Lestari", text: "Melihat orangutan langsung di Bukit Lawang sangat luar biasa! Pelayanan premium.", rating: 5, trip: "Trekking Bukit Lawang" },
];

const regions = ["Sumatera Utara", "Kota Medan", "Pulau Samosir", "Dataran Tinggi Karo", "Kepulauan Nias"];

const stats = [
  { label: "Destinasi", value: "150+" },
  { label: "Traveler Puas", value: "10K+" },
  { label: "Paket Wisata", value: "80+" },
  { label: "Rating", value: "4.9★" },
];

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function Beranda({ featuredPackages }: { featuredPackages?: FeaturedPackage[] }) {
  const [activeRegion, setActiveRegion] = useState("Sumatera Utara");
  const popularPackages = featuredPackages?.length ? featuredPackages : fallbackFeaturedPackages;

  return (
    <PublicLayout>
      <Head>
        <title>SumutTour - Platform Wisata #1 Sumatera Utara</title>
        <meta name="description" content="Temukan paket wisata terbaik, rental mobil, dan pengalaman tak terlupakan di Sumatera Utara. Jelajahi Danau Toba, Berastagi, Bukit Lawang, dan banyak lagi." />
        <meta name="keywords" content="wisata sumatera utara, paket wisata danau toba, rental mobil medan, tour guide sumut" />
        <meta property="og:title" content="SumutTour - Jelajahi Keindahan Sumatera Utara" />
        <meta property="og:description" content="Platform wisata terpercaya untuk eksplorasi Sumatera Utara dengan paket premium dan layanan terbaik." />
        <meta property="og:image" content={heroImage} />
      </Head>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Keindahan Danau Toba Sumatera Utara" className="w-full h-full object-cover" width="1600" height="900" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0 px-4 py-1.5 text-sm">
              🌴 Platform Wisata #1 Sumatera Utara
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Jelajahi Keindahan <span className="text-tropical-gold">Sumatera Utara</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Temukan paket wisata terbaik, rental mobil, dan pengalaman tak terlupakan di {activeRegion} dan sekitarnya.
            </p>

            {/* Search Bar */}
            <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-2 shadow-elevated flex flex-col md:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin className="w-5 h-5 text-primary" />
                <Input placeholder="Mau ke mana?" className="border-0 bg-transparent focus-visible:ring-0 shadow-none" />
              </div>
              <div className="flex items-center gap-2 flex-1 px-3">
                <Calendar className="w-5 h-5 text-primary" />
                <Input placeholder="Kapan?" className="border-0 bg-transparent focus-visible:ring-0 shadow-none" />
              </div>
              <div className="flex items-center gap-2 flex-1 px-3">
                <Users className="w-5 h-5 text-primary" />
                <Input placeholder="Jumlah orang" className="border-0 bg-transparent focus-visible:ring-0 shadow-none" />
              </div>
              <Button className="gradient-hero border-0 text-primary-foreground px-8 h-12 rounded-xl">
                <Search className="w-4 h-4 mr-2" /> Cari
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{s.value}</div>
                <div className="text-primary-foreground/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-tropical-sky">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Populer</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Paket Wisata Favorit
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Pilihan paket wisata terpopuler dengan pengalaman terbaik di {activeRegion}
            </p>
            
            {/* Region Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={activeRegion === region ? "default" : "outline"}
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full transition-all duration-300 shadow-sm ${activeRegion === region ? 'bg-primary text-primary-foreground hover:bg-primary/90 scale-105' : 'bg-background hover:bg-muted hover:scale-105'}`}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-primary border-0">{pkg.category}</Badge>
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
                      <Star className="w-3 h-3 fill-tropical-gold text-tropical-gold" /> {pkg.rating}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" /> {pkg.location}
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" /> {pkg.duration}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground">Mulai dari</span>
                        <div className="font-bold text-primary">{formatRupiah(pkg.price)}</div>
                      </div>
                      <Link href={`/paket-wisata/${pkg.id}`}>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Detail <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/paket-wisata">
              <Button variant="outline" size="lg" className="rounded-full">
                Lihat Semua Paket <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Testimoni</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Apa Kata Mereka?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-card p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-tropical-gold text-tropical-gold" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.trip}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Siap Menjelajahi Sumatera Utara?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Hubungi kami sekarang dan dapatkan penawaran terbaik untuk perjalanan impian Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-secondary text-secondary-foreground border-0 rounded-full px-8 hover:bg-secondary/90">
              Pesan Sekarang
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground rounded-full px-8 hover:bg-primary-foreground/10">
              Custom Trip
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
