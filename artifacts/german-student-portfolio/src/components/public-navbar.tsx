import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useCmsSection } from "@/lib/use-cms";

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
  brandName: "Lernpfad",
  brandSubtitle: "Indonesia · Deutschland",
  brandBadge: "LP",
  ctaText: "Masuk portal",
  ctaHref: "/login",
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
      label: "Aktuelles",
      sublabel: "Kabar & Media",
      href: "/berita",
      order: 2,
      isVisible: true,
      children: [
        { id: 21, label: "News", sublabel: "Berita & Pengumuman Program", href: "/berita", isVisible: true },
        { id: 22, label: "Presse", sublabel: "Liputan Media & Wawancara", href: "/media", isVisible: true },
        { id: 23, label: "Medien", sublabel: "Video & Dokumenter TV Jerman", href: "/media", isVisible: true },
      ],
    },
    {
      id: 3,
      label: "Über AuLiD",
      sublabel: "Tentang Program",
      href: "/layanan",
      order: 3,
      isVisible: true,
      children: [
        { id: 31, label: "Layanan & Alur", sublabel: "7 Tahapan Persiapan hingga Tiba", href: "/layanan", isVisible: true },
        { id: 32, label: "Kantor Jakarta", sublabel: "Pusat Koordinasi & Pelatihan", href: "/jakarta", isVisible: true },
        { id: 33, label: "Untuk Partner", sublabel: "Kemitraan Perusahaan Jerman (AG-Anfrage)", href: "/ag-anfrage", isVisible: true },
      ],
    },
    {
      id: 4,
      label: "Referenzen",
      sublabel: "Referensi & Prestasi",
      href: "/referensi",
      order: 4,
      isVisible: true,
      children: [
        { id: 41, label: "Kisah Referensi", sublabel: "Kisah Sukses & Juara Alumni", href: "/referensi", isVisible: true },
        { id: 42, label: "Penempatan Berhasil", sublabel: "Bukti Keberangkatan & Karier", href: "/penempatan-berhasil", isVisible: true },
      ],
    },
  ],
};

function BrandLogo({ name, subtitle }: { name?: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 text-[#173d3a] group">
      <div className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-[#173d3a] bg-[#f5eee3] transition-transform group-hover:scale-105">
        <span className="absolute h-5 w-px rotate-45 bg-[#d35f46]" />
        <span className="absolute h-5 w-px -rotate-45 bg-[#d35f46]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#d35f46]" />
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

export function PublicNavbar({ activeRoute }: PublicNavbarProps) {
  const [currentLocation] = useLocation();
  const activePath = activeRoute || currentLocation;
  const { data: cmsData } = useCmsSection("navbar");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({
    2: true, // open first submenu by default on mobile for easy discovery
  });
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navConfig = cmsData || defaultNavbarData;
  const links: NavItem[] = (navConfig.links || defaultNavbarData.links)
    .filter((l: NavItem) => l.isVisible !== false)
    .sort((a: NavItem, b: NavItem) => (Number(a.order) || 0) - (Number(b.order) || 0));

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
          <BrandLogo name={navConfig.brandName} subtitle={navConfig.brandSubtitle} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi Utama">
          {links.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const active = isItemActive(item);
            const isOpen = activeHoverMenu === item.id;

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative py-2 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-[#d35f46]" : "text-[#486961] hover:text-[#d35f46]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#d35f46]" />
                  )}
                </Link>
              );
            }

            // Dropdown Menu Item (e.g. Aktuelles, Über AuLiD, Referenzen)
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
                  <span>{item.label}</span>
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
                    className="absolute left-0 top-full pt-2 z-50 min-w-[250px] animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#173d3a]/15 bg-white p-2 shadow-[0_18px_38px_rgba(23,61,58,0.14)] ring-1 ring-black/5">
                      <div className="mb-1.5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8ea49e] border-b border-[#f0f4f2]">
                        {item.sublabel || item.label}
                      </div>
                      <div className="space-y-0.5">
                        {item.children?.map((child) => {
                          const isChildActive = activePath === child.href;
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
                                  {child.label}
                                  {isChildActive && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#d35f46]" />
                                  )}
                                </div>
                                {child.sublabel && (
                                  <div className="mt-0.5 text-[10px] text-[#718b84] group-hover/item:text-[#526d66] line-clamp-1">
                                    {child.sublabel}
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

          {/* Divider */}
          <span className="h-5 w-px bg-[#173d3a]/20" />

          {/* CTA Button */}
          {navConfig.ctaEnabled !== false && (
            <Link
              href={navConfig.ctaHref || "/login"}
              className="group inline-flex items-center gap-2 rounded-full bg-[#173d3a] px-4 py-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#f5eee3] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <span>{navConfig.ctaText || "Masuk portal"}</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="rounded-full border border-[#173d3a]/20 p-2 text-[#173d3a] hover:bg-[#e8f0e9] md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-[#173d3a]/15 bg-[#fffaf2] p-3 shadow-lg md:hidden"
          aria-label="Menu mobile"
        >
          {links.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isExpanded = !!expandedMobileMenus[item.id];
            const active = isItemActive(item);

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
                  {item.label}
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
                  <span className={active ? "text-[#d35f46]" : ""}>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#77918b] transition-transform ${isExpanded ? "rotate-180 text-[#d35f46]" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-1 border-t border-[#173d3a]/10 pt-1.5 pl-2">
                    {item.children?.map((child) => {
                      const isChildActive = activePath === child.href;
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
                              {child.label}
                            </div>
                            {child.sublabel && (
                              <div className="text-[9px] text-[#718b84]">{child.sublabel}</div>
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
            <Link
              href={navConfig.ctaHref || "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#173d3a] px-4 py-3 font-mono-ui text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5eee3]"
            >
              <span>{navConfig.ctaText || "Masuk portal"}</span>
              <ArrowUpRight size={15} />
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
