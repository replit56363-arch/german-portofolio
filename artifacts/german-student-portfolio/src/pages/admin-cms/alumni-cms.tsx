import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  X,
  MapPin,
  Building2,
  Quote,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";

export default function AlumniCms() {
  const { data, isLoading } = useCmsSection("alumni");
  const updateMutation = useUpdateCmsSection("alumni");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState<any>({
    id: Date.now(),
    name: "",
    program: "Ausbildung Keperawatan (Pflegefachfrau)",
    category: "Ausbildung",
    year: new Date().getFullYear().toString(),
    city: "Frankfurt am Main",
    workplace: "Universitätsklinikum Frankfurt",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
    quote: "Belajar di ILD Medan dari nol hingga lulus B2 dan diterima di Jerman.",
    fullStory: "",
    verified: true,
    featured: true,
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
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Alumni"),
    });
  };

  const handleReset = () => {
    resetMutation.mutate("alumni", {
      onSuccess: (res: any) => {
        if (res?.data) {
          setForm(res.data);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan pengaturan alumni");
        setShowResetConfirm(false);
      },
    });
  };

  const confirmDeleteItem = () => {
    if (deleteItemIndex === null) return;
    const currentItems = [...(form.items || [])];
    currentItems.splice(deleteItemIndex, 1);
    const updated = { ...form, items: currentItems };
    setForm(updated);
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
    setDeleteItemIndex(null);
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setItemForm({
      id: Date.now(),
      name: "",
      program: "Ausbildung Keperawatan",
      category: "Ausbildung",
      year: new Date().getFullYear().toString(),
      city: "Frankfurt am Main",
      workplace: "",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
      quote: "",
      fullStory: "",
      verified: true,
      featured: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any, index: number) => {
    setEditingIndex(index);
    setItemForm({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!itemForm.name.trim()) {
      setError("Nama alumni wajib diisi!");
      return;
    }

    const currentItems = [...(form.items || [])];
    if (editingIndex !== null) {
      currentItems[editingIndex] = itemForm;
    } else {
      currentItems.unshift(itemForm);
    }

    const updated = { ...form, items: currentItems };
    setForm(updated);
    setIsModalOpen(false);
    setSaved(false);

    // auto save
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
  };

  const items = form.items || [];

  return (
    <CmsLayout
      title="Kelola Foto Alumni"
      subtitle="Atur foto dokumentasi, kisah inspirasi, kategori jalur (Ausbildung, Au Pair, FSJ, G to G, Kuliah), dan kota alumni di Jerman."
      publicHref="/alumni"
      isSaved={saved}
      isSaving={updateMutation.isPending}
      errorMessage={error}
      onSave={handleSave}
      onReset={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isPending}
    >
      {/* Header Info Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f0] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#213853]">
          <Sparkles size={16} className="text-[#1b5a9f]" />
          <span>Teks Judul & Header Halaman Foto Alumni</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Eyebrow Header</label>
            <input
              type="text"
              value={form.headerEyebrow || ""}
              onChange={(e) => handleHeaderChange("headerEyebrow", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Halaman</label>
            <input
              type="text"
              value={form.headerTitle || ""}
              onChange={(e) => handleHeaderChange("headerTitle", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi / Subtitle Halaman</label>
          <textarea
            rows={2}
            value={form.headerSubtitle || ""}
            onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Alumni Photo Items */}
      <div className="bg-white rounded-2xl border border-[#dfe8f0] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#e7eef4] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#213853] text-sm">
              Daftar Foto & Kisah Alumni ({items.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik tambah atau edit untuk memperbarui foto dan kutipan testimoni alumni.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1b5a9f] hover:bg-[#15467c] text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            <Plus size={15} />
            <span>Tambah Foto Alumni</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item: any, idx: number) => (
            <div
              key={item.id || idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1b5a9f] text-white">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900">
                      Tahun {item.year}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1">{item.program}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-[#1b5a9f]" />
                      {item.city}
                    </span>
                    {item.workplace && <span>· {item.workplace}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => openEditModal(item, idx)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1b5a9f] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteItemIndex(idx)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingIndex !== null ? "Edit Foto Alumni" : "Tambah Foto Alumni Baru"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Alumni *</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder="Contoh: Siti Rahmawati"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Jalur</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Ausbildung">Ausbildung</option>
                    <option value="Au Pair">Au Pair</option>
                    <option value="FSJ / BFD">FSJ / BFD</option>
                    <option value="G to G Perawat">G to G Perawat</option>
                    <option value="Kuliah">Kuliah / Studium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Keberangkatan</label>
                  <input
                    type="text"
                    value={itemForm.year}
                    onChange={(e) => setItemForm({ ...itemForm, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Program Lengkap</label>
                <input
                  type="text"
                  value={itemForm.program}
                  onChange={(e) => setItemForm({ ...itemForm, program: e.target.value })}
                  placeholder="Contoh: Ausbildung Keperawatan (Pflegefachfrau)"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kota di Jerman</label>
                  <input
                    type="text"
                    value={itemForm.city}
                    onChange={(e) => setItemForm({ ...itemForm, city: e.target.value })}
                    placeholder="Frankfurt am Main"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Institusi / Tempat Kerja</label>
                  <input
                    type="text"
                    value={itemForm.workplace || ""}
                    onChange={(e) => setItemForm({ ...itemForm, workplace: e.target.value })}
                    placeholder="Universitätsklinikum Frankfurt"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Foto Dokumentasi Alumni</label>
                <ImageUploader
                  value={itemForm.imageUrl || ""}
                  onChange={(url) => setItemForm({ ...itemForm, imageUrl: url })}
                  placeholder="https://images.unsplash.com/..."
                  label="Foto Alumni"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kutipan / Testimoni Alumni</label>
                <textarea
                  rows={2}
                  value={itemForm.quote || ""}
                  onChange={(e) => setItemForm({ ...itemForm, quote: e.target.value })}
                  placeholder="Pesan atau pengalaman belajar di ILD Medan..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kisah Lengkap (Cerita Detail)</label>
                <textarea
                  rows={3}
                  value={itemForm.fullStory || ""}
                  onChange={(e) => setItemForm({ ...itemForm, fullStory: e.target.value })}
                  placeholder="Cerita lengkap perjalanan dari awal belajar bahasa hingga adaptasi di Jerman..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

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
                  onClick={handleSaveItem}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl shadow-sm"
                >
                  Simpan Foto Alumni
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Item Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteItemIndex !== null}
        title="Hapus Foto Alumni"
        description="Apakah Anda yakin ingin menghapus foto dan cerita alumni ini dari galeri?"
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={confirmDeleteItem}
        onCancel={() => setDeleteItemIndex(null)}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Galeri Alumni"
        description="Kembalikan semua daftar foto dan cerita alumni ke konfigurasi awal?"
        confirmText="Reset ke Bawaan"
        cancelText="Batal"
        variant="warning"
        isLoading={resetMutation.isPending}
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </CmsLayout>
  );
}
