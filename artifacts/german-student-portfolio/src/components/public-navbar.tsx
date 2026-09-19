import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Languages,
  Check,
  Globe,
} from "lucide-react";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";

export type NavChild = {
  id: number | string;
  label: string;
  sublabel?: string;
  href: string;
  isExternal?: boolean;
  isVisible?: boolean;
};

export type NavItem = {
  id: number | string;
  label: string;
  sublabel?: string;
  href: string;
  order?: number;
  isExternal?: boolean;
  isHighlighted?: boolean;
  isVisible?: boolean;
  children?: NavChild[];
};

const defaultNavbarData = {
  brandName: "ICH LIEBE DEUTSCH MEDAN",
  brandSubtitle: "Lembaga Kursus Bahasa Jerman Terdaftar",
  brandBadge: "ILD",
  ctaText: "Hubungi Kami",
  ctaHref: "https://wa.me/6282127324453",
  ctaEnabled: true,
  links: [
    {
      id: 1,
      label: "Beranda",
      href: "/",
      order: 1,
      isVisible: true,
    },
    {
      id: 2,
      label: "Program Kursus",
      sublabel: "5 Jalur Ke Jerman",
      href: "/layanan",
      order: 2,
      isVisible: true,
      children: [
        { id: 21, label: "1. Ausbildung", sublabel: "Sekolah Kejuruan & Praktik Bergaji", href: "/layanan", isVisible: true },
        { id: 22, label: "2. Au Pair", sublabel: "Tinggal Bersama Host Family", href: "/layanan", isVisible: true },
        { id: 23, label: "3. FSJ / BFD", sublabel: "Program Sukarelawan Sosial 1 Tahun", href: "/layanan", isVisible: true },
        { id: 24, label: "4. G to G", sublabel: "Penempatan Perawat Resmi Pemerintah", href: "/layanan", isVisible: true },
        { id: 25, label: "5. Kuliah / Studium", sublabel: "Persiapan Kuliah Universitas Jerman", href: "/layanan", isVisible: true },
      ],
    },
    {
      id: 3,
      label: "Tentang Kami",
      sublabel: "Profil & Lokasi",
      href: "/jakarta",
      order: 3,
      isVisible: true,
      children: [
        { id: 31, label: "Profil Lembaga", sublabel: "Lembaga Terdaftar & Berizin Operasional", href: "/jakarta", isVisible: true },
        { id: 32, label: "Alamat & Kontak", sublabel: "Jl. Ternak II No. 39, Medan Polonia", href: "/jakarta", isVisible: true },
        { id: 33, label: "Konsultasi Partner", sublabel: "Kemitraan & Informasi Program", href: "/ag-anfrage", isVisible: true },
      ],
    },
    {
      id: 4,
      label: "Kabar & Referensi",
      sublabel: "Informasi & Prestasi",
      href: "/berita",
      order: 4,
      isVisible: true,
      children: [
        { id: 41, label: "Kabar & Berita", sublabel: "Artikel & Pengumuman Terbaru", href: "/berita", isVisible: true },
        { id: 42, label: "Kisah Referensi", sublabel: "Kisah Sukses Alumni di Jerman", href: "/referensi", isVisible: true },
      ],
    },
    {
      id: 5,
      label: "Siswa & Kampus",
      sublabel: "Data, Alumni & Kelas",
      href: "/siswa",
      order: 5,
      isVisible: true,
      children: [
        { id: 51, label: "Data Siswa", sublabel: "Direktori & Profil Siswa Aktif", href: "/siswa", isVisible: true },
        { id: 52, label: "Foto Alumni", sublabel: "Galeri & Kisah Nyata di Jerman", href: "/alumni", isVisible: true },
        { id: 53, label: "Ruangan Kelas", sublabel: "Fasilitas & Sarana Belajar Medan", href: "/ruangan-kelas", isVisible: true },
      ],
    },
  ],
};

function BrandLogo({ name, subtitle }: { name?: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 text-[#173d3a] group">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center p-0.5">
        <img
          src="/logo.png"
          alt={name || "Lernpfad Logo"}
          className="h-full w-full object-contain rounded-lg"
        />
      </div>
      <div>
        <div className="font-['Fraunces'] text-[20px] font-semibold leading-none tracking-[-0.04em] text-[#173d3a]">
          {name || "Lernpfad"}
        </div>
        <div className="mt-1 font-mono-ui text-[8px] font-bold uppercase tracking-[0.18em] text-[#77918b]">
          {subtitle || "Indonesia · Deutschland"}
        </div>
      </div>
    </div>
  );
}

interface PublicNavbarProps {
  activeRoute?: string;
}

const navTranslationKeys: Record<string | number, { labelKey: string; subKey?: string }> = {
  1: { labelKey: "nav.home" },
  2: { labelKey: "nav.programs", subKey: "nav.programs_sub" },
  21: { labelKey: "nav.ausbildung", subKey: "nav.ausbildung_sub" },
  22: { labelKey: "nav.aupair", subKey: "nav.aupair_sub" },
  23: { labelKey: "nav.fsj", subKey: "nav.fsj_sub" },
  24: { labelKey: "nav.gtog", subKey: "nav.gtog_sub" },
  25: { labelKey: "nav.studium", subKey: "nav.studium_sub" },
  3: { labelKey: "nav.about", subKey: "nav.about_sub" },
  31: { labelKey: "nav.about_profile", subKey: "nav.about_profile_sub" },
  32: { labelKey: "nav.about_contact", subKey: "nav.about_contact_sub" },
  33: { labelKey: "nav.about_partner", subKey: "nav.about_partner_sub" },
  4: { labelKey: "nav.news_ref", subKey: "nav.news_ref_sub" },
  41: { labelKey: "nav.news", subKey: "nav.news_sub" },
  42: { labelKey: "nav.references", subKey: "nav.references_sub" },
  5: { labelKey: "nav.students_campus", subKey: "nav.students_campus_sub" },
  51: { labelKey: "nav.students_data", subKey: "nav.students_data_sub" },
  52: { labelKey: "nav.alumni_photos", subKey: "nav.alumni_photos_sub" },
  53: { labelKey: "nav.classrooms", subKey: "nav.classrooms_sub" },
};

export function PublicNavbar({ activeRoute }: PublicNavbarProps) {
  const [currentLocation] = useLocation();
  const activePath = activeRoute || currentLocation;
  const { data: cmsData } = useCmsSection("navbar");
  const { language, setLanguage, t, currentOption, availableLanguages } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({
    2: true, // open first submenu by default on mobile for easy discovery
  });
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navConfig = cmsData || defaultNavbarData;
  const links: NavItem[] = (navConfig.links || defaultNavbarData.links)
    .filter((l: NavItem) => l.isVisible !== false)
    .sort((a: NavItem, b: NavItem) => (Number(a.order) || 0) - (Number(b.order) || 0));

  const getNavText = (id: string | number, defaultLabel: string, defaultSublabel?: string) => {
    if (language === "id") {
      return { label: defaultLabel, sublabel: defaultSublabel };
    }

    const itemKey = navTranslationKeys[id];
    let label = itemKey ? t(itemKey.labelKey) : "";
    let sublabel = itemKey?.subKey ? t(itemKey.subKey) : "";

    // If key not found or returned the key itself, check standard semantic label mappings
    const cleanLabel = (defaultLabel || "").trim().toLowerCase();
    if (!label || label === itemKey?.labelKey) {
      if (cleanLabel.includes("ruangan") || cleanLabel.includes("kelas")) {
        label = t("nav.classrooms");
        sublabel = t("nav.classrooms_sub");
      } else if (cleanLabel.includes("tentang") || cleanLabel.includes("profil lembaga")) {
        label = t("nav.about");
        sublabel = t("nav.about_sub");
      } else if (cleanLabel.includes("kabar") || cleanLabel.includes("referensi")) {
        label = t("nav.news_ref");
        sublabel = t("nav.news_ref_sub");
      } else if (cleanLabel.includes("beranda")) {
        label = t("nav.home");
      } else if (cleanLabel.includes("program")) {
        label = t("nav.programs");
        sublabel = t("nav.programs_sub");
      } else if (cleanLabel.includes("siswa") && cleanLabel.includes("kampus")) {
        label = t("nav.students_campus");
        sublabel = t("nav.students_campus_sub");
      } else if (cleanLabel.includes("siswa")) {
        label = t("nav.students_data");
        sublabel = t("nav.students_data_sub");
      } else if (cleanLabel.includes("alumni")) {
        label = t("nav.alumni_photos");
        sublabel = t("nav.alumni_photos_sub");
      } else {
        label = defaultLabel;
        sublabel = defaultSublabel;
      }
    }

    return {
      label: label || defaultLabel,
      sublabel: sublabel || defaultSublabel,
    };
  };

  const brandSubtitle = language !== "id" ? t("nav.brand_subtitle", navConfig.brandSubtitle) : navConfig.brandSubtitle;
  const ctaText = language !== "id" ? t("nav.cta", navConfig.ctaText) : navConfig.ctaText;

  const handleMouseEnter = (itemId: string | number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveHoverMenu(itemId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverMenu(null);
    }, 180);
  };

  const toggleMobileSubmenu = (id: string | number) => {
    setExpandedMobileMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to check if a menu or any of its children match current route
  const isItemActive = (item: NavItem) => {
    if (item.href === activePath) return true;
    if (item.children?.some((c) => c.href === activePath)) return true;
    if (item.href !== "/" && activePath.startsWith(item.href)) return true;
    return false;
  };

  return (
    <header className="relative z-40 border-b border-[#173d3a]/15 bg-[#f5eee3]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3.5 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" aria-label="Kembali ke halaman utama">
          <BrandLogo name={navConfig.brandName} subtitle={brandSubtitle} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-7 md:flex" aria-label="Navigasi Utama">
          {links.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const active = isItemActive(item);
            const isOpen = activeHoverMenu === item.id;
            const itemText = getNavText(item.id, item.label, item.sublabel);

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative py-2 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-[#d35f46]" : "text-[#486961] hover:text-[#d35f46]"
                  }`}
                >
                  {itemText.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#d35f46]" />
                  )}
                </Link>
              );
            }

            // Dropdown Menu Item (e.g. Program Kursus, Tentang Kami, Kabar & Referensi)
            return (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger Button / Link */}
                <button
                  type="button"
                  onClick={() => setActiveHoverMenu(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className={`group inline-flex items-center gap-1.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] transition-colors focus:outline-none ${
                    active || isOpen ? "text-[#d35f46]" : "text-[#486961] hover:text-[#d35f46]"
                  }`}
                >
                  <span>{itemText.label}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#d35f46]" : "text-[#77918b] group-hover:text-[#d35f46]"
                    }`}
                  />
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#d35f46]" />
                  )}
                </button>

                {/* Dropdown Card */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-full pt-2 z-50 min-w-[260px] animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#173d3a]/15 bg-white p-2 shadow-[0_18px_38px_rgba(23,61,58,0.14)] ring-1 ring-black/5">
                      <div className="mb-1.5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8ea49e] border-b border-[#f0f4f2]">
                        {itemText.sublabel || itemText.label}
                      </div>
                      <div className="space-y-0.5">
                        {item.children?.map((child) => {
                          const isChildActive = activePath === child.href;
                          const childText = getNavText(child.id, child.label, child.sublabel);
                          return (
                            <Link
                              key={child.id}
                              href={child.href}
                              onClick={() => setActiveHoverMenu(null)}
                              className={`group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition-all text-left ${
                                isChildActive
                                  ? "bg-[#f5eee3] text-[#d35f46]"
                                  : "text-[#173d3a] hover:bg-[#fbf7f0] hover:text-[#d35f46]"
                              }`}
                            >
                              <div>
                                <div className="font-mono-ui text-[11px] font-bold uppercase tracking-[0.08em] flex items-center gap-1.5">
                                  {childText.label}
                                  {isChildActive && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#d35f46]" />
                                  )}
                                </div>
                                {childText.sublabel && (
                                  <div className="mt-0.5 text-[10px] text-[#718b84] group-hover/item:text-[#526d66] line-clamp-1">
                                    {childText.sublabel}
                                  </div>
                                )}
                              </div>
                              <ArrowUpRight
                                size={14}
                                className={`shrink-0 transition-transform ${
                                  isChildActive
                                    ? "text-[#d35f46] opacity-100"
                                    : "text-[#d35f46] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5"
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Language Selector Dropdown (Desktop) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((v) => !v)}
              aria-expanded={langDropdownOpen}
              aria-label="Pilih Bahasa / Language / Sprache"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#173d3a]/20 bg-white/80 px-2.5 py-1.5 font-mono-ui text-[11px] font-bold text-[#173d3a] shadow-xs transition-all hover:border-[#d35f46] hover:bg-[#fffdf9] focus:outline-none"
            >
              <span className="text-sm leading-none">{currentOption.flag}</span>
              <span className="tracking-[0.08em]">{currentOption.short}</span>
              <ChevronDown
                size={12}
                className={`text-[#77918b] transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180 text-[#d35f46]" : ""
                }`}
              />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[#173d3a]/15 bg-white p-1.5 shadow-[0_14px_34px_rgba(23,61,58,0.12)] ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-1.5 border-b border-[#f0f4f2] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8ea49e]">
                  <Languages size={12} className="text-[#d35f46]" />
                  <span>Pilih Bahasa / Language</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {availableLanguages.map((opt) => {
                    const isSelected = opt.code === language;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-mono-ui text-[11px] font-bold tracking-[0.04em] transition-colors ${
                          isSelected
                            ? "bg-[#f5eee3] text-[#d35f46]"
                            : "text-[#173d3a] hover:bg-[#fbf7f0] hover:text-[#d35f46]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{opt.flag}</span>
                          <span>{opt.label}</span>
                        </span>
                        {isSelected && <Check size={14} className="text-[#d35f46]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <span className="h-5 w-px bg-[#173d3a]/20" />

          {/* CTA Button */}
          {navConfig.ctaEnabled !== false && (
            (navConfig.ctaHref || "").startsWith("http") || (navConfig.ctaHref || "").startsWith("mailto:") || (navConfig.ctaHref || "").startsWith("tel:") ? (
              <a
                href={navConfig.ctaHref || "https://wa.me/6282127324453"}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span>{ctaText}</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : (
              <Link
                href={navConfig.ctaHref || "/login"}
                className="group inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span>{ctaText}</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            )
          )}
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick Mobile Language Switcher Button */}
          <button
            type="button"
            onClick={() => {
              const nextLang = language === "id" ? "de" : language === "de" ? "en" : "id";
              setLanguage(nextLang);
            }}
            aria-label="Ganti Bahasa (Indonesia / Jerman / Inggris)"
            className="flex items-center gap-1.5 rounded-full border border-[#173d3a]/20 bg-white/80 px-2.5 py-1.5 font-mono-ui text-[10px] font-bold text-[#173d3a] shadow-xs active:scale-95 transition-transform"
          >
            <span className="text-sm leading-none">{currentOption.flag}</span>
            <span>{currentOption.short}</span>
            <Languages size={12} className="text-[#77918b]" />
          </button>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded-full border border-[#173d3a]/20 p-2 text-[#173d3a] hover:bg-[#e8f0e9]"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          className="mx-4 mb-4 flex flex-col gap-1.5 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-3 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2 duration-150"
          aria-label="Menu mobile"
        >
          {/* Mobile Language Switcher Segmented Control */}
          <div className="mb-2 rounded-xl bg-[#f5eee3] p-2.5 border border-[#173d3a]/10">
            <div className="mb-1.5 flex items-center justify-between px-1 text-[9px] font-mono-ui font-bold uppercase tracking-[0.14em] text-[#638079]">
              <span className="flex items-center gap-1.5">
                <Languages size={12} className="text-[#d35f46]" />
                {language === "de" ? "Sprache wählen" : language === "en" ? "Select Language" : "Pilihan Bahasa"}
              </span>
              <span className="text-[9px] font-extrabold text-[#d35f46]">{currentOption.label}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {availableLanguages.map((opt) => {
                const isSelected = opt.code === language;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-center font-mono-ui text-[11px] font-bold tracking-[0.06em] transition-all ${
                      isSelected
                        ? "bg-[#173d3a] text-[#fff8ee] shadow-xs"
                        : "bg-white/80 text-[#173d3a] hover:bg-white"
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {links.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isExpanded = !!expandedMobileMenus[item.id];
            const active = isItemActive(item);
            const itemText = getNavText(item.id, item.label, item.sublabel);

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    active ? "bg-[#f5eee3] text-[#d35f46]" : "text-[#34524c] hover:bg-[#f1ede3]"
                  }`}
                >
                  {itemText.label}
                </Link>
              );
            }

            return (
              <div key={item.id} className="rounded-xl bg-[#fbf7f0] p-1 border border-[#173d3a]/10">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu(item.id)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left font-mono-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#173d3a]"
                >
                  <span className={active ? "text-[#d35f46]" : ""}>{itemText.label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#77918b] transition-transform ${isExpanded ? "rotate-180 text-[#d35f46]" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-1 border-t border-[#173d3a]/10 pt-1.5 pl-2">
                    {item.children?.map((child) => {
                      const isChildActive = activePath === child.href;
                      const childText = getNavText(child.id, child.label, child.sublabel);
                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                            isChildActive
                              ? "bg-[#f5eee3] font-bold text-[#d35f46]"
                              : "text-[#4d6a63] hover:bg-white hover:text-[#173d3a]"
                          }`}
                        >
                          <div>
                            <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.08em]">
                              {childText.label}
                            </div>
                            {childText.sublabel && (
                              <div className="text-[9px] text-[#718b84]">{childText.sublabel}</div>
                            )}
                          </div>
                          <ArrowUpRight size={13} className="text-[#d35f46]" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* CTA Mobile */}
          {navConfig.ctaEnabled !== false && (
            (navConfig.ctaHref || "").startsWith("http") || (navConfig.ctaHref || "").startsWith("mailto:") || (navConfig.ctaHref || "").startsWith("tel:") ? (
              <a
                href={navConfig.ctaHref || "https://wa.me/6282127324453"}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5eee3]"
              >
                <span>{ctaText}</span>
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <Link
                href={navConfig.ctaHref || "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5eee3]"
              >
                <span>{ctaText}</span>
                <ArrowUpRight size={15} />
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
