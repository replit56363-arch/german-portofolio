import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, FileText, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { SectionEyebrow, StatusPill, StudentAvatar } from "@/components/portfolio-ui";

function LandingSkeleton() {
  return (
    <div className="space-y-7" aria-label="Memuat halaman beranda">
      <div className="h-[330px] rounded-[1.6rem] shimmer sm:h-[300px]" />
      <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
        <div className="h-56 rounded-2xl shimmer" />
        <div className="h-56 rounded-2xl shimmer" />
      </div>
    </div>
  );
}

function LandingError({ retry }: { retry: () => void }) {
  return (
    <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-[#f1d0cb] bg-[#fff8f5] p-8 text-center" data-testid="status-landing-error">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f9e5df] text-[#b66154]"><FileText size={22} /></div>
      <p className="mt-5 font-mono-ui text-[10px] font-bold uppercase tracking-[.15em] text-[#bd6a5d]">Beranda belum tersedia</p>
      <h1 className="mt-2 text-xl font-bold text-[#3d4350]">Konten landing belum dapat dimuat</h1>
      <p className="mt-2 text-sm leading-6 text-[#7d8794]">Periksa koneksi Anda, lalu coba muat ulang ruang kerja ini.</p>
      <button type="button" onClick={retry} className="mt-5 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5" data-testid="button-retry-landing">Coba lagi</button>
    </div>
  );
}

export default function Landing() {
  const contentQuery = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const summaryQuery = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });

  if (contentQuery.isLoading) return <LandingSkeleton />;
  if (contentQuery.isError || !contentQuery.data) return <LandingError retry={() => void contentQuery.refetch()} />;

  const content = contentQuery.data;
  const summary = summaryQuery.data;
  const contentStats = [
    { value: content.statOneValue, label: content.statOneLabel, tone: "cyan" },
    { value: content.statTwoValue, label: content.statTwoLabel, tone: "amber" },
    { value: content.statThreeValue, label: content.statThreeLabel, tone: "teal" },
    { value: content.statFourValue, label: content.statFourLabel, tone: "blue" },
  ];

  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-[1.6rem] bg-[#173b65] px-6 py-8 text-[#f3f8fc] shadow-[0_20px_48px_rgba(23,59,101,.17)] sm:px-10 sm:py-11 lg:px-14 lg:py-14">
        <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full border border-[#73d6e9]/25" />
        <div className="absolute right-20 top-16 -z-10 h-36 w-36 rounded-full border border-[#73d6e9]/20" />
        <div className="absolute bottom-[-80px] left-[45%] -z-10 h-48 w-48 rounded-full bg-[#2a6685]/25 blur-2xl" />
        <div className="relative max-w-3xl rise-in">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-.06em] text-[#fbfdff] sm:text-5xl lg:text-[4.2rem]" data-testid="text-landing-title">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#bad0e3] sm:text-lg" data-testid="text-landing-description">{content.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/students" className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f5c36f] px-5 py-3.5 text-sm font-bold text-[#253d5a] transition-transform hover:-translate-y-0.5" data-testid="link-landing-primary-cta">{content.primaryCta}<ArrowUpRight size={17} /></Link>
            <Link href="/admin/content" className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#6283a0] px-5 py-3.5 text-sm font-bold text-[#e6f1f8] transition-colors hover:bg-[#234d77]" data-testid="link-landing-secondary-cta">{content.secondaryCta}<ArrowDownRight size={16} /></Link>
          </div>
        </div>
        <div className="relative mt-9 grid max-w-2xl grid-cols-2 gap-2 border-t border-[#507496] pt-5 sm:grid-cols-4 sm:gap-5 rise-in rise-in-delay-1">
          {contentStats.map((stat, index) => (
            <div key={stat.label} data-testid={`stat-landing-${index + 1}`}>
              <p className="font-mono-ui text-2xl font-bold tracking-[-.06em] text-[#f9c773]">{stat.value}</p>
              <p className="mt-1 text-[11px] leading-4 text-[#b3c9dc]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
        <div className="rounded-2xl border border-[#dce7ef] bg-[#fbfdff] p-6 soft-shadow sm:p-8 rise-in rise-in-delay-1">
          <SectionEyebrow>{content.introLabel}</SectionEyebrow>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 tracking-[-.03em] text-[#29445f] sm:text-2xl" data-testid="text-landing-intro">{content.introText}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { icon: UsersRound, title: "Profil terkurasi", text: "Portofolio ringkas dengan jejak progres yang jelas." },
              { icon: BriefcaseBusiness, title: "Siap dikenalkan", text: "Cari kandidat sesuai level, cohort, dan kesiapan." },
              { icon: ShieldCheck, title: "Data internal", text: "Akses terbatas untuk tim dan partner tepercaya." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl bg-[#eef7fa] p-4" data-testid={`card-landing-principle-${title}`}>
                <Icon size={18} className="text-[#2b86a5]" />
                <p className="mt-4 text-sm font-bold text-[#31506b]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#7890a4]">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8 rise-in rise-in-delay-2">
          <div className="flex items-start justify-between gap-4">
            <div><SectionEyebrow>Snapshot saat ini</SectionEyebrow><h2 className="mt-1 text-xl font-bold tracking-[-.03em] text-[#29445f]">Sinyal placement</h2></div>
            <span className="rounded-full bg-[#e5f7f2] px-2.5 py-1 font-mono-ui text-[9px] font-bold tracking-[.12em] text-[#21765f]">LIVE</span>
          </div>
          {summaryQuery.isLoading ? (
            <div className="mt-7 space-y-4"><div className="h-10 rounded-xl shimmer" /><div className="h-10 rounded-xl shimmer" /><div className="h-10 rounded-xl shimmer" /></div>
          ) : summary ? (
            <div className="mt-7 space-y-5">
              <div><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#647c92]">Total profil aktif</span><strong className="font-mono-ui text-[#24527b]" data-testid="metric-landing-total">{summary.totalStudents}</strong></div><div className="h-2 overflow-hidden rounded-full bg-[#edf2f5]"><div className="h-full rounded-full bg-[#56b8d0]" style={{ width: `${Math.min(summary.totalStudents * 5, 100)}%` }} /></div></div>
              <div><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#647c92]">Siap dikenalkan</span><strong className="font-mono-ui text-[#217760]" data-testid="metric-landing-ready">{summary.readyToPlace}</strong></div><div className="h-2 overflow-hidden rounded-full bg-[#edf2f5]"><div className="h-full rounded-full bg-[#55b997]" style={{ width: `${summary.totalStudents ? Math.min((summary.readyToPlace / summary.totalStudents) * 100, 100) : 0}%` }} /></div></div>
              <div className="flex items-center justify-between border-t border-[#e7eef3] pt-4"><span className="text-xs font-semibold text-[#647c92]">Placement rate</span><span className="font-mono-ui text-lg font-bold text-[#d08c35]" data-testid="metric-landing-placement-rate">{summary.placementRate}%</span></div>
            </div>
          ) : (
            <div className="mt-7 rounded-xl bg-[#fff8ec] p-4 text-xs leading-5 text-[#8d723f]" data-testid="status-landing-summary-unavailable">Ringkasan live sedang tidak tersedia. Konten landing tetap dapat digunakan.</div>
          )}
          <Link href="/students" className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#2464a0] hover:text-[#124d8c]" data-testid="link-landing-catalog">Buka katalog siswa <ArrowUpRight size={14} /></Link>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-[#c9e6ec] bg-[#e9f7f8] px-6 py-7 sm:px-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(120deg,transparent_20%,rgba(109,210,222,.15)_20%,rgba(109,210,222,.15)_21%,transparent_21%,transparent_42%,rgba(109,210,222,.15)_42%,rgba(109,210,222,.15)_43%,transparent_43%)]" />
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="max-w-2xl"><SectionEyebrow>Untuk partner</SectionEyebrow><h2 className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#234964]" data-testid="text-landing-trust-title">{content.trustTitle}</h2><p className="mt-2 text-sm leading-6 text-[#537489]" data-testid="text-landing-trust-text">{content.trustText}</p></div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-[#bcdde4] bg-[#f8ffff]/70 px-4 py-3 text-xs font-bold text-[#2d6980]"><CheckCircle2 size={18} /> Profil diperbarui oleh tim</div>
        </div>
      </section>

      {summary && summary.recentStudents.length > 0 && (
        <section className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><SectionEyebrow>Profil terbaru</SectionEyebrow><h2 className="mt-1 text-xl font-bold tracking-[-.03em] text-[#29445f]">Kenali kandidat berikutnya</h2></div><Link href="/students" className="inline-flex items-center gap-1 text-xs font-bold text-[#2464a0]" data-testid="link-landing-recent-view">Lihat seluruh katalog <ArrowUpRight size={14} /></Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {summary.recentStudents.slice(0, 3).map((student) => (
              <Link key={student.id} href={`/students/${student.id}`} className="group flex items-center gap-3 rounded-xl border border-[#e7eef3] p-3 transition-colors hover:border-[#b8dce5] hover:bg-[#f6fcfd]" data-testid={`card-landing-student-${student.id}`}>
                <StudentAvatar student={student} size="sm" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#2e4863] group-hover:text-[#1458a7]">{student.name}</p><div className="mt-1 flex items-center gap-2"><span className="font-mono-ui text-[10px] text-[#68839a]">{student.level}</span><StatusPill status={student.status} /></div></div>
                <ArrowUpRight size={15} className="shrink-0 text-[#a5b8c7]" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}