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
</script>

<div class="backface-hidden will-change-transform" bind:this={title}>
    <div class="text-6xl">The Art of Algorithm</div>
</div>
