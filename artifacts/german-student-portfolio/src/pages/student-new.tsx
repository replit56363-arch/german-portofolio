import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useCreateStudent, getListStudentsQueryKey, getGetDashboardSummaryQueryKey } from "@workspace/api-client-react";
import type { StudentInput } from "@workspace/api-client-react";
import { PortfolioForm, blankDraft } from "@/components/portfolio-form";
import { SectionEyebrow } from "@/components/portfolio-ui";

export default function StudentNew() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const create = useCreateStudent();
  const submit = (payload: StudentInput) => create.mutate({ data: payload }, { onSuccess: (student) => { queryClient.invalidateQueries({ queryKey: getListStudentsQueryKey() }); queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() }); setLocation(`/students/${student.id}`); } });
  return <div className="mx-auto max-w-[980px] space-y-7"><div><SectionEyebrow>Administrasi siswa</SectionEyebrow><h1 className="mt-2 text-3xl font-bold tracking-[-.045em] text-[#213853]">Buat portofolio baru</h1><p className="mt-2 text-sm text-[#73869d]">Kumpulkan identitas, bukti bahasa, dan konteks penempatan dalam satu profil.</p></div>{create.isError && <div className="rounded-xl border border-[#f0cbc6] bg-[#fff6f4] px-4 py-3 text-sm font-semibold text-[#ae5b51]" data-testid="status-create-error">Portofolio belum tersimpan. Periksa data lalu coba kembali.</div>}<PortfolioForm initial={blankDraft} mode="create" onSubmit={submit} isPending={create.isPending} onCancel={() => setLocation("/students")} /></div>;
}