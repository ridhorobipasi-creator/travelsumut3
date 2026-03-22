import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Clock, Star, Users, CheckCircle2, 
  Calendar, Phone, MessageSquare, ChevronRight,
  Info, Map as MapIcon, Image as ImageIcon, XCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface Package {
  id: number;
  title: string;
  location: string;
  province: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  pax: string;
  description: string;
  itinerary: { day: number; title: string; activities: string[] }[];
  includes: string[];
  excludes: string[];
}

export default function PaketWisataDetail({ pkg }: { pkg: Package }) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      minimumFractionDigits: 0 
    }).format(num);
  };

  return (
    <PublicLayout>
      <Head>
        <title>{`${pkg.title} - Paket Wisata SumutTour`}</title>
        <meta name="description" content={(pkg.description || "").slice(0, 160)} />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-primary text-primary-foreground border-0">
              {pkg.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-primary-foreground/90 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-tropical-gold" /> {pkg.location}, {pkg.province}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-tropical-gold" /> {pkg.duration}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-tropical-gold text-tropical-gold" /> {pkg.rating} (48 Review)
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" /> Deskripsi Paket
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapIcon className="w-6 h-6 text-primary" /> Rencana Perjalanan
                </h2>
                <div className="space-y-6">
                  {(pkg.itinerary ?? []).map((item) => (
                    <div key={item.day} className="relative pl-8 border-l-2 border-primary/20 pb-6 last:pb-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      <h3 className="font-bold text-lg mb-2 text-primary">Hari {item.day}: {item.title}</h3>
                      <ul className="space-y-2">
                        {item.activities.map((act, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-tropical-gold" /> {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes/Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-primary">
                    <CheckCircle2 className="w-5 h-5" /> Harga Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {(pkg.includes ?? []).map((inc, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-destructive">
                    <XCircle className="w-5 h-5" /> Harga Tidak Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {(pkg.excludes ?? []).map((exc, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive" /> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Content - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="border-0 shadow-elevated overflow-hidden">
                  <div className="bg-primary p-6 text-primary-foreground">
                    <span className="text-sm opacity-80">Mulai dari</span>
                    <div className="text-3xl font-bold">{formatRupiah(pkg.price)}</div>
                    <p className="text-xs mt-1 opacity-70">*Harga dapat berubah sesuai musim</p>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Users className="w-4 h-4" /> Kapasitas
                        </span>
                        <span className="font-medium">{pkg.pax || "—"} Orang</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Ketersediaan
                        </span>
                        <span className="font-medium text-primary">Tersedia Setiap Hari</span>
                      </div>
                    </div>

                    <Button className="w-full gradient-hero h-12 text-lg font-bold border-0 shadow-lg hover:shadow-xl transition-all">
                      Booking Sekarang
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3" /> Hubungi Kami
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 text-xs">
                        <MessageSquare className="w-3 h-3" /> WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-2xl border border-dashed border-border flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Butuh Paket Custom?</h4>
                    <p className="text-xs text-muted-foreground">Kami bisa menyesuaikan rencana perjalanan sesuai keinginan Anda.</p>
                  </div>
                  <Button variant="link" className="text-primary text-xs font-bold">Konsultasi Gratis <ChevronRight className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
