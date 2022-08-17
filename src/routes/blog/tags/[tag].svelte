<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';
  import PostList from '$lib/components/PostList.svelte';

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

<section>
  <h1 class="titleHeader">Writing / tag</h1>

  <br />

  <p>Posts with tag "{tag}":</p>
  {#if posts.length}
    <PostList {posts} />
  {/if}
</section>
