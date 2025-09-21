<script lang="ts">
    import { animate } from "motion";
    import Grid from "../lib/Grid.svelte";

    let slide: HTMLSpanElement;
    let grid: Grid;

    let process = $state(0);

    function proceed() {
        if (process === 0) {
        }
    }

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
</script>

<div class="flex flex-col items-center" bind:this={slide}>
    <h1 class="text-6xl font-bold mb-8"><button>Sudoku</button></h1>

    <Grid
        bind:this={grid}
        grid={[
            [5, 3, null, null, 7, null, null, null, null],
            [6, null, null, 1, 9, 5, null, null, null],
            [null, 9, 8, null, null, null, null, 6, null],
            [8, null, null, null, 6, null, null, null, 3],
            [4, null, null, 8, null, 3, null, null, 1],
            [7, null, null, null, 2, null, null, null, 6],
            [null, 6, null, null, null, null, 2, 8, null],
            [null, null, null, 4, 1, 9, null, null, 5],
            [null, null, null, null, 8, null, null, 7, 9],
        ]}
    />
</div>
