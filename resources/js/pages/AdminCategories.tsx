import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const empty = { name: "", description: "" };

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/categories/data", { params: { search, per_page: 50 } })
      .then(res => setCategories(res.data.data ?? []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/categories/data/${editId}`, form);
        toast.success("Kategori berhasil diupdate");
      } else {
        await axios.post("/admin/categories/data", form);
        toast.success("Kategori berhasil ditambah");
      }
      setShowModal(false); setEditId(null); setForm(empty); fetchData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Gagal menyimpan kategori");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/categories/data/${deleteId}`);
      toast.success("Kategori berhasil dihapus");
      setDeleteId(null); setShowDeleteModal(false); fetchData();
    } catch { toast.error("Gagal menghapus kategori"); }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Kategori - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Kategori</h1>
          <p className="text-sm text-muted-foreground">Total {categories.length} kategori</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => { setEditId(null); setForm(empty); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Kategori
        </Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Cari kategori..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="bg-muted">
            <th className="p-2 text-left">Nama</th>
            <th className="p-2 text-left">Deskripsi</th>
            <th className="p-2 text-left">Aksi</th>
          </tr></thead>
          <tbody>
            {loading && <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>}
            {!loading && categories.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-2 font-medium">{c.name}</td>
                <td className="p-2 text-muted-foreground">{c.description}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditId(c.id); setForm({ name: c.name, description: c.description ?? "" }); setShowModal(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(c.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && categories.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Nama Kategori" value={form.name} onChange={onChange} required />
            <Input name="description" placeholder="Deskripsi" value={form.description} onChange={onChange} />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <p>Yakin ingin menghapus kategori ini?</p>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
