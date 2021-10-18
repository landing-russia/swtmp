<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path,
    },
  });
</script>

<script>
  import "../app.css";
  import Nav from "$lib/Nav.svelte";
  import PageTransition from "$lib/PageTransition.svelte";
  export let key;
</script>

<Nav />

<PageTransition refresh={key}>
  <slot />
</PageTransition>
