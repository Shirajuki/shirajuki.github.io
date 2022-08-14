<script lang="ts">
  import Layout from './_post.svelte';
  export let title = '';
  export let date = new Date();
</script>

<Layout {title} {date}>
  <slot />
</Layout>
