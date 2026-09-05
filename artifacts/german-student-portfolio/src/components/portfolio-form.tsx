import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check, LoaderCircle, User, Award } from "lucide-react";
import type { PlacementProgram, Student, StudentInputLevel, StudentInputStatus, StudentInput } from "@workspace/api-client-react";
import { LevelBadge, SectionEyebrow } from "@/components/portfolio-ui";
import { ImageUploader } from "@/components/image-uploader";

export type PortfolioDraft = {
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  level: StudentInputLevel;
  status: StudentInputStatus;
  cohort: string;
  joinedAt: string;
  bio: string;
  speakingVideoUrl: string;
  certificateName: string;
  certificateUrl: string;
  hasPlacement: boolean;
  country: string;
  program: PlacementProgram;
  company: string;
  placedAt: string;
};

export const blankDraft: PortfolioDraft = {
  name: "",
  email: "",
  phone: "",
  photoUrl: "",
  level: "A1",
  status: "training",
  cohort: "",
  joinedAt: new Date().toISOString().slice(0, 10),
  bio: "",
  speakingVideoUrl: "",
  certificateName: "",
  certificateUrl: "",
  hasPlacement: false,
  country: "Jerman",
  program: "Ausbildung",
  company: "",
  placedAt: new Date().toISOString().slice(0, 10),
};

export function draftFromStudent(student: Student): PortfolioDraft {
  return {
    name: student.name,
    email: student.email,
    phone: student.phone || "",
    photoUrl: student.photoUrl || "",
    level: student.level,
    status: student.status,
    cohort: student.cohort,
    joinedAt: student.joinedAt.slice(0, 10),
    bio: student.bio || "",
    speakingVideoUrl: student.speakingVideoUrl || "",
    certificateName: student.certificateName || "",
    certificateUrl: student.certificateUrl || "",
    hasPlacement: Boolean(student.placement),
    country: student.placement?.country || "Jerman",
    program: student.placement?.program || "Ausbildung",
    company: student.placement?.company || "",
    placedAt: student.placement?.placedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  };
}

export function PortfolioForm({
  initial = blankDraft,
  mode,
  onSubmit,
  isPending,
  onCancel,
}: {
  initial?: PortfolioDraft;
  mode: "create" | "edit";
  onSubmit: (payload: StudentInput) => void;
  isPending: boolean;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<PortfolioDraft>(initial);

  useEffect(() => {
    setDraft(initial);
  }, [initial]);

  const update = (key: keyof PortfolioDraft, value: string | boolean) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: StudentInput = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim() || undefined,
      photoUrl: draft.photoUrl.trim() || undefined,
      level: draft.level,
      status: draft.status,
      cohort: draft.cohort.trim(),
      joinedAt: draft.joinedAt,
      bio: draft.bio.trim() || undefined,
      speakingVideoUrl: draft.speakingVideoUrl.trim() || undefined,
      certificateName: draft.certificateName.trim() || undefined,
      certificateUrl: draft.certificateUrl.trim() || undefined,
      ...(draft.hasPlacement
        ? {
            placement: {
              country: draft.country.trim(),
              program: draft.program,
              company: draft.company.trim() || undefined,
              placedAt: draft.placedAt,
            },
          }
        : {}),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      {/* 01 · Identitas */}
      <section className="rounded-2xl border border-[#dfe8f0] bg-white p-5 soft-shadow sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <SectionEyebrow>01 · Identitas</SectionEyebrow>
            <h2 className="mt-1 text-lg font-bold text-[#263e5b]">Profil siswa</h2>
            <p className="mt-1 text-xs text-[#8193a7]">Informasi dasar dan foto profil yang dapat dilihat oleh calon partner.</p>
          </div>
          <LevelBadge level={draft.level} large />
        </div>

        {/* Foto Profil Upload dari Device */}
        <div className="mb-6 rounded-xl border border-[#e4edf5] bg-[#fbfdff] p-4 sm:p-5">
          <ImageUploader
            id="student-photo-uploader"
            label="Foto Profil Siswa"
            value={draft.photoUrl}
            onChange={(url) => update("photoUrl", url)}
            aspectRatio="circle"
            maxDimension={800}
            helpText="Pilih atau tarik foto profil siswa dari perangkat komputer atau ponsel Anda. Gambar akan otomatis dioptimalkan."
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nama lengkap" required>
            <input
              required
              minLength={2}
              value={draft.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Contoh: Nadya Putri"
              className="field-input"
              data-testid="input-student-name"
            />
          </Field>
          <Field label="Email" required>
            <input
              required
              type="email"
              value={draft.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="nadya@email.com"
              className="field-input"
              data-testid="input-student-email"
            />
          </Field>
          <Field label="Nomor telepon">
            <input
              value={draft.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="+62 812…"
              className="field-input"
              data-testid="input-student-phone"
            />
          </Field>
          <Field label="Cohort / kelas" required>
            <input
              required
              value={draft.cohort}
              onChange={(event) => update("cohort", event.target.value)}
              placeholder="Cohort 2024 · Intensif B1"
              className="field-input"
              data-testid="input-student-cohort"
            />
          </Field>
          <Field label="Tanggal bergabung" required>
            <input
              required
              type="date"
              value={draft.joinedAt}
              onChange={(event) => update("joinedAt", event.target.value)}
              className="field-input"
              data-testid="input-student-joined"
            />
          </Field>
        </div>

        <Field label="Bio singkat">
          <textarea
            value={draft.bio}
            onChange={(event) => update("bio", event.target.value)}
            placeholder="Ceritakan fokus, pengalaman, atau motivasi siswa…"
            className="field-input mt-5 min-h-[100px] resize-y py-3"
            data-testid="input-student-bio"
          />
        </Field>
      </section>

      {/* 02 · Kesiapan */}
      <section className="rounded-2xl border border-[#dfe8f0] bg-white p-5 soft-shadow sm:p-7">
        <div className="mb-6">
          <SectionEyebrow>02 · Kesiapan</SectionEyebrow>
          <h2 className="mt-1 text-lg font-bold text-[#263e5b]">Status dan bukti sertifikat</h2>
          <p className="mt-1 text-xs text-[#8193a7]">Tingkat kemahiran bahasa Jerman dan lampiran dokumen sertifikat.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Level saat ini" required>
            <select
              required
              value={draft.level}
              onChange={(event) => update("level", event.target.value)}
              className="field-input"
              data-testid="select-student-level"
            >
              <option value="A1">A1 · Pemula</option>
              <option value="A2">A2 · Dasar</option>
              <option value="B1">B1 · Menengah</option>
              <option value="B2">B2 · Mandiri</option>
            </select>
          </Field>
          <Field label="Status portfolio" required>
            <select
              required
              value={draft.status}
              onChange={(event) => update("status", event.target.value)}
              className="field-input"
              data-testid="select-student-status"
            >
              <option value="training">Dalam pelatihan</option>
              <option value="ready">Siap ditempatkan</option>
              <option value="placed">Sudah ditempatkan</option>
            </select>
          </Field>
          <Field label="Nama sertifikat">
            <input
              value={draft.certificateName}
              onChange={(event) => update("certificateName", event.target.value)}
              placeholder="Goethe-Zertifikat B1"
              className="field-input"
              data-testid="input-certificate-name"
            />
          </Field>
          <Field label="URL video speaking">
            <input
              type="url"
              value={draft.speakingVideoUrl}
              onChange={(event) => update("speakingVideoUrl", event.target.value)}
              placeholder="https://youtube.com/..."
              className="field-input"
              data-testid="input-speaking-video"
            />
          </Field>
        </div>

        {/* Dokumen / Gambar Sertifikat Upload dari Device */}
        <div className="mt-6 rounded-xl border border-[#e4edf5] bg-[#fbfdff] p-4 sm:p-5">
          <ImageUploader
            id="certificate-uploader"
            label="Bukti / Foto Sertifikat Bahasa"
            value={draft.certificateUrl}
            onChange={(url) => update("certificateUrl", url)}
            aspectRatio="banner"
            maxDimension={1600}
            helpText="Unggah scan atau foto sertifikat bahasa (Goethe/ECL/ÖSD) langsung dari perangkat Anda."
            placeholder="https://..."
          />
        </div>
      </section>

      {/* 03 · Penempatan */}
      <section className="rounded-2xl border border-[#dfe8f0] bg-white p-5 soft-shadow sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <SectionEyebrow>03 · Penempatan</SectionEyebrow>
            <h2 className="mt-1 text-lg font-bold text-[#263e5b]">Detail partner</h2>
            <p className="mt-1 text-xs text-[#8193a7]">Isi jika siswa sudah memiliki penempatan di Jerman.</p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-[#52708c]">
            <input
              type="checkbox"
              checked={draft.hasPlacement}
              onChange={(event) => update("hasPlacement", event.target.checked)}
              className="h-4 w-4 accent-[#1b5a9f]"
              data-testid="checkbox-placement"
            />
            Ada penempatan
          </label>
        </div>

        {draft.hasPlacement && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Negara" required>
              <input
                required
                value={draft.country}
                onChange={(event) => update("country", event.target.value)}
                className="field-input"
                data-testid="input-placement-country"
              />
            </Field>
            <Field label="Program" required>
              <select
                required
                value={draft.program}
                onChange={(event) => update("program", event.target.value)}
                className="field-input"
                data-testid="select-placement-program"
              >
                <option value="Ausbildung">Ausbildung</option>
                <option value="Arbeit">Arbeit</option>
                <option value="Praktikum">Praktikum</option>
              </select>
            </Field>
            <Field label="Nama perusahaan">
              <input
                value={draft.company}
                onChange={(event) => update("company", event.target.value)}
                placeholder="Nama partner / rumah sakit / hotel"
                className="field-input"
                data-testid="input-placement-company"
              />
            </Field>
            <Field label="Tanggal penempatan" required>
              <input
                required
                type="date"
                value={draft.placedAt}
                onChange={(event) => update("placedAt", event.target.value)}
                className="field-input"
                data-testid="input-placement-date"
              />
            </Field>
          </div>
        )}
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#dfe8f0] pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-[#71869d] hover:bg-[#edf4f8] hover:text-[#315a79]"
          data-testid="button-cancel-form"
        >
          <ArrowLeft size={16} /> Batal
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1b5a9f] px-5 text-sm font-bold text-white shadow-[0_8px_16px_rgba(27,90,159,.15)] hover:bg-[#154d8b] disabled:opacity-60"
          data-testid="button-submit-portfolio"
        >
          {isPending ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Menyimpan…
            </>
          ) : (
            <>
              <Check size={16} />
              {mode === "create" ? "Simpan portofolio" : "Simpan perubahan"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[.08em] text-[#748aa1]">
        {label}
        {required && <span className="ml-1 text-[#2f81a0]">*</span>}
      </span>
      {children}
    </label>
  );
}