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
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

function JakartaLogo() {
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

function JakartaLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function JakartaArtwork() {
  return (
    <div className="relative min-h-[445px] overflow-hidden rounded-[1.8rem] bg-[#f4c76b] p-7 sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-[#d35f46]/75" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[34px] border-[#9ccabc]/90" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative z-10 flex items-start justify-between">
        <JakartaLabel>Ruang lokal Lernpfad</JakartaLabel>
        <span className="rounded-full border border-[#173d3a]/25 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#315c54]">ID · 06°10′S</span>
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
            <div><p className="font-['Fraunces'] text-5xl font-semibold leading-[.9] tracking-[-0.06em] text-[#173d3a]">Jakarta</p><p className="mt-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#4f6b64]">Tempat pertama untuk bertanya</p></div>
            <Globe2 size={38} strokeWidth={1.2} className="text-[#d35f46]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Jakarta() {
  const [submitted, setSubmitted] = useState(false);
  const { data: cmsData } = useCmsSection("jakarta");

  useEffect(() => {
    document.title = `${cmsData?.title || "Lernpfad di Jakarta"} — Lernpfad`;
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, [cmsData?.title]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("name") ?? ""} ${form.get("surname") ?? ""}`.trim();
    const subject = `Pertanyaan Ausbildung dari ${name}`;
    const body = [
      `Nama: ${name}`,
      `Email: ${form.get("email") ?? ""}`,
      `Telepon: ${form.get("phone") ?? ""}`,
      `Perusahaan / institusi: ${form.get("company") ?? ""}`,
      "",
      "Pesan:",
      `${form.get("message") ?? ""}`,
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:${cmsData?.contactEmail || "kontakt@aulid.de"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/jakarta" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke beranda</Link>
            <JakartaLabel>{cmsData?.eyebrow || "AuLiD di Jakarta"}</JakartaLabel>
            <h1 className="mt-6 max-w-xl font-['Fraunces'] text-6xl font-medium leading-[.9] tracking-[-0.07em] text-[#173d3a] sm:text-8xl">
              {cmsData?.title || "Tempat pertama untuk bertanya."}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {cmsData?.description || "Kami adalah titik temu di Asia Tenggara bagi anak muda yang ingin mengenal Ausbildung dan peluang kerja di Jerman."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={`tel:${cmsData?.contactPhone || "+6282312495802"}`} className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]">
                <Phone size={16} /> Hubungi kantor Jakarta
              </a>
              <a href="#formulir" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">
                Kirim pertanyaan <ArrowUpRight size={16} />
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
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Untuk siapa?</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Calon peserta dan keluarga yang ingin mendapat gambaran jelas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Clock3 size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Mulai dari sini</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Syarat, bahasa, profesi, dan langkah menuju Ausbildung.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><MessageCircle size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Bahasa yang dekat</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Tim lokal membantu menjawab pertanyaan dengan konteks Indonesia.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32">
          <div>
            <JakartaLabel>Yang kami lakukan</JakartaLabel>
            <h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">
              Membuat langkah besar terasa <span className="text-[#d35f46]">lebih dekat.</span>
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
              Dari Jakarta, kami membantu calon peserta memahami apa yang dibutuhkan untuk memulai Ausbildung di Jerman — bukan sekadar mengirimkan informasi.
            </p>
          </div>
          <div className="grid gap-0 border-t border-[#173d3a]/20">
            {[
              ["01", "Menjawab pertanyaan", "Tentang syarat, pilihan profesi, kemampuan bahasa, dan kehidupan di Jerman."],
              ["02", "Membaca kesiapan", "Mengenal motivasi, pengalaman, dan rencana setiap calon peserta secara utuh."],
              ["03", "Menghubungkan peluang", "Mencari jalur Ausbildung yang sesuai dengan kemampuan dan arah masa depan."]
            ].map(([number, title, text]) => (
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
              <JakartaLabel light>Kontak calon peserta</JakartaLabel>
              <h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">
                Pertanyaan pertama bisa dikirim <em className="text-[#f4c76b]">hari ini.</em>
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#a9c5bb]">
                Isi formulir singkat ini. Saat dikirim, aplikasi email Anda akan dibuka dengan isi pesan yang sudah disiapkan untuk tim Lernpfad.
              </p>
              <div className="mt-9 space-y-4 border-t border-[#47726b] pt-5">
                <a href={`tel:${cmsData?.contactPhone || "+6282312495802"}`} className="flex items-center gap-3 text-sm font-semibold text-[#f5eee3] hover:text-[#f4c76b]">
                  <Phone size={17} className="text-[#f4c76b]" /> {cmsData?.contactPhone || "+62 823 1249 5802"}
                </a>
                <a href={`mailto:${cmsData?.contactEmail || "kontakt@aulid.de"}`} className="flex items-center gap-3 text-sm font-semibold text-[#f5eee3] hover:text-[#f4c76b]">
                  <Mail size={17} className="text-[#f4c76b]" /> {cmsData?.contactEmail || "kontakt@aulid.de"}
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-[#f5eee3] p-6 text-[#173d3a] sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Nama <input name="name" required placeholder="Nama" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Nama belakang <input name="surname" required placeholder="Nama belakang" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  Pesan <textarea name="message" required placeholder="Ceritakan pertanyaan Anda..." rows={4} className="resize-y rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  E-mail <input name="email" type="email" required placeholder="nama@email.com" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em]">
                  Telepon <input name="phone" type="tel" required placeholder="+62 ..." className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
                <label className="grid gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] sm:col-span-2">
                  Nama perusahaan / institusi <input name="company" required placeholder="Nama perusahaan / institusi" className="rounded-xl border border-[#173d3a]/20 bg-transparent px-4 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none placeholder:text-[#9aaea7] focus:border-[#d35f46]" />
                </label>
              </div>
              <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-[#66817a]">
                <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#d35f46]" />
                Saya menyetujui kebijakan privasi dan mengizinkan data ini diproses untuk menjawab pertanyaan saya.
              </label>
              <button type="submit" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#fff8ee] transition-transform hover:-translate-y-1">
                {submitted ? "Aplikasi email dibuka" : "Kirim pertanyaan"} {submitted ? <Check size={16} /> : <Send size={16} />}
              </button>
              {submitted && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#55736b]">
                  <ShieldCheck size={15} className="text-[#d35f46]" /> Jika aplikasi email tidak terbuka, kirim langsung ke {cmsData?.contactEmail || "kontakt@aulid.de"}.
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <JakartaLabel>Lokasi kami</JakartaLabel>
              <h2 className="mt-6 font-['Fraunces'] text-5xl font-medium leading-none tracking-[-0.065em]">Dua lokasi. Satu percakapan.</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#66817a]">Tim di Indonesia dan Jerman terhubung untuk menemani langkah Anda.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.4rem] bg-[#f4c76b] p-7">
              <MapPin size={22} className="text-[#d35f46]" />
              <h3 className="mt-12 font-['Fraunces'] text-3xl font-semibold">German Institut Jakarta</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#4f6b64]">Grand Sahid Jaya Jakarta<br />Jl. M.H. Thamrin No. 12<br />Jakarta Pusat, Indonesia</p>
              <a href={`tel:${cmsData?.contactPhone || "+6282312495802"}`} className="mt-7 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] hover:text-[#d35f46]">
                <Phone size={14} /> {cmsData?.contactPhone || "+62 823 1249 5802"}
              </a>
            </article>
            <article className="rounded-[1.4rem] bg-[#e7f0e9] p-7">
              <Building2 size={22} className="text-[#d35f46]" />
              <h3 className="mt-12 font-['Fraunces'] text-3xl font-semibold">Ausbildung & Leben in Deutschland</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#66817a]">Trinumer Weg 4<br />OT Großpaschleben<br />06386 Osternienburger Land</p>
              <a href={`mailto:${cmsData?.contactEmail || "kontakt@aulid.de"}`} className="mt-7 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] hover:text-[#d35f46]">
                <Mail size={14} /> {cmsData?.contactEmail || "kontakt@aulid.de"}
              </a>
            </article>
          </div>
        </section>

        <section className="mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <JakartaLabel light>Selamat datang</JakartaLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">
              {cmsData?.ctaTitle || "Masa depan yang jauh, dimulai dari percakapan dekat."}
            </h2>
            <a href="#formulir" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {cmsData?.ctaText || "Mulai bertanya"} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}