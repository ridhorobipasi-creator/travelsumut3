import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Package, Plus, Search, Edit, Trash2, Eye, Star, MapPin, Clock,
  ChevronRight, XCircle, CheckCircle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const mockPackages = [
  {
    id: 1, title: "Pesona Danau Toba & Samosir", location: "Samosir", province: "Sumatera Utara",
    duration: "4 Hari 3 Malam", price: 3500000, rating: 4.9, category: "Alam", status: "active",
    pax: "2-8", reviews: 48,
    image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2, title: "Berastagi Highland Adventure", location: "Karo", province: "Sumatera Utara",
    duration: "3 Hari 2 Malam", price: 2500000, rating: 4.8, category: "Pegunungan", status: "active",
    pax: "2-12", reviews: 36,
    image: "https://images.unsplash.com/photo-1579308102431-7e50c76cebb9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3, title: "Trekking Bukit Lawang", location: "Langkat", province: "Sumatera Utara",
    duration: "3 Hari 2 Malam", price: 2200000, rating: 4.7, category: "Petualangan", status: "active",
    pax: "2-10", reviews: 29,
    image: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4, title: "City Tour Medan", location: "Medan", province: "Sumatera Utara",
    duration: "1 Hari", price: 750000, rating: 4.9, category: "Budaya", status: "active",
    pax: "1-20", reviews: 64,
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5, title: "Eksplorasi Pulau Nias", location: "Nias Selatan", province: "Sumatera Utara",
    duration: "5 Hari 4 Malam", price: 4800000, rating: 4.8, category: "Pantai", status: "draft",
    pax: "2-8", reviews: 22,
    image: "https://images.unsplash.com/photo-1533512165604-fa73887afbca?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 6, title: "Wisata Budaya Batak", location: "Humbang Hasundutan", province: "Sumatera Utara",
    duration: "3 Hari 2 Malam", price: 2800000, rating: 4.6, category: "Budaya", status: "archived",
    pax: "4-15", reviews: 18,
    image: "https://images.unsplash.com/photo-1596395819057-e37f55a8523b?q=80&w=400&auto=format&fit=crop",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-emerald-100 text-emerald-700" },
  draft: { label: "Draft", color: "bg-amber-100 text-amber-700" },
  archived: { label: "Diarsipkan", color: "bg-gray-100 text-gray-600" },
};

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

const emptyForm = {
  title: "", location: "", province: "", duration: "", price: "", category: "", image: "", pax: "", status: "active",
};

export default function AdminPackages() {
  const [packages, setPackages] = useState(mockPackages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = packages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleEdit = (pkg: typeof mockPackages[0]) => {
    setEditId(pkg.id);
    setForm({ title: pkg.title, location: pkg.location, province: pkg.province, duration: pkg.duration, price: String(pkg.price), category: pkg.category, image: pkg.image, pax: pkg.pax, status: pkg.status });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setPackages((prev) => prev.map((p) => p.id === editId ? { ...p, ...form, price: Number(form.price) } : p));
      toast({ title: "Paket berhasil diperbarui" });
    } else {
      const newId = Math.max(...packages.map((p) => p.id)) + 1;
      setPackages((prev) => [...prev, { ...form, id: newId, price: Number(form.price), rating: 0, reviews: 0 }]);
      toast({ title: "Paket berhasil ditambahkan" });
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setPackages((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
    toast({ title: "Paket berhasil dihapus", variant: "destructive" });
  };

  return (
    <AdminLayout>
      <Head title="Kelola Paket Wisata - Admin SumutTour" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Paket Wisata</h1>
          <p className="text-sm text-muted-foreground">Total {packages.length} paket wisata</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => { setEditId(null); setForm(emptyForm); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Paket
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.entries(statusConfig).map(([key, val]) => (
          <Card key={key} className="border-0 shadow-card cursor-pointer" onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{packages.filter((p) => p.status === key).length}</div>
              <Badge className={`text-xs mt-1 border-0 ${val.color}`}>{val.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari paket wisata..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {["all", "active", "draft", "archived"].map((s) => (
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

      {/* Table */}
      <Card className="border-0 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Paket</th>
                <th className="text-left py-3 px-4 font-medium">Lokasi</th>
                <th className="text-left py-3 px-4 font-medium">Durasi</th>
                <th className="text-left py-3 px-4 font-medium">Harga</th>
                <th className="text-left py-3 px-4 font-medium">Rating</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-right py-3 px-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={pkg.image} alt={pkg.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-medium text-foreground">{pkg.title}</div>
                        <div className="text-xs text-muted-foreground">{pkg.category} • {pkg.pax} pax</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" />{pkg.location}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" />{pkg.duration}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-primary">{formatRupiah(pkg.price)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-tropical-gold text-tropical-gold" />
                      {pkg.rating} ({pkg.reviews})
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`text-xs border-0 ${statusConfig[pkg.status]?.color ?? ""}`}>
                      {statusConfig[pkg.status]?.label ?? pkg.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-1">
                      <Link href={`/paket-wisata/${pkg.id}`} target="_blank">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Eye className="w-4 h-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => handleEdit(pkg)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => { setDeleteId(pkg.id); setShowDeleteModal(true); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Tidak ada paket ditemukan.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Paket Wisata" : "Tambah Paket Wisata"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Judul Paket *</label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Pesona Danau Toba" required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Lokasi *</label>
                <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Samosir" required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Provinsi *</label>
                <Input value={form.province} onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))} placeholder="Sumatera Utara" required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Durasi *</label>
                <Input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="4 Hari 3 Malam" required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Kapasitas (pax)</label>
                <Input value={form.pax} onChange={(e) => setForm((f) => ({ ...f, pax: e.target.value }))} placeholder="2-8" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Harga (Rp) *</label>
                <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="3500000" required />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground outline-none"
                >
                  <option value="">Pilih kategori</option>
                  {["Alam", "Pegunungan", "Pantai", "Budaya", "Petualangan"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground outline-none"
                >
                  <option value="active">Aktif</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Arsip</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">URL Gambar</label>
                <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit" className="gradient-hero border-0 text-primary-foreground">
                {editId ? "Update" : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Yakin ingin menghapus paket wisata ini? Tindakan ini tidak dapat dibatalkan.</p>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
