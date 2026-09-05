import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Play, Tv, Sparkles, X, Image as ImageIcon } from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";

export default function MediaCms() {
  const { data, isLoading, isError } = useCmsSection("media");
  const updateMutation = useUpdateCmsSection("media");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaForm, setMediaForm] = useState<any>({
    id: 0,
    title: "",
    category: "Televisi",
    channel: "ZDF",
    date: "",
    excerpt: "",
    videoUrl: "",
    imageUrl: "",
    tone: "coral",
    featured: false,
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
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Media"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan daftar liputan media ke standar awal?")) {
      resetMutation.mutate("media", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  const openCreateModal = () => {
    const today = new Date();
    const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
    const formattedDate = `${today.getDate().toString().padStart(2, "0")} ${months[today.getMonth()]} ${today.getFullYear()}`;

    setMediaForm({
      id: Date.now(),
      title: "",
      category: "Televisi",
      channel: "stern TV",
      date: formattedDate,
      excerpt: "",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "",
      tone: "coral",
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setMediaForm({ ...item });
    setIsModalOpen(true);
  };

  const saveMediaItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title.trim()) {
      alert("Judul liputan tidak boleh kosong.");
      return;
    }

    const items = [...(form.items || [])];
    const index = items.findIndex((i: any) => i.id === mediaForm.id);

    if (index >= 0) {
      items[index] = { ...mediaForm };
    } else {
      items.unshift({ ...mediaForm, id: mediaForm.id || Date.now() });
    }

    const updatedForm = { ...form, items };
    setForm(updatedForm);
    setIsModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteMediaItem = (id: any) => {
    if (window.confirm("Hapus liputan media ini?")) {
      const items = (form.items || []).filter((i: any) => i.id !== id);
      const updatedForm = { ...form, items };
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
      title="Kelola Halaman Media (Televisi & Dokumenter)"
      subtitle="Manajemen liputan TV nasional Jerman (stern TV, ZDF, Spiegel TV, dsb.), video dokumenter, channel, dan sorotan."
      publicHref="/media"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={handleReset}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-6">
        {/* HEADER CMS */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="border-b border-[#eef4f8] pb-4">
            <SectionEyebrow>Tampilan Halaman</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Media</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Eyebrow</label>
              <input
                type="text"
                value={form.headerEyebrow || ""}
                onChange={(e) => handleHeaderChange("headerEyebrow", e.target.value)}
                className="field-input mt-1.5"
                placeholder="Ruang media Lernpfad"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Judul Utama</label>
              <input
                type="text"
                value={form.headerTitle || ""}
                onChange={(e) => handleHeaderChange("headerTitle", e.target.value)}
                className="field-input mt-1.5 font-bold"
                placeholder="Dari layar ke percakapan."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Deskripsi Header</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* MEDIA LIST (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Video & Liputan TV</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Daftar Liputan Media ({(form.items || []).length} item)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Liputan Media
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {(form.items || []).map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                {item.imageUrl && (
                  <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-[#cfdce7] bg-[#eef4f9]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 rounded bg-[#dff0fa] px-2 py-0.5 font-mono text-[10px] font-bold text-[#1e5888]">
                      <Tv size={11} /> {item.channel || "TV Channel"}
                    </span>
                    <span className="rounded bg-[#e8f1f8] px-2 py-0.5 font-mono text-[10px] font-bold text-[#32577c]">
                      {item.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#7691ac]">
                      {item.date}
                    </span>
                    {item.featured && (
                      <span className="rounded-full bg-[#fdeecf] px-2 py-0.5 text-[10px] font-bold text-[#a66a15]">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#1f3b58]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#637f9b] line-clamp-2">
                    {item.excerpt}
                  </p>

                  {item.videoUrl && (
                    <p className="text-[11px] font-mono text-[#1b5a9f] truncate">
                      URL Video: {item.videoUrl}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eef4f8] w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="rounded-lg border border-[#d6e3ee] bg-white p-2 text-[#466584] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMediaItem(item.id)}
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

      {/* MODAL EDIT / CREATE MEDIA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Editor Media</SectionEyebrow>
                <h3 className="text-base sm:text-lg font-bold text-[#1f3b58]">
                  {mediaForm.id && form.items?.some((i: any) => i.id === mediaForm.id)
                    ? "Edit Liputan Media"
                    : "Tambah Liputan Media Baru"}
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

            <form onSubmit={saveMediaItem} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul Liputan / Tayangan *</label>
                <input
                  type="text"
                  required
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  placeholder="e.g. stern TV: Peserta Ausbildung dari Indonesia"
                  className="field-input mt-1.5 font-semibold text-[#183552]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nama Stasiun / Channel</label>
                  <input
                    type="text"
                    value={mediaForm.channel}
                    onChange={(e) => setMediaForm({ ...mediaForm, channel: e.target.value })}
                    placeholder="e.g. stern TV, ZDF"
                    className="field-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Kategori</label>
                  <select
                    value={mediaForm.category}
                    onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="Televisi">Televisi</option>
                    <option value="Dokumenter">Dokumenter</option>
                    <option value="Wawancara">Wawancara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Tanggal Tayang</label>
                  <input
                    type="text"
                    value={mediaForm.date}
                    onChange={(e) => setMediaForm({ ...mediaForm, date: e.target.value })}
                    className="field-input mt-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">URL Link Video YouTube / Player</label>
                <input
                  type="text"
                  value={mediaForm.videoUrl || ""}
                  onChange={(e) => setMediaForm({ ...mediaForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="field-input mt-1.5 font-mono"
                />
              </div>

              {/* UPLOAD GAMBAR THUMBNAIL */}
              <div className="rounded-xl border border-[#dce8f2] bg-[#f8fbfe] p-4">
                <ImageUploader
                  id="media-thumbnail-uploader"
                  label="Thumbnail / Poster Tayangan (Upload dari Perangkat)"
                  value={mediaForm.imageUrl || ""}
                  onChange={(url) => setMediaForm({ ...mediaForm, imageUrl: url })}
                  aspectRatio="video"
                  maxDimension={1200}
                  helpText="Unggah gambar screenshot atau poster tayangan media dari komputer/ponsel Anda."
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Ringkasan Isi Tayangan</label>
                <textarea
                  rows={3}
                  required
                  value={mediaForm.excerpt}
                  onChange={(e) => setMediaForm({ ...mediaForm, excerpt: e.target.value })}
                  placeholder="Penjelasan singkat tayangan liputan..."
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Aksen Warna Card</label>
                  <select
                    value={mediaForm.tone}
                    onChange={(e) => setMediaForm({ ...mediaForm, tone: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="coral">Coral (Merah Bata)</option>
                    <option value="sea">Sea (Toska)</option>
                    <option value="butter">Butter (Kuning Mustard)</option>
                    <option value="ink">Ink (Hijau Tua)</option>
                    <option value="lavender">Lavender (Ungu)</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#355474]">
                    <input
                      type="checkbox"
                      checked={mediaForm.featured || false}
                      onChange={(e) => setMediaForm({ ...mediaForm, featured: e.target.checked })}
                      className="rounded border-[#ccd9e4] text-[#1b5a9f] focus:ring-0"
                    />
                    Tayangan Sorotan Utama
                  </label>
                </div>
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
                  Simpan Liputan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
