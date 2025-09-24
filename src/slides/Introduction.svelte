<script lang="ts">
    import { animate } from "motion";

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

    async function change_problem({
        currentTarget: el,
    }: {
        currentTarget: HTMLButtonElement;
    }) {
        await animate(el, {
            opacity: [1, 0],
        });
        if (problems === "problems") {
            problems = "puzzles";
        } else if (problems === "puzzles") {
            problems = "Sudoku";
        }
        await animate(el, {
            opacity: [0, 1],
        });
    }

    let problems = $state("problems");
</script>

<div bind:this={slide}>
    <h1 class="text-6xl/25 text-center line">
        Have you wonder how <br /> computers <b>solve</b>
        <button onclick={change_problem} class="cursor-pointer underline"
            >{problems}</button
        >?
    </h1>
</div>
