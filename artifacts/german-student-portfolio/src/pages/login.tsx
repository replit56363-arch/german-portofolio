import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useLogin, getGetCurrentAdminQueryKey } from "@workspace/api-client-react";
import { AppMark } from "@/components/app-shell";

export default function Login() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate({ data: { email, password } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCurrentAdminQueryKey() });
         setLocation("/dashboard");
      },
    });
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#142b4e] text-[#eef6fd]">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden px-7 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-[#3d6894]/35" /><div className="absolute -right-10 top-34 h-44 w-44 rounded-full border border-[#6fd5ee]/25" />
          <AppMark />
          <div className="relative my-16 max-w-xl lg:my-0">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#76d7ec]"><span className="h-px w-8 bg-[#76d7ec]" /> Private portfolio network</div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-.04em] text-[#f7fbff] sm:text-6xl">Bukti kesiapan,<br /><span className="text-[#6fd5ee]">lebih dekat.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#a9bfd8]">Ruang kerja untuk mengelola portofolio bahasa siswa dan menghubungkan talenta siap kerja dengan partner Jerman.</p>
            <div className="mt-12 grid max-w-md grid-cols-2 gap-4 border-t border-[#315276] pt-5"><div><p className="font-mono-ui text-xl font-bold text-[#f4bf68]">01</p><p className="mt-1 text-xs text-[#9ab1ce]">Satu profil lengkap</p></div><div><p className="font-mono-ui text-xl font-bold text-[#f4bf68]">04</p><p className="mt-1 text-xs text-[#9ab1ce]">Level terukur</p></div></div>
          </div>
          <p className="relative text-xs text-[#7895b7]">Lernpfad Portfolio Office · Akses khusus partner</p>
        </div>
        <div className="flex w-full items-center justify-center bg-[#f5f9fd] px-6 py-12 text-[#213550] sm:px-12 lg:w-[47%] lg:px-16">
          <div className="w-full max-w-[400px] rise-in">
            <div className="mb-9"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3f3f8] text-[#1a6990]"><ShieldCheck size={23} /></div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.18em] text-[#5f87a4]">Admin access</p><h2 className="mt-2 text-3xl font-bold tracking-[-.04em] text-[#1f3551]">Selamat datang kembali.</h2><p className="mt-2 text-sm text-[#7b8ea6]">Masuk untuk melanjutkan pekerjaan Anda.</p></div>
            <form className="space-y-5" onSubmit={submit}>
              <label className="block"><span className="mb-2 block text-xs font-bold text-[#4c6581]">Email admin</span><div className="relative"><Mail size={17} className="absolute left-3.5 top-3.5 text-[#8ca2b9]" /><input required autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@institut.de" className="h-12 w-full rounded-xl border border-[#ccdce9] bg-[#fbfdff] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#aab8c6] focus:border-[#3283b1] focus:ring-4 focus:ring-[#6fd5ee]/15" data-testid="input-email" /></div></label>
              <label className="block"><span className="mb-2 block text-xs font-bold text-[#4c6581]">Kata sandi</span><div className="relative"><LockKeyhole size={17} className="absolute left-3.5 top-3.5 text-[#8ca2b9]" /><input required autoComplete="current-password" minLength={1} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukkan kata sandi" className="h-12 w-full rounded-xl border border-[#ccdce9] bg-[#fbfdff] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#aab8c6] focus:border-[#3283b1] focus:ring-4 focus:ring-[#6fd5ee]/15" data-testid="input-password" /></div></label>
              {login.isError && <div className="rounded-xl border border-[#f2c8c4] bg-[#fff2f0] px-4 py-3 text-sm font-medium text-[#aa4e46]" data-testid="status-login-error">Email atau kata sandi tidak sesuai. Coba lagi.</div>}
              <button type="submit" disabled={login.isPending} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1b5a9f] text-sm font-bold text-white shadow-[0_8px_18px_rgba(27,90,159,.18)] transition-all hover:bg-[#154d8b] active:scale-[.99] disabled:cursor-wait disabled:opacity-70" data-testid="button-login">{login.isPending ? "Memeriksa akses…" : "Masuk ke portfolio"}<ArrowRight size={17} /></button>
            </form>
            <p className="mt-8 text-center text-[11px] leading-5 text-[#8a9caf]">Akses ini bersifat privat untuk tim Lernpfad<br />dan partner penempatan terverifikasi.</p>
            <Link href="/login" className="mt-6 block text-center text-xs font-semibold text-[#5d7994] hover:text-[#1b5a9f]" data-testid="link-login-home">Kembali ke halaman masuk</Link>
          </div>
        </div>
      </div>
    </main>
  );
}