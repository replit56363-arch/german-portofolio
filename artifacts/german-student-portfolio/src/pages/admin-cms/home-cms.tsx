import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Check, X, Sparkles } from "lucide-react";

export default function HomeCms() {
  const { data, isLoading, isError } = useCmsSection("home");
  const updateMutation = useUpdateCmsSection("home");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Modal / Inline edit for Stats
  const [editingStat, setEditingStat] = useState<any>(null);
  // Modal / Inline edit for Program Cards
  const [editingCard, setEditingCard] = useState<any>(null);
  // Modal / Inline edit for Process Steps
  const [editingStep, setEditingStep] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleFieldChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => {
        setSaved(true);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal menyimpan konten Halaman Utama");
      },
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan konten Halaman Utama ke pengaturan bawaan?")) {
      resetMutation.mutate("home", {
        onSuccess: () => {
          setSaved(true);
        },
      });
    }
  };

  // Stats CRUD
  const saveStatItem = (statItem: any) => {
    const list = [...(form.stats || [])];
    const index = list.findIndex((s: any) => s.id === statItem.id);
    if (index >= 0) {
      list[index] = statItem;
    } else {
      list.push({ ...statItem, id: Date.now() });
    }
    handleFieldChange("stats", list);
    setEditingStat(null);
  };

  const deleteStatItem = (id: any) => {
    const list = (form.stats || []).filter((s: any) => s.id !== id);
    handleFieldChange("stats", list);
  };

  // Program Cards CRUD
  const saveCardItem = (cardItem: any) => {
    const list = [...(form.programCards || [])];
    const index = list.findIndex((c: any) => c.id === cardItem.id);
    if (index >= 0) {
      list[index] = cardItem;
    } else {
      list.push({ ...cardItem, id: Date.now() });
    }
    handleFieldChange("programCards", list);
    setEditingCard(null);
  };

  const deleteCardItem = (id: any) => {
    const list = (form.programCards || []).filter((c: any) => c.id !== id);
    handleFieldChange("programCards", list);
  };

  // Process Steps CRUD
  const saveStepItem = (stepItem: any) => {
    const list = [...(form.processSteps || [])];
    const index = list.findIndex((s: any) => s.id === stepItem.id);
    if (index >= 0) {
      list[index] = stepItem;
    } else {
      list.push({ ...stepItem, id: Date.now() });
    }
    handleFieldChange("processSteps", list);
    setEditingStep(null);
  };

  const deleteStepItem = (id: any) => {
    const list = (form.processSteps || []).filter((s: any) => s.id !== id);
    handleFieldChange("processSteps", list);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-28 rounded-2xl shimmer" />
        <div className="h-96 rounded-2xl shimmer" />
      </div>
    );
  }

  if (isError || !form) {
    return (
      <div className="rounded-2xl border border-[#f1d0cb] bg-[#fff8f5] p-8 text-center text-[#ab594d]">
        <p className="font-bold">Gagal memuat data Halaman Utama.</p>
      </div>
    );
  }

  return (
    <CmsLayout
      title="Kelola Konten Halaman Utama (Beranda)"
      subtitle="Edit semua teks Hero, Statistik, Program Layanan, Alur Kerja, Testimoni, dan CTA di halaman depan."
      publicHref="/"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={handleReset}
      isResetting={resetMutation.isPending}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-6">
          {/* SECTION 1: HERO */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Bagian Atas</SectionEyebrow>
                <h2 className="text-lg font-bold text-[#233d59]">1. Hero Banner</h2>
              </div>
              <span className="font-mono text-xs text-[#829bb5]">Utama</span>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">
                  Eyebrow (Label Kecil di Atas Judul)
                </label>
                <input
                  type="text"
                  value={form.eyebrow || ""}
                  onChange={(e) => handleFieldChange("eyebrow", e.target.value)}
                  className="field-input mt-1.5"
                  placeholder="Contoh: Jembatan talenta Indonesia — Jerman"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">
                  Judul Utama Hero
                </label>
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="field-input mt-1.5 font-semibold text-[#1a334f]"
                  placeholder="Contoh: Orang yang tepat, jalan yang jelas."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">
                  Deskripsi Penjelas
                </label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="field-input mt-1.5"
                  placeholder="Deskripsi pengantar..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">
                    Teks Tombol CTA Utama
                  </label>
                  <input
                    type="text"
                    value={form.primaryCta || ""}
                    onChange={(e) => handleFieldChange("primaryCta", e.target.value)}
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">
                    Teks Tombol CTA Sekunder
                  </label>
                  <input
                    type="text"
                    value={form.secondaryCta || ""}
                    onChange={(e) => handleFieldChange("secondaryCta", e.target.value)}
                    className="field-input mt-1.5"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: STATISTIK HIGHLIGHTS (CRUD) */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Data & Fakta</SectionEyebrow>
                <h2 className="text-lg font-bold text-[#233d59]">2. Angka Statistik (CRUD)</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingStat({ id: Date.now(), number: `0${(form.stats?.length || 0) + 1}`, value: "", label: "", detail: "" })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ebf4fa] px-3 py-1.5 text-xs font-bold text-[#1b5a9f] hover:bg-[#d8eaf6]"
              >
                <Plus size={14} /> Tambah Statistik
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(form.stats || []).map((st: any, idx: number) => (
                <div key={st.id || idx} className="rounded-xl border border-[#e2ecf4] bg-[#f8fbfd] p-3.5 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#7192af]">{st.number || `0${idx + 1}`}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingStat({ ...st })}
                        className="rounded p-1 text-[#547392] hover:bg-white hover:text-[#1b5a9f]"
                        title="Edit statistik"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStatItem(st.id)}
                        className="rounded p-1 text-[#ab594d] hover:bg-white"
                        title="Hapus statistik"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 font-mono text-lg font-bold text-[#1e4875]">{st.value || "—"}</p>
                  <p className="text-xs font-semibold text-[#3b5976]">{st.label || "Label"}</p>
                  {st.detail && <p className="text-[11px] text-[#7893ad] mt-0.5">{st.detail}</p>}
                </div>
              ))}
            </div>

            {/* Editing Stat Form Modal / Box */}
            {editingStat && (
              <div className="mt-4 rounded-xl border border-[#bce0f5] bg-[#f0f8ff] p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1b5a9f]">Edit / Tambah Item Statistik</h4>
                  <button type="button" onClick={() => setEditingStat(null)} className="text-[#65839f] hover:text-black">
                    <X size={15} />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Nilai/Angka</label>
                    <input
                      type="text"
                      value={editingStat.value || ""}
                      onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                      placeholder="e.g. A1–B2"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Label Singkat</label>
                    <input
                      type="text"
                      value={editingStat.label || ""}
                      onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                      placeholder="e.g. Pelatihan terarah"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Nomor/Urutan</label>
                    <input
                      type="text"
                      value={editingStat.number || ""}
                      onChange={(e) => setEditingStat({ ...editingStat, number: e.target.value })}
                      placeholder="e.g. 01"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingStat(null)} className="px-3 py-1 text-xs font-semibold text-[#5a7795]">Batal</button>
                  <button type="button" onClick={() => saveStatItem(editingStat)} className="rounded-lg bg-[#1b5a9f] px-3 py-1.5 text-xs font-bold text-white">Simpan Statistik</button>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 3: KARTU LAYANAN / PROGRAM (CRUD) */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Fitur Utama</SectionEyebrow>
                <h2 className="text-lg font-bold text-[#233d59]">3. Kartu Layanan di Beranda (CRUD)</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingCard({ id: Date.now(), number: `0${(form.programCards?.length || 0) + 1}`, title: "", text: "", accent: "sea" })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ebf4fa] px-3 py-1.5 text-xs font-bold text-[#1b5a9f] hover:bg-[#d8eaf6]"
              >
                <Plus size={14} /> Tambah Kartu
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {(form.programCards || []).map((card: any, idx: number) => (
                <div key={card.id || idx} className="flex items-start justify-between rounded-xl border border-[#e2ecf4] bg-[#f8fbfd] p-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#7192af]">{card.number || `0${idx + 1}`}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#203c58]">{card.title}</h4>
                      <span className="rounded bg-[#e7f0f8] px-2 py-0.5 font-mono text-[10px] text-[#4d7195]">Warna: {card.accent || "sea"}</span>
                    </div>
                    <p className="text-xs text-[#637d97] line-clamp-2">{card.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-3">
                    <button
                      type="button"
                      onClick={() => setEditingCard({ ...card })}
                      className="rounded p-1.5 text-[#547392] hover:bg-white hover:text-[#1b5a9f]"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCardItem(card.id)}
                      className="rounded p-1.5 text-[#ab594d] hover:bg-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Editing Card Form */}
            {editingCard && (
              <div className="mt-4 rounded-xl border border-[#bce0f5] bg-[#f0f8ff] p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1b5a9f]">Edit / Tambah Kartu Layanan</h4>
                  <button type="button" onClick={() => setEditingCard(null)} className="text-[#65839f] hover:text-black">
                    <X size={15} />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Judul Kartu</label>
                    <input
                      type="text"
                      value={editingCard.title || ""}
                      onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                      placeholder="e.g. Rekrutmen di Indonesia"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Warna Aksen</label>
                    <select
                      value={editingCard.accent || "sea"}
                      onChange={(e) => setEditingCard({ ...editingCard, accent: e.target.value })}
                      className="field-input mt-1 bg-white"
                    >
                      <option value="sea">Sea (Hijau Toska)</option>
                      <option value="coral">Coral (Merah Bata)</option>
                      <option value="butter">Butter (Kuning Mustard)</option>
                      <option value="ink">Ink (Hijau Tua Pekat)</option>
                      <option value="lavender">Lavender (Ungu Lembut)</option>
                      <option value="sand">Sand (Krem Hangat)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#456380]">Deskripsi</label>
                    <textarea
                      rows={2}
                      value={editingCard.text || ""}
                      onChange={(e) => setEditingCard({ ...editingCard, text: e.target.value })}
                      className="field-input mt-1 bg-white"
                      placeholder="Penjelasan layanan..."
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingCard(null)} className="px-3 py-1 text-xs font-semibold text-[#5a7795]">Batal</button>
                  <button type="button" onClick={() => saveCardItem(editingCard)} className="rounded-lg bg-[#1b5a9f] px-3 py-1.5 text-xs font-bold text-white">Simpan Kartu</button>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: ALUR PROSES (CRUD) */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Tahapan</SectionEyebrow>
                <h2 className="text-lg font-bold text-[#233d59]">4. Alur Kerja (4 Langkah)</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingStep({ id: Date.now(), number: `0${(form.processSteps?.length || 0) + 1}`, title: "", text: "" })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ebf4fa] px-3 py-1.5 text-xs font-bold text-[#1b5a9f] hover:bg-[#d8eaf6]"
              >
                <Plus size={14} /> Tambah Alur
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {(form.processSteps || []).map((step: any, idx: number) => (
                <div key={step.id || idx} className="flex items-start justify-between rounded-xl border border-[#e2ecf4] bg-[#f8fbfd] p-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#d35f46]">{step.number || `0${idx + 1}`}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#203c58]">{step.title}</h4>
                    </div>
                    <p className="mt-1 text-xs text-[#637d97]">{step.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-3">
                    <button
                      type="button"
                      onClick={() => setEditingStep({ ...step })}
                      className="rounded p-1.5 text-[#547392] hover:bg-white hover:text-[#1b5a9f]"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteStepItem(step.id)}
                      className="rounded p-1.5 text-[#ab594d] hover:bg-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Editing Step Form */}
            {editingStep && (
              <div className="mt-4 rounded-xl border border-[#bce0f5] bg-[#f0f8ff] p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1b5a9f]">Edit / Tambah Tahap Alur</h4>
                  <button type="button" onClick={() => setEditingStep(null)} className="text-[#65839f] hover:text-black">
                    <X size={15} />
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Judul Tahap</label>
                    <input
                      type="text"
                      value={editingStep.title || ""}
                      onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                      placeholder="e.g. Mendengar kebutuhan"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#456380]">Nomor Urut</label>
                    <input
                      type="text"
                      value={editingStep.number || ""}
                      onChange={(e) => setEditingStep({ ...editingStep, number: e.target.value })}
                      placeholder="e.g. 01"
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#456380]">Deskripsi</label>
                    <textarea
                      rows={2}
                      value={editingStep.text || ""}
                      onChange={(e) => setEditingStep({ ...editingStep, text: e.target.value })}
                      className="field-input mt-1 bg-white"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingStep(null)} className="px-3 py-1 text-xs font-semibold text-[#5a7795]">Batal</button>
                  <button type="button" onClick={() => saveStepItem(editingStep)} className="rounded-lg bg-[#1b5a9f] px-3 py-1.5 text-xs font-bold text-white">Simpan Tahap</button>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 5: TESTIMONI & CTA BAWAH */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Penutup</SectionEyebrow>
                <h2 className="text-lg font-bold text-[#233d59]">5. Testimoni & CTA Bawah</h2>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Kutipan Testimoni</label>
                <textarea
                  rows={2}
                  value={form.quoteText || ""}
                  onChange={(e) => handleFieldChange("quoteText", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Nama & Asal Penutur</label>
                <input
                  type="text"
                  value={form.quoteAuthor || ""}
                  onChange={(e) => handleFieldChange("quoteAuthor", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul CTA Banner Bawah</label>
                <input
                  type="text"
                  value={form.ctaTitle || ""}
                  onChange={(e) => handleFieldChange("ctaTitle", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Deskripsi CTA Banner</label>
                <textarea
                  rows={2}
                  value={form.ctaSubtitle || ""}
                  onChange={(e) => handleFieldChange("ctaSubtitle", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={form.ctaButtonText || ""}
                    onChange={(e) => handleFieldChange("ctaButtonText", e.target.value)}
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Link URL Tombol</label>
                  <input
                    type="text"
                    value={form.ctaButtonHref || ""}
                    onChange={(e) => handleFieldChange("ctaButtonHref", e.target.value)}
                    className="field-input mt-1.5"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* PRATINJAU LIVE PANEL */}
        <aside className="sticky top-24 rounded-2xl border border-[#1b3d63] bg-[#142c4b] p-6 text-[#f2f8fc] shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2d4d73] pb-4">
            <div>
              <SectionEyebrow>Pratinjau Langsung</SectionEyebrow>
              <h3 className="text-base font-bold text-white">Tampilan Beranda</h3>
            </div>
            <Sparkles className="text-[#6ad7ef]" size={18} />
          </div>

          <div className="mt-5 space-y-4 text-xs">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6ad7ef]">{form.eyebrow || "Eyebrow"}</p>
              <h4 className="mt-1 text-lg font-bold text-white leading-tight">{form.title || "Judul Utama"}</h4>
              <p className="mt-2 text-[#9bb3ce] line-clamp-3 leading-relaxed">{form.description || "Deskripsi..."}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-lg bg-[#f5be65] px-2.5 py-1 text-[11px] font-bold text-[#142b4e]">
                {form.primaryCta || "CTA Utama"}
              </span>
              <span className="rounded-lg border border-[#436791] px-2.5 py-1 text-[11px] font-semibold text-[#d6e7f8]">
                {form.secondaryCta || "CTA Sekunder"}
              </span>
            </div>

            <div className="border-t border-[#2d4d73] pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7e9bbd]">Statistik Aktif ({form.stats?.length || 0})</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(form.stats || []).map((s: any, idx: number) => (
                  <div key={idx} className="rounded bg-[#1c385d] p-2">
                    <p className="font-mono text-sm font-bold text-[#f5be65]">{s.value}</p>
                    <p className="text-[10px] text-[#9cb6d4] truncate">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#2d4d73] pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7e9bbd]">Kutipan Testimoni</p>
              <blockquote className="mt-1 text-xs italic text-[#d4e4f5]">"{form.quoteText || "Kutipan..."}"</blockquote>
              <p className="mt-1 font-mono text-[10px] text-[#86a3c4]">— {form.quoteAuthor}</p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="w-full rounded-xl bg-[#6ad7ef] py-3 text-xs font-bold text-[#102744] hover:bg-[#58c6de] disabled:opacity-60"
              >
                {updateMutation.isPending ? "Menyimpan Perubahan..." : "Simpan Semua Perubahan"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </CmsLayout>
  );
}
