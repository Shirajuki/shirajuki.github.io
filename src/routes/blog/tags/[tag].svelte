<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/_post.svelte';

  export const load: Load = async ({ params, fetch }) => {
    const currentTag = params.tag;
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    const matchingPosts = posts.filter((post: Post) => post.meta.tags.includes(currentTag));
    console.log(matchingPosts);

    return {
      props: {
        posts: matchingPosts,
      },
    };
  };
</script>

<script lang="ts">
  // ... Other props here
  export let posts: Post[];
</script>

<!-- ...Post HTML here -->

{#if posts.length}
  <aside>
    <h2>Posted in:</h2>
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
