import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Paket Wisata", path: "/paket-wisata" },
  { label: "Rental Mobil", path: "/rental-mobil" },
  { label: "Galeri", path: "/galeri" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { url } = usePage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Sumut<span className="text-tropical-gold">Tour</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                url === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/paket-wisata">
            <Button size="sm" className="gradient-hero border-0 text-primary-foreground rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              Booking Sekarang
            </Button>
          </Link>
        </div>

        <button 
          className="md:hidden p-2" 
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    url === item.path
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
                <Button size="sm" className="w-full mt-2 gradient-hero text-primary-foreground">Booking Sekarang</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
