import { Link } from "wouter";
import { useCmsSection } from "@/lib/use-cms";
import { Globe2, Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";

function FooterLogo({ name, subtitle }: { name?: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 text-[#173d3a]">
      <div className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-[#173d3a] bg-[#f5eee3]">
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

const defaultFooterData = {
  brandName: "Lernpfad",
  brandSubtitle: "Indonesia · Deutschland",
  tagline: "Membuka jalan yang lebih manusiawi antara talenta Indonesia dan dunia kerja Jerman.",
  copyright: "© 2024–2026 Lernpfad. Hak cipta dilindungi undang-undang.",
  contactEmail: "kontakt@aulid.de",
  contactPhone: "+62 823 1249 5802",
  addressJakarta: "Grand Sahid Jaya Jakarta, Jl. M.H. Thamrin No. 12, Jakarta Pusat",
  addressGermany: "Trinumer Weg 4, OT Großpaschleben, 06386 Osternienburger Land",
  links: [
    { id: 1, label: "Beranda", href: "/", category: "Navigasi" },
    { id: 2, label: "Kabar terkini", href: "/berita", category: "Navigasi" },
    { id: 3, label: "Liputan media", href: "/media", category: "Navigasi" },
    { id: 4, label: "Layanan partner", href: "/layanan", category: "Layanan" },
    { id: 5, label: "Kantor Jakarta", href: "/jakarta", category: "Layanan" },
    { id: 6, label: "Permintaan partner", href: "/ag-anfrage", category: "Layanan" },
    { id: 7, label: "Kisah referensi", href: "/referensi", category: "Informasi" },
    { id: 8, label: "Penempatan berhasil", href: "/penempatan-berhasil", category: "Informasi" },
    { id: 9, label: "Portal Admin", href: "/login", category: "Informasi" },
  ],
  socialLinks: [
    { id: 1, platform: "Instagram", label: "@lernpfad.id", url: "https://instagram.com" },
    { id: 2, platform: "LinkedIn", label: "Lernpfad Talent Bridge", url: "https://linkedin.com" },
    { id: 3, platform: "YouTube", label: "Lernpfad Channel", url: "https://youtube.com" },
  ],
};

export function PublicFooter() {
  const { data: cmsData } = useCmsSection("footer");
  const footer = cmsData || defaultFooterData;

  const categories = ["Navigasi", "Layanan", "Informasi"];

  return (
    <footer className="border-t border-[#173d3a]/15 bg-[#eef4f0] text-[#173d3a]">
      <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand Col */}
          <div>
            <Link href="/">
              <FooterLogo name={footer.brandName} subtitle={footer.brandSubtitle} />
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-[#5b7871]">
              {footer.tagline || defaultFooterData.tagline}
            </p>

            <div className="mt-6 space-y-2 text-xs text-[#526f68]">
              {footer.addressJakarta && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-[#d35f46] shrink-0" />
                  <span><strong>Jakarta:</strong> {footer.addressJakarta}</span>
                </div>
              )}
              {footer.addressGermany && (
                <div className="flex items-start gap-2">
                  <Globe2 size={14} className="mt-0.5 text-[#3a8b79] shrink-0" />
                  <span><strong>Jerman:</strong> {footer.addressGermany}</span>
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
