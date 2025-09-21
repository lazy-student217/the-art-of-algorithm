<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    import Introduction from "./slides/Introduction.svelte";
    import Title from "./slides/Title.svelte";
    import ShortestPathSum from "./slides/ShortestPathSum.svelte";
    import Sudoku from "./slides/Sudoku.svelte";
    import { animate } from "motion";

    interface SlideInstance {
        exit: () => Promise<void>;
        enter: () => Promise<void>;
    }

    let slide = $state(0);
    let slides = [Introduction, Sudoku, Title, ShortestPathSum];
    let Slide = $derived(slides[slide]);
    let slide_obj: SlideInstance;
    let buttons: HTMLDivElement;

    async function button_fade_in() {
        await animate(buttons, { opacity: [0, 1] });
    }

    async function button_fade_out() {
        await animate(buttons, { opacity: [1, 0] });
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
        console.log(e);
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
    <div class="grow-1 flex items-center">
        <Slide bind:this={slide_obj} />
    </div>
    <div class="flex flex-row w-full px-4" bind:this={buttons}>
        {#if slide != 0}
            <button
                class="text-7xl! material-symbols-outlined hover:scale-120 transition-all mr-auto"
                onclick={prev_slide}
            >
                chevron_backward
            </button>
        {/if}
        {#if slide != slides.length - 1}
            <button
                class="text-7xl! material-symbols-outlined hover:scale-120 transition-all ml-auto"
                onclick={next_slide}
            >
                chevron_forward
            </button>
        {/if}
    </div>
</main>
