<script context="module">
  import { browser, dev } from '$app/env';

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

<section>
  <h1 class="titleHeader">About</h1>

  <p>
    Hello, my name is Jonny Ngo Luong, and is also known as Shirajuki in the Internet. I am a fullstack software developer and cybersecurity CTF player from Lillehammer, Norway. 
  </p>

  <ul>
    <li>X (Twitter): <a href="https://x.com/shirajukii" rel="noopener" target="_blank">@shirajukii</a></li>
    <li>Github: <a href="https://github.com/shirajuki" rel="noopener" target="_blank">@shirajuki</a></li>
    <li>Developer portfolio: <a href="https://jonny.js.org" rel="noopener" target="_blank">jonny.js.org</a></li>
  </ul>

  <p>
    I am a security enthusiast that likes to play Capture-the-flag with my teammates at
    <a href="https://ctftime.org/team/109611" rel="noopener"target="_blank">@iku-toppene</a>,
    <a href="https://twitter.com/bootplug_ctf" rel="noopener"target="_blank">@bootplug</a>,
    <a href="https://twitter.com/CoraxTeam" rel="noopener" target="_blank">@corax</a> and
    <a href="https://twitter.com/RumbleCTF" rel="noopener" target="_blank">@RumbleInTheJungle</a>. I am interested in categories
    such as web exploitation, reverse engineering, pwning, or anything related to problem-solving in general. Aside from
    cybersecurity and hacking, I also enjoy developing applications on the web stack from UX/UI design to the
    implementation of an application.
  </p>

  <p>
    If you want to get in touch you can send me a message at: <a href="mailto:shirajuki@duck.com"
      >shirajuki@duck.com</a
    >
  </p>
</section>

<style lang="scss">
</style>
