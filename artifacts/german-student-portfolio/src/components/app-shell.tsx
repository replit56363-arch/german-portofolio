import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useGetCurrentAdmin, useLogout, getGetCurrentAdminQueryKey } from "@workspace/api-client-react";
import {
  FilePenLine,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings2,
  Users,
  X,
  Home,
  Newspaper,
  Tv,
  Briefcase,
  MapPin,
  Trophy,
  CheckCircle2,
  UserCheck,
  Compass,
  LayoutTemplate,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const mainNavigation = [
  { href: "/dashboard", label: "Übersicht (Dashboard)", icon: LayoutDashboard },
  { href: "/students", label: "Studierende (Katalog)", icon: Users, badge: "KATALOG" },
];

const cmsNavigation = [
  { href: "/admin/cms", label: "Pusat CMS (Overview)", icon: Layers, isHub: true },
  { href: "/admin/cms/home", label: "Halaman Utama", icon: Home },
  { href: "/admin/cms/news", label: "Halaman Berita", icon: Newspaper },
  { href: "/admin/cms/media", label: "Halaman Media & TV", icon: Tv },
  { href: "/admin/cms/services", label: "Halaman Layanan", icon: Briefcase },
  { href: "/admin/cms/jakarta", label: "Halaman Jakarta", icon: MapPin },
  { href: "/admin/cms/references", label: "Halaman Referensi", icon: Trophy },
  { href: "/admin/cms/placements", label: "Penempatan Berhasil", icon: CheckCircle2 },
  { href: "/admin/cms/partner", label: "Halaman Partner (AG)", icon: UserCheck },
  { href: "/admin/cms/navbar", label: "Navbar Header", icon: Compass },
  { href: "/admin/cms/footer", label: "Footer", icon: LayoutTemplate },
];

export function AppMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-center" : ""}`}>
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-[#3f6388] bg-[#ffffff] p-0.5 shadow-md">
        <img
          src="/logo.png"
          alt="Lernpfad Logo"
          className="h-full w-full object-contain rounded-lg"
        />
      </div>
      {!compact && (
        <div>
          <p className="text-[15px] font-bold leading-none tracking-[-.02em] text-[#f5f9ff]">Lernpfad</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.18em] text-[#8da7c8]">Portfolio Office</p>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: admin, isLoading: adminLoading, isError } = useGetCurrentAdmin({
    query: { queryKey: getGetCurrentAdminQueryKey(), retry: false },
  });
  const logout = useLogout();

  useEffect(() => {
    if (!adminLoading && isError && location !== "/login") setLocation("/login");
  }, [adminLoading, isError, location, setLocation]);

  const signOut = () => {
    try {
      localStorage.removeItem("admin_session_token");
    } catch {}
    logout.mutate(undefined, {
      onSuccess: () => {
        setLocation("/login");
      },
      onError: () => {
        setLocation("/login");
      },
    });
  };

  if (adminLoading) {
    return <div className="min-h-[100dvh] bg-[#f4f8fc] p-6"><div className="mx-auto max-w-[1500px] space-y-5"><div className="h-16 rounded-2xl shimmer" /><div className="h-[420px] rounded-2xl shimmer" /></div></div>;
  }

  return (
    <div className="min-h-[100dvh] bg-[#f4f8fc] text-[#20334f]">
      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-[#142b4e] px-5 py-6 text-[#eaf3fd] transition-transform duration-300 ease-in-out shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <AppMark />
          <button
            type="button"
            className="rounded-lg p-2 text-[#9ab1ce] hover:bg-[#203b63] hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            title="Tutup Sidebar"
            data-testid="button-close-menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Area with Hidden Scrollbar */}
        <div className="mt-8 flex-1 overflow-y-auto pr-1 space-y-6 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7190b5]">
              Ruang kerja
            </div>
            <nav className="mt-2 space-y-1" aria-label="Navigasi utama">
              {mainNavigation.map(({ href, label, icon: Icon, badge }) => {
                const isActive = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[#21517e] text-[#f6fbff] shadow-[inset_3px_0_0_#70d6ef]"
                        : "text-[#a9bdd7] hover:bg-[#1d3a60] hover:text-white"
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.3 : 1.8} />
                    <span className="truncate">{label}</span>
                    {badge && (
                      <span className="ml-auto font-mono-ui text-[9px] text-[#7f9abe]">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7190b5]">
              <span>Kelola Halaman Publik (CMS)</span>
            </div>
            <nav className="mt-2 space-y-0.5" aria-label="Navigasi CMS">
              {cmsNavigation.map(({ href, label, icon: Icon, isHub }) => {
                const isActive = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-[#21517e] text-[#f6fbff] shadow-[inset_3px_0_0_#70d6ef]"
                        : isHub
                        ? "text-[#d1e8ff] hover:bg-[#1d3a60] hover:text-white"
                        : "text-[#92adc9] hover:bg-[#1d3a60] hover:text-white"
                    }`}
                  >
                    <Icon size={15} strokeWidth={isActive ? 2.3 : 1.7} />
                    <span className="truncate">{label}</span>
                    {isHub && (
                      <span className="ml-auto rounded bg-[#6fd5ee]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#6fd5ee]">
                        HUB
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-[#284465] pt-4">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7190b5]">
              Pintasan & Website
            </p>
            <div className="mt-2 space-y-1">
              <Link
                href="/admin/students/new"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-[#3f6388] px-3 py-2 text-xs font-semibold text-[#dcf8ff] transition-colors hover:bg-[#203b63]"
              >
                <Plus size={15} />
                <span>Tambah portofolio</span>
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#8eb0d4] transition-colors hover:bg-[#1d3a60] hover:text-white"
              >
                <span>Lihat Website Publik</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-[#284465] pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4eef6] text-xs font-bold text-[#1b5688]">
              {admin?.name?.split(" ").map((x) => x[0]).join("").slice(0, 2) || "AD"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#f5f9ff]" data-testid="text-admin-name">
                {admin?.name || "Admin"}
              </p>
              <p className="truncate text-[11px] text-[#8da7c8]">{admin?.email || "Akses admin"}</p>
            </div>
            <button
              type="button"
              className="ml-auto rounded-lg p-2 text-[#8da7c8] hover:bg-[#203b63] hover:text-white"
              onClick={signOut}
              disabled={logout.isPending}
              aria-label="Keluar"
              data-testid="button-logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay when sidebar is open */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[#10294c]/30 backdrop-blur-[1px] transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup navigasi"
          data-testid="button-menu-overlay"
        />
      )}

      {/* Main Content Area */}
      <main className={`min-h-[100dvh] transition-[padding] duration-300 ${sidebarOpen ? "lg:pl-[250px]" : "pl-0"}`}>
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-[#dce6f0] bg-[#f4f8fc]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-[#d8e4ef] bg-white px-3 py-2 text-xs font-bold text-[#1b5a9f] shadow-sm hover:bg-[#edf5fb] transition-all"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Buka/Tutup menu sidebar"
              data-testid="button-open-menu"
            >
              <Menu size={18} />
              <span>Menu Sidebar</span>
            </button>
            <div className="hidden items-center gap-2 text-xs font-medium text-[#7a8ea8] md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fd5ee]" />
              Data internal terverifikasi
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/students"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#536a84] hover:bg-white sm:flex"
              data-testid="link-search-students"
            >
              <Search size={16} /> Cari student
            </Link>
            <Link
              href="/admin/content"
              className="rounded-xl border border-[#d8e4ef] bg-white p-2.5 text-[#536a84] hover:border-[#b8cadc]"
              aria-label="Pengaturan konten"
              data-testid="button-settings"
            >
              <Settings2 size={17} />
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">{children}</div>
      </main>
    </div>
  );
}