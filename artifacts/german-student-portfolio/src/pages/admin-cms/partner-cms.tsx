import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { UserCheck, Building2, ShieldCheck, Mail, Phone, Sparkles } from "lucide-react";

export default function PartnerCms() {
  const { data, isLoading, isError } = useCmsSection("partner");
  const updateMutation = useUpdateCmsSection("partner");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleHeaderChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleContactPersonChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({
      ...prev,
      contactPerson: { ...prev.contactPerson, [key]: value },
    }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => setSaved(true),
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Untuk Partner"),
    });
  };

  const handleReset = () => {
    resetMutation.mutate("partner", {
      onSuccess: (res: any) => {
        if (res?.data) {
          setForm(res.data);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan konfigurasi partner");
        setShowResetConfirm(false);
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

  return (
    <CmsLayout
      title="Kelola Halaman Untuk Partner (AG-Anfrage)"
      subtitle="Manajemen kontak perwakilan kemitraan di Jerman (Wolfgang Nickel), informasi B2B untuk pemberi kerja, dan teks formulir inquiry."
      publicHref="/ag-anfrage"
      isSaving={updateMutation.isPending}
      isSaved={saved}
      errorMessage={error}
      onSave={handleSave}
      onReset={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isPending}
    >
      <div className="space-y-6">
        {/* HEADER SECTION */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="border-b border-[#eef4f8] pb-4">
            <SectionEyebrow>Tampilan Halaman</SectionEyebrow>
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Partner (Employer)</h2>
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
              <label className="block text-xs font-bold text-[#45627c]">Subjudul / Deskripsi B2B</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* KONTAK PERWAKILAN DI JERMAN */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-[#eef4f8] pb-4">
            <UserCheck className="text-[#1b5a9f]" size={18} />
            <h2 className="text-base font-bold text-[#233d59]">Profil Perwakilan Partner di Jerman</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Nama Perwakilan</label>
              <input
                type="text"
                value={form.contactPerson?.name || ""}
                onChange={(e) => handleContactPersonChange("name", e.target.value)}
                className="field-input mt-1.5 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Jabatan / Peran</label>
              <input
                type="text"
                value={form.contactPerson?.role || ""}
                onChange={(e) => handleContactPersonChange("role", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Nomor Telepon Jerman</label>
              <input
                type="text"
                value={form.contactPerson?.phone || ""}
                onChange={(e) => handleContactPersonChange("phone", e.target.value)}
                className="field-input mt-1.5 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Email Korespondensi</label>
              <input
                type="email"
                value={form.contactPerson?.email || ""}
                onChange={(e) => handleContactPersonChange("email", e.target.value)}
                className="field-input mt-1.5 font-mono text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Lokasi / Deskripsi Singkat</label>
              <textarea
                rows={2}
                value={form.contactPerson?.description || ""}
                onChange={(e) => handleContactPersonChange("description", e.target.value)}
                className="field-input mt-1.5 text-xs"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Data Halaman Partner"
        description="Kembalikan semua teks header dan informasi kontak perwakilan di Jerman ke konfigurasi standar awal?"
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
