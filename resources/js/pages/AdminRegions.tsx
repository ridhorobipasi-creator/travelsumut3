import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, ChevronRight, Eye } from "lucide-react";

const regions = [
  {
    province: "Sumatera Utara",
    cities: [
      { name: "Medan", destinations: 12 },
      { name: "Samosir", destinations: 15 },
      { name: "Karo (Berastagi)", destinations: 10 },
      { name: "Langkat (Bukit Lawang)", destinations: 8 },
      { name: "Nias", destinations: 7 },
      { name: "Deli Serdang", destinations: 5 },
    ],
  },
];

export default function AdminRegions() {
  return (
    <AdminLayout>
      <Head title="Manajemen Wilayah - Admin SumutTour" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Manajemen Wilayah</h1>
          <p className="text-sm text-muted-foreground">Kelola provinsi, kota, dan destinasi wisata</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Tambah Provinsi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regions.map((r) => (
          <Card key={r.province} className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <Link href={`/admin/regions/${r.province}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
                <CardTitle className="font-display text-lg">{r.province}</CardTitle>
              </Link>
              <div className="flex gap-1">
                <Link href={`/admin/regions/${r.province}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {r.cities.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{c.destinations} destinasi</Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-primary">
                <Plus className="w-3 h-3 mr-1" /> Tambah Kota
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
