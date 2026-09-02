import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Check, X, ShieldCheck } from "lucide-react";

export default function PlacementsCms() {
  const { data, isLoading, isError } = useCmsSection("placements");
  const updateMutation = useUpdateCmsSection("placements");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepForm, setStepForm] = useState<any>({
    id: 0,
    number: "01",
    title: "",
    description: "",
    detail: "",
    tone: "butter",
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
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Penempatan"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan langkah penempatan ke standar awal?")) {
      resetMutation.mutate("placements", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  const openCreateModal = () => {
    const nextNum = (form.steps?.length || 0) + 1;
    setStepForm({
      id: Date.now(),
      number: `0${nextNum}`,
      title: "",
      description: "",
      detail: "",
      tone: "coral",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setStepForm({ ...item });
    setIsModalOpen(true);
  };

  const saveStepItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepForm.title.trim()) {
      alert("Judul langkah tidak boleh kosong.");
      return;
    }

    const steps = [...(form.steps || [])];
    const index = steps.findIndex((s: any) => s.id === stepForm.id);

    if (index >= 0) {
      steps[index] = { ...stepForm };
    } else {
      steps.push({ ...stepForm, id: stepForm.id || Date.now() });
    }

    const updatedForm = { ...form, steps };
    setForm(updatedForm);
    setIsModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteStepItem = (id: any) => {
    if (window.confirm("Hapus langkah penempatan ini?")) {
      const steps = (form.steps || []).filter((s: any) => s.id !== id);
      const updatedForm = { ...form, steps };
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
      title="Kelola Halaman Penempatan Berhasil"
      subtitle="Manajemen 4 pilar langkah penempatan siswa ke perusahaan Jerman, detail verifikasi, dan prinsip jangka panjang."
      publicHref="/penempatan-berhasil"
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
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Penempatan</h2>
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
          </div>
        </section>

        {/* STEPS LIST (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Langkah-Langkah</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Daftar Langkah Penempatan ({(form.steps || []).length} tahap)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Langkah
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {(form.steps || []).map((step: any, idx: number) => (
              <div
                key={step.id || idx}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#d35f46]">
                      {step.number || `0${idx + 1}`}
                    </span>
                    <h3 className="text-sm font-bold text-[#1f3b58]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#527290]">
                    {step.description}
                  </p>

                  {step.detail && (
                    <p className="text-[11px] text-[#7693af] bg-white p-2 rounded-lg border border-[#e8f0f6]">
                      <strong className="text-[#3a5d80]">Detail eksekusi:</strong> {step.detail}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eef4f8] w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(step)}
                    className="rounded-lg border border-[#d6e3ee] bg-white p-2 text-[#466584] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteStepItem(step.id)}
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

      {/* MODAL EDIT / CREATE STEP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Editor Langkah</SectionEyebrow>
                <h3 className="text-base sm:text-lg font-bold text-[#1f3b58]">
                  {stepForm.id && form.steps?.some((s: any) => s.id === stepForm.id)
                    ? "Edit Langkah Penempatan"
                    : "Tambah Langkah Penempatan"}
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

            <form onSubmit={saveStepItem} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nomor Urut *</label>
                  <input
                    type="text"
                    required
                    value={stepForm.number}
                    onChange={(e) => setStepForm({ ...stepForm, number: e.target.value })}
                    placeholder="01"
                    className="field-input mt-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Aksen Warna</label>
                  <select
                    value={stepForm.tone}
                    onChange={(e) => setStepForm({ ...stepForm, tone: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="butter">Butter (Kuning)</option>
                    <option value="coral">Coral (Merah)</option>
                    <option value="sea">Sea (Toska)</option>
                    <option value="ink">Ink (Hijau Tua)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul Langkah *</label>
                <input
                  type="text"
                  required
                  value={stepForm.title}
                  onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                  placeholder="e.g. Memahami kebutuhan"
                  className="field-input mt-1.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  required
                  value={stepForm.description}
                  onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Rincian & Detail Eksekusi</label>
                <textarea
                  rows={3}
                  value={stepForm.detail || ""}
                  onChange={(e) => setStepForm({ ...stepForm, detail: e.target.value })}
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
                  Simpan Langkah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
