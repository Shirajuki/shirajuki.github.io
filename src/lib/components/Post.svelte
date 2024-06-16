<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type PostType from '$lib/posts/_post.svelte';
  import { displayDate } from '$lib/utils';
  export let post: PostType;
</script>

<article in:fly={{ x: 25, duration: 1000 }} out:fade>
  {#if post.meta.thumbnail}
    <figure>
      <img src={post.meta.thumbnail} alt={`post image of ${post.meta.title}`} />
    </figure>
  {/if}

  <header>
    <h2>
      {post.meta.title}
    </h2>
  </header>
  <section>
    <p class="tags">
      {#each post.meta.tags as tag}
        <a href={`/blog/tags/${tag}`}>
          {tag}
        </a>
      {/each}
    </p>
    <p>
      {post.meta.description}
    </p>
  </section>
  <footer>
    <p>
      {displayDate(post.meta.date)}
    </p>
  </footer>
  <!-- svelte-ignore a11y-missing-content -->
  <a href={post.path} class="link" aria-label={`post link to ${post.meta.title}`} />
</article>

<style lang="scss">
  article {
    position: relative;
    width: 100%;
    padding: 1.4rem;
    margin: 1.4rem auto;
    background-color: var(--secondary-color);
    border-radius: 0.6rem;
    transition: transform 0.2s;
    color: var(--text-color);
    &::before {
      content: '';
      position: absolute;
      width: calc(100% - 4rem);
      height: 0.6rem;
      top: -0.6rem;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 1.5rem;
      background-color: var(--accent-color);
    }
    &:active {
      transform: scale(0.96);
    }
    &:not(:active):hover {
      transform: scale(1.01);
    }
    .tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
      margin-bottom: 0;
      a {
        border-bottom: initial;
        z-index: 1;
        &:hover {
          background-color: transparent;
          color: var(--pure-white);
        }
      }
      & + p {
        margin-top: 0.5rem;
      }
    }
    figure {
      margin: 0;
      margin-bottom: 10px;
      text-align: center;
      border-radius: 0.8rem;
      overflow: hidden;
      img {
        object-fit: cover;
        max-height: 200px;
        width: 100%;
      }
    }
    footer {
      p {
        margin: 0;
        font-size: 0.9rem;
      }
    }
    h2 {
      margin: 0;
      color: var(--pure-white);
    }
    p {
      font-size: 0.95rem;
      position: relative;
      bottom: 0;
      line-height: 1.5rem;
    }
    & > a {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-bottom: none;
      border-radius: 0.6rem;
      &:hover {
        background-color: transparent;
      }
    }
  }
</style>
