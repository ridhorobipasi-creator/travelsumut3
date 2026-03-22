import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function AdminActivityLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    setLoading(true);
    axios.get("/admin/activity-log/data", { params: { search, per_page: 50 } })
      .then(res => setLogs(res.data.data ?? []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [search]);

  return (
    <AdminLayout>
      <Head title="Log Aktivitas - Admin" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Log Aktivitas</h1>
          <p className="text-sm text-muted-foreground">Total {logs.length} log</p>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Cari aktivitas..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Waktu</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Aksi</th>
              <th className="p-2 text-left">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">Memuat...</td></tr>
            )}
            {!loading && logs.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="p-2 whitespace-nowrap">{l.created_at}</td>
                <td className="p-2">{l.user?.name ?? "-"}</td>
                <td className="p-2 capitalize">{l.action}</td>
                <td className="p-2">{l.description}</td>
              </tr>
            ))}
            {!loading && logs.length === 0 && (
              <tr><td colSpan={4} className="p-2 text-center text-muted-foreground">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
