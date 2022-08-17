<script>
  // @ts-nocheck
  import Layout from './_post.svelte';
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

<section class="content">
  <Layout {title} {date} {category} {tags}>
    <slot />
  </Layout>
</section>

<style lang="scss">
</style>
