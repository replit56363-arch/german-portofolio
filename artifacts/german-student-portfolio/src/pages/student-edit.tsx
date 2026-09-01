import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { getGetStudentQueryKey, getListStudentsQueryKey, getGetDashboardSummaryQueryKey, useGetStudent, useUpdateStudent } from "@workspace/api-client-react";
import type { StudentInput } from "@workspace/api-client-react";
import { PortfolioForm, blankDraft, draftFromStudent, type PortfolioDraft } from "@/components/portfolio-form";
import { SectionEyebrow } from "@/components/portfolio-ui";

export default function StudentEdit() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: student, isLoading, isError, refetch } = useGetStudent(id, { query: { queryKey: getGetStudentQueryKey(id) } });
  const update = useUpdateStudent();
  const [initial, setInitial] = useState<PortfolioDraft>(blankDraft);
  useEffect(() => { if (student) setInitial(draftFromStudent(student)); }, [student]);
  const submit = (payload: StudentInput) => update.mutate({ id, data: payload }, { onSuccess: (saved) => { queryClient.setQueryData(getGetStudentQueryKey(id), saved); queryClient.invalidateQueries({ queryKey: getListStudentsQueryKey() }); queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() }); setLocation(`/students/${id}`); } });
  if (isLoading) return <div className="mx-auto max-w-[980px] space-y-5"><div className="h-12 w-64 rounded shimmer" /><div className="h-[600px] rounded-2xl shimmer" /></div>;
  if (isError || !student) return <div className="mx-auto max-w-md rounded-2xl border border-[#f1d0cb] bg-[#fff7f5] p-8 text-center"><SectionEyebrow>Portfolio tidak ditemukan</SectionEyebrow><p className="mt-3 text-sm text-[#7d8794]">Data siswa tidak dapat dimuat.</p><button type="button" onClick={() => refetch()} className="mt-5 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-sm font-bold text-white" data-testid="button-retry-student-edit">Coba lagi</button></div>;
  return <div className="mx-auto max-w-[980px] space-y-7"><div><SectionEyebrow>Administrasi siswa · {student.name}</SectionEyebrow><h1 className="mt-2 text-3xl font-bold tracking-[-.045em] text-[#213853]">Edit portofolio</h1><p className="mt-2 text-sm text-[#73869d]">Perbarui bukti terbaru dan detail penempatan siswa.</p></div>{update.isError && <div className="rounded-xl border border-[#f0cbc6] bg-[#fff6f4] px-4 py-3 text-sm font-semibold text-[#ae5b51]" data-testid="status-update-error">Perubahan belum tersimpan. Coba lagi.</div>}<PortfolioForm initial={initial} mode="edit" onSubmit={submit} isPending={update.isPending} onCancel={() => setLocation(`/students/${id}`)} /></div>;
}