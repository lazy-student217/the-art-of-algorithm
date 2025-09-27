<script lang="ts">
    import { animate } from "motion";
    import { tick } from "svelte";
    import BinarySearchLargeExample from "../lib/BinarySearchLargeExample.svelte";
    import Latex from "../lib/Latex.svelte";

    let slide: HTMLElement;
    let show_exmaple_button: HTMLElement | undefined = $state(undefined);
    let progress = $state(0);
    let arr_component: BinarySearchLargeExample | undefined = $state(undefined);
    let example_div: HTMLElement | undefined = $state(undefined);
    let days = $state(0);
    let days_block: HTMLElement | undefined = $state(undefined);

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

    async function set_days(new_day: number) {
        if (new_day == days) {
            return;
        }
        await animate(
            days_block!,
            {
                opacity: [1, 0],
                x: [0, 50],
            },
            {
                duration: 0.1,
            },
        );
        days = new_day;
        await tick();
        days_block!.style.opacity = "0";
        await animate(
            days_block!,
            {
                opacity: [0, 1],
                x: [-50, 0],
            },
            {
                duration: 0.1,
            },
        );
    }

    async function show_example() {
        await animate(show_exmaple_button!, { opacity: 0, y: [0, -100] });
        progress = 1;
        await tick();
        example_div!.style.opacity = "0";
        animate(example_div!, { opacity: [0, 1], y: [100, 0] });
    }

    async function play_animation(i: number, j: number) {
        set_days(0);
        const refresh_animations: Promise<void>[] = [];
        const target_index = i * 32 + j;
        for (let i = 0; i < 32; i += 1) {
            for (let j = 0; j < 32; j += 1) {
                refresh_animations.push(
                    animate(arr_component!.grid_cell[i][j]!, {
                        backgroundColor: "rgba(0, 0, 0, 0)",
                    }).finished,
                );
            }
        }
        await Promise.all(refresh_animations);
        const length = 32 * 32;
        let l = 0;
        let r = length - 1;

        await animate(
            arr_component!.grid_cell[(target_index - (target_index % 32)) / 32][
                target_index % 32
            ]!,
            {
                backgroundColor: "var(--color-yellow-300)",
            },
        );
        let found = false;
        while (l < r) {
            const m = (l + r - ((l + r) % 2)) / 2;
            const mj = m % 32;
            const mi = (m - mj) / 32;
            await animate(arr_component!.grid_cell[mi][mj]!, {
                backgroundColor: "var(--color-indigo-300)",
            }),
                set_days(days + 1);
            const animations = [];
            if (m == target_index) {
                found = true;
                break;
            } else if (m < target_index) {
                for (let d = l; d <= m; d += 1) {
                    const dj = d % 32;
                    const di = (d - dj) / 32;
                    animations.push(
                        animate(arr_component!.grid_cell[di][dj]!, {
                            backgroundColor: "var(--color-red-300)",
                        }),
                    );
                }
                l = m + 1;
            } else {
                for (let d = m; d <= r; d += 1) {
                    const dj = d % 32;
                    const di = (d - dj) / 32;
                    animations.push(
                        animate(arr_component!.grid_cell[di][dj]!, {
                            backgroundColor: "var(--color-red-300)",
                        }),
                    );
                }
                r = m - 1;
            }
            await Promise.all(animations);
        }
        const m = ~~((l + r) / 2);
        const animations = [
            animate(arr_component!.grid_cell[(m - (m % 32)) / 32][m % 32]!, {
                backgroundColor: "var(--color-green-500)",
            }).finished,
        ];
        if (!found) {
            animations.push(set_days(days + 1));
        }
        await Promise.all(animations);
    }
</script>

<div bind:this={slide}>
    {#if progress === 1}
        <div bind:this={example_div} class="flex items-center">
            <div class="flex-col items-center px-12">
                <div class="flex flex-col text-4xl gap-8 items-center py-8">
                    <p class="text-gray-500">Size</p>
                    <Latex tex="32 \times 32 = 1024" />
                </div>
                <div class="flex flex-col text-4xl gap-8 items-center py-8">
                    <p class="text-gray-500">
                        Theoretical Max Search Count <br /> (Theoretical Max Days
                        Passed)
                    </p>
                    <Latex tex="\log_2(1024) = 11" />
                </div>
                <div class="flex flex-col text-5xl gap-8 items-center py-8">
                    <p class="text-gray-500">
                        Real Search Count <br /> (Real Days Passed)
                    </p>
                    <p bind:this={days_block} class="font-bold">{days}</p>
                </div>
            </div>
            <BinarySearchLargeExample
                bind:this={arr_component}
                callback={play_animation}
            />
        </div>
    {:else}<button
            class="text-6xl/25 text-center"
            onclick={show_example}
            bind:this={show_exmaple_button}
            >Let's see this at a large scale!</button
        >{/if}
</div>
