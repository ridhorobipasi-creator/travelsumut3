import { Head, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/secret-admin-login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Head title="Admin Login" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero mb-4 text-primary-foreground">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-display font-bold">SumutTour Admin</h1>
                    <p className="text-muted-foreground mt-2">Area Terbatas • Silakan masuk untuk melanjutkan</p>
                </div>

                <Card className="border-0 shadow-elevated overflow-hidden">
                    <CardHeader className="bg-primary text-primary-foreground py-6">
                        <CardTitle className="text-xl">Login Admin</CardTitle>
                        <CardDescription className="text-primary-foreground/80">Masukkan kredensial keamanan Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="username"
                                        placeholder="admin@domain.com"
                                        className="pl-10"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.password}
                                    </p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-12 text-lg font-medium gradient-hero border-0 shadow-lg hover:shadow-xl transition-all"
                                disabled={processing}
                            >
                                {processing ? "Memproses..." : "Masuk ke Dashboard"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                
                <p className="text-center text-xs text-muted-foreground mt-8">
                    &copy; 2026 SumutTour. Seluruh hak cipta dilindungi.
                </p>
            </motion.div>
        </div>
    );
}
