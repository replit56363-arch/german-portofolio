import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, Share2, Mail, Phone, MapPin, X } from "lucide-react";

export default function FooterCms() {
  const { data, isLoading, isError } = useCmsSection("footer");
  const updateMutation = useUpdateCmsSection("footer");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Modal for Footer Link CRUD
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkForm, setLinkForm] = useState<any>({
    id: 0,
    label: "",
    href: "",
    category: "Navigasi",
    order: 1,
  });

  // Modal for Social Link CRUD
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialForm, setSocialForm] = useState<any>({
    id: 0,
    platform: "Instagram",
    label: "",
    url: "",
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleGeneralChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => setSaved(true),
      onError: (err: any) => setError(err.message || "Gagal menyimpan konfigurasi Footer"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan informasi footer ke standar awal?")) {
      resetMutation.mutate("footer", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  // Footer Links CRUD
  const openCreateLinkModal = () => {
    const nextOrder = (form.links?.length || 0) + 1;
    setLinkForm({
      id: Date.now(),
      label: "",
      href: "/",
      category: "Navigasi",
      order: nextOrder,
    });
    setIsLinkModalOpen(true);
  };

  const openEditLinkModal = (item: any) => {
    setLinkForm({ ...item });
    setIsLinkModalOpen(true);
  };

  const saveLinkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkForm.label.trim() || !linkForm.href.trim()) {
      alert("Label dan tautan wajib diisi.");
      return;
    }

    const links = [...(form.links || [])];
    const index = links.findIndex((l: any) => l.id === linkForm.id);

    if (index >= 0) {
      links[index] = { ...linkForm };
    } else {
      links.push({ ...linkForm, id: linkForm.id || Date.now() });
    }

    const updatedForm = { ...form, links };
    setForm(updatedForm);
    setIsLinkModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteLinkItem = (id: any) => {
    if (window.confirm("Hapus tautan footer ini?")) {
      const links = (form.links || []).filter((l: any) => l.id !== id);
      const updatedForm = { ...form, links };
      setForm(updatedForm);
      updateMutation.mutate(updatedForm, {
        onSuccess: () => setSaved(true),
      });
    }
  };

  // Social Links CRUD
  const openCreateSocialModal = () => {
    setSocialForm({
      id: Date.now(),
      platform: "Instagram",
      label: "@lernpfad.id",
      url: "https://instagram.com",
    });
    setIsSocialModalOpen(true);
  };

  const openEditSocialModal = (item: any) => {
    setSocialForm({ ...item });
    setIsSocialModalOpen(true);
  };

  const saveSocialItem = (e: React.FormEvent) => {
    e.preventDefault();
    const socialLinks = [...(form.socialLinks || [])];
    const index = socialLinks.findIndex((s: any) => s.id === socialForm.id);

    if (index >= 0) {
      socialLinks[index] = { ...socialForm };
    } else {
      socialLinks.push({ ...socialForm, id: socialForm.id || Date.now() });
    }

    const updatedForm = { ...form, socialLinks };
    setForm(updatedForm);
    setIsSocialModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteSocialItem = (id: any) => {
    if (window.confirm("Hapus akun media sosial ini?")) {
      const socialLinks = (form.socialLinks || []).filter((s: any) => s.id !== id);
      const updatedForm = { ...form, socialLinks };
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
      title="Kelola Footer (Kaki Halaman Publik)"
      subtitle="Manajemen deskripsi penutup, kelompok link navigasi footer, kontak kantor, media sosial, dan hak cipta (copyright)."
      publicHref="/"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={handleReset}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-6">
        {/* GENERAL FOOTER INFO */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="border-b border-[#eef4f8] pb-4">
            <SectionEyebrow>Teks & Hak Cipta</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#233d59]">Deskripsi & Teks Copyright</h2>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Tagline / Deskripsi Singkat Footer</label>
              <textarea
                rows={2}
                value={form.tagline || ""}
                onChange={(e) => handleGeneralChange("tagline", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Email Kontak Footer</label>
                <input
                  type="email"
                  value={form.contactEmail || ""}
                  onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
                  className="field-input mt-1.5 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Nomor WhatsApp / Telp</label>
                <input
                  type="text"
                  value={form.contactPhone || ""}
                  onChange={(e) => handleGeneralChange("contactPhone", e.target.value)}
                  className="field-input mt-1.5 font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Teks Hak Cipta (Copyright)</label>
              <input
                type="text"
                value={form.copyright || ""}
                onChange={(e) => handleGeneralChange("copyright", e.target.value)}
                className="field-input mt-1.5 font-mono text-xs"
              />
            </div>
          </div>
        </section>

        {/* FOOTER LINKS (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Daftar Menu Footer</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Tautan Menu Kaki Halaman ({(form.links || []).length} link)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateLinkModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Link Footer
            </button>
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {(form.links || []).map((link: any) => (
              <div
                key={link.id}
                className="flex items-center justify-between rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-3 transition-all hover:bg-white"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-[#e8f1f8] px-1.5 py-0.5 text-[9px] font-bold text-[#35587d]">
                      {link.category || "Menu"}
                    </span>
                    <h4 className="text-xs font-bold text-[#1f3b58]">{link.label}</h4>
                  </div>
                  <p className="font-mono text-[10px] text-[#64819e] truncate max-w-[150px]">{link.href}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditLinkModal(link)}
                    className="rounded p-1 text-[#466584] hover:bg-[#edf5fb]"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteLinkItem(link.id)}
                    className="rounded p-1 text-[#ab594d] hover:bg-[#faebe8]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL LINKS (CRUD) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Media Sosial</SectionEyebrow>
              <h2 className="text-lg font-bold text-[#233d59]">
                Akun Jejaring Sosial ({(form.socialLinks || []).length} akun)
              </h2>
            </div>
            <button
              type="button"
              onClick={openCreateSocialModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85]"
            >
              <Plus size={15} /> Tambah Akun Medsos
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(form.socialLinks || []).map((soc: any) => (
              <div
                key={soc.id}
                className="flex items-center justify-between rounded-xl border border-[#e1ebf4] bg-[#f9fbfd] p-3.5"
              >
                <div>
                  <span className="rounded bg-[#e8f1f8] px-2 py-0.5 font-mono text-[10px] font-bold text-[#32577c]">
                    {soc.platform}
                  </span>
                  <p className="mt-1 text-xs font-bold text-[#1f3b58]">{soc.label}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditSocialModal(soc)}
                    className="rounded p-1 text-[#466584] hover:bg-[#edf5fb]"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSocialItem(soc.id)}
                    className="rounded p-1 text-[#ab594d] hover:bg-[#faebe8]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL LINK FOOTER */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <h3 className="text-base font-bold text-[#1f3b58]">Editor Tautan Footer</h3>
              <button type="button" onClick={() => setIsLinkModalOpen(false)} className="rounded p-1 text-gray-500">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={saveLinkItem} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Label Link *</label>
                <input
                  type="text"
                  required
                  value={linkForm.label}
                  onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
                  placeholder="e.g. Beranda, Kabar terkini"
                  className="field-input mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">URL Tujuan *</label>
                <input
                  type="text"
                  required
                  value={linkForm.href}
                  onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
                  placeholder="e.g. /berita, /media"
                  className="field-input mt-1 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Kategori Kolom</label>
                <select
                  value={linkForm.category}
                  onChange={(e) => setLinkForm({ ...linkForm, category: e.target.value })}
                  className="field-input mt-1"
                >
                  <option value="Navigasi">Navigasi Utama</option>
                  <option value="Layanan">Layanan & Kantor</option>
                  <option value="Informasi">Informasi & Portal</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 border-t border-[#eef4f8] pt-4">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1b5a9f] px-5 py-2 text-xs font-bold text-white"
                >
                  Simpan Tautan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SOCIAL LINK */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#d6e3ed]">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
              <h3 className="text-base font-bold text-[#1f3b58]">Editor Akun Media Sosial</h3>
              <button type="button" onClick={() => setIsSocialModalOpen(false)} className="rounded p-1 text-gray-500">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={saveSocialItem} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Platform Medsos</label>
                <select
                  value={socialForm.platform}
                  onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                  className="field-input mt-1"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Teks Label Akun</label>
                <input
                  type="text"
                  required
                  value={socialForm.label}
                  onChange={(e) => setSocialForm({ ...socialForm, label: e.target.value })}
                  placeholder="e.g. @lernpfad.id"
                  className="field-input mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">URL Profil</label>
                <input
                  type="text"
                  required
                  value={socialForm.url}
                  onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                  placeholder="https://..."
                  className="field-input mt-1 font-mono text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-[#eef4f8] pt-4">
                <button
                  type="button"
                  onClick={() => setIsSocialModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1b5a9f] px-5 py-2 text-xs font-bold text-white"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
