import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts({
  limit,
}: {
  limit?: number;
} = {}): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  const filteredPosts = posts
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

export type Tag = {
  tag: string;
  count: number;
};
export async function getAllTags(): Promise<Tag[]> {
  const posts = await getCollection("blog");
  const filteredPosts = posts
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const tags: { [key: string]: number } = {};
  filteredPosts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      if (!tags[tag]) {
        tags[tag] = 1;
      }
      tags[tag]++;
    });
  });
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);
  return sortedTags.map(([tag, count]) => ({ tag, count }));
}

export async function getPostsByTag({
  tag,
}: {
  tag?: string;
}): Promise<CollectionEntry<"blog">[]> {
  const posts = await getAllPosts();
  if (!tag) {
    return [];
  }
  const filteredPosts = posts.filter((post) => post.data.tags?.includes(tag));
  return filteredPosts
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
