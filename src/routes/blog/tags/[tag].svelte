<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/_post.svelte';

  export const load: Load = async ({ params, fetch }) => {
    const currentTag = params.tag;
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    const matchingPosts = posts.filter((post: Post) => post.meta.tags.includes(currentTag));

    return {
      props: {
        posts: matchingPosts,
        tag: currentTag,
      },
    };
  };
</script>

<script lang="ts">
  export let posts: Post[];
  export let tag: string;
</script>

{#if posts.length}
  <aside>
    <h2>Posts with tag "{tag}":</h2>
    <ul>
      {#each posts as post}
        <li>
          <h2>
            <a href={post.path}>
              {post.meta.title}
            </a>
          </h2>
          Published {post.meta.date}
        </li>
      {/each}
    </ul>
  </aside>
{/if}
