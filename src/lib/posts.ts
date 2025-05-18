import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts({
  limit,
}: { limit?: number } = {}): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  const filteredPosts = posts
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}
