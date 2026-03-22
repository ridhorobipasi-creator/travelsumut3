import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/reviews/data", { params: { search, per_page: 50 } })
      .then(res => setReviews(res.data.data ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/reviews/data/${deleteId}`);
      toast.success("Review berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus review");
    }
  };

  const handleToggleStatus = async (r: any) => {
    const next = r.status === "published" ? "hidden" : "published";
    try {
      await axios.put(`/admin/reviews/data/${r.id}`, { status: next });
      fetchData();
    } catch {
      toast.error("Gagal update status");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Review - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Review</h1>
          <p className="text-sm text-muted-foreground">Total {reviews.length} review</p>
        </div>
      </div>
      <div className="mb-4">
        <Input placeholder="Cari review..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Isi</th>
              <th className="p-2 text-left">Sumber</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>}
            {!loading && reviews.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.name}</td>
                <td className="p-2">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{r.rating}
                  </span>
                </td>
                <td className="p-2 max-w-xs truncate">{r.text}</td>
                <td className="p-2">{r.source ?? "-"}</td>
                <td className="p-2 capitalize">{r.status}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleToggleStatus(r)}>
                    {r.status === "published" ? "Sembunyikan" : "Publish"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(r.id); setShowDeleteModal(true); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {!loading && reviews.length === 0 && (
              <tr><td colSpan={6} className="p-2 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <div className="space-y-4">
            <p>Yakin ingin menghapus review ini?</p>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
              <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
