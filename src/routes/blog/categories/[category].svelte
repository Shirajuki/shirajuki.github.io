<script context="module">
  export const load = async ({ params, fetch }) => {
    const currentCategory = params.category;
    const response = await fetch('/api/posts.json');
    const posts = await response.json();

    const matchingPosts = posts.filter((post) => post.meta.categories.includes(currentCategory));

    return {
      props: {
        posts: matchingPosts,
      },
    };
  };
</script>

<script>
  // ... Other props here
  export let categories;
</script>

<!-- ...Post HTML here -->

{#if categories.length}
  <aside>
    <h2>Posted in:</h2>
    <ul>
      {#each categories as category}
        <li>
          <a href="/blog/categories/{category}">
            {category}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}
