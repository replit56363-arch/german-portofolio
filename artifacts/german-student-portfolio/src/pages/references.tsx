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
import { useLanguage, type Language } from "@/lib/language-context";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

type ReferenceStory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  result: string;
  resultLabel: string;
  imageUrl?: string;
  tone: "butter" | "coral" | string;
};

const localizedStories: Record<Language, ReferenceStory[]> = {
  id: [
    {
      id: "catharine",
      eyebrow: "Berhasil di tahun ketiga Ausbildung",
      title: "Juara pertama kompetisi memasak tingkat muda",
      description: "Catharine Magdalena, peserta Ausbildung di Hotel Höpke, Bad Laer, mendapat penghargaan Juara 1 Jugendmeisterin Koch. Sebuah pencapaian yang lahir dari ketekunan, latihan, dan keberanian untuk terus belajar.",
      result: "1.",
      resultLabel: "Juara muda memasak di Jerman",
      tone: "butter",
    },
    {
      id: "graduated",
      eyebrow: "Ausbildung berhasil diselesaikan",
      title: "Dari peserta bimbingan menjadi profesional mandiri",
      description: "Joshua Gabe, Rosinta Caterine Siregar, Fiter Sidabutar, dan Christian Siregar telah menyelesaikan Ausbildung mereka. Perjalanan mereka menunjukkan apa yang bisa terjadi ketika persiapan yang matang dan kesempatan bertemu.",
      result: "4",
      resultLabel: "Lulusan yang dirayakan bersama",
      tone: "coral",
    },
  ],
  de: [
    {
      id: "catharine",
      eyebrow: "Erfolg im 3. Ausbildungsjahr",
      title: "1. Platz bei der Jugendmeisterschaft der Köche",
      description: "Catharine Magdalena, Auszubildende im Hotel Höpke in Bad Laer, wurde als Jugendmeisterin im Kochen ausgezeichnet. Ein großartiger Erfolg dank Ausdauer, Disziplin und stetiger Lernbereitschaft.",
      result: "1.",
      resultLabel: "Jugendmeisterin im Kochen in Deutschland",
      tone: "butter",
    },
    {
      id: "graduated",
      eyebrow: "Erfolgreich abgeschlossene Ausbildung",
      title: "Von Teilnehmenden zu anerkannten Fachkräften",
      description: "Joshua Gabe, Rosinta Caterine Siregar, Fiter Sidabutar und Christian Siregar haben ihre Ausbildung in Deutschland erfolgreich abgeschlossen. Ihr Weg beweist, wie gezielte Vorbereitung zu echter beruflicher Zukunft führt.",
      result: "4",
      resultLabel: "Erfolgreiche Absolventen gefeiert",
      tone: "coral",
    },
  ],
  en: [
    {
      id: "catharine",
      eyebrow: "Success in the 3rd year of Ausbildung",
      title: "1st Place in the Youth Culinary Championship",
      description: "Catharine Magdalena, vocational trainee at Hotel Höpke in Bad Laer, earned 1st Place as Jugendmeisterin Koch. An inspiring achievement born from dedication, practice, and the courage to excel.",
      result: "1.",
      resultLabel: "Youth Culinary Champion in Germany",
      tone: "butter",
    },
    {
      id: "graduated",
      eyebrow: "Vocational training completed",
      title: "From trainees to recognized professionals",
      description: "Joshua Gabe, Rosinta Caterine Siregar, Fiter Sidabutar, and Christian Siregar have successfully finished their Ausbildung. Their journey demonstrates the power of solid preparation paired with real opportunity.",
      result: "4",
      resultLabel: "Graduates celebrated together",
      tone: "coral",
    },
  ],
};

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
      {story.imageUrl ? (
        <img
          src={story.imageUrl}
          alt={story.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full border-[26px] border-[#f5eee3]/65" />
          <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border-[20px] border-[#173d3a]/15" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#173d3a_1px,transparent_1px),linear-gradient(90deg,#173d3a_1px,transparent_1px)] [background-size:38px_38px]" />
        </>
      )}
      {story.imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#173d3a]/85 via-black/30 to-black/20" />
      )}
      <div className="relative z-10 flex items-start justify-between text-[#f5eee3]">
        <ReferencesLabel light={Boolean(story.imageUrl) || story.tone === "coral"}>{story.eyebrow}</ReferencesLabel>
        <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] opacity-80">Alumni</span>
      </div>
      <div className="absolute bottom-9 left-8 right-8 z-10 sm:left-10 sm:right-10 text-[#f5eee3]">
        <div className={`mb-5 grid h-16 w-16 place-items-center rounded-full border-2 ${story.tone === "butter" && !story.imageUrl ? "border-[#173d3a] bg-[#d86d50] text-[#f5eee3]" : "border-[#f5eee3] bg-[#f4c76b] text-[#173d3a]"}`}><Icon size={30} /></div>
        <p className="font-['Fraunces'] text-6xl font-semibold leading-[.82] tracking-[-0.07em]">{story.result}</p>
        <p className="mt-4 max-w-xs font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] opacity-85">{story.resultLabel}</p>
      </div>
    </div>
  );
}

export default function References() {
  const { language, t } = useLanguage();
  const { data: cmsData } = useCmsSection("references");
  const [activeStory, setActiveStory] = useState("catharine");

  const stories: ReferenceStory[] = useMemo(() => {
    if (cmsData?.stories && cmsData.stories.length > 0) {
      return cmsData.stories;
    }
    return localizedStories[language] || localizedStories.id;
  }, [cmsData?.stories, language]);

  const selectedStory = stories.find((story) => story.id === activeStory) ?? stories[0];

  useEffect(() => {
    document.title = `${t("ref.eyebrow", "Kisah Sukses Alumni")} — ICH LIEBE DEUTSCH MEDAN`;
  }, [language, t]);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f5eee3] text-[#173d3a]">
      <PublicNavbar activeRoute="/referensi" />

      <main>
        <section className="mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-24">
          <div>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 font-mono-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#77918b] hover:text-[#d35f46]">
              <ArrowLeft size={14} /> {t("common.back_home", "Kembali ke beranda")}
            </Link>
            <ReferencesLabel>{t("ref.eyebrow", "Kisah Sukses Alumni")}</ReferencesLabel>
            <h1 className="mt-6 max-w-2xl font-['Fraunces'] text-5xl font-medium leading-[.92] tracking-[-0.075em] sm:text-7xl lg:text-8xl">
              {t("ref.title", "Bukti nyata dari tekad, kerja keras, dan bimbingan.")}
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#55736b]">
              {t("ref.subtitle", "Cerita inspiratif para peserta bimbingan yang telah berhasil berkarya dan menjalani kehidupan mandiri di Jerman.")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]">
                <BadgeCheck size={14} className="text-[#d35f46]" /> {t("ref.badge_real", "Perjalanan Nyata")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-3 py-2 text-xs font-semibold text-[#486961]">
                <Award size={14} className="text-[#d35f46]" /> {t("ref.badge_measured", "Prestasi Terukur")}
              </span>
            </div>
          </div>
          <div className="relative">
            <AchievementArtwork story={selectedStory} active />
            <div className="absolute -bottom-7 -left-5 hidden w-56 -rotate-[5deg] rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] p-4 shadow-[5px_6px_0_#173d3a] sm:block">
              <div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.12em] text-[#66817a]">
                <Sparkles size={14} className="text-[#d35f46]" /> {t("ref.badge_moments", "Momen Untuk Diingat")}
              </div>
              <p className="mt-3 font-['Fraunces'] text-xl font-semibold leading-none">{t("ref.badge_moments_sub", "Langkah awal menentukan masa depan.")}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#173d3a]/15 bg-[#e7f0e9]">
          <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-8 sm:grid-cols-3 lg:px-8">
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Trophy size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("ref.col1_title", "Prestasi")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("ref.col1_text", "Kemampuan yang bertumbuh menjadi pencapaian nyata di Jerman.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><Medal size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("ref.col2_title", "Ketahanan")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("ref.col2_text", "Tetap disiplin dan percaya diri saat menghadapi lingkungan baru.")}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5eee3] text-[#d35f46]"><UsersRound size={19} /></div>
              <div>
                <p className="font-['Fraunces'] text-2xl font-semibold leading-none">{t("ref.col3_title", "Komunitas")}</p>
                <p className="mt-2 text-sm leading-5 text-[#66817a]">{t("ref.col3_text", "Jejaring alumni yang saling mendukung di berbagai kota di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <ReferencesLabel>{t("ref.stories_eyebrow", "Yang Sudah Dicapai")}</ReferencesLabel>
              <h2 className="mt-6 max-w-md font-['Fraunces'] text-4xl sm:text-5xl font-medium leading-[.95] tracking-[-0.065em]">
                {t("ref.stories_title", "Cerita yang membuat kemungkinan terasa nyata.")}
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-7 text-[#66817a]">
                {t("ref.stories_desc", "Pilih salah satu momen untuk membaca konteks di balik hasilnya. Setiap peserta membawa cerita yang berbeda, namun semuanya dimulai dari langkah pertama belajar bahasa.")}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {stories.map((story) => (
                <button
                  type="button"
                  key={story.id}
                  onClick={() => setActiveStory(story.id)}
                  className={`group text-left transition-all ${activeStory === story.id ? "translate-y-0" : "translate-y-1"}`}
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
              <ReferencesLabel light>{t("ref.quote_eyebrow", "Pelajaran Dari Perjalanan")}</ReferencesLabel>
              <Quote className="mt-8 text-[#f4c76b]" size={38} strokeWidth={1.2} />
              <blockquote className="mt-5 max-w-lg font-['Fraunces'] text-3xl sm:text-4xl font-medium leading-[1.05] tracking-[-0.05em]">
                {t("ref.quote_body", "“Hasil yang baik tidak datang sekaligus. Ia tumbuh dari hari-hari ketika seseorang memilih untuk terus belajar, berlatih, dan berani mencoba.”")}
              </blockquote>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.3rem] bg-[#f4c76b] p-6 text-[#173d3a]">
                <Medal size={25} />
                <p className="mt-16 font-['Fraunces'] text-2xl sm:text-3xl font-semibold leading-[.95]">{t("ref.box1_title", "Kesiapan Bisa Dilatih")}</p>
                <p className="mt-4 text-sm leading-6 text-[#4f6b64]">{t("ref.box1_text", "Bahasa, keahlian, dan kepercayaan diri tumbuh melalui proses bimbingan yang konsisten.")}</p>
              </div>
              <div className="rounded-[1.3rem] bg-[#d35f46] p-6 text-[#fff8ee]">
                <Handshake size={25} />
                <p className="mt-16 font-['Fraunces'] text-2xl sm:text-3xl font-semibold leading-[.95]">{t("ref.box2_title", "Peluang Terbuka Lebar")}</p>
                <p className="mt-4 text-sm leading-6 text-[#f7d5c5]">{t("ref.box2_text", "Lembaga dan peserta sama-sama berperan dalam membangun keberhasilan masa depan di Jerman.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-5 mb-10 mt-20 overflow-hidden rounded-[1.8rem] bg-[#d35f46] px-6 py-16 text-[#fff8ee] sm:px-12 lg:mx-auto lg:max-w-[1240px] lg:px-20 lg:py-20">
          <div className="relative max-w-2xl">
            <div className="absolute -right-56 -top-32 h-80 w-80 rounded-full border-[44px] border-[#f4c76b]/70" />
            <ReferencesLabel light>{t("cta_banner.eyebrow", "Langkah Berikutnya")}</ReferencesLabel>
            <h2 className="relative mt-6 font-['Fraunces'] text-4xl sm:text-6xl font-medium leading-[.94] tracking-[-0.065em]">
              {t("ref.cta_title", "Cerita sukses berikutnya bisa dimulai dari Anda.")}
            </h2>
            <p className="relative mt-6 max-w-lg text-[15px] leading-7 text-[#f9d6c9]">
              {t("ref.cta_subtitle", "Mulai persiapan bahasa Jerman dan bimbingan 5 program resmi bersama ICH LIEBE DEUTSCH MEDAN.")}
            </p>
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
