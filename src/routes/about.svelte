<script context="module">
  import { browser, dev } from '$app/env';
  import { fade, fly } from 'svelte/transition';

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About me :)" />
</svelte:head>

<section in:fly={{ x: 25, duration: 1000 }} out:fade>
  <h1 class="titleHeader">About</h1>

  <p>
    Hello, my name is Jonny Ngo Luong, also known as Shirajuki in the Internet. I am a fullstack software developer and
    a CTF player from Lillehammer, Norway.
  </p>

  <ul>
    <li>X (Twitter): <a href="https://x.com/shirajukii" rel="noopener" target="_blank">@shirajukii</a></li>
    <li>Github: <a href="https://github.com/shirajuki" rel="noopener" target="_blank">@shirajuki</a></li>
    <li>Developer portfolio: <a href="https://jonny.js.org" rel="noopener" target="_blank">jonny.js.org</a></li>
  </ul>

  <p>
    I like to play CTF, especially with my teammates
    <a href="https://ctftime.org/team/109611" rel="noopener" target="_blank">@iku-toppene</a>,
    <a href="https://twitter.com/bootplug_ctf" rel="noopener" target="_blank">@bootplug</a>,
    <a href="https://twitter.com/CoraxTeam" rel="noopener" target="_blank">@corax</a>,
    <a href="https://twitter.com/RumbleCTF" rel="noopener" target="_blank">@RumbleInTheJungle</a> and
    <a href="https://ctftime.org/team/287824" rel="noopener" target="_blank">@CyberSalmons</a>. I am interested in web,
    rev, pwn, and jails. Aside from cybersecurity and hacking, I do some UX/UI work and web development as well.
  </p>
</section>

<style lang="scss">
</style>
