import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Check,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

function JakartaLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function JakartaArtwork() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-[445px] overflow-hidden rounded-[1.8rem] bg-[#f4c76b] p-7 sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-[#d35f46]/75" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[34px] border-[#9ccabc]/90" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative z-10 flex items-start justify-between">
        <JakartaLabel>{t("about_page.art_label", "Ruang Belajar ILD Medan")}</JakartaLabel>
        <span className="rounded-full border border-[#173d3a]/25 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#315c54]">MEDAN · 03°35′N</span>
      </div>
      <div className="absolute bottom-10 left-8 right-8 z-10 sm:left-10 sm:right-10">
        <div className="mb-5 flex items-end gap-2">
          <div className="h-28 w-12 rounded-t-[1rem] bg-[#173d3a]" />
          <div className="h-44 w-16 rounded-t-[1.2rem] bg-[#244f4a]" />
          <div className="h-32 w-14 rounded-t-[1rem] bg-[#d86d50]" />
          <div className="h-24 w-10 rounded-t-[.8rem] bg-[#173d3a]" />
          <div className="h-36 w-16 rounded-t-[1.1rem] bg-[#9ccabc]" />
        </div>
        <div className="border-t-2 border-[#173d3a] pt-5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="font-['Fraunces'] text-5xl font-semibold leading-[.9] tracking-[-0.06em] text-[#173d3a]">Medan</p>
              <p className="mt-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6b64]">{t("about_page.art_sub", "Tempat pertama untuk memulai bimbingan")}</p>
            </div>
            <Globe2 size={38} strokeWidth={1.2} className="text-[#d35f46]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Jakarta() {
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();
  const { data: cmsData } = useCmsSection("jakarta");

  useEffect(() => {
    document.title = `${t("about.eyebrow", "Tentang ICH LIEBE DEUTSCH MEDAN")} — ICH LIEBE DEUTSCH MEDAN`;
  }, [language, t]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("name") ?? ""} ${form.get("surname") ?? ""}`.trim();
    const subject = `Pertanyaan Program dari ${name}`;
    const body = [
      `Nama: ${name}`,
      `Email: ${form.get("email") ?? ""}`,
      `Telepon: ${form.get("phone") ?? ""}`,
      `Program yang diminati: ${form.get("company") ?? ""}`,
      "",
      "Pesan:",
      `${form.get("message") ?? ""}`,
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:${cmsData?.contactEmail || "ichliebedtschmedan@gmail.com"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const steps = [
    [
      "01",
      t("about_page.step1_title", "Menjawab Pertanyaan & Pemetaan Bakat"),
      t("about_page.step1_text", "Tentang syarat, pilihan program (Ausbildung, Au Pair, FSJ, G to G, Kuliah), kemampuan bahasa, dan realitas kehidupan di Jerman."),
    ],
    [
      "02",
      t("about_page.step2_title", "Pelatihan Bahasa Terstruktur"),
      t("about_page.step2_text", "Materi A1 hingga B1/B2 berstandar Goethe-Institut dengan kelas interaktif dan intensif langsung di Medan."),
    ],
    [
      "03",
      t("about_page.step3_title", "Penghubung Peluang Resmi"),
      t("about_page.step3_text", "Bimbingan berkas, kontrak kerja resmi Jerman, hingga pengurusan visa nasional dan pembekalan budaya."),
    ],
  ];

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/jakarta" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]">
              <ArrowLeft size={14} /> {t("common.back_home", "Kembali ke beranda")}
            </Link>
            <JakartaLabel>{t("about.eyebrow", "Tentang ICH LIEBE DEUTSCH MEDAN")}</JakartaLabel>
            <h1 className="mt-6 max-w-xl font-['Fraunces'] text-5xl font-medium leading-[.92] tracking-[-0.07em] text-[#173d3a] sm:text-7xl lg:text-8xl">
              {t("about.title", "Tempat Pertama untuk Memulai Langkah ke Jerman.")}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {t("about.description", "Kami adalah lembaga kursus bahasa Jerman terdaftar di Medan yang membantu mempersiapkan kemampuan bahasa & kemandirian hidup di Jerman. Didirikan tahun 2024 oleh alumni UNIMED dengan 6 tahun pengalaman hidup di Jerman.")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://wa.me/6282127324453?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN,%20saya%20ingin%20konsultasi%20program%20kursus%20bahasa%20Jerman"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]"
              >
                <MessageCircle size={16} /> WhatsApp: 082127324453
              </a>
              <a href="#formulir" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">
                {t("about.form_submit", "Kirim Pesan Sekarang")} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <JakartaArtwork />
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><UsersRound size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("about_page.highlight1_title", "Untuk Siapa?")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("about_page.highlight1_text", "Calon peserta dan keluarga yang ingin bimbingan transparan dan terarah.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Clock3 size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("about_page.highlight2_title", "5 Jalur Resmi")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("about_page.highlight2_text", "Ausbildung, Au Pair, FSJ/BFD, G to G Perawat, dan Kuliah/Studium.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><MessageCircle size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("about_page.highlight3_title", "Pengalaman Nyata")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("about_page.highlight3_text", "Dipandu oleh pendiri dengan pengalaman 6 tahun hidup mandiri di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32">
          <div>
            <JakartaLabel>{t("about_page.what_we_do_eyebrow", "Yang Kami Lakukan")}</JakartaLabel>
            <h2 className="mt-6 max-w-md font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em]">
              {t("about_page.what_we_do_title", "Mendampingi setiap tahap dengan teliti dan penuh tanggung jawab.")}
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
              {t("about_page.what_we_do_text", "Dari Medan, kami membantu peserta menguasai bahasa Jerman sekaligus memahami budaya kerja dan kemandirian hidup.")}
            </p>
          </div>
          <div className="grid gap-0 border-t border-[#173d3a]/20">
            {steps.map(([number, title, text]) => (
              <div key={number} className="grid gap-5 border-b border-[#173d3a]/20 py-6 sm:grid-cols-[58px_1fr]">
                <span className="font-mono-ui text-[11px] font-bold text-[#d35f46]">{number}</span>
                <div>
                  <h3 className="font-['Fraunces'] text-3xl font-semibold leading-none tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#66817a]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="formulir" className="bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <JakartaLabel light>{t("about.form_title", "Konsultasi & Hubungi Kami")}</JakartaLabel>
              <h2 className="mt-6 max-w-md font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em]">
                {t("about_page.form_title", "Mulai percakapan Anda bersama kami hari ini.")}
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#a9c5bb]">
                {t("about.form_subtitle", "Kirimkan pertanyaan seputar kursus bahasa Jerman atau program ke Jerman (Ausbildung, Au Pair, FSJ, G to G, Kuliah). Tim kami akan segera merespons.")}
              </p>
              <div className="mt-9 space-y-4 border-t border-[#47726b] pt-5">
                <a href="tel:082127324453" className="flex items-center gap-3 text-sm font-semibold text-[#f5eee3] hover:text-[#f4c76b]">
                  <Phone size={17} className="text-[#f4c76b]" /> 082127324453
                </a>
                <a href="mailto:ichliebedtschmedan@gmail.com" className="flex items-center gap-3 text-sm font-semibold text-[#f5eee3] hover:text-[#f4c76b]">
                  <Mail size={17} className="text-[#f4c76b]" /> ichliebedtschmedan@gmail.com
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-[#f5eee3] p-6 text-[#173d3a] sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("about.form_name", "Nama Lengkap")} <input name="name" required placeholder={t("about.form_name", "Nama Lengkap")} className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("form.phone", "Nomor WhatsApp")} <input name="phone" type="tel" required placeholder="+62 8..." className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("about.form_email", "Email")} <input name="email" type="email" required placeholder="nama@email.com" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("about.form_program", "Program yang Diminati")} <input name="company" required placeholder="Ausbildung / Au Pair / FSJ / G to G / Kuliah" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  {t("about.form_message", "Tuliskan pertanyaan atau rencana Anda...")} <textarea name="message" required placeholder={t("about.form_message", "Tuliskan pertanyaan atau rencana Anda...")} rows={4} className="resize-y rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
              </div>
              <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-[#66817a]">
                <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#d35f46]" />
                {t("form.consent", "Saya menyetujui kebijakan privasi dan mengizinkan data ini diproses untuk konsultasi.")}
              </label>
              <button type="submit" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#fff8ee] transition-transform hover:-translate-y-1">
                {submitted ? t("about.form_success", "Pesan Anda berhasil disiapkan!") : t("about.form_submit", "Kirim Pesan Sekarang")} {submitted ? <Check size={16} /> : <Send size={16} />}
              </button>
              {submitted && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#55736b]">
                  <ShieldCheck size={15} className="text-[#d35f46]" /> {t("form.fallback_notice", "Jika aplikasi email tidak terbuka, hubungi langsung via WhatsApp ke 082127324453.")}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <JakartaLabel>{t("about.info_address_label", "Alamat Resmi")}</JakartaLabel>
              <h2 className="mt-6 font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-none tracking-[-0.065em]">{t("about_page.location_title", "Alamat Resmi & Kontak Lembaga")}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#66817a]">{t("about_page.location_subtitle", "Kunjungi lokasi kami di Medan Polonia atau hubungi kami via WhatsApp.")}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.4rem] bg-[#f4c76b] p-7">
              <MapPin size={22} className="text-[#d35f46]" />
              <h3 className="mt-12 font-['Fraunces'] text-3xl font-semibold">ICH LIEBE DEUTSCH MEDAN</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#4f6b64]">
                Jl. Ternak II No. 39, Medan Polonia<br />
                Kota Medan, Sumatera Utara<br />
                {t("about_page.legal_status", "Lembaga Kursus Terdaftar & Berizin Resmi (2024)")}
              </p>
              <a href="tel:082127324453" className="mt-7 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] hover:text-[#d35f46]">
                <Phone size={14} /> 082127324453
              </a>
            </article>
            <article className="rounded-[1.4rem] bg-[#e7f0e9] p-7">
              <Building2 size={22} className="text-[#d35f46]" />
              <h3 className="mt-12 font-['Fraunces'] text-3xl font-semibold">{t("about_page.curriculum_title", "Konsultasi & Informasi Kursus")}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#66817a]">
                {t("about_page.curriculum_desc", "Kurikulum Bahasa Jerman A1-B2 Goethe Standard, Bimbingan 5 Program Resmi, Didirikan oleh Sarjana UNIMED (6 Tahun di Jerman).")}
              </p>
              <a href="mailto:ichliebedtschmedan@gmail.com" className="mt-7 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] hover:text-[#d35f46]">
                <Mail size={14} /> ichliebedtschmedan@gmail.com
              </a>
            </article>
          </div>
        </section>

        <section className="mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <JakartaLabel light>{t("cta_banner.eyebrow", "Langkah Berikutnya")}</JakartaLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-4xl sm:text-6xl font-medium leading-[.94] tracking-[-0.065em]">
              {t("about_page.banner_title", "Masa depan yang jauh, dimulai dari percakapan dekat.")}
            </h2>
            <a href="https://wa.me/6282127324453" target="_blank" rel="noreferrer" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {t("common.whatsapp_consult", "Konsultasi WhatsApp")} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
