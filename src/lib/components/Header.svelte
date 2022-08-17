<script lang="ts">
  import { page } from '$app/stores';
  import logo from './logo.png';
  import { loading } from '../../stores';
  import { fade } from 'svelte/transition';
</script>

<header in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }} class={$loading ? 'hidden' : 'show'}>
  <div class="corner">
    <a sveltekit:prefetch href="/">
      <img src={logo} alt="Logo" />
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
    opacity: 0;

    &.show {
      animation-name: slideDown;
      animation-delay: 1s;
      animation-duration: 0.6s;
      animation-timing-function: cubic-bezier(0.39, 0.58, 0.57, 1);
      animation-fill-mode: both;
    }
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
      text-decoration: none;
      border: none;
    }
  }

  .corner img {
    width: 2em;
    height: 2em;
    border-radius: 4px;
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
    &.active {
      &::before {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--pure-white);
      }
      a {
        color: var(--pure-white);
      }
    }
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

    color: var(--heading-color);
    text-decoration: none;
    border: none;
  }

  a:hover {
    color: var(--pure-white);
    background: transparent;
  }
</style>
