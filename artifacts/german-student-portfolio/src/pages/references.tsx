import { useEffect, useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Handshake,
  Medal,
  Quote,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

type ReferenceStory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  result: string;
  resultLabel: string;
  tone: "butter" | "coral" | string;
};

const defaultReferenceStories: ReferenceStory[] = [
  {
    id: "catharine",
    eyebrow: "Berhasil di tahun ketiga Ausbildung",
    title: "Juara pertama kompetisi memasak tingkat muda",
    description: "Catharine Magdalena, peserta Ausbildung di Hotel Höpke, Bad Laer, mendapat penghargaan Juara 1 Jugendmeisterin Koch. Sebuah pencapaian yang lahir dari ketekunan, latihan, dan keberanian untuk terus belajar.",
    result: "1.",
    resultLabel: "Juara muda memasak",
    tone: "butter",
  },
  {
    id: "graduated",
    eyebrow: "Ausbildung berhasil diselesaikan",
    title: "Dari peserta menjadi rekan kerja",
    description: "Joshua Gabe, Rosinta Caterine Siregar, Fiter Sidabutar, dan Christian Siregar telah menyelesaikan Ausbildung mereka. Perjalanan mereka menunjukkan apa yang bisa terjadi ketika persiapan dan kesempatan bertemu.",
    result: "4",
    resultLabel: "Lulusan yang dirayakan",
    tone: "coral",
  },
];

function ReferencesLogo() {
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

function ReferencesLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f5eee3]" : "text-[#d35f46]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#f5eee3]" : "bg-[#d35f46]"}`} />
      {children}
    </div>
  );
}

function AchievementArtwork({ story, active }: { story: ReferenceStory; active: boolean }) {
  const Icon = story.id === "catharine" || story.result === "1." ? Trophy : UsersRound;
  return (
    <div className={`relative min-h-[390px] overflow-hidden rounded-[1.7rem] p-7 transition-transform duration-300 sm:p-10 ${story.tone === "butter" ? "bg-[#f4c76b] text-[#173d3a]" : "bg-[#d86d50] text-[#fff8ee]"} ${active ? "rotate-0" : "rotate-[1.5deg]"}`}>
      <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full border-[26px] border-[#f5eee3]/65" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border-[20px] border-[#173d3a]/15" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative z-10 flex items-start justify-between">
        <ReferencesLabel light={story.tone === "coral"}>{story.eyebrow}</ReferencesLabel>
        <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] opacity-65">Ref</span>
      </div>
      <div className="absolute bottom-9 left-8 right-8 z-10 sm:left-10 sm:right-10">
        <div className={`mb-5 grid h-16 w-16 place-items-center rounded-full border-2 ${story.tone === "butter" ? "border-[#173d3a] bg-[#d86d50]" : "border-[#f5eee3] bg-[#f4c76b] text-[#173d3a]"}`}><Icon size={30} /></div>
        <p className="font-['Fraunces'] text-6xl font-semibold leading-[.82] tracking-[-0.07em]">{story.result}</p>
        <p className="mt-4 max-w-xs font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] opacity-75">{story.resultLabel}</p>
      </div>
    </div>
  );
}

export default function References() {
  const { data: cmsData } = useCmsSection("references");
  const [activeStory, setActiveStory] = useState("catharine");

  const stories: ReferenceStory[] = useMemo(() => {
    if (cmsData?.stories && cmsData.stories.length > 0) {
      return cmsData.stories;
    }
    return defaultReferenceStories;
  }, [cmsData?.stories]);

  const selectedStory = stories.find((story) => story.id === activeStory) ?? stories[0] ?? defaultReferenceStories[0];

  useEffect(() => {
    document.title = `${cmsData?.title || "Referensi Keberhasilan"} — Lernpfad`;
    return () => {
      document.title = "Lernpfad — Talent Indonesia untuk Jerman";
    };
  }, [cmsData?.title]);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/referensi" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]"><ArrowLeft size={14} /> Kembali ke beranda</Link>
            <ReferencesLabel>{cmsData?.eyebrow || "Referensi keberhasilan"}</ReferencesLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-6xl font-medium leading-[.89] tracking-[-0.075em] sm:text-8xl">
              {cmsData?.title || "Bukti bahwa jalan ini bisa ditempuh."}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {cmsData?.description || "Di balik setiap penempatan ada latihan, keberanian, dan hasil yang layak dirayakan. Inilah beberapa momen dari perjalanan peserta Lernpfad."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]">
                <BadgeCheck size={14} className="text-[#d35f46]" /> Perjalanan nyata
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]">
                <Award size={14} className="text-[#d35f46]" /> Hasil yang terukur
              </span>
            </div>
          </div>
          <div className="relative">
            <AchievementArtwork story={selectedStory} active />
            <div className="absolute -bottom-7 -left-5 hidden w-52 -rotate-[5deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-4 shadow-[5px_6px_0_#173d3a] sm:block">
              <div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#66817a]">
                <Sparkles size={14} className="text-[#d35f46]" /> Momen untuk diingat
              </div>
              <p className="mt-3 font-['Fraunces'] text-xl font-semibold leading-none">Kecil bagi dunia. Besar bagi perjalanan.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Trophy size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Prestasi</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Kemampuan yang bertumbuh menjadi pencapaian.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Medal size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Ketahanan</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Tetap belajar saat perjalanan terasa baru.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><UsersRound size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">Komunitas</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">Keberhasilan yang dibangun bersama.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <ReferencesLabel>Yang sudah dicapai</ReferencesLabel>
              <h2 className="mt-6 max-w-md font-['Fraunces'] text-5xl font-medium leading-[.95] tracking-[-0.065em]">
                Cerita yang membuat <span className="text-[#d35f46]">kemungkinan terasa nyata.</span>
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
                Pilih satu momen untuk membaca konteks di balik hasilnya. Setiap peserta membawa cerita yang berbeda, tapi semuanya dimulai dari langkah pertama.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {stories.map((story) => (
                <button
                  type="button"
                  key={story.id}
                  onClick={() => setActiveStory(story.id)}
                  className={`group text-left ${activeStory === story.id ? "translate-y-0" : "translate-y-1"}`}
                >
                  <AchievementArtwork story={story} active={activeStory === story.id} />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.13em] text-[#d35f46]">{story.eyebrow}</p>
                      <h3 className="mt-2 font-['Fraunces'] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#173d3a]">{story.title}</h3>
                    </div>
                    <ArrowUpRight className="shrink-0 text-[#d35f46] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#173d3a] px-5 py-24 text-[#f5eee3] lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <ReferencesLabel light>Pelajaran dari perjalanan</ReferencesLabel>
              <Quote className="mt-8 text-[#f4c76b]" size={38} strokeWidth={1.2} />
              <blockquote className="mt-5 max-w-lg font-['Fraunces'] text-4xl font-medium leading-[.98] tracking-[-0.055em] sm:text-5xl">
                {cmsData?.quoteText || "“Hasil yang baik tidak datang sekaligus. Ia tumbuh dari hari-hari ketika seseorang memilih untuk terus mencoba.”"}
              </blockquote>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] bg-[#f4c76b] p-6 text-[#173d3a]">
                <Medal size={25} />
                <p className="mt-16 font-['Fraunces'] text-3xl font-semibold leading-[.95]">Kesiapan bisa dilatih</p>
                <p className="mt-4 text-sm leading-6 text-[#4f6b64]">Bahasa, keahlian, dan kepercayaan diri tumbuh melalui proses yang konsisten.</p>
              </div>
              <div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]">
                <HandshakeIcon />
                <p className="mt-16 font-['Fraunces'] text-3xl font-semibold leading-[.95]">Kesempatan perlu dijaga</p>
                <p className="mt-4 text-sm leading-6 text-[#f7d5c5]">Partner dan peserta sama-sama berperan dalam keberhasilan yang berkelanjutan.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <ReferencesLabel light>Langkah berikutnya</ReferencesLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-5xl font-medium leading-[.94] tracking-[-0.065em] sm:text-7xl">
              {cmsData?.ctaTitle || "Cerita berikutnya bisa dimulai dari sini."}
            </h2>
            <p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">
              {cmsData?.ctaSubtitle || "Kenali portfolio kandidat dan mulai percakapan dengan tim Lernpfad tentang kebutuhan perusahaan Anda."}
            </p>
            <Link href={cmsData?.ctaHref || "/ag-anfrage"} className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5eee3] px-5 py-3.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#173d3a] transition-transform hover:-translate-y-1">
              {cmsData?.ctaText || "Bicarakan kebutuhan partner"} <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

function HandshakeIcon() {
  return <Handshake size={25} />;
}