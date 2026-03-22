import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";

const emptyProfile = { name: "", address: "", phone: "", email: "", website: "", logo: "", description: "" };

export default function AdminBusinessProfile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get("/admin/business-profile/data")
      .then(res => setProfile(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/admin/business-profile/data", profile);
      setProfile(res.data);
      toast.success("Profil bisnis berhasil diupdate");
      setEditing(false);
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      const msg = errors ? Object.values(errors).flat().join(", ") : "Gagal update profil bisnis";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <Head title="Profil Bisnis - Admin" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Profil Bisnis</h1>
        {!editing && <Button onClick={() => setEditing(true)}>Edit Profil</Button>}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Nama Bisnis *</label>
          <Input name="name" placeholder="Nama Bisnis" value={profile.name} onChange={handleFormChange} disabled={!editing} required />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Alamat *</label>
          <Input name="address" placeholder="Alamat" value={profile.address} onChange={handleFormChange} disabled={!editing} required />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Telepon *</label>
          <Input name="phone" placeholder="Telepon" value={profile.phone} onChange={handleFormChange} disabled={!editing} required />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Email *</label>
          <Input name="email" type="email" placeholder="Email" value={profile.email} onChange={handleFormChange} disabled={!editing} required />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Website</label>
          <Input name="website" placeholder="https://..." value={profile.website} onChange={handleFormChange} disabled={!editing} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Deskripsi</label>
          <textarea
            name="description"
            placeholder="Deskripsi singkat bisnis..."
            value={profile.description}
            onChange={handleFormChange}
            disabled={!editing}
            rows={3}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground outline-none resize-none disabled:opacity-60"
          />
        </div>
        {editing && (
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setEditing(false)}>Batal</Button>
            <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
          </div>
        )}
      </form>
    </AdminLayout>
  );
}
