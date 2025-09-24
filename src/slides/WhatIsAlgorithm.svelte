<script lang="ts">
    import { animate } from "motion";
    import { tick } from "svelte";
    import { flip } from "../lib/utils";

    let slide: HTMLSpanElement;
    let title: HTMLElement;
    let algo_chinese_span: HTMLElement;
    let algo_english_span: HTMLElement;
    let definition: HTMLElement | undefined = $state(undefined);
    let confusion: HTMLElement | undefined = $state(undefined);
    let progress = $state(0);

    export async function enter() {
        slide.style.opacity = "0";
        await Promise.all([
            animate(slide, {
                opacity: [0, 1],
            }),
            animate(algo_chinese_span, {
                y: [-50, 0],
            }),
            animate(algo_english_span, {
                y: [50, 0],
            }),
        ]);
    }

    export async function exit() {
        await Promise.all([
            animate(slide, {
                opacity: [1, 0],
            }),
            animate(algo_chinese_span, {
                y: [0, -50],
            }),
            animate(algo_english_span, {
                y: [0, 50],
            }),
        ]);
    }

    async function proceed() {
        if (progress >= 2) {
            return;
        }
        const animating_elements = [title];
        if (progress >= 1) {
            animating_elements.push(definition!);
        }
        await flip(animating_elements, () => {
            progress += 1;
            return tick();
        });
        if (progress === 1) {
            animate(definition!, {
                opacity: [0, 1],
            });
        } else if (progress === 2) {
            animate(confusion!, {
                opacity: [0, 1],
            });
        }
    }
</script>

<div bind:this={slide} class="flex flex-col items-center">
    <button class="block text-6xl p-10" bind:this={title} onclick={proceed}>
        What is <span
            class="relative inline-flex flex-col text-center items-center"
        >
            <span
                class="text-4xl absolute bottom-full"
                bind:this={algo_chinese_span}>演算法</span
            >
            <span class="underline" bind:this={algo_english_span}
                >Algorithms</span
            >
        </span>?
    </button>
    {#if progress >= 1}
        <div
            class="flex flex-col items-center gap-8 p-12"
            bind:this={definition}
        >
            <div class="text-5xl font-bold">Definiton</div>
            <div class="text-4xl text-center">
                A <u>sequence</u> of <u>instruction</u> to do some
                <u>computation</u>
            </div>
        </div>
    {/if}
    {#if progress >= 2}
        <div bind:this={confusion} class="p-10">
            <span class="text-6xl">What do you mean??</span>
        </div>
    {/if}
</div>
