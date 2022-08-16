<script lang="ts">
  import { page } from '$app/stores';
  import logo from './svelte-logo.svg';
  import { fade } from 'svelte/transition';
</script>

<header in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <nav>
    <ul>
      <li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
      <li class:active={$page.url.pathname === '/about'}>
        <a sveltekit:prefetch href="/about">About</a>
      </li>
      <li class:active={$page.url.pathname.includes('/blog')}>
        <a sveltekit:prefetch href="/blog">Blog</a>
      </li>
    </ul>
  </nav>

  <div class="corner" />
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 3em;
    height: 3em;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  nav {
    display: flex;
    justify-content: center;
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--text-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>
