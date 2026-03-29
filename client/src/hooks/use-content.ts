import { useQuery } from "@tanstack/react-query";

export function useContent(section: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/content", section],
    staleTime: 5 * 60 * 1000,
  });

  const content = (data as any[] || []).reduce((acc: Record<string, string>, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);

  const get = (key: string, fallback: string = "") => content[key] || fallback;

  return { content, get, isLoading };
}
