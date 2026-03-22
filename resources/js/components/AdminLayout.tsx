import { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import {
  LayoutDashboard, ShoppingCart, Map, Car, FileText, Image, Settings, Users, MessageSquare, Star,
  ChevronLeft, MapPin, Package, Hotel, Layers, BarChart3, Globe, CalendarDays
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";


// Menu utama
const mainMenu = [
  { title: "Dasbor", url: "/admin", icon: LayoutDashboard },
  { title: "Order Report", url: "/admin/order-report", icon: BarChart3 },
  { title: "Pengaturan", url: "/admin/settings", icon: Settings },
];

// Pengaturan Umum
const generalMenu = [
  { title: "Bahasa & Kurs Mata Uang", url: "/admin/language-currency", icon: Globe },
];

// Pesanan & Jadwal
const orderMenu = [
  { title: "Semua Pesanan", url: "/admin/orders", icon: ShoppingCart },
  { title: "Custom Trip Requests", url: "/admin/custom-trip", icon: Map },
  { title: "Jadwal Trip", url: "/admin/trip-schedule", icon: CalendarDays },
  { title: "Jadwal Rental", url: "/admin/rental-schedule", icon: Car },
  { title: "Laporan Pesanan", url: "/admin/order-report", icon: BarChart3 },
];

// Katalog Produk
const catalogMenu = [
  { title: "Category", url: "/admin/categories", icon: Layers },
  { title: "Partner", url: "/admin/partners", icon: Users },
  { title: "Hotel", url: "/admin/hotels", icon: Hotel },
  { title: "Paket Wisata", url: "/admin/packages", icon: Package },
  { title: "Aset & Armada", url: "/admin/assets", icon: Car },
];

// Konten Website
const contentMenu = [
  { title: "Artikel / Blog", url: "/admin/blog", icon: FileText },
  { title: "Galeri Foto", url: "/admin/gallery", icon: Image },
  { title: "Instagram Feeds", url: "/admin/instagram", icon: Globe },
  { title: "Banner Promosi", url: "/admin/banners", icon: Globe },
  { title: "Halaman Statis", url: "/admin/pages", icon: FileText },
];

// Interaksi User
const userInteractionMenu = [
  { title: "Pesan Kontak", url: "/admin/contacts", icon: MessageSquare },
  { title: "Ulasan / Review", url: "/admin/reviews", icon: Star },
];

// Manajemen Admin
const adminMenu = [
  { title: "Manajemen Pengguna", url: "/admin/users", icon: Users },
];

// Sistem & Pengaturan
const systemMenu = [
  { title: "Profil Bisnis", url: "/admin/business-profile", icon: MapPin },
  { title: "Log Aktivitas", url: "/admin/activity-log", icon: FileText },
  { title: "Data Trip", url: "/admin/trip-data", icon: Map },
  { title: "Kelola Pengaturan", url: "/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderGroup = (label: string, items: typeof mainMenu) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild>
                <NavLink href={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                  <item.icon className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-display font-bold text-sidebar-foreground">Admin</span>}
      </div>
      <SidebarContent>
        {renderGroup("Menu Utama", mainMenu)}
        {renderGroup("Pengaturan Umum", generalMenu)}
        {renderGroup("Pesanan & Jadwal", orderMenu)}
        {renderGroup("Katalog Produk", catalogMenu)}
        {renderGroup("Konten Website", contentMenu)}
        {renderGroup("Interaksi User", userInteractionMenu)}
        {renderGroup("Manajemen Admin", adminMenu)}
        {renderGroup("Sistem & Pengaturan", systemMenu)}
      </SidebarContent>
      <div className="p-3 border-t border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors px-2 py-2">
          <ChevronLeft className="w-4 h-4" />
          {!collapsed && <span>Kembali ke Website</span>}
        </Link>
      </div>
    </Sidebar>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-background shadow-soft">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h2 className="font-display font-semibold text-foreground">SumutTour Admin</h2>
            </div>
            <Link 
              href="/admin-logout" 
              method="post" 
              as="button"
              className="text-xs font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-destructive/20"
            >
              Logout
            </Link>
          </header>
          <main className="flex-1 p-6 bg-muted/30 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
