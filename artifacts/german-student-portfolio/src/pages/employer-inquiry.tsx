import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Check,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

function EmployerLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function ContactPortrait() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-[370px] overflow-hidden rounded-[1.7rem] bg-[#f4c76b] p-7 sm:p-10">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[26px] border-[#d35f46]/75" />
      <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[#9ccabc]/80" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative z-10 flex items-start justify-between">
        <EmployerLabel>{t("employer.contact_label", "Konsultasi Partner")}</EmployerLabel>
        <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6b64]">
          ID · MEDAN
        </span>
      </div>
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between gap-5 sm:left-10 sm:right-10">
        <div>
          <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-[#173d3a] bg-[#d86d50] text-[#173d3a] shadow-[5px_5px_0_#173d3a]">
            <UserRound size={58} strokeWidth={1.1} />
          </div>
          <p className="mt-6 font-['Fraunces'] text-3xl sm:text-4xl font-semibold leading-none tracking-[-0.05em] text-[#173d3a]">
            ICH LIEBE{`\n`}DEUTSCH
          </p>
        </div>
        <div className="mb-1 max-w-[170px] border-l border-[#173d3a]/30 pl-4 text-xs sm:text-sm leading-6 text-[#4f6b64]">
          {t("employer.contact_note", "Percakapan awal untuk memahami kebutuhan dan potensi kerja sama tim Anda.")}
        </div>
      </div>
    </div>
  );
}

export default function EmployerInquiry() {
  const { language, t } = useLanguage();
  const { data: cmsData } = useCmsSection("employer");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${t("nav.about_partner", "Konsultasi Partner")} — ICH LIEBE DEUTSCH MEDAN`;
  }, [language, t]);

  const targetEmail = cmsData?.contactEmail || "ichliebedtschmedan@gmail.com";
  const targetPhone = cmsData?.contactPhone || "082127324453";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("name") ?? ""} ${form.get("surname") ?? ""}`.trim();
    const company = form.get("company") ?? "";
    const subject = `Permintaan Informasi Kemitraan dari ${company} (${name})`;
    const body = [
      `Nama: ${name}`,
      `Perusahaan / Institusi: ${company}`,
      `Email: ${form.get("email") ?? ""}`,
      `Telepon: ${form.get("phone") ?? ""}`,
      "",
      "Pesan:",
      `${form.get("message") ?? ""}`,
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/ag-anfrage" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/layanan" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]">
              <ArrowLeft size={14} /> {t("employer.back_services", "Kembali ke layanan")}
            </Link>
            <EmployerLabel>{t("employer.eyebrow", "Untuk Pemberi Kerja & Institusi")}</EmployerLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-5xl font-medium leading-[.92] tracking-[-0.075em] sm:text-7xl lg:text-8xl">
              {t("employer.title", "Temukan orang yang tepat untuk tim Anda.")}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {t("employer.description", "Mari mulai dengan percakapan informasi. Tim kami akan menjelaskan cara kerja, standar kemampuan bahasa, dan langkah bimbingan peserta Ausbildung, Au Pair, atau tenaga profesional.")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${targetPhone.replace(/\s+/g, "")}`}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]"
              >
                <Phone size={16} /> {targetPhone}
              </a>
              <a href="#formulir-partner" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">
                {t("employer.fill_form", "Isi formulir")} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <ContactPortrait />
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><MessageSquareText size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("employer.col1_title", "Informasi yang Jelas")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("employer.col1_text", "Pahami proses dan standar kualifikasi sebelum mengambil keputusan kerja sama.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Building2 size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("employer.col2_title", "Disesuaikan Kebutuhan")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("employer.col2_text", "Percakapan berfokus pada posisi dan standar lingkungan kerja yang nyata.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><ShieldCheck size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("employer.col3_title", "Respons Cepat")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("employer.col3_text", "Tim kami di Medan siap menjawab dan merancang program kerja sama yang transparan.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32">
          <div>
            <EmployerLabel>{t("employer.contact_label", "Kontak Langsung")}</EmployerLabel>
            <h2 className="mt-6 max-w-md font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em]">
              {t("employer.contact_title", "Satu percakapan untuk melihat peluang baru.")}
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
              {t("employer.contact_desc", "Untuk informasi awal, telepon kantor kami atau kirim pesan. Tim kami akan menjelaskan bidang kerja dan pendekatan yang paling sesuai untuk institusi Anda.")}
            </p>
            <div className="mt-9 border-t border-[#173d3a]/20 pt-5">
              <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#829891]">
                {t("common.location_medan", "Medan, Sumatera Utara")}
              </p>
              <p className="mt-3 font-['Fraunces'] text-2xl sm:text-3xl font-semibold">
                ICH LIEBE DEUTSCH MEDAN
              </p>
              <a href={`tel:${targetPhone.replace(/\s+/g, "")}`} className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#486961] hover:text-[#d35f46]">
                <Phone size={16} className="text-[#d35f46]" /> {targetPhone}
              </a>
              <a href={`mailto:${targetEmail}`} className="mt-3 flex items-center gap-3 text-sm font-semibold text-[#486961] hover:text-[#d35f46]">
                <Mail size={16} className="text-[#d35f46]" /> {targetEmail}
              </a>
            </div>
          </div>
          <div id="formulir-partner" className="rounded-[1.5rem] bg-[#173d3a] p-6 text-[#f5eee3] sm:p-9">
            <EmployerLabel light>{t("employer.form_label", "Formulir Kemitraan")}</EmployerLabel>
            <h2 className="mt-6 font-['Fraunces'] text-3xl sm:text-4xl font-medium leading-[.95] tracking-[-0.055em]">
              {t("employer.form_heading", "Ceritakan kebutuhan institusi Anda.")}
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("about.form_name", "Nama")} <input name="name" required placeholder={t("about.form_name", "Nama")} className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("form.surname", "Nama Belakang / Posisi")} <input name="surname" required placeholder={t("form.surname", "Nama Belakang / Posisi")} className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  {t("employer.form_message_label", "Pesan atau Posisi")} <textarea name="message" required placeholder={t("employer.form_message_placeholder", "Posisi atau kebutuhan peserta yang ingin Anda diskusikan...")} rows={4} className="resize-y rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("about.form_email", "Email")} <input name="email" type="email" required placeholder="nama@perusahaan.com" className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  {t("form.phone", "Nomor Telepon / WhatsApp")} <input name="phone" type="tel" required placeholder="+62 / +49 ..." className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  {t("form.company", "Nama Perusahaan / Institusi")} <input name="company" required placeholder={t("form.company", "Nama Perusahaan / Institusi")} className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
              </div>
              <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-[#a9c5bb]">
                <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#f4c76b]" />
                {t("form.consent", "Saya menyetujui kebijakan privasi dan mengizinkan data ini diproses untuk konsultasi.")}
              </label>
              <button type="submit" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f4c76b] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
                {submitted ? t("about.form_success", "Pesan Anda berhasil disiapkan!") : t("employer.form_submit", "Kirim Permintaan Informasi")} {submitted ? <Check size={16} /> : <Send size={16} />}
              </button>
              {submitted && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#d5e4de]">
                  <ShieldCheck size={15} className="text-[#f4c76b]" /> {t("form.fallback_notice", "Jika aplikasi email tidak terbuka, hubungi langsung via WhatsApp ke 082127324453.")}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <EmployerLabel light>{t("cta_banner.eyebrow", "Langkah Berikutnya")}</EmployerLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-4xl sm:text-6xl font-medium leading-[.94] tracking-[-0.065em]">
              {t("employer.banner_title", "Mari mulai dengan percakapan yang tepat.")}
            </h2>
            <a href="#formulir-partner" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {t("employer.fill_form", "Isi formulir partner")} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
