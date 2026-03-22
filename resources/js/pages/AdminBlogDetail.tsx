import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, Trash2, Calendar, Clock, 
  Tag, User, Edit, Image as ImageIcon, Eye,
  MessageSquare, ThumbsUp, Share2, Plus, Minus,
  Facebook, Twitter, Instagram, Bookmark
} from "lucide-react";
import { useState } from "react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  status: "published" | "draft" | "archived";
  views: number;
  likes: number;
  shares: number;
}

export default function AdminBlogDetail({ article }: { article: Article }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Article>(article);

  const handleInputChange = (field: keyof Article, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statusColors: Record<string, string> = {
    published: "bg-primary text-primary-foreground",
    draft: "bg-secondary text-secondary-foreground",
    archived: "bg-muted text-muted-foreground"
  };

  return (
    <AdminLayout>
      <Head title={`Edit: ${article.title} - Admin`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Edit Artikel</h1>
            <p className="text-sm text-muted-foreground">ID: #{article.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColors[article.status]}>{article.status}</Badge>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-3 h-3 mr-2" /> {isEditing ? "Batal Edit" : "Edit"}
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="w-3 h-3 mr-2" /> Hapus
          </Button>
          <Button size="sm" className="gradient-hero border-0 text-primary-foreground">
            <Save className="w-3 h-3 mr-2" /> Simpan Perubahan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title & Meta */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Informasi Artikel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Cuplikan (Excerpt)</Label>
                <textarea 
                  className={`w-full min-h-[80px] p-3 rounded-lg border bg-background text-sm ${isEditing ? "border-primary focus:ring-2 focus:ring-primary/20" : "border-border"}`}
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input 
                    id="category" 
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Waktu Baca</Label>
                  <Input 
                    id="readTime" 
                    value={formData.readTime}
                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? "border-primary" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Konten Artikel</CardTitle>
              {isEditing && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" /> Preview
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <textarea 
                className={`w-full min-h-[300px] p-4 rounded-lg border bg-background text-sm font-mono ${isEditing ? "border-primary focus:ring-2 focus:ring-primary/20" : "border-border"}`}
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                disabled={!isEditing}
                placeholder="Tulis konten artikel di sini..."
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: Gunakan HTML tags untuk formatting seperti &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Status */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Status & Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full h-10 px-3 rounded-md border text-sm ${isEditing ? "border-primary bg-background" : "border-border bg-muted"}`}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Publikasi</Label>
                <Input 
                  id="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary" : ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg">Statistik Artikel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Views
                </span>
                <span className="font-bold text-primary">{article.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" /> Likes
                </span>
                <span className="font-bold">{article.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Shares
                </span>
                <span className="font-bold">{article.shares.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Komentar
                </span>
                <span className="font-bold">24</span>
              </div>
            </CardContent>
          </Card>

          {/* Social Sharing Preview */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" /> Preview Share
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/40 text-muted-foreground hover:text-primary hover:border-primary">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-dashed border-border">
                <p className="text-xs text-muted-foreground mb-2">Social Preview:</p>
                <div className="aspect-video rounded bg-background overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-1/2 object-cover" />
                  <div className="p-2">
                    <p className="text-[10px] font-bold text-foreground line-clamp-1">{article.title}</p>
                    <p className="text-[8px] text-muted-foreground line-clamp-1">sumtourt.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Preview */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> Gambar Cover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <ImageIcon className="w-3 h-3 mr-2" /> Ganti Gambar
                </Button>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
