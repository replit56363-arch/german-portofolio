import { Link } from "wouter";
import { useCms } from "@/lib/use-cms";
import { SectionEyebrow } from "@/components/portfolio-ui";
import {
  Home,
  Newspaper,
  Tv,
  Briefcase,
  MapPin,
  Trophy,
  CheckCircle2,
  Users,
  Compass,
  LayoutTemplate,
  ExternalLink,
  Edit3,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function CmsOverviewPage() {
  const { data: cmsData, isLoading } = useCms();

  const pages = [
    {
      id: "home",
      title: "Halaman Utama (Beranda)",
      description: "Hero banner, statistik program, kartu Ausbildung & Studi, 4 langkah alur persiapan.",
      path: "/admin/cms/home",
      publicPath: "/",
      icon: Home,
      color: "bg-[#eaf3fa] text-[#1b5a9f] border-[#c2dcf0]",
      badge: "Utama",
      count: `${cmsData?.home?.stats?.length || 4} Stat · ${cmsData?.home?.programCards?.length || 2} Program`,
    },
    {
      id: "news",
      title: "Halaman Berita",
      description: "Daftar artikel kabar terkini, filter kategori (Media, Partner, Program), sorotan featured.",
      path: "/admin/cms/news",
      publicPath: "/berita",
      icon: Newspaper,
      color: "bg-[#feece8] text-[#c04b34] border-[#fcd3c8]",
      badge: "Publikasi",
      count: `${cmsData?.news?.items?.length || 0} Artikel Berita`,
    },
    {
      id: "media",
      title: "Halaman Media & TV",
      description: "Liputan stasiun TV Jerman (stern TV, ZDF, Spiegel TV), video wawancara & dokumenter.",
      path: "/admin/cms/media",
      publicPath: "/media",
      icon: Tv,
      color: "bg-[#e2f7f3] text-[#1c7866] border-[#bfece2]",
      badge: "Liputan",
      count: `${cmsData?.media?.items?.length || 0} Liputan Video`,
    },
    {
      id: "services",
      title: "Halaman Layanan",
      description: "Alur kerja interaktif 7 tahap (dari rekrutmen hingga kedatangan di Jerman), benefit partner.",
      path: "/admin/cms/services",
      publicPath: "/layanan",
      icon: Briefcase,
      color: "bg-[#fdf4db] text-[#936b0d] border-[#fae7b1]",
      badge: "Alur 7 Tahap",
      count: `${cmsData?.services?.stages?.length || 7} Tahap Alur`,
    },
    {
      id: "jakarta",
      title: "Halaman Jakarta & Kontak",
      description: "Informasi kantor perwakilan Jakarta & kantor Jerman, jam kerja, kontak telepon, email, alamat.",
      path: "/admin/cms/jakarta",
      publicPath: "/jakarta",
      icon: MapPin,
      color: "bg-[#fbeee6] text-[#b4532c] border-[#f5d5bf]",
      badge: "Kantor & Tim",
      count: "2 Kantor Operasional",
    },
    {
      id: "references",
      title: "Halaman Referensi",
      description: "Kisah nyata keberhasilan siswa, juara kompetisi di Jerman, quote inspiratif.",
      path: "/admin/cms/references",
      publicPath: "/referensi",
      icon: Trophy,
      color: "bg-[#fbf4d9] text-[#8e6810] border-[#f5e49f]",
      badge: "Prestasi",
      count: `${cmsData?.references?.stories?.length || 0} Kisah Keberhasilan`,
    },
    {
      id: "placements",
      title: "Halaman Penempatan Berhasil",
      description: "4 pilar jaminan penempatan siswa, verifikasi perusahaan di Jerman, pendampingan.",
      path: "/admin/cms/placements",
      publicPath: "/penempatan-berhasil",
      icon: CheckCircle2,
      color: "bg-[#eaf4eb] text-[#2c753b] border-[#cce8d0]",
      badge: "Karier",
      count: `${cmsData?.placements?.steps?.length || 4} Pilar Penempatan`,
    },
    {
      id: "partner",
      title: "Halaman Untuk Partner (AG-Anfrage)",
      description: "Informasi B2B kemitraan perusahaan Jerman, kontak perwakilan (Wolfgang Nickel).",
      path: "/admin/cms/partner",
      publicPath: "/ag-anfrage",
      icon: Users,
      color: "bg-[#edf1f8] text-[#345885] border-[#cbd8eb]",
      badge: "Kemitraan",
      count: "Perwakilan & B2B Inquiry",
    },
    {
      id: "navbar",
      title: "Navbar & Navigasi Header",
      description: "Pengaturan link menu header, visibilitas tombol, label logo, dan tombol CTA Masuk Portal.",
      path: "/admin/cms/navbar",
      publicPath: "/",
      icon: Compass,
      color: "bg-[#eaf2f9] text-[#1f568c] border-[#c2daee]",
      badge: "Global Header",
      count: `${cmsData?.navbar?.links?.length || 7} Menu Link`,
    },
    {
      id: "footer",
      title: "Footer & Kaki Halaman",
      description: "Pengaturan link footer, teks copyright, informasi kontak cepat, tautan akun media sosial.",
      path: "/admin/cms/footer",
      publicPath: "/",
      icon: LayoutTemplate,
      color: "bg-[#edf1f5] text-[#37526d] border-[#ccd9e6]",
      badge: "Global Footer",
      count: `${cmsData?.footer?.links?.length || 6} Link · ${cmsData?.footer?.socialLinks?.length || 3} Medsos`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl border border-[#d6e3ed] bg-gradient-to-r from-[#194b7e] to-[#25639d] p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-white/20 px-2.5 py-0.5 font-mono text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                CMS Studio
              </span>
              <span className="text-xs text-white/80">· Manajemen Konten Publik</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Pusat Pengelolaan Konten Website (CMS)
            </h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Kelola, perbarui, dan sesuaikan semua teks, gambar, artikel berita, liputan TV, tahapan alur layanan, serta navigasi publik secara langsung dan instan.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1b5a9f] shadow hover:bg-[#edf5fb]"
            >
              Lihat Website Publik <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* PAGE CARDS GRID */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <SectionEyebrow>Halaman & Komponen</SectionEyebrow>
            <h2 className="text-base sm:text-lg font-bold text-[#1f3b58]">
              Pilih Halaman yang Ingin Dikelola
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <div
                key={page.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#dce7ef] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1b5a9f]/40 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${page.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-[#edf4fa] px-2.5 py-0.5 text-[10px] font-bold text-[#3d6083]">
                      {page.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1f3b58] group-hover:text-[#1b5a9f]">
                      {page.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#5d7a96] leading-relaxed line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#edf3f7] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#718da6]">
                    {page.count}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={page.publicPath}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg p-1.5 text-[#7390ab] hover:bg-[#edf5fb] hover:text-[#1b5a9f]"
                      title="Lihat halaman publik"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <Link
                      to={page.path}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#1b5a9f] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#154b85]"
                    >
                      Kelola <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
