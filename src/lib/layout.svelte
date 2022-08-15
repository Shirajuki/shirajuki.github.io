<script>
  // @ts-nocheck
  import Layout from './_post.svelte';
  import './prism-dracula.css';
  import './post.scss';

  export let title = '';
  export let date = new Date();
  export let category = '';
  export let tags = [];
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<Layout {title} {date} {category} {tags}>
  <slot />
</Layout>
