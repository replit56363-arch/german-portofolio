import { useEffect, useMemo, useState } from "react";
import { useCmsSection } from "@/lib/use-cms";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Filter,
  Megaphone,
  Newspaper,
  Play,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

type NewsCategory = "Semua" | "Media" | "Partner" | "Program" | "Cerita" | string;

type NewsItem = {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  featured?: boolean;
  tone: "coral" | "sea" | "butter" | "ink" | "lavender" | string;
};

const initialNewsItems: NewsItem[] = [
  {
    id: 1,
    date: "18 JUN 2024",
    category: "Media",
    title: "Bagaimana peserta Ausbildung dari Indonesia membantu menjawab kebutuhan tenaga kerja?",
    excerpt: "Lernpfad berbagi perspektif tentang persiapan kandidat, kualitas pendampingan, dan proses membangun masa depan lintas negara.",
    featured: true,
    tone: "coral",
  },
  {
    id: 2,
    date: "12 JUN 2024",
    category: "Cerita",
    title: "Dari Bandung ke dapur hotel di Baden-Württemberg",
    excerpt: "Satu perjalanan peserta, dari kelas bahasa hingga hari pertama mengenal tempat kerja barunya di Jerman.",
    tone: "sea",
  },
  {
    id: 3,
    date: "03 SEP 2023",
    category: "Partner",
    title: "Lernpfad hadir di CHEFS CULINAR Messe di Leipzig",
    excerpt: "Bertemu dengan pelaku industri hospitality dan berbicara tentang cara membuka peluang Ausbildung yang lebih terarah.",
    tone: "butter",
  },
  {
    id: 4,
    date: "31 OKT 2022",
    category: "Partner",
    title: "Membangun jalur talenta di Thementage RINGHOTELS",
    excerpt: "Diskusi bersama jaringan hotel tentang kebutuhan tenaga kerja, budaya kerja, dan kesiapan peserta dari Indonesia.",
    tone: "ink",
  },
  {
    id: 5,
    date: "11 OKT 2022",
    category: "Program",
    title: "Berbagi praktik baik di BAFA Energietag",
    excerpt: "Lernpfad ikut membahas peluang serta tanggung jawab dalam proses masuknya tenaga kerja terampil ke Jerman.",
    tone: "lavender",
  },
  {
    id: 6,
    date: "22 SEP 2022",
    category: "Program",
    title: "Investasi digital untuk masa depan penempatan",
    excerpt: "Pengembangan perangkat lunak Lernpfad membantu proses portfolio dan komunikasi kandidat menjadi lebih terbuka.",
    tone: "sea",
  },
  {
    id: 7,
    date: "08 SEP 2022",
    category: "Partner",
    title: "DOMBERT Rechtsanwälte berdiskusi bersama Lernpfad",
    excerpt: "Percakapan dengan mitra hukum tentang kerangka dan praktik penempatan tenaga kerja internasional.",
    tone: "coral",
  },
  {
    id: 8,
    date: "14 JUL 2022",
    category: "Partner",
    title: "Bertemu jaringan hotel dalam HR-Connect by FairJobs",
    excerpt: "Lebih dari 50 peserta dari 35 hotel berdiskusi tentang kebutuhan tenaga kerja dan jalur pengembangan karyawan.",
    tone: "butter",
  },
  {
    id: 9,
    date: "02 JUN 2022",
    category: "Partner",
    title: "Pertukaran gagasan bersama pemerintah Sachsen-Anhalt",
    excerpt: "Perwakilan bidang ekonomi dan sosial berkunjung untuk memahami kerja sama penempatan dan integrasi peserta.",
    tone: "ink",
  },
  {
    id: 10,
    date: "17 MEI 2022",
    category: "Program",
    title: "Round Table kelima tentang masa depan tenaga kerja",
    excerpt: "Perwakilan bisnis, asosiasi, dan kebijakan bertemu untuk membicarakan perekrutan lintas negara.",
    tone: "lavender",
  },
];

const categoryOptions: NewsCategory[] = ["Semua", "Media", "Partner", "Program", "Cerita"];

function Logo() {
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

function NewsLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function NewsArtwork({ item, tone, featured = false }: { item?: any; tone?: NewsItem["tone"]; featured?: boolean }) {
  const imageUrl = item?.imageUrl;
  const itemTone = item?.tone || tone || "coral";

  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${featured ? "aspect-[1.4] rounded-[1.6rem]" : "aspect-[1.28] rounded-[1.2rem]"} border-2 border-[#173d3a] bg-[#173d3a]`}>
        <img src={imageUrl} alt={item?.title || "Gambar Berita"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173d3a]/60 via-transparent to-transparent" />
        {featured ? (
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#173d3a]">
            <div className="rounded-full bg-[#f5eee3]/90 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] shadow-sm">Liputan Lernpfad</div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f5eee3] shadow-sm"><Play size={18} fill="currentColor" /></div>
          </div>
        ) : (
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f5eee3]">
            <span className="rounded-full bg-[#173d3a]/80 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">Baca selengkapnya</span>
            <ArrowUpRight size={24} />
          </div>
        )}
      </div>
    );
  }

  const tones = {
    coral: "bg-[#d86d50]",
    sea: "bg-[#9ccabc]",
    butter: "bg-[#f4c76b]",
    ink: "bg-[#244f4a]",
    lavender: "bg-[#c6c8dc]",
  };

  return (
    <div className={`relative overflow-hidden ${featured ? "aspect-[1.4] rounded-[1.6rem]" : "aspect-[1.28] rounded-[1.2rem]"} ${tones[itemTone] || tones.coral}`}>
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_45%,#173d3a_46%,#173d3a_49%,transparent_50%)] [background-size:30px_30px]" />
      <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full border-[24px] border-[#f5eee3]/70" />
      <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full border-[18px] border-[#173d3a]/20" />
      {featured ? (
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#173d3a]">
          <div className="rounded-full bg-[#f5eee3]/85 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">Liputan Lernpfad</div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f5eee3]"><Play size={18} fill="currentColor" /></div>
        </div>
      ) : (
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#173d3a]">
          <span className="rounded-full bg-[#f5eee3]/85 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">Baca selengkapnya</span>
          <ArrowUpRight size={24} />
        </div>
      )}
    </div>
  );
}

export default function News() {
  const { data: cmsData } = useCmsSection("news");
  const newsItems = useMemo(() => cmsData?.items || initialNewsItems, [cmsData?.items]);

  const [activeCategory, setActiveCategory] = useState<NewsCategory>("Semua");
  const [visibleCount, setVisibleCount] = useState(7);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = `${cmsData?.pageTitle || "Kabar Terkini"} — Lernpfad`;
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, [cmsData?.pageTitle]);

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();
    return newsItems.filter((item: any) => {
      const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
      const matchesSearch = !query || `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [newsItems, activeCategory, search]);

  const featured = useMemo(() => {
    return newsItems.find((i: any) => i.featured) || newsItems[0] || initialNewsItems[0];
  }, [newsItems]);

  const showFeatured = featured && filteredNews.some((item: any) => item.id === featured.id);
  const visibleNews = filteredNews.filter((item: any) => !featured || item.id !== featured.id).slice(0, visibleCount);

  const chooseCategory = (category: NewsCategory) => {
    setActiveCategory(category);
    setVisibleCount(7);
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/berita" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-20 pt-16 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke beranda</Link>
            <NewsLabel>{cmsData?.eyebrow || "Catatan Lernpfad"}</NewsLabel>
            <h1 className="mt-6 max-w-xl font-['Fraunces'] text-6xl font-medium leading-[.9] tracking-[-0.07em] text-[#173d3a] sm:text-8xl">
              {cmsData?.title || "Kabar dari sepanjang jalan."}
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-[17px] leading-8 text-[#66817a]">
              {cmsData?.description || "Berita, percakapan, dan cerita tentang perjalanan talenta Indonesia menuju dunia kerja Jerman."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#486961]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2">
                <Newspaper size={14} className="text-[#d35f46]" /> {newsItems.length} kabar pilihan
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2">
                <UsersRound size={14} className="text-[#d35f46]" /> Untuk partner dan peserta
              </span>
            </div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter kategori berita">
              <Filter size={15} className="mr-1 text-[#d35f46]" />
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => chooseCategory(category)}
                  className={`rounded-full px-3 py-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    activeCategory === category ? "bg-[#173d3a] text-[#f5eee3]" : "text-[#66817a] hover:bg-[#f5eee3] hover:text-[#173d3a]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {searchOpen && (
                <input
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari kabar..."
                  aria-label="Cari kabar"
                  className="w-44 rounded-full border border-[#173d3a]/20 bg-[#f5eee3] px-4 py-2 font-sans text-xs text-[#173d3a] outline-none focus:border-[#d35f46] sm:w-56"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((open) => !open);
                  if (searchOpen) setSearch("");
                }}
                aria-label={searchOpen ? "Tutup pencarian" : "Cari kabar"}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#173d3a]/20 text-[#486961] hover:bg-[#f5eee3]"
              >
                {searchOpen ? <X size={15} /> : <Search size={15} />}
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className={`grid gap-8 ${showFeatured ? "lg:grid-cols-[1.15fr_.85fr]" : "lg:grid-cols-1"} lg:items-center`}>
            {showFeatured && (
              <Link href={`/berita/${featured.id}`} className="group block">
                <NewsArtwork item={featured} tone={featured.tone} featured />
                <div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]">
                  <CalendarDays size={13} />
                  {featured.date}
                  <span className="h-1 w-1 rounded-full bg-[#d35f46]" />
                  {featured.category}
                </div>
                <h2 className="mt-3 max-w-2xl font-['Fraunces'] text-4xl font-semibold leading-[.98] tracking-[-0.055em] text-[#173d3a] transition-colors group-hover:text-[#d35f46] sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#66817a]">{featured.excerpt}</p>
              </Link>
            )}
            <div className="rounded-[1.5rem] bg-[#173d3a] p-7 text-[#f5eee3] sm:p-9">
              <NewsLabel>{cmsData?.infoTitle || "Kenapa kami berbagi"}</NewsLabel>
              <h2 className="mt-6 font-['Fraunces'] text-4xl font-medium leading-[.95] tracking-[-0.055em]">
                {cmsData?.infoHeading || "Proses yang baik layak dibicarakan."}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#a9c5bb]">
                {cmsData?.infoDescription || "Setiap kabar adalah kesempatan untuk memperlihatkan cara kami bekerja: terbuka, dekat, dan berorientasi pada langkah jangka panjang."}
              </p>
              <div className="mt-8 space-y-3 border-t border-[#47726b] pt-5">
                {(cmsData?.infoPoints || ["Cerita peserta yang nyata", "Percakapan dengan partner", "Perkembangan program yang terbuka"]).map((item: string) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f4c76b] text-[#173d3a]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#173d3a]/15 bg-[#fffaf2]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <NewsLabel>Arsip kabar</NewsLabel>
                <h2 className="mt-5 font-['Fraunces'] text-5xl font-medium leading-none tracking-[-0.06em] text-[#173d3a]">
                  {cmsData?.archiveTitle || "Yang sedang kami bawa."}
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#66817a]">{filteredNews.length} kabar cocok dengan pilihan Anda.</p>
            </div>
            {visibleNews.length ? (
              <div className="mt-12 grid gap-x-5 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {visibleNews.map((item: any) => (
                  <Link key={item.id} href={`/berita/${item.id}`} className="group block">
                    <NewsArtwork item={item} tone={item.tone} />
                    <div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]">
                      <CalendarDays size={13} />
                      {item.date}
                      <span className="h-1 w-1 rounded-full bg-[#d35f46]" />
                      {item.category}
                    </div>
                    <h3 className="mt-3 font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#66817a]">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[1.3rem] border border-[#173d3a]/15 bg-[#f5eee3] p-10 text-center">
                <Megaphone className="mx-auto text-[#d35f46]" size={24} />
                <h3 className="mt-4 font-['Fraunces'] text-3xl font-semibold">Belum ada kabar yang cocok.</h3>
                <p className="mt-2 text-sm text-[#66817a]">Coba kata kunci atau kategori lain.</p>
              </div>
            )}
            {visibleNews.length < filteredNews.filter((item: any) => item.id !== featured.id).length && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 3)}
                className="mx-auto mt-16 flex items-center gap-2 rounded-full border border-[#173d3a] px-5 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-colors hover:bg-[#173d3a] hover:text-[#f5eee3]"
              >
                Muat lebih banyak <ArrowUpRight size={15} />
              </button>
            )}
          </div>
        </section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <NewsLabel light>Ikuti langkah berikutnya</NewsLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">
              {cmsData?.ctaTitle || "Berita berikutnya bisa dimulai dari Anda."}
            </h2>
            <p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">
              {cmsData?.ctaSubtitle || "Masuk ke portal partner untuk melihat portfolio kandidat dan memulai percakapan berdasarkan kebutuhan tim Anda."}
            </p>
            <Link href={cmsData?.ctaHref || "/login"} className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {cmsData?.ctaText || "Masuk ke portal"} <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}