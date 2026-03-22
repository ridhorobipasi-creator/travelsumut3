import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, Trash2, MapPin, Clock, Star, 
  Users, Edit, Image as ImageIcon, Plus, Minus,
  CheckCircle2, XCircle, ChevronRight, DollarSign
} from "lucide-react";
import { useState } from "react";

interface Itinerary {
  day: number;
  title: string;
  activities: string[];
}

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
  itinerary: Itinerary[];
  includes: string[];
  excludes: string[];
  status: "active" | "draft" | "archived";
}

export default function AdminPaketWisataDetail({ pkg }: { pkg: Package }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Package>(pkg);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      minimumFractionDigits: 0 
    }).format(num);
  };

  const handleInputChange = (field: keyof Package, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusColors: Record<string, string> = {
    active: "bg-primary text-primary-foreground",
    draft: "bg-secondary text-secondary-foreground",
    archived: "bg-muted text-muted-foreground"
  };

  return (
    <AdminLayout>
      <Head title={`Edit: ${pkg.title} - Admin`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/packages">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Edit Paket Wisata</h1>
            <p className="text-sm text-muted-foreground">ID: #{pkg.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColors[pkg.status]}>{pkg.status}</Badge>
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
              <CardTitle className="font-display text-lg">Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Nama Paket</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input 
                    id="category" 
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Input 
                    id="location" 
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <Input 
                    id="province" 
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi</Label>
                  <Input 
                    id="duration" 
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
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
                className={`w-full min-h-[120px] p-3 rounded-lg border bg-background text-sm ${isEditing ? "border-primary focus:ring-2 focus:ring-primary/20" : "border-border"}`}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={!isEditing}
              />
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Rencana Perjalanan</CardTitle>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" /> Tambah Hari
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.itinerary.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-primary/20 pb-6 last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-primary">Hari {item.day}: {item.title}</h4>
                    {isEditing && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                        <Minus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {item.activities.map((act, actIdx) => (
                      <li key={actIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-1 shrink-0 text-tropical-gold" /> 
                        {isEditing ? (
                          <Input value={act} className="h-7 text-xs" />
                        ) : act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Includes / Excludes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Harga Termasuk
                </CardTitle>
                {isEditing && <Button variant="ghost" size="sm"><Plus className="w-3 h-3 mr-1" /></Button>}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {formData.includes.map((inc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {isEditing ? <Input value={inc} className="h-7 text-xs flex-1" /> : inc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" /> Harga Tidak Termasuk
                </CardTitle>
                {isEditing && <Button variant="ghost" size="sm"><Plus className="w-3 h-3 mr-1" /></Button>}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {formData.excludes.map((exc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      {isEditing ? <Input value={exc} className="h-7 text-xs flex-1" /> : exc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Price & Stats */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" /> Harga & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga Paket (IDR)</Label>
                <Input 
                  id="price" 
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
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
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
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
                <span className="font-bold text-primary">{pkg.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Kapasitas
                </span>
                <span className="font-bold">{pkg.pax} Orang</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Total Booking
                </span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Avg. Response
                </span>
                <span className="font-bold">2.3 Jam</span>
              </div>
            </CardContent>
          </Card>

          {/* Image Preview */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> Gambar Utama
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <ImageIcon className="w-3 h-3 mr-2" /> Ganti Gambar
                </Button>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
