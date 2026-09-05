import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, ExternalLink, RefreshCw, Save } from "lucide-react";
import { SectionEyebrow } from "@/components/portfolio-ui";

interface CmsLayoutProps {
  title: string;
  subtitle: string;
  publicHref?: string;
  isSaving?: boolean;
  isSaved?: boolean;
  errorMessage?: string;
  onSave?: () => void;
  onReset?: () => void;
  isResetting?: boolean;
  children: ReactNode;
}

export function CmsLayout({
  title,
  subtitle,
  publicHref,
  isSaving = false,
  isSaved = false,
  errorMessage,
  onSave,
  onReset,
  isResetting = false,
  children,
}: CmsLayoutProps) {
  const [location] = useLocation();

  const publicPagesList = [
    { href: "/admin/cms/home", label: "Utama (Beranda)", icon: "🏠" },
    { href: "/admin/cms/news", label: "Berita", icon: "📰" },
    { href: "/admin/cms/media", label: "Media", icon: "📺" },
    { href: "/admin/cms/services", label: "Layanan", icon: "🛠️" },
    { href: "/admin/cms/jakarta", label: "Jakarta", icon: "📍" },
    { href: "/admin/cms/references", label: "Referensi", icon: "🏆" },
    { href: "/admin/cms/placements", label: "Penempatan", icon: "🤝" },
    { href: "/admin/cms/partner", label: "Untuk Partner", icon: "🏢" },
    { href: "/admin/cms/navbar", label: "Navbar", icon: "🧭" },
    { href: "/admin/cms/footer", label: "Footer", icon: "🦶" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Quick Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#e2ecf5] no-scrollbar">
        <span className="shrink-0 text-xs font-bold text-[#63809e] mr-2">Pilih Halaman CMS:</span>
        {publicPagesList.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#1b5a9f] text-white shadow-sm"
                  : "bg-white text-[#496582] border border-[#d8e4ef] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Header Bar */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Link
            href="/dashboard"
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-[#5d7891] hover:text-[#1b5a9f]"
          >
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </Link>
          <SectionEyebrow>Sistem Manajemen Konten (CMS)</SectionEyebrow>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-[-0.04em] text-[#213c58]">
            {title}
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#677e96]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {publicHref && (
            <Link
              href={publicHref}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#d5e2ec] bg-white px-3.5 py-2.5 text-xs font-bold text-[#456380] shadow-sm hover:border-[#a0c2dc] hover:text-[#1b5a9f]"
            >
              <ExternalLink size={14} /> Lihat Halaman Publik
            </Link>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={isResetting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#eedad7] bg-[#fffbf9] px-3.5 py-2.5 text-xs font-bold text-[#ab594d] hover:bg-[#fbeeed]"
              title="Kembalikan ke data standar bawaan"
            >
              <RefreshCw size={13} className={isResetting ? "animate-spin" : ""} />
              Reset Awal
            </button>
          )}

          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#154b85] disabled:opacity-60"
            >
              <Save size={14} />
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          )}
        </div>
      </header>

      {/* Alert Notices */}
      {errorMessage && (
        <div className="rounded-xl border border-[#f1d0cb] bg-[#fff8f5] px-4 py-3 text-xs sm:text-sm font-semibold text-[#a9584d]">
          {errorMessage}
        </div>
      )}

      {isSaved && (
        <div className="flex items-center gap-2 rounded-xl border border-[#bfe6dc] bg-[#effbf7] px-4 py-3 text-xs sm:text-sm font-semibold text-[#21765f]">
          <Check size={16} /> Perubahan berhasil disimpan ke database & langsung tayang di website publik.
        </div>
      )}

      {/* Main Content Area */}
      {children}
    </div>
  );
}
