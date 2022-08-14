<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '../_post.svelte';
  export const load: Load = async ({ params, fetch }) => {
    const currentCategory = params.category;
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    const matchingPosts = posts.filter((post: Post) => post.meta.categories.includes(currentCategory));

    return {
      props: {
        posts: matchingPosts,
      },
    };
  };
</script>

<script lang="ts">
  // ... Other props here
  export let categories: string[];
</script>

<!-- ...Post HTML here -->

{#if categories.length}
  <aside>
    <h2>Posted in:</h2>
    <ul>
      {#each categories as category}
        <li>
          <a href="/blog/categories/{category}">
            {category}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}
