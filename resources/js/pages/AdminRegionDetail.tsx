import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, Trash2, MapPin, Edit, 
  Plus, Minus, ChevronRight, Globe, Building,
  CheckCircle2, XCircle, Mountain, Trees
} from "lucide-react";
import { useState } from "react";

interface Destination {
  id: number;
  name: string;
  type: string;
  rating: number;
  visits: number;
  status: "active" | "pending" | "inactive";
}

interface City {
  id: number;
  name: string;
  destinations: Destination[];
}

interface Region {
  id: number;
  province: string;
  cities: City[];
  totalDestinations: number;
  popularDestinations: string[];
  status: "active" | "inactive";
}

export default function AdminRegionDetail({ region }: { region: Region }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Region>(region);

  const handleInputChange = (field: keyof Region, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusColors: Record<string, string> = {
    active: "bg-primary text-primary-foreground",
    inactive: "bg-muted text-muted-foreground"
  };

  const destinationTypeColors: Record<string, string> = {
    Alam: "bg-tropical-leaf/20 text-tropical-leaf border-0",
    Budaya: "bg-tropical-gold/20 text-tropical-gold border-0",
    Pantai: "bg-tropical-ocean/20 text-tropical-ocean border-0",
    Gunung: "bg-primary/20 text-primary border-0"
  };

  return (
    <AdminLayout>
      <Head title={`Edit: ${region.province} - Admin`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/regions">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Edit Wilayah</h1>
            <p className="text-sm text-muted-foreground">ID: #{region.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColors[region.status]}>{region.status === "active" ? "Aktif" : "Nonaktif"}</Badge>
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
          
          {/* Province Info */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> Informasi Provinsi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="province">Nama Provinsi</Label>
                <Input 
                  id="province" 
                  value={formData.province} 
                  onChange={(e) => handleInputChange("province", e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary" : ""}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Building className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{region.cities.length}</div>
                  <div className="text-xs text-muted-foreground">Kota/Kabupaten</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{region.totalDestinations}</div>
                  <div className="text-xs text-muted-foreground">Destinasi</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Mountain className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-xs text-muted-foreground">Gunung</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Trees className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Hutan</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities & Destinations */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Kota & Destinasi
              </CardTitle>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" /> Tambah Kota
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.cities.map((city) => (
                <div key={city.id} className="rounded-xl border border-border/40 overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{city.name}</h4>
                        <p className="text-xs text-muted-foreground">{city.destinations.length} destinasi</p>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3 bg-background">
                    {city.destinations.map((dest) => (
                      <div key={dest.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div>
                            <h5 className="text-sm font-medium text-foreground">{dest.name}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className={`text-[10px] px-2 py-0.5 ${destinationTypeColors[dest.type] || ""}`}>
                                {dest.type}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {dest.visits} visits
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={dest.status === "active" ? "default" : "secondary"} className="text-[10px]">
                            {dest.status === "active" ? "Aktif" : dest.status}
                          </Badge>
                          {isEditing && (
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm" className="w-full mt-2 border-dashed">
                        <Plus className="w-3 h-3 mr-1" /> Tambah Destinasi
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Destinasi Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {region.popularDestinations.map((dest, idx) => (
                  <Badge key={idx} variant="outline" className="px-3 py-2 text-sm">
                    <MapPin className="w-3 h-3 mr-1" /> {dest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Quick Actions */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-3 h-3 mr-2" /> Tambah Kota
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-3 h-3 mr-2" /> Lihat di Peta
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="w-3 h-3 mr-2" /> Aktivasi Semua
              </Button>
            </CardContent>
          </Card>

          {/* Region Stats */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Statistik Wilayah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Destinasi</span>
                <span className="font-bold text-primary">{region.totalDestinations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Kota/Kabupaten</span>
                <span className="font-bold">{region.cities.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rata-rata Rating</span>
                <span className="font-bold">4.7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pengunjung/Bulan</span>
                <span className="font-bold">15.2K</span>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> Peta Wilayah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-xl bg-muted/50 border border-dashed border-border flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Peta interaktif akan ditampilkan di sini</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
