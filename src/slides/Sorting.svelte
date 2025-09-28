<script lang="ts">
    import { animate } from "motion";
    import SortingList from "../lib/SortingList.svelte";
    let list: SortingList;
    let slide: HTMLElement;
    let playing = $state(false);

    async function play() {
        if (!playing) {
            playing = true;

            playing = false;
        }
    }

    export async function enter() {
        slide.style.opacity = "0";
        await animate(slide, { opacity: [0, 1], x: [400, 0] });
    }

    export async function exit() {
        await animate(slide, { opacity: [1, 0], x: [0, -400] });
    }
</script>

<div class="py-auto flex items-center flex-col" bind:this={slide}>
    <h1 class="text-5xl hover:scale-105 transition-all mb-auto">Sorting</h1>

    <div class="p-4 flex flex-col items-center">
        <SortingList bind:this={list} />
    </div>
</div>
