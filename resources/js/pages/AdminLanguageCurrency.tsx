import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AdminLanguageCurrency() {
  const [settings, setSettings] = useState({
    language: "",
    currency: "",
    currency_symbol: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/settings/data")
      .then(res => {
        const d = res.data;
        setSettings({
          language: d.language ?? "",
          currency: d.currency ?? "",
          currency_symbol: d.currency_symbol ?? "",
        });
      })
      .catch(() => toast.error("Gagal memuat pengaturan"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("/admin/settings/data", { settings });
      toast.success("Pengaturan berhasil disimpan");
      setEditing(false);
    } catch {
      toast.error("Gagal menyimpan pengaturan");
    }
    setSaving(false);
  };

  return (
    <AdminLayout>
      <Head title="Bahasa & Kurs Mata Uang - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Bahasa & Kurs Mata Uang</h1>
          <p className="text-sm text-muted-foreground">Pengaturan bahasa dan mata uang website</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)} disabled={loading}>Edit Pengaturan</Button>
        )}
      </div>
      {loading ? (
        <p className="text-muted-foreground">Memuat...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1">
            <label className="text-sm font-medium">Bahasa</label>
            <Input name="language" placeholder="Contoh: Indonesia" value={settings.language} onChange={handleFormChange} disabled={!editing} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Mata Uang</label>
            <Input name="currency" placeholder="Contoh: IDR" value={settings.currency} onChange={handleFormChange} disabled={!editing} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Simbol Mata Uang</label>
            <Input name="currency_symbol" placeholder="Contoh: Rp" value={settings.currency_symbol} onChange={handleFormChange} disabled={!editing} />
          </div>
          {editing && (
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => { setEditing(false); fetchData(); }}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
            </div>
          )}
        </form>
      )}
    </AdminLayout>
  );
}
