<script>
  import { blur, fly } from "svelte/transition";

  let isReady = false;
</script>

<div class="p-6">
  <button
    class="py-0 px-3 mb-6 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded font-medium text-gray-600"
    on:click={() => (isReady = !isReady)}>Fade</button
  >
  {#if isReady}
    <h1
      in:fly={{ y: 50 }} out:blur
      class="font-bold text-5xl text-gray-700"
    >
      Welcome to SvelteKit
    </h1>
  {/if}
</div>
