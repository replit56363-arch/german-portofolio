import './_group.css';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const content = {
  eyebrow: 'Lernpfad · Partner portfolio',
  title: 'Bukti kesiapan, lebih dekat.',
  description: 'Ruang kerja untuk mengelola portofolio bahasa siswa dan menghubungkan talenta siap kerja dengan partner Jerman.',
  primaryCta: 'Lihat katalog siswa',
  secondaryCta: 'Kelola konten halaman',
  introLabel: 'Satu profil. Lebih banyak peluang.',
  introText: 'Kami mendampingi siswa dari fondasi A1 hingga kesiapan profesional B2, dengan bukti kemampuan yang mudah dipahami partner.',
  statOneValue: 'A1–B2',
  statOneLabel: 'Level terukur',
  statTwoValue: '100%',
  statTwoLabel: 'Profil terdokumentasi',
  statThreeValue: '1:1',
  statThreeLabel: 'Pendampingan karier',
  statFourValue: 'DE',
  statFourLabel: 'Fokus penempatan',
  trustTitle: 'Portofolio yang siap dibagikan.',
  trustText: 'Gunakan data ini sebagai dasar percakapan yang lebih cepat, terarah, dan percaya diri bersama partner penempatan.',
};

const summaryCards = [
  { label: 'Total portfolio', value: '6', detail: 'profil siswa terdata', icon: UsersRound },
  { label: 'Siap ditempatkan', value: '2', detail: 'profil dengan status siap', icon: UserRoundCheck },
  { label: 'Sudah ditempatkan', value: '2', detail: 'siswa dengan placement', icon: HeartHandshake },
  { label: 'Placement rate', value: '33%', detail: 'dari seluruh portfolio', icon: BarChart3 },
];

const partnerBenefits = [
  { icon: ClipboardCheck, title: 'Bukti terstruktur', text: 'Level, sertifikat, riwayat progres, dan catatan kesiapan tersusun dalam satu profil.' },
  { icon: BookOpenCheck, title: 'Progress terlihat', text: 'Partner dapat memahami perjalanan belajar siswa, bukan hanya melihat hasil akhir.' },
  { icon: BriefcaseBusiness, title: 'Siap dicocokkan', text: 'Filter cohort, level, dan status membantu tim menemukan kandidat yang relevan.' },
  { icon: ShieldCheck, title: 'Akses terkontrol', text: 'Data detail hanya tersedia bagi tim dan placement partner yang sudah mendapat akses.' },
];

const workflowSteps = [
  { number: '01', title: 'Pilih profil', text: 'Mulai dari level bahasa, cohort, atau status kesiapan yang sesuai kebutuhan.' },
  { number: '02', title: 'Tinjau bukti', text: 'Baca bio, cek sertifikat, lihat riwayat level, dan pahami konteks kandidat.' },
  { number: '03', title: 'Lanjutkan percakapan', text: 'Gunakan profil terverifikasi sebagai dasar pengenalan dan proses placement.' },
];

const principles: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: UsersRound, title: 'Profil terkurasi', text: 'Portofolio ringkas dengan jejak progres yang jelas.' },
  { icon: BriefcaseBusiness, title: 'Siap dikenalkan', text: 'Cari kandidat sesuai level, cohort, dan kesiapan.' },
  { icon: ShieldCheck, title: 'Data internal', text: 'Akses terbatas untuk tim dan partner tepercaya.' },
];

const placementPrograms: Array<{ icon: LucideIcon; title: string }> = [
  { icon: GraduationCap, title: 'Ausbildung' },
  { icon: HeartHandshake, title: 'FSJ & sosial' },
  { icon: Sparkles, title: 'Studi lanjut' },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-[#51809e]">{children}</p>;
}

export function Current() {
  const contentStats = [
    [content.statOneValue, content.statOneLabel],
    [content.statTwoValue, content.statTwoLabel],
    [content.statThreeValue, content.statThreeLabel],
    [content.statFourValue, content.statFourLabel],
  ];

  return (
    <div className="min-h-screen space-y-8 bg-[#dfe9f1] p-5 sm:p-8">
      <section className="relative isolate overflow-hidden rounded-[1.6rem] bg-[#173b65] px-6 py-8 text-[#f3f8fc] shadow-[0_20px_48px_rgba(23,59,101,.17)] sm:px-10 sm:py-11 lg:px-14 lg:py-14">
        <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full border border-[#73d6e9]/25" />
        <div className="absolute right-20 top-16 -z-10 h-36 w-36 rounded-full border border-[#73d6e9]/20" />
        <div className="absolute bottom-[-80px] left-[45%] -z-10 h-48 w-48 rounded-full bg-[#2a6685]/25 blur-2xl" />
        <div className="relative max-w-3xl rise-in">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-.06em] text-[#fbfdff] sm:text-5xl lg:text-[4.2rem]">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#bad0e3] sm:text-lg">{content.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f5c36f] px-5 py-3.5 text-sm font-bold text-[#253d5a]">{content.primaryCta}<ArrowUpRight size={17} /></button>
            <button className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#6283a0] px-5 py-3.5 text-sm font-bold text-[#e6f1f8]">{content.secondaryCta}<ArrowDownRight size={16} /></button>
          </div>
        </div>
        <div className="relative mt-9 grid max-w-2xl grid-cols-2 gap-2 border-t border-[#507496] pt-5 sm:grid-cols-4 sm:gap-5">
          {contentStats.map(([value, label]) => <div key={label}><p className="font-mono-ui text-2xl font-bold tracking-[-.06em] text-[#f9c773]">{value}</p><p className="mt-1 text-[11px] leading-4 text-[#b3c9dc]">{label}</p></div>)}
        </div>
      </section>

      <section className="space-y-5">
        <div><SectionEyebrow>Ringkasan portfolio</SectionEyebrow><h2 className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#29445f]">Data yang membantu partner bergerak lebih cepat.</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map(({ label, value, detail, icon: Icon }) => <div key={label} className="rounded-2xl border border-[#dce7ef] bg-white p-5 soft-shadow"><div className="flex items-center justify-between"><span className="rounded-xl bg-[#eaf7fa] p-2.5 text-[#2d8aa4]"><Icon size={18} /></span><span className="font-mono-ui text-[10px] font-bold tracking-[.12em] text-[#98abba]">LIVE</span></div><p className="mt-5 font-mono-ui text-3xl font-bold tracking-[-.06em] text-[#214e78]">{value}</p><p className="mt-2 text-sm font-bold text-[#3b5871]">{label}</p><p className="mt-1 text-xs text-[#8295a6]">{detail}</p></div>)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
        <div className="rounded-2xl border border-[#dce7ef] bg-[#fbfdff] p-6 soft-shadow sm:p-8">
          <SectionEyebrow>{content.introLabel}</SectionEyebrow>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 tracking-[-.03em] text-[#29445f] sm:text-2xl">{content.introText}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-xl bg-[#eef7fa] p-4"><Icon size={18} className="text-[#2b86a5]" /><p className="mt-4 text-sm font-bold text-[#31506b]">{title}</p><p className="mt-1 text-xs leading-5 text-[#7890a4]">{text}</p></div>)}
          </div>
        </div>
        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8">
          <div className="flex items-start justify-between"><div><SectionEyebrow>Snapshot saat ini</SectionEyebrow><h2 className="mt-1 text-xl font-bold text-[#29445f]">Sinyal placement</h2></div><span className="rounded-full bg-[#e8f2fd] px-2.5 py-1 font-mono-ui text-[9px] font-bold text-[#28629c]">PRIVATE</span></div>
          <div className="mt-7 rounded-xl bg-[#f5f8fb] p-4 text-sm leading-6 text-[#5e748a]">Data kandidat dan rekam jejak hanya tersedia untuk partner yang telah mendapatkan akses. Masuk ke portal untuk melihat katalog siswa dan bukti kemampuan secara lengkap.</div>
          <button className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#2464a0]">Masuk ke portal partner <LogIn size={14} /></button>
        </div>
      </section>

      <section className="space-y-5">
        <div><SectionEyebrow>Yang partner dapat</SectionEyebrow><h2 className="mt-2 text-2xl font-bold tracking-[-.04em] text-[#29445f]">Bukan sekadar daftar nama.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{partnerBenefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#dce7ef] bg-white p-5 soft-shadow"><Icon size={20} className="text-[#2b86a5]" /><h3 className="mt-5 text-base font-bold text-[#31506b]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#7890a4]">{text}</p></div>)}</div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-2xl bg-[#173b65] p-6 text-[#f4f8fc] shadow-[0_18px_40px_rgba(23,59,101,.14)] sm:p-8"><SectionEyebrow>Alur kerja partner</SectionEyebrow><h2 className="mt-2 text-2xl font-bold">Dari pencarian sampai pengenalan.</h2><div className="mt-7 space-y-5">{workflowSteps.map(({ number, title, text }) => <div key={number} className="flex gap-4 border-t border-[#456889] pt-5 first:border-t-0 first:pt-0"><span className="font-mono-ui text-xs font-bold text-[#f5c36f]">{number}</span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#b7cde0]">{text}</p></div></div>)}</div></div>
        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 soft-shadow sm:p-8"><SectionEyebrow>Fokus penempatan</SectionEyebrow><h2 className="mt-2 text-2xl font-bold text-[#29445f]">Konteks program yang lebih jelas.</h2><div className="mt-7 grid gap-4 sm:grid-cols-3">{placementPrograms.map(({ icon: Icon, title }) => <div key={title} className="rounded-xl bg-[#eef7fa] p-4"><Icon size={19} className="text-[#2b86a5]" /><h3 className="mt-4 text-sm font-bold text-[#31506b]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#7890a4]">Profil dengan target yang jelas dan progres yang terdokumentasi.</p></div>)}</div></div>
      </section>

      <section className="rounded-2xl border border-[#c9e6ec] bg-[#e9f7f8] px-6 py-7 sm:px-8"><SectionEyebrow>Untuk partner</SectionEyebrow><h2 className="mt-2 text-2xl font-bold text-[#234964]">{content.trustTitle}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#537489]">{content.trustText}</p><div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#bcdde4] bg-[#f8ffff]/70 px-4 py-3 text-xs font-bold text-[#2d6980]"><CheckCircle2 size={18} /> Profil diperbarui oleh tim</div></section>
    </div>
  );
}