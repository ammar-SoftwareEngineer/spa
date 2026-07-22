import blogsData from "@/lib/data/blogs.json";
import type { BlogPost } from "@/types";

export type { BlogPost };

export async function listBlogs(): Promise<BlogPost[]> {
  return blogsData as BlogPost[];
}
