import { useMemo } from "react";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";
import { ExternalLink, Building2 } from "lucide-react";

export interface LogoItem {
  id: string | number;
  name: string;
  category?: string;
  imageUrl: string;
  linkUrl?: string;
  active?: boolean;
  order?: number;
}

export interface LogoSliderData {
  sectionLabel?: string;
  sectionTitle?: string;
  speedSeconds?: number;
  pauseOnHover?: boolean;
  showNames?: boolean;
  items?: LogoItem[];
}

const defaultLogos: LogoItem[] = [
  {
    id: "logo-1",
    name: "Pendidikan Bahasa Jerman UNIMED",
    category: "Universitas",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2YwZjdmMyIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjMWU2YTNkIi8+PHBvbHlnb24gcG9pbnRzPSIzNCwxNiA0MiwzMiAyNiwzMiIgZmlsbD0iI2Y1YzUxOCIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMjciIHI9IjQiIGZpbGw9IiMxZTZhM2QiLz48dGV4dCB4PSI2MiIgeT0iMjgiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzE1NGQyYyI+VU5JTUVEPC90ZXh0Pjx0ZXh0IHg9IjYyIiB5PSI0NCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzJlN2Q0ZCI+UGVuZGlkaWthbiBCYWhhc2EgSmVybWFuPC90ZXh0Pjwvc3ZnPg==",
    linkUrl: "https://unimed.ac.id",
    active: true,
    order: 1,
  },
  {
    id: "logo-2",
    name: "Ausbildung Alumni 2020",
    category: "Alumni Jerman",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2Y5ZjZmMCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4LCAxNCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIxMCIgZmlsbD0iIzExMTExMSIgcng9IjIiLz48cmVjdCB4PSIwIiB5PSIxMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZDkyYjJiIiByeD0iMiIvPjxyZWN0IHg9IjAiIHk9IjIyIiB3aWR0aD0iMzIiIGhlaWdodD0iMTAiIGZpbGw9IiNlYWIzMDgiIHJ4PSIyIi8+PC9nPjx0ZXh0IHg9IjYyIiB5PSIyNyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij5BVVNCSUxEVU5HIDIwMjA8L3RleHQ+PHRleHQgeD0iNjIiIHk9IjQzIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI5IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNzgzNTBmIj5BbHVtbmkgTmV0endlcmsgRGV1dHNjaGxhbmQ8L3RleHQ+PC9zdmc=",
    linkUrl: "",
    active: true,
    order: 2,
  },
  {
    id: "logo-3",
    name: "Mitra Perusahaan Jerman",
    category: "Perusahaan Jerman",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2VlZjNmOCIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjMTczZDNhIi8+PHBhdGggZD0iTTI2LDMwIEwzMiwyNCBMNDIsMzQgTTM0LDIyIEwzNCwzNiIgc3Ryb2tlPSIjZTdmMGU5IiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+PHRleHQgeD0iNjIiIHk9IjI3IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxNzNkM2EiPk1JVFJBIEpFUk1BTjwvdGV4dD48dGV4dCB4PSI2MiIgeT0iNDMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMzMTVjNTQiPk5ldHp3ZXJrIEFyYmVpdGdlYmVyIEFHPC90ZXh0Pjwvc3ZnPg==",
    linkUrl: "/ag-anfrage",
    active: true,
    order: 3,
  },
  {
    id: "logo-4",
    name: "Gastronomi & Pflege",
    category: "Klinik & Hotel",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2ZiZjJlZCIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjZDM1ZjQ2Ii8+PHBhdGggZD0iTTM0LDIwIEwzNCw0MCBNMjQsMzAgTDQ0LDMwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48dGV4dCB4PSI2MiIgeT0iMjciIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzljMzQxZSI+R0FTVFJPTk9NSSAmYW1wOyBQRkxFR0U8L3RleHQ+PHRleHQgeD0iNjIiIHk9IjQzIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI5IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYzI1MjM5Ij5LbGluaWtlbiAmYW1wOyBIb3RlbGxlcmllPC90ZXh0Pjwvc3ZnPg==",
    linkUrl: "/layanan",
    active: true,
    order: 4,
  },
  {
    id: "logo-5",
    name: "Goethe-Institut Partner",
    category: "Standar Kurikulum",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2U2ZjRlYSIvPjxyZWN0IHg9IjE4IiB5PSIxNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzAwNDg0MCIvPjx0ZXh0IHg9IjI2IiB5PSIzNyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNiYmY3ZDAiPkc8L3RleHQ+PHRleHQgeD0iNjIiIHk9IjI3IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwMDQ4NDAiPkdPRVRIRS1JTlNUSVRVVDwvdGV4dD48dGV4dCB4PSI2MiIgeT0iNDMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxNjY1MzQiPlByw7xmdW5nc3ZvcmJlcmVpdHVuZzwvdGV4dD48L3N2Zz4=",
    linkUrl: "https://www.goethe.de",
    active: true,
    order: 5,
  },
  {
    id: "logo-6",
    name: "AWO Bundesverband",
    category: "Mitra FSJ & Pflege",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2ZlZTJlMiIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjZGMyNjI2Ii8+PHBhdGggZD0iTTI2LDMwIFEzNCwyMCA0MiwzMCBRMzQsNDAgMjYsMzAgWiIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjYyIiB5PSIyNyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiM5OTFiMWIiPkFXTzwvdGV4dD48dGV4dCB4PSI2MiIgeT0iNDMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNiOTFjMWMiPkJ1bmRlc3ZlcmJhbmQgUGZsZWdlPC90ZXh0Pjwvc3ZnPg==",
    linkUrl: "https://www.awo.org",
    active: true,
    order: 6,
  },
  {
    id: "logo-7",
    name: "Helios Kliniken",
    category: "Klinik & Rumah Sakit",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2UwZjJmZSIvPjxyZWN0IHg9IjE4IiB5PSIxNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzAyODRjNyIvPjxwYXRoIGQ9Ik0zNCwyMiBMMzQsMzggTTI2LDMwIEw0MiwzMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjx0ZXh0IHg9IjYyIiB5PSIyNyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDM2OWExIj5IRUxJT1M8L3RleHQ+PHRleHQgeD0iNjIiIHk9IjQzIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI5IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMDc1OTg1Ij5LbGluaWtlbiBHcnVwcGUgRGV1dHNjaGxhbmQ8L3RleHQ+PC9zdmc=",
    linkUrl: "https://www.helios-gesundheit.de",
    active: true,
    order: 7,
  },
  {
    id: "logo-8",
    name: "Steigenberger Hotels & Resorts",
    category: "Hotellerie & Gastronomie",
    imageUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI2ZlZjljMyIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMzAiIHI9IjE4IiBmaWxsPSIjODU0ZDBlIi8+PHBvbHlnb24gcG9pbnRzPSIyNywzMyAzMCwyNCAzNCwyOSAzOCwyNCA0MSwzMyIgZmlsbD0iI2ZlZjA4YSIvPjx0ZXh0IHg9IjYyIiB5PSIyNyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNzEzZjEyIj5TVEVJR0VOQkVSR0VSPC90ZXh0Pjx0ZXh0IHg9IjYyIiB5PSI0MyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzg1NGQwZSI+SG90ZWxzICZhbXA7IEdhc3Ryb25vbWllPC90ZXh0Pjwvc3ZnPg==",
    linkUrl: "https://hrewards.com/de/steigenberger-hotels-resorts",
    active: true,
    order: 8,
  },
];

export function InfiniteLogoSlider() {
  const { data: cmsData } = useCmsSection<LogoSliderData>("logos");
  const { language, t } = useLanguage();

  const activeItems = useMemo(() => {
    const rawItems = cmsData?.items && Array.isArray(cmsData.items) && cmsData.items.length > 0
      ? cmsData.items
      : defaultLogos;

    const filtered = rawItems
      .filter((item) => item.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return filtered.length > 0 ? filtered : defaultLogos;
  }, [cmsData]);

  // Duplicate items twice to ensure completely seamless continuous loop
  const duplicatedItems = useMemo(() => {
    return [...activeItems, ...activeItems];
  }, [activeItems]);

  const speedSeconds = cmsData?.speedSeconds || 28;
  const pauseOnHover = cmsData?.pauseOnHover !== false;
  const showNames = cmsData?.showNames !== false;

  const label = useMemo(() => {
    if (language === "de") {
      return "Geschätzt und vertraut von";
    }
    if (language === "en") {
      return "Trusted to lead the way by";
    }
    return cmsData?.sectionLabel || "Dipercaya untuk membuka jalan oleh";
  }, [language, cmsData?.sectionLabel]);

  const sectionTitle = useMemo(() => {
    if (language === "de") {
      return "Offizielle Partner-, Klinik- & Hochschulnetzwerke";
    }
    if (language === "en") {
      return "Official Partner, Healthcare & University Network";
    }
    return cmsData?.sectionTitle || "Jaringan Klien, Partner & Rekanan Resmi";
  }, [language, cmsData?.sectionTitle]);

  const getLocalizedItem = (item: LogoItem) => {
    if (language === "id") {
      return { name: item.name, category: item.category };
    }

    const cleanName = (item.name || "").trim().toLowerCase();
    const cleanCat = (item.category || "").trim().toLowerCase();

    let name = item.name;
    let category = item.category;

    // Category translations
    if (cleanCat.includes("universitas")) {
      category = language === "de" ? "Universität" : "University";
    } else if (cleanCat.includes("alumni")) {
      category = language === "de" ? "Alumni-Netzwerk" : "Alumni Network";
    } else if (cleanCat.includes("perusahaan")) {
      category = language === "de" ? "Deutsche Partner" : "German Partners";
    } else if (cleanCat.includes("klinik & hotel") || cleanCat.includes("klinik")) {
      category = language === "de" ? "Kliniken & Hotellerie" : "Clinics & Hospitality";
    } else if (cleanCat.includes("standar") || cleanCat.includes("kurikulum")) {
      category = language === "de" ? "Goethe-Standard" : "Curriculum Standard";
    } else if (cleanCat.includes("fsj") || cleanCat.includes("pflege")) {
      category = language === "de" ? "FSJ- & Pflegepartner" : "FSJ & Healthcare Partner";
    } else if (cleanCat.includes("rumah sakit")) {
      category = language === "de" ? "Kliniken & Krankenhäuser" : "Clinics & Hospitals";
    } else if (cleanCat.includes("hotellerie") || cleanCat.includes("gastronomie") || cleanCat.includes("hotel")) {
      category = language === "de" ? "Hotellerie & Gastronomie" : "Hospitality & Gastronomy";
    }

    // Name translations for generic partner labels
    if (cleanName === "mitra perusahaan jerman") {
      name = language === "de" ? "Deutsche Partnerunternehmen" : "German Partner Companies";
    } else if (cleanName === "gastronomi & pflege") {
      name = language === "de" ? "Gastronomie & Pflege" : "Gastronomy & Healthcare";
    }

    return { name, category };
  };

  return (
    <div className="relative border-y border-[#173d3a]/15 bg-[#e7f0e9]/95 overflow-hidden py-4 sm:py-5">
      <style>{`
        @keyframes infinite-slider-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .infinite-slider-track {
          display: flex;
          width: max-content;
          animation: infinite-slider-scroll ${speedSeconds}s linear infinite;
        }
        ${pauseOnHover ? `
        .infinite-slider-container:hover .infinite-slider-track {
          animation-play-state: paused;
        }
        ` : ""}
        @media (prefers-reduced-motion: reduce) {
          .infinite-slider-track {
            animation-duration: 90s;
          }
        }
      `}</style>

      {/* Top Header Badge & Text */}
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#1e6a3d] animate-pulse" />
          <p className="font-mono-ui text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#4d6d64]">
            {label}
          </p>
        </div>
        {sectionTitle && (
          <p className="hidden md:block font-['Fraunces'] text-xs font-medium text-[#486b62] italic">
            {sectionTitle}
          </p>
        )}
      </div>

      {/* Slider Viewport with Left/Right Soft Fade Gradients */}
      <div className="relative w-full overflow-hidden infinite-slider-container">
        {/* Left Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-[#e7f0e9] via-[#e7f0e9]/85 to-transparent" />
        
        {/* Right Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-[#e7f0e9] via-[#e7f0e9]/85 to-transparent" />

        {/* Scrolling Track */}
        <div className="infinite-slider-track flex items-center gap-3 sm:gap-4 pl-4">
          {duplicatedItems.map((item, index) => {
            const localized = getLocalizedItem(item);
            const CardWrapper = item.linkUrl ? "a" : "div";
            const linkProps = item.linkUrl
              ? {
                  href: item.linkUrl,
                  target: item.linkUrl.startsWith("http") ? "_blank" : undefined,
                  rel: item.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined,
                }
              : {};

            return (
              <CardWrapper
                key={`${item.id}-${index}`}
                {...linkProps}
                className="group/card flex items-center gap-3 rounded-xl sm:rounded-2xl border border-[#173d3a]/10 bg-white/80 backdrop-blur-xs px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_1px_4px_rgba(23,61,58,0.03)] hover:bg-white hover:border-[#173d3a]/25 hover:shadow-md transition-all duration-200 shrink-0 cursor-pointer select-none"
                title={item.linkUrl ? `Kunjungi ${localized.name}` : localized.name}
              >
                {/* Logo Image or Fallback */}
                {item.imageUrl ? (
                  <div className="flex h-9 w-auto min-w-[70px] max-w-[120px] sm:max-w-[150px] items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={localized.name}
                      className="max-h-8 sm:max-h-9 w-auto max-w-full object-contain transition-transform duration-200 group-hover/card:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7f0e9] text-[#173d3a]">
                    <Building2 size={16} />
                  </div>
                )}

                {/* Optional Text Details */}
                {showNames && (
                  <div className="flex flex-col pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Fraunces'] text-xs sm:text-[13px] font-semibold tracking-tight text-[#173d3a] transition-colors group-hover/card:text-[#d35f46] whitespace-nowrap">
                        {localized.name}
                      </span>
                      {item.linkUrl && (
                        <ExternalLink
                          size={10}
                          className="text-[#6b867e] opacity-0 group-hover/card:opacity-100 transition-opacity"
                        />
                      )}
                    </div>
                    {localized.category && (
                      <span className="font-mono-ui text-[8.5px] uppercase tracking-wider text-[#52756b] font-semibold">
                        {localized.category}
                      </span>
                    )}
                  </div>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
