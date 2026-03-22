import { useState } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import PublicLayout from "@/components/PublicLayout";

type GalleryPhotoRow = { id: number; src: string; alt: string; category: string };

const fallbackPhotos: GalleryPhotoRow[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=800&auto=format&fit=crop", alt: "Keindahan Danau Toba dari atas bukit", category: "Danau" },
];

export default function Galeri({
  photos: photosProp,
  photoCategories = [],
}: {
  photos?: GalleryPhotoRow[];
  photoCategories?: string[];
}) {
  const [active, setActive] = useState("Semua");
  const mockPhotos = photosProp?.length ? photosProp : fallbackPhotos;
  const derivedCats = mockPhotos.map((p) => p.category);
  const categories = ["Semua", ...new Set([...photoCategories, ...derivedCats])];
  const filtered = active === "Semua" ? mockPhotos : mockPhotos.filter((p) => p.category === active);

  return (
    <PublicLayout>
      <Head>
        <title>Galeri Keindahan Sumatera Utara - SumutTour</title>
        <meta name="description" content="Lihat kumpulan foto menakjubkan destinasi wisata di Sumatera Utara. Dari Danau Toba yang megah hingga budaya Nias yang unik." />
        <meta name="keywords" content="galeri foto sumut, foto danau toba, pemandangan sumatera utara, budaya batak" />
      </Head>
      <section className="gradient-sunset py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Galeri Kami</h1>
          <p className="text-primary-foreground/80">Keindahan Sumatera Utara dalam setiap frame</p>
        </div>
      </section>

      <section className="py-8 border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex gap-2 flex-wrap justify-center">
          {categories.map((c) => (
            <Badge
              key={c}
              variant={active === c ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${active === c ? "gradient-hero text-primary-foreground border-0" : "bg-card hover:bg-muted text-foreground"}`}
              onClick={() => setActive(c)}
            >
              {c}
            </Badge>
          ))}
        </div>
      </section>

      <section className="py-12 bg-muted/30 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Tidak ada foto ditemukan untuk kategori ini.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid"
                >
                  <div className="relative group rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-shadow bg-card">
                    <img src={photo.src} alt={photo.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-primary-foreground font-medium text-sm leading-tight drop-shadow-md">{photo.alt}</p>
                        <Badge className="mt-2 text-xs bg-primary/80 hover:bg-primary text-primary-foreground border-0">{photo.category}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
