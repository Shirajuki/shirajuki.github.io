<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';

  export const load: Load = async ({ params, fetch }) => {
    const currentCategory = params.category;
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    const matchingPosts = posts.filter((post: Post) => post.meta.category === currentCategory);

    return {
      props: {
        posts: matchingPosts,
        category: currentCategory,
      },
    };
  };
</script>

<script lang="ts">
  export let posts: Post[];
  export let category: string;
</script>

{#if posts.length}
  <aside>
    <h2>Posts with category "{category}":</h2>
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
