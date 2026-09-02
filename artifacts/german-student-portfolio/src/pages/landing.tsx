import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  FileCheck2,
  Globe2,
  Handshake,
  Languages,
  Menu,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { SectionEyebrow } from "@/components/portfolio-ui";

type LucideIcon = typeof UsersRound;

type LandingSummary = {
  totalStudents: number;
  readyToPlace: number;
  placedStudents: number;
  inProgress: number;
  placementRate: number;
  byLevel: Array<{ level: string; count: number }>;
  programs: Array<{ program: string; count: number }>;
};

const serviceCards: Array<{ number: string; icon: LucideIcon; title: string; text: string; accent: string }> = [
  {
    number: "01",
    icon: UsersRound,
    title: "Rekrutmen di Indonesia",
    text: "Kami bertemu calon peserta langsung di kota asalnya, memahami motivasi, dan menyaring kesiapan sejak percakapan pertama.",
    accent: "sea",
  },
  {
    number: "02",
    icon: BriefcaseBusiness,
    title: "Portfolio kandidat",
    text: "Profil rapi memperlihatkan pengalaman, kemampuan bahasa, minat profesi, dan konteks manusia di balik setiap berkas.",
    accent: "coral",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Dokumen dan visa",
    text: "Tim membantu menyiapkan, menerjemahkan, serta menelusuri dokumen sampai proses bersama pihak terkait.",
    accent: "butter",
  },
  {
    number: "04",
    icon: Languages,
    title: "Pelatihan bahasa Jerman",
    text: "Pembelajaran terarah dari fondasi hingga percakapan kerja, dengan progres yang bisa dibaca peserta dan pemberi kerja.",
    accent: "ink",
  },
  {
    number: "05",
    icon: Plane,
    title: "Perjalanan terkoordinasi",
    text: "Penerbangan, transfer, dan momen kedatangan direncanakan bersama agar hari pertama terasa jelas dan terurus.",
    accent: "lavender",
  },
  {
    number: "06",
    icon: Handshake,
    title: "Dukungan setelah tiba",
    text: "Pendampingan tidak berhenti di bandara. Kami tetap hadir saat peserta mulai Ausbildung dan membangun hidup baru.",
    accent: "sand",
  },
];

const processSteps = [
  ["01", "Mendengar kebutuhan", "Kami mulai dari peran, budaya kerja, dan kualitas kandidat yang benar-benar dicari tim Anda."],
  ["02", "Menemukan yang tepat", "Kandidat diseleksi melalui percakapan, dokumen, dan asesmen bahasa yang relevan."],
  ["03", "Menyiapkan perpindahan", "Pelatihan, dokumen, visa, dan perjalanan dirangkai menjadi satu rencana yang transparan."],
  ["04", "Menjaga hubungan", "Setelah tiba, ada satu tim yang tetap mudah dihubungi oleh peserta maupun partner."],
];

const updates = [
  { date: "12 JUN 2024", tag: "Cerita peserta", title: "Dari Bandung ke dapur hotel di Baden-Württemberg", tone: "coral" },
  { date: "28 MEI 2024", tag: "Untuk partner", title: "Apa yang perlu disiapkan sebelum membuka posisi Ausbildung?", tone: "sea" },
  { date: "07 MEI 2024", tag: "Bahasa", title: "Mengapa bahasa kerja dimulai dari kebiasaan kecil", tone: "butter" },
];

const faqs = [
  ["Profesi apa yang saat ini paling banyak dicari?", "Partner kami biasanya datang dari bidang hospitality, kesehatan, perdagangan, industri, dan layanan. Kami membantu membaca kebutuhan peran sebelum mencocokkan kandidat."],
  ["Apakah kandidat sudah bisa berbahasa Jerman?", "Setiap profil menunjukkan level dan bukti progres secara jujur. Program bergerak dari A1 menuju B2 sesuai target Ausbildung dan kebutuhan tempat kerja."],
  ["Bagaimana prosesnya dimulai?", "Masuk ke portal partner untuk melihat katalog yang tersedia, lalu gunakan profil dan status kandidat sebagai dasar percakapan awal."],
];

function useLandingSummary() {
  return useQuery<LandingSummary>({
    queryKey: ["/api/landing-summary"],
    queryFn: async () => {
      const response = await fetch("/api/landing-summary");
      if (!response.ok) throw new Error("Ringkasan portfolio belum tersedia.");
      return response.json() as Promise<LandingSummary>;
    },
    staleTime: 60_000,
  });
}

function LandingLogo({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? "text-[#f5f0e7]" : "text-[#173d3a]"}`}>
      <div className={`relative grid h-9 w-9 place-items-center rounded-full border-2 ${light ? "border-[#a9d5c8]" : "border-[#173d3a]"}`}>
        <span className={`absolute h-5 w-px rotate-45 ${light ? "bg-[#e57c61]" : "bg-[#d35f46]"}`} />
        <span className={`absolute h-5 w-px -rotate-45 ${light ? "bg-[#e57c61]" : "bg-[#d35f46]"}`} />
        <span className={`relative h-1.5 w-1.5 rounded-full ${light ? "bg-[#f4c76b]" : "bg-[#d35f46]"}`} />
      </div>
      <div>
        <div className="font-['Fraunces'] text-[20px] font-semibold leading-none tracking-[-0.04em]">Lernpfad</div>
        <div className={`mt-1 font-mono-ui text-[8px] font-bold uppercase tracking-[0.18em] ${light ? "text-[#a9d5c8]" : "text-[#77918b]"}`}>Indonesia · Deutschland</div>
      </div>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#a9d5c8]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#a9d5c8]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function CandidateArt() {
  return (
    <div className="relative mx-auto aspect-[0.86] w-full max-w-[455px] rotate-[2deg] rounded-[2rem] bg-[#d86d50] p-3 shadow-[18px_22px_0_#173d3a] transition-transform duration-500 hover:rotate-0">
      <div className="relative h-full overflow-hidden rounded-[1.45rem] border border-[#f7d5b0]/60 bg-[#df8b67]">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(#f7d5b0_1px,transparent_1px),linear-gradient(90deg,#f7d5b0_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -right-14 top-10 h-48 w-48 rounded-full border-[22px] border-[#f4c76b]/90" />
        <div className="absolute -left-16 bottom-12 h-40 w-40 rounded-full bg-[#9ccabc]/80" />
        <div className="absolute left-7 top-7 flex items-center gap-2 rounded-full border border-[#f7d5b0]/70 bg-[#f6c774]/90 px-3 py-1.5 font-mono-ui text-[9px] font-bold tracking-[0.12em] text-[#173d3a]">
          <BadgeCheck size={13} /> PROFIL TERVERIFIKASI
        </div>
        <div className="absolute inset-x-10 bottom-0 h-[72%]">
          <div className="absolute bottom-0 left-1/2 h-[67%] w-[74%] -translate-x-1/2 rounded-t-[9rem] bg-[#173d3a]" />
          <div className="absolute bottom-[42%] left-1/2 h-[29%] w-[34%] -translate-x-1/2 rounded-[48%] bg-[#b87957]" />
          <div className="absolute bottom-[57%] left-1/2 h-[17%] w-[44%] -translate-x-1/2 rounded-t-[50%] bg-[#302f31]" />
          <div className="absolute bottom-[53%] left-[31%] h-2 w-2 rounded-full bg-[#173d3a]" />
          <div className="absolute bottom-[53%] right-[31%] h-2 w-2 rounded-full bg-[#173d3a]" />
          <div className="absolute bottom-[48%] left-1/2 h-px w-8 -translate-x-1/2 rotate-[6deg] bg-[#7e4b3e]" />
          <div className="absolute bottom-[40%] left-1/2 h-4 w-14 -translate-x-1/2 rounded-b-[50%] border-b-2 border-[#7e4b3e]" />
          <div className="absolute bottom-[32%] left-[12%] h-20 w-16 rotate-[18deg] rounded-t-[3rem] bg-[#e7b094]" />
          <div className="absolute bottom-[32%] right-[12%] h-20 w-16 -rotate-[18deg] rounded-t-[3rem] bg-[#e7b094]" />
        </div>
        <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between border-t border-[#f7d5b0]/70 pt-4 text-[#173d3a]">
          <div><p className="font-['Fraunces'] text-[27px] font-semibold leading-none">Nadira A.</p><p className="mt-1 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em]">Hospitality · B1</p></div>
          <ArrowUpRight size={24} />
        </div>
      </div>
      <div className="absolute -bottom-6 -left-10 w-[180px] -rotate-[8deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-3 text-[#173d3a] shadow-[5px_7px_0_#173d3a]">
        <div className="flex items-center justify-between font-mono-ui text-[8px] font-bold uppercase tracking-[0.14em] text-[#66837c]"><span>Siap berangkat</span><CircleCheck size={13} className="text-[#d35f46]" /></div>
        <div className="mt-3 flex gap-1"><span className="h-1.5 w-10 rounded-full bg-[#d35f46]" /><span className="h-1.5 w-6 rounded-full bg-[#f4c76b]" /><span className="h-1.5 w-4 rounded-full bg-[#9ccabc]" /></div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contentQuery = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const summaryQuery = useLandingSummary();

  if (contentQuery.isLoading) {
    return <div className="min-h-[100dvh] bg-[#f5eee3] p-5 sm:p-8"><div className="mx-auto max-w-[1240px] space-y-5"><div className="h-20 rounded-2xl shimmer" /><div className="h-[620px] rounded-[2rem] shimmer" /></div></div>;
  }

  if (contentQuery.isError || !contentQuery.data) {
    return <div className="grid min-h-[100dvh] place-items-center bg-[#f5eee3] p-6 text-center"><div><SectionLabel>Beranda belum tersedia</SectionLabel><h1 className="mt-5 font-['Fraunces'] text-4xl font-semibold text-[#173d3a]">Konten landing belum dapat dimuat.</h1><p className="mt-3 text-sm text-[#66817a]">Silakan muat ulang halaman untuk mengambil konten terbaru.</p></div></div>;
  }

  const content = contentQuery.data;
  const summary = summaryQuery.data;
  const stats = [
    { value: summary?.totalStudents ?? "—", label: "profil dalam portfolio", icon: UsersRound },
    { value: summary?.readyToPlace ?? "—", label: "siap dikenalkan", icon: BadgeCheck },
    { value: summary ? `${summary.placementRate}%` : "—", label: "placement rate", icon: BarChart3 },
  ];
  const navTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a] selection:bg-[#f4c76b] selection:text-[#173d3a]">
      <style>{`
        @keyframes landing-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes landing-drift { from { opacity: 0; transform: translateX(12px) rotate(2deg); } to { opacity: 1; transform: translateX(0) rotate(2deg); } }
        .landing-rise { animation: landing-rise .7s cubic-bezier(.22,.8,.24,1) both; }
        .landing-rise-2 { animation: landing-rise .7s .12s cubic-bezier(.22,.8,.24,1) both; }
        .landing-rise-3 { animation: landing-rise .7s .22s cubic-bezier(.22,.8,.24,1) both; }
        .landing-drift { animation: landing-drift .8s .18s cubic-bezier(.22,.8,.24,1) both; }
        @media (prefers-reduced-motion: reduce) { .landing-rise,.landing-rise-2,.landing-rise-3,.landing-drift { animation: none; } }
      `}</style>

      <header className="relative z-30 border-b border-[#173d3a]/15 bg-[#f5eee3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <button type="button" onClick={() => navTo("top")} aria-label="Kembali ke atas"><LandingLogo /></button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi landing">
            <button type="button" onClick={() => navTo("cara-kerja")} className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] transition-colors hover:text-[#d35f46]">Cara kami bekerja</button>
            <Link href="/layanan" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] transition-colors hover:text-[#d35f46]">Layanan</Link>
            <Link href="/berita" className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] transition-colors hover:text-[#d35f46]">Kabar terkini</Link>
            <span className="h-5 w-px bg-[#173d3a]/20" />
            <Link href="/login" className="group inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] transition-transform hover:-translate-y-0.5">Masuk portal <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </nav>
          <button type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-[#173d3a]/20 p-2.5 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {menuOpen && <nav className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-2 md:hidden" aria-label="Menu mobile"><button type="button" onClick={() => navTo("cara-kerja")} className="rounded-xl px-4 py-3 text-left font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961] hover:bg-[#e7f0e9]">Cara kami bekerja</button><Link href="/layanan" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-left font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Layanan</Link><Link href="/berita" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-left font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#486961]">Kabar terkini</Link><Link href="/login" onClick={() => setMenuOpen(false)} className="mt-1 rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5eee3]">Masuk portal <ArrowRight className="ml-1 inline" size={14} /></Link></nav>}
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div className="absolute -left-40 top-32 -z-0 h-80 w-80 rounded-full bg-[#e7d1bd]/55 blur-3xl" />
          <div className="relative z-10">
            <div className="landing-rise"><SectionLabel>Jembatan talenta Indonesia — Jerman</SectionLabel></div>
            <h1 className="landing-rise-2 mt-7 max-w-2xl font-['Fraunces'] text-[clamp(3.2rem,7.3vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.075em] text-[#173d3a]" data-testid="text-landing-title">{content.title}</h1>
            <p className="landing-rise-3 mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]" data-testid="text-landing-description">{content.description}</p>
            <div className="landing-rise-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/login" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]" data-testid="link-landing-primary-cta">{content.primaryCta} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link><button type="button" onClick={() => navTo("cara-kerja")} className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] transition-colors hover:text-[#d35f46]" data-testid="button-landing-secondary-cta">Kenali pendekatan kami <ArrowDownRight size={16} /></button></div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-[#173d3a]/20 pt-5">{stats.map(({ value, label, icon: Icon }) => <div key={label}><div className="flex items-center gap-2"><Icon size={14} className="text-[#d35f46]" /><p className="font-mono-ui text-xl font-bold text-[#173d3a]">{value}</p></div><p className="mt-1 text-xs text-[#6b867e]">{label}</p></div>)}</div>
          </div>
          <div className="landing-drift relative z-10 px-5 pb-8 pt-4 sm:px-12 lg:px-5 lg:pt-8"><CandidateArt /><div className="absolute right-1 top-0 hidden w-[145px] -rotate-[7deg] rounded-xl border-2 border-[#173d3a] bg-[#9ccabc] p-3 text-[#173d3a] shadow-[5px_6px_0_#173d3a] sm:block"><Globe2 size={18} /><p className="mt-4 font-['Fraunces'] text-[19px] font-semibold leading-[1.05]">Dua tempat.<br />Satu arah.</p><p className="mt-3 font-mono-ui text-[8px] font-bold uppercase tracking-[0.12em]">ID × DE</p></div></div>
        </section>

        <div className="border-y border-[#173d3a]/15 bg-[#e7f0e9]"><div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-5 py-5 lg:px-8"><p className="mr-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.17em] text-[#6b867e]">Dipercaya untuk membuka jalan oleh</p>{["Bergblick Hotels", "Küchenwerk", "Pflegehaus Nord", "Rhein & Raum"].map((name, index) => <div key={name} className={`font-['Fraunces'] text-lg font-semibold tracking-[-0.04em] ${index % 2 === 0 ? "text-[#315c54]" : "text-[#66817a]"}`}>{name}</div>)}</div></div>

        <section id="cara-kerja" className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32"><div><SectionLabel>Lebih dari penempatan</SectionLabel><h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.98] tracking-[-.065em] text-[#173d3a] sm:text-6xl">Kami merawat <span className="text-[#d35f46]">perjalanan</span>, bukan hanya keberangkatan.</h2><p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">Pindah negara untuk Ausbildung adalah keputusan besar. Karena itu, kami membuat setiap tahap bisa dipahami, dibicarakan, dan dipersiapkan bersama.</p><button type="button" onClick={() => navTo("layanan")} className="mt-8 inline-flex items-center gap-2 border-b border-[#d35f46] pb-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.16em] text-[#d35f46]">Lihat semua layanan <ArrowRight size={14} /></button></div><div className="grid gap-0 border-t border-[#173d3a]/20">{processSteps.map(([number, title, text]) => <div key={number} className="group grid gap-5 border-b border-[#173d3a]/20 py-6 sm:grid-cols-[58px_1fr] sm:items-start"><span className="font-mono-ui text-[11px] font-bold text-[#d35f46]">{number}</span><div className="grid gap-2 sm:grid-cols-[.58fr_1fr] sm:gap-8"><h3 className="font-['Fraunces'] text-[28px] font-semibold leading-none tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{title}</h3><p className="max-w-md text-sm leading-6 text-[#66817a]">{text}</p></div></div>)}</div></section>

        <section id="layanan" className="bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><SectionLabel light>Layanan Lernpfad</SectionLabel><h2 className="mt-6 max-w-3xl font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Yang rapi di belakang layar, terasa ringan di <em className="text-[#f4c76b]">depan.</em></h2></div><p className="max-w-xs text-sm leading-6 text-[#a9c5bb]">Satu partner lokal untuk membantu tim Anda bergerak percaya diri lintas bahasa, zona waktu, dan proses.</p></div><div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{serviceCards.map(({ number, icon: Icon, title, text, accent }) => { const backgrounds: Record<string, string> = { sea: "bg-[#9ccabc] text-[#173d3a]", coral: "bg-[#d86d50] text-[#fff8ee]", butter: "bg-[#f4c76b] text-[#173d3a]", ink: "bg-[#244f4a] text-[#f5eee3]", lavender: "bg-[#c6c8dc] text-[#173d3a]", sand: "bg-[#e7d1bd] text-[#173d3a]" }; return <article key={number} className={`group flex min-h-[270px] flex-col justify-between rounded-[1.3rem] p-6 transition-transform duration-300 hover:-translate-y-2 ${backgrounds[accent]}`}><div className="flex items-start justify-between"><Icon size={25} strokeWidth={1.7} /><span className="font-mono-ui text-[10px] font-bold opacity-60">{number}</span></div><div><h3 className="max-w-[240px] font-['Fraunces'] text-[29px] font-semibold leading-[.96] tracking-[-0.045em]">{title}</h3><p className="mt-4 max-w-[290px] text-[13px] leading-6 opacity-75">{text}</p></div></article>; })}</div></div></section>

        <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-32"><div className="relative min-h-[440px] overflow-hidden rounded-[1.8rem] bg-[#f4c76b] p-7 sm:p-10"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[34px] border-[#d35f46]/80" /><div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[34px] border-[#9ccabc]/90" /><div className="relative z-10"><SectionLabel>Portfolio kandidat</SectionLabel><div className="mt-20 max-w-sm"><p className="font-['Fraunces'] text-5xl font-medium leading-[.93] tracking-[-0.07em] text-[#173d3a] sm:text-6xl">Kenali orangnya, sebelum bertemu.</p><p className="mt-6 max-w-xs text-sm leading-6 text-[#4f6b64]">Profil yang menyatukan angka, bukti, dan cerita. Karena kecocokan dimulai dari konteks.</p></div><div className="mt-16 flex flex-wrap gap-2">{["Level bahasa", "Pengalaman", "Motivasi", "Kesiapan"].map((label) => <span key={label} className="rounded-full border border-[#173d3a]/25 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.1em] text-[#315c54]">{label}</span>)}</div></div></div><div><SectionLabel>Untuk pemberi kerja</SectionLabel><h2 className="mt-6 max-w-lg font-['Fraunces'] text-5xl font-medium leading-[.98] tracking-[-0.065em] text-[#173d3a]">Bukan daftar CV yang panjang. <span className="text-[#d35f46]">Sinyal yang jelas.</span></h2><p className="mt-7 max-w-md text-[15px] leading-7 text-[#66817a]">Anda mendapat gambaran utuh tentang kandidat yang sedang dipertimbangkan — dan tim kami untuk menerjemahkan detail yang tidak terlihat di atas kertas.</p><div className="mt-9 space-y-4 border-t border-[#173d3a]/20 pt-5">{["Profil kandidat yang dikurasi", "Status dokumen yang transparan", "Satu kontak untuk pertanyaan lanjutan"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#315c54]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#e7f0e9] text-[#d35f46]"><Check size={14} strokeWidth={3} /></span>{item}</div>)}</div><Link href="/login" className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#173d3a] px-5 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-colors hover:bg-[#173d3a] hover:text-[#f5eee3]" data-testid="link-landing-catalog">Lihat portfolio partner <ArrowUpRight size={15} /></Link></div></section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9] px-5 py-20 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionLabel>Suara dari perjalanan</SectionLabel><Quote className="mt-8 text-[#d35f46]" size={38} strokeWidth={1.2} /><blockquote className="mt-5 max-w-sm font-['Fraunces'] text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-[#173d3a]">“Saya tidak merasa dikirim pergi. Saya merasa dipersiapkan untuk datang.”</blockquote><p className="mt-6 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#66817a]">— Rafi, peserta Ausbildung · Stuttgart</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[1.3rem] bg-[#f5eee3] p-6 sm:translate-y-8"><ShieldCheck className="text-[#d35f46]" size={24} /><p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95] tracking-[-0.04em] text-[#173d3a]">Standar yang bisa dipercaya</p><p className="mt-4 text-sm leading-6 text-[#66817a]">Kami bekerja dengan proses yang terdokumentasi dan komunikasi yang terbuka.</p></div><div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]"><Sparkles size={24} /><p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95] tracking-[-0.04em]">Manusia tetap di pusat</p><p className="mt-4 text-sm leading-6 text-[#f7d5c5]">Setiap angka mewakili seseorang dengan harapan, keluarga, dan rencana hidup.</p></div></div></div></section>

        <section id="kabar" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32"><div className="flex items-end justify-between gap-5"><div><SectionLabel>Kabar terkini</SectionLabel><h2 className="mt-5 font-['Fraunces'] text-5xl font-medium leading-none tracking-[-0.065em] text-[#173d3a]">Catatan di sepanjang jalan.</h2></div><Link href="/berita" className="hidden items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46] sm:flex">Buka semua kabar <ArrowRight size={15} /></Link></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{updates.map((update) => <Link key={update.title} href="/berita" className="group block"><div className={`relative aspect-[1.24] overflow-hidden rounded-[1.2rem] ${update.tone === "coral" ? "bg-[#d86d50]" : update.tone === "sea" ? "bg-[#9ccabc]" : "bg-[#f4c76b]"}`}><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_45%,#173d3a_46%,#173d3a_49%,transparent_50%)] [background-size:30px_30px]" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="rounded-full bg-[#f5eee3]/85 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#173d3a]">{update.tag}</span><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} /></div></div><div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]"><CalendarDays size={13} />{update.date}</div><h3 className="mt-3 max-w-sm font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{update.title}</h3></Link>)}</div></section>

        <section className="mx-auto grid max-w-[1240px] gap-16 px-5 pb-24 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-32"><div><SectionLabel>Pertanyaan yang sering muncul</SectionLabel><h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em] text-[#173d3a]">Mari mulai dari yang <span className="text-[#d35f46]">ingin Anda tahu.</span></h2></div><div className="border-t border-[#173d3a]/20">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#173d3a]/20"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span className="font-['Fraunces'] text-2xl font-semibold tracking-[-0.035em] text-[#173d3a]">{question}</span><ChevronDown size={18} className={`shrink-0 text-[#d35f46] transition-transform ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="max-w-xl pb-6 pr-10 text-sm leading-6 text-[#66817a]">{answer}</p>}</div>)}</div></section>

        <section className="relative mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20"><div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" /><div className="absolute -bottom-28 right-[28%] h-56 w-56 rounded-full border-[28px] border-[#173d3a]/15" /><div className="relative z-10 max-w-2xl"><SectionLabel light>Langkah berikutnya</SectionLabel><h2 className="mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">Mari temukan kemungkinan yang belum terlihat.</h2><p className="mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">Ceritakan posisi atau rencana tim Anda. Masuk ke portal untuk memulai percakapan berbasis portfolio yang sudah terverifikasi.</p><Link href="/login" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1" data-testid="link-landing-contact">Hubungi tim Lernpfad <ArrowUpRight size={16} /></Link></div></section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-9 px-5 pb-10 pt-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><LandingLogo /><p className="mt-5 max-w-xs text-xs leading-5 text-[#77918b]">Membuka jalan yang lebih manusiawi antara talenta Indonesia dan dunia kerja Jerman.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#77918b]"><button type="button" onClick={() => navTo("cara-kerja")} className="hover:text-[#d35f46]">Pendekatan</button><button type="button" onClick={() => navTo("layanan")} className="hover:text-[#d35f46]">Layanan</button><Link href="/login" className="hover:text-[#d35f46]">Kontak</Link><span>© 2024 Lernpfad</span></div></footer>
    </div>
  );
}