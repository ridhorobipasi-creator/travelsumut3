import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/contacts/data", { params: { search, per_page: 50 } })
      .then(res => setContacts(res.data.data ?? []))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/contacts/data/${deleteId}`);
      toast.success("Pesan berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus pesan");
    }
  };

  const handleView = async (c: any) => {
    setSelected(c);
    if (c.status === "unread") {
      await axios.patch(`/admin/contacts/data/${c.id}`, { status: "read" }).catch(() => {});
      fetchData();
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pesan Kontak - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Pesan Kontak</h1>
          <p className="text-sm text-muted-foreground">Total {contacts.length} pesan</p>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Cari pesan..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Pesan</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>
            )}
            {!loading && contacts.map((c) => (
              <tr key={c.id} className={`border-b ${c.status === "unread" ? "font-semibold" : ""}`}>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2 max-w-xs truncate">{c.message}</td>
                <td className="p-2 capitalize">{c.status}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(c)}><Eye className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(c.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && contacts.length === 0 && (
              <tr><td colSpan={5} className="p-2 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <div className="space-y-3 text-sm">
              <p><span className="font-semibold">Nama:</span> {selected.name}</p>
              <p><span className="font-semibold">Email:</span> {selected.email}</p>
              {selected.phone && <p><span className="font-semibold">Telepon:</span> {selected.phone}</p>}
              {selected.subject && <p><span className="font-semibold">Subjek:</span> {selected.subject}</p>}
              <p><span className="font-semibold">Pesan:</span></p>
              <p className="whitespace-pre-wrap bg-muted p-3 rounded">{selected.message}</p>
              <Button variant="outline" className="w-full" onClick={() => setSelected(null)}>Tutup</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <div className="space-y-4">
            <p>Yakin ingin menghapus pesan ini?</p>
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
