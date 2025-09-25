<script lang="ts">
    import { animate } from "motion";
    import { onMount } from "svelte";
    import { timeout, nullgetter } from "../lib/utils"; // ! Do not delete the use of `nullgetter`

    let slide: HTMLElement;

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

    let title_text = $state("Back to Sudoku");
    let topics: HTMLElement[] = [];

    function binds(e: HTMLElement) {
        topics.push(e);
    }

    onMount(async () => {
        const interval = 500;
        await timeout(interval);
        title_text = title_text + ".";
        await timeout(interval);
        title_text = title_text + ".";
        await timeout(interval);
        title_text = title_text + ".";
    });

    function show_extra_topics() {
        for (const e of topics) {
            animate(e, { opacity: 1 });
        }
    }
</script>

<div
    class="relative flex flex-col w-full grow h-full px-8 justify-center items-center"
    bind:this={slide}
>
    <button class="text-7xl self-center" onclick={show_extra_topics}
        >{title_text}</button
    >
    <h2
        class="absolute bottom-[5em] left-[5em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        NP completeness
    </h2>
    <h2
        class="absolute top-[9em] right-[5em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        Complexity Theory
    </h2>
    <h2
        class="absolute bottom-[4em] left-[17em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        Backtracking
    </h2>
    <h2
        class="absolute top-[5em] right-[17em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        Boolean Satisfiability Problem
    </h2>
    <h2
        class="absolute right-[4em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        P vs NP
    </h2>
    <h2
        class="absolute top-[7em] left-[4em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        Depth-first Search
    </h2>
    <h2
        class="absolute bottom-[7em] right-[14em] text-4xl w-fit text-black/60 opacity-0"
        bind:this={nullgetter, binds}
    >
        Recursion
    </h2>
</div>
