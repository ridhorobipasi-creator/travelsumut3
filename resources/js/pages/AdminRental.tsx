import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Car, Plus, Search, Edit, Trash2, Eye, Star, Users, Fuel, Settings2, CheckCircle, XCircle
} from "lucide-react";

const mockVehicles = [
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
    status: "available",
    totalRentals: 48,
    image: "https://images.unsplash.com/photo-1616428383350-00810793132e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Toyota Avanza Veloz",
    type: "MPV",
    seats: 7,
    fuel: "Bensin",
    transmission: "Manual",
    pricePerDay: 380000,
    rating: 4.7,
    available: true,
    status: "available",
    totalRentals: 63,
    image: "https://images.unsplash.com/photo-1574069116-19e1b33e7834?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Mitsubishi Xpander Cross",
    type: "MPV",
    seats: 7,
    fuel: "Bensin",
    transmission: "Automatic",
    pricePerDay: 450000,
    rating: 4.8,
    available: false,
    status: "rented",
    totalRentals: 31,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Toyota Fortuner VRZ",
    type: "SUV Premium",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    pricePerDay: 850000,
    rating: 4.9,
    available: true,
    status: "available",
    totalRentals: 22,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Honda Brio Satya",
    type: "City Car",
    seats: 5,
    fuel: "Bensin",
    transmission: "Automatic",
    pricePerDay: 250000,
    rating: 4.6,
    available: false,
    status: "maintenance",
    totalRentals: 89,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Daihatsu Terios",
    type: "SUV",
    seats: 7,
    fuel: "Bensin",
    transmission: "Manual",
    pricePerDay: 420000,
    rating: 4.5,
    available: true,
    status: "available",
    totalRentals: 37,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=400&auto=format&fit=crop",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Tersedia", color: "bg-emerald-100 text-emerald-700" },
  rented: { label: "Disewa", color: "bg-blue-100 text-blue-700" },
  maintenance: { label: "Servis", color: "bg-amber-100 text-amber-700" },
};

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function AdminRental() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicles, setVehicles] = useState(mockVehicles);

  const filtered = vehicles.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "available").length,
    rented: vehicles.filter((v) => v.status === "rented").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin hapus kendaraan ini?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Rental Mobil - Admin SumutTour" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Manajemen Armada</h1>
          <p className="text-sm text-muted-foreground">Kelola kendaraan rental Anda</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Tambah Kendaraan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Armada", value: stats.total, icon: Car, color: "text-primary" },
          { label: "Tersedia", value: stats.available, icon: CheckCircle, color: "text-emerald-600" },
          { label: "Sedang Disewa", value: stats.rented, icon: Car, color: "text-blue-600" },
          { label: "Servis/Maintenance", value: stats.maintenance, icon: XCircle, color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <s.icon className={`w-8 h-8 ${s.color}`} />
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari kendaraan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "available", "rented", "maintenance"].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className={`text-xs ${statusFilter === s ? "gradient-hero border-0 text-primary-foreground" : ""}`}
            >
              {s === "all" ? "Semua" : statusConfig[s]?.label ?? s}
            </Button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((v) => (
          <Card key={v.id} className="border-0 shadow-card hover:shadow-elevated transition-all group overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img
                src={v.image}
                alt={v.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${statusConfig[v.status]?.color ?? ""}`}>
                {statusConfig[v.status]?.label ?? v.status}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{v.name}</h3>
                  <p className="text-xs text-muted-foreground">{v.type}</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 fill-tropical-gold text-tropical-gold" />
                  <span className="font-medium">{v.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{v.seats} Kursi</span>
                <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />{v.fuel}</span>
                <span className="flex items-center gap-1"><Settings2 className="w-3 h-3" />{v.transmission === "Automatic" ? "AT" : "MT"}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Per hari</p>
                  <p className="font-bold text-primary">{formatRupiah(v.pricePerDay)}</p>
                </div>
                <div className="flex gap-1">
                  <Link href={`/admin/rental/${v.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDelete(v.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
                Total disewa: <span className="font-semibold text-foreground">{v.totalRentals}x</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Tidak ada kendaraan ditemukan.</p>
        </div>
      )}
    </AdminLayout>
  );
}
