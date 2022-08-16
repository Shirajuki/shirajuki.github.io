<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/_post.svelte';
  import PostList from '$lib/components/PostList.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';

  export const load: Load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json');
    const allPosts = await posts.json();

    return {
      props: {
        posts: allPosts,
      },
    };
  };

  export const prerender = true;
</script>

<script lang="ts">
  export let posts: Post[];
</script>

<section>
  <h1 class="titleHeader">Writing</h1>

  <SearchInput />

  <p>My blog posts will go here eventually…</p>

  <PostList {posts} />
</section>

<style lang="scss">
</style>
