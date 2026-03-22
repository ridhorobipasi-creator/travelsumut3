# Dokumentasi API & Admin

## Autentikasi Admin
- **GET**  `/secret-admin-login` — Halaman login admin
- **POST** `/secret-admin-login` — Login admin (`email`, `password`)
- **POST** `/admin-logout` — Logout admin

---

## CRUD Paket Wisata
- **GET**    `/admin/packages` — List paket wisata (`?search=`, `?page=`, `?per_page=`)
- **POST**   `/admin/packages` — Tambah paket wisata
- **GET**    `/admin/packages/{id}` — Detail paket wisata
- **PUT**    `/admin/packages/{id}` — Edit paket wisata
- **DELETE** `/admin/packages/{id}` — Hapus paket wisata
- **POST**   `/admin/packages/upload-image` — Upload gambar paket wisata

### Field Paket Wisata
| Field | Tipe | Wajib |
|---|---|---|
| title | string | ✓ |
| location | string | ✓ |
| province | string | ✓ |
| duration | string | ✓ |
| price | integer | ✓ |
| category | string | ✓ |
| rating | numeric 0–5 | - |
| image | string (URL) | - |
| pax | string | - |
| description | string | - |
| itinerary | array[{day, title, activities[]}] | - |
| includes | array[string] | - |
| excludes | array[string] | - |
| status | active\|draft\|archived | - |

---

## CRUD Rental Mobil
- **GET**    `/admin/vehicles` — List kendaraan (`?search=`, `?status=`, `?page=`, `?per_page=`)
- **POST**   `/admin/vehicles` — Tambah kendaraan
- **GET**    `/admin/vehicles/{id}` — Detail kendaraan
- **PUT**    `/admin/vehicles/{id}` — Edit kendaraan
- **DELETE** `/admin/vehicles/{id}` — Hapus kendaraan
- **POST**   `/admin/vehicles/upload-image` — Upload gambar kendaraan

### Field Kendaraan
| Field | Tipe | Wajib |
|---|---|---|
| name | string | ✓ |
| type | string | ✓ |
| seats | integer | ✓ |
| fuel | string | ✓ |
| transmission | string | ✓ |
| price_per_day | integer | ✓ |
| rating | numeric 0–5 | - |
| available | boolean | - |
| image | string (URL) | - |
| description | string | - |
| features | array[string] | - |
| status | available\|rented\|maintenance | - |

---

## CRUD Blog
- **GET**    `/admin/blog` — List artikel (`?search=`, `?page=`, `?per_page=`)
- **POST**   `/admin/blog` — Tambah artikel
- **GET**    `/admin/blog/{id}` — Detail artikel
- **PUT**    `/admin/blog/{id}` — Edit artikel
- **DELETE** `/admin/blog/{id}` — Hapus artikel
- **POST**   `/admin/blog/upload-image` — Upload gambar blog

### Field Artikel
| Field | Tipe | Wajib |
|---|---|---|
| title | string | ✓ |
| content | string | ✓ |
| category | string | ✓ |
| excerpt | string | - |
| image | string (URL) | - |
| date | date | - |
| read_time | string | - |
| status | published\|draft\|archived | - |
| views | integer | - |

---

## CRUD Galeri
- **GET**    `/admin/gallery` — List foto (`?search=`, `?page=`, `?per_page=`)
- **POST**   `/admin/gallery` — Tambah foto
- **GET**    `/admin/gallery/{id}` — Detail foto
- **PUT**    `/admin/gallery/{id}` — Edit foto
- **DELETE** `/admin/gallery/{id}` — Hapus foto
- **POST**   `/admin/gallery/upload-image` — Upload gambar galeri

---

## CRUD Instagram Feed
- **GET**    `/admin/instagram-feeds` — List feed (`?search=`, `?page=`, `?per_page=`)
- **POST**   `/admin/instagram-feeds` — Tambah feed
- **GET**    `/admin/instagram-feeds/{id}` — Detail feed
- **PUT**    `/admin/instagram-feeds/{id}` — Edit feed
- **DELETE** `/admin/instagram-feeds/{id}` — Hapus feed

---

## CRUD Pages
- **GET**    `/admin/pages-data` — List halaman (`?search=`, `?page=`, `?per_page=`)
- **POST**   `/admin/pages-data` — Tambah halaman
- **GET**    `/admin/pages-data/{id}` — Detail halaman
- **PUT**    `/admin/pages-data/{id}` — Edit halaman
- **DELETE** `/admin/pages-data/{id}` — Hapus halaman

---

## Kontak (Publik)
- **POST** `/contact` — Kirim pesan kontak (`name`, `email`, `phone?`, `subject?`, `message`)

## Kontak (Admin)
- **GET**    `/admin/contacts/data` — List pesan kontak (`?search=`, `?status=`, `?page=`, `?per_page=`)
- **GET**    `/admin/contacts/data/{id}` — Detail pesan (otomatis tandai `read`)
- **PATCH**  `/admin/contacts/data/{id}` — Update status (`status`: unread\|read\|replied, `notes?`)
- **DELETE** `/admin/contacts/data/{id}` — Hapus pesan

---

## Activity Log (Admin)
- **GET** `/admin/activity-log/data` — List log aktivitas (`?search=`, `?action=`, `?page=`, `?per_page=`)

---

## Dashboard (Admin)
- **GET** `/admin/` — Dashboard dengan statistik: totalPackages, activePackages, totalVehicles, availableVehicles, totalArticles, publishedArticles, totalPhotos, recentPackages, recentArticles

---

## Validasi Upload Gambar
- Format: jpg, jpeg, png, webp
- Maksimal: 2MB

## Proteksi
- Semua endpoint `/admin/*` wajib login admin (`is_admin = true`)

## Pagination
- Query: `?page=1&per_page=10`
- Response mengikuti format Laravel paginator (data, current_page, last_page, total, dll.)

## Search
- Query: `?search=kata`
