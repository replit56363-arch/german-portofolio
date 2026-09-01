import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  /** Changing this clears a caught error. Pass the route to recover on navigation. */
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === 'string') {
    return new Error(value);
  }
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

function DefaultFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="page-grid flex min-h-[100dvh] w-full items-center justify-center bg-[#f4f8fc] p-6">
      <div className="w-full max-w-lg rounded-2xl border border-[#dfe8f0] bg-white p-8 text-center shadow-[0_16px_38px_rgba(28,75,126,.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1ec] text-[#bd6a5d]"><AlertTriangle size={24} /></div>
        <p className="mt-5 font-mono-ui text-[10px] font-bold uppercase tracking-[.17em] text-[#bd6a5d]">Gangguan sementara</p>
        <h1 className="mt-2 text-xl font-bold text-[#273d58]">Halaman ini mengalami kendala.</h1>
        <p className="mt-2 text-sm leading-6 text-[#7d8ea2]">Coba muat ulang bagian ini. Data portofolio Anda tetap aman.</p>
        {/* Dev only: messages can carry API responses and other internals. */}
        {import.meta.env.DEV ? (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-[#f3f6f9] p-3 text-left text-xs text-[#66788d]">
            {error.message || String(error)}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={resetError}
          className="mt-5 rounded-xl bg-[#1b5a9f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#154d8b]"
          data-testid="button-error-retry"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error(
      'ErrorBoundary caught an error:',
      toError(error),
      info.componentStack,
    );
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.error !== null &&
      prevProps.resetKey !== this.props.resetKey
    ) {
      this.resetError();
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) {
      return this.props.children;
    }
    const Fallback = this.props.FallbackComponent ?? DefaultFallback;
    return <Fallback error={error} resetError={this.resetError} />;
  }
}
