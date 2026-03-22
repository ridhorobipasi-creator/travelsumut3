import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";
import { Car, Star, Users, Fuel, Settings2, ChevronDown, ChevronRight } from "lucide-react";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

type VehicleRow = {
  id: number;
  name: string;
  type: string;
  seats: number;
  fuel: string;
  transmission: string;
  pricePerDay: number;
  rating: number;
  available: boolean;
  image: string;
};

const fallbackVehicles: VehicleRow[] = [
  {
    id: 1,
    name: "Toyota Innova Reborn",
    type: "MPV Premium",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    pricePerDay: 550000,
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1616428383350-00810793132e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function RentalMobil({ vehicles: vehiclesProp }: { vehicles?: VehicleRow[] }) {
  const [typeFilter, setTypeFilter] = useState("Semua Tipe");
  const vehicles = vehiclesProp?.length ? vehiclesProp : fallbackVehicles;
  
  const types = ["Semua Tipe", ...new Set(vehicles.map((v) => v.type))];
  const filtered = vehicles.filter((v) => typeFilter === "Semua Tipe" || v.type === typeFilter);

  return (
    <PublicLayout>
      <Head>
        <title>Sewa Mobil Medan & Sumatera Utara - SumutTour</title>
        <meta name="description" content="Sewa mobil lepas kunci atau dengan supir di Medan dan Sumatera Utara. Armada lengkap: Avanza, Innova, Xpander, Fortuner, dan Brio." />
        <meta name="keywords" content="rental mobil medan, sewa mobil sumatera utara, rental mobil lepas kunci medan, sewa innova medan" />
      </Head>
      <section className="gradient-ocean py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm px-4 py-1.5 shadow-sm">🚘 Armada Terawat & Bersih</Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Rental Mobil <span className="text-secondary">Premium</span></h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">Sewa kendaraan dengan mudah untuk perjalanan tak terhentikan Anda di Sumatera Utara. Kami menyediakan layanan lepas kunci dan Plus Driver.</p>
        </div>
      </section>

      <section className="py-6 border-b border-border bg-background shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 flex justify-center md:justify-start">
            <div className="relative group min-w-[200px]">
                <div className="flex items-center justify-between border-2 border-primary/20 bg-background hover:border-primary/50 text-foreground px-4 py-2.5 rounded-xl cursor-pointer transition-all">
                  <span className="flex items-center text-sm font-semibold"><Car className="w-4 h-4 mr-2 text-primary" /> {typeFilter}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="absolute top-12 left-0 right-0 bg-background border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden flex flex-col py-1">
                  {types.map((t) => (
                    <button 
                      key={t} 
                      className={`text-left px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors w-full ${typeFilter === t ? "text-primary font-semibold bg-primary/5" : "text-foreground"}`}
                      onClick={() => setTypeFilter(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20 min-h-[50vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center md:justify-between mb-10 flex-col md:flex-row gap-4">
             <h2 className="font-display text-2xl font-bold text-foreground">Pilih Kendaraan Anda</h2>
             <p className="text-sm font-medium text-muted-foreground bg-background px-4 py-2 rounded-full shadow-sm">
                Menampilkan <span className="text-primary font-bold">{filtered.length}</span> armada
             </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20 bg-background rounded-3xl border border-border border-dashed">
                <Car className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-foreground mb-2">Opss! Tidak ada armada.</h3>
                <p>Silakan pilih tipe kendaraan yang lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {filtered.map((v, i) => (
                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-0 shadow-card hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-card flex flex-col h-full rounded-2xl">
                     <div className="h-56 overflow-hidden relative p-4 bg-gradient-to-br from-muted/50 to-muted/10">
                        <img src={v.image} alt={v.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                        <div className="absolute top-4 right-4 z-10">
                            {v.available ? (
                              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md border-0">💳 Tersedia</Badge>
                            ) : (
                              <Badge variant="destructive" className="shadow-md">⚠️ Disewa</Badge>
                            )}
                        </div>
                     </div>
                    <CardContent className="p-6 flex-1 flex flex-col bg-background">
                      <div className="flex items-start justify-between mb-4">
                         <div>
                            <p className="text-xs text-primary font-bold tracking-wider uppercase mb-1">{v.type}</p>
                            <h3 className="font-display text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{v.name}</h3>
                         </div>
                         <div className="flex items-center gap-1 text-sm bg-primary/10 px-2.5 py-1 rounded-full text-primary font-bold">
                           <Star className="w-3.5 h-3.5 fill-primary text-primary" /> {v.rating}
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-6 flex-1 content-start">
                        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-muted/60 text-foreground group-hover:bg-primary/5 transition-colors">
                          <Users className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-xs font-semibold">{v.seats} Pax</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-muted/60 text-foreground group-hover:bg-primary/5 transition-colors">
                          <Fuel className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-xs font-semibold">{v.fuel}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-muted/60 text-foreground group-hover:bg-primary/5 transition-colors">
                          <Settings2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-xs font-semibold">{v.transmission === "Automatic" ? "Auto" : "Manual"}</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between pt-4 border-t border-border mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium mb-0.5">Mulai dari</p>
                          <div className="flex items-baseline gap-1">
                             <span className="font-black text-2xl text-foreground group-hover:text-primary transition-colors tracking-tight">{formatRupiah(v.pricePerDay)}</span>
                             <span className="text-xs text-muted-foreground font-semibold">/hari</span>
                          </div>
                        </div>
                        <Link href={`/rental-mobil/${v.id}`}>
                          <Button className="gradient-hero border-0 text-primary-foreground rounded-full px-5 py-5 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all" disabled={!v.available}>
                            Sewa <ChevronRight className="w-4 h-4 ml-1.5" />
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
    </PublicLayout>
  );
}
