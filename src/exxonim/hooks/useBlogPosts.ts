import { useQuery } from "@tanstack/react-query";
import { getCachedPublicBlogPosts, listPublicBlogPosts } from "@/exxonim/services/blogService";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog", "posts"],
    queryFn: listPublicBlogPosts,
    initialData: getCachedPublicBlogPosts,
    refetchOnMount: true,
    refetchOnReconnect: "always",
    staleTime: 1000 * 60 * 60,
  });
}
