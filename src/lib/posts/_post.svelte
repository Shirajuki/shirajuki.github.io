<script lang="ts">
  import { displayDate } from '$lib/utils';
  export let title: string;
  export let date: Date;
  export let category: string;
  export let tags: string[];
</script>

<div>
  <h1>{title}</h1>

  <p>
    {displayDate(date)}
    ·
    <span>
      Category: <a href={`/blog/category/${category}`}>
        {category}
      </a>
    </span>
  </p>

  <p>
    Tags:
    {#each tags as tag}
      <span>
        <a href={`/blog/tags/${tag}`}>
          {tag}
        </a>
      </span>
    {/each}
  </p>
</div>

<slot />
