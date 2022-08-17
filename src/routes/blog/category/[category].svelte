<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';
  import PostList from '$lib/components/PostList.svelte';

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

<section>
  <h1 class="titleHeader">Writing / category</h1>

  <br />

  <p>Posts with category "{category}":</p>
  {#if posts.length}
    <PostList {posts} />
  {/if}
</section>
