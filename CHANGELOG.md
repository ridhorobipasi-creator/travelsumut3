# Changelog - SumutTour Application

Seluruh perubahan dan penyempurnaan yang dilakukan untuk memastikan aplikasi berfungsi secara optimal dan bebas bug.

## [1.0.0] - 2026-03-21

### Added
- **TypeScript Support**: Migrasi seluruh komponen dan halaman dari `.jsx` ke `.tsx` untuk keamanan tipe data.
- **SEO Optimization**: Penambahan meta tags (description, keywords), Open Graph tags, dan canonical URL di halaman utama (Index, Paket Wisata, Rental Mobil, Blog).
- **Accessibility (WCAG 2.1)**: Penambahan atribut `aria-label` pada tombol navigasi mobile dan ikon media sosial.
- **Performance Optimization**: 
  - Penambahan `preconnect` untuk Google Fonts di `app.blade.php`.
  - Atribut `loading="lazy"` pada gambar galeri dan paket wisata.
  - Penentuan dimensi gambar (`width` & `height`) pada hero image untuk mencegah CLS.
- **Validation**: Penambahan validasi tipe data pada props komponen utama.

### Changed
- **Struktur Proyek**: Standarisasi penamaan folder komponen menjadi lowercase (`components`) untuk konsistensi impor.
- **Navigation Flow**: Perbaikan logika `NavLink` agar status aktif sesuai dengan URL saat ini menggunakan `usePage`.
- **Error Handling**: Perbaikan halaman `NotFound.tsx` agar menggunakan context Inertia yang benar.
- **Build Process**: Pembersihan seluruh file residu `.jsx` (termasuk Welcome, Auth, dan Profile) dan optimasi `app.tsx` untuk mendukung pemuatan komponen `.tsx` secara dinamis.

### Fixed
- **Build Errors**: Perbaikan kegagalan build Vite akibat *missing named exports* pada komponen `NavLink` dan `ApplicationLogo`.
- **Broken Links**: Perbaikan path impor komponen di seluruh halaman Auth dan Profile.
- **Inkonsistensi Design**: Penyesuaian class Tailwind untuk memastikan responsivitas yang konsisten di breakpoint mobile, tablet, dan desktop.

### Verified
- **Functional Testing**: 25 tests passed (Auth, Profile, Registration, Navigation).
- **Production Build**: `npm run build` berhasil tanpa error.
- **Responsive Design**: Verifikasi layout di berbagai ukuran layar.
