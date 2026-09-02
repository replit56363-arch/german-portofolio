import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clapperboard,
  ExternalLink,
  Filter,
  Menu,
  Play,
  Search,
  Tv,
  X,
} from "lucide-react";
import { Link } from "wouter";

type MediaCategory = "Semua" | "Televisi" | "Dokumenter";

type MediaItem = {
  id: number;
  date: string;
  category: Exclude<MediaCategory, "Semua">;
  channel: string;
  title: string;
  excerpt: string;
  featured?: boolean;
  tone: "coral" | "sea" | "butter" | "ink" | "lavender";
};

const mediaItems: MediaItem[] = [
  {
    id: 1,
    date: "18 JUN 2024",
    category: "Televisi",
    channel: "stern TV Talk",
    title: "Bagaimana peserta Ausbildung dari Indonesia membantu menjawab kebutuhan tenaga kerja?",
    excerpt: "Percakapan tentang peluang, persiapan, dan perjalanan peserta Indonesia menuju dunia kerja Jerman.",
    featured: true,
    tone: "coral",
  },
  {
    id: 2,
    date: "14 JUN 2024",
    category: "Televisi",
    channel: "stern TV",
    title: "Peserta Ausbildung dari Indonesia menghadapi kebutuhan tenaga kerja",
    excerpt: "Liputan tentang peserta dari Indonesia yang memulai babak baru dalam pendidikan dan pekerjaan di Jerman.",
    featured: true,
    tone: "sea",
  },
  {
    id: 3,
    date: "02 MEI 2024",
    category: "Dokumenter",
    channel: "Spiegel TV",
    title: "Mengapa sebuah hotel merekrut banyak peserta dari Indonesia?",
    excerpt: "Spiegel TV melihat lebih dekat peran peserta Ausbildung dari Indonesia di Weissenhäuser Strand.",
    tone: "butter",
  },
  {
    id: 4,
    date: "18 APR 2024",
    category: "Televisi",
    channel: "ZDF Wiso",
    title: "Kekurangan tenaga kerja: apakah birokrasi menjadi penyebabnya?",
    excerpt: "Laporan tentang proses yang perlu dilalui perusahaan dan calon tenaga kerja internasional.",
    tone: "ink",
  },
  {
    id: 5,
    date: "09 MAR 2024",
    category: "Dokumenter",
    channel: "mdr Exakt",
    title: "Selamat datang di dunia gastronomi",
    excerpt: "Mengapa peserta Ausbildung dari Indonesia semakin dibutuhkan oleh industri hospitality.",
    tone: "lavender",
  },
  {
    id: 6,
    date: "22 FEB 2024",
    category: "Televisi",
    channel: "ZDF heute",
    title: "Tenaga kerja terampil dari Indonesia",
    excerpt: "ZDF meliput peserta dan tenaga kerja dari Indonesia yang mengisi peluang kerja di Jerman.",
    tone: "coral",
  },
  {
    id: 7,
    date: "11 JAN 2024",
    category: "Dokumenter",
    channel: "NDR Panorama",
    title: "Peserta Ausbildung datang dari luar negeri",
    excerpt: "Ketika perusahaan membutuhkan talenta baru, jalur internasional mulai menjadi bagian dari jawabannya.",
    tone: "sea",
  },
  {
    id: 8,
    date: "04 DES 2023",
    category: "Televisi",
    channel: "Pro7 Galileo",
    title: "Pencarian peserta Ausbildung 2.0",
    excerpt: "Jerman menghadapi kekurangan pelamar dan perusahaan mulai mencari pendekatan baru.",
    tone: "butter",
  },
  {
    id: 9,
    date: "19 NOV 2023",
    category: "Dokumenter",
    channel: "ARTE Thema",
    title: "Dari Bali menuju Bayern",
    excerpt: "Sebuah potret tentang peserta dari Indonesia yang membangun langkah baru di dunia kerja Jerman.",
    tone: "ink",
  },
  {
    id: 10,
    date: "05 OKT 2023",
    category: "Televisi",
    channel: "mdr Exakt",
    title: "Peserta dari Indonesia semakin dicari",
    excerpt: "Cerita tentang Wolfgang Nickel dan peserta Ausbildung yang bekerja di Großpaschleben.",
    tone: "lavender",
  },
];

const categories: MediaCategory[] = ["Semua", "Televisi", "Dokumenter"];

function MediaLogo() {
  return (
    <div className="flex items-center gap-3 text-[#173d3a]">
      <div className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-[#173d3a]">
        <span className="absolute h-5 w-px rotate-45 bg-[#d35f46]" />
        <span className="absolute h-5 w-px -rotate-45 bg-[#d35f46]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#d35f46]" />
      </div>
      <div>
        <div className="font-['Fraunces'] text-[20px] font-semibold leading-none tracking-[-0.04em]">Lernpfad</div>
        <div className="mt-1 font-mono-ui text-[8px] font-bold uppercase tracking-[0.18em] text-[#77918b]">Indonesia · Deutschland</div>
      </div>
    </div>
  );
}

function MediaLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function MediaArtwork({ item, featured = false }: { item: MediaItem; featured?: boolean }) {
  const tones = {
    coral: "bg-[#d86d50]",
    sea: "bg-[#9ccabc]",
    butter: "bg-[#f4c76b]",
    ink: "bg-[#244f4a]",
    lavender: "bg-[#c6c8dc]",
  };

  return (
    <div className={`relative overflow-hidden ${featured ? "aspect-[1.4] rounded-[1.6rem]" : "aspect-[1.25] rounded-[1.2rem]"} ${tones[item.tone]}`}>
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_45%,#173d3a_46%,#173d3a_49%,transparent_50%)] [background-size:30px_30px]" />
      <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[25px] border-[#f5eee3]/70" />
      <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full border-[20px] border-[#173d3a]/20" />
      <div className="absolute left-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-[#f5eee3]/85 text-[#173d3a]"><Play size={17} fill="currentColor" /></div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#173d3a]">
        <span className="rounded-full bg-[#f5eee3]/85 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">{item.channel}</span>
        {featured ? <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">Sorotan</span> : <ArrowUpRight size={24} />}
      </div>
    </div>
  );
}

export default function Media() {
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("Semua");
  const [visibleCount, setVisibleCount] = useState(6);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Media — Lernpfad";
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mediaItems.filter((item) => {
      const categoryMatch = activeCategory === "Semua" || item.category === activeCategory;
      const searchMatch = !query || `${item.channel} ${item.title} ${item.excerpt}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const featuredItems = filteredItems.filter((item) => item.featured);
  const archiveItems = filteredItems.filter((item) => !item.featured);
  const visibleItems = archiveItems.slice(0, visibleCount);

  const selectCategory = (category: MediaCategory) => {
    setActiveCategory(category);
    setVisibleCount(6);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <header className="relative z-30 border-b border-[#173d3a]/15 bg-[#f5eee3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" aria-label="Kembali ke halaman utama"><MediaLogo /></Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi media">
            <Link href="/" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Beranda</Link>
            <Link href="/berita" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Kabar terkini</Link>
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#d35f46]">Media</span>
            <Link href="/jakarta" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Jakarta</Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] transition-transform hover:-translate-y-0.5">Masuk portal <ArrowUpRight size={14} /></Link>
          </nav>
          <button type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-[#173d3a]/20 p-2.5 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {menuOpen && <nav className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-2 md:hidden" aria-label="Menu mobile"><Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Beranda</Link><Link href="/berita" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Kabar terkini</Link><Link href="/jakarta" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Jakarta</Link><Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5eee3]">Masuk portal <ChevronRight className="ml-1 inline" size={14} /></Link></nav>}
      </header>

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-20 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <Link href="/berita" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke kabar</Link>
            <MediaLabel>Ruang media Lernpfad</MediaLabel>
            <h1 className="mt-6 max-w-xl font-['Fraunces'] text-6xl font-medium leading-[.9] tracking-[-0.07em] text-[#173d3a] sm:text-8xl">Dari layar ke <em className="text-[#d35f46]">percakapan.</em></h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-[17px] leading-8 text-[#66817a]">Liputan televisi dan dokumenter tentang talenta Indonesia, Ausbildung, dan cara dunia kerja Jerman membuka peluang baru.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#486961]"><span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2"><Clapperboard size={14} className="text-[#d35f46]" /> {mediaItems.length} tayangan pilihan</span><span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2"><Tv size={14} className="text-[#d35f46]" /> Video dan dokumenter</span></div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter kategori media"><Filter size={15} className="mr-1 text-[#d35f46]" />{categories.map((category) => <button key={category} type="button" onClick={() => selectCategory(category)} className={`rounded-full px-3 py-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] transition-colors ${activeCategory === category ? "bg-[#173d3a] text-[#f5eee3]" : "text-[#66817a] hover:bg-[#f5eee3] hover:text-[#173d3a]"}`}>{category}</button>)}</div>
            <div className="flex items-center gap-2">{searchOpen && <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari tayangan..." aria-label="Cari tayangan" className="w-44 rounded-full border border-[#173d3a]/20 bg-[#f5eee3] px-4 py-2 font-sans text-xs text-[#173d3a] outline-none focus:border-[#d35f46] sm:w-56" />}<button type="button" onClick={() => { setSearchOpen((open) => !open); if (searchOpen) setSearch(""); }} aria-label={searchOpen ? "Tutup pencarian" : "Cari tayangan"} className="grid h-9 w-9 place-items-center rounded-full border border-[#173d3a]/20 text-[#486961] hover:bg-[#f5eee3]">{searchOpen ? <X size={15} /> : <Search size={15} />}</button></div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div className="grid gap-5 sm:grid-cols-2">{featuredItems.map((item) => <article key={item.id} className="group"><MediaArtwork item={item} featured /><div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]"><CalendarDays size={13} />{item.date}<span className="h-1 w-1 rounded-full bg-[#d35f46]" />{item.channel}</div><h2 className="mt-3 font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{item.title}</h2></article>)}</div>
            <div className="rounded-[1.5rem] bg-[#173d3a] p-7 text-[#f5eee3] sm:p-9"><MediaLabel>Kenapa media penting</MediaLabel><h2 className="mt-6 font-['Fraunces'] text-4xl font-medium leading-[.95] tracking-[-0.055em]">Yang terlihat membantu orang memahami.</h2><p className="mt-5 text-sm leading-7 text-[#a9c5bb]">Liputan media membuka percakapan yang lebih luas tentang talenta internasional, kebutuhan industri, dan proses membangun masa depan bersama.</p><div className="mt-8 border-t border-[#47726b] pt-5"><p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#a9c5bb]">Yang kami bawa ke layar</p><div className="mt-4 flex flex-wrap gap-2">{["Konteks", "Kesiapan", "Budaya kerja", "Perjalanan manusia"].map((topic) => <span key={topic} className="rounded-full border border-[#47726b] px-3 py-1.5 text-xs text-[#d5e4de]">{topic}</span>)}</div></div></div>
          </div>
        </section>

        <section className="border-t border-[#173d3a]/15 bg-[#fffaf2]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><MediaLabel>Arsip tayangan</MediaLabel><h2 className="mt-5 font-['Fraunces'] text-5xl font-medium leading-none tracking-[-0.06em] text-[#173d3a]">Yang pernah kami bagi.</h2></div><p className="max-w-xs text-sm leading-6 text-[#66817a]">{filteredItems.length} tayangan cocok dengan pilihan Anda.</p></div>
            {visibleItems.length ? <div className="mt-12 grid gap-x-5 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{visibleItems.map((item) => <article key={item.id} className="group"><MediaArtwork item={item} /><div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]"><CalendarDays size={13} />{item.date}<span className="h-1 w-1 rounded-full bg-[#d35f46]" />{item.category}</div><p className="mt-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#d35f46]">{item.channel}</p><h3 className="mt-2 font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#66817a]">{item.excerpt}</p></article>)}</div> : <div className="mt-12 rounded-[1.3rem] border border-[#173d3a]/15 bg-[#f5eee3] p-10 text-center"><Tv className="mx-auto text-[#d35f46]" size={24} /><h3 className="mt-4 font-['Fraunces'] text-3xl font-semibold">Tayangan tidak ditemukan.</h3><p className="mt-2 text-sm text-[#66817a]">Coba kata kunci atau kategori lain.</p></div>}
            {visibleItems.length < archiveItems.length && <button type="button" onClick={() => setVisibleCount((count) => count + 3)} className="mx-auto mt-16 flex items-center gap-2 rounded-full border border-[#173d3a] px-5 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-colors hover:bg-[#173d3a] hover:text-[#f5eee3]">Muat lebih banyak <ArrowUpRight size={15} /></button>}
          </div>
        </section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20"><div className="relative max-w-2xl"><div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" /><MediaLabel light>Langkah berikutnya</MediaLabel><h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Punya cerita yang siap dilihat lebih jauh?</h2><p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">Masuk ke portal partner untuk mengenal portfolio kandidat dan proses yang membuat setiap perjalanan lebih mudah dipahami.</p><Link href="/login" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">Masuk ke portal <ArrowUpRight size={16} /></Link></div></section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-9 px-5 pb-10 pt-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><MediaLogo /><p className="mt-5 max-w-xs text-xs leading-5 text-[#77918b]">Membuka jalan yang lebih manusiawi antara talenta Indonesia dan dunia kerja Jerman.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#77918b]"><Link href="/" className="hover:text-[#d35f46]">Beranda</Link><Link href="/berita" className="hover:text-[#d35f46]">Kabar terkini</Link><Link href="/login" className="hover:text-[#d35f46]">Portal partner</Link><span>© 2024 Lernpfad</span></div></footer>
    </div>
  );
}