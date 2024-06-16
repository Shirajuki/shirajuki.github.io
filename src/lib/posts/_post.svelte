<script lang="ts">
  import { displayDate } from '$lib/utils';
  export let title: string;
  export let date: Date;
  export let category: string;
  export let tags: string[];

  import { onMount } from 'svelte';
  let div: HTMLDivElement;
  let tocs: any[] = [];
  onMount(() => {
    tocs = [...div.querySelectorAll('a[href]:not(.text-link)')].map((a) => ({
      text: (a as HTMLAnchorElement).innerText,
      href: (a as HTMLAnchorElement).href.split('#').at(-1),
      type: a.parentElement?.tagName,
    }));
  });
</script>

<div>
  <h1>{title}</h1>

  <p>
    <b>Date:</b>
    {displayDate(date)}
  </p>

  <p>
    <b>Category:</b>
    <span>
      <a href={`/blog/category/${category}`}>
        {category}
      </a>
    </span>
  </p>
  <p>
    <b>Tags:</b>
    {#each tags as tag}
      <span>
        <a href={`/blog/tags/${tag}`}>
          {tag}
        </a>
      </span>
    {/each}
  </p>
</div>

<section class="toc">
  {#each tocs as toc}
    <span>
      <a class={toc.type} href={`#${toc.href}`}>
        {toc.text}
      </a>
    </span>
  {/each}
</section>

<div class="wrapper" bind:this={div}>
  <slot />
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
  }
  .toc {
    position: fixed;
    display: flex;
    flex-direction: column;
    text-align: right;
    right: 1rem;
    max-width: 180px;
    overflow-y: auto;
    height: calc(100vh - 12rem);
    span {
      word-wrap: break-word;
      word-break: break-all;
    }
    a {
      position: relative;
      font-size: 0.85rem;
      color: var(--pure-white);
      margin-left: 0.85rem;
      border-bottom: initial;
      &.H1::before,
      &.H2::before {
        content: '#';
        position: absolute;
        top: 0;
        left: -0.8rem;
        color: var(--heading-color);
        font-size: 0.85rem;
      }
      &.H3,
      &.H4,
      &.H5 {
        font-size: 0.75rem;
        text-decoration: none;
      }
      &.H3::before,
      &.H4::before,
      &.H5::before {
        content: '-';
        position: absolute;
        top: -0.1rem;
        left: -0.6rem;
        color: var(--heading-color);
        font-size: 0.85rem;
      }
      &:hover {
        background-color: transparent;
        color: var(--heading-color);
      }
    }
  }
  @media screen and (max-width: 1280px) {
    .toc {
      display: none;
    }
  }
</style>
