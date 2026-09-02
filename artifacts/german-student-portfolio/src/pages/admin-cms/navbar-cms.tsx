import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import {
  Plus,
  Trash2,
  Edit2,
  Compass,
  Check,
  X,
  ArrowUpDown,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";

export default function NavbarCms() {
  const { data, isLoading } = useCmsSection("navbar");
  const updateMutation = useUpdateCmsSection("navbar");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Top-level modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkForm, setLinkForm] = useState<any>({
    id: 0,
    label: "",
    sublabel: "",
    href: "",
    order: 1,
    isExternal: false,
    isHighlighted: false,
    isVisible: true,
  });

  // Child / Submenu modal
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [parentLinkId, setParentLinkId] = useState<any>(null);
  const [childForm, setChildForm] = useState<any>({
    id: 0,
    label: "",
    sublabel: "",
    href: "",
    isVisible: true,
  });

  // Interactive preview hover state
  const [previewHoverMenu, setPreviewHoverMenu] = useState<any>(null);

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
      onError: (err: any) => setError(err.message || "Gagal menyimpan konfigurasi Navbar"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan menu navigasi header ke standar awal (termasuk sub-menu dropdown Aktuelles, Über AuLiD, Referenzen)?")) {
      resetMutation.mutate("navbar", {
        onSuccess: () => setSaved(true),
      });
    }
  };

  // --- Top Level Link Handlers ---
  const openCreateModal = () => {
    const nextOrder = (form.links?.length || 0) + 1;
    setLinkForm({
      id: Date.now(),
      label: "",
      sublabel: "",
      href: "/",
      order: nextOrder,
      isExternal: false,
      isHighlighted: false,
      isVisible: true,
      children: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setLinkForm({ ...item });
    setIsModalOpen(true);
  };

  const saveLinkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkForm.label.trim()) {
      alert("Nama label menu wajib diisi.");
      return;
    }

    const links = [...(form.links || [])];
    const index = links.findIndex((l: any) => l.id === linkForm.id);

    if (index >= 0) {
      links[index] = {
        ...links[index],
        ...linkForm,
      };
    } else {
      links.push({
        ...linkForm,
        id: linkForm.id || Date.now(),
        children: linkForm.children || [],
      });
    }

    links.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

    const updatedForm = { ...form, links };
    setForm(updatedForm);
    setIsModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteLinkItem = (id: any) => {
    if (window.confirm("Hapus tautan menu ini beserta semua sub-menunya?")) {
      const links = (form.links || []).filter((l: any) => l.id !== id);
      const updatedForm = { ...form, links };
      setForm(updatedForm);
      updateMutation.mutate(updatedForm, {
        onSuccess: () => setSaved(true),
      });
    }
  };

  const toggleVisibility = (id: any) => {
    const links = (form.links || []).map((l: any) =>
      l.id === id ? { ...l, isVisible: l.isVisible === false ? true : false } : l
    );
    const updatedForm = { ...form, links };
    setForm(updatedForm);
    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  // --- Submenu / Child Handlers ---
  const openCreateChildModal = (parentId: any) => {
    setParentLinkId(parentId);
    setChildForm({
      id: Date.now(),
      label: "",
      sublabel: "",
      href: "/",
      isVisible: true,
    });
    setIsChildModalOpen(true);
  };

  const openEditChildModal = (parentId: any, child: any) => {
    setParentLinkId(parentId);
    setChildForm({ ...child });
    setIsChildModalOpen(true);
  };

  const saveChildItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childForm.label.trim() || !childForm.href.trim()) {
      alert("Nama label dan URL sub-menu wajib diisi.");
      return;
    }

    const links = (form.links || []).map((parent: any) => {
      if (parent.id !== parentLinkId) return parent;

      const children = [...(parent.children || [])];
      const childIdx = children.findIndex((c: any) => c.id === childForm.id);

      if (childIdx >= 0) {
        children[childIdx] = { ...childForm };
      } else {
        children.push({ ...childForm, id: childForm.id || Date.now() });
      }

      return { ...parent, children };
    });

    const updatedForm = { ...form, links };
    setForm(updatedForm);
    setIsChildModalOpen(false);

    updateMutation.mutate(updatedForm, {
      onSuccess: () => setSaved(true),
    });
  };

  const deleteChildItem = (parentId: any, childId: any) => {
    if (window.confirm("Hapus item sub-menu dropdown ini?")) {
      const links = (form.links || []).map((parent: any) => {
        if (parent.id !== parentLinkId && parent.id !== parentId) return parent;
        return {
          ...parent,
          children: (parent.children || []).filter((c: any) => c.id !== childId),
        };
      });

      const updatedForm = { ...form, links };
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
      title="Kelola Navbar & Sub-Menu Dropdown Header"
      subtitle="Atur identitas brand, menu utama (Aktuelles, Über AuLiD, Referenzen), serta sub-menu dropdown yang muncul saat mouse diarahkan (hover)."
      publicHref="/"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-8">
        {/* INTERACTIVE LIVE PREVIEW OF HOVER DROPDOWN */}
        <section className="rounded-2xl border border-[#dfe7ef] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Pratinjau Interaktif Navbar</SectionEyebrow>
              <h3 className="text-base font-bold text-[#233d59]">
                Coba arahkan kursor (hover) pada menu di bawah ini
              </h3>
            </div>
            <span className="rounded-full bg-[#f5eee3] px-3 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-[0.1em] text-[#d35f46]">
              Live Preview
            </span>
          </div>

          <div className="mt-5 overflow-visible rounded-2xl border border-[#173d3a]/15 bg-[#f5eee3] p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Brand Preview */}
              <div className="flex items-center gap-3">
                <div className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-[#173d3a] bg-[#f5eee3]">
                  <span className="absolute h-4 w-px rotate-45 bg-[#d35f46]" />
                  <span className="absolute h-4 w-px -rotate-45 bg-[#d35f46]" />
                  <span className="relative h-1 w-1 rounded-full bg-[#d35f46]" />
                </div>
                <div>
                  <div className="font-['Fraunces'] text-lg font-semibold text-[#173d3a]">
                    {form.brandName || "Lernpfad"}
                  </div>
                  <div className="font-mono-ui text-[7px] font-bold uppercase tracking-[0.16em] text-[#77918b]">
                    {form.brandSubtitle || "Indonesia · Deutschland"}
                  </div>
                </div>
              </div>

              {/* Links Preview with Hover Dropdowns */}
              <div className="flex flex-wrap items-center gap-5">
                {(form.links || [])
                  .filter((l: any) => l.isVisible !== false)
                  .map((item: any) => {
                    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                    const isOpen = previewHoverMenu === item.id;

                    if (!hasChildren) {
                      return (
                        <span
                          key={item.id}
                          className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#486961] hover:text-[#d35f46] cursor-pointer"
                        >
                          {item.label}
                        </span>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        className="relative py-1"
                        onMouseEnter={() => setPreviewHoverMenu(item.id)}
                        onMouseLeave={() => setPreviewHoverMenu(null)}
                      >
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                            isOpen ? "text-[#d35f46]" : "text-[#486961] hover:text-[#d35f46]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#d35f46]" : "text-[#77918b]"}`}
                          />
                        </button>

                        {isOpen && (
                          <div className="absolute left-0 top-full pt-1.5 z-50 min-w-[230px] animate-in fade-in duration-150">
                            <div className="overflow-hidden rounded-xl border border-[#173d3a]/15 bg-white p-2 shadow-[0_12px_28px_rgba(23,61,58,0.14)]">
                              <div className="mb-1 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#8ea49e] border-b border-[#f0f4f2]">
                                {item.sublabel || item.label}
                              </div>
                              <div className="space-y-0.5">
                                {item.children.map((child: any) => (
                                  <div
                                    key={child.id}
                                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors hover:bg-[#f5eee3] text-[#173d3a] hover:text-[#d35f46] cursor-pointer"
                                  >
                                    <div>
                                      <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.06em]">
                                        {child.label}
                                      </div>
                                      {child.sublabel && (
                                        <div className="text-[9px] text-[#718b84]">{child.sublabel}</div>
                                      )}
                                    </div>
                                    <ArrowUpRight size={12} className="text-[#d35f46]" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {form.ctaEnabled !== false && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#173d3a] px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#f5eee3]">
                    {form.ctaText || "Masuk portal"} <ArrowUpRight size={12} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* IDENTITAS BRAND & CTA SETTINGS */}
        <section className="rounded-2xl border border-[#dfe7ef] bg-white p-6 shadow-sm">
          <SectionEyebrow>Identitas & Tombol Utama</SectionEyebrow>
          <h3 className="text-base font-bold text-[#233d59]">Pengaturan Brand & Tombol CTA</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-[#455d78]">Nama Brand / Logo</label>
              <input
                type="text"
                value={form.brandName || ""}
                onChange={(e) => handleGeneralChange("brandName", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                placeholder="Lernpfad"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#455d78]">Sub-judul Brand</label>
              <input
                type="text"
                value={form.brandSubtitle || ""}
                onChange={(e) => handleGeneralChange("brandSubtitle", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                placeholder="Indonesia · Deutschland"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#455d78]">Teks Tombol CTA</label>
              <input
                type="text"
                value={form.ctaText || ""}
                onChange={(e) => handleGeneralChange("ctaText", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                placeholder="Masuk portal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#455d78]">URL Tujuan CTA</label>
              <input
                type="text"
                value={form.ctaHref || ""}
                onChange={(e) => handleGeneralChange("ctaHref", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                placeholder="/login"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="ctaEnabled"
                checked={form.ctaEnabled !== false}
                onChange={(e) => handleGeneralChange("ctaEnabled", e.target.checked)}
                className="h-4 w-4 rounded border-[#cbd5e1] text-[#1b5a9f]"
              />
              <label htmlFor="ctaEnabled" className="text-xs font-bold text-[#233d59]">
                Tampilkan Tombol CTA Masuk Portal
              </label>
            </div>
          </div>
        </section>

        {/* LIST OF MENU ITEMS & SUB-MENUS */}
        <section className="rounded-2xl border border-[#dfe7ef] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#eef4f8] pb-4">
            <div>
              <SectionEyebrow>Struktur Menu & Sub-Menu Dropdown</SectionEyebrow>
              <h3 className="text-base font-bold text-[#233d59]">
                Daftar Menu Header ({(form.links || []).length} Menu Utama)
              </h3>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1b5a9f] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124882]"
            >
              <Plus size={14} /> Tambah Menu Utama
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {(form.links || []).map((item: any, idx: number) => {
              const children = item.children || [];
              const hasChildren = children.length > 0;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all ${
                    item.isVisible === false
                      ? "border-[#e2e8f0] bg-[#f8fafc] opacity-60"
                      : "border-[#d8e4ee] bg-[#fbfdff] shadow-sm hover:border-[#b4cce3]"
                  }`}
                >
                  {/* Top Level Item Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#eaf2f9] font-mono-ui text-xs font-bold text-[#1b5a9f]">
                        {item.order || idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#233d59]">{item.label}</h4>
                          {hasChildren && (
                            <span className="rounded-full bg-[#fdf4db] px-2 py-0.5 text-[9px] font-bold text-[#8e6810]">
                              {children.length} Sub-menu Dropdown
                            </span>
                          )}
                          {item.isVisible === false && (
                            <span className="rounded-full bg-[#feece8] px-2 py-0.5 text-[9px] font-bold text-[#c04b34]">
                              Disembunyikan
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6e8499]">
                          <span>URL: <strong className="text-[#36506c]">{item.href || "#"}</strong></span>
                          {item.sublabel && <span>• Keterangan: {item.sublabel}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openCreateChildModal(item.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#c4dcf2] bg-[#f0f7fd] px-2.5 py-1.5 text-xs font-bold text-[#1b5a9f] hover:bg-[#e1f0fc]"
                        title="Tambah Sub-menu Dropdown"
                      >
                        <Plus size={13} /> + Sub-menu
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleVisibility(item.id)}
                        className={`p-1.5 rounded-lg border ${
                          item.isVisible === false
                            ? "border-[#fcd9d3] text-[#c04b34] bg-[#fff5f3]"
                            : "border-[#d0e0ee] text-[#5b7894] hover:bg-white"
                        }`}
                        title={item.isVisible === false ? "Tampilkan" : "Sembunyikan"}
                      >
                        {item.isVisible === false ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg border border-[#d0e0ee] text-[#5b7894] hover:bg-white hover:text-[#1b5a9f]"
                        title="Edit Menu Utama"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteLinkItem(item.id)}
                        className="p-1.5 rounded-lg border border-[#fedad5] text-[#d64531] hover:bg-[#fff2f0]"
                        title="Hapus Menu"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* SUB-MENU ITEMS LIST (IF ANY) */}
                  {hasChildren && (
                    <div className="border-t border-[#eaf1f7] bg-[#f6f9fc] p-4 rounded-b-2xl">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#718b9f]">
                        Sub-menu dropdown saat di-hover:
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {children.map((child: any) => (
                          <div
                            key={child.id}
                            className="flex items-center justify-between rounded-xl border border-[#d8e4ef] bg-white p-2.5 shadow-xs"
                          >
                            <div>
                              <div className="text-xs font-bold text-[#233d59]">{child.label}</div>
                              <div className="text-[10px] text-[#6b859e] font-mono-ui">{child.href}</div>
                              {child.sublabel && (
                                <div className="text-[9px] text-[#8ea4b6] italic">{child.sublabel}</div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openEditChildModal(item.id, child)}
                                className="p-1 rounded-md text-[#5f7b96] hover:bg-[#eef5fa] hover:text-[#1b5a9f]"
                                title="Edit Sub-menu"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteChildItem(item.id, child.id)}
                                className="p-1 rounded-md text-[#c74c37] hover:bg-[#feeeeb]"
                                title="Hapus Sub-menu"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* TOP LEVEL LINK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-3">
              <h3 className="text-base font-bold text-[#233d59]">
                {linkForm.id ? "Edit Menu Utama" : "Tambah Menu Utama Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-[#6b859e] hover:bg-[#f0f5fa]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveLinkItem} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  Nama Menu (Label) *
                </label>
                <input
                  type="text"
                  required
                  value={linkForm.label}
                  onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
                  placeholder="Contoh: Aktuelles atau Kabar & Media"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  Sub-label / Keterangan Kategori
                </label>
                <input
                  type="text"
                  value={linkForm.sublabel || ""}
                  onChange={(e) => setLinkForm({ ...linkForm, sublabel: e.target.value })}
                  placeholder="Contoh: Kabar & Media"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  URL Tujuan (Halaman Default)
                </label>
                <input
                  type="text"
                  value={linkForm.href}
                  onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
                  placeholder="Contoh: /berita atau /layanan"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  Urutan Posisi (Nomor)
                </label>
                <input
                  type="number"
                  value={linkForm.order}
                  onChange={(e) => setLinkForm({ ...linkForm, order: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modalIsVisible"
                  checked={linkForm.isVisible !== false}
                  onChange={(e) => setLinkForm({ ...linkForm, isVisible: e.target.checked })}
                  className="h-4 w-4 rounded border-[#cbd5e1] text-[#1b5a9f]"
                />
                <label htmlFor="modalIsVisible" className="text-xs font-bold text-[#233d59]">
                  Tampilkan menu ini di Header
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#eef4f8] pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#d4e1ed] px-4 py-2 text-xs font-bold text-[#55718d] hover:bg-[#f6f9fc]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1b5a9f] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124882]"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MENU / CHILD LINK MODAL */}
      {isChildModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eef4f8] pb-3">
              <h3 className="text-base font-bold text-[#233d59]">
                {childForm.id ? "Edit Sub-menu Dropdown" : "Tambah Sub-menu Dropdown Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsChildModalOpen(false)}
                className="rounded-lg p-1 text-[#6b859e] hover:bg-[#f0f5fa]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveChildItem} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  Judul Sub-menu (Label) *
                </label>
                <input
                  type="text"
                  required
                  value={childForm.label}
                  onChange={(e) => setChildForm({ ...childForm, label: e.target.value })}
                  placeholder="Contoh: News, Presse, atau Medien"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  Keterangan Singkat / Subtitle
                </label>
                <input
                  type="text"
                  value={childForm.sublabel || ""}
                  onChange={(e) => setChildForm({ ...childForm, sublabel: e.target.value })}
                  placeholder="Contoh: Liputan Media & Video TV"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#455d78]">
                  URL Tujuan Halaman *
                </label>
                <input
                  type="text"
                  required
                  value={childForm.href}
                  onChange={(e) => setChildForm({ ...childForm, href: e.target.value })}
                  placeholder="Contoh: /berita, /media, /layanan"
                  className="mt-1 w-full rounded-xl border border-[#d6e2ed] bg-[#f9fcff] px-3.5 py-2 text-sm font-semibold text-[#213a56] focus:border-[#1b5a9f] focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#eef4f8] pt-4">
                <button
                  type="button"
                  onClick={() => setIsChildModalOpen(false)}
                  className="rounded-xl border border-[#d4e1ed] px-4 py-2 text-xs font-bold text-[#55718d] hover:bg-[#f6f9fc]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1b5a9f] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#124882]"
                >
                  Simpan Sub-menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CmsLayout>
  );
}
