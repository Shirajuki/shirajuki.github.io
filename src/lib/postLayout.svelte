<script>
  // @ts-nocheck
  import Layout from './_post.svelte';
  export let title = '';
  export let date = new Date();
  export let tags = [];
</script>

<Layout {title} {date} {tags}>
  <slot />
</Layout>
