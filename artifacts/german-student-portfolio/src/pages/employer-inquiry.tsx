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
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

function EmployerLogo() {
  return (
    <div className="flex items-center gap-3 text-[#173d3a]">
      <div className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-[#173d3a]">
        <span className="absolute h-5 w-px rotate-45 bg-[#d35f46]" />
        <span className="absolute h-5 w-px -rotate-45 bg-[#d35f46]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#d35f46]" />
      </div>
      <div>
        <div className="font-['Fraunces'] text-[20px] font-semibold leading-none tracking-[-0.04em]">Lernpfad</div>
        <div className="mt-1 font-mono-ui text-[8px] font-bold uppercase tracking-[0.18em] text-[#77918b]">Indonesia · Deutschland</div>
      </div>
    </div>
  );
}

function EmployerLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function ContactPortrait({ cmsData }: { cmsData?: any }) {
  return (
    <div className="relative min-h-[370px] overflow-hidden rounded-[1.7rem] bg-[#f4c76b] p-7 sm:p-10">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[26px] border-[#d35f46]/75" />
      <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[#9ccabc]/80" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative z-10 flex items-start justify-between">
        <EmployerLabel>{cmsData?.contactLabel || "Ansprechpartner"}</EmployerLabel>
        <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6b64]">
          {cmsData?.locationCode || "DE · 51°46′N"}
        </span>
      </div>
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between gap-5 sm:left-10 sm:right-10">
        <div>
          <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-[#173d3a] bg-[#d86d50] text-[#173d3a] shadow-[5px_5px_0_#173d3a]">
            <UserRound size={58} strokeWidth={1.1} />
          </div>
          <p className="mt-6 font-['Fraunces'] text-4xl font-semibold leading-none tracking-[-0.05em] text-[#173d3a]">
            {cmsData?.contactName || "Wolfgang\nNickel"}
          </p>
        </div>
        <div className="mb-1 max-w-[150px] border-l border-[#173d3a]/30 pl-4 text-sm leading-6 text-[#4f6b64]">
          {cmsData?.contactNote || "Satu percakapan awal untuk memahami kebutuhan tim Anda."}
        </div>
      </div>
    </div>
  );
}

export default function EmployerInquiry() {
  const { data: cmsData } = useCmsSection("employer");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${cmsData?.pageTitle || "Permintaan Partner"} — Lernpfad`;
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, [cmsData?.pageTitle]);

  const targetEmail = cmsData?.contactEmail || "kontakt@aulid.de";
  const targetPhone = cmsData?.contactPhone || "+49 3496 511 7003";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("name") ?? ""} ${form.get("surname") ?? ""}`.trim();
    const company = form.get("company") ?? "";
    const subject = `Permintaan informasi partner dari ${company}`;
    const body = [
      `Nama: ${name}`,
      `Perusahaan: ${company}`,
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
            <Link href="/layanan" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke layanan</Link>
            <EmployerLabel>{cmsData?.eyebrow || "Untuk pemberi kerja"}</EmployerLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-6xl font-medium leading-[.89] tracking-[-0.075em] sm:text-8xl">
              {cmsData?.title || "Temukan orang yang tepat untuk tim Anda."}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {cmsData?.description || "Mari mulai dengan percakapan informasi. Tim kami akan menjelaskan cara kerja, kemungkinan, dan langkah untuk menemukan peserta Ausbildung yang andal dan termotivasi."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${targetPhone.replace(/\s+/g, "")}`}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]"
              >
                <Phone size={16} /> {targetPhone}
              </a>
              <a href="#formulir-partner" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">
                Isi formulir <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <ContactPortrait cmsData={cmsData} />
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><MessageSquareText size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Informasi yang jelas</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Pahami kemungkinan dan cara kerja sebelum mengambil langkah.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Building2 size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Dibuat untuk tim Anda</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Percakapan dimulai dari posisi dan lingkungan kerja yang nyata.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><ShieldCheck size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Respons yang dekat</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Setelah data diperiksa, tim kami akan segera menghubungi Anda.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32">
          <div>
            <EmployerLabel>{cmsData?.contactSectionLabel || "Kontak langsung"}</EmployerLabel>
            <h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">
              {cmsData?.contactHeading || "Satu percakapan untuk melihat kemungkinan baru."}
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
              {cmsData?.contactSubheading || "Untuk informasi awal, telepon kantor kami. Seorang anggota tim akan menjelaskan bidang kerja dan pendekatan yang paling sesuai untuk perusahaan Anda."}
            </p>
            <div className="mt-9 border-t border-[#173d3a]/20 pt-5">
              <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#829891]">
                {cmsData?.contactCountry || "Kontak di Jerman"}
              </p>
              <p className="mt-3 font-['Fraunces'] text-3xl font-semibold">
                {cmsData?.contactName?.replace("\n", " ") || "Wolfgang Nickel"}
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
            <EmployerLabel light>{cmsData?.formLabel || "Formulir untuk partner"}</EmployerLabel>
            <h2 className="mt-6 font-['Fraunces'] text-4xl font-medium leading-[.95] tracking-[-0.055em]">
              {cmsData?.formHeading || "Ceritakan kebutuhan perusahaan Anda."}
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Nama <input name="name" required placeholder="Nama" className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Nama belakang <input name="surname" required placeholder="Nama belakang" className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  Pesan <textarea name="message" required placeholder="Posisi atau kebutuhan yang ingin Anda diskusikan..." rows={4} className="resize-y rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  E-mail <input name="email" type="email" required placeholder="nama@perusahaan.de" className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Telepon <input name="phone" type="tel" required placeholder="+49 ..." className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  Nama perusahaan <input name="company" required placeholder="Nama perusahaan" className="rounded-xl border border-[#a9c5bb]/40 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal text-[#f5eee3] outline-none placeholder:text-[#a9c5bb] focus:border-[#f4c76b]" />
                </label>
              </div>
              <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-[#a9c5bb]">
                <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#f4c76b]" />
                Saya menyetujui kebijakan privasi dan mengizinkan data ini diproses untuk menjawab permintaan informasi saya.
              </label>
              <button type="submit" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f4c76b] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
                {submitted ? "Aplikasi email dibuka" : (cmsData?.submitButtonText || "Kirim permintaan")} {submitted ? <Check size={16} /> : <Send size={16} />}
              </button>
              {submitted && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#d5e4de]">
                  <ShieldCheck size={15} className="text-[#f4c76b]" /> Jika aplikasi email tidak terbuka, kirim langsung ke {targetEmail}.
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <EmployerLabel light>Langkah berikutnya</EmployerLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">
              {cmsData?.bottomCtaTitle || "Mari mulai dengan percakapan yang tepat."}
            </h2>
            <a href="#formulir-partner" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {cmsData?.bottomCtaText || "Isi formulir partner"} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}