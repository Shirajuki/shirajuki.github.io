<script lang="ts">
  export let title: string;
  export let date: Date;
</script>

<h1>{title}</h1>

<p>Published: {date}</p>

<slot />
