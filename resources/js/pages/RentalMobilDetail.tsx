import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, Users, Fuel, Settings2, Star, CheckCircle2, 
  ShieldCheck, Clock, Phone, MessageSquare, Info,
  ChevronRight, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

interface Vehicle {
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
  description: string;
  features: string[];
}

export default function RentalMobilDetail({ vehicle }: { vehicle: Vehicle }) {
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
        <title>{`Sewa ${vehicle.name} - Rental Mobil SumutTour`}</title>
        <meta name="description" content={`Sewa mobil ${vehicle.name} di Medan dan Sumatera Utara. Lepas kunci atau dengan supir. Harga mulai dari ${formatRupiah(vehicle.pricePerDay)}.`} />
      </Head>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Image & Details */}
            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-background aspect-video flex items-center justify-center p-8">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-contain"
                />
                <Badge className={`absolute top-6 left-6 ${vehicle.available ? 'bg-primary' : 'bg-secondary'} text-primary-foreground px-4 py-2 border-0`}>
                  {vehicle.available ? "Tersedia Sekarang" : "Sedang Disewa"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-background shadow-sm flex flex-col items-center gap-2 border border-border/40">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold text-foreground">{vehicle.seats} Kursi</span>
                </div>
                <div className="p-4 rounded-2xl bg-background shadow-sm flex flex-col items-center gap-2 border border-border/40">
                  <Fuel className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold text-foreground">{vehicle.fuel}</span>
                </div>
                <div className="p-4 rounded-2xl bg-background shadow-sm flex flex-col items-center gap-2 border border-border/40">
                  <Settings2 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold text-foreground">{vehicle.transmission}</span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" /> Deskripsi Kendaraan
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" /> Fitur & Keamanan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(vehicle.features ?? []).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/40">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Booking Sidebar */}
            <div className="lg:sticky lg:top-24">
              <Card className="border-0 shadow-elevated overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground py-8 px-8">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="text-primary-foreground border-primary-foreground/30 text-xs px-3">{vehicle.type}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-tropical-gold text-tropical-gold" />
                      <span className="font-bold">{vehicle.rating}</span>
                      <span className="opacity-80">(120+ Sewa)</span>
                    </div>
                  </div>
                  <CardTitle className="font-display text-3xl font-bold">{vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-end justify-between border-b border-border pb-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Harga Sewa</span>
                      <div className="text-3xl font-bold text-primary">{formatRupiah(vehicle.pricePerDay)}</div>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium mb-1">/ Per Hari</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Syarat Sewa
                    </h4>
                    <ul className="space-y-3">
                      <li className="text-xs text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-1 shrink-0 text-tropical-gold" /> KTP/Identitas diri asli (disimpan selama masa sewa)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-1 shrink-0 text-tropical-gold" /> SIM A Aktif (untuk sewa lepas kunci)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-1 shrink-0 text-tropical-gold" /> Jaminan Motor + STNK asli (opsional)
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      className="w-full gradient-hero h-14 text-lg font-bold border-0 shadow-lg hover:shadow-xl transition-all"
                      disabled={!vehicle.available}
                    >
                      {vehicle.available ? "Sewa Sekarang" : "Tidak Tersedia"}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex items-center gap-2 h-11 text-xs font-bold">
                        <Phone className="w-3 h-3" /> Telepon
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 h-11 text-xs font-bold">
                        <MessageSquare className="w-3 h-3" /> WhatsApp
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/50 border border-accent/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground">Asuransi Kendaraan</h5>
                      <p className="text-[10px] text-muted-foreground">Seluruh unit kami telah terlindungi oleh asuransi komprehensif.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
