import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/components/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, Tag, User, Share2, 
  MessageSquare, ChevronLeft, ArrowRight,
  Facebook, Twitter, Instagram, Bookmark
} from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export default function BlogDetail({ article, relatedArticles }: { article: Article; relatedArticles: Article[] }) {
  return (
    <PublicLayout>
      <Head>
        <title>{`${article.title} - Blog SumutTour`}</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <section className="pt-24 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-primary font-bold mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Blog
          </Link>

          <div className="space-y-6 text-center mb-12">
            <Badge className="bg-primary text-primary-foreground border-0 px-4 py-1">
              {article.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> Oleh SumutTour Admin</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} Baca</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-elevated mb-12 aspect-video">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Social Share Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Instagram className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-border/40 my-2" />
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-11 prose prose-lg prose-primary max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} className="text-muted-foreground leading-relaxed space-y-6" />
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border/40 flex flex-wrap gap-2">
                <span className="text-sm font-bold text-foreground mr-2">Tags:</span>
                {["Wisata Sumut", "Tips Perjalanan", article.category, "SumutTour"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #{tag.replace(/\s+/g, '')}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground">Artikel Terkait</h2>
            <Link href="/blog" className="text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((ra) => (
              <motion.div key={ra.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all group cursor-pointer h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={ra.image} 
                      alt={ra.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <Badge variant="outline" className="mb-2 text-xs w-fit"><Tag className="w-3 h-3 mr-1" />{ra.category}</Badge>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{ra.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{ra.excerpt}</p>
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ra.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ra.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
