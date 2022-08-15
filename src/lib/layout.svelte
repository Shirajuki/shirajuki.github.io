<script>
  // @ts-nocheck
  import Layout from './_post.svelte';
  export let title = '';
  export let date = new Date();
  export let tags = [];
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<Layout {title} {date} {tags}>
  <slot />
</Layout>
