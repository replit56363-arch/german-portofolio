import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { ImageUploader } from "@/components/image-uploader";
import {
  Plus,
  Trash2,
  Edit2,
  SlidersHorizontal,
  X,
  ExternalLink,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Eye,
  EyeOff,
  Building2,
  Globe,
  Tag,
  Layers,
  Play,
  RotateCcw,
} from "lucide-react";
import type { LogoItem, LogoSliderData } from "@/components/infinite-logo-slider";

export default function LogosCms() {
  const { data, isLoading } = useCmsSection<LogoSliderData>("logos");
  const updateMutation = useUpdateCmsSection("logos");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<LogoSliderData>({
    sectionLabel: "Dipercaya untuk membuka jalan oleh",
    sectionTitle: "Jaringan Klien, Partner & Rekanan Resmi",
    speedSeconds: 28,
    pauseOnHover: true,
    showNames: true,
    items: [],
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Modal State for adding/editing a logo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState<LogoItem>({
    id: "",
    name: "",
    category: "Mitra Jerman",
    imageUrl: "",
    linkUrl: "",
    active: true,
    order: 1,
  });

  useEffect(() => {
    if (data) {
      setForm({
        sectionLabel: data.sectionLabel ?? "Dipercaya untuk membuka jalan oleh",
        sectionTitle: data.sectionTitle ?? "Jaringan Klien, Partner & Rekanan Resmi",
        speedSeconds: data.speedSeconds ?? 28,
        pauseOnHover: data.pauseOnHover ?? true,
        showNames: data.showNames ?? true,
        items: data.items ?? [],
      });
    }
  }, [data]);

  const handleFieldChange = (key: keyof LogoSliderData, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Logo Slider"),
    });
  };

  const handleReset = () => {
    resetMutation.mutate("logos", {
      onSuccess: (res: any) => {
        if (res?.data) {
          setForm(res.data);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan pengaturan bawaan");
        setShowResetConfirm(false);
      },
    });
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setItemForm({
      id: `logo-${Date.now()}`,
      name: "",
      category: "Perusahaan Jerman",
      imageUrl: "",
      linkUrl: "",
      active: true,
      order: (form.items?.length || 0) + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setItemForm({ ...form.items![index] });
    setIsModalOpen(true);
  };

  const saveModalItem = () => {
    if (!itemForm.name.trim()) {
      alert("Nama partner/klien wajib diisi");
      return;
    }

    const currentItems = [...(form.items || [])];
    if (editingIndex !== null) {
      currentItems[editingIndex] = itemForm;
    } else {
      currentItems.push(itemForm);
    }

    // Re-index orders
    const reordered = currentItems.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    const updated = { ...form, items: reordered };
    setForm(updated);
    setIsModalOpen(false);

    // Auto save to server
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
  };

  const confirmDeleteItem = () => {
    if (deleteIndex === null) return;
    const currentItems = [...(form.items || [])];
    currentItems.splice(deleteIndex, 1);
    const reordered = currentItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    const updated = { ...form, items: reordered };
    setForm(updated);
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
    setDeleteIndex(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const currentItems = [...(form.items || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentItems.length) return;

    const temp = currentItems[index];
    currentItems[index] = currentItems[targetIndex];
    currentItems[targetIndex] = temp;

    const reordered = currentItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    const updated = { ...form, items: reordered };
    setForm(updated);
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
  };

  const toggleItemActive = (index: number) => {
    const currentItems = [...(form.items || [])];
    currentItems[index] = {
      ...currentItems[index],
      active: currentItems[index].active === false ? true : false,
    };
    const updated = { ...form, items: currentItems };
    setForm(updated);
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-28 rounded-2xl shimmer" />
        <div className="h-96 rounded-2xl shimmer" />
      </div>
    );
  }

  const activeItemsCount = form.items?.filter((i) => i.active !== false).length || 0;

  return (
    <CmsLayout
      title="Kelola Logo Slider (Partner & Klien)"
      subtitle="Atur deretan logo mitra, universitas, rumah sakit, dan sponsor yang bergerak otomatis secara terus-menerus (Infinite Logo Slider) pada halaman utama."
      publicHref="/"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-7">
        {/* STATS & QUICK ACTIONS BAR */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#dce7ef] bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6885a0]">Total Logo</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#173d3a]">{form.items?.length || 0}</span>
              <span className="text-xs text-[#52756b]">({activeItemsCount} aktif tayang)</span>
            </div>
          </div>
          <div className="rounded-2xl border border-[#dce7ef] bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6885a0]">Kecepatan Slider</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#1b5a9f]">{form.speedSeconds || 28}s</span>
              <span className="text-xs text-[#63809e]">(Loop tak terbatas)</span>
            </div>
          </div>
          <div className="rounded-2xl border border-[#dce7ef] bg-[#f9fdfa] p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#315c54]">Upload Langsung</span>
            <button
              type="button"
              onClick={openAddModal}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154982] transition-colors"
            >
              <Plus size={16} /> Tambah Logo Baru
            </button>
          </div>
        </div>

        {/* LIVE PREVIEW OF INFINITE SLIDER */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#edf3f8] pb-4">
            <div>
              <SectionEyebrow>Live Pratinjau</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#1e3853] flex items-center gap-2">
                <Play size={16} className="text-[#1b5a9f]" /> Pratinjau Infinite Logo Slider di Website
              </h2>
            </div>
            <span className="text-xs font-mono-ui text-[#52756b] bg-[#e7f0e9] px-2.5 py-1 rounded-full font-bold">
              Bergerak Otomatis
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-[#173d3a]/15 bg-[#e7f0e9]/95 p-4 overflow-hidden relative">
            <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.18em] text-[#4d6d64] mb-3">
              {form.sectionLabel || "Dipercaya untuk membuka jalan oleh"}
            </p>

            {/* Slider track simulation */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {(form.items?.filter((i) => i.active !== false) || []).map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-[#173d3a]/10 bg-white px-3.5 py-2 shadow-xs shrink-0"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-7 w-auto max-w-[100px] object-contain"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded bg-[#e7f0e9] flex items-center justify-center text-[#173d3a]">
                      <Building2 size={14} />
                    </div>
                  )}
                  {form.showNames && (
                    <div>
                      <p className="text-xs font-semibold text-[#173d3a] whitespace-nowrap">{item.name}</p>
                      {item.category && (
                        <p className="text-[8px] font-mono-ui uppercase text-[#52756b]">{item.category}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {(!form.items || form.items.filter((i) => i.active !== false).length === 0) && (
                <p className="text-xs text-[#718c83] italic py-2">Belum ada logo aktif untuk ditampilkan.</p>
              )}
            </div>
          </div>
        </section>

        {/* SETTINGS SECTION */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-xs">
          <div className="border-b border-[#edf3f8] pb-4">
            <SectionEyebrow>Konfigurasi Slider</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#1e3853] flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#1b5a9f]" /> Pengaturan Teks & Kecepatan Gerak
            </h2>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#47637d]">Label Eyebrow (Teks Kecil di Atas)</label>
              <input
                type="text"
                value={form.sectionLabel || ""}
                onChange={(e) => handleFieldChange("sectionLabel", e.target.value)}
                placeholder="Dipercaya untuk membuka jalan oleh"
                className="mt-1.5 w-full rounded-xl border border-[#cedfe9] px-3.5 py-2 text-xs font-medium text-[#203a55] focus:border-[#1b5a9f] focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-[#718c83]">
                Teks label kecil di bagian atas deretan logo (contoh: TRUSTED TO LEAD THE WAY BY).
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#47637d]">Judul / Subtitle Opsional</label>
              <input
                type="text"
                value={form.sectionTitle || ""}
                onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
                placeholder="Jaringan Klien, Partner & Rekanan Resmi"
                className="mt-1.5 w-full rounded-xl border border-[#cedfe9] px-3.5 py-2 text-xs font-medium text-[#203a55] focus:border-[#1b5a9f] focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-[#718c83]">
                Keterangan tambahan di sisi kanan header slider.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#47637d]">
                Kecepatan Loop: {form.speedSeconds || 28} Detik
              </label>
              <input
                type="range"
                min="12"
                max="60"
                step="2"
                value={form.speedSeconds || 28}
                onChange={(e) => handleFieldChange("speedSeconds", Number(e.target.value))}
                className="mt-2.5 w-full accent-[#1b5a9f]"
              />
              <div className="flex justify-between text-[10px] text-[#718c83]">
                <span>12s (Cepat)</span>
                <span>28s (Standar Lembut)</span>
                <span>60s (Lambat Halus)</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#47637d]">Perilaku & Tampilan</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pauseOnHover !== false}
                  onChange={(e) => handleFieldChange("pauseOnHover", e.target.checked)}
                  className="h-4 w-4 rounded accent-[#1b5a9f]"
                />
                <span className="text-xs font-semibold text-[#2f4963]">
                  Berhenti sementara saat kursor diarahkan (Pause on Hover)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showNames !== false}
                  onChange={(e) => handleFieldChange("showNames", e.target.checked)}
                  className="h-4 w-4 rounded accent-[#1b5a9f]"
                />
                <span className="text-xs font-semibold text-[#2f4963]">
                  Tampilkan nama & kategori di samping logo
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* LOGO ITEMS LIST SECTION */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#edf3f8] pb-4">
            <div>
              <SectionEyebrow>Daftar Logo ({form.items?.length || 0})</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#1e3853] flex items-center gap-2">
                <Building2 size={18} className="text-[#1b5a9f]" /> Kelola Logo Klien, Partner & Sponsor
              </h2>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#144880] transition-colors"
            >
              <Plus size={15} /> Upload & Tambah Logo
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {(!form.items || form.items.length === 0) && (
              <div className="rounded-2xl border-2 border-dashed border-[#dce7ef] p-10 text-center">
                <Building2 size={32} className="mx-auto text-[#9fb8cb]" />
                <h3 className="mt-2 text-sm font-bold text-[#203a55]">Belum ada logo terdaftar</h3>
                <p className="mt-1 text-xs text-[#6e889f]">
                  Klik tombol &quot;Upload &amp; Tambah Logo&quot; di atas untuk mengunggah logo partner dari perangkat Anda.
                </p>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1b5a9f] px-4 py-2 text-xs font-bold text-white"
                >
                  <Plus size={14} /> Upload Sekarang
                </button>
              </div>
            )}

            {form.items?.map((item, index) => {
              const isActive = item.active !== false;
              return (
                <div
                  key={item.id || index}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                    isActive
                      ? "border-[#d8e6ef] bg-white hover:border-[#b4d2e7] hover:shadow-xs"
                      : "border-[#e5ebf0] bg-[#fafbfc] opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf4f9] text-xs font-mono font-bold text-[#4c6a85]">
                      {index + 1}
                    </span>

                    {/* Logo Image Preview Thumbnail */}
                    <div className="flex h-12 w-28 shrink-0 items-center justify-center rounded-xl border border-[#e1ecf4] bg-[#fbfdfd] p-1.5 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="text-[10px] text-[#8fa7bb] italic text-center">Tanpa Logo</div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-['Fraunces'] text-sm sm:text-base font-semibold text-[#173d3a] truncate">
                          {item.name}
                        </h4>
                        {item.category && (
                          <span className="rounded-full bg-[#e7f0e9] px-2 py-0.5 font-mono-ui text-[9px] font-bold text-[#315c54]">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-[#6e889f]">
                        {item.linkUrl ? (
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[#1b5a9f] hover:underline text-[11px]"
                          >
                            <Globe size={11} /> {item.linkUrl}
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#9fb3c4]">Tidak ada tautan</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0}
                      className="rounded-lg p-1.5 text-[#5e7c99] hover:bg-[#edf5fb] hover:text-[#1b5a9f] disabled:opacity-30"
                      title="Geser ke atas"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === form.items!.length - 1}
                      className="rounded-lg p-1.5 text-[#5e7c99] hover:bg-[#edf5fb] hover:text-[#1b5a9f] disabled:opacity-30"
                      title="Geser ke bawah"
                    >
                      <ArrowDown size={15} />
                    </button>

                    {/* Active Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleItemActive(index)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isActive
                          ? "text-[#1e6a3d] hover:bg-[#edf8f1]"
                          : "text-[#8fa7bb] hover:bg-[#f1f5f8]"
                      }`}
                      title={isActive ? "Nonaktifkan logo ini" : "Aktifkan logo ini"}
                    >
                      {isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => openEditModal(index)}
                      className="inline-flex items-center gap-1 rounded-xl border border-[#d6e5ef] bg-white px-3 py-1.5 text-xs font-bold text-[#345370] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                    >
                      <Edit2 size={13} /> Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setDeleteIndex(index)}
                      className="rounded-xl border border-[#eed7d4] bg-[#fffbfb] p-1.5 text-[#b94a3b] hover:bg-[#fae8e6]"
                      title="Hapus logo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* MODAL: ADD / EDIT LOGO WITH DEVICE IMAGE UPLOADER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#d8e6ef] bg-white p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf3f8] pb-4">
              <div>
                <SectionEyebrow>
                  {editingIndex !== null ? "Edit Data Logo" : "Upload Logo Baru"}
                </SectionEyebrow>
                <h3 className="text-lg font-bold text-[#1e3853]">
                  {editingIndex !== null ? "Perbarui Logo Partner" : "Unggah Logo dari Perangkat"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-[#7e99b0] hover:bg-[#edf4f9] hover:text-[#1e3853]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* IMAGE UPLOADER FROM DEVICE */}
              <div>
                <ImageUploader
                  label="Upload File Logo (PNG, SVG, JPG, WebP dari Komputer/HP)"
                  helpText="Unggah langsung file logo dari perangkat Anda. Sistem akan mengoptimalkan resolusi dan format logo secara otomatis."
                  value={itemForm.imageUrl}
                  onChange={(url) => setItemForm((prev) => ({ ...prev, imageUrl: url }))}
                  aspectRatio="banner"
                  maxDimension={800}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#35526d]">Nama Klien / Partner / Sponsor *</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Universitas Negeri Medan / AWO Bundesverband"
                  className="mt-1.5 w-full rounded-xl border border-[#cedfe9] px-3.5 py-2.5 text-xs font-medium text-[#203a55] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#35526d]">Kategori / Label Tag</label>
                  <input
                    type="text"
                    value={itemForm.category || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Contoh: Universitas / Rumah Sakit / Hotel"
                    className="mt-1.5 w-full rounded-xl border border-[#cedfe9] px-3.5 py-2 text-xs font-medium text-[#203a55] focus:border-[#1b5a9f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#35526d]">Website / Tautan URL (Opsional)</label>
                  <input
                    type="url"
                    value={itemForm.linkUrl || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, linkUrl: e.target.value }))}
                    placeholder="https://..."
                    className="mt-1.5 w-full rounded-xl border border-[#cedfe9] px-3.5 py-2 text-xs font-medium text-[#203a55] focus:border-[#1b5a9f] focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={itemForm.active !== false}
                  onChange={(e) => setItemForm((prev) => ({ ...prev, active: e.target.checked }))}
                  className="h-4 w-4 rounded accent-[#1b5a9f]"
                />
                <span className="text-xs font-semibold text-[#203a55]">
                  Tampilkan logo ini di slider beranda (Aktif)
                </span>
              </label>
            </div>

            <div className="mt-7 flex items-center justify-end gap-3 border-t border-[#edf3f8] pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-[#d6e5ef] bg-white px-4 py-2.5 text-xs font-bold text-[#516f8a] hover:bg-[#edf5fb]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={saveModalItem}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#144880]"
              >
                <CheckCircle2 size={15} /> Simpan Logo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteIndex !== null}
        title="Hapus Logo Partner?"
        description="Apakah Anda yakin ingin menghapus logo ini dari Infinite Logo Slider? Tindakan ini dapat dibatalkan melalui reset bawaan."
        confirmLabel="Ya, Hapus Logo"
        cancelLabel="Batal"
        isDanger
        onConfirm={confirmDeleteItem}
        onCancel={() => setDeleteIndex(null)}
      />

      {/* CONFIRM RESET DIALOG */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Logo Slider ke Standar Bawaan?"
        description="Pengaturan dan seluruh logo akan dikembalikan ke data awal sistem (UNIMED, Alumni 2020, Mitra Jerman, Gastronomi & Pflege, Goethe, AWO, Helios, Steigenberger)."
        confirmLabel="Ya, Kembalikan ke Awal"
        cancelLabel="Batal"
        isDanger
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </CmsLayout>
  );
}
