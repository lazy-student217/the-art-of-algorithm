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
    <button class="text-6xl/25 text-center">Let's have a simple example!</button
    >
</div>
