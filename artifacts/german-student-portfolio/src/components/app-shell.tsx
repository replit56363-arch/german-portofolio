import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useGetCurrentAdmin, useLogout, getGetCurrentAdminQueryKey } from "@workspace/api-client-react";
import { FilePenLine, LayoutDashboard, LogOut, Menu, Plus, Search, Settings2, Users, X } from "lucide-react";

const navigation = [
  { href: "/dashboard", label: "Übersicht", icon: LayoutDashboard },
  { href: "/students", label: "Studierende", icon: Users },
  { href: "/admin/content", label: "Konten landing", icon: FilePenLine },
];

export function AppMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-center" : ""}`}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6fd5ee] text-[#10294c] shadow-[0_8px_20px_rgba(111,213,238,.18)]">
        <span className="font-mono-ui text-[15px] font-bold tracking-[-.12em]">LP</span>
        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#142b4e] bg-[#f5be65]" />
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: admin, isLoading: adminLoading, isError } = useGetCurrentAdmin({
    query: { queryKey: getGetCurrentAdminQueryKey(), retry: false },
  });
  const logout = useLogout();

  useEffect(() => {
    if (!adminLoading && isError && location !== "/login") setLocation("/login");
  }, [adminLoading, isError, location, setLocation]);

  const signOut = () => {
    logout.mutate(undefined, { onSuccess: () => setLocation("/login") });
  };

  if (adminLoading) {
    return <div className="min-h-[100dvh] bg-[#f4f8fc] p-6"><div className="mx-auto max-w-[1500px] space-y-5"><div className="h-16 rounded-2xl shimmer" /><div className="h-[420px] rounded-2xl shimmer" /></div></div>;
  }

  return (
    <div className="min-h-[100dvh] bg-[#f4f8fc] text-[#20334f]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-[#142b4e] px-5 py-6 text-[#eaf3fd] transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <AppMark />
          <button type="button" className="rounded-lg p-2 text-[#9ab1ce] hover:bg-[#203b63] lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Tutup menu" data-testid="button-close-menu"><X size={18} /></button>
        </div>
        <div className="mt-12 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7190b5]">Ruang kerja</div>
        <nav className="mt-3 space-y-1.5" aria-label="Navigasi utama">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${location === href ? "bg-[#21517e] text-[#f6fbff] shadow-[inset_3px_0_0_#70d6ef]" : "text-[#a9bdd7] hover:bg-[#1d3a60] hover:text-white"}`} data-testid={`link-nav-${label.toLowerCase()}`}>
              <Icon size={18} strokeWidth={location === href ? 2.3 : 1.8} /><span>{label}</span>
              {href === "/students" && <span className="ml-auto font-mono-ui text-[10px] text-[#7f9abe]">KATALOG</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-10 border-t border-[#284465] pt-6">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7190b5]">Pintasan</p>
          <Link href="/admin/students/new" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center gap-3 rounded-xl border border-[#3f6388] px-3 py-3 text-sm font-semibold text-[#dcf8ff] transition-colors hover:bg-[#203b63]" data-testid="link-new-student">
            <Plus size={17} /><span>Tambah portofolio</span>
          </Link>
        </div>
        <div className="mt-auto border-t border-[#284465] pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4eef6] text-xs font-bold text-[#1b5688]">{admin?.name?.split(" ").map((x) => x[0]).join("").slice(0, 2) || "AD"}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#f5f9ff]" data-testid="text-admin-name">{admin?.name || "Admin"}</p>
              <p className="truncate text-[11px] text-[#8da7c8]">{admin?.email || "Akses admin"}</p>
            </div>
            <button type="button" className="ml-auto rounded-lg p-2 text-[#8da7c8] hover:bg-[#203b63] hover:text-white" onClick={signOut} disabled={logout.isPending} aria-label="Keluar" data-testid="button-logout"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>
      {mobileOpen && <button type="button" className="fixed inset-0 z-30 bg-[#10294c]/35 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi" data-testid="button-menu-overlay" />}
      <main className="min-h-[100dvh] lg:pl-[250px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-[#dce6f0] bg-[#f4f8fc]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl border border-[#d8e4ef] bg-white p-2.5 text-[#315174] lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Buka menu" data-testid="button-open-menu"><Menu size={18} /></button>
            <div className="hidden items-center gap-2 text-xs font-medium text-[#7a8ea8] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#6fd5ee]" />Data internal terverifikasi</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/students" className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#536a84] hover:bg-white sm:flex" data-testid="link-search-students"><Search size={16} /> Cari student</Link>
            <Link href="/admin/content" className="rounded-xl border border-[#d8e4ef] bg-white p-2.5 text-[#536a84] hover:border-[#b8cadc]" aria-label="Pengaturan konten" data-testid="button-settings"><Settings2 size={17} /></Link>
          </div>
        </header>
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">{children}</div>
      </main>
    </div>
  );
}