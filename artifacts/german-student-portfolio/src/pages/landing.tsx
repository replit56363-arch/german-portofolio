import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight, BarChart3, BookOpenCheck, BriefcaseBusiness, CheckCircle2, ClipboardCheck, FileText, GraduationCap, HeartHandshake, LogIn, ShieldCheck, Sparkles, UserRoundCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { useGetSiteContent, getGetSiteContentQueryKey } from "@workspace/api-client-react";
import { SectionEyebrow } from "@/components/portfolio-ui";

type LandingSummary = {
  totalStudents: number;
  readyToPlace: number;
  placedStudents: number;
  inProgress: number;
  placementRate: number;
  byLevel: Array<{ level: string; count: number }>;
  programs: Array<{ program: string; count: number }>;
};

function useLandingSummary() {
  return useQuery<LandingSummary>({
    queryKey: ["/api/landing-summary"],
    queryFn: async () => {
      const response = await fetch("/api/landing-summary");
      if (!response.ok) throw new Error("Ringkasan portfolio belum tersedia.");
      return response.json() as Promise<LandingSummary>;
    },
    staleTime: 60_000,
  });
}

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
  const summaryQuery = useLandingSummary();

  if (contentQuery.isLoading) return <LandingSkeleton />;
  if (contentQuery.isError || !contentQuery.data) return <LandingError retry={() => void contentQuery.refetch()} />;

  const content = contentQuery.data;
  const contentStats = [
    { value: content.statOneValue, label: content.statOneLabel },
    { value: content.statTwoValue, label: content.statTwoLabel },
    { value: content.statThreeValue, label: content.statThreeLabel },
    { value: content.statFourValue, label: content.statFourLabel },
  ];
  const summary = summaryQuery.data;
  const summaryCards = [
    { label: "Total portfolio", value: summary?.totalStudents ?? "—", detail: "profil siswa terdata", icon: UsersRound },
    { label: "Siap ditempatkan", value: summary?.readyToPlace ?? "—", detail: "profil dengan status siap", icon: UserRoundCheck },
    { label: "Sudah ditempatkan", value: summary?.placedStudents ?? "—", detail: "siswa dengan placement", icon: HeartHandshake },
    { label: "Placement rate", value: summary ? `${summary.placementRate}%` : "—", detail: "dari seluruh portfolio", icon: BarChart3 },
  ];
  const partnerBenefits = [
    { icon: ClipboardCheck, title: "Bukti terstruktur", text: "Level, sertifikat, riwayat progres, dan catatan kesiapan tersusun dalam satu profil." },
    { icon: BookOpenCheck, title: "Progress terlihat", text: "Partner dapat memahami perjalanan belajar siswa, bukan hanya melihat hasil akhir." },
    { icon: BriefcaseBusiness, title: "Siap dicocokkan", text: "Filter cohort, level, dan status membantu tim menemukan kandidat yang relevan." },
    { icon: ShieldCheck, title: "Akses terkontrol", text: "Data detail hanya tersedia bagi tim dan placement partner yang sudah mendapat akses." },
  ];
  const workflowSteps = [
    { number: "01", title: "Pilih profil", text: "Mulai dari level bahasa, cohort, atau status kesiapan yang sesuai kebutuhan." },
    { number: "02", title: "Tinjau bukti", text: "Baca bio, cek sertifikat, lihat riwayat level, dan pahami konteks kandidat." },
    { number: "03", title: "Lanjutkan percakapan", text: "Gunakan profil terverifikasi sebagai dasar pengenalan dan proses placement." },
  ];
  const placementPrograms = [
    { icon: GraduationCap, title: "Ausbildung", text: "Kandidat dengan target karier vokasional dan kesiapan bahasa yang terukur." },
    { icon: HeartHandshake, title: "FSJ & sosial", text: "Profil untuk program pelayanan sosial dengan dukungan progres yang jelas." },
    { icon: Sparkles, title: "Studi lanjut", text: "Siswa yang menyiapkan bahasa dan dokumen untuk langkah akademik berikutnya." },
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
            <Link href="/login" className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f5c36f] px-5 py-3.5 text-sm font-bold text-[#253d5a] transition-transform hover:-translate-y-0.5" data-testid="link-landing-primary-cta">{content.primaryCta}<ArrowUpRight size={17} /></Link>
            <Link href="/login" className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#6283a0] px-5 py-3.5 text-sm font-bold text-[#e6f1f8] transition-colors hover:bg-[#234d77]" data-testid="link-landing-secondary-cta">{content.secondaryCta}<ArrowDownRight size={16} /></Link>
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

      <section className="space-y-5" aria-labelledby="portfolio-summary-title">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <SectionEyebrow>Ringkasan portfolio</SectionEyebrow>
            <h2 id="portfolio-summary-title" className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#29445f]">Data yang membantu partner bergerak lebih cepat.</h2>
          </div>
          <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-[#7b95aa]">{summaryQuery.isFetching ? "Memperbarui data" : "Data terbaru"}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map(({ label, value, detail, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-[#dce7ef] bg-white p-5 soft-shadow">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-xl bg-[#eaf7fa] p-2.5 text-[#2d8aa4]"><Icon size={18} /></span>
                <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#98abba]">LIVE</span>
              </div>
              <p className="mt-5 font-mono-ui text-3xl font-bold tracking-[-.06em] text-[#214e78]">{value}</p>
              <p className="mt-2 text-sm font-bold text-[#3b5871]">{label}</p>
              <p className="mt-1 text-xs text-[#8295a6]">{detail}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-5 rounded-2xl border border-[#dce7ef] bg-[#f8fbfd] p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionEyebrow>Komposisi level</SectionEyebrow>
            <h3 className="mt-2 text-xl font-bold tracking-[-.03em] text-[#29445f]">Kesiapan bahasa dalam satu pandangan.</h3>
            <p className="mt-3 text-sm leading-6 text-[#71869a]">Distribusi level membantu partner melihat kedalaman talent pool sebelum membuka profil secara detail.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(summary?.byLevel ?? ["A1", "A2", "B1", "B2"].map((level) => ({ level, count: 0 }))).map(({ level, count }) => (
              <div key={level} className="rounded-xl border border-[#e0ebf0] bg-white p-4">
                <p className="font-mono-ui text-xl font-bold text-[#246b91]">{count}</p>
                <p className="mt-1 text-xs font-bold text-[#58748b]">Level {level}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e5f0f3]"><div className="h-full rounded-full bg-[#6bd2df]" style={{ width: `${summary?.totalStudents ? Math.max(8, (count / summary.totalStudents) * 100) : 8}%` }} /></div>
              </div>
            ))}
          </div>
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
            <span className="rounded-full bg-[#e8f2fd] px-2.5 py-1 font-mono-ui text-[9px] font-bold tracking-[.12em] text-[#28629c]">PRIVATE</span>
          </div>
          <div className="mt-7 rounded-xl bg-[#f5f8fb] p-4 text-sm leading-6 text-[#5e748a]">Data kandidat dan rekam jejak hanya tersedia untuk partner yang telah mendapatkan akses. Masuk ke portal untuk melihat katalog siswa dan bukti kemampuan secara lengkap.</div>
          <Link href="/login" className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#2464a0] hover:text-[#124d8c]" data-testid="link-landing-catalog">Masuk ke portal partner <LogIn size={14} /></Link>
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="partner-benefits-title">
        <div>
          <SectionEyebrow>Yang partner dapat</SectionEyebrow>
          <h2 id="partner-benefits-title" className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#29445f]">Bukan sekadar daftar nama.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71869a]">Setiap data dirancang untuk menjawab pertanyaan penting partner: siapa kandidatnya, sudah sejauh apa progresnya, dan apa langkah berikutnya.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {partnerBenefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[#dce7ef] bg-white p-5 soft-shadow">
              <Icon size={20} className="text-[#2b86a5]" />
              <h3 className="mt-5 text-base font-bold text-[#31506b]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#7890a4]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-2xl bg-[#173b65] p-6 text-[#f4f8fc] shadow-[0_18px_40px_rgba(23,59,101,.14)] sm:p-8">
          <SectionEyebrow>Alur kerja partner</SectionEyebrow>
          <h2 className="mt-2 text-2xl font-bold tracking-[-.04em]">Dari pencarian sampai pengenalan.</h2>
          <div className="mt-7 space-y-5">
            {workflowSteps.map(({ number, title, text }) => (
              <div key={number} className="flex gap-4 border-t border-[#456889] pt-5 first:border-t-0 first:pt-0">
                <span className="font-mono-ui text-xs font-bold text-[#f5c36f]">{number}</span>
                <div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#b7cde0]">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
          <SectionEyebrow>Fokus penempatan</SectionEyebrow>
          <h2 className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#29445f]">Konteks program yang lebih jelas.</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {placementPrograms.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl bg-[#eef7fa] p-4">
                <Icon size={19} className="text-[#2b86a5]" />
                <h3 className="mt-4 text-sm font-bold text-[#31506b]">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#7890a4]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[#e6eef2] pt-5">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-[#8ca1b1]">Program yang sudah tercatat</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(summary?.programs ?? []).length ? summary?.programs.map(({ program, count }) => <span key={program} className="rounded-full bg-[#f2f7fa] px-3 py-2 text-xs font-semibold text-[#4b6c84]">{program} · {count}</span>) : <span className="text-sm text-[#7d93a4]">Data program akan muncul setelah portfolio tersedia.</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-[#c9e6ec] bg-[#e9f7f8] px-6 py-7 sm:px-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(120deg,transparent_20%,rgba(109,210,222,.15)_20%,rgba(109,210,222,.15)_21%,transparent_21%,transparent_42%,rgba(109,210,222,.15)_42%,rgba(109,210,222,.15)_43%,transparent_43%)]" />
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="max-w-2xl"><SectionEyebrow>Untuk partner</SectionEyebrow><h2 className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#234964]" data-testid="text-landing-trust-title">{content.trustTitle}</h2><p className="mt-2 text-sm leading-6 text-[#537489]" data-testid="text-landing-trust-text">{content.trustText}</p></div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-[#bcdde4] bg-[#f8ffff]/70 px-4 py-3 text-xs font-bold text-[#2d6980]"><CheckCircle2 size={18} /> Profil diperbarui oleh tim</div>
        </div>
      </section>

    </div>
  );
}