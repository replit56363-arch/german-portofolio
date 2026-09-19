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

export function useCms() {
  return useQuery({
    queryKey: CMS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/cms");
      if (!res.ok) throw new Error("Gagal mengambil data CMS");
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useCmsSection<T = any>(section: CmsSectionName) {
  return useQuery<T>({
    queryKey: getCmsSectionQueryKey(section),
    queryFn: async () => {
      const res = await fetch(`/api/cms/${section}`);
      if (!res.ok) throw new Error(`Gagal memuat bagian ${section}`);
      return res.json() as Promise<T>;
    },
    staleTime: 30_000,
  });
}

export function useUpdateCmsSection(section: CmsSectionName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await fetch(`/api/cms/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menyimpan perubahan");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menambahkan item baru");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal memperbarui item");
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
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal menghapus item");
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
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Gagal mengembalikan data");
      }
      return res.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CMS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
    },
  });
}
