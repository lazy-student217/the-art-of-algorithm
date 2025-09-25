<script lang="ts">
    import { animate } from "motion";
    import { flip } from "../lib/utils";
    import ShortOrder from "../lib/ShortOrder.svelte";
    import { tick } from "svelte";

    let slide: HTMLElement;
    let description: HTMLElement;
    let order: HTMLElement | undefined = $state(undefined);
    let showing_order = $state(false);

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

    async function show_order() {
        if (showing_order) {
            return;
        }
        await flip([description], () => {
            showing_order = true;
            return tick();
        });
        animate(order!, {
            opacity: [0, 1],
            y: [100, 0],
        });
    }
</script>

<div bind:this={slide} class="text-5xl/relaxed text-center">
    <button onclick={show_order} bind:this={description}>
        <p>Now, we have the sorted list of libraries.</p>
        <ShortOrder />
    </button>
    {#if showing_order}
        <div class="mt-[1em]" bind:this={order}>
            <p>
                It would be good if we can <i>not</i> search for <br /> some libraries
                using the order given.
            </p>
        </div>
    {/if}
</div>
