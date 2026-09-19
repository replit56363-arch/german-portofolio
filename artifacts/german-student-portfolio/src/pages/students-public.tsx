import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import {
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  PlaneTakeoff,
  Award,
  Video,
  FileCheck,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  X,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { useLanguage } from "@/lib/language-context";

interface StudentPublicData {
  id: number;
  name: string;
  email?: string;
  level: "A1" | "A2" | "B1" | "B2";
  cohort: string;
  status: "training" | "ready" | "placed";
  bio?: string;
  photoUrl?: string;
  targetProgram?: string;
  targetCity?: string;
  startDate?: string;
  speakingScore?: number;
  grammarScore?: number;
  listeningScore?: number;
  readingScore?: number;
  speakingVideoUrl?: string;
  certificateUrl?: string;
  milestones?: { title: string; date: string; completed: boolean }[];
  placement?: {
    companyName: string;
    city: string;
    role: string;
    placedAt: string;
  };
}

const FALLBACK_STUDENTS: StudentPublicData[] = [
  {
    id: 1,
    name: "Siti Rahmawati",
    level: "B2",
    cohort: "Cohort 2024-A",
    status: "placed",
    bio: "Lulusan B2 Pflege. Diterima di Universitätsklinikum Frankfurt am Main melalui jalur Ausbildung Keperawatan resmi.",
    photoUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&q=80",
    targetProgram: "Ausbildung Keperawatan",
    targetCity: "Frankfurt am Main",
    startDate: "2024-01-10",
    speakingScore: 92,
    grammarScore: 88,
    listeningScore: 90,
    readingScore: 89,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe A1", date: "Maret 2024", completed: true },
      { title: "Lulus Goethe A2", date: "Juni 2024", completed: true },
      { title: "Lulus Goethe B1", date: "September 2024", completed: true },
      { title: "Lulus Goethe B2 & Kontrak Kerja", date: "Desember 2024", completed: true },
    ],
    placement: {
      companyName: "Universitätsklinikum Frankfurt",
      city: "Frankfurt am Main",
      role: "Pflegefachfrau",
      placedAt: "2024-12-15",
    },
  },
  {
    id: 2,
    name: "Ahmad Fauzi",
    level: "B1",
    cohort: "Cohort 2024-B",
    status: "ready",
    bio: "Peserta program Ausbildung Hotelfachmann & Gastronomie di München. Telah menyelesaikan simulasi wawancara kerja dan dokumen kontrak.",
    photoUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
    targetProgram: "Ausbildung Perhotelan",
    targetCity: "München, Bayern",
    startDate: "2024-03-01",
    speakingScore: 86,
    grammarScore: 84,
    listeningScore: 88,
    readingScore: 85,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe A1", date: "Mei 2024", completed: true },
      { title: "Lulus Goethe A2", date: "Agustus 2024", completed: true },
      { title: "Lulus Goethe B1", date: "November 2024", completed: true },
      { title: "Persiapan Ujian B2 & Wawancara", date: "Januari 2025", completed: false },
    ],
  },
  {
    id: 3,
    name: "Nadia Anggraini",
    level: "A2",
    cohort: "Cohort 2024-C",
    status: "ready",
    bio: "Peserta program Au Pair di Köln. Sangat aktif dalam sesi percakapan sehari-hari dan pemahaman budaya keluarga Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
    targetProgram: "Au Pair Jerman",
    targetCity: "Köln, NRW",
    startDate: "2024-06-15",
    speakingScore: 89,
    grammarScore: 82,
    listeningScore: 85,
    readingScore: 84,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe A1", date: "Agustus 2024", completed: true },
      { title: "Lulus Goethe A2", date: "Oktober 2024", completed: true },
      { title: "Pencocokan Host Family & Visa", date: "Desember 2024", completed: true },
    ],
  },
  {
    id: 4,
    name: "Reza Pratama",
    level: "B1",
    cohort: "Cohort 2024-B",
    status: "training",
    bio: "Mempersiapkan program FSJ (Freiwilliges Soziales Jahr) di Hamburg. Fokus pada terminologi sosial dan pelayanan lansia.",
    photoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    targetProgram: "FSJ / BFD",
    targetCity: "Hamburg",
    startDate: "2024-04-10",
    speakingScore: 82,
    grammarScore: 80,
    listeningScore: 84,
    readingScore: 81,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe A1", date: "Juni 2024", completed: true },
      { title: "Lulus Goethe A2", date: "September 2024", completed: true },
      { title: "Kelas Intensif B1", date: "Sedang Berlangsung", completed: false },
    ],
  },
  {
    id: 5,
    name: "Dian Permata",
    level: "B2",
    cohort: "Cohort 2023-A",
    status: "placed",
    bio: "Perawat berlisensi lulusan B2 yang kini bertugas di Klinikum Stuttgart melalui jalur resmi G to G Pemerintah Indonesia - Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1594824813593-455b85efb7cb?w=400&q=80",
    targetProgram: "G to G Perawat",
    targetCity: "Stuttgart",
    startDate: "2023-08-01",
    speakingScore: 94,
    grammarScore: 90,
    listeningScore: 92,
    readingScore: 91,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe B1", date: "Januari 2024", completed: true },
      { title: "Lulus Goethe B2 Pflege", date: "Juni 2024", completed: true },
      { title: "Penempatan Resmi Stuttgart", date: "September 2024", completed: true },
    ],
    placement: {
      companyName: "Klinikum Stuttgart",
      city: "Stuttgart, Baden-Württemberg",
      role: "Gesundheits- und Krankenpflegerin",
      placedAt: "2024-09-01",
    },
  },
  {
    id: 6,
    name: "Budi Santoso",
    level: "B2",
    cohort: "Cohort 2024-A",
    status: "ready",
    bio: "Persiapan studi teknik mesin (Maschinenbau) di RWTH Aachen. Menguasai terminologi akademis sains dan teknik dalam bahasa Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    targetProgram: "Studium / Kuliah",
    targetCity: "Aachen",
    startDate: "2024-02-15",
    speakingScore: 90,
    grammarScore: 92,
    listeningScore: 89,
    readingScore: 94,
    speakingVideoUrl: "https://www.youtube.com",
    certificateUrl: "#",
    milestones: [
      { title: "Lulus Goethe A1-A2", date: "April 2024", completed: true },
      { title: "Lulus Goethe B1", date: "Juli 2024", completed: true },
      { title: "Lulus Goethe B2", date: "November 2024", completed: true },
      { title: "Penerimaan Studienkolleg/Universitas", date: "Januari 2025", completed: true },
    ],
  },
];

export default function StudentsPublic() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<StudentPublicData[]>(FALLBACK_STUDENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentPublicData | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const res = await fetch("/api/public/students");
        if (res.ok) {
          const data = await res.json();
          if (mounted && Array.isArray(data) && data.length > 0) {
            // Map api student data with fallback fields
            const enriched = data.map((item: any, idx: number) => {
              const fallbackItem = FALLBACK_STUDENTS[idx % FALLBACK_STUDENTS.length];
              return {
                id: item.id || idx + 1,
                name: item.name,
                email: item.email,
                level: item.level || "A1",
                cohort: item.cohort || "Cohort 2024",
                status: item.status || "training",
                bio: item.bio || fallbackItem.bio,
                photoUrl: item.photoUrl || fallbackItem.photoUrl,
                targetProgram: item.targetProgram || fallbackItem.targetProgram,
                targetCity: item.placement?.city || fallbackItem.targetCity,
                startDate: item.startDate || fallbackItem.startDate,
                speakingScore: fallbackItem.speakingScore,
                grammarScore: fallbackItem.grammarScore,
                listeningScore: fallbackItem.listeningScore,
                readingScore: fallbackItem.readingScore,
                speakingVideoUrl: fallbackItem.speakingVideoUrl,
                certificateUrl: fallbackItem.certificateUrl,
                milestones: fallbackItem.milestones,
                placement: item.placement || (item.status === "placed" ? fallbackItem.placement : undefined),
              };
            });
            setStudents(enriched);
          }
        }
      } catch (err) {
        console.error("Failed to load public students API, using fallback data", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        !search.trim() ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.targetProgram && s.targetProgram.toLowerCase().includes(search.toLowerCase())) ||
        (s.bio && s.bio.toLowerCase().includes(search.toLowerCase())) ||
        (s.cohort && s.cohort.toLowerCase().includes(search.toLowerCase()));

      const matchLevel = levelFilter === "all" || s.level === levelFilter;
      const matchStatus = statusFilter === "all" || s.status === statusFilter;

      return matchSearch && matchLevel && matchStatus;
    });
  }, [students, search, levelFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "training").length;
    const ready = students.filter((s) => s.status === "ready").length;
    const placed = students.filter((s) => s.status === "placed").length;
    return { total, active, ready, placed };
  }, [students]);

  const getStatusBadge = (status: StudentPublicData["status"]) => {
    switch (status) {
      case "placed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <PlaneTakeoff size={12} />
            {t("students.status_placed", "Telah di Jerman")}
          </span>
        );
      case "ready":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <CheckCircle2 size={12} />
            {t("students.status_ready", "Siap Penempatan")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} />
            {t("students.status_in_progress", "Sedang Belajar")}
          </span>
        );
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "B2":
        return "bg-[#1b5a9f] text-white";
      case "B1":
        return "bg-[#3377b5] text-white";
      case "A2":
        return "bg-[#6b9ec7] text-white";
      default:
        return "bg-[#8eaec9] text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col selection:bg-[#1b5a9f] selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#123862] via-[#1b5a9f] to-[#15467c] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold tracking-wide uppercase mb-4 text-[#dbeafe]">
            <GraduationCap size={14} className="text-[#93c5fd]" />
            {t("students.eyebrow", "Direktori Siswa & Kandidat Aktif")}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("students.title", "Data Siswa & Calon Talenta ke Jerman")}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {t(
              "students.subtitle",
              "Daftar siswa bimbingan aktif di ICH LIEBE DEUTSCH MEDAN dengan rincian level bahasa Jerman (A1–B2), riwayat pencapaian, dan jalur target program ke Jerman."
            )}
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{stats.total}</div>
              <div className="text-xs text-slate-200 mt-1 font-medium">{t("students.stat_total", "Total Siswa")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">{stats.active}</div>
              <div className="text-xs text-slate-200 mt-1 font-medium">{t("students.stat_active", "Aktif Belajar")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">{stats.ready}</div>
              <div className="text-xs text-slate-200 mt-1 font-medium">{t("students.stat_ready", "Siap Berangkat")}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">{stats.placed}</div>
              <div className="text-xs text-slate-200 mt-1 font-medium">{t("students.stat_placed", "Telah di Jerman")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("students.search_placeholder", "Cari nama siswa, program target, atau kata kunci...")}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5a9f]/20 focus:border-[#1b5a9f] transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Level Filter */}
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b5a9f] text-slate-700 font-medium"
              >
                <option value="all">{t("students.filter_all", "Semua Level")}</option>
                <option value="A1">Level A1 (Grundstufe 1)</option>
                <option value="A2">Level A2 (Grundstufe 2)</option>
                <option value="B1">Level B1 (Mittelstufe 1)</option>
                <option value="B2">Level B2 (Mittelstufe 2)</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b5a9f] text-slate-700 font-medium"
              >
                <option value="all">{t("students.status_all", "Semua Status")}</option>
                <option value="training">{t("students.status_in_progress", "Sedang Belajar")}</option>
                <option value="ready">{t("students.status_ready", "Siap Penempatan")}</option>
                <option value="placed">{t("students.status_placed", "Telah di Jerman")}</option>
              </select>

              {(search || levelFilter !== "all" || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setLevelFilter("all");
                    setStatusFilter("all");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {t("students.empty_title", "Tidak Ada Siswa yang Ditemukan")}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {t("students.empty_desc", "Silakan sesuaikan kata kunci pencarian atau filter yang digunakan.")}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLevelFilter("all");
                setStatusFilter("all");
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl transition-colors"
            >
              Hapus Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Card Header & Photo */}
                <div className="p-5 pb-4 border-b border-slate-100 flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        student.photoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          student.name
                        )}&background=1b5a9f&color=fff&size=128`
                      }
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[10px] font-black tracking-wide ${getLevelBadgeColor(
                        student.level
                      )}`}
                    >
                      {student.level}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-base truncate group-hover:text-[#1b5a9f] transition-colors">
                        {student.name}
                      </h3>
                    </div>
                    <div className="text-xs text-slate-500 font-medium mb-2">{student.cohort}</div>
                    <div>{getStatusBadge(student.status)}</div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {student.bio || "Siswa bimbingan intensif persiapan bahasa dan keberangkatan ke Jerman."}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    {student.targetProgram && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">{t("students.card_target", "Target Program")}:</span>
                        <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                          {student.targetProgram}
                        </span>
                      </div>
                    )}
                    {student.targetCity && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400 font-medium">{t("alumni.card_location", "Kota Target")}:</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin size={12} className="text-[#1b5a9f]" />
                          {student.targetCity}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStudent(student)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1b5a9f] bg-slate-50 hover:bg-[#1b5a9f] hover:text-white border border-slate-200 hover:border-[#1b5a9f] rounded-xl transition-all duration-150"
                  >
                    <span>{t("students.card_details_btn", "Lihat Profil Lengkap")}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="relative p-6 pb-5 bg-gradient-to-r from-[#123862] to-[#1b5a9f] text-white rounded-t-3xl flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={
                    selectedStudent.photoUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedStudent.name
                    )}&background=1b5a9f&color=fff&size=128`
                  }
                  alt={selectedStudent.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
                />
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-semibold text-white mb-1">
                    Level {selectedStudent.level} · {selectedStudent.cohort}
                  </div>
                  <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-xs text-slate-200 mt-0.5">{selectedStudent.targetProgram || "Program Jerman"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Location Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  {getStatusBadge(selectedStudent.status)}
                </div>
                {selectedStudent.targetCity && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <MapPin size={14} className="text-[#1b5a9f]" />
                    {selectedStudent.targetCity}
                  </div>
                )}
              </div>

              {/* Bio & Background */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t("students.modal_bio", "Biografi & Rencana Karier")}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-4 rounded-2xl">
                  {selectedStudent.bio || "Sedang menempuh persiapan bahasa Jerman intensif bersama pengajar bersertifikat UNIMED & berpengalaman 6 tahun di Jerman."}
                </p>
              </div>

              {/* Milestones / Language Progression */}
              {selectedStudent.milestones && selectedStudent.milestones.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {t("students.modal_level_progress", "Perkembangan Tingkat Bahasa")}
                  </h4>
                  <div className="space-y-2.5">
                    {selectedStudent.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 text-xs"
                      >
                        <div className="flex items-center gap-2.5 font-medium text-slate-800">
                          {m.completed ? (
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          ) : (
                            <Clock size={16} className="text-amber-500 shrink-0" />
                          )}
                          <span>{m.title}</span>
                        </div>
                        <span className="text-slate-500 font-medium text-[11px]">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placement Details if Placed */}
              {selectedStudent.placement && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide mb-2">
                    <PlaneTakeoff size={15} />
                    <span>Penempatan Resmi di Jerman</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-emerald-600 block">Institusi / Rumah Sakit:</span>
                      <span className="font-semibold text-slate-800">{selectedStudent.placement.companyName}</span>
                    </div>
                    <div>
                      <span className="text-emerald-600 block">Posisi / Profesi:</span>
                      <span className="font-semibold text-slate-800">{selectedStudent.placement.role}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/6282127324453?text=Halo%20Ich%20Liebe%20Deutsch%20Medan,%20saya%20tertarik%20dengan%20informasi%20program%20dan%20kandidat%20siswa%20${encodeURIComponent(
                    selectedStudent.name
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>{t("students.modal_contact_wa", "Konsultasi Profil via WhatsApp")}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
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
