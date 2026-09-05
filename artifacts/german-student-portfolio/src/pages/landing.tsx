import { useState, useMemo } from "react";
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
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";
import { getLocalizedArticle } from "@/lib/news-translations";
import { SectionEyebrow } from "@/components/portfolio-ui";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

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

const defaultServiceCards: Array<{ number: string; icon: LucideIcon; title: string; text: string; accent: string }> = [
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

const defaultProcessSteps = [
  { number: "01", title: "Mendengar kebutuhan", text: "Kami mulai dari peran, budaya kerja, dan kualitas kandidat yang benar-benar dicari tim Anda." },
  { number: "02", title: "Menemukan yang tepat", text: "Kandidat diseleksi melalui percakapan, dokumen, dan asesmen bahasa yang relevan." },
  { number: "03", title: "Menyiapkan perpindahan", text: "Pelatihan, dokumen, visa, dan perjalanan dirangkai menjadi satu rencana yang transparan." },
  { number: "04", title: "Menjaga hubungan", text: "Setelah tiba, ada satu tim yang tetap mudah dihubungi oleh peserta maupun partner." },
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
      <div className="absolute -bottom-5 left-2 max-w-[calc(100%-1.5rem)] -rotate-[4deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-2.5 text-[#173d3a] shadow-[4px_5px_0_#173d3a] sm:-bottom-6 sm:-left-8 sm:w-[180px] sm:-rotate-[8deg] sm:p-3 sm:shadow-[5px_7px_0_#173d3a]">
        <div className="flex items-center justify-between font-mono-ui text-[8px] font-bold uppercase tracking-[0.14em] text-[#66837c]"><span>Siap berangkat</span><CircleCheck size={13} className="text-[#d35f46]" /></div>
        <div className="mt-2.5 flex gap-1 sm:mt-3"><span className="h-1.5 w-10 rounded-full bg-[#d35f46]" /><span className="h-1.5 w-6 rounded-full bg-[#f4c76b]" /><span className="h-1.5 w-4 rounded-full bg-[#9ccabc]" /></div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { language, t } = useLanguage();
  const contentQuery = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const summaryQuery = useLandingSummary();
  const { data: homeCms } = useCmsSection("home");
  const { data: newsCms } = useCmsSection("news");

  const rawNewsList = newsCms?.items && Array.isArray(newsCms.items) && newsCms.items.length > 0 
    ? newsCms.items.slice(0, 3) 
    : [
        { id: 1, date: "18 JUN 2024", category: "Media", tag: "Media", title: "Bagaimana peserta Ausbildung dari Indonesia membantu menjawab kebutuhan tenaga kerja?", tone: "coral" },
        { id: 2, date: "12 JUN 2024", category: "Cerita", tag: "Cerita peserta", title: "Dari Medan ke dapur hotel di Baden-Württemberg", tone: "sea" },
        { id: 3, date: "03 SEP 2023", category: "Partner", tag: "Untuk partner", title: "Peluang Ausbildung Perawat dan Hospitaliti di Jerman", tone: "butter" },
      ];

  const newsList = useMemo(() => {
    return rawNewsList.map((item: any) => getLocalizedArticle(item, language));
  }, [rawNewsList, language]);

  const title = language !== "id" ? t("hero.title", homeCms?.title) : (homeCms?.title || contentQuery.data?.title || "ICH LIEBE DEUTSCH MEDAN");
  const description = language !== "id" ? t("hero.description", homeCms?.description) : (homeCms?.description || contentQuery.data?.description || "Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik bersama pendiri lulusan UNIMED yang berpengalaman 6 tahun tinggal di Jerman.");
  const primaryCta = language !== "id" ? t("hero.cta_wa", homeCms?.primaryCta) : (homeCms?.primaryCta || "Konsultasi WhatsApp");
  const primaryCtaHref = homeCms?.primaryCtaHref || "https://wa.me/6282127324453";
  const eyebrow = language !== "id" ? t("hero.eyebrow", homeCms?.eyebrow) : (homeCms?.eyebrow || "Lembaga Kursus Bahasa Jerman Resmi · Medan");

  const trustedPartners = homeCms?.trustedPartners || ["Bergblick Hotels", "Küchenwerk", "Pflegehaus Nord", "Rhein & Raum"];
  
  const serviceCards = [
    {
      number: "01",
      icon: UsersRound,
      title: t("programs.card1_title", "Ausbildung"),
      text: t("programs.card1_desc", "Sekolah kejuruan (Berufsschule) digabung praktik kerja di perusahaan Jerman dengan uang saku bulanan. Durasi 2–3,5 tahun (Perawat, Gastro, IT, Teknik, Bisnis)."),
      accent: "sea",
    },
    {
      number: "02",
      icon: Handshake,
      title: t("programs.card2_title", "Au Pair"),
      text: t("programs.card2_desc", "Program pertukaran budaya tinggal bersama keluarga Jerman (Host Family). Mendapat uang saku, kamar pribadi, makan gratis, dan kursus bahasa Jerman."),
      accent: "coral",
    },
    {
      number: "03",
      icon: Sparkles,
      title: t("programs.card3_title", "FSJ / BFD"),
      text: t("programs.card3_desc", "Freiwilliges Soziales Jahr / Bundesfreiwilligendienst: program sukarelawan sosial 1 tahun di rumah sakit, panti sosial, atau TK dengan uang saku dan akomodasi."),
      accent: "butter",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: t("programs.card4_title", "G to G Perawat"),
      text: t("programs.card4_desc", "Program resmi antar-pemerintah (Government to Government) penempatan tenaga perawat profesional Indonesia di berbagai fasilitas kesehatan di Jerman."),
      accent: "ink",
    },
    {
      number: "05",
      icon: Globe2,
      title: t("programs.card5_title", "Kuliah / Studium"),
      text: t("programs.card5_desc", "Persiapan kuliah universitas di Jerman (Bachelor/Master), Studienkolleg, sertifikasi bahasa C1/TestDaF, dan bimbingan dokumen universitas."),
      accent: "lavender",
    },
  ];

  const processSteps = [
    { number: t("approach.step1_num", "01"), title: t("approach.step1_title", "Konsultasi & Pemetaan"), text: t("approach.step1_text", "Menganalisis minat, latar belakang pendidikan, dan memilih jalur resmi ke Jerman yang paling tepat.") },
    { number: t("approach.step2_num", "02"), title: t("approach.step2_title", "Kursus Bahasa Jerman Terarah"), text: t("approach.step2_text", "Pelatihan intensif tingkat A1, A2, hingga B1/B2 dengan kurikulum standar Goethe-Institut, dipandu langsung oleh alumni UNIMED.") },
    { number: t("approach.step3_num", "03"), title: t("approach.step3_title", "Dokumen & Wawancara"), text: t("approach.step3_text", "Penyusunan Lebenslauf, Anschreiben, serta simulasi wawancara dengan pemberi kerja / host family di Jerman.") },
    { number: t("approach.step4_num", "04"), title: t("approach.step4_title", "Kontrak & Visa Resmi"), text: t("approach.step4_text", "Pendampingan pengurusan kontrak resmi (Ausbildungsvertrag), verifikasi kedutaan, asuransi, dan pengajuan visa nasional.") },
    { number: t("approach.step5_num", "05"), title: t("approach.step5_title", "Kemandirian & Adaptasi"), text: t("approach.step5_text", "Pembekalan budaya kehidupan sehari-hari, perumahan, pendaftaran kota (Anmeldung), dan jaringan komunitas alumni.") },
  ];

  const currentFaqs = [
    [t("faq.q1"), t("faq.a1")],
    [t("faq.q2"), t("faq.a2")],
    [t("faq.q3"), t("faq.a3")],
    [t("faq.q4"), t("faq.a4")],
  ];

  const quoteText = t("quote.text", homeCms?.quoteText || "“Di ICH LIEBE DEUTSCH MEDAN saya tidak hanya belajar tata bahasa, tapi belajar bagaimana menghadapi kehidupan nyata dan bekerja profesional di Jerman.”");
  const quoteAuthor = t("quote.author", homeCms?.quoteAuthor || "— Alumni Peserta Bimbingan · Jerman");
  const ctaTitle = t("cta_banner.title", homeCms?.ctaTitle || "Wujudkan impian masa depan Anda di Jerman bersama kami.");
  const ctaSubtitle = t("cta_banner.subtitle", homeCms?.ctaSubtitle || "Konsultasikan impian dan rencana Anda bersama tim ICH LIEBE DEUTSCH MEDAN. Kami siap mendampingi dari nol hingga tiba di Jerman.");
  const ctaButtonText = t("cta_banner.button", homeCms?.ctaButtonText || "Hubungi WhatsApp Kami");
  const ctaButtonHref = homeCms?.ctaButtonHref || "https://wa.me/6282127324453";

  const summary = summaryQuery.data;
  const stats = [
    { value: summary?.totalStudents ?? (homeCms?.stats?.[0]?.value || "48+"), label: t("stats.students", "profil dalam bimbingan"), icon: UsersRound },
    { value: summary?.readyToPlace ?? (homeCms?.stats?.[1]?.value || "19"), label: t("stats.ready", "siap diberangkatkan"), icon: BadgeCheck },
    { value: summary ? `${summary.placementRate}%` : (homeCms?.stats?.[2]?.value || "98%"), label: t("stats.placement_rate", "tingkat keberhasilan"), icon: BarChart3 },
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

      <PublicNavbar activeRoute="/" />

      <main id="top">
        <section className="relative mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div className="absolute -left-40 top-32 -z-0 h-80 w-80 rounded-full bg-[#e7d1bd]/55 blur-3xl" />
          <div className="relative z-10">
            <div className="landing-rise"><SectionLabel>{eyebrow}</SectionLabel></div>
            <h1 className="landing-rise-2 mt-7 max-w-2xl font-['Fraunces'] text-[clamp(2.4rem,6vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.075em] text-[#173d3a]" data-testid="text-landing-title">{title}</h1>
            <p className="landing-rise-3 mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]" data-testid="text-landing-description">{description}</p>
            <div className="landing-rise-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={primaryCtaHref} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]" data-testid="link-landing-primary-cta">
                {primaryCta} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button type="button" onClick={() => navTo("cara-kerja")} className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] transition-colors hover:text-[#d35f46]" data-testid="button-landing-secondary-cta">
                {t("hero.cta_approach", "Kenali pendekatan kami")} <ArrowDownRight size={16} />
              </button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-2 sm:gap-4 border-t border-[#173d3a]/20 pt-5">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 sm:gap-2"><Icon size={14} className="text-[#d35f46] shrink-0" /><p className="font-mono-ui text-lg sm:text-xl font-bold text-[#173d3a]">{value}</p></div>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#6b867e] leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="landing-drift relative z-10 px-5 pb-8 pt-4 sm:px-12 lg:px-5 lg:pt-8">
            <CandidateArt />
            <div className="absolute right-1 top-0 hidden w-[145px] -rotate-[7deg] rounded-xl border-2 border-[#173d3a] bg-[#9ccabc] p-3 text-[#173d3a] shadow-[5px_6px_0_#173d3a] sm:block">
              <Globe2 size={18} />
              <p className="mt-4 font-['Fraunces'] text-[19px] font-semibold leading-[1.05]">{t("hero.badge_two_places", "Dua tempat. Satu arah.")}</p>
              <p className="mt-3 font-mono-ui text-[8px] font-bold uppercase tracking-[0.12em]">ID × DE</p>
            </div>
          </div>
        </section>

        <div className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-5 py-5 lg:px-8">
            <p className="mr-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.17em] text-[#6b867e]">{t("hero.trusted_by", "Dipercaya untuk membuka jalan oleh")}</p>
            {trustedPartners.map((name: string, index: number) => (
              <div key={name} className={`font-['Fraunces'] text-lg font-semibold tracking-[-0.04em] ${index % 2 === 0 ? "text-[#315c54]" : "text-[#66817a]"}`}>{name}</div>
            ))}
          </div>
        </div>

        <section id="cara-kerja" className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-32">
          <div>
            <SectionLabel>{t("approach.eyebrow", homeCms?.introLabel || "Lebih dari penempatan")}</SectionLabel>
            <h2 className="mt-6 max-w-md font-['Fraunces'] text-3xl sm:text-5xl lg:text-6xl font-medium leading-[.98] tracking-[-.065em] text-[#173d3a]">
              {t("approach.title", homeCms?.introTitle || "Kami merawat perjalanan, bukan hanya keberangkatan.")}
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
              {t("approach.text", homeCms?.introText || "Pindah negara untuk Ausbildung, Au Pair, atau Kuliah adalah keputusan besar. Karena itu, kami membuat setiap tahap bisa dipahami, dibicarakan, dan dipersiapkan bersama.")}
            </p>
            <button type="button" onClick={() => navTo("layanan")} className="mt-8 inline-flex items-center gap-2 border-b border-[#d35f46] pb-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.16em] text-[#d35f46]">
              {t("common.see_all_services", "Lihat semua layanan")} <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid gap-0 border-t border-[#173d3a]/20">
            {processSteps.map((step: any) => {
              const number = step.number || step[0];
              const title = step.title || step[1];
              const text = step.text || step[2];
              return (
                <div key={number} className="group grid gap-5 border-b border-[#173d3a]/20 py-6 sm:grid-cols-[58px_1fr] sm:items-start">
                  <span className="font-mono-ui text-[11px] font-bold text-[#d35f46]">{number}</span>
                  <div className="grid gap-2 sm:grid-cols-[.58fr_1fr] sm:gap-8">
                    <h3 className="font-['Fraunces'] text-[28px] font-semibold leading-none tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{title}</h3>
                    <p className="max-w-md text-sm leading-6 text-[#66817a]">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="layanan" className="bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <SectionLabel light>{t("programs.eyebrow", "5 Program Kursus & Jalur Resmi")}</SectionLabel>
                <h2 className="mt-6 max-w-3xl font-['Fraunces'] text-3xl sm:text-5xl lg:text-7xl font-medium leading-[.94] tracking-[-0.065em]">{t("programs.title", "Yang terencana dengan baik, terasa ringan saat dijalani.")}</h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#a9c5bb]">{t("programs.subtitle", "Satu lembaga lokal di Medan untuk membimbing langkah Anda dengan percaya diri lintas bahasa, budaya, dan administrasi.")}</p>
            </div>
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card: any) => {
                const number = card.number || "01";
                const title = card.title;
                const text = card.text || card.description;
                const accent = card.accent || "sea";
                const Icon = typeof card.icon === "function" ? card.icon : UsersRound;
                const backgrounds: Record<string, string> = {
                  sea: "bg-[#9ccabc] text-[#173d3a]",
                  coral: "bg-[#d86d50] text-[#fff8ee]",
                  butter: "bg-[#f4c76b] text-[#173d3a]",
                  ink: "bg-[#244f4a] text-[#f5eee3]",
                  lavender: "bg-[#c6c8dc] text-[#173d3a]",
                  sand: "bg-[#e7d1bd] text-[#173d3a]",
                };
                return (
                  <article key={number + title} className={`group flex min-h-[270px] flex-col justify-between rounded-[1.3rem] p-6 transition-transform duration-300 hover:-translate-y-2 ${backgrounds[accent] || backgrounds.sea}`}>
                    <div className="flex items-start justify-between">
                      <Icon size={25} strokeWidth={1.7} />
                      <span className="font-mono-ui text-[10px] font-bold opacity-60">{number}</span>
                    </div>
                    <div>
                      <h3 className="max-w-[240px] font-['Fraunces'] text-[29px] font-semibold leading-[.96] tracking-[-0.045em]">{title}</h3>
                      <p className="mt-4 max-w-[290px] text-[13px] leading-6 opacity-75">{text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-32">
          <div className="relative min-h-[440px] overflow-hidden rounded-[1.8rem] bg-[#f4c76b] p-7 sm:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[34px] border-[#d35f46]/80" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[34px] border-[#9ccabc]/90" />
            <div className="relative z-10">
              <SectionLabel>{t("portfolio_highlight.eyebrow", "Kesiapan Kandidat")}</SectionLabel>
              <div className="mt-20 max-w-sm">
                <p className="font-['Fraunces'] text-3xl sm:text-5xl lg:text-6xl font-medium leading-[.93] tracking-[-0.07em] text-[#173d3a]">{t("portfolio_highlight.title", "Kenali orangnya, sebelum bertemu.")}</p>
                <p className="mt-6 max-w-xs text-sm leading-6 text-[#4f6b64]">{t("portfolio_highlight.description", "Profil peserta yang menyatukan kemampuan bahasa, pemahaman budaya, dan motivasi kerja nyata. Karena keberhasilan dimulai dari kesiapan mental.")}</p>
              </div>
              <div className="mt-16 flex flex-wrap gap-2">
                {[
                  t("portfolio_highlight.pill_lang", "Level Bahasa B1/B2"),
                  t("portfolio_highlight.pill_exp", "Praktik & Keahlian"),
                  t("portfolio_highlight.pill_mot", "Motivasi Kuat"),
                  t("portfolio_highlight.pill_readiness", "Kesiapan Mental"),
                ].map((label) => (
                  <span key={label} className="rounded-full border border-[#173d3a]/25 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.1em] text-[#315c54]">{label}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>{t("employer_sec.eyebrow", "Kemitraan & Integritas")}</SectionLabel>
            <h2 className="mt-6 max-w-lg font-['Fraunces'] text-3xl sm:text-5xl font-medium leading-[.98] tracking-[-0.065em] text-[#173d3a]">{t("employer_sec.title", "Bukan sekadar mengirimkan. Menyiapkan manusia yang siap berkarya.")}</h2>
            <p className="mt-7 max-w-md text-[15px] leading-7 text-[#66817a]">{t("employer_sec.description", "Kami membekali kandidat dengan bahasa yang baik dan etos kerja Jerman, sehingga proses adaptasi di tempat kerja berlangsung cepat dan harmonis.")}</p>
            <div className="mt-9 space-y-4 border-t border-[#173d3a]/20 pt-5">
              {[
                t("employer_sec.check1", "Kandidat dengan sertifikat bahasa resmi B1 / B2"),
                t("employer_sec.check2", "Pemahaman budaya kerja Jerman dan kedisiplinan"),
                t("employer_sec.check3", "Pendampingan kontak berkelanjutan selama masa kontrak"),
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#315c54]">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e7f0e9] text-[#d35f46]"><Check size={14} strokeWidth={3} /></span>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/jakarta#formulir" className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#173d3a] px-5 py-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-colors hover:bg-[#173d3a] hover:text-[#f5eee3]" data-testid="link-landing-catalog">
              {t("employer_sec.cta", "Konsultasi Kemitraan")} <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9] px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionLabel>{t("quote.eyebrow", "Suara Dari Jerman")}</SectionLabel>
              <Quote className="mt-8 text-[#d35f46]" size={38} strokeWidth={1.2} />
              <blockquote className="mt-5 max-w-sm font-['Fraunces'] text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-[#173d3a]">
                {quoteText}
              </blockquote>
              <p className="mt-6 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#66817a]">{quoteAuthor}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] bg-[#f5eee3] p-6 sm:translate-y-8">
                <ShieldCheck className="text-[#d35f46]" size={24} />
                <p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95] tracking-[-0.04em] text-[#173d3a]">{t("quote.box1_title", "Lembaga Berizin Resmi")}</p>
                <p className="mt-4 text-sm leading-6 text-[#66817a]">{t("quote.box1_text", "Memiliki izin operasional resmi dan terdaftar di Medan dengan kurikulum terstruktur.")}</p>
              </div>
              <div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]">
                <Sparkles size={24} />
                <p className="mt-14 font-['Fraunces'] text-3xl font-semibold leading-[.95] tracking-[-0.04em]">{t("quote.box2_title", "Pengalaman Riil Jerman")}</p>
                <p className="mt-4 text-sm leading-6 text-[#f7d5c5]">{t("quote.box2_text", "Dibimbing langsung oleh pendiri yang berpengalaman 6 tahun hidup mandiri dan berkarir di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="kabar" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex items-end justify-between gap-5">
            <div><SectionLabel>{t("news_sec.eyebrow", "Kabar Terkini")}</SectionLabel><h2 className="mt-5 font-['Fraunces'] text-3xl sm:text-5xl font-medium leading-none tracking-[-0.065em] text-[#173d3a]">{t("news_sec.title", "Catatan dan informasi penting dari Medan ke Jerman.")}</h2></div>
            <Link href="/berita" className="hidden items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46] sm:flex">{t("news_sec.see_all", "Buka semua kabar")} <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {newsList.map((update: any) => (
              <Link key={update.id || update.title} href={`/berita/${update.id || 1}`} className="group block">
                {update.imageUrl ? (
                  <div className="relative aspect-[1.24] overflow-hidden rounded-[1.2rem] border-2 border-[#173d3a] bg-[#173d3a]">
                    <img src={update.imageUrl} alt={update.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173d3a]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f5eee3]">
                      <span className="rounded-full bg-[#173d3a]/80 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">{update.category || update.tag || "Kabar"}</span>
                      <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                    </div>
                  </div>
                ) : (
                  <div className={`relative aspect-[1.24] overflow-hidden rounded-[1.2rem] ${update.tone === "coral" ? "bg-[#d86d50]" : update.tone === "sea" ? "bg-[#9ccabc]" : "bg-[#f4c76b]"}`}>
                    <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_45%,#173d3a_46%,#173d3a_49%,transparent_50%)] [background-size:30px_30px]" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <span className="rounded-full bg-[#f5eee3]/85 px-3 py-1.5 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#173d3a]">{update.category || update.tag || "Kabar"}</span>
                      <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                    </div>
                  </div>
                )}
                <div className="mt-5 flex items-center gap-3 font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#829891]"><CalendarDays size={13} />{update.date}</div>
                <h3 className="mt-3 max-w-sm font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#173d3a] transition-colors group-hover:text-[#d35f46]">{update.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-16 px-5 pb-24 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-32">
          <div><SectionLabel>{t("faq.eyebrow", "Pertanyaan yang Sering Muncul")}</SectionLabel><h2 className="mt-6 max-w-md font-['Fraunces'] text-3xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em] text-[#173d3a]">{t("faq.title", "Mari mulai dari apa yang ingin Anda ketahui.")}</h2></div>
          <div className="border-t border-[#173d3a]/20">
            {currentFaqs.map(([question, answer], index) => (
              <div key={question} className="border-b border-[#173d3a]/20">
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left">
                  <span className="font-['Fraunces'] text-xl sm:text-2xl font-semibold tracking-[-0.035em] text-[#173d3a]">{question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-[#d35f46] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && <p className="max-w-xl pb-6 pr-4 sm:pr-10 text-sm leading-6 text-[#66817a]">{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-5 mb-10 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
          <div className="absolute -bottom-28 right-[28%] h-56 w-56 rounded-full border-[28px] border-[#173d3a]/15" />
          <div className="relative z-10 max-w-2xl">
            <SectionLabel light>{t("cta_banner.eyebrow", "Langkah Berikutnya")}</SectionLabel>
            <h2 className="mt-6 font-['Fraunces'] text-3xl sm:text-5xl lg:text-7xl font-medium leading-[.94] tracking-[-0.065em]">{ctaTitle}</h2>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">{ctaSubtitle}</p>
            <a href={ctaButtonHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1" data-testid="link-landing-contact">
              {ctaButtonText} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}