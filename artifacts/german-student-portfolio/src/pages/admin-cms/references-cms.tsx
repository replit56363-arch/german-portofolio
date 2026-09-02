import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Trophy, Sparkles, X } from "lucide-react";

export default function ReferencesCms() {
  const { data, isLoading, isError } = useCmsSection("references");
  const updateMutation = useUpdateCmsSection("references");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyForm, setStoryForm] = useState<any>({
    id: "",
    eyebrow: "",
    title: "",
    description: "",
    result: "1.",
    resultLabel: "Juara",
    personName: "",
    company: "",
    year: "2024",
    tone: "butter",
    published: true,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleHeaderChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => setSaved(true),
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Referensi"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan cerita referensi ke standar awal?")) {
      resetMutation.mutate("references", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  const openCreateModal = () => {
    setStoryForm({
      id: `story-${Date.now()}`,
      eyebrow: "Berhasil di tahun ketiga Ausbildung",
      title: "",
      description: "",
      result: "1.",
      resultLabel: "Juara Kompetisi",
      personName: "",
      company: "Mitra Ausbildung di Jerman",
      year: new Date().getFullYear().toString(),
      tone: "butter",
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setStoryForm({ ...item });
    setIsModalOpen(true);
  };

  const saveStoryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.title.trim()) {
      alert("Judul cerita prestasi tidak boleh kosong.");
      return;
    }

    const stories = [...(form.stories || [])];
    const index = stories.findIndex((s: any) => s.id === storyForm.id);

    if (index >= 0) {
      stories[index] = { ...storyForm };
    } else {
      stories.push({ ...storyForm, id: storyForm.id || `story-${Date.now()}` });
    }

    const updatedForm = { ...form, stories };
    setForm(updatedForm);
    setIsModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteStoryItem = (id: any) => {
    if (window.confirm("Hapus cerita referensi ini?")) {
      const stories = (form.stories || []).filter((s: any) => s.id !== id);
      const updatedForm = { ...form, stories };
      setForm(updatedForm);
      updateMutation.mutate(updatedForm, {
        onSuccess: () => setSaved(true),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-28 rounded-2xl shimmer" />
        <div className="h-96 rounded-2xl shimmer" />
      </div>
    );
  }

  return (
    <CmsLayout
      title="Kelola Halaman Referensi & Keberhasilan"
      subtitle="Manajemen kisah sukses peserta Ausbildung, juara kompetisi di Jerman, testimoni lulusan, dan quote inspiratif."
      publicHref="/referensi"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={handleReset}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="border-b border-[#eef4f8] pb-4">
            <SectionEyebrow>Tampilan Halaman</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#233d59]">Header & Kutipan Referensi</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Eyebrow</label>
              <input
                type="text"
                value={form.headerEyebrow || ""}
                onChange={(e) => handleHeaderChange("headerEyebrow", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Judul Utama</label>
              <input
                type="text"
                value={form.headerTitle || ""}
                onChange={(e) => handleHeaderChange("headerTitle", e.target.value)}
                className="field-input mt-1.5 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Deskripsi Pengantar</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Kutipan Inspirasi Utama</label>
              <textarea
                rows={2}
                value={form.quoteText || ""}
                onChange={(e) => handleHeaderChange("quoteText", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* STORIES LIST (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Kisah Nyata</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Daftar Kisah Keberhasilan ({(form.stories || []).length} cerita)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Kisah Prestasi
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {(form.stories || []).map((story: any) => (
              <div
                key={story.id}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#fdf2d8] px-2 py-0.5 font-mono text-xs font-bold text-[#865910]">
                      {story.result} {story.resultLabel}
                    </span>
                    <span className="rounded bg-[#e8f1f8] px-2 py-0.5 font-mono text-[10px] text-[#3c6185]">
                      {story.year}
                    </span>
                    <span className="text-xs font-bold text-[#1f3b58]">
                      {story.personName}
                    </span>
                    <span className="text-xs text-[#718da7]">
                      ({story.company})
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1f3b58]">
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#597896]">
                    {story.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eef4f8] w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(story)}
                    className="rounded-lg border border-[#d6e3ee] bg-white p-2 text-[#466584] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteStoryItem(story.id)}
                    className="rounded-lg border border-[#f2d7d3] bg-[#fffbf9] p-2 text-[#ab594d] hover:bg-[#faebe8]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL EDIT / CREATE STORY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Editor Kisah Prestasi</SectionEyebrow>
                <h3 className="text-base sm:text-lg font-bold text-[#1f3b58]">
                  {storyForm.id && form.stories?.some((s: any) => s.id === storyForm.id)
                    ? "Edit Kisah Keberhasilan"
                    : "Tambah Kisah Keberhasilan Baru"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-[#6c87a1] hover:bg-[#edf4fa]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveStoryItem} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nama Siswa / Peserta *</label>
                  <input
                    type="text"
                    required
                    value={storyForm.personName}
                    onChange={(e) => setStoryForm({ ...storyForm, personName: e.target.value })}
                    placeholder="Catharine Magdalena"
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Perusahaan / Tempat Ausbildung</label>
                  <input
                    type="text"
                    value={storyForm.company}
                    onChange={(e) => setStoryForm({ ...storyForm, company: e.target.value })}
                    placeholder="Hotel Höpke, Bad Laer"
                    className="field-input mt-1.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul Cerita Prestasi *</label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  placeholder="Juara pertama kompetisi memasak tingkat muda"
                  className="field-input mt-1.5 font-bold"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nilai / Badge Hasil</label>
                  <input
                    type="text"
                    value={storyForm.result}
                    onChange={(e) => setStoryForm({ ...storyForm, result: e.target.value })}
                    placeholder="1."
                    className="field-input mt-1.5 font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Label Hasil</label>
                  <input
                    type="text"
                    value={storyForm.resultLabel}
                    onChange={(e) => setStoryForm({ ...storyForm, resultLabel: e.target.value })}
                    placeholder="Juara muda memasak"
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Tahun Pencapaian</label>
                  <input
                    type="text"
                    value={storyForm.year}
                    onChange={(e) => setStoryForm({ ...storyForm, year: e.target.value })}
                    placeholder="2024"
                    className="field-input mt-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Deskripsi Lengkap Kisah</label>
                <textarea
                  rows={4}
                  required
                  value={storyForm.description}
                  onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                  placeholder="Ceritakan latar belakang, perjuangan, dan hasil pencapaiannya..."
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2.5 border-t border-[#eef4f8] pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#d6e3ee] bg-white px-4 py-2.5 text-xs font-semibold text-[#55728f] hover:bg-[#edf5fb]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1b5a9f] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#154b85]"
                >
                  Simpan Kisah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
