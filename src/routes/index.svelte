<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type Post from '$lib/posts/_post.svelte';
  import { loading } from '../stores';
  import PostList from '$lib/components/PostList.svelte';

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

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <article class={`hero ${!$loading ? 'show' : 'hidden'}`}>
    <header>
      <h2>Hello, i’m</h2>
    </header>
    <section>
      <h1>Shirajuki</h1>
    </section>
    <footer><h2>A CTF player @bootplug @corax @ItemizeCTF @dugnadCTF</h2></footer>
  </article>

  <h1 class="titleHeader">Writings</h1>
  <PostList {posts} />
</section>

<style lang="scss">
  .hero {
    display: flex;
    width: 100%;
    height: calc(100vh - 150px - 4rem - var(--column-margin-top) - 2rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 15rem;
    &::before {
      content: '';
      position: absolute;
      background-color: var(--tertiary-color);
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
    }
    &::after {
      content: '';
      position: absolute;
      background-color: var(--accent-color);
      transform: translateX(-20%) skewX(-20deg);
      top: 0;
      left: 0;
      width: 200vw;
      height: 100vh;
      z-index: -1;
    }
    header,
    footer {
      max-width: 30rem;
      width: 100%;
      margin: 0 auto;
      h2 {
        font-size: 2rem;
        font-family: var(--font-fancy);
        margin: 0;
        font-weight: 400;
        opacity: 0;
      }
    }
    header h2 {
      transform: translate(0, 1rem);
    }
    footer h2 {
      transform: translate(0, 1rem);
    }
    section h1 {
      font-size: 5rem;
      color: var(--pure-white);
      opacity: 0;
    }
    &.show {
      &::after {
        animation-name: slideInRight;
        animation-delay: 0.8s;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);
        animation-fill-mode: both;
      }
      & header h2 {
        animation-name: slideInDiag;
        animation-delay: 0.8s;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);
        animation-fill-mode: both;
      }
      & footer h2 {
        animation-name: slideInDiag;
        animation-delay: 0.8s;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);
        animation-fill-mode: both;
      }
      & section h1 {
        animation-name: slideIn;
        animation-delay: 0.8s;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);
        animation-fill-mode: both;
      }
    }
  }
  section > h1 {
    margin: 0 auto;
  }
</style>
