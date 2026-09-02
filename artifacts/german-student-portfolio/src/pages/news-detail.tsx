import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Share2,
  User,
  Check,
  Newspaper,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type NewsItem = {
  id: number | string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  author?: string;
  featured?: boolean;
  tone?: "coral" | "sea" | "butter" | "ink" | "lavender" | string;
  published?: boolean;
};

const defaultArticles: NewsItem[] = [
  {
    id: 1,
    date: "18 JUN 2024",
    category: "Media",
    title: "Bagaimana peserta Ausbildung dari Indonesia membantu menjawab kebutuhan tenaga kerja?",
    excerpt: "Lernpfad berbagi perspektif tentang persiapan kandidat, kualitas pendampingan, dan proses membangun masa depan lintas negara.",
    content: `Proses perpindahan lintas negara untuk pendidikan vokasi (Ausbildung) memerlukan perencanaan yang matang dan rasa saling percaya antara calon peserta, lembaga pengirim, dan perusahaan penerima di Jerman.\n\nDalam wawancara khusus ini, tim Lernpfad memaparkan bagaimana kombinasi pembelajaran bahasa Jerman intensif (hingga tingkat B1/B2) serta pengenalan budaya kerja secara nyata terbukti meminimalisir kendala komunikasi pada bulan-bulan pertama di Jerman.\n\n"Kami tidak hanya mengajarkan tata bahasa, tetapi juga kebiasaan kerja sehari-hari di Jerman, seperti ketepatan waktu, kemandirian dalam menyampaikan kendala, dan pemahaman tentang hak serta kewajiban sebagai peserta Ausbildung," ungkap perwakilan tim Lernpfad.\n\nDengan pendampingan berkelanjutan hingga peserta tiba di lokasi dan memulai hari pertamanya, Lernpfad berkomitmen memastikan bahwa setiap talenta muda Indonesia memiliki fondasi yang kokoh untuk sukses di lingkungan profesional internasional.`,
    author: "Tim Redaksi Lernpfad",
    featured: true,
    tone: "coral",
  },
  {
    id: 2,
    date: "12 JUN 2024",
    category: "Cerita",
    title: "Dari Bandung ke dapur hotel di Baden-Württemberg",
    excerpt: "Satu perjalanan peserta, dari kelas bahasa hingga hari pertama mengenal tempat kerja barunya di Jerman.",
    content: `Perjalanan melintasi benua selalu dimulai dari satu langkah berani. Bagi kawan kita dari Bandung, impian menjadi juru masak profesional di Jerman diwujudkan melalui dedikasi belajar bahasa Jerman selama 8 bulan intensif.\n\nHari pertama bekerja di dapur hotel berbintang di kawasan Baden-Württemberg membawa kesan yang tak terlupakan. Dari mempelajari kosakata peralatan masak dalam bahasa Jerman hingga beradaptasi dengan ritme dapur profesional yang cepat.\n\n"Tim di tempat kerja sangat menyambut hangat. Meskipun awalnya agak canggung berbicara bahasa Jerman secara langsung, persiapan saat kelas di Indonesia sangat membantu saya memahami instruksi Chef," ceritanya.\n\nKisah ini menjadi bukti bahwa dengan niat yang kuat dan sistem pendampingan yang tepat, mimpi karier internasional dapat terwujud secara terarah.`,
    author: "Kandidat Story",
    tone: "sea",
  },
  {
    id: 3,
    date: "03 SEP 2023",
    category: "Partner",
    title: "Lernpfad hadir di CHEFS CULINAR Messe di Leipzig",
    excerpt: "Bertemu dengan pelaku industri hospitality dan berbicara tentang cara membuka peluang Ausbildung yang lebih terarah.",
    content: `Kehadiran Lernpfad dalam pameran CHEFS CULINAR Messe di Leipzig membuka ruang dialog yang sangat produktif bersama puluhan pengelola hotel, restoran, dan katering di kawasan Jerman Timur.\n\nBanyak pengusaha gastronomi mengungkapkan tantangan besar dalam menemukan tenaga muda yang bersemangat. Dalam kesempatan ini, Lernpfad memperlihatkan portofolio kandidat Indonesia yang transparan, lengkap dengan rekaman percakapan bahasa Jerman dan verifikasi dokumen.\n\nKerja sama ini diharapkan dapat membuka lebih banyak kuota Ausbildung bagi talenta Indonesia di bidang perhotelan dan kuliner pada periode mendatang.`,
    author: "B2B Outreach",
    tone: "butter",
  },
  {
    id: 4,
    date: "31 OKT 2022",
    category: "Partner",
    title: "Membangun jalur talenta di Thementage RINGHOTELS",
    excerpt: "Diskusi bersama jaringan hotel tentang kebutuhan tenaga kerja, budaya kerja, dan kesiapan peserta dari Indonesia.",
    content: `Dalam acara Thementage RINGHOTELS, Lernpfad berdiskusi secara langsung dengan para direktur SDM dari jaringan hotel independen terbesar di Jerman.\n\nFokus diskusi mencakup persiapan integrasi budaya, akomodasi awal bagi peserta internasional, serta strategi bimbingan mentor 1:1 di tempat kerja. Jaringan hotel mengapresiasi transparansi informasi dan kesiapan fisik serta mental peserta yang disalurkan melalui Lernpfad.`,
    author: "Partnership Team",
    tone: "ink",
  },
  {
    id: 5,
    date: "11 OKT 2022",
    category: "Program",
    title: "Berbagi praktik baik di BAFA Energietag",
    excerpt: "Lernpfad ikut membahas peluang serta tanggung jawab dalam proses masuknya tenaga kerja terampil ke Jerman.",
    content: `Partisipasi Lernpfad pada acara BAFA Energietag menjadi wadah untuk bertukar pengalaman terkait regulasi imigrasi tenaga kerja terampil (Fachkräfteeinwanderungsgesetz).\n\nDiskusi menyoroti pentingnya percepatan proses administrasi visa dan pengakuan kualifikasi vokasi tanpa mengorbankan kualitas dan perlindungan hak-hak pekerja.`,
    author: "Program Development",
    tone: "lavender",
  },
];

function NewsHeaderArtwork({ item }: { item: NewsItem }) {
  if (item.imageUrl) {
    return (
      <div className="relative overflow-hidden rounded-[1.6rem] border-2 border-[#173d3a] bg-[#e7f0e9] shadow-[6px_8px_0_#173d3a]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-[320px] sm:h-[420px] w-full object-cover"
        />
      </div>
    );
  }

  const toneClasses: Record<string, string> = {
    coral: "bg-[#d86d50]",
    sea: "bg-[#9ccabc]",
    butter: "bg-[#f4c76b]",
    ink: "bg-[#244f4a]",
    lavender: "bg-[#c6c8dc]",
  };

  const bg = toneClasses[item.tone || "coral"] || toneClasses.coral;

  return (
    <div className={`relative h-[260px] sm:h-[360px] w-full overflow-hidden rounded-[1.6rem] border-2 border-[#173d3a] ${bg} shadow-[6px_8px_0_#173d3a]`}>
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_45%,#173d3a_46%,#173d3a_49%,transparent_50%)] [background-size:32px_32px]" />
      <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[28px] border-[#f5eee3]/70" />
      <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full border-[24px] border-[#173d3a]/20" />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#173d3a]">
        <span className="rounded-full bg-[#f5eee3]/90 px-4 py-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm">
          {item.category} · Lernpfad News
        </span>
        <Newspaper size={28} />
      </div>
    </div>
  );
}

export default function NewsDetail() {
  const [, match] = useRoute("/berita/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const articleId = match?.id;

  const { data: cmsData, isLoading } = useCmsSection("news");

  const newsItems: NewsItem[] = useMemo(() => {
    if (cmsData?.items && Array.isArray(cmsData.items) && cmsData.items.length > 0) {
      return cmsData.items;
    }
    return defaultArticles;
  }, [cmsData?.items]);

  const currentArticle = useMemo(() => {
    if (!articleId) return newsItems[0];
    return (
      newsItems.find((item) => String(item.id) === String(articleId)) ||
      newsItems[0]
    );
  }, [articleId, newsItems]);

  const relatedArticles = useMemo(() => {
    if (!currentArticle) return newsItems.slice(0, 3);
    return newsItems
      .filter((item) => String(item.id) !== String(currentArticle.id))
      .slice(0, 3);
  }, [currentArticle, newsItems]);

  useEffect(() => {
    if (currentArticle?.title) {
      document.title = `${currentArticle.title} — Lernpfad Berita`;
    }
    window.scrollTo(0, 0);
  }, [currentArticle]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Tautan Berhasil Disalin!",
        description: "Tautan artikel berita telah disalin ke clipboard Anda.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-[#f5eee3] text-[#173d3a]">
        <PublicNavbar activeRoute="/berita" />
        <div className="mx-auto max-w-[900px] px-5 py-20">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-[#e3d8c8]" />
          <div className="mt-6 h-16 w-full animate-pulse rounded-2xl bg-[#e3d8c8]" />
          <div className="mt-8 h-80 w-full animate-pulse rounded-3xl bg-[#e3d8c8]" />
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="min-h-[100dvh] bg-[#f5eee3] text-[#173d3a]">
        <PublicNavbar activeRoute="/berita" />
        <div className="mx-auto max-w-[800px] px-5 py-28 text-center">
          <Newspaper className="mx-auto text-[#d35f46]" size={40} />
          <h1 className="mt-4 font-['Fraunces'] text-4xl font-bold">Artikel Tidak Ditemukan</h1>
          <p className="mt-2 text-sm text-[#66817a]">Artikel berita yang Anda cari tidak tersedia atau telah dipindahkan.</p>
          <Link href="/berita" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-5 py-3 font-mono-ui text-xs font-bold uppercase tracking-[0.12em] text-[#f5eee3]">
            <ArrowLeft size={15} /> Kembali ke Berita
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  // Calculate reading time
  const fullText = `${currentArticle.title} ${currentArticle.excerpt} ${currentArticle.content || ""}`;
  const wordCount = fullText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  // Process content paragraphs
  const contentParagraphs = (currentArticle.content || currentArticle.excerpt || "")
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/berita" />

      <main>
        {/* Breadcrumb & Navigation Top */}
        <section className="mx-auto max-w-[960px] px-5 pt-10 sm:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/berita"
              className="group inline-flex items-center gap-2 rounded-full border border-[#173d3a]/20 bg-[#fffaf2] px-4 py-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-all hover:bg-[#173d3a] hover:text-[#f5eee3]"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Kembali ke Berita
            </Link>

            <div className="flex items-center gap-2 font-mono-ui text-[10px] text-[#78938c]">
              <Link href="/" className="hover:text-[#d35f46]">Beranda</Link>
              <ChevronRight size={12} />
              <Link href="/berita" className="hover:text-[#d35f46]">Kabar Terkini</Link>
              <ChevronRight size={12} />
              <span className="font-bold text-[#173d3a] line-clamp-1 max-w-[150px] sm:max-w-[250px]">
                {currentArticle.title}
              </span>
            </div>
          </div>
        </section>

        {/* Article Header & Meta */}
        <article className="mx-auto max-w-[960px] px-5 py-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#173d3a] px-3.5 py-1.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5eee3]">
              {currentArticle.category}
            </span>
            {currentArticle.featured && (
              <span className="rounded-full bg-[#f4c76b] px-3.5 py-1.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a]">
                ★ Sorotan Utama
              </span>
            )}
          </div>

          <h1 className="mt-5 font-['Fraunces'] text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.055em] text-[#173d3a]">
            {currentArticle.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[#173d3a]/15 py-4 text-xs text-[#55736b]">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-[#d35f46]" />
                <span className="font-mono-ui font-bold uppercase tracking-wider">{currentArticle.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#d35f46]" />
                <span className="font-semibold">{currentArticle.author || "Tim Redaksi Lernpfad"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#d35f46]" />
                <span>{readingTime} menit baca</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-[#173d3a]/20 bg-[#fffaf2] px-3.5 py-1.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#173d3a] hover:bg-[#173d3a] hover:text-[#f5eee3]"
            >
              <Share2 size={13} />
              Bagikan
            </button>
          </div>

          {/* Cover Header Artwork or Uploaded Image */}
          <div className="mt-8">
            <NewsHeaderArtwork item={currentArticle} />
          </div>

          {/* Excerpt Summary Box */}
          <div className="mt-10 rounded-2xl border-l-4 border-[#d35f46] bg-[#fffaf2] p-6 shadow-sm">
            <p className="font-['Fraunces'] text-lg sm:text-xl font-medium italic leading-relaxed text-[#214a45]">
              "{currentArticle.excerpt}"
            </p>
          </div>

          {/* Main Article Body Text */}
          <div className="mt-10 space-y-6 text-[16px] sm:text-[18px] leading-[1.8] text-[#2c4742]">
            {contentParagraphs.length > 0 ? (
              contentParagraphs.map((paragraph, index) => (
                <p key={index} className="tracking-[-0.01em]">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="tracking-[-0.01em]">{currentArticle.excerpt}</p>
            )}
          </div>

          {/* Author & Editorial Footer Card */}
          <div className="mt-14 rounded-2xl border border-[#173d3a]/15 bg-[#e7f0e9] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.16em] text-[#d35f46]">
                  Dipublikasikan Oleh
                </div>
                <h3 className="mt-1 font-['Fraunces'] text-xl font-bold text-[#173d3a]">
                  {currentArticle.author || "Tim Redaksi Lernpfad"}
                </h3>
                <p className="mt-1 text-xs text-[#5f7e76]">
                  Lernpfad Talent Bridge · Indonesia × Deutschland
                </p>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-5 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] hover:bg-[#d35f46]"
              >
                Masuk Portal Partner <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-[#173d3a]/15 bg-[#fffaf2] py-16 sm:py-24">
            <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#d35f46]">
                    Rekomendasi Bacaan
                  </div>
                  <h2 className="mt-2 font-['Fraunces'] text-3xl sm:text-4xl font-bold text-[#173d3a]">
                    Kabar Terkait Lainnya
                  </h2>
                </div>
                <Link
                  href="/berita"
                  className="hidden sm:inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46] hover:underline"
                >
                  Lihat Semua Kabar <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.id}`}
                    className="group block rounded-2xl border border-[#173d3a]/15 bg-[#f5eee3] p-5 transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#829891]">
                      <CalendarDays size={12} />
                      {item.date}
                      <span className="h-1 w-1 rounded-full bg-[#d35f46]" />
                      {item.category}
                    </div>

                    <h3 className="mt-3 font-['Fraunces'] text-xl font-semibold leading-snug text-[#173d3a] transition-colors group-hover:text-[#d35f46] line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#66817a] line-clamp-2">
                      {item.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#d35f46]">
                      Baca Artikel <ArrowUpRight size={13} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
