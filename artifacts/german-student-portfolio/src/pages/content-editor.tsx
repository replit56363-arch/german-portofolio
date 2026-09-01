import { useEffect, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Eye, FileText, Save } from "lucide-react";
import { Link } from "wouter";
import { getGetDashboardSummaryQueryKey, getGetSiteContentQueryKey, useGetSiteContent, useUpdateSiteContent, type SiteContentUpdate } from "@workspace/api-client-react";
import { SectionEyebrow } from "@/components/portfolio-ui";

const editableFields: Array<{ key: keyof SiteContentUpdate; label: string; hint: string; multiline?: boolean }> = [
  { key: "eyebrow", label: "Eyebrow", hint: "Konteks pendek di atas judul" },
  { key: "title", label: "Judul utama", hint: "Pesan utama halaman internal" },
  { key: "description", label: "Deskripsi", hint: "Satu atau dua kalimat penjelas", multiline: true },
  { key: "primaryCta", label: "CTA utama", hint: "Arah ke katalog siswa" },
  { key: "secondaryCta", label: "CTA sekunder", hint: "Aksi pendamping untuk admin" },
  { key: "introLabel", label: "Label pengantar", hint: "Judul kecil bagian pengantar" },
  { key: "introText", label: "Teks pengantar", hint: "Kalimat pembuka untuk partner", multiline: true },
  { key: "trustTitle", label: "Judul kepercayaan", hint: "Penutup untuk placement partner" },
  { key: "trustText", label: "Teks kepercayaan", hint: "Keterangan singkat soal kredibilitas", multiline: true },
];

const statFields: Array<{ value: keyof SiteContentUpdate; label: keyof SiteContentUpdate; number: string }> = [
  { value: "statOneValue", label: "statOneLabel", number: "01" },
  { value: "statTwoValue", label: "statTwoLabel", number: "02" },
  { value: "statThreeValue", label: "statThreeLabel", number: "03" },
  { value: "statFourValue", label: "statFourLabel", number: "04" },
];

export default function ContentEditor() {
  const queryClient = useQueryClient();
  const contentQuery = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const updateContent = useUpdateSiteContent();
  const [form, setForm] = useState<SiteContentUpdate>({});
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (contentQuery.data) {
      const { id: _id, updatedAt: _updatedAt, ...editableContent } = contentQuery.data;
      setForm(editableContent);
    }
  }, [contentQuery.data]);

  const updateField = (key: keyof SiteContentUpdate, value: string) => {
    setSaved(false);
    setFormError("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveContent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredKeys = [...editableFields.map((field) => field.key), ...statFields.flatMap((stat) => [stat.value, stat.label])];
    const missing = requiredKeys.some((key) => !String(form[key] ?? "").trim());
    if (missing) {
      setFormError("Semua bidang konten perlu diisi sebelum disimpan.");
      setSaved(false);
      return;
    }
    setFormError("");
    setSaved(false);
    updateContent.mutate({ data: form }, {
      onSuccess: () => {
        setSaved(true);
        void queryClient.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
        void queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
      },
    });
  };

  if (contentQuery.isLoading) {
    return <div className="space-y-6" aria-label="Memuat editor konten"><div className="h-28 rounded-2xl shimmer" /><div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="h-[620px] rounded-2xl shimmer" /><div className="h-[620px] rounded-2xl shimmer" /></div></div>;
  }

  if (contentQuery.isError || !contentQuery.data) {
    return <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-[#f1d0cb] bg-[#fff8f5] p-8 text-center" data-testid="status-content-error"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f9e5df] text-[#b66154]"><FileText size={22} /></div><h1 className="mt-4 text-xl font-bold text-[#3d4350]">Editor tidak tersedia</h1><p className="mt-2 text-sm leading-6 text-[#7d8794]">Konten landing belum dapat dimuat. Coba lagi untuk mengambil data terbaru.</p><button type="button" onClick={() => void contentQuery.refetch()} className="mt-5 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-sm font-bold text-white" data-testid="button-retry-content">Coba lagi</button></div>;
  }

  return (
    <div className="space-y-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#5d7891] hover:text-[#1b5a9f]" data-testid="link-back-landing"><ArrowLeft size={14} /> Kembali ke beranda</Link><SectionEyebrow>Administrasi konten</SectionEyebrow><h1 className="mt-2 text-3xl font-bold tracking-[-.05em] text-[#263f5b]" data-testid="text-content-title">Atur suara landing page</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#71869a]">Perbarui copy yang dilihat placement partner. Perubahan tersimpan ke konten internal dan langsung tampil di beranda.</p></div>
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#d7e3eb] bg-white px-4 py-2.5 text-sm font-bold text-[#4d6982] hover:border-[#a9c8d9]" data-testid="link-preview-content"><Eye size={16} /> Lihat pratinjau</Link>
      </header>

      {formError && <div className="rounded-xl border border-[#f1d0cb] bg-[#fff8f5] px-4 py-3 text-sm font-semibold text-[#a9584d]" role="alert" data-testid="status-content-validation">{formError}</div>}
      {updateContent.isError && <div className="rounded-xl border border-[#f1d0cb] bg-[#fff8f5] px-4 py-3 text-sm font-semibold text-[#a9584d]" role="alert" data-testid="status-content-save-error">Konten belum tersimpan. Periksa koneksi lalu coba lagi.</div>}
      {saved && <div className="flex items-center gap-2 rounded-xl border border-[#bfe6dc] bg-[#effbf7] px-4 py-3 text-sm font-semibold text-[#21765f]" role="status" data-testid="status-content-saved"><Check size={17} /> Perubahan konten berhasil disimpan.</div>}

      <form onSubmit={saveContent} className="grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
            <div className="flex items-start justify-between border-b border-[#e8eef3] pb-5"><div><SectionEyebrow>Pesan inti</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#2b4661]">Hero dan pengantar</h2></div><span className="font-mono-ui text-[10px] text-[#93a4b4]">01 / 03</span></div>
            <div className="mt-6 grid gap-5">
              {editableFields.slice(0, 7).map((field) => (
                <label key={field.key} className={field.multiline ? "block" : "block"}>
                  <span className="flex items-baseline justify-between gap-3 text-xs font-bold text-[#45627c]"><span>{field.label}</span><span className="font-normal text-[#9aabba]">{field.hint}</span></span>
                  {field.multiline ? <textarea value={String(form[field.key] ?? "")} onChange={(event) => updateField(field.key, event.target.value)} rows={3} className="field-input mt-2 resize-y" data-testid={`input-content-${field.key}`} /> : <input value={String(form[field.key] ?? "")} onChange={(event) => updateField(field.key, event.target.value)} className="field-input mt-2" data-testid={`input-content-${field.key}`} />}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
            <div className="flex items-start justify-between border-b border-[#e8eef3] pb-5"><div><SectionEyebrow>Angka pendukung</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#2b4661]">Empat highlight</h2></div><span className="font-mono-ui text-[10px] text-[#93a4b4]">02 / 03</span></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {statFields.map((stat) => (
                <div key={stat.value} className="rounded-xl border border-[#e5edf2] bg-[#f8fbfd] p-4">
                  <span className="font-mono-ui text-[10px] font-bold text-[#78a0b5]">{stat.number}</span>
                  <label className="mt-3 block text-xs font-bold text-[#45627c]">Nilai<input value={String(form[stat.value] ?? "")} onChange={(event) => updateField(stat.value, event.target.value)} className="field-input mt-2 bg-white font-mono-ui" data-testid={`input-content-${stat.value}`} /></label>
                  <label className="mt-3 block text-xs font-bold text-[#45627c]">Label<input value={String(form[stat.label] ?? "")} onChange={(event) => updateField(stat.label, event.target.value)} className="field-input mt-2 bg-white" data-testid={`input-content-${stat.label}`} /></label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
            <div className="flex items-start justify-between border-b border-[#e8eef3] pb-5"><div><SectionEyebrow>Penutup</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#2b4661]">Kepercayaan partner</h2></div><span className="font-mono-ui text-[10px] text-[#93a4b4]">03 / 03</span></div>
            <div className="mt-6 grid gap-5">
              {editableFields.slice(7).map((field) => <label key={field.key} className="block"><span className="flex items-baseline justify-between gap-3 text-xs font-bold text-[#45627c]"><span>{field.label}</span><span className="font-normal text-[#9aabba]">{field.hint}</span></span><textarea value={String(form[field.key] ?? "")} onChange={(event) => updateField(field.key, event.target.value)} rows={3} className="field-input mt-2 resize-y" data-testid={`input-content-${field.key}`} /></label>)}
            </div>
          </section>
        </div>

        <aside className="sticky top-[94px] rounded-2xl border border-[#dce7ef] bg-[#173b65] p-6 text-[#f4f8fc] shadow-[0_18px_40px_rgba(23,59,101,.14)] sm:p-7">
          <div className="flex items-center justify-between"><div><SectionEyebrow>Pratinjau</SectionEyebrow><h2 className="mt-1 text-xl font-bold">Beranda internal</h2></div><Eye size={18} className="text-[#77d8e8]" /></div>
          <div className="mt-7 border-t border-[#456889] pt-6"><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.15em] text-[#77d8e8]">{String(form.eyebrow ?? "Eyebrow")}</p><h3 className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-.06em]" data-testid="preview-content-title">{String(form.title ?? "Judul landing")}</h3><p className="mt-4 text-sm leading-6 text-[#b7cde0]">{String(form.description ?? "Deskripsi landing")}</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-lg bg-[#f5c36f] px-3 py-2 text-xs font-bold text-[#253d5a]">{String(form.primaryCta ?? "CTA utama")}</span><span className="rounded-lg border border-[#6181a0] px-3 py-2 text-xs font-bold text-[#e5f0f6]">{String(form.secondaryCta ?? "CTA sekunder")}</span></div></div>
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#456889] pt-5">{statFields.map((stat) => <div key={stat.value}><p className="font-mono-ui text-xl font-bold text-[#f5c36f]">{String(form[stat.value] ?? "—")}</p><p className="mt-1 text-[10px] leading-4 text-[#b7cde0]">{String(form[stat.label] ?? "Label")}</p></div>)}</div>
          <button type="submit" disabled={updateContent.isPending} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#70d6e8] px-4 py-3.5 text-sm font-bold text-[#173b65] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" data-testid="button-save-content"><Save size={17} />{updateContent.isPending ? "Menyimpan..." : "Simpan perubahan"}</button>
          <p className="mt-3 text-center text-[11px] leading-5 text-[#9eb8ce]">Perubahan ditampilkan ke pengguna internal setelah berhasil disimpan.</p>
        </aside>
      </form>
    </div>
  );
}