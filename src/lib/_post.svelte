<script lang="ts">
  export let title: string;
  export let date: Date;
  export let tags: string[];
</script>

<h1>{title}</h1>

<p>Published: {date}</p>

{#each tags as tag}
  <p>
    <a href={`/blog/tags/${tag}`}>
      {tag}
    </a>
  </p>
{/each}

<slot />
