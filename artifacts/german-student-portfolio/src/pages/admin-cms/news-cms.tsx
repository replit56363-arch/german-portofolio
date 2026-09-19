import { useState, useEffect, useMemo } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Filter,
  Calendar,
  Newspaper,
  Check,
  X,
  Eye,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  FileText,
  Clock,
  User,
} from "lucide-react";
import { Link } from "wouter";
import { ImageUploader } from "@/components/image-uploader";

export default function NewsCms() {
  const { data, isLoading } = useCmsSection("news");
  const updateMutation = useUpdateCmsSection("news");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<any>(null);

  // Search and filter in admin
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal State for Add / Edit Article
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleForm, setArticleForm] = useState<any>({
    id: 0,
    title: "",
    category: "Media",
    date: "",
    excerpt: "",
    content: "",
    author: "Tim Redaksi Lernpfad",
    tone: "coral",
    imageUrl: "",
    featured: false,
    published: true,
  });

  // Modal State for Detail Preview
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailArticle, setDetailArticle] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
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
      },
      onError: (err: any) => {
        setError(err.message || "Gagal menyimpan data Berita");
      },
    });
  };

  const handleReset = () => {
    resetMutation.mutate("news", {
      onSuccess: (res: any) => {
        if (res?.data) {
          setForm(res.data);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan pengaturan berita");
        setShowResetConfirm(false);
      },
    });
  };

  const confirmDeleteArticle = () => {
    if (!articleToDelete) return;
    const items = (form.items || []).filter((i: any) => i.id !== articleToDelete.id);
    const updatedForm = { ...form, items };
    setForm(updatedForm);
    updateMutation.mutate(updatedForm, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      },
    });
    setArticleToDelete(null);
  };

  // Open Create Modal
  const openCreateModal = () => {
    const today = new Date();
    const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
    const formattedDate = `${today.getDate().toString().padStart(2, "0")} ${months[today.getMonth()]} ${today.getFullYear()}`;

    setArticleForm({
      id: Date.now(),
      title: "",
      category: "Media",
      date: formattedDate,
      excerpt: "",
      content: "",
      author: "Tim Redaksi Lernpfad",
      tone: "coral",
      imageUrl: "",
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: any) => {
    setArticleForm({ ...item });
    setIsModalOpen(true);
  };

  // Open Detail Preview Modal
  const openDetailModal = (item: any) => {
    setDetailArticle(item);
    setIsDetailOpen(true);
  };

  // Image File Upload Handler from Device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Ukuran berkas gambar terlalu besar. Maksimal 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setArticleForm((prev: any) => ({
        ...prev,
        imageUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setArticleForm((prev: any) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  // Save Article (Create or Update)
  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      setError("Judul artikel tidak boleh kosong.");
      return;
    }

    const items = [...(form.items || [])];
    const index = items.findIndex((i: any) => i.id === articleForm.id);

    if (index >= 0) {
      items[index] = { ...articleForm };
    } else {
      items.unshift({ ...articleForm, id: articleForm.id || Date.now() });
    }

    const updatedForm = { ...form, items };
    setForm(updatedForm);
    setIsModalOpen(false);

    // Auto-sync mutation
    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  // Toggle Featured
  const toggleFeatured = (id: any) => {
    const items = (form.items || []).map((item: any) =>
      item.id === id ? { ...item, featured: !item.featured } : item
    );
    const updatedForm = { ...form, items };
    setForm(updatedForm);
    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  // Filtered list
  const filteredArticles = useMemo(() => {
    const list = form.items || [];
    const query = searchTerm.toLowerCase().trim();
    return list.filter((item: any) => {
      const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      const matchSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.excerpt?.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [form.items, searchTerm, selectedCategory]);

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
      title="Kelola Halaman Berita & Kabar Terkini"
      subtitle="Manajemen lengkap artikel berita, upload foto artikel dari perangkat, wawancara partner, serta pratinjau detail artikel."
      publicHref="/berita"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-6">
        {/* SECTION 1: HEADER HALAMAN BERITA */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="border-b border-[#eef4f8] pb-4">
            <SectionEyebrow>Tampilan Publik</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Halaman Berita</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Eyebrow</label>
              <input
                type="text"
                value={form.headerEyebrow || ""}
                onChange={(e) => handleHeaderChange("headerEyebrow", e.target.value)}
                className="field-input mt-1.5"
                placeholder="Catatan Lernpfad"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Judul Utama Halaman</label>
              <input
                type="text"
                value={form.headerTitle || ""}
                onChange={(e) => handleHeaderChange("headerTitle", e.target.value)}
                className="field-input mt-1.5 font-bold"
                placeholder="Kabar dari sepanjang jalan."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Subjudul / Deskripsi Header</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: DAFTAR ARTIKEL BERITA (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Konten Artikel</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Daftar Berita ({filteredArticles.length} artikel)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tulis Berita Baru
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-[#627f9d] mr-1 flex items-center gap-1">
                <Filter size={13} /> Kategori:
              </span>
              {(form.categories || ["Semua", "Media", "Partner", "Program", "Cerita"]).map((cat: string) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#1b5a9f] text-white"
                      : "bg-[#edf4fa] text-[#4d6a86] hover:bg-[#dfeaf4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7d98b2]" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="field-input pl-8 py-1.5 text-xs w-full sm:w-60"
              />
            </div>
          </div>

          {/* News Table / Grid */}
          <div className="mt-5 space-y-3">
            {filteredArticles.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#d2e0eb] p-8 text-center text-xs text-[#738ea8]">
                Tidak ada artikel berita yang cocok dengan filter atau kata kunci.
              </div>
            ) : (
              filteredArticles.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-4 transition-all hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Thumbnail Image if Uploaded */}
                    {item.imageUrl ? (
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-[#cbe0f0] bg-slate-100">
                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className={`h-16 w-20 shrink-0 rounded-lg flex items-center justify-center font-bold text-white text-xs ${
                          item.tone === "coral"
                            ? "bg-[#d86d50]"
                            : item.tone === "sea"
                            ? "bg-[#21675a]"
                            : item.tone === "butter"
                            ? "bg-[#d49e22]"
                            : item.tone === "ink"
                            ? "bg-[#1c4b43]"
                            : "bg-[#4f4b82]"
                        }`}
                      >
                        <Newspaper size={20} />
                      </div>
                    )}

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-[#e8f1f8] px-2 py-0.5 font-mono text-[10px] font-bold text-[#32577c]">
                          {item.category}
                        </span>
                        <span className="font-mono text-[11px] text-[#7691ac]">
                          {item.date}
                        </span>
                        {item.featured && (
                          <span className="rounded-full bg-[#fdeecf] px-2 py-0.5 text-[10px] font-bold text-[#a66a15]">
                            ★ Sorotan (Featured)
                          </span>
                        )}
                        {item.imageUrl && (
                          <span className="rounded bg-[#e3f2fd] px-1.5 py-0.5 text-[10px] font-bold text-[#1976d2] flex items-center gap-1">
                            <ImageIcon size={10} /> Berfoto
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#1f3b58] line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#637f9b] line-clamp-1">
                        {item.excerpt}
                      </p>

                      <p className="text-[11px] text-[#829bb3]">
                        Penulis: <span className="font-semibold text-[#486785]">{item.author || "Redaksi"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eef4f8] w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => openDetailModal(item)}
                      className="rounded-lg border border-[#cbe0f0] bg-[#f0f7fc] px-2.5 py-1.5 text-xs font-semibold text-[#1b5a9f] hover:bg-[#e1f0fa]"
                      title="Lihat Detail Artikel"
                    >
                      <Eye size={14} className="inline mr-1" />
                      Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFeatured(item.id)}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                        item.featured
                          ? "bg-[#fdf2d8] text-[#8e5c14] hover:bg-[#fae6b8]"
                          : "bg-white border border-[#d6e3ee] text-[#557595] hover:bg-[#edf5fb]"
                      }`}
                      title="Jadikan Sorotan Utama"
                    >
                      {item.featured ? "★ Sorotan" : "Jadikan Sorotan"}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="rounded-lg border border-[#d6e3ee] bg-white p-2 text-[#466584] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                      title="Edit artikel"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleToDelete(item)}
                      className="rounded-lg border border-[#f2d7d3] bg-[#fffbf9] p-2 text-[#ab594d] hover:bg-[#faebe8]"
                      title="Hapus artikel"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* MODAL EDIT / CREATE ARTIKEL (WITH DEVICE IMAGE UPLOAD) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div>
                <SectionEyebrow>Editor Berita</SectionEyebrow>
                <h3 className="text-base sm:text-lg font-bold text-[#1f3b58]">
                  {articleForm.id && form.items?.some((i: any) => i.id === articleForm.id)
                    ? "Edit Artikel Berita"
                    : "Tulis Artikel Baru"}
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

            <form onSubmit={saveArticle} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. Dari Bandung ke Dapur Hotel di Jerman"
                  className="field-input mt-1.5 font-semibold text-[#183552]"
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="rounded-xl border border-[#dce8f2] bg-[#f8fbfe] p-4">
                <ImageUploader
                  id="article-image-uploader"
                  label="Gambar / Sampul Berita & Artikel"
                  value={articleForm.imageUrl || ""}
                  onChange={(url) => setArticleForm((prev: any) => ({ ...prev, imageUrl: url }))}
                  aspectRatio="video"
                  maxDimension={1400}
                  helpText="Tarik & lepas atau pilih foto dokumentasi kegiatan, kelas, atau berita dari perangkat Anda."
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Kategori</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="Media">Media</option>
                    <option value="Partner">Partner</option>
                    <option value="Program">Program</option>
                    <option value="Cerita">Cerita</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Tanggal Tayang</label>
                  <input
                    type="text"
                    value={articleForm.date}
                    onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                    placeholder="e.g. 18 JUN 2024"
                    className="field-input mt-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Warna Fallback Card</label>
                  <select
                    value={articleForm.tone}
                    onChange={(e) => setArticleForm({ ...articleForm, tone: e.target.value })}
                    className="field-input mt-1.5"
                  >
                    <option value="coral">Coral (Merah)</option>
                    <option value="sea">Sea (Toska)</option>
                    <option value="butter">Butter (Kuning)</option>
                    <option value="ink">Ink (Hijau Pekat)</option>
                    <option value="lavender">Lavender (Ungu)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  placeholder="Satu atau dua kalimat ringkasan yang muncul di kartu berita..."
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#45627c]">Isi Konten Lengkap Artikel</label>
                <textarea
                  rows={6}
                  value={articleForm.content || ""}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="Isi lengkap artikel berita. Pisahkan antar paragraf dengan baris kosong..."
                  className="field-input mt-1.5 text-xs"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Penulis / Kontributor</label>
                  <input
                    type="text"
                    value={articleForm.author || ""}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="field-input mt-1.5"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#355474]">
                    <input
                      type="checkbox"
                      checked={articleForm.featured || false}
                      onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                      className="rounded border-[#ccd9e4] text-[#1b5a9f] focus:ring-0"
                    />
                    Sorotan Utama (Featured)
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
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PREVIEW ARTIKEL */}
      {isDetailOpen && detailArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#1b5a9f]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b5a9f]">
                  Pratinjau Detail Artikel
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="rounded-lg p-1.5 text-[#6c87a1] hover:bg-[#edf4fa]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Cover Image or Tone Header */}
              {detailArticle.imageUrl ? (
                <div className="relative overflow-hidden rounded-xl max-h-72 bg-slate-100 border border-[#d2e2f0]">
                  <img
                    src={detailArticle.imageUrl}
                    alt={detailArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className={`relative p-8 rounded-xl text-white ${
                    detailArticle.tone === "coral"
                      ? "bg-[#d86d50]"
                      : detailArticle.tone === "sea"
                      ? "bg-[#21675a]"
                      : detailArticle.tone === "butter"
                      ? "bg-[#d49e22]"
                      : detailArticle.tone === "ink"
                      ? "bg-[#1c4b43]"
                      : "bg-[#4f4b82]"
                  }`}
                >
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
                    {detailArticle.category}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold">{detailArticle.title}</h2>
                </div>
              )}

              {/* Header Badges & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef4f8] pb-3 text-xs text-[#52708e]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded bg-[#eaf2f8] px-2.5 py-1 font-mono font-bold text-[#1b5a9f]">
                    {detailArticle.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#1b5a9f]" /> {detailArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={13} className="text-[#1b5a9f]" /> {detailArticle.author || "Tim Redaksi"}
                  </span>
                </div>

                {detailArticle.featured && (
                  <span className="rounded-full bg-[#fdeecf] px-3 py-1 font-bold text-[#a66a15]">
                    ★ Sorotan Utama
                  </span>
                )}
              </div>

              {/* Title if not shown in banner */}
              {detailArticle.imageUrl && (
                <h1 className="text-2xl font-bold text-[#1f3b58] leading-snug">
                  {detailArticle.title}
                </h1>
              )}

              {/* Excerpt */}
              <div className="rounded-xl border-l-4 border-[#1b5a9f] bg-[#f0f6fc] p-4 text-xs sm:text-sm italic font-medium text-[#2d4d6e]">
                "{detailArticle.excerpt}"
              </div>

              {/* Content Body */}
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#35526e]">
                {(detailArticle.content || detailArticle.excerpt || "")
                  .split("\n\n")
                  .map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef4f8] pt-4">
              <Link
                href={`/berita/${detailArticle.id}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1b5a9f] hover:underline"
              >
                Buka Halaman Publik di Tab Baru <ExternalLink size={13} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  className="rounded-xl border border-[#d6e3ee] bg-white px-4 py-2 text-xs font-semibold text-[#55728f] hover:bg-[#edf5fb]"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailOpen(false);
                    openEditModal(detailArticle);
                  }}
                  className="rounded-xl bg-[#1b5a9f] px-4 py-2 text-xs font-bold text-white hover:bg-[#154b85]"
                >
                  Edit Artikel Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Article Confirmation Dialog */}
      <ConfirmDialog
        isOpen={articleToDelete !== null}
        title="Hapus Artikel Berita"
        description={`Apakah Anda yakin ingin menghapus artikel "${articleToDelete?.title || ""}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={confirmDeleteArticle}
        onCancel={() => setArticleToDelete(null)}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Data Berita"
        description="Kembalikan seluruh daftar artikel berita dan tampilan header ke konfigurasi bawaan awal?"
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
