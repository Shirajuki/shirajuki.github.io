<script>
  import { loading } from '../../stores';
  import logo from './logo.png';
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const scale = tweened(0, {
    duration: 1000,
    easing: quintOut,
  });
  const borderRadius = tweened(50, {
    duration: 800,
    easing: quintOut,
  });
  const opacity = tweened(0, {
    duration: 500,
    easing: quintOut,
  });

  setTimeout(() => {
    opacity.set(1);
    scale.set(1).then(() => {
      borderRadius.set(5).then(() => {
        borderRadius.set(20);
        opacity.set(0).then(() => loading.set(false));
      });
    });
  }, 1000);
</script>

{#if $loading}
  <div class="splash" out:fade>
    <img
      src={logo}
      alt="Logo"
      class="logo"
      style={`transform: scale(${$scale}); border-radius: ${$borderRadius}%; opacity: ${$opacity};`}
    />
  </div>
{/if}

<style lang="scss">
  .splash {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--accent-color);
    // background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }
  .logo {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
