<script lang="ts">
  import { animate } from "motion";
  import { onMount, tick } from "svelte";
  import { flip } from "../lib/utils";

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

  let title_text = $state("Art");
  let span: HTMLSpanElement;
  let left: HTMLSpanElement;
  let right: HTMLSpanElement;

  async function onclick() {
    await animate(span, {
      opacity: [1, 0],
      y: [0, -200],
    });
    await flip([left, right], () => {
      title_text = "Beauty";
      return tick();
    });
    animate(span, {
      opacity: [0, 1],
      y: [200, 0],
    });
  }
</script>

<button
  class="backface-hidden will-change-transform"
  {onclick}
  bind:this={title}
>
  <h1 class="text-6xl">
    <span class="inline-block" bind:this={left}>The</span>
    <span bind:this={span} class="inline-block">{title_text}</span>
    <span class="inline-block" bind:this={right}>of Algorithms</span>
  </h1>
</button>
