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
</script>

<div bind:this={slide}>
    <h1 class="text-7xl py-10 text-center">Thank you for listening!</h1>
    <h2 class="text-3xl/relaxed py-6 text-center">
        Open source on Github with MIT License
        <br />
        Built with Svelte, Tailwind and Motion
    </h2>
</div>
