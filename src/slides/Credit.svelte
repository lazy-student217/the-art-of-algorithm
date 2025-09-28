<script lang="ts">
    import { ArrowRight } from "@lucide/svelte";
    import { animate } from "motion";
    import { tick } from "svelte";
    import Latex from "../lib/Latex.svelte";

    let slide: HTMLElement;
    let simple_example: HTMLElement | undefined = $state(undefined);
    let progress = $state(0);
    let description_div: HTMLElement | undefined = $state(undefined);

    export async function enter() {
        slide.style.opacity = "0";
        await animate(slide, {
            opacity: [0, 1],
            x: [400, 0],
        });
    }

    export async function exit() {
        await animate(slide, {
            opacity: [1, 0],
            x: [0, -400],
        });
    }

    async function change_description() {
        await animate(description_div!, { opacity: 0, y: [0, -100] });
        progress += 1;
        await tick();
        description_div!.style.opacity = "0";
        animate(description_div!, { opacity: [0, 1], y: [100, 0] });
    }
</script>

<div bind:this={slide}>
    {#if progress === 0}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <h1 class="text-7xl">Credit</h1>
        </button>
    {:else if progress === 1}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <h1 class="text-6xl">Inspiration 1: 2swap</h1>
        </button>
    {:else if progress === 2}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
        >
            <h1 class="text-6xl">Inspiration 2: Previous presentation</h1>
        </button>
    {/if}
</div>
