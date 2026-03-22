import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, Trash2, Car, Star, 
  Users, Fuel, Settings2, Edit, Image as ImageIcon, 
  CheckCircle2, XCircle, DollarSign, ShieldCheck
} from "lucide-react";
import { useState } from "react";

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
  status: "available" | "rented" | "maintenance";
}

export default function AdminRentalMobilDetail({ vehicle }: { vehicle: Vehicle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Vehicle>(vehicle);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      minimumFractionDigits: 0 
    }).format(num);
  };

  const handleInputChange = (field: keyof Vehicle, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusColors: Record<string, string> = {
    available: "bg-primary text-primary-foreground",
    rented: "bg-secondary text-secondary-foreground",
    maintenance: "bg-destructive text-destructive-foreground"
  };

  const statusLabels: Record<string, string> = {
    available: "Tersedia",
    rented: "Sedang Disewa",
    maintenance: "Perawatan"
  };

  return (
    <AdminLayout>
      <Head title={`Edit: ${vehicle.name} - Admin`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/rental">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Edit Kendaraan</h1>
            <p className="text-sm text-muted-foreground">ID: #{vehicle.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColors[vehicle.status]}>{statusLabels[vehicle.status]}</Badge>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-3 h-3 mr-2" /> {isEditing ? "Batal Edit" : "Edit"}
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="w-3 h-3 mr-2" /> Hapus
          </Button>
          <Button size="sm" className="gradient-hero border-0 text-primary-foreground">
            <Save className="w-3 h-3 mr-2" /> Simpan Perubahan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Informasi Kendaraan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Kendaraan</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Input 
                    id="type" 
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">Jumlah Kursi</Label>
                  <Input 
                    id="seats" 
                    type="number"
                    value={formData.seats}
                    onChange={(e) => handleInputChange("seats", Number(e.target.value))}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel">Bahan Bakar</Label>
                  <Input 
                    id="fuel" 
                    value={formData.fuel}
                    onChange={(e) => handleInputChange("fuel", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmisi</Label>
                  <Input 
                    id="transmission" 
                    value={formData.transmission}
                    onChange={(e) => handleInputChange("transmission", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Deskripsi</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className={`w-full min-h-[100px] p-3 rounded-lg border bg-background text-sm ${isEditing ? "border-primary focus:ring-2 focus:ring-primary/20" : "border-border"}`}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={!isEditing}
              />
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Fitur & Keamanan
              </CardTitle>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" /> Tambah Fitur
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    {isEditing ? (
                      <Input value={feature} className="h-7 text-xs flex-1" />
                    ) : (
                      <span className="text-sm font-medium">{feature}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Price & Status */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" /> Harga Sewa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Harga Per Hari (IDR)</Label>
                <Input 
                  id="pricePerDay" 
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => handleInputChange("pricePerDay", Number(e.target.value))}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full h-10 px-3 rounded-md border text-sm ${isEditing ? "border-primary bg-background" : "border-border bg-muted"}`}
                >
                  <option value="available">Tersedia</option>
                  <option value="rented">Sedang Disewa</option>
                  <option value="maintenance">Perawatan</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Star className="w-4 h-4" /> Rating
                </span>
                <span className="font-bold text-primary">{vehicle.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Total Sewa
                </span>
                <span className="font-bold">120+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Car className="w-4 h-4" /> Tahun Pakai
                </span>
                <span className="font-bold">2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Image Preview */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> Foto Kendaraan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain" />
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <ImageIcon className="w-3 h-3 mr-2" /> Ganti Foto
                </Button>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
