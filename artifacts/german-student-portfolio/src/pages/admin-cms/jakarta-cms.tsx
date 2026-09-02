import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { Plus, Trash2, Edit2, MapPin, Building, Sparkles } from "lucide-react";

export default function JakartaCms() {
  const { data, isLoading, isError } = useCmsSection("jakarta");
  const updateMutation = useUpdateCmsSection("jakarta");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleHeaderChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleOfficeJakartaChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({
      ...prev,
      officeJakarta: { ...prev.officeJakarta, [key]: value },
    }));
  };

  const handleOfficeGermanyChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({
      ...prev,
      officeGermany: { ...prev.officeGermany, [key]: value },
    }));
  };

  const handleSave = () => {
    setError("");
    updateMutation.mutate(form, {
      onSuccess: () => setSaved(true),
      onError: (err: any) => setError(err.message || "Gagal menyimpan data Halaman Jakarta"),
    });
  };

  const handleReset = () => {
    if (window.confirm("Kembalikan informasi kantor ke standar awal?")) {
      resetMutation.mutate("jakarta", {
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
      title="Kelola Halaman Jakarta (Kantor & Kontak)"
      subtitle="Manajemen informasi kantor perwakilan German Institut Jakarta, kantor Großpaschleben Jerman, jam buka, kontak, dan 3 pilar asistensi."
      publicHref="/jakarta"
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
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Jakarta</h2>
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
              <label className="block text-xs font-bold text-[#45627c]">Subjudul / Deskripsi</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* KANTOR JAKARTA & KANTOR JERMAN */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* KANTOR JAKARTA */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-2 border-b border-[#eef4f8] pb-4">
              <MapPin className="text-[#d35f46]" size={18} />
              <h2 className="text-base font-bold text-[#233d59]">1. Kantor Jakarta (Indonesia)</h2>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Nama Institusi / Kantor</label>
                <input
                  type="text"
                  value={form.officeJakarta?.name || ""}
                  onChange={(e) => handleOfficeJakartaChange("name", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Gedung / Lokasi</label>
                <input
                  type="text"
                  value={form.officeJakarta?.building || ""}
                  onChange={(e) => handleOfficeJakartaChange("building", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  value={form.officeJakarta?.address || ""}
                  onChange={(e) => handleOfficeJakartaChange("address", e.target.value)}
                  className="field-input mt-1.5 text-xs"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Nomor WhatsApp / Telp</label>
                  <input
                    type="text"
                    value={form.officeJakarta?.phone || ""}
                    onChange={(e) => handleOfficeJakartaChange("phone", e.target.value)}
                    className="field-input mt-1.5 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Email Kontak</label>
                  <input
                    type="email"
                    value={form.officeJakarta?.email || ""}
                    onChange={(e) => handleOfficeJakartaChange("email", e.target.value)}
                    className="field-input mt-1.5 font-mono text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Jam Operasional Kantor</label>
                <input
                  type="text"
                  value={form.officeJakarta?.operatingHours || ""}
                  onChange={(e) => handleOfficeJakartaChange("operatingHours", e.target.value)}
                  className="field-input mt-1.5 text-xs"
                />
              </div>
            </div>
          </section>

          {/* KANTOR JERMAN */}
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-2 border-b border-[#eef4f8] pb-4">
              <Building className="text-[#1b5a9f]" size={18} />
              <h2 className="text-base font-bold text-[#233d59]">2. Kantor Pusat Jerman (AuLiD)</h2>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Nama Kantor di Jerman</label>
                <input
                  type="text"
                  value={form.officeGermany?.name || ""}
                  onChange={(e) => handleOfficeGermanyChange("name", e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  value={form.officeGermany?.address || ""}
                  onChange={(e) => handleOfficeGermanyChange("address", e.target.value)}
                  className="field-input mt-1.5 text-xs"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Telepon Jerman</label>
                  <input
                    type="text"
                    value={form.officeGermany?.phone || ""}
                    onChange={(e) => handleOfficeGermanyChange("phone", e.target.value)}
                    className="field-input mt-1.5 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#45627c]">Email Jerman</label>
                  <input
                    type="email"
                    value={form.officeGermany?.email || ""}
                    onChange={(e) => handleOfficeGermanyChange("email", e.target.value)}
                    className="field-input mt-1.5 font-mono text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#45627c]">Jam Operasional Jerman</label>
                <input
                  type="text"
                  value={form.officeGermany?.operatingHours || ""}
                  onChange={(e) => handleOfficeGermanyChange("operatingHours", e.target.value)}
                  className="field-input mt-1.5 text-xs"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </CmsLayout>
  );
}
