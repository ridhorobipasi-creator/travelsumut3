import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number|null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    is_active: true,
  });

  const fetchData = () => {
    setLoading(true);
    axios.get('/admin/pages-data', {
      params: { search, page, per_page: perPage }
    })
      .then(res => {
        setPages(res.data.data);
        setTotal(res.data.total);
        setLastPage(res.data.last_page);
      })
      .catch(() => {
         const mocks = [
           { id: 1, title: "Tentang Kami", slug: "tentang-kami", is_active: true, content: "<p>SumutTour adalah platform wisata...</p>" },
           { id: 2, title: "Syarat & Ketentuan", slug: "syarat-ketentuan", is_active: true, content: "<p>Syarat dan ketentuan layanan...</p>" },
           { id: 3, title: "Kebijakan Privasi", slug: "kebijakan-privasi", is_active: false, content: "<p>Kebijakan privasi platform...</p>" },
         ];
         const filtered = mocks.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
         setPages(filtered);
         setTotal(filtered.length);
         setLastPage(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [search, page]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/pages-data/${editId}`, form);
        toast.success('Halaman berhasil diupdate');
      } else {
        await axios.post('/admin/pages-data', form);
        toast.success('Halaman berhasil ditambah');
      }
      setShowModal(false);
      setForm({ title: "", slug: "", content: "", is_active: true });
      setEditId(null);
      fetchData();
    } catch (err: any) {
      toast.error('Gagal menyimpan data');
    }
  };

  const handleEdit = (pg: any) => {
    setForm({
      title: pg.title || "",
      slug: pg.slug || "",
      content: pg.content || "",
      is_active: !!pg.is_active,
    });
    setEditId(pg.id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/pages-data/${deleteId}`);
      toast.success('Halaman berhasil dihapus');
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchData();
    } catch (err: any) {
      toast.error('Gagal menghapus data');
    }
  };

  return (
    <AdminLayout>
      <Head title="Admin Halaman Statis" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-2xl font-bold">Halaman Statis</h1>
        <Button onClick={() => { setShowModal(true); setEditId(null); setForm({ title: "", slug: "", content: "", is_active: true }); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Halaman
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Cari halaman..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map(pg => (
          <Card key={pg.id}>
            <CardHeader>
              <span className="font-bold text-lg">{pg.title}</span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Slug: {pg.slug}</span>
                <Badge color={pg.is_active ? "green" : "red"}>{pg.is_active ? "Aktif" : "Nonaktif"}</Badge>
                <div className="line-clamp-2 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: pg.content }} />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(pg)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(pg.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Modal Tambah/Edit */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Input placeholder="Judul" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            <Input placeholder="Slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required />
            <textarea className="border rounded p-2" placeholder="Konten" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} /> Aktif
            </label>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal Hapus */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <div>Yakin ingin menghapus halaman ini?</div>
          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
