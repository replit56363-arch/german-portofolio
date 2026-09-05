import { useEffect, useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Handshake,
  Languages,
  Plane,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage, type Language } from "@/lib/language-context";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

type ServiceStage = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  icon?: any;
  tone?: "coral" | "sea" | "butter" | "ink" | "lavender" | "sand" | string;
};

const localizedStages: Record<Language, ServiceStage[]> = {
  id: [
    {
      number: "01",
      title: "Rekrutmen & Pendaftaran",
      shortTitle: "Tahap 01",
      description: "Pendaftaran calon siswa di Medan, tes bakat minat, dan pemetaan jalur ke Jerman (Ausbildung, Au Pair, FSJ, G to G, Kuliah).",
      icon: UsersRound,
      tone: "coral",
    },
    {
      number: "02",
      title: "Kursus Bahasa Jerman Terarah",
      shortTitle: "Tahap 02",
      description: "Pelatihan intensif tingkat A1 hingga B1/B2 berstandar Goethe-Institut dengan metode komunikatif langsung dari lulusan UNIMED.",
      icon: Languages,
      tone: "sea",
    },
    {
      number: "03",
      title: "Persiapan Berkas & Wawancara",
      shortTitle: "Tahap 03",
      description: "Penyusunan CV Jerman (Lebenslauf), surat motivasi (Anschreiben), dan simulasi wawancara kerja dengan perusahaan di Jerman.",
      icon: FileCheck2,
      tone: "butter",
    },
    {
      number: "04",
      title: "Kontrak Resmi & Pengajuan Visa",
      shortTitle: "Tahap 04",
      description: "Penerbitan kontrak Ausbildung resmi, pengurusan dokumen kedutaan, asuransi kesehatan, dan pengajuan visa nasional Jerman.",
      icon: ShieldCheck,
      tone: "ink",
    },
    {
      number: "05",
      title: "Pembekalan Budaya & Keberangkatan",
      shortTitle: "Tahap 05",
      description: "Pembekalan hidup mandiri di Jerman (Interkulturelle Vorbereitung), tiket penerbangan terkoordinasi, dan arahan bandara.",
      icon: Plane,
      tone: "lavender",
    },
    {
      number: "06",
      title: "Penyambutan & Registrasi Kota",
      shortTitle: "Tahap 06",
      description: "Bantuan awal saat tiba di Jerman: registrasi kependudukan (Anmeldung), rekening bank, SIM card, dan orientasi tempat tinggal.",
      icon: Globe2,
      tone: "sand",
    },
    {
      number: "07",
      title: "Pendampingan Berkelanjutan",
      shortTitle: "Tahap 07",
      description: "Komunikasi dan pendampingan tetap berjalan selama masa Ausbildung hingga siswa mandiri dan sukses berkarya di Jerman.",
      icon: Handshake,
      tone: "sea",
    },
  ],
  de: [
    {
      number: "01",
      title: "Auswahl & Erstberatung",
      shortTitle: "Phase 01",
      description: "Analyse von Eignung, Sprachstand und Zielen der Teilnehmenden in Medan für die passenden offiziellen Wege nach Deutschland.",
      icon: UsersRound,
      tone: "coral",
    },
    {
      number: "02",
      title: "Gezielter Deutschunterricht",
      shortTitle: "Phase 02",
      description: "Intensiver Sprachunterricht von A1 bis B1/B2 nach Goethe-Standards durch erfahrene muttersprachlich geschulte Lehrkräfte.",
      icon: Languages,
      tone: "sea",
    },
    {
      number: "03",
      title: "Bewerbungsunterlagen & Coaching",
      shortTitle: "Phase 03",
      description: "Erstellung von tabellarischem Lebenslauf, Anschreiben und intensive Simulation von Vorstellungsgesprächen mit Betrieben.",
      icon: FileCheck2,
      tone: "butter",
    },
    {
      number: "04",
      title: "Ausbildungsvertrag & Visum",
      shortTitle: "Phase 04",
      description: "Unterzeichnung des Ausbildungsvertrags, Vorbereitung der Behördendokumente, Krankenversicherung und nationaler Visumantrag.",
      icon: ShieldCheck,
      tone: "ink",
    },
    {
      number: "05",
      title: "Interkulturelle Vorbereitung",
      shortTitle: "Phase 05",
      description: "Vorbereitung auf den deutschen Arbeits- und Lebensalltag, Pünktlichkeit, Flugkoordination und Reiseorganisation.",
      icon: Plane,
      tone: "lavender",
    },
    {
      number: "06",
      title: "Ankunft & Behördengänge",
      shortTitle: "Phase 06",
      description: "Unterstützung beim Start in Deutschland: Anmeldung beim Bürgeramt, Eröffnung des Bankkontos und Begleitung zur Unterkunft.",
      icon: Globe2,
      tone: "sand",
    },
    {
      number: "07",
      title: "Fortlaufende Begleitung",
      shortTitle: "Phase 07",
      description: "Feste Ansprechpartner vor Ort während der gesamten Ausbildungszeit für Betrieb und Auszubildende.",
      icon: Handshake,
      tone: "sea",
    },
  ],
  en: [
    {
      number: "01",
      title: "Recruitment & Profiling",
      shortTitle: "Stage 01",
      description: "Initial assessment and pathway selection in Medan based on academic background, language aptitude, and career ambitions.",
      icon: UsersRound,
      tone: "coral",
    },
    {
      number: "02",
      title: "Targeted German Language Courses",
      shortTitle: "Stage 02",
      description: "Intensive training from A1 through B1/B2 following Goethe-Institut standards, guided by UNIMED German Education faculty.",
      icon: Languages,
      tone: "sea",
    },
    {
      number: "03",
      title: "Documentation & Interview Prep",
      shortTitle: "Stage 03",
      description: "Preparation of German-standard CVs, motivation letters, and mock interviews with partner companies or host families.",
      icon: FileCheck2,
      tone: "butter",
    },
    {
      number: "04",
      title: "Official Contracts & Visa Process",
      shortTitle: "Stage 04",
      description: "Securing training contracts (Ausbildungsvertrag), embassy appointments, health coverage, and national visa approvals.",
      icon: ShieldCheck,
      tone: "ink",
    },
    {
      number: "05",
      title: "Intercultural Orientation & Travel",
      shortTitle: "Stage 05",
      description: "Briefing on everyday German living, work ethics, ticket arrangements, and departure preparation.",
      icon: Plane,
      tone: "lavender",
    },
    {
      number: "06",
      title: "Arrival & City Registration",
      shortTitle: "Stage 06",
      description: "Support upon touchdown in Germany: residence registration (Anmeldung), local bank account opening, and housing settling.",
      icon: Globe2,
      tone: "sand",
    },
    {
      number: "07",
      title: "Ongoing Mentorship",
      shortTitle: "Stage 07",
      description: "Continuous contact and troubleshooting throughout the vocational training period until students achieve full independence.",
      icon: Handshake,
      tone: "sea",
    },
  ],
};

function ServicesLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function StageArtwork({ stage }: { stage: ServiceStage }) {
  const tones: Record<string, string> = {
    coral: "bg-[#d86d50]",
    sea: "bg-[#9ccabc]",
    butter: "bg-[#f4c76b]",
    ink: "bg-[#244f4a]",
    lavender: "bg-[#c6c8dc]",
    sand: "bg-[#e7d1bd]",
  };
  const Icon = typeof stage.icon === "function" ? stage.icon : UsersRound;
  const toneBg = tones[stage.tone || "coral"] || tones.coral;

  return (
    <div className={`relative min-h-[285px] overflow-hidden rounded-[1.5rem] p-7 text-[#173d3a] ${toneBg}`}>
      <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[24px] border-[#f5eee3]/60" />
      <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[18px] border-[#173d3a]/15" />
      <div className="relative z-10 flex items-start justify-between">
        <Icon size={28} strokeWidth={1.7} />
        <span className="font-mono-ui text-[10px] font-bold tracking-[0.12em] opacity-60">{stage.number}</span>
      </div>
      <div className="relative z-10 mt-20">
        <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] opacity-65">{stage.shortTitle}</p>
        <h3 className="mt-2 max-w-xs font-['Fraunces'] text-4xl font-semibold leading-[.92] tracking-[-0.055em]">{stage.title}</h3>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeStage, setActiveStage] = useState(0);
  const { language, t } = useLanguage();
  const { data: cmsData } = useCmsSection("services");

  const stages: ServiceStage[] = useMemo(() => {
    return localizedStages[language] || localizedStages.id;
  }, [language]);

  useEffect(() => {
    document.title = `${t("services.eyebrow", "5 Program Kursus & Jalur Ke Jerman")} — ICH LIEBE DEUTSCH MEDAN`;
  }, [language, t]);

  const selectedStage = stages[activeStage] || stages[0];
  const SelectedIcon = typeof selectedStage.icon === "function" ? selectedStage.icon : UsersRound;

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/layanan" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]">
              <ArrowLeft size={14} /> {t("common.back_home", "Kembali ke beranda")}
            </Link>
            <ServicesLabel>{t("services.eyebrow", "5 Program Kursus & Jalur Ke Jerman")}</ServicesLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-5xl font-medium leading-[.92] tracking-[-0.075em] sm:text-7xl lg:text-8xl">
              {t("services.title", "Pendidikan dan pelatihan terarah menuju Jerman.")}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {t("services.description", "Kami menyediakan kursus bahasa Jerman komprehensif dan bimbingan lengkap untuk 5 program resmi: Ausbildung, Au Pair, FSJ/BFD, G to G Perawat, dan Kuliah/Studium.")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://wa.me/6282127324453" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d35f46] px-5 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:shadow-[7px_8px_0_#173d3a]">
                {t("services.primary_cta", "Mulai Konsultasi")} <ArrowUpRight size={16} />
              </a>
              <Link href="/jakarta#formulir" className="inline-flex w-fit items-center gap-2 px-3 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#486961] hover:text-[#d35f46]">
                {t("common.contact_us", "Hubungi Kami")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="relative">
            <StageArtwork stage={selectedStage} />
            <div className="absolute -bottom-7 -left-5 hidden w-52 -rotate-[5deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-4 shadow-[5px_6px_0_#173d3a] sm:block">
              <div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#66817a]">
                <BadgeCheck size={14} className="text-[#d35f46]" /> {t("services.badge_track", "Jalur Resmi Terverifikasi")}
              </div>
              <p className="mt-3 font-['Fraunces'] text-xl font-semibold leading-none">{t("services.badge_track_desc", "Dari Medan langsung terhubung ke Jerman.")}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Languages size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("services.pillar1_title", "Kurikulum Goethe Standar")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("services.pillar1_text", "Materi terstruktur dari tingkat dasar A1 sampai kemahiran B2.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><FileCheck2 size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("services.pillar2_title", "Proses Transparan")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("services.pillar2_text", "Setiap tahap bimbingan terdokumentasi rapi tanpa perantara gelap.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><ShieldCheck size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("services.pillar3_title", "Pendampingan Holistik")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("services.pillar3_text", "Bimbingan bahasa, dokumen kontrak, visa, hingga adaptasi di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <ServicesLabel>{t("services.workflow_eyebrow", "Alur Bimbingan Kami")}</ServicesLabel>
              <h2 className="mt-6 max-w-md font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em]">
                {t("services.workflow_title", "Satu perjalanan terpadu, 7 tahap utama.")}
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
                {t("services.workflow_subtitle", "Pilih salah satu tahap untuk melihat apa yang dipelajari dan dipersiapkan di dalamnya.")}
              </p>
              <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#486961]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f0e9] text-[#d35f46]"><Check size={15} strokeWidth={3} /></span>
                1. Ausbildung · 2. Au Pair · 3. FSJ/BFD · 4. G to G · 5. Kuliah
              </div>
            </div>
            <div>
              <div className="grid gap-2 sm:grid-cols-2">
                {stages.map((stage, index) => {
                  const Icon = typeof stage.icon === "function" ? stage.icon : UsersRound;
                  return (
                    <button
                      type="button"
                      key={stage.number + stage.title}
                      onClick={() => setActiveStage(index)}
                      className={`group flex items-start gap-4 rounded-[1.1rem] border p-5 text-left transition-all ${
                        activeStage === index
                          ? "border-[#173d3a] bg-[#173d3a] text-[#f5eee3] shadow-[5px_5px_0_#d35f46]"
                          : "border-[#173d3a]/15 bg-[#fffaf2] text-[#173d3a] hover:-translate-y-1 hover:border-[#d35f46]"
                      }`}
                    >
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${activeStage === index ? "bg-[#f4c76b] text-[#173d3a]" : "bg-[#e7f0e9] text-[#d35f46]"}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className={`font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] ${activeStage === index ? "text-[#a9d5c8]" : "text-[#829891]"}`}>{stage.number}</p>
                        <h3 className="mt-1 font-['Fraunces'] text-2xl font-semibold leading-[.95] tracking-[-0.035em]">{stage.title}</h3>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 rounded-[1.3rem] bg-[#f4c76b] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[#d35f46]">
                  <SelectedIcon size={22} />
                  <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.15em]">{t("services.stage_selected_title", "Tahap")} {selectedStage.number}</span>
                </div>
                <h3 className="mt-5 font-['Fraunces'] text-3xl sm:text-4xl font-semibold leading-none tracking-[-0.05em] text-[#173d3a]">{selectedStage.title}</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#4f6b64]">{selectedStage.description}</p>
                <Link href="/jakarta#formulir" className="mt-7 inline-flex items-center gap-2 border-b border-[#d35f46] pb-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#d35f46]">
                  {t("services.talk_needs", "Konsultasikan Kebutuhan Anda")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <ServicesLabel light>{t("services.results_eyebrow", "Komitmen Kualitas Kami")}</ServicesLabel>
              <h2 className="mt-6 max-w-2xl font-['Fraunces'] text-4xl sm:text-6xl lg:text-7xl font-medium leading-[.94] tracking-[-0.065em]">
                {t("services.results_title", "Siswa mendapat kompetensi nyata. Masa depan terbuka lebar.")}
              </h2>
              <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#a9c5bb]">
                {t("services.results_subtitle", "Fokus kami adalah membentuk kandidat mandiri yang menguasai bahasa Jerman dan siap beradaptasi dengan budaya kerja profesional Jerman.")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.3rem] bg-[#f5eee3] p-6 text-[#173d3a]">
                <UsersRound size={24} className="text-[#d35f46]" />
                <p className="mt-14 font-['Fraunces'] text-2xl sm:text-3xl font-semibold leading-[.95]">{t("services.card_understood_title", "Kandidat yang Dipersiapkan")}</p>
                <p className="mt-4 text-sm leading-6 text-[#66817a]">{t("services.card_understood_text", "Bukan sekadar lulus ujian hafalan, namun mampu berkomunikasi aktif sehari-hari.")}</p>
              </div>
              <div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]">
                <Handshake size={24} />
                <p className="mt-14 font-['Fraunces'] text-2xl sm:text-3xl font-semibold leading-[.95]">{t("services.card_relation_title", "Jejaring Alumni di Jerman")}</p>
                <p className="mt-4 text-sm leading-6 text-[#f7d5c5]">{t("services.card_relation_text", "Komunitas alumni yang siap menyambut dan berbagi tips hidup di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <ServicesLabel light>{t("cta_banner.eyebrow", "Langkah Berikutnya")}</ServicesLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-4xl sm:text-6xl lg:text-7xl font-medium leading-[.94] tracking-[-0.065em]">
              {t("cta_banner.title", "Wujudkan impian masa depan Anda di Jerman bersama kami.")}
            </h2>
            <p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">
              {t("cta_banner.subtitle", "Konsultasikan impian dan rencana Anda bersama tim ICH LIEBE DEUTSCH MEDAN. Kami siap mendampingi dari nol hingga tiba di Jerman.")}
            </p>
            <a href="https://wa.me/6282127324453" target="_blank" rel="noreferrer" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {t("cta_banner.button", "Hubungi WhatsApp Kami")} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
