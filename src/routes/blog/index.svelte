<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/_post.svelte';

  export const load: Load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json');
    const allPosts = await posts.json();

    return {
      props: {
        posts: allPosts,
      },
    };
  };
</script>

<script lang="ts">
  export let posts: Post[];
</script>

<h1>Blog</h1>

<p>My blog posts will go here eventually…</p>
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
