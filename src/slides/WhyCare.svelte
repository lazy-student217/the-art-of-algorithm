<script lang="ts">
    import { ArrowRight } from "@lucide/svelte";
    import { animate } from "motion";
    import { tick } from "svelte";
    import Latex from "../lib/Latex.svelte";

    let slide: HTMLElement;
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
            <p>Why do we need to <b>care</b> about all of this?</p>
        </button>
    {:else if progress === 1}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>Algorithm is a way to <b>think</b></p>
        </button>
    {:else if progress === 2}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>
                Think about how to solve a problem <b>in general</b>
                <br />
                Solve a problem <b>step by step</b>
                <br />
                Computer only understand explicit instructions!
            </p>
        </button>
    {:else if progress === 3}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>Algorithms are being ran all over the world!</p>
        </button>
    {:else if progress === 4}
        <button
            class="text-5xl/relaxed text-center px-8"
            bind:this={description_div}
        >
            <div class="grid grid-cols-[1fr_auto_1fr] gap-6">
                <span class="text-right">Google Map</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">A* Algorithm</span>
                <span class="text-right">Finding someone on Instagram</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Variants of Binary Search</span>
                <span class="text-right">Entering passwords</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Secure hashing algorithm</span>
                <span class="text-right">Running 3D games</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Matrix multiplication algorithm</span>
                <span class="text-right">Training AI</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Backpropagation</span>
                <span class="text-right"
                    >Calculating <Latex tex={"\\sqrt{n}"} /></span
                >
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Various square root algorithm</span>
                <span class="text-right">Finding primes</span>
                <span><ArrowRight class="inline wh-em" /></span>
                <span class="text-left">Sieve of Eratosthenes</span>
            </div>
        </button>
    {/if}
</div>
