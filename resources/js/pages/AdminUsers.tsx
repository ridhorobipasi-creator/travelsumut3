import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const emptyForm = { name: "", email: "", role: "user", password: "" };

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/users-data", { params: { search, per_page: 50 } })
      .then(res => setUsers(res.data.data ?? []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/users-data/${editId}`, form);
        toast.success("User berhasil diupdate");
      } else {
        await axios.post("/admin/users-data", form);
        toast.success("User berhasil ditambah");
      }
      setShowModal(false);
      setEditId(null);
      setForm(emptyForm);
      fetchData();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? (editId ? "Gagal update user" : "Gagal menambah user");
      toast.error(msg);
    }
  };

  const handleEdit = (user: any) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, role: user.is_admin ? "admin" : "user", password: "" });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/users-data/${deleteId}`);
      toast.success("User berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Gagal menghapus user");
    }
  };

  return (
    <AdminLayout>
      <Head title="Manajemen Pengguna - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Manajemen Pengguna</h1>
          <p className="text-sm text-muted-foreground">Total {users.length} pengguna</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => { setEditId(null); setForm(emptyForm); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah User
        </Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Cari user..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>}
            {!loading && users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.is_admin ? "Admin" : "User"}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(u)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(u.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr><td colSpan={4} className="p-2 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Nama" value={form.name} onChange={handleFormChange} required />
            <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleFormChange} required />
            <select name="role" value={form.role} onChange={handleFormChange} className="w-full border rounded p-2 bg-background">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Input name="password" type="password" placeholder={editId ? "Password baru (kosongkan jika tidak diubah)" : "Password"} value={form.password} onChange={handleFormChange} required={!editId} />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">{editId ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <div className="space-y-4">
            <p>Yakin ingin menghapus user ini?</p>
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
