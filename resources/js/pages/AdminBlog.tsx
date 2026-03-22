import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, Filter, Calendar, Clock, Eye as ViewIcon, MessageSquare } from "lucide-react";


export default function AdminBlog() {
  const [articles, setArticles] = useState<any[]>([]);
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
    category: "",
    date: "",
    read_time: "",
    status: "published",
    image: "",
    imageFile: null as File | null,
    content: "",
  });
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get('/admin/blog', {
      params: { search, page, per_page: perPage }
    })
      .then(res => {
        setArticles(res.data.data);
        setTotal(res.data.total);
        setLastPage(res.data.last_page);
      })
      .catch(() => {
        // Fallback mock data
        const mocks = [
          {
            id: 1, title: "7 Hal yang Wajib Dilakukan Saat Mengunjungi Danau Toba", category: "Tips Wisata", status: "published",
            date: "15 Mar 2026", readTime: "5 min", views: 1240,
            image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=400&auto=format&fit=crop",
            content: "Danau Toba adalah..."
          },
          {
            id: 2, title: "Panduan Off-road di Berastagi dengan Keluarga", category: "Petualangan", status: "published",
            date: "12 Mar 2026", readTime: "7 min", views: 980,
            image: "https://images.unsplash.com/photo-1579308102431-7e50c76cebb9?q=80&w=400&auto=format&fit=crop",
            content: "Berastagi menawarkan..."
          },
          {
            id: 3, title: "Ekowisata Lintas Alam di Bukit Lawang", category: "Alam", status: "draft",
            date: "10 Mar 2026", readTime: "6 min", views: 0,
            image: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=400&auto=format&fit=crop",
            content: "Bukit Lawang adalah..."
          }
        ];
        // Apply search filter
        const filtered = mocks.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));
        setArticles(filtered);
        setTotal(filtered.length);
        setLastPage(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [search, page]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/admin/blog/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({ ...f, image: res.data.url, imageFile: file }));
      toast.success("Upload gambar berhasil");
    } catch (err) {
      toast.error("Upload gambar gagal");
    }
    setUploading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/blog/${editId}`, {
          ...form,
          read_time: form.read_time,
        });
        toast.success("Artikel berhasil diupdate");
      } else {
        await axios.post("/admin/blog", {
          ...form,
          read_time: form.read_time,
        });
        toast.success("Artikel berhasil ditambah");
      }
      setShowModal(false);
      setEditId(null);
      setForm({ title: "", category: "", date: "", read_time: "", status: "published", image: "", imageFile: null, content: "" });
      fetchData();
    } catch (err) {
      toast.error(editId ? "Gagal update artikel" : "Gagal menambah artikel");
    }
  };

  const handleEdit = (article: any) => {
    setEditId(article.id);
    setForm({
      title: article.title,
      category: article.category,
      date: article.date,
      read_time: article.read_time,
      status: article.status,
      image: article.image,
      imageFile: null,
      content: article.content,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/blog/${deleteId}`);
      toast.success("Artikel berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      toast.error("Gagal menghapus artikel");
    }
  };

const statusColors: Record<string, string> = {
  published: "bg-primary text-primary-foreground",
  draft: "bg-secondary text-secondary-foreground",
  archived: "bg-muted text-muted-foreground"
};

  return (
    <AdminLayout>
      <Head title="Kelola Blog - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Blog</h1>
          <p className="text-sm text-muted-foreground">Total {articles.length} artikel</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Artikel
        </Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-[350px]">
          <h2 className="font-bold text-lg mb-2">Tambah Artikel</h2>
          <Input name="title" placeholder="Judul Artikel" value={form.title} onChange={handleFormChange} required />
          <Input name="category" placeholder="Kategori" value={form.category} onChange={handleFormChange} required />
          <Input name="date" placeholder="Tanggal" value={form.date} onChange={handleFormChange} type="date" required />
          <Input name="read_time" placeholder="Waktu Baca (misal: 5 min)" value={form.read_time} onChange={handleFormChange} required />
          <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded p-2">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <div>
            <label className="block text-sm mb-1">Gambar</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading && <div className="text-xs text-muted-foreground mt-1">Mengupload...</div>}
            {form.image && <img src={form.image} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
          </div>
          <textarea name="content" placeholder="Konten artikel" value={form.content} onChange={handleFormChange} className="w-full border rounded p-2 min-h-[80px]" required />
          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="submit" disabled={uploading}>Simpan</Button>
          </div>
        </form>
      </Dialog>

      <Card className="border-0 shadow-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari artikel..."
                className="pl-10"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-3 h-3 mr-1" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Artikel</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Kategori</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Views</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm line-clamp-1">{article.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{article.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={statusColors[article.status]}>{article.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ViewIcon className="w-3 h-3" /> {article.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/blog/${article.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(article)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => { setDeleteId(article.id); setShowDeleteModal(true); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                            {/* Modal Konfirmasi Hapus */}
                            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                              <DialogContent>
                                <div className="p-4">
                                  <h2 className="font-bold text-lg mb-2">Konfirmasi Hapus</h2>
                                  <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
                                  <div className="flex gap-2 justify-end mt-4">
                                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
                                    <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Menampilkan {articles.length} dari {total} data</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Sebelumnya</Button>
              <span className="text-sm">Halaman {page} / {lastPage}</span>
              <Button variant="outline" size="sm" disabled={page === lastPage} onClick={() => setPage(page + 1)}>Berikutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
