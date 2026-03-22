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

const categories = ["Alam", "Danau", "Gunung", "Budaya"];

export default function AdminGallery() {
  const [photos, setPhotos] = useState<any[]>([]);
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
    src: "",
    alt: "",
    category: "Alam",
    imageFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get('/admin/gallery', {
      params: { search, page, per_page: perPage }
    })
      .then(res => {
        setPhotos(res.data.data);
        setTotal(res.data.total);
        setLastPage(res.data.last_page);
      })
      .catch(() => {
        // Fallback mock data
        const mocks = [
          { id: 1, src: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=400&auto=format&fit=crop", alt: "Keindahan Danau Toba", category: "Danau" },
          { id: 2, src: "https://images.unsplash.com/photo-1579308102431-7e50c76cebb9?q=80&w=400&auto=format&fit=crop", alt: "Pegunungan Berastagi", category: "Gunung" },
          { id: 3, src: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=400&auto=format&fit=crop", alt: "Hutan Bukit Lawang", category: "Alam" },
          { id: 4, src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=400&auto=format&fit=crop", alt: "Istana Maimun", category: "Budaya" },
        ];
        const filtered = mocks.filter(m => m.alt.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()));
        setPhotos(filtered);
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
      const res = await axios.post("/admin/gallery/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({ ...f, src: res.data.url, imageFile: file }));
      toast.success("Upload gambar berhasil");
    } catch (err) {
      toast.error("Upload gambar gagal");
    }
    setUploading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/admin/gallery/${editId}`, {
          ...form,
        });
        toast.success("Foto berhasil diupdate");
      } else {
        await axios.post("/admin/gallery", {
          ...form,
        });
        toast.success("Foto berhasil ditambah");
      }
      setShowModal(false);
      setEditId(null);
      setForm({ src: "", alt: "", category: "Alam", imageFile: null });
      fetchData();
    } catch (err) {
      toast.error(editId ? "Gagal update foto" : "Gagal menambah foto");
    }
  };

  const handleEdit = (photo: any) => {
    setEditId(photo.id);
    setForm({
      src: photo.src,
      alt: photo.alt,
      category: photo.category,
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/admin/gallery/${deleteId}`);
      toast.success("Foto berhasil dihapus");
      setDeleteId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      toast.error("Gagal menghapus foto");
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Galeri - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Galeri</h1>
          <p className="text-sm text-muted-foreground">Total {photos.length} foto</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Foto
        </Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-[350px]">
          <h2 className="font-bold text-lg mb-2">Tambah Foto Galeri</h2>
          <Input name="alt" placeholder="Deskripsi Foto" value={form.alt} onChange={handleFormChange} required />
          <select name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded p-2">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div>
            <label className="block text-sm mb-1">Gambar</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading && <div className="text-xs text-muted-foreground mt-1">Mengupload...</div>}
            {form.src && <img src={form.src} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
          </div>
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
                placeholder="Cari foto..."
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-4 text-center py-10">Memuat data...</div>
            ) : (
              photos.map((photo) => (
                <div key={photo.id} className="rounded-lg overflow-hidden bg-muted relative group">
                  <img src={photo.src} alt={photo.alt} className="w-full h-32 object-cover" />
                  <div className="p-2 flex flex-col gap-1">
                    <span className="text-xs font-medium">{photo.alt}</span>
                    <Badge variant="secondary" className="text-xs w-fit">{photo.category}</Badge>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(photo)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => { setDeleteId(photo.id); setShowDeleteModal(true); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Modal Konfirmasi Hapus */}
          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogContent>
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">Konfirmasi Hapus</h2>
                <p>Apakah Anda yakin ingin menghapus foto ini?</p>
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
                  <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Menampilkan {photos.length} dari {total} data</div>
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
