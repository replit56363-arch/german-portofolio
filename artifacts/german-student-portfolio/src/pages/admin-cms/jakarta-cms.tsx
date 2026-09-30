import { useState, useEffect } from "react";
import { useCmsSection, useUpdateCmsSection, useResetCms } from "@/lib/use-cms";
import { CmsLayout } from "./cms-layout";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function JakartaCms() {
  const { data, isLoading } = useCmsSection("jakarta");
  const updateMutation = useUpdateCmsSection("jakarta");
  const resetMutation = useResetCms();

  const [form, setForm] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (data) {
      const initial = { ...data };
      delete initial.officeGermany;
      if (!initial.officeJakarta) {
        initial.officeJakarta = {};
      }
      if (!initial.officeJakarta.address) {
        initial.officeJakarta.address = "Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara";
      }
      setForm(initial);
    }
  }, [data]);

  const handleHeaderChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleOfficeChange = (key: string, value: any) => {
    setSaved(false);
    setError("");
    setForm((prev: any) => ({
      ...prev,
      officeJakarta: {
        ...prev.officeJakarta,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    setError("");
    const cleaned = { ...form };
    delete cleaned.officeGermany;
    if (!cleaned.officeJakarta?.address) {
      cleaned.officeJakarta = {
        ...cleaned.officeJakarta,
        address: "Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara",
      };
    }
    updateMutation.mutate(cleaned, {
      onSuccess: () => setSaved(true),
      onError: (err: any) => setError(err.message || "Gagal menyimpan data informasi kantor"),
    });
  };

  const handleReset = () => {
    resetMutation.mutate("jakarta", {
      onSuccess: (res: any) => {
        if (res?.data) {
          const resetData = { ...res.data };
          delete resetData.officeGermany;
          setForm(resetData);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setShowResetConfirm(false);
      },
      onError: (err: any) => {
        setError(err.message || "Gagal mengembalikan konfigurasi kantor");
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
      title="Kelola Halaman Medan (Lokasi & Kontak)"
      subtitle="Manajemen informasi kantor resmi Jl. Ternak II No. 39 Medan Polonia, jam kerja operasional, kontak telepon WhatsApp, email, dan identitas lembaga."
      publicHref="/medan"
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
            <h2 className="text-lg font-bold text-[#233d59]">Header & Banner Informasi Lembaga</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Eyebrow</label>
              <input
                type="text"
                value={form.headerEyebrow || ""}
                onChange={(e) => handleHeaderChange("headerEyebrow", e.target.value)}
                placeholder="Tentang Ich Liebe Deutsch Medan"
                className="field-input mt-1.5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Judul Utama</label>
              <input
                type="text"
                value={form.headerTitle || ""}
                onChange={(e) => handleHeaderChange("headerTitle", e.target.value)}
                placeholder="Mengenal Ich Liebe Deutsch Medan"
                className="field-input mt-1.5 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#45627c]">Subjudul / Deskripsi</label>
              <textarea
                rows={2}
                value={form.headerSubtitle || ""}
                onChange={(e) => handleHeaderChange("headerSubtitle", e.target.value)}
                placeholder="Lembaga kursus bahasa Jerman terdaftar dan memiliki izin operasional sejak tahun 2024 di Kota Medan."
                className="field-input mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* KANTOR RESMI MEDAN (Jl. Ternak II No. 39, Medan Polonia) */}
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between border-b border-[#eef4f8] pb-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#fbeee6] text-[#d35f46]">
                <MapPin size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#233d59]">Kantor Resmi Lembaga (Medan)</h2>
                <p className="text-xs text-[#63809e]">Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara</p>
              </div>
            </div>
            <span className="rounded-full bg-[#f0fbf8] px-3 py-1 text-[11px] font-bold text-[#1a8268]">
              Kantor Utama & Operasional
            </span>
          </div>

          <div className="mt-6 space-y-4 max-w-3xl">
            <div>
              <label className="block text-xs font-bold text-[#45627c]">Nama Institusi / Lembaga</label>
              <input
                type="text"
                value={form.officeJakarta?.name || ""}
                onChange={(e) => handleOfficeChange("name", e.target.value)}
                placeholder="ICH LIEBE DEUTSCH MEDAN"
                className="field-input mt-1.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#45627c]">Wilayah / Gedung Lokasi</label>
              <input
                type="text"
                value={form.officeJakarta?.building || ""}
                onChange={(e) => handleOfficeChange("building", e.target.value)}
                placeholder="Medan Polonia"
                className="field-input mt-1.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#45627c]">Alamat Lengkap</label>
              <textarea
                rows={2}
                value={form.officeJakarta?.address || ""}
                onChange={(e) => handleOfficeChange("address", e.target.value)}
                placeholder="Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara"
                className="field-input mt-1.5 font-medium text-xs text-[#173d3a]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#45627c]">
                  <Phone size={13} className="text-[#d35f46]" />
                  Nomor WhatsApp / Telp
                </label>
                <input
                  type="text"
                  value={form.officeJakarta?.phone || ""}
                  onChange={(e) => handleOfficeChange("phone", e.target.value)}
                  placeholder="082127324453"
                  className="field-input mt-1.5 font-mono text-xs"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#45627c]">
                  <Mail size={13} className="text-[#d35f46]" />
                  Email Kontak
                </label>
                <input
                  type="email"
                  value={form.officeJakarta?.email || ""}
                  onChange={(e) => handleOfficeChange("email", e.target.value)}
                  placeholder="ichliebedtschmedan@gmail.com"
                  className="field-input mt-1.5 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#45627c]">
                <Clock size={13} className="text-[#d35f46]" />
                Jam Operasional Kantor
              </label>
              <input
                type="text"
                value={form.officeJakarta?.operatingHours || ""}
                onChange={(e) => handleOfficeChange("operatingHours", e.target.value)}
                placeholder="Senin – Sabtu: 08:30 – 17:00 WIB"
                className="field-input mt-1.5 text-xs"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Data Informasi Kantor & Kontak"
        description="Kembalikan informasi kantor resmi Jl. Ternak II No. 39 Medan Polonia dan detail kontak ke pengaturan standar awal?"
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
