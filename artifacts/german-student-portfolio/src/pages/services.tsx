import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Handshake,
  Languages,
  Menu,
  Plane,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "wouter";

type ServiceStage = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof UsersRound;
  tone: "coral" | "sea" | "butter" | "ink" | "lavender" | "sand";
};

const serviceStages: ServiceStage[] = [
  {
    number: "01",
    title: "Rekrutmen di lokasi",
    shortTitle: "Kami menemukan",
    description: "Tim lokal bertemu calon peserta di Indonesia, mendengar motivasinya, dan menyaring kesiapan untuk bidang industri, perdagangan, kerajinan, kesehatan, dan layanan.",
    icon: UsersRound,
    tone: "coral",
  },
  {
    number: "02",
    title: "Kami belajar bahasa Jerman",
    shortTitle: "Kami mempersiapkan",
    description: "Peserta mengikuti pelatihan bahasa yang terarah, dari fondasi percakapan hingga kosakata kerja yang dibutuhkan di tempat Ausbildung.",
    icon: Languages,
    tone: "sea",
  },
  {
    number: "03",
    title: "Masuk ke Jerman",
    shortTitle: "Kami mengatur",
    description: "Dokumen, visa, jadwal perjalanan, dan komunikasi dengan partner disiapkan sebagai satu rencana yang bisa diikuti bersama.",
    icon: Plane,
    tone: "butter",
  },
  {
    number: "04",
    title: "Tiba di Jerman",
    shortTitle: "Kami menyambut",
    description: "Peserta dijemput dan diarahkan saat kedatangan. Langkah pertama di negara baru tidak perlu dijalani sendirian.",
    icon: Globe2,
    tone: "ink",
  },
  {
    number: "05",
    title: "Persiapan memulai Ausbildung",
    shortTitle: "Kami menjembatani",
    description: "Kami membantu peserta memahami ritme hidup, ekspektasi kerja, dan hal-hal praktis sebelum hari pertama dimulai.",
    icon: ClipboardCheck,
    tone: "lavender",
  },
  {
    number: "06",
    title: "Kunjungan ke tempat Ausbildung",
    shortTitle: "Kami tetap hadir",
    description: "Hubungan dengan peserta dan partner dijaga melalui kunjungan serta komunikasi yang dekat selama masa transisi.",
    icon: Building2,
    tone: "sand",
  },
  {
    number: "07",
    title: "Pendampingan administratif",
    shortTitle: "Kami meneruskan",
    description: "Setelah Ausbildung dimulai, partner tetap mendapat dukungan untuk pertanyaan administratif dan koordinasi lanjutan.",
    icon: ShieldCheck,
    tone: "sea",
  },
];

function ServicesLogo() {
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

function ServicesLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function StageArtwork({ stage }: { stage: ServiceStage }) {
  const tones = {
    coral: "bg-[#d86d50]",
    sea: "bg-[#9ccabc]",
    butter: "bg-[#f4c76b]",
    ink: "bg-[#244f4a]",
    lavender: "bg-[#c6c8dc]",
    sand: "bg-[#e7d1bd]",
  };
  const Icon = stage.icon;
  return (
    <div className={`relative min-h-[285px] overflow-hidden rounded-[1.5rem] p-7 text-[#173d3a] ${tones[stage.tone]}`}>
      <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[24px] border-[#f5eee3]/60" />
      <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[18px] border-[#173d3a]/15" />
      <div className="relative z-10 flex items-start justify-between"><Icon size={28} strokeWidth={1.7} /><span className="font-mono-ui text-[10px] font-bold tracking-[0.12em] opacity-60">{stage.number}</span></div>
      <div className="relative z-10 mt-20"><p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] opacity-65">{stage.shortTitle}</p><h3 className="mt-2 max-w-xs font-['Fraunces'] text-4xl font-semibold leading-[.92] tracking-[-0.055em]">{stage.title}</h3></div>
    </div>
  );
}

export default function Services() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    document.title = "Layanan & Aktivitas — Lernpfad";
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, []);

  const selectedStage = serviceStages[activeStage];
  const SelectedIcon = selectedStage.icon;

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <header className="relative z-30 border-b border-[#173d3a]/15 bg-[#f5eee3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" aria-label="Kembali ke halaman utama"><ServicesLogo /></Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi layanan">
            <Link href="/" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Beranda</Link>
            <Link href="/berita" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Kabar terkini</Link>
            <Link href="/media" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Media</Link>
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#d35f46]">Layanan</span>
            <Link href="/jakarta" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Jakarta</Link>
            <Link href="/ag-anfrage" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:text-[#d35f46]">Untuk partner</Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] transition-transform hover:-translate-y-0.5">Masuk portal <ArrowUpRight size={14} /></Link>
          </nav>
          <button type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-[#173d3a]/20 p-2.5 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {menuOpen && <nav className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-2 md:hidden" aria-label="Menu mobile"><Link href="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Beranda</Link><Link href="/berita" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Kabar terkini</Link><Link href="/media" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Media</Link><Link href="/jakarta" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Jakarta</Link><Link href="/ag-anfrage" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Untuk partner</Link><Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5eee3]">Masuk portal <ChevronRight className="ml-1 inline" size={14} /></Link></nav>}
      </header>

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke beranda</Link>
            <ServicesLabel>Layanan untuk pemberi kerja</ServicesLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-6xl font-medium leading-[.89] tracking-[-0.075em] sm:text-8xl">Kami membawa talenta muda lebih <em className="text-[#d35f46]">dekat.</em></h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">Lernpfad membantu perusahaan menemukan tenaga muda yang dinamis dari Asia Tenggara — dan menyalurkannya secara terarah sebagai peserta Ausbildung.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/jakarta#formulir" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]">Mulai percakapan <ArrowUpRight size={16} /></Link><Link href="/login" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">Lihat portfolio <ArrowRight size={16} /></Link></div>
          </div>
          <div className="relative"><StageArtwork stage={selectedStage} /><div className="absolute -bottom-7 -left-5 hidden w-48 -rotate-[5deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-4 shadow-[5px_6px_0_#173d3a] sm:block"><div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#66817a]"><BadgeCheck size={14} className="text-[#d35f46]" /> Satu alur yang jelas</div><p className="mt-3 font-['Fraunces'] text-xl font-semibold leading-none">Dari Indonesia ke tempat kerja Anda.</p></div></div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]"><div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8"><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Handshake size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Partner lokal</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Satu tim di Indonesia untuk memahami kebutuhan Anda.</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><FileCheck2 size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Proses terukur</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Setiap langkah terdokumentasi dan mudah diikuti.</p></div></div><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><ShieldCheck size={19} /></div><div><p className="font-['Fraunces'] text-2xl font-semibold leading-none">Dukungan berlanjut</p><p className="mt-2 text-sm leading-5 text-[#66817a]">Hubungan tidak berhenti setelah peserta tiba.</p></div></div></div></section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]"><div><ServicesLabel>Alur kerja kami</ServicesLabel><h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">Satu perjalanan, <span className="text-[#d35f46]">tujuh momen</span> penting.</h2><p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">Pilih satu tahap untuk melihat apa yang terjadi di baliknya. Kami membuat proses lintas negara terasa lebih dekat bagi semua pihak.</p><div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#486961]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f0e9] text-[#d35f46]"><Check size={15} strokeWidth={3} /></span>Untuk partner di industri, perdagangan, kerajinan, kesehatan, dan layanan.</div></div><div><div className="grid gap-2 sm:grid-cols-2">{serviceStages.map((stage, index) => { const Icon = stage.icon; return <button type="button" key={stage.number} onClick={() => setActiveStage(index)} className={`group flex items-start gap-4 rounded-[1.1rem] border p-5 text-left transition-all ${activeStage === index ? "border-[#173d3a] bg-[#173d3a] text-[#f5eee3] shadow-[5px_5px_0_#d35f46]" : "border-[#173d3a]/15 bg-[#fffaf2] text-[#173d3a] hover:-translate-y-1 hover:border-[#d35f46]"}`}><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${activeStage === index ? "bg-[#f4c76b] text-[#173d3a]" : "bg-[#e7f0e9] text-[#d35f46]"}`}><Icon size={18} /></div><div><p className={`font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] ${activeStage === index ? "text-[#a9d5c8]" : "text-[#829891]"}`}>{stage.number}</p><h3 className="mt-1 font-['Fraunces'] text-2xl font-semibold leading-[.95] tracking-[-0.035em]">{stage.title}</h3></div></button>; })}</div><div className="mt-5 rounded-[1.3rem] bg-[#f4c76b] p-6 sm:p-8"><div className="flex items-center gap-3 text-[#d35f46]"><SelectedIcon size={22} /><span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em]">Tahap {selectedStage.number}</span></div><h3 className="mt-5 font-['Fraunces'] text-4xl font-semibold leading-none tracking-[-0.05em] text-[#173d3a]">{selectedStage.title}</h3><p className="mt-4 max-w-xl text-[15px] leading-7 text-[#4f6b64]">{selectedStage.description}</p><Link href="/jakarta#formulir" className="mt-7 inline-flex items-center gap-2 border-b border-[#d35f46] pb-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46]">Bicarakan kebutuhan Anda <ArrowRight size={14} /></Link></div></div></div></section>

        <section className="bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32"><div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><ServicesLabel light>Hasil yang ingin kami jaga</ServicesLabel><h2 className="mt-6 max-w-2xl font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Partner mendapat <em className="text-[#f4c76b]">kepastian.</em> Peserta mendapat arah.</h2><p className="mt-7 max-w-xl text-[15px] leading-7 text-[#a9c5bb]">Dua kebutuhan yang berbeda bisa berjalan dalam satu proses yang manusiawi: pemberi kerja menemukan kecocokan, sementara peserta tahu apa yang harus disiapkan.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-[1.3rem] bg-[#f5eee3] p-6 text-[#173d3a]"><UsersRound size={24} className="text-[#d35f46]" /><p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95]">Kandidat yang dipahami</p><p className="mt-4 text-sm leading-6 text-[#66817a]">Bukan hanya berkas, tapi konteks kemampuan dan motivasi.</p></div><div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]"><Handshake size={24} /><p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95]">Hubungan yang dijaga</p><p className="mt-4 text-sm leading-6 text-[#f7d5c5]">Satu kontak yang hadir sebelum dan sesudah keberangkatan.</p></div></div></div></section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20"><div className="relative max-w-2xl"><div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" /><ServicesLabel light>Langkah berikutnya</ServicesLabel><h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Mari bicarakan kebutuhan tim Anda.</h2><p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">Ceritakan posisi dan lingkungan kerja yang sedang Anda bangun. Kami akan mulai dari konteks yang tepat.</p><Link href="/jakarta#formulir" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">Hubungi tim Lernpfad <ArrowUpRight size={16} /></Link></div></section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-9 px-5 pb-10 pt-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><ServicesLogo /><p className="mt-5 max-w-xs text-xs leading-5 text-[#77918b]">Membuka jalan yang lebih manusiawi antara talenta Indonesia dan dunia kerja Jerman.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#77918b]"><Link href="/" className="hover:text-[#d35f46]">Beranda</Link><Link href="/berita" className="hover:text-[#d35f46]">Kabar</Link><Link href="/media" className="hover:text-[#d35f46]">Media</Link><Link href="/jakarta" className="hover:text-[#d35f46]">Jakarta</Link><span>© 2024 Lernpfad</span></div></footer>
    </div>
  );
}