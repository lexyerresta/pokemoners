# 🃏 Pokemoners

> **"Dari Kolektor, Untuk Kolektor."**
> Pusat utama kolektor Kartu TCG dan cek harga pasar akurat.

Selamat datang di repositori **Pokemoners**! Project ini adalah *web app* estetik dengan nuansa *scrapbook / hand-drawn* yang diciptakan khusus untuk para *Pokémon Collector*. Mulai dari mengecek *database* kartu, melihat daftar pack rilis terbaru, hingga mengintip pergerakan harga pasar secara *real-time*. Semua dibungkus dengan antarmuka yang organik, lucu, dan penuh interaksi animasi. ✨

## 🌟 Fitur Utama
* **Wiki Kartu (Card Wiki):** Jelajahi database kartu Pokémon dengan pencarian canggih *multi-term* secara instan.
* **Etalase Pack (Sets Wiki):** Lihat daftar ekspansi pack terbaru maupun lawas, lalu filter kartunya langsung dari dalam pack!
* **Cek Harga Real-time:** Cari harga pasar secara spesifik pada halaman 'Cek Harga'. Sudah dilengkapi fitur **Auto-Search** apabila diakses langsung lewat profil kartu spesifik. 💸
* **3D Card Flip & Holographic Effects:** Sensasi asyik bolak-balik kartu layaknya kartu fisik sungguhan, lengkap dengan efek *glitch hologram rainbow* untuk kartu *rare/secret rarity*.
* **Mobile Friendly:** Kompatibel 100% pada *mobile browser* untuk cek harga darurat saat kopdar *trading* kartu.
* **Support Dual Bahasa:** Bahasa Indonesia dan English (ID/EN) yang *seamless*.

## ⚙️ Setup Environment
Duplicate `.env.example` (atau buat file `.env`) dan sesuaikan variabel berikut:
```env
NEXT_PUBLIC_TCGDEX_API_URL="https://api.tcgdex.net/v2/en"
NEXT_PUBLIC_POKEMON_TCG_API_URL="https://api.pokemontcg.io/v2"
NEXT_PUBLIC_SAWERIA_URL="https://saweria.co/lexyerresta"
NEXT_PUBLIC_TRAKTEER_URL="https://trakteer.id/lexyerresta"
```

## 🚀 Tech Stack Utama
* **Next.js (App Router)** & **TypeScript**
* **Tailwind CSS v4** + **Framer Motion** untuk styling ala *scrapbook* dan memanjakan mata via interaksi UI yang empuk
* **TanStack React Query** (Smart API request & built-in caching)

## 🔗 API Resources
Aplikasi ini tidak akan bisa berjalan tanpa andil dari API komunitas publik yang luar biasa ini. *Say thanks and big shoutout* kepada:
* **[TCGDex API](https://tcgdex.dev/):** Layanan utama yang menopang seluruh data lore, gambar *high-quality*, *set pack*, serangan, dan statistik kartu di aplikasi ini. Sangat komprehensif!
* **[Pokémon TCG API](https://pokemontcg.io/):** Menyediakan rujukan mantap untuk memanggil informasi harga *market real-time* dari berbagai rujukan kolektor di fitur "Cek Harga".

## 💖 Special Thanks
Terima kasih sebanyak-banyaknya buat para kolektor yang *passionate* serta seluruh pahlawan *open-source developer* yang terus membangun ekosistem Pokémon TCG di luar sana. *Gotta Catch 'Em All!* 🎉

---

## ☕ Support Our Journey!
Jika project aplikasi web ini membantumu melengkapi koleksi impianmu, atau kamu sekedar menyukai karya ini, silakan dukung dengan mentraktir kopi lewat tombol di bawah. Segala *tips* akan sangat membantu kelanjutan karya ini!

[![Trakteer](https://img.shields.io/badge/Trakteer-lexyerresta-E72424?style=for-the-badge)](https://trakteer.id/lexyerresta)
[![Saweria](https://img.shields.io/badge/Saweria-lexyerresta-FFA700?style=for-the-badge)](https://saweria.co/lexyerresta)