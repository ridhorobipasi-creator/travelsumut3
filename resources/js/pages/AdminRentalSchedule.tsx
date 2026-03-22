import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminRentalSchedule() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    vehicle: "",
    status: "",
  });

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/rental-schedule/data", { params: { search } })
      .then(res => setRentals(res.data.data ?? res.data))
      .catch(() => toast.error("Gagal memuat data jadwal rental"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({ title: "", date: "", vehicle: "", status: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/rental-schedule/data/${editId}`, form);
        toast.success("Jadwal rental berhasil diupdate");
      } else {
        await axios.post("/admin/rental-schedule/data", form);
        toast.success("Jadwal rental berhasil ditambah");
      }
      resetForm();
      fetchData();
    } catch {
      toast.error(editId ? "Gagal update jadwal rental" : "Gagal menambah jadwal rental");
    }
  };

  const handleEdit = (rental: any) => {
    setEditId(rental.id);
    setForm({
      title: rental.title ?? "",
      date: rental.date ?? "",
      vehicle: rental.vehicle ?? "",
      status: rental.status ?? "",
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/rental-schedule/data/${deleteId}`);
      toast.success("Jadwal rental berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch {
      toast.error("Gagal menghapus jadwal rental");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Jadwal Rental - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Jadwal Rental</h1>
          <p className="text-sm text-muted-foreground">Total {rentals.length} jadwal</p>
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
              <th className="p-2 text-left">Armada</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>
            )}
            {!loading && rentals.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.title}</td>
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.vehicle}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(r)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(r.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && rentals.length === 0 && (
              <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={v => { if (!v) resetForm(); else setShowModal(true); }}>
        <DialogContent>
          <h2 className="font-bold text-lg mb-4">{editId ? "Edit Jadwal Rental" : "Tambah Jadwal Rental"}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input name="title" placeholder="Judul / Nama Pemesan" value={form.title} onChange={handleFormChange} required />
            <Input name="date" type="date" placeholder="Tanggal" value={form.date} onChange={handleFormChange} required />
            <Input name="vehicle" placeholder="Armada (misal: Innova Reborn)" value={form.vehicle} onChange={handleFormChange} required />
            <Input name="status" placeholder="Status (Booked/Ongoing/Done)" value={form.status} onChange={handleFormChange} required />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
              <Button type="submit">{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <p className="mb-4">Yakin ingin menghapus jadwal rental ini?</p>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
