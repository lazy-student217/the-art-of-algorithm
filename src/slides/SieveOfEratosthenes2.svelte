<script lang="ts">
    import { animate } from "motion";
    import SieveOfEratosthenesLargeExample from "../lib/SieveOfEratosthenesLargeExample.svelte";
    let grid: SieveOfEratosthenesLargeExample;
    let slide: HTMLElement;
    let playing = $state(false);
    let played = $state(false);

    async function play() {
        if (!playing) {
            playing = true;
            const side_length = 30;
            const length = 900;
            const init_animations = [];
            for (let i = 0; i < side_length; i += 1) {
                for (let j = 0; j < side_length; j += 1) {
                    init_animations.push(
                        animate(
                            grid.grid_cell[i][j],
                            {
                                backgroundColor: [
                                    "rgba(0, 0, 0, 0)",
                                    "var(--color-green-300)",
                                ],
                            },
                            { delay: (10 * i + j) * 0.01 },
                        ),
                    );
                }
            }
            await Promise.all(init_animations);
            played = true;
            const primes = Array.from({ length: length }, () => true);
            primes[0] = false;
            await animate(grid.grid_cell[0][0], {
                backgroundColor: "var(--color-red-300)",
            });
            for (let i = 1; i <= Math.sqrt(length); i += 1) {
                const ix = i % side_length;
                const iy = (i - ix) / side_length;
                if (primes[i]) {
                    await animate(grid.grid_cell[iy][ix], {
                        backgroundColor: "var(--color-indigo-300)",
                    });
                    const animations = [];
                    for (let n = (i + 1) * (i + 1); n <= length; n += i + 1) {
                        const nx = (n - 1) % side_length;
                        const ny = (n - 1 - nx) / side_length;
                        animations.push(
                            animate(
                                grid.grid_cell[ny][nx],
                                {
                                    backgroundColor: "var(--color-red-300)",
                                },
                                {
                                    delay:
                                        ((n - (i + 1) * (i + 1)) / (i + 1)) *
                                        0.01,
                                },
                            ),
                        );
                        primes[n - 1] = false;
                    }
                    await Promise.all(animations);
                    await animate(grid.grid_cell[iy][ix], {
                        backgroundColor: "var(--color-green-300)",
                    });
                } else {
                    await animate(
                        grid.grid_cell[iy][ix],
                        {
                            backgroundColor: [
                                "var(--color-red-300)",
                                "var(--color-indigo-300)",
                                "var(--color-red-300)",
                            ],
                        },
                        {
                            duration: 0.1,
                        },
                    );
                }
            }
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
    <button onclick={play}
        ><h1 class="text-5xl hover:scale-105 transition-all mb-auto">
            Sieve of Eratosthenes but even BIGGER
        </h1></button
    >

    <div class="p-4 flex flex-col items-center">
        <SieveOfEratosthenesLargeExample bind:this={grid} />
    </div>
</div>
