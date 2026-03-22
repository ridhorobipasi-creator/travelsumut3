import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { Tag, Calendar, Clock, ArrowRight } from "lucide-react";

type ArticleRow = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
};

const fallbackArticles: ArticleRow[] = [
  {
    id: 1,
    title: "7 Hal yang Wajib Dilakukan Saat Mengunjungi Danau Toba",
    excerpt: "Mulai dari mengunjungi Pulau Samosir hingga mencoba kuliner khas Batak, inilah panduan lengkap liburan ke Danau Toba.",
    image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=800&auto=format&fit=crop",
    category: "Tips Wisata",
    date: "15 Mar 2026",
    readTime: "5 min",
  },
];

export default function Blog({ articles: articlesProp }: { articles?: ArticleRow[] }) {
  const articles = articlesProp?.length ? articlesProp : fallbackArticles;

  return (
    <PublicLayout>
      <Head>
        <title>Blog Wisata & Tips Perjalanan - SumutTour</title>
        <meta name="description" content="Temukan tips wisata, panduan perjalanan, dan cerita menarik seputar destinasi di Sumatera Utara dan Indonesia." />
        <meta name="keywords" content="blog wisata sumut, tips liburan danau toba, panduan wisata medan" />
      </Head>
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Blog Perjalanan</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">Inspirasi, tips cerdas, dan cerita tak terlupakan dari perjalanan menjelajahi pesona Sumatera Utara.</p>
        </div>
      </section>

      <section className="py-16 bg-muted/20 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="overflow-hidden border-0 shadow-elevated mb-12 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="md:w-1/2 p-8 flex flex-col justify-center bg-card">
                <Badge className="w-fit mb-4 bg-primary text-primary-foreground border-0"><Tag className="w-3 h-3 mr-1" />{articles[0].category}</Badge>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">{articles[0].title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {articles[0].date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {articles[0].readTime}</span>
                </div>
                <Link href={`/blog/${articles[0].id}`}>
                  <Button className="gradient-hero border-0 text-primary-foreground rounded-full px-6 shadow-md hover:shadow-lg transition-all w-fit group-hover:-translate-y-1">
                    Baca Selengkapnya
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300 group flex flex-col h-full bg-card">
                  <div className="h-56 overflow-hidden relative">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-xs font-medium text-foreground border-0 shadow-sm">
                      <Clock className="w-3 h-3 mr-1.5 text-primary" /> {a.readTime}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <Badge variant="outline" className="mb-3 w-fit text-xs border-primary/20 text-primary"><Tag className="w-3 h-3 mr-1" />{a.category}</Badge>
                    <h3 className="font-display font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">{a.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      <span className="flex items-center font-medium"><Calendar className="w-3.5 h-3.5 mr-1.5" /> {a.date}</span>
                      <Link href={`/blog/${a.id}`}>
                        <Button variant="link" className="p-0 h-auto text-primary font-bold group-hover:underline">Baca <ArrowRight className="w-3 h-3 ml-1" /></Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary transition-all font-semibold">
               Muat Lebih Banyak
             </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
