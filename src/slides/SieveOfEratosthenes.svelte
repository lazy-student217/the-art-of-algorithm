<script lang="ts">
    import { animate } from "motion";
    import Grid from "../lib/Grid.svelte";
    const original_grid = Array.from({ length: 10 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => 10 * i + j + 1),
    );
    let grid: Grid;
    let slide: HTMLElement;
    let playing = $state(false);
    let played = $state(false);

    async function play() {
        if (!playing) {
            playing = true;

            const init_animations = [];
            for (let i = 0; i < 10; i += 1) {
                for (let j = 0; j < 10; j += 1) {
                    init_animations.push(
                        animate(
                            grid.grid_cell[i][j],
                            {
                                backgroundColor: [
                                    "rgba(0, 0, 0, 0)",
                                    "var(--color-green-300)",
                                ],
                            },
                            { delay: (10 * i + j) * 0.025 },
                        ),
                    );
                }
            }
            await Promise.all(init_animations);

            played = true;
            const primes = Array.from({ length: 100 }, () => true);
            primes[0] = false;
            await animate(grid.grid_cell[0][0], {
                backgroundColor: "var(--color-red-300)",
            });
            for (let i = 1; i < 100; i += 1) {
                const ix = i % 10;
                const iy = (i - ix) / 10;
                if (primes[i]) {
                    await animate(grid.grid_cell[iy][ix], {
                        backgroundColor: "var(--color-indigo-300)",
                    });
                    const animations = [];
                    for (let n = (i + 1) * (i + 1); n <= 100; n += i + 1) {
                        const nx = (n - 1) % 10;
                        const ny = (n - 1 - nx) / 10;
                        animations.push(
                            animate(
                                grid.grid_cell[ny][nx],
                                {
                                    backgroundColor: "var(--color-red-300)",
                                },
                                {
                                    delay:
                                        ((n - (i + 1) * (i + 1)) / (i + 1)) *
                                        0.05,
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
    <button onclick={play} class="pb-4"
        ><h1 class="text-6xl hover:scale-110 transition-all">
            Sieve of Eratosthenes
        </h1></button
    >

    <div class="p-4 flex flex-col items-center">
        <Grid bind:this={grid} grid={original_grid} />
    </div>
</div>
