<script context="module" lang="ts">
  import { loading } from '../stores';
  export const load = ({ url }: any) => {
    const currentRoute = url.pathname;
    if (currentRoute !== '/' && loading) {
      loading.set(false);
    }

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
  import Splash from '$lib/components/Splash.svelte';
  import { fade } from 'svelte/transition';
  import '../app.scss';

  export let currentRoute: string;
</script>

<Header />

{#if currentRoute === '/'}
  <Splash />
{/if}

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
