import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Building2,
  Wind,
  Volume2,
  Tv,
  BookOpen,
  Users,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  X,
  Compass,
  Clock,
  ShieldCheck,
  ImageIcon,
} from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";

interface ClassroomItem {
  id: number;
  name: string;
  roomCode: string;
  category: string;
  capacity: string;
  floor: string;
  imageUrl: string;
  description: string;
  amenities: string[];
  gallery?: string[];
  active?: boolean;
  order?: number;
}

export default function ClassroomsPage() {
  const { t } = useLanguage();
  const { data: cmsData, loading } = useCmsSection("classrooms");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeRoom, setActiveRoom] = useState<ClassroomItem | null>(null);

  const categories = cmsData?.categories || [
    "Semua",
    "Ruang Teori & Grammatik",
    "Lab Audio-Visual (Hören)",
    "Ruang Diskusi (Sprechen)",
    "Pojok Ujian Goethe",
    "Lounge & Konsultasi",
  ];

  const items: ClassroomItem[] = cmsData?.items || [];
  const facilityHighlights = cmsData?.facilityHighlights || [
    {
      id: 1,
      title: t("classroom.feature_ac", "Ruangan Ber-AC & Nyaman"),
      description: t(
        "classroom.feature_ac_desc",
        "Setiap kelas dilengkapi pendingin udara (AC) berkualitas untuk kenyamanan belajar intensif berjam-jam tanpa distraksi."
      ),
      icon: "Wind",
    },
    {
      id: 2,
      title: t("classroom.feature_audio", "Sistem Audio Standar Ujian Goethe"),
      description: t(
        "classroom.feature_audio_desc",
        "Speaker Hi-Fi fidelitas tinggi untuk latihan Hörverstehen dengan kejelasan pelafalan dialek Hochdeutsch asli Jerman."
      ),
      icon: "Volume2",
    },
    {
      id: 3,
      title: t("classroom.feature_tv", "Smart TV & Presentasi Digital"),
      description: t(
        "classroom.feature_tv_desc",
        "Layar pintar interaktif untuk demonstrasi tata bahasa, pemutaran film kebudayaan Jerman, dan latihan soal bersama."
      ),
      icon: "Tv",
    },
    {
      id: 4,
      title: t("classroom.feature_books", "Koleksi Buku Diktat Resmi Jerman"),
      description: t(
        "classroom.feature_books_desc",
        "Buku panduan terbaru (Netzwerk Neu, Aspekte Neu, Fit fürs Goethe-Zertifikat A1-B2) dan kamus lengkap."
      ),
      icon: "BookOpen",
    },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua" || !selectedCategory) return items;
    return items.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [items, selectedCategory]);

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case "Wind":
        return <Wind size={22} className="text-[#1b5a9f]" />;
      case "Volume2":
        return <Volume2 size={22} className="text-emerald-600" />;
      case "Tv":
        return <Tv size={22} className="text-indigo-600" />;
      case "BookOpen":
        return <BookOpen size={22} className="text-amber-600" />;
      default:
        return <Sparkles size={22} className="text-[#1b5a9f]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col selection:bg-[#1b5a9f] selection:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#123862] via-[#1b5a9f] to-[#15467c] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold tracking-wide uppercase mb-4 text-[#dbeafe]">
            <Building2 size={14} className="text-[#93c5fd]" />
            {cmsData?.headerEyebrow || t("classroom.eyebrow", "Fasilitas & Kampus Medan")}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {cmsData?.headerTitle || t("classroom.title", "Ruangan Kelas & Sarana Belajar Modern")}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {cmsData?.headerSubtitle ||
              t(
                "classroom.subtitle",
                "Fasilitas ber-AC, multimedia audio-visual standar Goethe-Institut, dan perpustakaan literatur Jerman di Jl. Ternak II No. 39 Medan Polonia yang dirancang untuk mendukung 4 keterampilan bahasa: Hören, Lesen, Schreiben, dan Sprechen."
              )}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-200">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <MapPin size={13} className="text-amber-300" />
              Jl. Ternak II No. 39, Medan Polonia
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <ShieldCheck size={13} className="text-emerald-300" />
              Lembaga Resmi Terdaftar & Berizin
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Highlight Feature Cards */}
        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t("classroom.features_title", "Keunggulan Standar Fasilitas ILD Medan")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilityHighlights.map((hl: any) => (
              <div
                key={hl.id || hl.title}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  {getHighlightIcon(hl.icon)}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{hl.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{hl.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((cat: string) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#1b5a9f] text-white shadow-md shadow-[#1b5a9f]/20 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Classrooms Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Building2 size={28} className="text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-4">Tidak ada ruangan di kategori ini.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory("Semua")}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1b5a9f] rounded-xl"
            >
              Lihat Semua Ruangan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Photo & Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-md shadow-sm">
                      {room.floor}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-900/80 text-white backdrop-blur-md shadow-sm">
                      {room.roomCode}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-bold drop-shadow-sm">{room.name}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {room.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users size={13} className="text-[#1b5a9f]" />
                      <span className="font-semibold text-slate-800">{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Layers size={13} className="text-[#1b5a9f]" />
                      <span className="font-semibold text-slate-800">{room.floor}</span>
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 3).map((am, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {am}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-medium">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveRoom(room)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl shadow-sm transition-colors"
                  >
                    <span>{t("classroom.card_gallery_btn", "Lihat Foto & Detail")}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visit & Consultation CTA */}
        <section className="mt-16 bg-gradient-to-r from-[#123862] via-[#1b5a9f] to-[#15467c] rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black">
              {t("classroom.visit_title", "Kunjungi Lembaga & Konsultasi Langsung")}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {t(
                "classroom.visit_desc",
                "Ingin melihat langsung ruang kelas dan sarana multimedia kami di Medan Polonia? Jadwalkan kunjungan santai atau sesi konsultasi program bersama kami."
              )}
            </p>
          </div>
          <a
            href="https://wa.me/6282127324453?text=Halo%20Ich%20Liebe%20Deutsch%20Medan,%20saya%20ingin%20jadwalkan%20kunjungan%20ke%20kampus%20Jl.%20Ternak%20II%20Medan%20Polonia."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle size={17} />
            <span>{t("classroom.visit_cta", "Jadwalkan Kunjungan via WhatsApp")}</span>
          </a>
        </section>
      </main>

      {/* Room Detail Modal */}
      {activeRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <img
                src={activeRoom.imageUrl}
                alt={activeRoom.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setActiveRoom(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-2">
                  <span>{activeRoom.roomCode} · {activeRoom.floor}</span>
                </div>
                <h2 className="text-2xl font-black">{activeRoom.name}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Kapasitas Maksimal:</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5">{activeRoom.capacity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Kategori Ruangan:</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5">{activeRoom.category}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Deskripsi Ruangan
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-4 rounded-2xl">
                  {activeRoom.description}
                </p>
              </div>

              {/* Amenities Checklist */}
              {activeRoom.amenities && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Fasilitas & Sarana Pembelajaran
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeRoom.amenities.map((am, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Photos */}
              {activeRoom.gallery && activeRoom.gallery.length > 1 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Galeri Foto Tambahan
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeRoom.gallery.map((gUrl, idx) => (
                      <img
                        key={idx}
                        src={gUrl}
                        alt={`${activeRoom.name} foto ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-28 rounded-xl object-cover border border-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/6282127324453?text=Halo%20Ich%20Liebe%20Deutsch%20Medan,%20saya%20tertarik%20mengenai%20kelas%20dan%20fasilitas%20di%20kampus%20Medan."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Tanya Jadwal Kelas di Ruangan Ini</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveRoom(null)}
                  className="px-5 py-3 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
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
