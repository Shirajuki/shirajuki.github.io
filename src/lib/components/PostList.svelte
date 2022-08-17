<script lang="ts">
  import type PostType from '$lib/posts/_post.svelte';
  import Post from './Post.svelte';
  export let posts: PostType[];
</script>

{#each posts as post}
  <Post {post} />
{/each}
