import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  Plus,
  Trash2,
  Edit2,
  Building2,
  Sparkles,
  X,
  Layers,
  Users,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";

export default function ClassroomsCms() {
  const { data, isLoading } = useCmsSection("classrooms");
  const updateMutation = useUpdateCmsSection("classrooms");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deleteRoomIndex, setDeleteRoomIndex] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [roomForm, setRoomForm] = useState<any>({
    id: Date.now(),
    name: "",
    roomCode: "RK-01",
    category: "Ruang Teori & Grammatik",
    capacity: "12–15 Peserta",
    floor: "Lantai 1",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    description: "",
    amenities: ["AC", "Smart TV", "Whiteboard Magnetik"],
    gallery: [],
    active: true,
  });

  const [amenityInput, setAmenityInput] = useState("");

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
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Ruangan Kelas"),
    });
  };

  const handleReset = () => {
    resetMutation.mutate("classrooms", {
      onSuccess: (res: any) => {
        if (res?.data) {
          setForm(res.data);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan pengaturan");
        setShowResetConfirm(false);
      },
    });
  };

  const confirmDeleteRoom = () => {
    if (deleteRoomIndex === null) return;
    const currentItems = [...(form.items || [])];
    currentItems.splice(deleteRoomIndex, 1);
    const updated = { ...form, items: currentItems };
    setForm(updated);
    updateMutation.mutate(updated, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
    setDeleteRoomIndex(null);
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setRoomForm({
      id: Date.now(),
      name: "",
      roomCode: `RK-0${(form.items?.length || 0) + 1}`,
      category: "Ruang Teori & Grammatik",
      capacity: "12–15 Peserta",
      floor: "Lantai 1",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      description: "",
      amenities: ["AC Daikin Inverter", "Smart Screen 55 Inch", "Whiteboard Magnetik", "High-Speed Wi-Fi"],
      gallery: [],
      active: true,
    });
    setAmenityInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (room: any, index: number) => {
    setEditingIndex(index);
    setRoomForm({ ...room });
    setAmenityInput("");
    setIsModalOpen(true);
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setRoomForm({
        ...roomForm,
        amenities: [...(roomForm.amenities || []), amenityInput.trim()],
      });
      setAmenityInput("");
    }
  };

  const removeAmenity = (idx: number) => {
    const next = [...(roomForm.amenities || [])];
    next.splice(idx, 1);
    setRoomForm({ ...roomForm, amenities: next });
  };

  const handleSaveRoom = () => {
    if (!roomForm.name.trim()) {
      setError("Nama ruangan wajib diisi!");
      return;
    }

    const currentItems = [...(form.items || [])];
    if (editingIndex !== null) {
      currentItems[editingIndex] = roomForm;
    } else {
      currentItems.push(roomForm);
    }

    const updated = { ...form, items: currentItems };
    setForm(updated);
    setIsModalOpen(false);
    setSaved(false);

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
      title="Kelola Ruangan Kelas"
      subtitle="Atur daftar ruangan kelas, laboratorium audio-visual Hören, kapasitas siswa, fasilitas AC/Smart TV, dan foto kampus di Medan."
      publicHref="/ruangan-kelas"
      isSaved={saved}
      isSaving={updateMutation.isPending}
      errorMessage={error}
      onSave={handleSave}
      onReset={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isPending}
    >
      {/* Header Form */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f0] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#213853]">
          <Building2 size={16} className="text-[#1b5a9f]" />
          <span>Teks Judul & Header Fasilitas Kelas</span>
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi / Subtitle Fasilitas</label>
          <textarea
            rows={2}
            value={form.headerSubtitle || ""}
            onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Classroom Items */}
      <div className="bg-white rounded-2xl border border-[#dfe8f0] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#e7eef4] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#213853] text-sm">
              Daftar Ruangan Kelas & Lab ({items.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola spesifikasi, kapasitas, dan foto fasilitas belajar kampus Medan Polonia.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1b5a9f] hover:bg-[#15467c] text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            <Plus size={15} />
            <span>Tambah Ruangan Baru</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((room: any, idx: number) => (
            <div
              key={room.id || idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-sm">{room.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1b5a9f] text-white">
                      {room.roomCode}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {room.floor}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                    <span>{room.category}</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Users size={11} className="text-[#1b5a9f]" />
                      Kapasitas: {room.capacity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => openEditModal(room, idx)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1b5a9f] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteRoomIndex(idx)}
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
                {editingIndex !== null ? "Edit Data Ruangan" : "Tambah Ruangan Kelas Baru"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Ruangan Kelas *</label>
                <input
                  type="text"
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                  placeholder="Contoh: Ruang Kelas Intensif Berlin (Teori & Grammatik)"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kode Ruangan</label>
                  <input
                    type="text"
                    value={roomForm.roomCode}
                    onChange={(e) => setRoomForm({ ...roomForm, roomCode: e.target.value })}
                    placeholder="RK-01"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi Lantai</label>
                  <input
                    type="text"
                    value={roomForm.floor}
                    onChange={(e) => setRoomForm({ ...roomForm, floor: e.target.value })}
                    placeholder="Lantai 1"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Fungsi Ruangan</label>
                  <select
                    value={roomForm.category}
                    onChange={(e) => setRoomForm({ ...roomForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Ruang Teori & Grammatik">Ruang Teori & Grammatik</option>
                    <option value="Lab Audio-Visual (Hören)">Lab Audio-Visual (Hören)</option>
                    <option value="Ruang Diskusi (Sprechen)">Ruang Diskusi (Sprechen)</option>
                    <option value="Pojok Ujian Goethe">Pojok Ujian Goethe</option>
                    <option value="Lounge & Konsultasi">Lounge & Konsultasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kapasitas Peserta</label>
                  <input
                    type="text"
                    value={roomForm.capacity}
                    onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
                    placeholder="12–15 Peserta"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Foto Utama Ruangan</label>
                <ImageUploader
                  value={roomForm.imageUrl || ""}
                  onChange={(url) => setRoomForm({ ...roomForm, imageUrl: url })}
                  placeholder="https://images.unsplash.com/..."
                  label="Foto Ruangan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Ruangan</label>
                <textarea
                  rows={2}
                  value={roomForm.description || ""}
                  onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                  placeholder="Deskripsi tata letak meja, kenyamanan, atau peruntukan latihan..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Amenities tags management */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fasilitas / Peralatan Kelas</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Tambah fasilitas (contoh: AC Daikin, Smart TV 55', Whiteboard...)"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#1b5a9f] rounded-xl"
                  >
                    Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {roomForm.amenities?.map((am: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      <span>{am}</span>
                      <button
                        type="button"
                        onClick={() => removeAmenity(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
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
                  onClick={handleSaveRoom}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1b5a9f] hover:bg-[#15467c] rounded-xl shadow-sm"
                >
                  Simpan Ruangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Room Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteRoomIndex !== null}
        title="Hapus Ruangan Kelas"
        description="Apakah Anda yakin ingin menghapus data ruangan kelas ini dari daftar fasilitas?"
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={confirmDeleteRoom}
        onCancel={() => setDeleteRoomIndex(null)}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Fasilitas Kelas"
        description="Kembalikan semua daftar fasilitas ruangan kelas ke konfigurasi bawaan?"
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
