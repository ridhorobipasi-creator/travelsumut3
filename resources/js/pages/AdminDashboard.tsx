import { Head, Link } from "@inertiajs/react";
import { ShoppingCart, DollarSign, MapPin, Users, TrendingUp, Package, Car, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/AdminLayout";

const stats = [
  { label: "Total Pesanan", value: "1,234", icon: ShoppingCart, change: "+12%", color: "bg-primary" },
  { label: "Revenue", value: "Rp 245.8 Jt", icon: DollarSign, change: "+18%", color: "bg-tropical-ocean" },
  { label: "Destinasi Aktif", value: "156", icon: MapPin, change: "+5", color: "bg-tropical-sunset" },
  { label: "Traveler Aktif", value: "892", icon: Users, change: "+8%", color: "bg-tropical-gold" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Ahmad Rizki", package: "Pesona Danau Toba", date: "15 Mar", status: "Confirmed", amount: "Rp 3.5 Jt" },
  { id: "ORD-002", customer: "Siti Nurhaliza", package: "Berastagi Highland", date: "14 Mar", status: "Pending", amount: "Rp 2.5 Jt" },
  { id: "ORD-003", customer: "Budi Santoso", package: "Bukit Lawang Trekking", date: "14 Mar", status: "Completed", amount: "Rp 1.8 Jt" },
  { id: "ORD-004", customer: "Dewi Lestari", package: "City Tour Medan", date: "13 Mar", status: "Confirmed", amount: "Rp 750 Rb" },
];

const quickActions = [
  { label: "Paket Wisata", count: 24, icon: Package },
  { label: "Rental Mobil", count: 18, icon: Car },
  { label: "Artikel Blog", count: 45, icon: FileText },
  { label: "Wilayah", count: 34, icon: MapPin },
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-primary text-primary-foreground",
  Pending: "bg-secondary text-secondary-foreground",
  Completed: "bg-tropical-leaf text-primary-foreground",
};

export default function AdminDashboard() {
  console.log("Rendering AdminDashboard");
  return (
    <AdminLayout>
      <Head title="Admin Dashboard - SumutTour" />
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Selamat datang di panel admin SumutTour</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="border-0 shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {s.change}
                </Badge>
              </div>
              <div className="font-bold text-xl text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Pesanan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {o.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{o.customer}</div>
                      <div className="text-xs text-muted-foreground">{o.package} • {o.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`text-xs ${statusColors[o.status] || ""}`}>{o.status}</Badge>
                    <span className="text-sm font-semibold text-foreground">{o.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Ringkasan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/packages" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Paket Wisata</span>
                  </div>
                  <Badge variant="outline">24</Badge>
                </div>
              </Link>
              <Link href="/admin/rental" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Rental Mobil</span>
                  </div>
                  <Badge variant="outline">18</Badge>
                </div>
              </Link>
              <Link href="/admin/blog" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Artikel Blog</span>
                  </div>
                  <Badge variant="outline">45</Badge>
                </div>
              </Link>
              <Link href="/admin/regions" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Wilayah</span>
                  </div>
                  <Badge variant="outline">34</Badge>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
