import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Compass,
  Handshake,
  Menu,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "wouter";

const placementSteps = [
  {
    number: "01",
    title: "Memahami kebutuhan",
    description: "Kami mulai dari posisi, lingkungan kerja, dan karakter partner. Kecocokan yang baik selalu dimulai dengan pertanyaan yang tepat.",
    icon: Compass,
    tone: "butter",
  },
  {
    number: "02",
    title: "Menemukan kecocokan",
    description: "Profil, motivasi, kemampuan bahasa, dan kesiapan peserta dipertimbangkan sebagai satu kesatuan—bukan sekadar daftar kualifikasi.",
    icon: UsersRound,
    tone: "coral",
  },
  {
    number: "03",
    title: "Mendampingi proses",
    description: "Komunikasi antara peserta dan perusahaan dijaga sejak perkenalan hingga persiapan keberangkatan ke Jerman.",
    icon: Handshake,
    tone: "sea",
  },
  {
    number: "04",
    title: "Menjaga awal yang baru",
    description: "Setelah penempatan, dukungan tetap berlanjut agar peserta dan partner dapat membangun awal yang stabil.",
    icon: ShieldCheck,
    tone: "ink",
  },
];

function PlacementsLogo() {
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

function PlacementLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function PlacementArtwork({ activeStep }: { activeStep: number }) {
  const step = placementSteps[activeStep];
  const Icon = step.icon;
  const backgrounds: Record<string, string> = {
    butter: "bg-[#f4c76b] text-[#173d3a]",
    coral: "bg-[#d86d50] text-[#fff8ee]",
    sea: "bg-[#9ccabc] text-[#173d3a]",
    ink: "bg-[#244f4a] text-[#f5eee3]",
  };
  return (
    <div className={`relative min-h-[360px] overflow-hidden rounded-[1.7rem] p-7 transition-colors duration-300 sm:p-10 ${backgrounds[step.tone]}`}>
      <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full border-[26px] border-[#f5eee3]/60" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border-[20px] border-[#173d3a]/15" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative z-10 flex items-start justify-between"><Icon size={30} strokeWidth={1.6} /><span className="font-mono-ui text-[9px] font-bold tracking-[0.14em] opacity-65">LANGKAH {step.number}</span></div>
      <div className="absolute bottom-9 left-8 right-8 z-10 sm:left-10 sm:right-10"><p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.15em] opacity-70">Penempatan yang berhasil</p><h2 className="mt-3 max-w-md font-['Fraunces'] text-5xl font-semibold leading-[.86] tracking-[-0.065em]">{step.title}</h2><p className="mt-5 max-w-sm text-sm leading-6 opacity-80">{step.description}</p></div>
    </div>
  );
}

export default function Placements() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = "Penempatan Berhasil — Lernpfad";
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, []);

  const step = placementSteps[activeStep];
  const StepIcon = step.icon;

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <header className="relative z-30 border-b border-[#173d3a]/15 bg-[#f5eee3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" aria-label="Kembali ke halaman utama"><PlacementsLogo /></Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi penempatan">
            <Link href="/" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Beranda</Link>
            <Link href="/layanan" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Layanan</Link>
            <Link href="/referensi" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Referensi</Link>
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#d35f46]">Penempatan</span>
            <Link href="/ag-anfrage" className="inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] transition-transform hover:-translate-y-0.5">Untuk partner <ArrowUpRight size={14} /></Link>
          </nav>
          <button type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-[#173d3a]/20 p-2.5 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {menuOpen && <nav className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-2 md:hidden" aria-label="Menu mobile"><Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Beranda</Link><Link href="/layanan" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Layanan</Link><Link href="/referensi" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Referensi</Link><Link href="/ag-anfrage" onClick={() => setMenuOpen(false)} className="rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5eee3]">Untuk partner <ChevronRight className="ml-1 inline" size={14} /></Link></nav>}
      </header>

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/referensi" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke referensi</Link>
            <PlacementLabel>Penempatan berhasil</PlacementLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-6xl font-medium leading-[.89] tracking-[-0.075em] sm:text-8xl">Ketika orang yang tepat bertemu <em className="text-[#d35f46]">tempat yang tepat.</em></h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">Penempatan bukan hanya soal mengisi posisi. Ini tentang membangun awal yang baik untuk peserta, perusahaan, dan hubungan yang ingin bertahan lebih lama.</p>
            <div className="mt-9 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]"><BadgeCheck size={14} className="text-[#d35f46]" /> Kecocokan yang dipahami</span><span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]"><Route size={14} className="text-[#d35f46]" /> Proses yang didampingi</span></div>
          </div>
          <div className="relative"><PlacementArtwork activeStep={activeStep} /><div className="absolute -bottom-7 -left-5 hidden w-52 -rotate-[5deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-4 shadow-[5px_6px_0_#173d3a] sm:block"><div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#66817a]"><Sparkles size={14} className="text-[#d35f46]" /> Bukan sekadar cocok</div><p className="mt-3 font-['Fraunces'] text-xl font-semibold leading-none">Awal yang disiapkan bersama.</p></div></div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]"><div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8"><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Building2 size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Untuk perusahaan</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Kandidat yang dipertemukan dengan konteks kerja yang nyata.</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><UsersRound size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Untuk peserta</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Kesempatan yang sesuai dengan arah dan kesiapan mereka.</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Handshake size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Untuk perjalanan</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Dukungan yang menghubungkan dua sisi lebih lama.</p></div></div></div></section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><PlacementLabel>Bagaimana kami bekerja</PlacementLabel><h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">Empat langkah menuju <span className="text-[#d35f46]">kecocokan yang berarti.</span></h2><p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">Pilih langkah untuk melihat cara kami menjaga kualitas penempatan dari percakapan pertama sampai masa awal Ausbildung.</p><div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#486961]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f0e9] text-[#d35f46]"><Check size={15} strokeWidth={3} /></span>Manusia, konteks, dan kebutuhan nyata menjadi titik awal.</div></div><div><div className="grid gap-2 sm:grid-cols-2">{placementSteps.map((item, index) => { const Icon = item.icon; return <button type="button" key={item.number} onClick={() => setActiveStep(index)} className={`group flex items-start gap-4 rounded-[1.1rem] border p-5 text-left transition-all ${activeStep === index ? "border-[#173d3a] bg-[#173d3a] text-[#f5eee3] shadow-[5px_5px_0_#d35f46]" : "border-[#173d3a]/15 bg-[#fffaf2] text-[#173d3a] hover:-translate-y-1 hover:border-[#d35f46]"}`}><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${activeStep === index ? "bg-[#f4c76b] text-[#173d3a]" : "bg-[#e7f0e9] text-[#d35f46]"}`}><Icon size={18} /></div><div><p className={`font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] ${activeStep === index ? "text-[#a9d5c8]" : "text-[#829891]"}`}>{item.number}</p><h3 className="mt-1 font-['Fraunces'] text-2xl font-semibold leading-[.95] tracking-[-0.035em]">{item.title}</h3></div></button>; })}</div><div className="mt-5 rounded-[1.3rem] bg-[#f4c76b] p-6 sm:p-8"><div className="flex items-center gap-3 text-[#d35f46]"><StepIcon size={22} /><span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em]">Langkah {step.number}</span></div><h3 className="mt-5 font-['Fraunces'] text-4xl font-semibold leading-none tracking-[-0.05em] text-[#173d3a]">{step.title}</h3><p className="mt-4 max-w-xl text-[15px] leading-7 text-[#4f6b64]">{step.description}</p><Link href="/ag-anfrage" className="mt-7 inline-flex items-center gap-2 border-b border-[#d35f46] pb-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46]">Diskusikan kebutuhan Anda <ArrowRight size={14} /></Link></div></div></div></section>

        <section className="border-y border-[#173d3a]/15 bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32"><div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><PlacementLabel light>Mengapa ini penting</PlacementLabel><h2 className="mt-6 max-w-2xl font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Penempatan yang baik terasa pada <em className="text-[#f4c76b]">hari-hari setelahnya.</em></h2><p className="mt-7 max-w-xl text-[15px] leading-7 text-[#a9c5bb]">Keberhasilan bukan hanya saat kontrak ditandatangani. Ia terlihat dari peserta yang siap, tim yang terbantu, dan komunikasi yang tetap terbuka.</p></div><div className="rounded-[1.4rem] bg-[#f5eee3] p-7 text-[#173d3a] sm:p-9"><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#d35f46]">Prinsip kami</p><div className="mt-7 grid gap-5"><div className="flex gap-4 border-b border-[#173d3a]/15 pb-5"><span className="font-['Fraunces'] text-3xl text-[#d35f46]">01</span><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Jelas sejak awal</p><p className="mt-2 text-sm leading-6 text-[#66817a]">Ekspektasi yang dipahami bersama mengurangi kejutan di kemudian hari.</p></div></div><div className="flex gap-4 border-b border-[#173d3a]/15 pb-5"><span className="font-['Fraunces'] text-3xl text-[#d35f46]">02</span><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Dekat saat dibutuhkan</p><p className="mt-2 text-sm leading-6 text-[#66817a]">Dukungan hadir di momen transisi yang paling penting.</p></div></div><div className="flex gap-4"><span className="font-['Fraunces'] text-3xl text-[#d35f46]">03</span><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Dibangun bersama</p><p className="mt-2 text-sm leading-6 text-[#66817a]">Perusahaan dan peserta sama-sama punya ruang untuk bertumbuh.</p></div></div></div></div></div></section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20"><div className="relative max-w-2xl"><div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" /><PlacementLabel light>Langkah berikutnya</PlacementLabel><h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Penempatan berikutnya bisa dimulai dari percakapan.</h2><p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">Ceritakan kebutuhan perusahaan Anda. Kami akan membantu menemukan langkah yang paling masuk akal untuk memulainya.</p><Link href="/ag-anfrage" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">Hubungi tim Lernpfad <ArrowUpRight size={16} /></Link></div></section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-9 px-5 pb-10 pt-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><PlacementsLogo /><p className="mt-5 max-w-xs text-xs leading-5 text-[#77918b]">Membuka jalan yang lebih manusiawi antara talenta Indonesia dan dunia kerja Jerman.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#77918b]"><Link href="/" className="hover:text-[#d35f46]">Beranda</Link><Link href="/layanan" className="hover:text-[#d35f46]">Layanan</Link><Link href="/referensi" className="hover:text-[#d35f46]">Referensi</Link><Link href="/ag-anfrage" className="hover:text-[#d35f46]">Partner</Link><span>© 2024 Lernpfad</span></div></footer>
    </div>
  );
}