import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  X,
  ArrowUpRight,
  Sparkles,
  Check,
  Copy,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export const CONTACT_INFO = {
  name: "ICH LIEBE DEUTSCH MEDAN",
  phoneDisplay: "082127324453",
  phoneRaw: "082127324453",
  whatsappUrl: "https://wa.me/6282127324453?text=Halo%20ICH%20LIEBE%20DEUTSCH%20MEDAN,%20saya%20ingin%20konsultasi%20program%20kursus%20bahasa%20Jerman",
  email: "ichliebedtschmedan@gmail.com",
  address: "Jl. Ternak II No. 39, Medan Polonia, Kota Medan, Sumatera Utara",
  operatingHours: "Senin – Sabtu: 08:30 – 17:00 WIB",
};

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { language } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const labels = {
    chatWa: language === "de" ? "Per WhatsApp schreiben" : language === "en" ? "Chat on WhatsApp" : "Chat via WhatsApp",
    callUs: language === "de" ? "Direkt anrufen" : language === "en" ? "Call Directly" : "Telepon Langsung",
    emailUs: language === "de" ? "E-Mail senden" : language === "en" ? "Send an Email" : "Kirim Email",
    officeLoc: language === "de" ? "Standort & Adresse" : language === "en" ? "Office Address" : "Alamat Resmi Lembaga",
    quickHelp: language === "de" ? "Schnelle Beratung" : language === "en" ? "Quick Consultation" : "Konsultasi & Informasi",
    statusText: language === "de" ? "Online · Antwortet schnell" : language === "en" ? "Online · Quick Response" : "Online · Respon Cepat",
    tooltip: language === "de" ? "WhatsApp Beratung: 082127324453" : language === "en" ? "WhatsApp Contact: 082127324453" : "Hubungi Kami via WhatsApp: 082127324453",
    tagline: language === "de" ? "Lembaga Kursus Bahasa Jerman Resmi" : language === "en" ? "Registered German Language Institute" : "Lembaga Kursus Bahasa Jerman Terdaftar",
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden"
    >
      {/* Popover Contact Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Kontak ICH LIEBE DEUTSCH MEDAN"
          className="mb-3 w-[92vw] max-w-[360px] overflow-hidden rounded-2xl border-2 border-[#173d3a] bg-[#fffaf2] shadow-[7px_7px_0_#173d3a] animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header Card */}
          <div className="bg-[#173d3a] p-4 text-[#fff8ee]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#25d366] text-white shadow-sm">
                  <MessageCircle size={22} className="fill-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#173d3a]" />
                  </span>
                </div>
                <div>
                  <h3 className="font-['Fraunces'] text-base font-semibold leading-tight text-[#fff8ee]">
                    {CONTACT_INFO.name}
                  </h3>
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.14em] text-[#a9d5c8]">
                    {labels.tagline}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup panel kontak"
                className="rounded-lg p-1 text-[#a9d5c8] hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-black/20 px-2.5 py-1 text-[11px] text-[#f4c76b]">
              <Sparkles size={12} className="shrink-0" />
              <span>{labels.statusText}</span>
            </div>
          </div>

          {/* Body Options */}
          <div className="p-4 space-y-2.5">
            {/* WhatsApp Direct */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-[#25d366]/40 bg-[#e8f8ee] p-3 text-[#0d4d23] transition-all hover:-translate-y-0.5 hover:border-[#25d366] hover:bg-[#d5f3df] hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25d366] text-white">
                  <MessageCircle size={18} className="fill-white" />
                </div>
                <div>
                  <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#1b7a3a]">
                    {labels.chatWa}
                  </div>
                  <div className="text-sm font-bold text-[#0d4d23]">
                    {CONTACT_INFO.phoneDisplay}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[#1b7a3a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="group flex items-center justify-between rounded-xl border border-[#173d3a]/15 bg-white p-3 text-[#173d3a] transition-all hover:-translate-y-0.5 hover:border-[#d35f46] hover:bg-[#fff9f6] hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5eee3] text-[#d35f46]">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#718b84]">
                    {labels.callUs}
                  </div>
                  <div className="text-sm font-bold text-[#173d3a]">
                    {CONTACT_INFO.phoneDisplay}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[#718b84] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}?subject=Konsultasi%20Program%20ICH%20LIEBE%20DEUTSCH%20MEDAN`}
              className="group flex items-center justify-between rounded-xl border border-[#173d3a]/15 bg-white p-3 text-[#173d3a] transition-all hover:-translate-y-0.5 hover:border-[#d35f46] hover:bg-[#fff9f6] hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5eee3] text-[#315c54]">
                  <Mail size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.12em] text-[#718b84]">
                    {labels.emailUs}
                  </div>
                  <div className="text-xs font-bold text-[#173d3a] truncate">
                    {CONTACT_INFO.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-[#718b84] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Address Box */}
            <div className="rounded-xl border border-[#173d3a]/15 bg-[#f0f5f2] p-3 text-[#173d3a]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 text-[#d35f46] shrink-0" />
                  <div>
                    <div className="font-mono-ui text-[9px] font-bold uppercase tracking-[0.14em] text-[#55736b]">
                      {labels.officeLoc}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#173d3a] font-medium">
                      {CONTACT_INFO.address}
                    </p>
                    <p className="mt-1 text-[10px] text-[#6b867e]">
                      {CONTACT_INFO.operatingHours}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(CONTACT_INFO.address, "alamat")}
                  aria-label="Salin alamat"
                  className="rounded-lg p-1 text-[#6b867e] hover:bg-white hover:text-[#173d3a] transition-colors"
                >
                  {copied === "alamat" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#173d3a]/20 bg-white/95 px-3.5 py-2 font-mono-ui text-[11px] font-bold text-[#173d3a] shadow-[0_4px_12px_rgba(23,61,58,0.15)] transition-all hover:bg-white hover:text-[#d35f46] hover:shadow-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>WhatsApp: {CONTACT_INFO.phoneDisplay}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={labels.tooltip}
          title={labels.tooltip}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#173d3a] bg-[#25d366] text-white shadow-[4px_5px_0_#173d3a] transition-all hover:-translate-y-1 hover:bg-[#20ba5a] hover:shadow-[6px_7px_0_#173d3a] active:translate-y-0 active:shadow-[2px_2px_0_#173d3a] focus:outline-none"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 border-2 border-white" />
          </span>
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <MessageCircle size={28} className="fill-white text-white transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>
    </div>
  );
}
