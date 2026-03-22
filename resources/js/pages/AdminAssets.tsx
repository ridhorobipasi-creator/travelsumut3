import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminAssets() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    license: "",
    status: "",
    image: "",
  });

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/assets/data", { params: { search } })
      .then(res => setAssets(res.data.data ?? res.data))
      .catch(() => toast.error("Gagal memuat data aset"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await axios.post("/admin/assets/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm(f => ({ ...f, image: res.data.url }));
      toast.success("Upload gambar berhasil");
    } catch {
      toast.error("Upload gambar gagal");
    }
    setUploading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", type: "", license: "", status: "", image: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/assets/data/${editId}`, form);
        toast.success("Aset berhasil diupdate");
      } else {
        await axios.post("/admin/assets/data", form);
        toast.success("Aset berhasil ditambah");
      }
      resetForm();
      fetchData();
    } catch {
      toast.error(editId ? "Gagal update aset" : "Gagal menambah aset");
    }
  };

  const handleEdit = (asset: any) => {
    setEditId(asset.id);
    setForm({
      name: asset.name ?? "",
      type: asset.type ?? "",
      license: asset.license ?? "",
      status: asset.status ?? "",
      image: asset.image ?? "",
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/assets/data/${deleteId}`);
      toast.success("Aset berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus aset");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Aset & Armada - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Aset & Armada</h1>
          <p className="text-sm text-muted-foreground">Total {assets.length} aset</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Aset
        </Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Cari aset..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Tipe</th>
              <th className="p-2 text-left">Plat/Lisensi</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Gambar</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>
            )}
            {!loading && assets.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.type}</td>
                <td className="p-2">{a.license}</td>
                <td className="p-2">{a.status}</td>
                <td className="p-2">{a.image && <img src={a.image} alt="aset" className="h-8 rounded" />}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(a)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(a.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && assets.length === 0 && (
              <tr><td colSpan={6} className="p-4 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={v => { if (!v) resetForm(); else setShowModal(true); }}>
        <DialogContent>
          <h2 className="font-bold text-lg mb-4">{editId ? "Edit Aset" : "Tambah Aset"}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="name" placeholder="Nama Aset" value={form.name} onChange={handleFormChange} required />
            <Input name="type" placeholder="Tipe (misal: Kendaraan, Banner)" value={form.type} onChange={handleFormChange} required />
            <Input name="license" placeholder="Plat/Lisensi" value={form.license} onChange={handleFormChange} />
            <Input name="status" placeholder="Status (Aktif/Tidak Aktif)" value={form.status} onChange={handleFormChange} required />
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {form.image && <img src={form.image} alt="preview" className="h-12 rounded" />}
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
              <Button type="submit" disabled={uploading}>{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <p className="mb-4">Yakin ingin menghapus aset ini?</p>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
