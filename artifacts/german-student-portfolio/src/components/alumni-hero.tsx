import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  UsersRound,
  ShieldCheck,
  Building2,
  Globe2,
} from "lucide-react";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";

export interface HeroAlumnus {
  id: string | number;
  name: string;
  imageUrl: string;
}

const defaultHeroAlumni: HeroAlumnus[] = [
  {
    id: 1,
    name: "Siti Rahmawati",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
  },
  {
    id: 2,
    name: "Ahmad Fauzi",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
  },
  {
    id: 3,
    name: "Nadia Anggraini",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
  },
  {
    id: 4,
    name: "Reza Pratama",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    id: 5,
    name: "Dian Permata",
    imageUrl: "https://images.unsplash.com/photo-1594824813593-455b85efb7cb?w=800&q=80",
  },
  {
    id: 6,
    name: "Budi Santoso",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  },
];

interface AlumniHeroProps {
  onScrollToApproach?: () => void;
}

export function AlumniHero({ onScrollToApproach }: AlumniHeroProps) {
  const { language, t } = useLanguage();
  const { data: homeCms } = useCmsSection("home");
  const { data: alumniCms } = useCmsSection("alumni");

  // Extract only image and name as requested: "gambar dan namanya saja yang di ambil"
  const alumniList: HeroAlumnus[] = useMemo(() => {
    if (alumniCms?.items && Array.isArray(alumniCms.items) && alumniCms.items.length > 0) {
      return alumniCms.items.map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        name: item.name || `Alumni ${idx + 1}`,
        imageUrl: item.imageUrl || "",
      }));
    }
    return defaultHeroAlumni;
  }, [alumniCms]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Auto cycle every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused || alumniList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alumniList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, alumniList.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % alumniList.length);
  }, [alumniList.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + alumniList.length) % alumniList.length);
  }, [alumniList.length]);

  const handleImageError = (id: string | number) => {
    setFailedImages((prev) => ({ ...prev, [String(id)]: true }));
  };

  const activeAlumnus = alumniList[currentIndex] || alumniList[0] || defaultHeroAlumni[0];

  const title =
    language !== "id"
      ? t("hero.title", homeCms?.title)
      : homeCms?.title || "ICH LIEBE DEUTSCH MEDAN";

  const description =
    language !== "id"
      ? t("hero.description", homeCms?.description)
      : homeCms?.description ||
        "Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik bersama pendiri lulusan UNIMED yang berpengalaman 6 tahun tinggal di Jerman.";

  const primaryCta =
    language !== "id"
      ? t("hero.cta_wa", homeCms?.primaryCta)
      : homeCms?.primaryCta || "Konsultasi WhatsApp";

  const primaryCtaHref = homeCms?.primaryCtaHref || "https://wa.me/6282127324453";

  const eyebrow =
    language !== "id"
      ? t("hero.eyebrow", homeCms?.eyebrow)
      : homeCms?.eyebrow || "Lembaga Kursus Bahasa Jerman Resmi · Medan";

  // Initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-28 lg:pt-20">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-24 -z-0 h-96 w-96 rounded-full bg-[#e7d1bd]/60 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 -z-0 h-80 w-80 rounded-full bg-[#9ccabc]/25 blur-3xl" />

      {/* Left Column: Heading, value proposition, CTAs and alumni trust metrics */}
      <div className="relative z-10">
        <div className="landing-rise flex items-center gap-3 font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#d35f46]">
          <span className="h-px w-8 bg-[#d35f46]" />
          <span>{eyebrow}</span>
        </div>

        <h1
          className="landing-rise-2 mt-6 max-w-2xl font-['Fraunces'] text-[clamp(2.4rem,5.4vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[#173d3a]"
          data-testid="text-landing-title"
        >
          {title}
        </h1>

        <p
          className="landing-rise-3 mt-6 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-[#4f6f67]"
          data-testid="text-landing-description"
        >
          {description}
        </p>

        {/* Action buttons */}
        <div className="landing-rise-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href={primaryCtaHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-[#d35f46] px-6 py-3.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] text-[#fff8ee] shadow-[5px_5px_0_#173d3a] transition-all hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#173d3a]"
            data-testid="link-landing-primary-cta"
          >
            {primaryCta}{" "}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <Link
            href="/alumni"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[#173d3a] bg-[#f5eee3] px-5 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] text-[#173d3a] shadow-[4px_4px_0_#173d3a] transition-all hover:-translate-y-0.5 hover:bg-[#e7f0e9]"
            data-testid="link-landing-alumni-gallery"
          >
            {language !== "id" ? t("hero.see_alumni", "Alumni-Galerie") : "Galeri Foto Alumni"}{" "}
            <ArrowRight
              size={15}
              className="text-[#d35f46] transition-transform group-hover:translate-x-1"
            />
          </Link>

          {onScrollToApproach && (
            <button
              type="button"
              onClick={onScrollToApproach}
              className="inline-flex items-center gap-1.5 px-2 py-2 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#55736b] transition-colors hover:text-[#d35f46]"
              data-testid="button-landing-secondary-cta"
            >
              {t("hero.cta_approach", "Kenali Pendekatan")}{" "}
              <ArrowDownRight size={15} />
            </button>
          )}
        </div>

        {/* Real Alumni Social Proof Stack */}
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-[#173d3a]/15 bg-[#fff8ee]/70 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex -space-x-3 overflow-hidden">
            {alumniList.slice(0, 5).map((alumnus, idx) => {
              const hasError = failedImages[String(alumnus.id)];
              return (
                <div
                  key={alumnus.id}
                  className="relative inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-[#fff8ee] bg-[#173d3a] shadow-sm ring-1 ring-[#173d3a]/20"
                  title={alumnus.name}
                >
                  {alumnus.imageUrl && !hasError ? (
                    <img
                      src={alumnus.imageUrl}
                      alt={alumnus.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top"
                      onError={() => handleImageError(alumnus.id)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#173d3a] font-mono-ui text-[11px] font-bold text-[#f4c76b]">
                      {getInitials(alumnus.name)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs">
            <p className="font-bold text-[#173d3a]">
              {language !== "id"
                ? `${alumniList.length}+ Erfolgreiche Alumni in Deutschland`
                : `${alumniList.length}+ Alumni Berhasil di Berbagai Kota Jerman`}
            </p>
            <p className="font-mono-ui text-[10px] text-[#6b867e]">
              {language !== "id"
                ? "Frankfurt · München · Köln · Hamburg · Stuttgart · Aachen"
                : "Frankfurt · München · Köln · Hamburg · Stuttgart · Aachen"}
            </p>
          </div>
        </div>

        {/* Real Alumni Track Record Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#173d3a]/20 pt-5">
          <div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#d35f46] shrink-0" />
              <p className="font-mono-ui text-lg sm:text-xl font-bold text-[#173d3a]">100%</p>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-[#6b867e] leading-tight">
              {language !== "id" ? "Visabewilligungsrate" : "Persetujuan Visa"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <Building2 size={15} className="text-[#d35f46] shrink-0" />
              <p className="font-mono-ui text-lg sm:text-xl font-bold text-[#173d3a]">25+</p>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-[#6b867e] leading-tight">
              {language !== "id" ? "Einsatzstädte in DE" : "Kota di Jerman"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#d35f46] shrink-0" />
              <p className="font-mono-ui text-lg sm:text-xl font-bold text-[#173d3a]">5 Jalur</p>
            </div>
            <p className="mt-1 text-[11px] sm:text-xs text-[#6b867e] leading-tight">
              {language !== "id" ? "Offizielle Wege" : "Program Resmi"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Prominent Alumni Hero Showcase (strictly image and name!) */}
      <div
        className="landing-drift relative z-10 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="relative mx-auto w-full max-w-[460px]">
          {/* Main Spotlight Card */}
          <div className="group relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-[2.2rem] border-2 border-[#173d3a] bg-[#173d3a] shadow-[14px_16px_0_#173d3a] transition-all duration-300">
            {/* Background Alumnus Image */}
            {activeAlumnus.imageUrl && !failedImages[String(activeAlumnus.id)] ? (
              <img
                src={activeAlumnus.imageUrl}
                alt={activeAlumnus.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                onError={() => handleImageError(activeAlumnus.id)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#173d3a] via-[#21534f] to-[#122e2b] p-6 text-center text-[#f5eee3]">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f4c76b]/20 font-['Fraunces'] text-3xl font-bold text-[#f4c76b] ring-2 ring-[#f4c76b]/40">
                  {getInitials(activeAlumnus.name)}
                </div>
                <p className="font-['Fraunces'] text-2xl font-semibold">{activeAlumnus.name}</p>
                <p className="mt-2 font-mono-ui text-xs text-[#a9d5c8]">Alumni Resmi di Jerman</p>
              </div>
            )}

            {/* High-contrast gradient scrim for text legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e2422]/95 via-[#0e2422]/40 to-transparent" />

            {/* Top Bar on Card: Badge and Next/Prev Controls */}
            <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#173d3a]/85 px-3 py-1 font-mono-ui text-[10px] font-semibold tracking-wider text-[#f4c76b] shadow-sm backdrop-blur-md">
                <Sparkles size={12} className="text-[#f4c76b]" />
                <span>
                  {language !== "id" ? "Alumni in Deutschland" : "Alumni di Jerman"}
                </span>
              </div>

              {/* Prev / Next slide controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Alumni Sebelumnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#173d3a]/80 text-white shadow-sm backdrop-blur-md transition-all hover:bg-[#d35f46] hover:scale-105 active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Alumni Berikutnya"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#173d3a]/80 text-white shadow-sm backdrop-blur-md transition-all hover:bg-[#d35f46] hover:scale-105 active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Bottom Overlay: Strictly Alumnus Name */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between border-t border-white/15 pt-3.5">
              <div>
                <p className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.18em] text-[#a9d5c8]">
                  {language !== "id" ? "Alumni-Profil" : "Profil Alumni"}
                </p>
                <h3
                  className="font-['Fraunces'] text-2xl sm:text-3xl font-bold leading-tight text-[#fff8ee] drop-shadow-sm"
                  data-testid="text-active-alumni-name"
                >
                  {activeAlumnus.name}
                </h3>
              </div>

              <Link
                href="/alumni"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4c76b] text-[#173d3a] shadow-md transition-transform hover:scale-110"
                title={`Kisah ${activeAlumnus.name} di halaman /alumni`}
              >
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>

          {/* Floating Trust Pill */}
          <div className="absolute -bottom-4 -left-3 sm:-left-6 z-30 max-w-[calc(100%-1.5rem)] rounded-2xl border-2 border-[#173d3a] bg-[#f5eee3] p-3 text-[#173d3a] shadow-[5px_6px_0_#173d3a]">
            <div className="flex items-center gap-2 font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#173d3a]">
              <span className="flex h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
              <span>{language !== "id" ? "Verifizierte Alumni-Fotos" : "Foto Nyata Alumni"}</span>
            </div>
          </div>

          {/* Interactive Alumni Switcher Track: Thumbnails showing image and name */}
          <div className="mt-8 pt-2">
            <div className="mb-2 flex items-center justify-between text-xs text-[#55736b]">
              <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-[#66837c]">
                {language !== "id" ? "Alumni auswählen" : "Pilih Alumni:"}
              </span>
              <span className="font-mono-ui text-[10px] font-semibold text-[#173d3a]">
                {currentIndex + 1} / {alumniList.length}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
              {alumniList.map((item, idx) => {
                const isActive = idx === currentIndex;
                const hasError = failedImages[String(item.id)];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`group flex shrink-0 items-center gap-2 rounded-xl border p-1.5 transition-all text-left ${
                      isActive
                        ? "border-[#173d3a] bg-[#173d3a] text-[#fff8ee] shadow-[3px_3px_0_#d35f46] scale-[1.02]"
                        : "border-[#173d3a]/20 bg-[#fff8ee]/80 text-[#173d3a] hover:border-[#173d3a]/60 hover:bg-[#fff8ee]"
                    }`}
                    title={item.name}
                  >
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-[#173d3a]/20">
                      {item.imageUrl && !hasError ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top"
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#173d3a] font-mono-ui text-[10px] font-bold text-[#f4c76b]">
                          {getInitials(item.name)}
                        </div>
                      )}
                    </div>
                    {/* Alumnus Name strictly */}
                    <span
                      className={`max-w-[85px] truncate font-mono-ui text-[11px] font-bold ${
                        isActive ? "text-[#fff8ee]" : "text-[#173d3a]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
