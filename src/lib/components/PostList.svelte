<script lang="ts">
  import type PostType from '$lib/_post.svelte';
  import Post from './Post.svelte';
  export let posts: PostType[];
</script>

<div>
  <ul>
    {#each posts as post}
      <Post {post} />
    {/each}
  </ul>
</div>

<style lang="scss">
  div {
    width: 100%;
    ul {
      padding: 0;
    }
  }
</style>
