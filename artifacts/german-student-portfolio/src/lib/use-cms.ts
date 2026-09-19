import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type CmsSectionName =
  | "navbar"
  | "footer"
  | "home"
  | "news"
  | "media"
  | "services"
  | "jakarta"
  | "references"
  | "placements"
  | "partner"
  | "alumni"
  | "classrooms";

export const CMS_QUERY_KEY = ["/api/cms"];
export const getCmsSectionQueryKey = (section: string) => ["/api/cms", section];

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  try {
    const token = localStorage.getItem("admin_session_token");
    if (token && token !== "null" && token !== "undefined" && token.trim() !== "") {
      const cleanToken = token.trim().replace(/^["']|["']$/g, "");
      headers["Authorization"] = `Bearer ${cleanToken}`;
      headers["x-session-id"] = cleanToken;
      headers["x-auth-token"] = cleanToken;
    }
  } catch {}
  return headers;
}

function handleFetchError(res: Response, errorData: any, fallbackMessage: string): Error {
  if (res.status === 401) {
    return new Error(
      "Sesi login telah berakhir atau Anda belum login (401 Unauthorized). Silakan muat ulang atau login kembali di /login."
    );
  }
  return new Error(errorData?.error || fallbackMessage);
}

export function useCms() {
  return useQuery({
    queryKey: CMS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/cms", {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal mengambil data CMS");
      }
      return res.json();
    },
    staleTime: 10_000,
  });
}

export function useCmsSection<T = any>(section: CmsSectionName) {
  return useQuery<T>({
    queryKey: getCmsSectionQueryKey(section),
    queryFn: async () => {
      const res = await fetch(`/api/cms/${section}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, `Gagal memuat bagian ${section}`);
      }
      return res.json() as Promise<T>;
    },
    staleTime: 10_000,
  });
}

export function useUpdateCmsSection(section: CmsSectionName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await fetch(`/api/cms/${section}`, {
        method: "PUT",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal menyimpan perubahan");
      }
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: getCmsSectionQueryKey(section) });
      void queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
    },
  });
}

export function useCreateCmsItem(section: CmsSectionName, field?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemData: Record<string, any>) => {
      const queryParam = field ? `?field=${encodeURIComponent(field)}` : "";
      const res = await fetch(`/api/cms/${section}/items${queryParam}`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal menambahkan item baru");
      }
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: getCmsSectionQueryKey(section) });
    },
  });
}

export function useUpdateCmsItem(section: CmsSectionName, field?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string | number; data: Record<string, any> }) => {
      const queryParam = field ? `?field=${encodeURIComponent(field)}` : "";
      const res = await fetch(`/api/cms/${section}/items/${encodeURIComponent(itemId)}${queryParam}`, {
        method: "PUT",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal memperbarui item");
      }
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: getCmsSectionQueryKey(section) });
    },
  });
}

export function useDeleteCmsItem(section: CmsSectionName, field?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string | number) => {
      const queryParam = field ? `?field=${encodeURIComponent(field)}` : "";
      const res = await fetch(`/api/cms/${section}/items/${encodeURIComponent(itemId)}${queryParam}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal menghapus item");
      }
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: getCmsSectionQueryKey(section) });
    },
  });
}

export function useResetCms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section?: CmsSectionName) => {
      const queryParam = section ? `?section=${encodeURIComponent(section)}` : "";
      const res = await fetch(`/api/cms/reset${queryParam}`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw handleFetchError(res, errorData, "Gagal mengembalikan data");
      }
      return res.json();
    },
    onSuccess: (_data, section) => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      if (section) {
        void queryClient.invalidateQueries({ queryKey: getCmsSectionQueryKey(section) });
      }
      void queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
    },
  });
}
