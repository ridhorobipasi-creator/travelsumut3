import { Head } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Download, Calendar as CalendarIcon, DollarSign, Users, ShoppingBag } from "lucide-react";

export default function AdminReports() {
  const stats = [
    { label: "Total Pendapatan", value: "Rp 1.5M", trend: "+20%", color: "text-emerald-500", icon: DollarSign },
    { label: "Total Pengguna", value: "1,245", trend: "+15%", color: "text-blue-500", icon: Users },
    { label: "Paket Terjual", value: "890", trend: "+10%", color: "text-primary", icon: ShoppingBag },
    { label: "Pertumbuhan", value: "+22%", trend: "+5%", color: "text-amber-500", icon: TrendingUp },
  ];

  return (
    <AdminLayout>
      <Head title="Laporan & Analitik - Admin" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Laporan & Analitik</h1>
          <p className="text-sm text-muted-foreground">Analisa performa bisnis dan laporan komprehensif.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-border shadow-sm">
                 <CalendarIcon className="w-4 h-4" /> Tahun Ini
            </Button>
            <Button className="gradient-hero text-primary-foreground border-0 shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Download Laporan Lengkap
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
                    <span className="text-muted-foreground">vs tahun lalu</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="font-display text-lg">Kinerja Penjualan per Bulan</CardTitle>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-50 text-primary" />
                    <p className="font-medium text-foreground">Grafik Batang Penjualan Bulanan</p>
                    <p className="text-xs">Integrasi library chart diperlukan</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="font-display text-lg">Distribusi Kategori Produk</CardTitle>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/20">
                <div className="text-center text-muted-foreground">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-50 text-primary" />
                    <p className="font-medium text-foreground">Grafik Pie Distribusi Kategori</p>
                    <p className="text-xs">Integrasi library chart diperlukan</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
