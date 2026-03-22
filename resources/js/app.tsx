import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob(['./pages/**/*.tsx', './pages/**/*.jsx']);
        const path = Object.keys(pages).find((path) => 
            path === `./pages/${name}.tsx` || path === `./pages/${name}.jsx`
        );
        if (!path) {
            throw new Error(`Page not found: ${name}`);
        }
        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <App {...props} />
                <Toaster />
                <Sonner />
            </TooltipProvider>
        </QueryClientProvider>;

        if (import.meta.env.SSR) {
            hydrateRoot(el, root);
            return;
        }

        createRoot(el).render(root);
    },
    progress: {
        color: '#4B5563',
    },
});
