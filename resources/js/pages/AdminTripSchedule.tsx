import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminTripSchedule() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    status: "",
  });

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/trip-schedule/data", { params: { search } })
      .then(res => setTrips(res.data.data ?? res.data))
      .catch(() => toast.error("Gagal memuat data jadwal trip"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ title: "", date: "", location: "", status: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/trip-schedule/data/${editId}`, form);
        toast.success("Jadwal trip berhasil diupdate");
      } else {
        await axios.post("/admin/trip-schedule/data", form);
        toast.success("Jadwal trip berhasil ditambah");
      }
      resetForm();
      fetchData();
    } catch {
      toast.error(editId ? "Gagal update jadwal trip" : "Gagal menambah jadwal trip");
    }
  };

  const handleEdit = (trip: any) => {
    setEditId(trip.id);
    setForm({
      title: trip.title ?? "",
      date: trip.date ?? "",
      location: trip.location ?? "",
      status: trip.status ?? "",
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/trip-schedule/data/${deleteId}`);
      toast.success("Jadwal trip berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus jadwal trip");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Jadwal Trip - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Jadwal Trip</h1>
          <p className="text-sm text-muted-foreground">Total {trips.length} jadwal</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Jadwal
        </Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Cari jadwal..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Judul</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Lokasi</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>
            )}
            {!loading && trips.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.title}</td>
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.location}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(t)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(t.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && trips.length === 0 && (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={v => { if (!v) resetForm(); else setShowModal(true); }}>
        <DialogContent>
          <h2 className="font-bold text-lg mb-4">{editId ? "Edit Jadwal Trip" : "Tambah Jadwal Trip"}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="title" placeholder="Judul Trip" value={form.title} onChange={handleFormChange} required />
            <Input name="date" type="date" placeholder="Tanggal" value={form.date} onChange={handleFormChange} required />
            <Input name="location" placeholder="Lokasi" value={form.location} onChange={handleFormChange} required />
            <Input name="status" placeholder="Status (Scheduled/Ongoing/Completed)" value={form.status} onChange={handleFormChange} required />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
              <Button type="submit">{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <p className="mb-4">Yakin ingin menghapus jadwal trip ini?</p>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
