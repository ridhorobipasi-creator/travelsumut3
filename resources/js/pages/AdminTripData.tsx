import { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map, MapPin, Download, Edit, Trash2, Eye, Plus, Search } from "lucide-react";

const mockTripData = [
  { id: "TRP-001", name: "Jalur Pendakian Sibayak", duration: "1 Hari", difficulty: "Mudah", type: "Pendek", regions: ["Karo"], status: "Active" },
  { id: "TRP-002", name: "Eksplorasi Samosir Lengkap", duration: "3 Hari", difficulty: "Menengah", type: "Jauh", regions: ["Samosir", "Parapat"], status: "Active" },
  { id: "TRP-003", name: "Trekking Orang Utan Leuser", duration: "2 Hari", difficulty: "Sulit", type: "Jauh", regions: ["Langkat"], status: "Maintenance" },
  { id: "TRP-004", name: "Wisata Heritage Medan", duration: "1 Hari", difficulty: "Sangat Mudah", type: "Kota", regions: ["Medan"], status: "Active" },
  { id: "TRP-005", name: "Surfing Nias Selatan", duration: "5 Hari", difficulty: "Ahli", type: "Air", regions: ["Nias Selatan"], status: "Active" },
];

export default function AdminTripData() {
  const [search, setSearch] = useState("");
  const [trips] = useState(mockTripData);

  const filtered = trips.filter((t) => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.regions.some(r => r.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <Head title="Master Data Trip - Admin SumutTour" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Master Data Trip</h1>
          <p className="text-sm text-muted-foreground">Kelola rute, jalur wisata, dan data perjalanan operasional.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-border shadow-sm">
                 <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button className="gradient-hero text-primary-foreground border-0 shadow-sm">
                <Plus className="w-4 h-4 mr-2" /> Tambah Data
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-card bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Total Rute Tersedia</span>
              <Map className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold">24</div>
            <div className="mt-2 text-xs bg-primary-foreground/20 rounded-full w-fit px-2 py-0.5">Beroperasi normal</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-amber-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Perlu Pemeliharaan</span>
              <MapPin className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold">3</div>
            <div className="mt-2 text-xs bg-black/20 rounded-full w-fit px-2 py-0.5">Penutupan sementara</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
            <CardTitle className="font-display text-lg">Daftar Rencana Perjalanan Internal</CardTitle>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Cari rute atau lokasi..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 bg-muted/50 border-transparent focus:bg-background transition-colors" 
                />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6 font-semibold">ID Rute</th>
                <th className="py-3 px-6 font-semibold">Nama Rute</th>
                <th className="py-3 px-6 font-semibold">Cakupan Wilayah</th>
                <th className="py-3 px-6 font-semibold">Durasi</th>
                <th className="py-3 px-6 font-semibold">Tingkat Kesulitan</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((trip) => (
                <tr key={trip.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground">{trip.id}</td>
                  <td className="py-4 px-6 text-foreground font-semibold">{trip.name}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                        {trip.regions.map(r => (
                            <Badge key={r} variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary hover:bg-primary/20">{r}</Badge>
                        ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{trip.duration}</td>
                  <td className="py-4 px-6">
                     <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                        trip.difficulty === 'Mudah' || trip.difficulty === 'Sangat Mudah' ? 'text-emerald-600 bg-emerald-100' :
                        trip.difficulty === 'Menengah' ? 'text-amber-600 bg-amber-100' : 
                        'text-red-600 bg-red-100'
                     }`}>
                         {trip.difficulty}
                     </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${trip.status === 'Active' ? 'bg-primary' : 'bg-destructive animate-pulse'}`}></div>
                        <span className="text-xs font-medium text-foreground">{trip.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-1 opacity-60 hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                  <Map className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p>Data trip tidak ditemukan.</p>
              </div>
          )}
        </div>
      </Card>
    </AdminLayout>
  );
}
