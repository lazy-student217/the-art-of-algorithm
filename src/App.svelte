<script lang="ts">
    import { tick } from "svelte";
    import { animate } from "motion";
    import { ChevronLeft, ChevronRight } from "@lucide/svelte/icons";
    import Introduction from "./slides/Introduction.svelte";
    import Title from "./slides/Title.svelte";
    import ShortestPathSum from "./slides/ShortestPathSum.svelte";
    import Sudoku from "./slides/Sudoku.svelte";
    import BackToSudoku from "./slides/BackToSudoku.svelte";
    import WhatIsAlgorithm from "./slides/WhatIsAlgorithm.svelte";
    import SimpleExample from "./slides/SimpleExample.svelte";
    import SimpleExample2 from "./slides/SimpleExample2.svelte";
    import SimpleExample3 from "./slides/SimpleExample3.svelte";
    import BinarySearch from "./slides/BinarySearch.svelte";

    interface SlideInstance {
        exit: () => Promise<void>;
        enter: () => Promise<void>;
    }

    let slide = $state(0);
    let slides = [
        Introduction,
        Sudoku,
        Title,
        BackToSudoku,
        Title,
        WhatIsAlgorithm,
        SimpleExample,
        SimpleExample2,
        SimpleExample3,
        BinarySearch,
        ShortestPathSum,
    ];
    let Slide = $derived(slides[slide]);
    let slide_obj: SlideInstance;
    let buttons: HTMLDivElement;

    async function button_fade_in() {
        await animate(buttons, { opacity: [0, 1], width: ["120%", "100%"] });
    }

    async function button_fade_out() {
        await animate(buttons, { opacity: [1, 0], width: ["100%", "120%"] });
    }

    async function next_slide() {
        await Promise.all([slide_obj.exit(), button_fade_out()]);
        slide += 1;
        await tick();
        await Promise.all([slide_obj.enter(), button_fade_in()]);
    }

    async function prev_slide() {
        await Promise.all([slide_obj.exit(), button_fade_out()]);
        slide -= 1;
        await tick();
        await Promise.all([slide_obj.enter(), button_fade_in()]);
    }

    function onkeydown(e: KeyboardEvent) {
        if (
            (e.key === "ArrowRight" || e.key === "Enter") &&
            slide !== slides.length - 1
        ) {
            e.preventDefault();
            next_slide();
        } else if (e.key === "ArrowLeft" && slide !== 0) {
            e.preventDefault();
            prev_slide();
        }
    }
</script>

<svelte:document {onkeydown} />

<main class="flex flex-col items-center justify-center py-8 overflow-hidden">
    <div class="grow-1 flex items-center w-full justify-center">
        <Slide bind:this={slide_obj} />
    </div>
    <div class="flex flex-row w-full px-4" bind:this={buttons}>
        {#if slide != 0}
            <button
                class="hover:scale-120 transition-all mr-auto"
                aria-label="left"
                onclick={prev_slide}
            >
                <ChevronLeft size={68} />
            </button>
        {/if}
        {#if slide != slides.length - 1}
            <button
                class="hover:scale-120 transition-all ml-auto"
                aria-label="right"
                onclick={next_slide}
            >
                <ChevronRight size={68} />
            </button>
        {/if}
    </div>
</main>
