import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const empty = { name: "", email: "", phone: "", address: "", logo: "" };

export default function AdminPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/partners/data", { params: { search, per_page: 50 } })
      .then(res => setPartners(res.data.data ?? []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const fd = new FormData(); fd.append("logo", e.target.files[0]);
    try {
      const res = await axios.post("/admin/partners/upload-logo", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm(f => ({ ...f, logo: res.data.url }));
      toast.success("Upload logo berhasil");
    } catch { toast.error("Upload logo gagal"); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) { await axios.put(`/admin/partners/data/${editId}`, form); toast.success("Partner diupdate"); }
      else { await axios.post("/admin/partners/data", form); toast.success("Partner ditambah"); }
      setShowModal(false); setEditId(null); setForm(empty); fetchData();
    } catch (err: any) { toast.error(err?.response?.data?.message ?? "Gagal menyimpan"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await axios.delete(`/admin/partners/data/${deleteId}`); toast.success("Partner dihapus"); setDeleteId(null); setShowDeleteModal(false); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Partner - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Partner</h1>
          <p className="text-sm text-muted-foreground">Total {partners.length} partner</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => { setEditId(null); setForm(empty); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Partner
        </Button>
      </div>
      <div className="mb-4"><Input placeholder="Cari partner..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="bg-muted">
            <th className="p-2 text-left">Nama</th><th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Telepon</th><th className="p-2 text-left">Logo</th>
            <th className="p-2 text-left">Aksi</th>
          </tr></thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>}
            {!loading && partners.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2 font-medium">{p.name}</td>
                <td className="p-2">{p.email}</td>
                <td className="p-2">{p.phone}</td>
                <td className="p-2">{p.logo && <img src={p.logo} alt="logo" className="h-8 rounded" />}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditId(p.id); setForm({ name: p.name, email: p.email ?? "", phone: p.phone ?? "", address: p.address ?? "", logo: p.logo ?? "" }); setShowModal(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(p.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && partners.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="name" placeholder="Nama Partner" value={form.name} onChange={onChange} required />
            <Input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
            <Input name="phone" placeholder="Telepon" value={form.phone} onChange={onChange} />
            <Input name="address" placeholder="Alamat" value={form.address} onChange={onChange} />
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Upload Logo</label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {form.logo && <img src={form.logo} alt="logo" className="h-10 mt-2 rounded" />}
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit" disabled={uploading}>{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <p>Yakin ingin menghapus partner ini?</p>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
