<script>
    import { fly } from "svelte/transition"
    export let refresh = ""
  </script>
  
  {#key refresh}
    <div in:fly={{  y: 5, duration: 300, delay: 300 }}
         out:fly={{ y: 5, duration: 300             }}>
      <slot />
    </div>
  {/key}