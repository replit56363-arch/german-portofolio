import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  Check,
  RefreshCw,
  Eye,
  X,
  Link as LinkIcon,
  HardDrive,
} from "lucide-react";

export interface ImageUploaderProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: "square" | "video" | "banner" | "circle" | "auto";
  maxDimension?: number;
  quality?: number;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * Helper to compress and convert image file to optimized base64 DataURL
 */
function compressImage(file: File, maxDim = 1200, quality = 0.86): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG, read as text/dataURL directly
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL("image/webp", quality);
          if (!dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
        } catch {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({
  id = "image-uploader",
  label = "Upload Gambar",
  value = "",
  onChange,
  aspectRatio = "auto",
  maxDimension = 1200,
  quality = 0.86,
  helpText,
  placeholder = "https://...",
  required = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputMode, setInputMode] = useState<"upload" | "url">("upload");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Format berkas harus berupa gambar (JPG, PNG, WEBP, GIF, SVG).");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("Ukuran berkas maksimal 15 MB.");
      return;
    }

    setErrorMessage("");
    setIsProcessing(true);

    try {
      const originalSizeKb = Math.round(file.size / 1024);
      const dataUrl = await compressImage(file, maxDimension, quality);
      const compressedSizeKb = Math.round((dataUrl.length * 0.75) / 1024);

      setFileInfo(`${file.name} (${compressedSizeKb} KB${originalSizeKb > compressedSizeKb ? ` · dikompresi dari ${originalSizeKb} KB` : ""})`);
      onChange(dataUrl);
    } catch (err) {
      setErrorMessage("Gagal memproses berkas gambar.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
    // reset input value so re-selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    setFileInfo(null);
    setErrorMessage("");
  };

  const aspectClass = {
    square: "aspect-square max-w-[200px]",
    circle: "aspect-square w-36 rounded-full overflow-hidden",
    video: "aspect-video w-full",
    banner: "aspect-[2.4/1] w-full",
    auto: "max-h-64 w-auto object-contain",
  }[aspectRatio];

  return (
    <div id={`${id}-wrapper`} className="w-full space-y-2">
      {/* Label and mode toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="block text-xs font-bold text-[#344d67]">
          {label} {required && <span className="text-[#d35f46]">*</span>}
        </label>
        <div className="inline-flex rounded-lg border border-[#cfdce7] bg-[#edf3f8] p-0.5 text-[11px] font-semibold text-[#516f8a]">
          <button
            type="button"
            onClick={() => setInputMode("upload")}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors ${
              inputMode === "upload" ? "bg-white text-[#1b5a9f] shadow-xs" : "hover:text-[#213853]"
            }`}
            id={`${id}-tab-device`}
          >
            <HardDrive size={12} /> Dari Perangkat
          </button>
          <button
            type="button"
            onClick={() => setInputMode("url")}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors ${
              inputMode === "url" ? "bg-white text-[#1b5a9f] shadow-xs" : "hover:text-[#213853]"
            }`}
            id={`${id}-tab-url`}
          >
            <LinkIcon size={12} /> Tautan URL
          </button>
        </div>
      </div>

      {/* Main Container */}
      {value ? (
        /* Image Preview Box */
        <div
          id={`${id}-preview-box`}
          className="relative overflow-hidden rounded-xl border border-[#cbdbe7] bg-[#f8fbfe] p-3 shadow-xs transition-all"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Visual Thumbnail */}
            <div
              className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-[#cbdbe7] bg-[#eef4f9] ${
                aspectRatio === "circle" ? "h-24 w-24 rounded-full" : "h-28 w-36 shrink-0"
              }`}
            >
              <img
                src={value}
                alt="Pratinjau gambar"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            {/* Info and Actions */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1f3f5e]">
                <Check size={14} className="text-emerald-600" />
                <span>Gambar Tersedia</span>
              </div>
              {fileInfo && <p className="text-[11px] text-[#607e9a] break-all">{fileInfo}</p>}
              {!fileInfo && value.startsWith("http") && (
                <p className="line-clamp-1 text-[11px] text-[#607e9a] font-mono break-all">{value}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbdbe7] bg-white px-3 py-1.5 text-xs font-semibold text-[#294c6e] shadow-xs hover:bg-[#edf3f8]"
                  id={`${id}-btn-change`}
                >
                  <RefreshCw size={13} /> Ganti Gambar
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbdbe7] bg-white px-3 py-1.5 text-xs font-semibold text-[#294c6e] shadow-xs hover:bg-[#edf3f8]"
                  id={`${id}-btn-preview`}
                >
                  <Eye size={13} /> Lihat Besar
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#f4c8c2] bg-[#fff5f3] px-3 py-1.5 text-xs font-semibold text-[#ba4d3d] hover:bg-[#fde8e5]"
                  id={`${id}-btn-remove`}
                >
                  <Trash2 size={13} /> Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : inputMode === "upload" ? (
        /* Drag and Drop Zone */
        <div
          id={`${id}-dropzone`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
            isDragging
              ? "border-[#1b5a9f] bg-[#e8f2fc] ring-4 ring-[#1b5a9f]/15"
              : "border-[#b8d1e6] bg-[#fafcfe] hover:border-[#1b5a9f] hover:bg-[#f2f7fc]"
          }`}
        >
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#edf4fb] text-[#1b5a9f] transition-transform group-hover:scale-105">
            {isProcessing ? (
              <RefreshCw size={22} className="animate-spin text-[#1b5a9f]" />
            ) : (
              <Upload size={22} />
            )}
          </div>

          <p className="text-sm font-bold text-[#203f5d]">
            {isProcessing
              ? "Memproses gambar…"
              : isDragging
              ? "Lepaskan berkas di sini"
              : "Tarik & Lepas gambar atau Klik untuk Memilih"}
          </p>
          <p className="mt-1 text-xs text-[#6e8ca7]">
            Mendukung file JPG, PNG, WEBP, atau GIF dari perangkat Anda (Maks. 15MB)
          </p>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#1b5a9f] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#144780]"
          >
            <ImageIcon size={14} /> Pilih dari Perangkat
          </button>
        </div>
      ) : (
        /* URL Input Option */
        <div id={`${id}-url-box`} className="space-y-1.5">
          <div className="relative">
            <input
              type="url"
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="field-input text-xs"
            />
          </div>
          <p className="text-[11px] text-[#718da6]">
            Salin tautan gambar langsung dari internet (Unsplash, CDN, atau situs web lain).
          </p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        id={`${id}-file-input`}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error Message */}
      {errorMessage && (
        <p className="text-xs font-semibold text-[#ba4d3d]">{errorMessage}</p>
      )}

      {/* Help text */}
      {helpText && !errorMessage && (
        <p className="text-[11px] text-[#7893ab]">{helpText}</p>
      )}

      {/* Full Preview Modal */}
      {previewOpen && value && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black"
              aria-label="Tutup pratinjau"
            >
              <X size={16} />
            </button>
            <img
              src={value}
              alt="Pratinjau layar penuh"
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
