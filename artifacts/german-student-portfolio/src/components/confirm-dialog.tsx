import { type ReactNode } from "react";
import { AlertTriangle, Info, Trash2, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: Trash2,
      iconBg: "bg-red-50 text-red-600 border border-red-200",
      btnBg: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200",
      btnBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-sm",
    },
    info: {
      icon: Info,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-200",
      btnBg: "bg-[#1b5a9f] hover:bg-[#154b85] text-white shadow-sm",
    },
  }[variant];

  const Icon = variantStyles.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 transform transition-all animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${variantStyles.iconBg}`}>
            <Icon size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#1f3752] tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-[#5d738a] leading-relaxed">{description}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#455b73] hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all disabled:opacity-60 ${variantStyles.btnBg}`}
          >
            {isLoading ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Memproses...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
