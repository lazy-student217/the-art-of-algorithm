<script lang="ts">
  import { animate } from "motion";
  import { onMount } from "svelte";

  let title: HTMLSpanElement;

  onMount(() => {
    animate(
      title,
      {
        scale: [1, 1.15],
      },
      {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
      },
    );
  });

  export async function enter() {
    title.style.opacity = "0";
    await animate(title, {
      opacity: [0, 1],
      x: [400, 0],
    });
  }

  export async function exit() {
    await animate(title, {
      opacity: [1, 0],
      x: [0, -400],
    });
  }
</script>

<div class="backface-hidden will-change-transform" bind:this={title}>
  <h1 class="text-6xl">The Art of Algorithm</h1>
</div>
