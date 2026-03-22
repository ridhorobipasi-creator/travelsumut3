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

export default function AdminInstagram() {
  const [feeds, setFeeds] = useState<any[]>([]);
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
    image_url: "",
    caption: "",
    link: "",
    is_active: true,
  });

  const fetchData = () => {
    setLoading(true);
    axios.get('/admin/instagram-feeds', { params: { search, page, per_page: perPage } })
      .then(res => {
        const d = res.data;
        setFeeds(d.data ?? d);
        setTotal(d.total ?? 0);
        setLastPage(d.last_page ?? 1);
      })
      .catch(() => toast.error("Gagal memuat data Instagram"))
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
        await axios.put(`/admin/instagram-feeds/${editId}`, form);
        toast.success('Feed berhasil diupdate');
      } else {
        await axios.post('/admin/instagram-feeds', form);
        toast.success('Feed berhasil ditambah');
      }
      setShowModal(false);
      setForm({ image_url: "", caption: "", link: "", is_active: true });
      setEditId(null);
      fetchData();
    } catch (err: any) {
      toast.error('Gagal menyimpan data');
    }
  };

  const handleEdit = (feed: any) => {
    setForm({
      image_url: feed.image_url || "",
      caption: feed.caption || "",
      link: feed.link || "",
      is_active: !!feed.is_active,
    });
    setEditId(feed.id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/instagram-feeds/${deleteId}`);
      toast.success('Feed berhasil dihapus');
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchData();
    } catch (err: any) {
      toast.error('Gagal menghapus data');
    }
  };

  return (
    <AdminLayout>
      <Head title="Admin Instagram Feeds" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-2xl font-bold">Instagram Feeds</h1>
        <Button onClick={() => { setShowModal(true); setEditId(null); setForm({ image_url: "", caption: "", link: "", is_active: true }); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Feed
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Cari feed..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeds.map(feed => (
          <Card key={feed.id}>
            <CardHeader>
              <img src={feed.image_url} alt="Feed" className="w-full h-48 object-cover rounded" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="font-bold">{feed.caption}</span>
                <span className="text-xs text-gray-500">{feed.link}</span>
                <Badge color={feed.is_active ? "green" : "red"}>{feed.is_active ? "Aktif" : "Nonaktif"}</Badge>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(feed)}><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => { setDeleteId(feed.id); setShowDeleteModal(true); }}><Trash2 className="w-4 h-4" /></Button>
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
            <Input placeholder="URL Gambar" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} required />
            <Input placeholder="Caption" value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} />
            <Input placeholder="Link" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
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
          <div>Yakin ingin menghapus feed ini?</div>
          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
