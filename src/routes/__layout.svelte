<script context="module" lang="ts">
  export const load = ({ url }: any) => {
    const currentRoute = url.pathname;

    return {
      props: {
        currentRoute,
      },
    };
  };
</script>

<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { fade } from 'svelte/transition';
  import '../app.scss';

  export let currentRoute: any;
</script>

<Header />

{#key currentRoute}
  <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    <slot />
  </main>
{/key}

<Footer />

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 100px - 3rem);
  }
</style>
