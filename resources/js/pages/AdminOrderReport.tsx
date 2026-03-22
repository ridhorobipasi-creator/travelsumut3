import { Head } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Download, Calendar as CalendarIcon, DollarSign, Users, ShoppingBag } from "lucide-react";

export default function AdminOrderReport() {
  const stats = [
    { label: "Total Pendapatan", value: "Rp 1.2M", trend: "+15%", color: "text-emerald-500", icon: DollarSign },
    { label: "Total Pesanan", value: "845", trend: "+8%", color: "text-blue-500", icon: ShoppingBag },
    { label: "Pesanan Sukses", value: "790", trend: "+12%", color: "text-primary", icon: TrendingUp },
    { label: "Pelanggan Baru", value: "320", trend: "+5%", color: "text-amber-500", icon: Users },
  ];

  const recentTransactions = [
    { id: "TRX-001", customer: "Ahmad Rizki", package: "Pesona Danau Toba", amount: "Rp 3.500.000", date: "21 Mar 2026", status: "Completed" },
    { id: "TRX-002", customer: "Budi Santoso", package: "Rental Innova (2 Hari)", amount: "Rp 1.100.000", date: "20 Mar 2026", status: "Completed" },
    { id: "TRX-003", customer: "Siti Nurhaliza", package: "City Tour Medan", amount: "Rp 750.000", date: "20 Mar 2026", status: "Pending" },
    { id: "TRX-004", customer: "Dewi Lestari", package: "Berastagi Highland", amount: "Rp 2.500.000", date: "19 Mar 2026", status: "Completed" },
    { id: "TRX-005", customer: "Reza Rahadian", package: "Trekking Bukit Lawang", amount: "Rp 2.200.000", date: "18 Mar 2026", status: "Cancelled" },
  ];

  return (
    <AdminLayout>
      <Head title="Laporan Pesanan - Admin" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Laporan Pesanan & Keuangan</h1>
          <p className="text-sm text-muted-foreground">Ringkasan performa penjualan dan pesanan Anda.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-border shadow-sm">
                 <CalendarIcon className="w-4 h-4" /> Bulan Ini
            </Button>
            <Button className="gradient-hero text-primary-foreground border-0 shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <Card key={i} className="border-0 shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{s.label}</p>
                        <h3 className="text-2xl font-bold text-foreground">{s.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted/50 ${s.color}`}>
                        <s.icon className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs">{s.trend}</span>
                    <span className="text-muted-foreground">vs bulan lalu</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2 border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="font-display text-lg">Grafik Pendapatan</CardTitle>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-50 text-primary" />
                    <p className="font-medium text-foreground">Grafik Pendapatan Bulanan</p>
                    <p className="text-xs">Integrasi library chart (Recharts/Chart.js) diperlukan di sini</p>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Packages */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="font-display text-lg">Paket Terlaris</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-border">
                {["Pesona Danau Toba", "Berastagi Highland", "Rental Innova (Harian)", "City Tour Medan"].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div>
                            <p className="font-semibold text-sm text-foreground mb-0.5">{p}</p>
                            <p className="text-xs text-muted-foreground">{140 - (i * 20)} pemesanan</p>
                        </div>
                        <span className="font-bold text-primary text-sm">Rp {(3.5 - (i * 0.5)).toFixed(1)}M</span>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-4">Transaksi Terbaru</h2>
      <Card className="border-0 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-left">
              <tr>
                <th className="py-4 px-6 font-medium">ID Transaksi</th>
                <th className="py-4 px-6 font-medium">Pelanggan</th>
                <th className="py-4 px-6 font-medium">Paket/Layanan</th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{trx.id}</td>
                  <td className="py-4 px-6 text-foreground font-semibold">{trx.customer}</td>
                  <td className="py-4 px-6 text-muted-foreground">{trx.package}</td>
                  <td className="py-4 px-6 text-muted-foreground">{trx.date}</td>
                  <td className="py-4 px-6 font-bold text-foreground">{trx.amount}</td>
                  <td className="py-4 px-6">
                    <Badge variant={trx.status === 'Completed' ? 'default' : trx.status === 'Pending' ? 'secondary' : 'destructive'} 
                           className={trx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 border-0 hover:bg-emerald-500/20' : 
                                     trx.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-0 hover:bg-amber-500/20' : 
                                     'bg-red-500/10 text-red-600 border-0 hover:bg-red-500/20'}>
                        {trx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
