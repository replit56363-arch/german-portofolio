import { Link } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return <main className="page-grid flex min-h-[100dvh] items-center justify-center bg-[#f4f8fc] px-6"><div className="max-w-md text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dff3f8] text-[#277997]"><Compass size={29} /></div><p className="mt-7 font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-[#648aa4]">Fehler 404</p><h1 className="mt-3 text-4xl font-bold tracking-[-.05em] text-[#233a57]">Halaman tidak ditemukan.</h1><p className="mt-3 text-sm leading-6 text-[#8092a7]">Alamat ini mungkin sudah dipindahkan atau belum tersedia di ruang kerja Anda.</p><Link href="/" className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1b5a9f] px-4 py-3 text-sm font-bold text-white hover:bg-[#154d8b]" data-testid="link-back-dashboard"><ArrowLeft size={16} />Kembali ke overview</Link></div></main>;
}
