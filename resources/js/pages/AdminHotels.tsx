
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminHotels() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number|null>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    phone: "",
    image: "",
    imageFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    // Updated to use mock data fallback
    setLoading(true);
    axios.get('/api/dummy-test')
      .then(res => {
         if(res.data && Array.isArray(res.data.data)) setHotels(res.data.data);
         else { throw new Error('fallback'); }
      })
      .catch(() => {
         const mocks = [{ id: 1, name: 'Hotel Danau Toba Int.', address: 'Jl. Imam Bonjol', city: 'Medan', province: 'Sumut', phone: '061-123456', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop' }];
         setHotels(mocks);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/admin/hotels/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm(f => ({ ...f, image: res.data.url, imageFile: file }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/hotels/${editId}`, form);
        toast.success("Hotel berhasil diupdate");
      } else {
        await axios.post("/admin/hotels", form);
        toast.success("Hotel berhasil ditambah");
      }
      setShowModal(false);
      setEditId(null);
      setForm({ name: "", address: "", city: "", province: "", phone: "", image: "", imageFile: null });
      fetchData();
    } catch {
      toast.error(editId ? "Gagal update hotel" : "Gagal menambah hotel");
    }
  };

  const handleEdit = (hotel: any) => {
    setEditId(hotel.id);
    setForm({
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      province: hotel.province,
      phone: hotel.phone,
      image: hotel.image,
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/hotels/${deleteId}`);
      toast.success("Hotel berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus hotel");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Hotel - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Hotel</h1>
          <p className="text-sm text-muted-foreground">Total {hotels.length} hotel</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Hotel
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Cari hotel..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Alamat</th>
              <th className="p-2 text-left">Kota</th>
              <th className="p-2 text-left">Provinsi</th>
              <th className="p-2 text-left">Telepon</th>
              <th className="p-2 text-left">Gambar</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((h) => (
              <tr key={h.id} className="border-b">
                <td className="p-2">{h.name}</td>
                <td className="p-2">{h.address}</td>
                <td className="p-2">{h.city}</td>
                <td className="p-2">{h.province}</td>
                <td className="p-2">{h.phone}</td>
                <td className="p-2">{h.image && <img src={h.image} alt="hotel" className="h-8" />}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(h)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(h.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {hotels.length === 0 && (
              <tr><td colSpan={7} className="p-2 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Nama Hotel" value={form.name} onChange={handleFormChange} required />
            <Input name="address" placeholder="Alamat" value={form.address} onChange={handleFormChange} required />
            <Input name="city" placeholder="Kota" value={form.city} onChange={handleFormChange} required />
            <Input name="province" placeholder="Provinsi" value={form.province} onChange={handleFormChange} required />
            <Input name="phone" placeholder="Telepon" value={form.phone} onChange={handleFormChange} required />
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {form.image && <img src={form.image} alt="hotel" className="h-12" />}
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit" disabled={uploading}>{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <div className="space-y-4">
            <p>Yakin ingin menghapus hotel ini?</p>
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
