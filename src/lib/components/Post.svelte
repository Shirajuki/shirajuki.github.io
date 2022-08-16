<script lang="ts">
  import type PostType from '$lib/_post.svelte';
  export let post: PostType;
</script>

<li>
  <a href={post.path}>
    <div>
      <h2>
        {post.meta.title}
      </h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore voluptates, quis mollitia in, aut provident
        possimus fugiat quasi sed nam at error cum, placeat iusto. Perspiciatis ratione commodi minima quo.
      </p>
      <p>
        Published {post.meta.date}
      </p>
    </div>
  </a>
</li>

<style lang="scss">
  h2 {
    margin: 0;
    color: var(--pure-white);
  }
  a:hover {
    text-decoration: none;
  }
  div {
    padding: 1.4rem;
    margin: 2rem auto;
    background-color: var(--secondary-color);
    border-radius: 13px;
    transition: transform 0.1s;
    color: var(--text-color);
    &:active {
      transform: scale(0.96);
    }
  }
  li {
    list-style-type: none;
  }
</style>
