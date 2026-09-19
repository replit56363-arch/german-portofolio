import { useState, useEffect } from "react";
import { Link } from "wouter";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import {
  Plus,
  Trash2,
  Edit2,
  GraduationCap,
  Sparkles,
  X,
  Search,
  CheckCircle2,
  Clock,
  PlaneTakeoff,
  ExternalLink,
  MapPin,
  Calendar,
  Save,
} from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";

interface StudentItem {
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
  placement?: {
    companyName: string;
    city: string;
    role: string;
    placedAt?: string;
  };
}

const DEFAULT_STUDENTS_LIST: StudentItem[] = [
  {
    id: 1,
    name: "Siti Rahmawati",
    email: "siti.rahmawati@gmail.com",
    level: "B2",
    cohort: "Cohort 2024-A",
    status: "placed",
    bio: "Lulusan B2 Pflege. Diterima di Universitätsklinikum Frankfurt am Main melalui jalur Ausbildung Keperawatan resmi.",
    photoUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&q=80",
    targetProgram: "Ausbildung Keperawatan",
    targetCity: "Frankfurt am Main",
    startDate: "2024-01-10",
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
    email: "ahmad.fauzi@gmail.com",
    level: "B1",
    cohort: "Cohort 2024-B",
    status: "ready",
    bio: "Peserta program Ausbildung Hotelfachmann & Gastronomie di München. Telah menyelesaikan simulasi wawancara kerja dan dokumen kontrak.",
    photoUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
    targetProgram: "Ausbildung Perhotelan",
    targetCity: "München, Bayern",
    startDate: "2024-03-01",
  },
  {
    id: 3,
    name: "Nadia Anggraini",
    email: "nadia.anggraini@gmail.com",
    level: "A2",
    cohort: "Cohort 2024-C",
    status: "ready",
    bio: "Peserta program Au Pair di Köln. Sangat aktif dalam sesi percakapan sehari-hari dan pemahaman budaya keluarga Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
    targetProgram: "Au Pair Jerman",
    targetCity: "Köln, NRW",
    startDate: "2024-06-15",
  },
  {
    id: 4,
    name: "Reza Pratama",
    email: "reza.pratama@gmail.com",
    level: "B1",
    cohort: "Cohort 2024-B",
    status: "training",
    bio: "Mempersiapkan program FSJ (Freiwilliges Soziales Jahr) di Hamburg. Fokus pada terminologi sosial dan pelayanan lansia.",
    photoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    targetProgram: "FSJ / BFD",
    targetCity: "Hamburg",
    startDate: "2024-04-10",
  },
  {
    id: 5,
    name: "Dian Permata",
    email: "dian.permata@gmail.com",
    level: "B2",
    cohort: "Cohort 2023-A",
    status: "placed",
    bio: "Perawat berlisensi lulusan B2 yang kini bertugas di Klinikum Stuttgart melalui jalur resmi G to G Pemerintah Indonesia - Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1594824813593-455b85efb7cb?w=400&q=80",
    targetProgram: "G to G Perawat",
    targetCity: "Stuttgart",
    startDate: "2023-08-01",
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
    email: "budi.santoso@gmail.com",
    level: "B2",
    cohort: "Cohort 2024-A",
    status: "ready",
    bio: "Persiapan studi teknik mesin (Maschinenbau) di RWTH Aachen. Menguasai terminologi akademis sains dan teknik dalam bahasa Jerman.",
    photoUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    targetProgram: "Studium / Kuliah",
    targetCity: "Aachen",
    startDate: "2024-02-15",
  },
];

export default function StudentsCms() {
  const [students, setStudents] = useState<StudentItem[]>(DEFAULT_STUDENTS_LIST);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [studentForm, setStudentForm] = useState<StudentItem>({
    id: Date.now(),
    name: "",
    email: "",
    level: "A1",
    cohort: `Cohort ${new Date().getFullYear()}-A`,
    status: "training",
    bio: "",
    photoUrl: "",
    targetProgram: "Ausbildung Keperawatan",
    targetCity: "Frankfurt am Main",
    startDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStudents(data);
          }
        }
      } catch (err) {
        console.warn("Could not fetch /api/students, using local state", err);
      }
    }
    fetchStudents();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setStudentForm({
      id: Date.now(),
      name: "",
      email: "",
      level: "A1",
      cohort: `Cohort ${new Date().getFullYear()}-A`,
      status: "training",
      bio: "",
      photoUrl: "",
      targetProgram: "Ausbildung Keperawatan",
      targetCity: "Frankfurt am Main",
      startDate: new Date().toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student: StudentItem) => {
    setEditingId(student.id);
    setStudentForm({ ...student });
    setIsModalOpen(true);
  };

  const handleSaveStudent = async () => {
    if (!studentForm.name.trim()) {
      alert("Nama siswa wajib diisi!");
      return;
    }

    try {
      if (editingId !== null) {
        // Try to update via API
        try {
          await fetch(`/api/students/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentForm),
          });
        } catch {
          // ignore network error, update locally
        }
        setStudents((prev) =>
          prev.map((s) => (s.id === editingId ? { ...studentForm } : s))
        );
      } else {
        // Try to create via API
        try {
          const res = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentForm),
          });
          if (res.ok) {
            const created = await res.json();
            if (created && created.id) {
              studentForm.id = created.id;
            }
          }
        } catch {
          // ignore
        }
        setStudents((prev) => [studentForm, ...prev]);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan data siswa");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (window.confirm("Hapus data siswa ini?")) {
      try {
        await fetch(`/api/students/${id}`, { method: "DELETE" });
      } catch {
        // ignore
      }
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.targetProgram && s.targetProgram.toLowerCase().includes(search.toLowerCase())) ||
      (s.cohort && s.cohort.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <CmsLayout
      title="Kelola Data Siswa"
      subtitle="Tambah, perbarui profil, level bahasa (A1–B2), target penempatan, dan status keberangkatan siswa."
      publicHref="/siswa"
      isSaved={saved}
      errorMessage={error}
    >
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#dfe8f0] shadow-sm">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, target program, angkatan..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1b5a9f]"
          />
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1b5a9f] hover:bg-[#15467c] text-white font-bold text-sm rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span>Tambah Siswa Baru</span>
        </button>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-2xl border border-[#dfe8f0] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#e7eef4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-[#1b5a9f]" />
            <h3 className="font-bold text-[#213853] text-sm">
              Daftar Siswa & Kandidat Aktif ({filteredStudents.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live Database</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Tidak ada data siswa yang cocok dengan pencarian.
            </div>
          ) : (
            filteredStudents.map((st) => (
              <div
                key={st.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <img
                    src={
                      st.photoUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        st.name
                      )}&background=1b5a9f&color=fff&size=80`
                    }
                    alt={st.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm">{st.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#1b5a9f] text-white">
                        Level {st.level}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {st.cohort}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span>{st.targetProgram || "Program Jerman"}</span>
                      {st.targetCity && (
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin size={11} className="text-[#1b5a9f]" />
                          {st.targetCity}
                        </span>
                      )}
                      <span
                        className={`font-semibold ${
                          st.status === "placed"
                            ? "text-emerald-600"
                            : st.status === "ready"
                            ? "text-sky-600"
                            : "text-amber-600"
                        }`}
                      >
                        ● {st.status === "placed" ? "Di Jerman" : st.status === "ready" ? "Siap Berangkat" : "Aktif Belajar"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => openEditModal(st)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1b5a9f] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(st.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId !== null ? "Edit Profil Siswa" : "Tambah Siswa Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="Contoh: Siti Rahmawati"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1b5a9f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Level Bahasa Jerman</label>
                  <select
                    value={studentForm.level}
                    onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="A1">A1 (Grundstufe 1)</option>
                    <option value="A2">A2 (Grundstufe 2)</option>
                    <option value="B1">B1 (Mittelstufe 1)</option>
                    <option value="B2">B2 (Mittelstufe 2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Kesiapan</label>
                  <select
                    value={studentForm.status}
                    onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="training">Sedang Belajar Aktif</option>
                    <option value="ready">Siap Penempatan</option>
                    <option value="placed">Telah Berada di Jerman</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Angkatan / Cohort</label>
                  <input
                    type="text"
                    value={studentForm.cohort}
                    onChange={(e) => setStudentForm({ ...studentForm, cohort: e.target.value })}
                    placeholder="Cohort 2024-A"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Kota di Jerman</label>
                  <input
                    type="text"
                    value={studentForm.targetCity || ""}
                    onChange={(e) => setStudentForm({ ...studentForm, targetCity: e.target.value })}
                    placeholder="Frankfurt am Main"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Program ke Jerman</label>
                <input
                  type="text"
                  value={studentForm.targetProgram || ""}
                  onChange={(e) => setStudentForm({ ...studentForm, targetProgram: e.target.value })}
                  placeholder="Contoh: Ausbildung Keperawatan / Perhotelan / Au Pair"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Foto Profil Siswa</label>
                <ImageUploader
                  value={studentForm.photoUrl || ""}
                  onChange={(url) => setStudentForm({ ...studentForm, photoUrl: url })}
                  placeholder="https://images.unsplash.com/..."
                  label="Foto Siswa"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Biografi & Catatan Perkembangan</label>
                <textarea
                  rows={3}
                  value={studentForm.bio || ""}
                  onChange={(e) => setStudentForm({ ...studentForm, bio: e.target.value })}
                  placeholder="Tuliskan latar belakang pendidikan, capaian Goethe-Zertifikat, atau rencana karier..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Placement fields if placed */}
              {studentForm.status === "placed" && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="text-xs font-bold text-emerald-800">Detail Penempatan Kerja di Jerman</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nama Rumah Sakit / Hotel"
                      value={studentForm.placement?.companyName || ""}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          placement: {
                            companyName: e.target.value,
                            city: studentForm.placement?.city || studentForm.targetCity || "",
                            role: studentForm.placement?.role || "",
                          },
                        })
                      }
                      className="px-3 py-2 text-xs bg-white border border-emerald-200 rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="Posisi (contoh: Pflegefachfrau)"
                      value={studentForm.placement?.role || ""}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          placement: {
                            companyName: studentForm.placement?.companyName || "",
                            city: studentForm.placement?.city || studentForm.targetCity || "",
                            role: e.target.value,
                          },
                        })
                      }
                      className="px-3 py-2 text-xs bg-white border border-emerald-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveStudent}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl shadow-sm"
                >
                  Simpan Data Siswa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
