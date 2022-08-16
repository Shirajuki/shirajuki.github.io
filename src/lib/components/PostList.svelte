<script lang="ts">
  import type Post from '$lib/_post.svelte';
  export let posts: Post[];
</script>

<div>
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
</div>
