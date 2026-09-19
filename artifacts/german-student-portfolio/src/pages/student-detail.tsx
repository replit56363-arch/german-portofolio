import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "wouter";
import { ArrowLeft, CalendarDays, CheckCircle2, ExternalLink, FileText, Mail, MapPin, Pencil, Phone, Play, Trash2 } from "lucide-react";
import { getGetDashboardSummaryQueryKey, getGetStudentQueryKey, getListStudentsQueryKey, useDeleteStudent, useGetStudent } from "@workspace/api-client-react";
import { LevelBadge, SectionEyebrow, StatusPill, StudentAvatar, VideoButton } from "@/components/portfolio-ui";
import { ConfirmDialog } from "@/components/confirm-dialog";

const formatDate = (value?: string | null) => value ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "—";

export default function StudentDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { data: student, isLoading, isError, refetch } = useGetStudent(id, { query: { queryKey: getGetStudentQueryKey(id) } });
  const remove = useDeleteStudent();
  const deleteProfile = () => {
    if (!student) return;
    remove.mutate({ id }, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: getGetStudentQueryKey(id) });
        queryClient.invalidateQueries({ queryKey: getListStudentsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
        setLocation("/students");
      },
      onSettled: () => {
        setShowConfirmDelete(false);
      }
    });
  };
  if (isLoading) return <div className="space-y-6"><div className="h-8 w-48 rounded shimmer" /><div className="h-64 rounded-2xl shimmer" /><div className="h-72 rounded-2xl shimmer" /></div>;
  if (isError || !student) return <div className="mx-auto mt-12 max-w-md rounded-2xl border border-[#f1d0cb] bg-[#fff7f5] p-8 text-center"><SectionEyebrow>Portfolio tidak ditemukan</SectionEyebrow><h1 className="mt-3 text-xl font-bold text-[#3d4350]">Profil ini tidak tersedia.</h1><p className="mt-2 text-sm text-[#7d8794]">Mungkin sudah dihapus atau Anda tidak memiliki akses.</p><button type="button" onClick={() => refetch()} className="mt-5 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-sm font-bold text-white" data-testid="button-retry-student">Coba lagi</button></div>;
  return <div className="space-y-7">
    <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/students" className="inline-flex items-center gap-2 text-sm font-bold text-[#6e839a] hover:text-[#1b5a9f]" data-testid="link-back-students"><ArrowLeft size={16} />Kembali ke katalog</Link><div className="flex items-center gap-2"><Link href={`/admin/students/${student.id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-[#cbdce8] bg-white px-3.5 py-2.5 text-sm font-bold text-[#3c6281] hover:border-[#92bbcf] hover:bg-[#f2f9fb]" data-testid="link-edit-student"><Pencil size={15} />Edit profil</Link><button type="button" onClick={() => setShowConfirmDelete(true)} disabled={remove.isPending} className="inline-flex items-center justify-center rounded-xl border border-[#f1d5d1] bg-white p-2.5 text-[#b56158] hover:bg-[#fff5f3] disabled:opacity-60" aria-label="Hapus portofolio" data-testid="button-delete-student"><Trash2 size={16} /></button></div></div>
    {remove.isError && <div className="rounded-xl border border-[#f0cbc6] bg-[#fff6f4] px-4 py-3 text-sm font-semibold text-[#ae5b51]" data-testid="status-delete-error">Portofolio belum terhapus. Silakan coba lagi.</div>}
    <section className="relative overflow-hidden rounded-2xl border border-[#cfe2eb] bg-white p-6 soft-shadow sm:p-8"><div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_70%_25%,#dff5f8,transparent_60%)] opacity-80" /><div className="relative flex flex-col gap-6 sm:flex-row sm:items-center"><StudentAvatar student={student} size="lg" /><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><LevelBadge level={student.level} large /><StatusPill status={student.status} /></div><h1 className="mt-3 text-3xl font-bold tracking-[-.045em] text-[#213853]">{student.name}</h1><p className="mt-1 max-w-xl text-sm leading-6 text-[#6e8298]">{student.bio || "Belum ada bio singkat untuk siswa ini."}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#698098]"><span className="inline-flex items-center gap-1.5"><Mail size={14} className="text-[#5796b4]" />{student.email}</span>{student.phone && <span className="inline-flex items-center gap-1.5"><Phone size={14} className="text-[#5796b4]" />{student.phone}</span>}<span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-[#5796b4]" />Bergabung {formatDate(student.joinedAt)}</span></div></div></div></section>
    <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-2xl border border-[#dfe8f0] bg-white p-6 soft-shadow sm:p-7"><div className="flex items-center justify-between"><div><SectionEyebrow>Rekam jejak</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#263e5b]">Perjalanan level</h2></div><span className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-[#9aabba]">{student.cohort}</span></div><div className="mt-7 space-y-1">{student.levelHistory?.length ? student.levelHistory.map((history, index) => <div key={`${history.level}-${history.completedAt}-${index}`} className="relative flex gap-4 pb-6 last:pb-0"><div className="flex flex-col items-center"><div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${index === student.levelHistory.length - 1 ? "bg-[#d9f3f6] text-[#227b8f]" : "bg-[#eaf0f6] text-[#7590a7]"}`}><CheckCircle2 size={16} /></div>{index < student.levelHistory.length - 1 && <div className="h-full w-px bg-[#dbe7ef]" />}</div><div className="flex flex-1 items-start justify-between gap-4 pt-1"><div><p className="text-sm font-bold text-[#344e6b]">Level {history.level} selesai</p><p className="mt-1 text-xs text-[#8597aa]">{formatDate(history.completedAt)}</p></div>{history.score != null && <div className="rounded-lg bg-[#eff7fa] px-2.5 py-1 font-mono-ui text-xs font-bold text-[#307692]">{history.score} / 100</div>}</div></div>) : <p className="py-8 text-center text-sm text-[#8395a8]">Belum ada riwayat level yang tercatat.</p>}</div></section>
      <section className="rounded-2xl border border-[#dfe8f0] bg-white p-6 soft-shadow sm:p-7"><SectionEyebrow>Bukti kemampuan</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#263e5b]">Dokumen & media</h2><div className="mt-6 space-y-3">{student.certificateUrl ? <a href={student.certificateUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-[#dce8ef] p-3.5 transition-colors hover:border-[#9bcbd9] hover:bg-[#f5fbfc]" data-testid="link-certificate"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2fd] text-[#3170a9]"><FileText size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#3c5975]">{student.certificateName || "Sertifikat bahasa"}</p><p className="mt-0.5 text-[11px] text-[#8a9bad]">Buka dokumen</p></div><ExternalLink size={15} className="text-[#8ca9bd]" /></a> : <div className="rounded-xl border border-dashed border-[#d4e1eb] px-4 py-5 text-center text-xs text-[#8a9bad]">Sertifikat belum diunggah</div>}{student.speakingVideoUrl ? <VideoButton url={student.speakingVideoUrl} /> : <div className="flex items-center gap-2 rounded-xl bg-[#f5f8fa] px-3 py-3 text-xs font-medium text-[#8a9bad]"><Play size={14} />Video speaking belum tersedia</div>}</div></section>
    </div>
    <section className="rounded-2xl border border-[#dfe8f0] bg-white p-6 soft-shadow sm:p-7"><div className="flex items-center justify-between"><div><SectionEyebrow>Partner detail</SectionEyebrow><h2 className="mt-1 text-lg font-bold text-[#263e5b]">Penempatan</h2></div>{student.placement && <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.12em] text-[#5a839d]">Terverifikasi</span>}</div>{student.placement ? <div className="mt-6 grid gap-5 sm:grid-cols-3"><div><p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#8a9bad]">Program</p><p className="mt-1 text-sm font-bold text-[#36516e]">{student.placement.program}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#8a9bad]">Partner</p><p className="mt-1 text-sm font-bold text-[#36516e]">{student.placement.company || "Partner belum diisi"}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#8a9bad]">Lokasi & tanggal</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#36516e]"><MapPin size={14} className="text-[#4e98b2]" />{student.placement.country} · {formatDate(student.placement.placedAt)}</p></div></div> : <div className="mt-5 rounded-xl bg-[#f6f9fb] px-4 py-5 text-sm text-[#8294a8]">Belum ada penempatan. Siswa ini masih terbuka untuk matching partner.</div>}</section>

    {/* In-app safe deletion confirmation */}
    <ConfirmDialog
      isOpen={showConfirmDelete}
      title="Hapus Portofolio Siswa"
      description={`Hapus portofolio "${student.name}"? Data riwayat level dan penempatan akan dihapus dari sistem. Tindakan ini tidak dapat dibatalkan.`}
      confirmText="Hapus Portofolio"
      cancelText="Batal"
      variant="danger"
      isLoading={remove.isPending}
      onConfirm={deleteProfile}
      onCancel={() => setShowConfirmDelete(false)}
    />
  </div>;
}