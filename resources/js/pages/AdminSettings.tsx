import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Save, Globe } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

type SettingsMap = Record<string, string>;

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "general", label: "Umum", icon: Settings },
    { id: "seo", label: "SEO & Website", icon: Globe },
  ];

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/settings/data")
      .then(res => setSettings(res.data ?? {}))
      .catch(() => toast.error("Gagal memuat pengaturan"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (key: string, value: string) => {
    setSettings(s => ({ ...s, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("/admin/settings/data", { settings });
      toast.success("Pengaturan berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan pengaturan");
    }
    setSaving(false);
  };

  const val = (key: string) => settings[key] ?? "";

  return (
    <AdminLayout>
      <Head title="Pengaturan Sistem - Admin SumutTour" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Pengaturan Sistem</h1>
          <p className="text-sm text-muted-foreground">Konfigurasi dasar website dan platform SumutTour.</p>
        </div>
        <Button className="gradient-hero border-0 text-primary-foreground" onClick={handleSave} disabled={saving || loading}>
          <Save className="w-4 h-4 mr-2" /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card md:col-span-1 h-fit">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary" : "opacity-50"}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card md:col-span-3">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-display text-xl">{tabs.find(t => t.id === activeTab)?.label}</CardTitle>
            <CardDescription>
              {activeTab === "general" && "Pengaturan nama, kontak, dan informasi dasar website."}
              {activeTab === "seo" && "Optimasi mesin pencari dan integrasi analitik."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {loading ? (
              <p className="text-muted-foreground">Memuat pengaturan...</p>
            ) : (
              <>
                {activeTab === "general" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Website</label>
                      <Input value={val("site_name")} onChange={e => handleChange("site_name", e.target.value)} placeholder="SumutTour" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tagline</label>
                      <Input value={val("tagline")} onChange={e => handleChange("tagline", e.target.value)} placeholder="Platform Wisata #1 Sumatera Utara" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Kontak Utama</label>
                      <Input type="email" value={val("contact_email")} onChange={e => handleChange("contact_email", e.target.value)} placeholder="info@sumuttour.id" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">WhatsApp CS</label>
                      <Input value={val("whatsapp")} onChange={e => handleChange("whatsapp", e.target.value)} placeholder="+6281166554433" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Alamat Kantor</label>
                      <textarea
                        className="w-full min-h-[100px] border border-input bg-background px-3 py-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={val("office_address")}
                        onChange={e => handleChange("office_address", e.target.value)}
                        placeholder="Jl. Jenderal Sudirman No. 123, Medan"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Meta Description Global</label>
                      <textarea
                        className="w-full min-h-[80px] border border-input bg-background px-3 py-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={val("meta_description")}
                        onChange={e => handleChange("meta_description", e.target.value)}
                        placeholder="Platform wisata terpercaya untuk menjelajahi keindahan Sumatera Utara."
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Keywords</label>
                      <Input value={val("meta_keywords")} onChange={e => handleChange("meta_keywords", e.target.value)} placeholder="wisata sumut, danau toba, rental mobil medan" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Google Analytics Measurement ID</label>
                      <Input value={val("google_analytics_id")} onChange={e => handleChange("google_analytics_id", e.target.value)} placeholder="G-XXXXXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Facebook Pixel ID</label>
                      <Input value={val("facebook_pixel_id")} onChange={e => handleChange("facebook_pixel_id", e.target.value)} placeholder="Opsional" />
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
