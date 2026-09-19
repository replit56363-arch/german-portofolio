import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Sparkles,
  MapPin,
  Calendar,
  Building2,
  Quote,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  UsersRound,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Stethoscope,
  X,
  Plane,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";

interface AlumniItem {
  id: number;
  name: string;
  program: string;
  category: string;
  year: string;
  city: string;
  workplace: string;
  imageUrl: string;
  quote: string;
  fullStory?: string;
  verified?: boolean;
  featured?: boolean;
  order?: number;
}

export default function AlumniPage() {
  const { t, language } = useLanguage();
  const { data: alumniData, loading } = useCmsSection("alumni");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeStory, setActiveStory] = useState<AlumniItem | null>(null);

  const rawCategories = alumniData?.categories || [
    "Semua",
    "Ausbildung",
    "Au Pair",
    "FSJ / BFD",
    "G to G Perawat",
    "Kuliah",
  ];

  const getCategoryLabel = (cat: string) => {
    if (language === "id") return cat;
    const lower = cat.toLowerCase();
    if (lower.includes("semua") || lower === "all") return t("alumni.cat_all", "Alle");
    if (lower.includes("ausbildung")) return "Ausbildung";
    if (lower.includes("au pair")) return "Au Pair";
    if (lower.includes("fsj")) return "FSJ / BFD";
    if (lower.includes("g to g") || lower.includes("perawat")) return t("alumni.cat_gtog", "G to G Pflege");
    if (lower.includes("kuliah") || lower.includes("studium")) return t("alumni.cat_studium", "Studium");
    return cat;
  };

  const items: AlumniItem[] = alumniData?.items || [];
  const stats = [
    { id: 1, number: "01", value: alumniData?.stats?.[0]?.value || "100%", label: language !== "id" ? t("alumni.stat_visa", "Visabewilligungsrate") : (alumniData?.stats?.[0]?.label || "Tingkat Persetujuan Visa"), detail: language !== "id" ? t("alumni.stat_visa_desc", "Offizielle Prüfung & Begleitung") : (alumniData?.stats?.[0]?.detail || "Verifikasi resmi & pendampingan") },
    { id: 2, number: "02", value: alumniData?.stats?.[1]?.value || "25+", label: language !== "id" ? t("alumni.stat_cities", "Einsatzstädte in DE") : (alumniData?.stats?.[1]?.label || "Kota Penempatan di Jerman"), detail: alumniData?.stats?.[1]?.detail || "Frankfurt, München, Berlin, dll." },
    { id: 3, number: "03", value: alumniData?.stats?.[2]?.value || "5 Jalur", label: language !== "id" ? t("alumni.stat_programs", "Offizielle Wege") : (alumniData?.stats?.[2]?.label || "Program Resmi Terbukti"), detail: alumniData?.stats?.[2]?.detail || "Ausbildung, Au Pair, FSJ, G to G, Kuliah" },
    { id: 4, number: "04", value: alumniData?.stats?.[3]?.value || "1:1", label: language !== "id" ? t("alumni.stat_guidance", "Intensive Begleitung") : (alumniData?.stats?.[3]?.label || "Konsultasi Mandiri"), detail: language !== "id" ? t("alumni.stat_guidance_desc", "1:1 Betreuung bis zur Abreise") : (alumniData?.stats?.[3]?.detail || "Bimbingan intensif hingga berangkat") },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua" || !selectedCategory) return items;
    return items.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [items, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Ausbildung":
        return <Briefcase size={14} className="text-[#1b5a9f]" />;
      case "Au Pair":
        return <HeartHandshake size={14} className="text-pink-600" />;
      case "FSJ / BFD":
        return <UsersRound size={14} className="text-amber-600" />;
      case "G to G Perawat":
        return <Stethoscope size={14} className="text-emerald-600" />;
      case "Kuliah":
        return <GraduationCap size={14} className="text-purple-600" />;
      default:
        return <Sparkles size={14} className="text-[#1b5a9f]" />;
    }
  };

  const heroEyebrow = language !== "id" ? t("alumni.eyebrow", "Alumni-Dokumentation & Galerie") : (alumniData?.headerEyebrow || "Dokumentasi & Galeri Alumni");
  const heroTitle = language !== "id" ? t("alumni.title", "Fotos & Erfolgsgeschichten in Deutschland") : (alumniData?.headerTitle || "Foto & Kisah Sukses Alumni di Jerman");
  const heroSubtitle = language !== "id" ? t("alumni.subtitle", "Echte Fotodokumentation von ICH LIEBE DEUTSCH MEDAN Alumni, die erfolgreich in Ausbildung, Au Pair, FSJ, G to G Pflege und Universitätsstudium in ganz Deutschland tätig sind.") : (alumniData?.headerSubtitle || "Dokumentasi foto nyata para alumni ICH LIEBE DEUTSCH MEDAN yang telah resmi berkarier dan menempuh program Ausbildung, Au Pair, FSJ, G to G Perawat, dan Kuliah di berbagai kota di Jerman.");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col selection:bg-[#1b5a9f] selection:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#123862] via-[#1b5a9f] to-[#15467c] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold tracking-wide uppercase mb-4 text-[#dbeafe]">
            <Sparkles size={14} className="text-[#93c5fd]" />
            {heroEyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {heroTitle}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {heroSubtitle}
          </p>

          {/* Key Achievements Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {stats.map((st: any) => (
              <div
                key={st.id || st.number}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-amber-300">{st.value}</div>
                <div className="text-xs text-white font-semibold mt-1">{st.label}</div>
                {st.detail && <div className="text-[11px] text-slate-300 mt-0.5">{st.detail}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {rawCategories.map((cat: string) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#1b5a9f] text-white shadow-md shadow-[#1b5a9f]/20 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{getCategoryLabel(cat)}</span>
              </button>
            );
          })}
        </div>

        {/* Alumni Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <UsersRound size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">
              {t("alumni.empty_title", "Belum ada foto alumni di kategori ini")}
            </h3>
            <button
              type="button"
              onClick={() => setSelectedCategory("Semua")}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1b5a9f] rounded-xl"
            >
              Lihat Semua Foto Alumni
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Photo & Category Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={alumni.imageUrl}
                    alt={alumni.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-md shadow-sm">
                      {getCategoryIcon(alumni.category)}
                      {alumni.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400/95 text-amber-950 shadow-sm">
                      {alumni.year}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold drop-shadow-sm">{alumni.name}</h3>
                    <p className="text-xs text-slate-200 line-clamp-1">{alumni.program}</p>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin size={14} className="text-[#1b5a9f] shrink-0" />
                      <span className="text-slate-800 font-semibold">{alumni.city}</span>
                    </div>
                    {alumni.workplace && (
                      <div className="flex items-center gap-2 font-medium">
                        <Building2 size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate">{alumni.workplace}</span>
                      </div>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative pl-3 border-l-2 border-[#1b5a9f] py-1">
                    <p className="text-xs text-slate-600 italic line-clamp-3">
                      "{alumni.quote}"
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={() => setActiveStory(alumni)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl shadow-sm transition-colors"
                  >
                    <span>{t("alumni.card_read_story", "Baca Kisah Lengkap")}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Commitment Banner */}
        <section className="mt-16 bg-gradient-to-r from-[#123862] via-[#1b5a9f] to-[#15467c] rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black">
              {t("alumni.quote_heading", "Keberhasilan Anda Adalah Komitmen Nyata Kami")}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {t(
                "alumni.quote_sub",
                "Dari kelas bahasa di Medan hingga tempat kerja dan universitas di Jerman. Konsultasikan jalur dan rencana masa depan Anda bersama kami."
              )}
            </p>
          </div>
          <a
            href="https://wa.me/6282127324453?text=Halo%20Ich%20Liebe%20Deutsch%20Medan,%20saya%20tertarik%20untuk%20mendaftar%20kursus%20persiapan%20ke%20Jerman."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Konsultasi Gratis via WhatsApp
          </a>
        </section>
      </main>

      {/* Story Detail Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <img
                src={activeStory.imageUrl}
                alt={activeStory.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-2">
                  {getCategoryIcon(activeStory.category)}
                  <span>{activeStory.category} · Berangkat {activeStory.year}</span>
                </div>
                <h2 className="text-2xl font-black">{activeStory.name}</h2>
                <p className="text-xs text-slate-200 mt-1">{activeStory.program}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Kota Penempatan:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={13} className="text-[#1b5a9f]" />
                    {activeStory.city}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Institusi / Perusahaan:</span>
                  <span className="font-bold text-slate-800 block truncate mt-0.5">
                    {activeStory.workplace}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <Quote size={14} />
                  <span>{t("alumni.modal_quote", "Pesan Untuk Calon Siswa")}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{activeStory.quote}"
                </p>
              </div>

              {/* Full Story */}
              {activeStory.fullStory && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t("alumni.modal_title", "Kisah Perjalanan & Inspirasi Alumni")}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-4 rounded-2xl">
                    {activeStory.fullStory}
                  </p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStory(null)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
