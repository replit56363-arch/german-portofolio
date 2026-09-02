import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Sparkles, X, ArrowUpDown } from "lucide-react";

export default function ServicesCms() {
  const { data, isLoading, isError } = useCmsSection("services");
  const updateMutation = useUpdateCmsSection("services");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Modal for Service Stage CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stageForm, setStageForm] = useState<any>({
    id: 0,
    number: "01",
    title: "",
    shortTitle: "",
    description: "",
    detail: "",
    tone: "coral",
    iconName: "UsersRound",
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
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Layanan"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan alur layanan ke standar awal?")) {
      resetMutation.mutate("services", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  const openCreateModal = () => {
    const nextNum = (form.stages?.length || 0) + 1;
    setStageForm({
      id: Date.now(),
      number: `0${nextNum}`,
      title: "",
      shortTitle: "Kami membantu",
      description: "",
      detail: "",
      tone: "coral",
      iconName: "UsersRound",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setStageForm({ ...item });
    setIsModalOpen(true);
  };

  const saveStageItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageForm.title.trim()) {
      alert("Judul tahap tidak boleh kosong.");
      return;
    }

    const stages = [...(form.stages || [])];
    const index = stages.findIndex((s: any) => s.id === stageForm.id);

    if (index >= 0) {
      stages[index] = { ...stageForm };
    } else {
      stages.push({ ...stageForm, id: stageForm.id || Date.now() });
    }

    const updatedForm = { ...form, stages };
    setForm(updatedForm);
    setIsModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteStageItem = (id: any) => {
    if (window.confirm("Hapus tahapan alur layanan ini?")) {
      const stages = (form.stages || []).filter((s: any) => s.id !== id);
      const updatedForm = { ...form, stages };
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
      title="Kelola Halaman Layanan (Alur Kerja 7 Tahap)"
      subtitle="Manajemen tahapan proses rekrutmen hingga kedatangan di Jerman, benefit kemitraan, dan penjelasan transisi Ausbildung."
      publicHref="/layanan"
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
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Layanan</h2>
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
              <label className="block text-xs font-bold text-[#45627c]">Deskripsi Pengantar Layanan</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* WORKFLOW STAGES (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Alur Layanan Interaktif</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Tahapan Alur Kerja ({(form.stages || []).length} tahap)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Tahap Alur
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {(form.stages || []).map((stage: any, idx: number) => (
              <div
                key={stage.id || idx}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#d35f46]">
                      {stage.number || `0${idx + 1}`}
                    </span>
                    <span className="rounded bg-[#e8f1f8] px-2 py-0.5 text-[10px] font-bold text-[#35587d]">
                      {stage.shortTitle || "Tahap"}
                    </span>
                    <h3 className="text-sm font-bold text-[#1f3b58]">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#527290]">
                    {stage.description}
                  </p>

                  {stage.detail && (
                    <p className="text-[11px] text-[#7693af] bg-white p-2 rounded-lg border border-[#e8f0f6]">
                      <strong className="text-[#3a5d80]">Detail eksekusi:</strong> {stage.detail}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eef4f8] w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(stage)}
                    className="rounded-lg border border-[#d6e3ee] bg-white p-2 text-[#466584] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteStageItem(stage.id)}
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

      {/* MODAL EDIT / CREATE STAGE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Editor Tahapan</SectionEyebrow>
                <h3 className="text-base sm:text-lg font-bold text-[#1f3b58]">
                  {stageForm.id && form.stages?.some((s: any) => s.id === stageForm.id)
                    ? "Edit Tahapan Layanan"
                    : "Tambah Tahapan Layanan"}
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

            <form onSubmit={saveStageItem} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nomor Urut *</label>
                  <input
                    type="text"
                    required
                    value={stageForm.number}
                    onChange={(e) => setStageForm({ ...stageForm, number: e.target.value })}
                    placeholder="01"
                    className="field-input mt-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Label Ringkas</label>
                  <input
                    type="text"
                    value={stageForm.shortTitle}
                    onChange={(e) => setStageForm({ ...stageForm, shortTitle: e.target.value })}
                    placeholder="Kami menemukan"
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Aksen Warna</label>
                  <select
                    value={stageForm.tone}
                    onChange={(e) => setStageForm({ ...stageForm, tone: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="coral">Coral (Merah)</option>
                    <option value="sea">Sea (Toska)</option>
                    <option value="butter">Butter (Kuning)</option>
                    <option value="ink">Ink (Hijau Tua)</option>
                    <option value="lavender">Lavender (Ungu)</option>
                    <option value="sand">Sand (Krem)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul Lengkap Tahap *</label>
                <input
                  type="text"
                  required
                  value={stageForm.title}
                  onChange={(e) => setStageForm({ ...stageForm, title: e.target.value })}
                  placeholder="e.g. Rekrutmen di lokasi"
                  className="field-input mt-1.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  required
                  value={stageForm.description}
                  onChange={(e) => setStageForm({ ...stageForm, description: e.target.value })}
                  placeholder="Penjelasan tahapan yang tampil di kartu utama..."
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Rincian & Detail Proses</label>
                <textarea
                  rows={3}
                  value={stageForm.detail || ""}
                  onChange={(e) => setStageForm({ ...stageForm, detail: e.target.value })}
                  placeholder="Detail operasional yang tampil saat kartu dipilih..."
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
                  Simpan Tahap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
