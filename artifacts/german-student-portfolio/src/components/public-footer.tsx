import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { useLanguage } from "@/lib/language-context";
import { Globe2, Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";

function FooterLogo({ name, subtitle }: { name?: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 text-[#173d3a]">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-[#173d3a] bg-[#f5eee3] shadow-sm flex items-center justify-center p-0.5">
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

const defaultFooterData = {
  brandName: "ICH LIEBE DEUTSCH MEDAN",
  brandSubtitle: "Lembaga Kursus Bahasa Jerman Terdaftar & Izin Operasional",
  tagline: "“Deutsch lernen. Deutschland verstehen. Zukunft gestalten.” — Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik.",
  copyright: "© 2024–2026 ICH LIEBE DEUTSCH MEDAN. Hak cipta dilindungi undang-undang.",
  contactEmail: "ichliebedtschmedan@gmail.com",
  contactPhone: "082127324453",
  addressJakarta: "Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara",
  addressGermany: "Jerman · Pendampingan Khusus Kandidat Ausbildungsvertrag",
  links: [
    { id: 1, label: "Beranda", href: "/", category: "Navigasi" },
    { id: 2, label: "Program Kursus", href: "/layanan", category: "Navigasi" },
    { id: 3, label: "Tentang Kami", href: "/jakarta", category: "Navigasi" },
    { id: 4, label: "Kabar Terbaru", href: "/berita", category: "Informasi" },
    { id: 5, label: "Kisah Referensi", href: "/referensi", category: "Informasi" },
    { id: 6, label: "Hubungi WhatsApp", href: "https://wa.me/6282127324453", category: "Kontak" },
    { id: 7, label: "Portal Admin", href: "/login", category: "Kontak" },
  ],
  socialLinks: [
    { id: 1, platform: "WhatsApp", label: "082127324453", url: "https://wa.me/6282127324453" },
    { id: 2, platform: "Email", label: "ichliebedtschmedan@gmail.com", url: "mailto:ichliebedtschmedan@gmail.com" },
    { id: 3, platform: "Instagram", label: "@ichliebedeutschmedan", url: "https://instagram.com" },
  ],
};

export function PublicFooter() {
  const { data: cmsData } = useCmsSection("footer");
  const { language, t } = useLanguage();
  const footer = cmsData || defaultFooterData;

  const brandSubtitle = language !== "id" ? t("nav.brand_subtitle", footer.brandSubtitle) : footer.brandSubtitle;
  const tagline = language !== "id" ? t("footer.tagline", footer.tagline) : (footer.tagline || defaultFooterData.tagline);

  const categories = ["Navigasi", "Layanan", "Informasi"];

  return (
    <footer className="border-t border-[#173d3a]/15 bg-[#eef4f0] text-[#173d3a]">
      <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand Col */}
          <div>
            <Link href="/">
              <FooterLogo name={footer.brandName} subtitle={brandSubtitle} />
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-[#5b7871]">
              {tagline}
            </p>

            <div className="mt-6 space-y-2 text-xs text-[#526f68]">
              {footer.addressJakarta && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-[#d35f46] shrink-0" />
                  <span><strong>{language === "de" ? "Standort Medan:" : language === "en" ? "Medan Campus:" : "Lokasi Medan:"}</strong> {footer.addressJakarta}</span>
                </div>
              )}
              {footer.addressGermany && (
                <div className="flex items-start gap-2">
                  <Globe2 size={14} className="mt-0.5 text-[#3a8b79] shrink-0" />
                  <span><strong>{language === "de" ? "Deutschland:" : language === "en" ? "Germany:" : "Jerman:"}</strong> {footer.addressGermany}</span>
                </div>
              )}
              {footer.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#d35f46] shrink-0" />
                  <a href={`mailto:${footer.contactEmail}`} className="hover:text-[#d35f46] transition-colors">
                    {footer.contactEmail}
                  </a>
                </div>
              )}
              {footer.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#3a8b79] shrink-0" />
                  <a href={`tel:${footer.contactPhone}`} className="hover:text-[#d35f46] transition-colors">
                    {footer.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid gap-8 sm:grid-cols-3">
            {categories.map((cat) => {
              const catLinks = (footer.links || defaultFooterData.links).filter(
                (l: any) => (l.category || "Navigasi") === cat
              );
              return (
                <div key={cat}>
                  <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.16em] text-[#78938d] border-b border-[#173d3a]/10 pb-2">
                    {cat}
                  </p>
                  <ul className="mt-3.5 space-y-2.5">
                    {catLinks.map((link: any) => (
                      <li key={link.id || link.label}>
                        <Link
                          href={link.href}
                          className="font-mono-ui text-[11px] font-bold uppercase tracking-[0.08em] text-[#3d5d56] transition-colors hover:text-[#d35f46]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#173d3a]/15 pt-6 text-xs text-[#718d86] sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono-ui text-[10px] tracking-[0.08em]">
            {footer.copyright || defaultFooterData.copyright}
          </div>
          <div className="flex items-center gap-4">
            {(footer.socialLinks || defaultFooterData.socialLinks).map((soc: any) => (
              <a
                key={soc.id || soc.platform}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.1em] text-[#55756e] transition-colors hover:text-[#d35f46]"
              >
                {soc.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
