<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';

  type Tags = { [key: string]: number };

  export const load: Load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json');
    const allPosts = await posts.json();
    const allCategories: Tags = {};
    const categories = allPosts.flatMap((post: Post) => post.meta.category);
    categories.forEach((category: string) => {
      allCategories[category] = allCategories[category] ? allCategories[category] + 1 : 1;
    });

    return {
      props: {
        categories: allCategories,
      },
    };
  };
</script>

<script lang="ts">
  export let categories: Tags;
</script>

<section>
  <h1 class="titleHeader">Categories</h1>
  <ul>
    {#each Object.keys(categories) as category}
      <li>
        <h2>
          <a href={`/blog/category/${category}`}>
            {category} - {categories[category]}
          </a>
        </h2>
      </li>
    {/each}
  </ul>
</section>
