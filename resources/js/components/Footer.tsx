import { Link } from "@inertiajs/react";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">SumutTour</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Platform wisata terpercaya untuk menjelajahi keindahan Sumatera Utara. Ahlinya wisata Danau Toba dan sekitarnya.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/paket-wisata" className="hover:opacity-100 transition-opacity">Paket Wisata</Link></li>
              <li><Link href="/rental-mobil" className="hover:opacity-100 transition-opacity">Rental Mobil</Link></li>
              <li><Link href="/galeri" className="hover:opacity-100 transition-opacity">Galeri</Link></li>
              <li><Link href="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Destinasi</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Danau Toba</li>
              <li>Berastagi</li>
              <li>Bukit Lawang</li>
              <li>Pulau Nias</li>
              <li>Medan City</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +62 811-6655-4433</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@sumuttour.id</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
          © {new Date().getFullYear()} SumutTour. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
