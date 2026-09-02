import { type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle2, Clock3, FileCheck2, Play, UserRound } from "lucide-react";
import type { Student, StudentLevel, StudentStatus } from "@workspace/api-client-react";

export const statusLabel: Record<StudentStatus, string> = { training: "Dalam pelatihan", ready: "Siap ditempatkan", placed: "Sudah ditempatkan" };
export const levelLabel: Record<StudentLevel, string> = { A1: "Pemula", A2: "Dasar", B1: "Menengah", B2: "Mandiri" };

export function StatusPill({ status }: { status: StudentStatus }) {
  const styles = { training: "bg-[#fff5df] text-[#92601c] ring-[#f4dba9]", ready: "bg-[#e1f7f2] text-[#19725e] ring-[#b8e8dc]", placed: "bg-[#e5effd] text-[#245793] ring-[#c6dcf5]" };
  const Icon = status === "training" ? Clock3 : status === "ready" ? CheckCircle2 : FileCheck2;
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${styles[status]}`} data-testid={`status-student-${status}`}><Icon size={13} />{statusLabel[status]}</span>;
}

export function LevelBadge({ level, large = false }: { level: StudentLevel; large?: boolean }) {
  return <span className={`inline-flex items-center rounded-md border border-[#b9d8ea] bg-[#edf7fb] font-mono-ui font-bold text-[#21638d] ${large ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-[10px]"}`} data-testid={`badge-level-${level}`}>{level}</span>;
}

export function StudentAvatar({ student, size = "md" }: { student: Pick<Student, "name" | "initials" | "photoUrl">; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-9 w-9 text-[11px]", md: "h-11 w-11 text-xs", lg: "h-[76px] w-[76px] text-xl" };
  return student.photoUrl
    ? <img src={student.photoUrl} alt={student.name} className={`${sizes[size]} rounded-2xl object-cover ring-4 ring-[#e9f4f8]`} data-testid={`img-avatar-${student.name}`} />
    : <div className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-2xl bg-[#d9eff6] font-bold text-[#21638d] ring-4 ring-[#e9f4f8]`} data-testid={`img-avatar-${student.name}`}>{student.initials}</div>;
}

export function StudentRow({ student }: { student: Student }) {
  return (
    <Link href={`/students/${student.id}`} className="group flex flex-col gap-2 sm:grid sm:grid-cols-[minmax(200px,1.6fr)_100px_150px_115px_28px] items-start sm:items-center sm:gap-4 border-b border-[#e8eef4] px-4 py-3.5 sm:px-6 transition-colors last:border-0 hover:bg-[#f7fbfd]" data-testid={`row-student-${student.id}`}>
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
        <div className="flex min-w-0 items-center gap-3">
          <StudentAvatar student={student} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#263b57] group-hover:text-[#1458a7]" data-testid={`text-student-name-${student.id}`}>{student.name}</p>
            <p className="truncate text-xs text-[#8597ac]">{student.email}</p>
          </div>
        </div>
        <ArrowUpRight size={17} className="text-[#a4b7c9] shrink-0 sm:hidden group-hover:text-[#1463b3]" />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:hidden">
        <LevelBadge level={student.level} />
        <StatusPill status={student.status} />
        <span className="text-xs font-medium text-[#788ca2]">· {student.cohort}</span>
      </div>
      <div className="hidden sm:block"><LevelBadge level={student.level} /></div>
      <div className="hidden text-xs font-medium text-[#5c7088] sm:block">{student.cohort}</div>
      <div className="hidden sm:block"><StatusPill status={student.status} /></div>
      <ArrowUpRight size={17} className="hidden text-[#a4b7c9] transition-transform sm:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1463b3]" />
    </Link>
  );
}

export function LoadingRows({ count = 5 }: { count?: number }) {
  return <div className="divide-y divide-[#e8eef4]">{Array.from({ length: count }).map((_, index) => <div key={index} className="flex items-center gap-3 px-6 py-4"><div className="h-10 w-10 rounded-xl shimmer" /><div className="flex-1 space-y-2"><div className="h-3 w-36 rounded shimmer" /><div className="h-2.5 w-24 rounded shimmer" /></div><div className="hidden h-6 w-16 rounded shimmer sm:block" /></div>)}</div>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f8] text-[#297b9b]"><UserRound size={24} /></div><h3 className="text-base font-bold text-[#2b405d]">{title}</h3><p className="mt-1 max-w-sm text-sm leading-6 text-[#8293a8]">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-[#51809e]">{children}</p>;
}

export function VideoButton({ url }: { url: string }) {
  return <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#e6f6fa] px-3 py-2 text-xs font-bold text-[#1f6b8d] transition-colors hover:bg-[#d3eef5]" data-testid="link-speaking-video"><Play size={14} fill="currentColor" /> Dengarkan speaking</a>;
}