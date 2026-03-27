'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'id' | 'en';

type Dictionary = {
  [key in Lang]: {
    [key: string]: string;
  };
};

const dict: Dictionary = {
  id: {
    title: 'Pokemoners | Dari kolektor, untuk kolektor',
    motto: '"Dari kolektor, untuk kolektor."\nPusat utama kolektor Kartu TCG dan cek harga akurat.',
    search_placeholder: 'Cari',
    search_btn: 'Cari',
    card_wiki: 'Wiki Kartu',
    packs_wiki: 'Etalase Pack',
    card_desc: 'Jelajahi seluruh TCGdex, lihat set kartu, dan cari kartu spesifik.',
    price_check: 'Cek Harga',
    price_desc: 'Pantau harga pasar real-time dari sumber terpercaya.',
    psa_check: 'Verifikasi PSA',
    psa_desc: 'Verifikasi kartu PSA menggunakan nomor sertifikat.',
    loading: 'Memuat...',
    prev: 'Sebelumnya',
    next: 'Selanjutnya',
    page: 'Halaman',
    not_found: 'Tidak ditemukan',
    abilities: 'Kemampuan',
    stats: 'Statistik',
    search_results: 'Hasil Pencarian untuk',
    attacks: 'Serangan',
    pricing_title: 'Cek Harga Kartu',
    pricing_subtitle: 'Cari kartu Pokémon apa saja untuk melihat harga pasar real-time dari berbagai sumber.',
    psa_title: 'Cek Sertifikat PSA',
    psa_subtitle: 'Masukkan nomor sertifikat PSA untuk memverifikasi keaslian dan kondisi kartu yang di-grading PSA.',
    verify: 'Verifikasi',
    verify_failed: 'Verifikasi gagal',
  },
  en: {
    title: 'Pokemoners | By collectors, for collectors',
    motto: '"By collectors, for collectors."\nYour ultimate hub for TCG cards and precise price checking.',
    search_placeholder: 'Search',
    search_btn: 'Search',
    card_wiki: 'Card Wiki',
    packs_wiki: 'Packs Wiki',
    card_desc: 'Browse the entire TCGdex, check sets, and search specific cards.',
    price_check: 'Price Check',
    price_desc: 'Track real-time market prices from reliable sources.',
    psa_check: 'PSA Verification',
    psa_desc: 'Verify PSA graded cards directly by their certification number.',
    loading: 'Loading...',
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    not_found: 'Not found',
    abilities: 'Abilities',
    stats: 'Stats',
    search_results: 'Search Results for',
    attacks: 'Attacks',
    pricing_title: 'Card Price Checker',
    pricing_subtitle: 'Search for any Pokémon card to see real-time market prices across different sources.',
    psa_title: 'PSA Certification Check',
    psa_subtitle: 'Enter the PSA certification number to verify the authenticity and condition of any PSA graded item.',
    verify: 'Verify',
    verify_failed: 'Verification failed',
  }
};

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('id');

  useEffect(() => {
    const savedInfo = localStorage.getItem('appLang');
    if (savedInfo && (savedInfo === 'id' || savedInfo === 'en')) {
      setLang(savedInfo as Lang);
    }
  }, []);

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const t = (key: string) => {
    return dict[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
