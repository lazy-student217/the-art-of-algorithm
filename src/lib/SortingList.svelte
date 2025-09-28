<script lang="ts">
    import { animate, type AnimationPlaybackControlsWithThen } from "motion";
    import { onMount, tick } from "svelte";

    export { arr, el_list };

    let container: HTMLElement;
    let arr: number[] = $state([]);
    export const len = 30;
    export const num_limit = 40;
    export function reset_arr() {
        const new_arr: number[] = [];
        for (let i = 0; i < len; i += 1) {
            new_arr.push(Math.floor(Math.random() * num_limit) + 1);
        }
        if (arr.length !== 0) {
            for (const [i, el] of el_list.entries()) {
                animate(
                    el,
                    {
                        height: [arr[i] * 8, new_arr[i] * 8],
                    },
                    {
                        delay: i * 0.02,
                    },
                ).then(async () => {
                    arr[i] = new_arr[i];
                    await tick();
                    el_list[i].style.height = `${arr[i] * 8}px`;
                });
            }
        } else {
            arr = new_arr;
            tick().then(() => {
                for (const [i, el] of el_list.entries()) {
                    el.style.height = `${new_arr[i] * 8}px`;
                }
            });
        }
    }

    const el_list: HTMLElement[] = $state(
        Array.from({ length: len }, () => undefined!),
    );

    function move_element(
        el: HTMLElement,
        x: number,
    ): AnimationPlaybackControlsWithThen {
        const bounds = el.getBoundingClientRect();
        const dx = x - bounds.x;
        return animate(
            el,
            {
                x: [0, dx],
            },
            {
                duration: 0.05,
            },
        );
    }

    export async function swap(i: number, j: number): Promise<void> {
        const span1 = el_list[i];
        const bounds1 = span1.getBoundingClientRect();
        const span2 = el_list[j];
        const bounds2 = span2.getBoundingClientRect();
        await move_element(span1, bounds2.x);
        await move_element(span2, bounds1.x);
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        await tick();
        el_list[i].style.height = `${arr[i] * 8}px`;
        el_list[j].style.height = `${arr[j] * 8}px`;
    }

    onMount(() => {
        reset_arr();
        container.style.height = `${num_limit * 8}px`;
    });
</script>

<div class="flex gap-2 items-end" bind:this={container}>
    {#key arr}
        {#each arr as e, i}
            {#key e}
                <div class="bg-black w-6" bind:this={el_list[i]}></div>
            {/key}
        {/each}
    {/key}
</div>
