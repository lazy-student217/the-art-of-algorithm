<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Slide1 from "./slides/Slide1.svelte";
    import Slide2 from "./slides/Slide2.svelte";

    let slide = $state(0);
    let slides = [Slide1, Slide2];
    let Slide = $derived(slides[slide]);

    function next_slide() {
        slide += 1;
    }

    function prev_slide() {
        slide -= 1;
    }

    function listen_enter(e: KeyboardEvent) {
        if (e.key == "Enter" && slide != slides.length - 1) {
            e.preventDefault();
            next_slide();
        }
    }

    onMount(() => {
        document.addEventListener("keydown", listen_enter);
    });

    onDestroy(() => {
        document.removeEventListener("keydown", listen_enter);
    });
</script>

<main class="flex flex-col items-center justify-center py-8 overflow-hidden">
    <div class="grow-1 flex items-center">
        <Slide />
    </div>
    <div class="flex flex-row w-full px-4">
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
