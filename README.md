# 🃏 Pokemoners: The Ultimate Digital TCG Scrapbook

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **"Dari Kolektor, Untuk Kolektor."** / **"By Collectors, for Collectors."**
> An ultra-optimized, high-performance digital hub for Pokémon TCG enthusiasts with a premium "scrapbook" aesthetic.

---

[Indonesia 🇮🇩](#indonesia-bahasa) | [English 🇺🇸](#english-version)

---

## <a name="indonesia-bahasa"></a>🇮🇩 Indonesia (Bahasa)

**Pokemoners** adalah platform digital untuk kolektor Pokémon TCG yang menggabungkan estetika desain organik (*scrapbook/hand-drawn*) dengan performa kelas industri. Aplikasi ini dirancang untuk memberikan akses cepat ke database kartu, informasi set terlengkap, dan pemantauan harga pasar secara *real-time*.

### 🌟 Fitur Utama
*   **Hyper-Search Engine:** Pencarian instan melintasi ribuan kartu dengan dukungan *multi-term filtering*.
*   **Expansion Hub:** Katalog lengkap set Pokémon (dari Base Set hingga seri terbaru) dengan filter koleksi *client-side*.
*   **Market Insight:** Dashboard harga pasar real-time yang terintegrasi langsung dengan detail kartu.
*   **Immersive Interactions:** Animasi kartu 3D 360 derajat dengan transisi spring-physics yang halus.
*   **Responsive UX:** Optimasi penuh untuk perangkat mobile guna pengecekan harga cepat di lapangan (*trading*).

### ⚡ Arsitektur & Optimasi (DB-less Architecture)
Aplikasi ini menggunakan arsitektur *database-less* yang dioptimalkan untuk skalabilitas dan kecepatan:
*   **Persistent JSON Caching:** Implementasi *file-based cache* di layer server (`/data/cache`) untuk meminimalisir *latency* API eksternal. Data ribuan kartu di-cache secara persisten untuk menjamin respon sub-milidetik.
*   **Image Optimization Layer:** Konfigurasi `next/image` dengan *minimumCacheTTL* 7 hari, mengurangi beban server origin dan mempercepat *first paint* aset gambar.
*   **State Management:** Menggunakan **TanStack Query** untuk penanganan *caching* di sisi klien (in-memory) dan sinkronisasi data yang efisien.

---

## <a name="english-version"></a>🇺🇸 English Version

**Pokemoners** is a digital ecosystem for Pokémon TCG collectors that bridges the gap between organic, hand-drawn aesthetics and industrial-grade performance. It provides high-speed access to card databases, comprehensive set information, and real-time market price monitoring.

### 🌟 Key Features
*   **Hyper-Search Engine:** Instantaneous search across thousands of cards with advanced multi-term filtering.
*   **Expansion Hub:** A complete catalog of Pokémon sets (from Base Set to the latest series) with integrated client-side filtering.
*   **Market Insight:** Real-time market pricing dashboards directly linked to card profiles.
*   **Immersive Interactions:** 360-degree 3D card animations powered by smooth spring-physics transitions.
*   **Responsive UX:** Fully optimized for mobile devices for rapid price checking during live trading events.

### ⚡ System Architecture (DB-less High Performance)
Built with an optimized *database-less* architecture focused on speed and reliability:
*   **Persistent JSON Caching:** A custom file-based caching layer (`/data/cache`) on the server to minimize external API latency. Large datasets are cached persistently to ensure sub-millisecond response times.
*   **Image Optimization Layer:** Finely-tuned `next/image` configuration with a 7-day *minimumCacheTTL*, reducing origin server load and improving asset delivery speed.
*   **Client-side Efficiency:** Leverages **TanStack Query** for robust in-memory caching and efficient data synchronization.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 20 or higher
*   NPM / PNPM / Bun

### Installation & Environment
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lexyerresta/pokemoners.git
    cd pokemoners
    ```
2.  **Duplicate `.env.example` to `.env`:**
    ```bash
    cp .env.example .env
    ```
3.  **Configure environment variables:**
    *   `NEXT_PUBLIC_TCGDEX_API_URL`: Primary TCG data endpoint.
    *   `NEXT_PUBLIC_POKEMON_TCG_API_URL`: Pricing data endpoint.
4.  **Install dependencies:**
    ```bash
    npm install
    ```
5.  **Run development server:**
    ```bash
    npm run dev
    ```

---

## 🔗 API Credits & Integrations
*   **[TCGDex API](https://tcgdex.dev/):** Primary source for card statistics, set information, and high-fidelity assets.
*   **[Pokémon TCG API](https://pokemontcg.io/):** Real-time market valuation and data cross-referencing.

## 💖 Support the Project
Jika proyek ini membantu perjalanan koleksimu, dukung pengembangannya lewat: / If this project enhances your collection journey, consider supporting us:

<a href="https://saweria.co/lexyerresta" target="_blank">![Saweria](https://img.shields.io/badge/Saweria-lexyerresta-FFA700?style=for-the-badge)</a>
<a href="https://trakteer.id/lexyerresta" target="_blank">![Trakteer](https://img.shields.io/badge/Trakteer-lexyerresta-E72424?style=for-the-badge)</a>

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ for the Pokémon Community.