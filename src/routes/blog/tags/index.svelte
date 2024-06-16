<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';

  type Tags = { [key: string]: number };

  export const load: Load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json');
    const allPosts = await posts.json();
    const allTags: Tags = {};
    const tags = allPosts.flatMap((post: Post) => post.meta.tags);
    tags.forEach((tag: string) => {
      allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
    });

    return {
      props: {
        tags: allTags,
      },
    };
  };
</script>

<script lang="ts">
  export let tags: Tags;
</script>

<section>
  <h1 class="titleHeader">Tags</h1>
  <ul>
    {#each Object.keys(tags) as tag}
      <li>
        <h2>
          <a href={`/blog/tags/${tag}`}>
            {tag} - {tags[tag]}
          </a>
        </h2>
      </li>
    {/each}
  </ul>
</section>
