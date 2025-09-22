<script lang="ts">
    import { animate } from "motion";
    import Grid from "../lib/Grid.svelte";
    import { tick } from "svelte";

    let slide: HTMLSpanElement;
    let grid: Grid;

    let process = $state(0);

    async function proceed() {
        const turn_red = (el: HTMLElement) => {
            animate(el, {
                backgroundColor: [
                    "oklch(100% 0 0 / 0)",
                    "var(--color-red-200)",
                ],
            });
        };
        const turn_white = (el: HTMLElement) => {
            animate(el, {
                backgroundColor: [
                    "var(--color-red-200)",
                    "oklch(100% 0 0 / 0)",
                ],
            });
        };
        if (process === 0) {
            for (const i of [0, 1, 2]) {
                for (const j of [0, 1, 2]) {
                    turn_red(grid.grid_cell[i][j]);
                }
            }
        } else if (process === 1) {
            grid.grid[1][2] = 6;
            await tick();
            animate(grid.grid_span[1][2], {
                opacity: [0, 1],
                color: ["var(--color-red-900)"],
            });
            animate(grid.grid_span[1][0], {
                color: ["oklch(0% 0 0)", "var(--color-red-900)"],
            });
        } else if (process === 2) {
            animate(grid.grid_span[1][2], {
                opacity: [1, 0],
            }).then(() => {
                grid.grid[1][2] = null;
            });
            animate(grid.grid_span[1][0], {
                color: ["var(--color-red-900)", "oklch(0% 0 0)"],
            });

            for (const i of [0, 1, 2]) {
                for (const j of [0, 1, 2]) {
                    turn_white(grid.grid_cell[i][j]);
                }
            }
            for (const i of [3, 4, 5]) {
                for (const j of [6, 7, 8]) {
                    turn_red(grid.grid_cell[i][j]);
                }
            }
        } else if (process === 3) {
            for (const i of [3, 4, 5]) {
                for (const j of [6, 7, 8]) {
                    turn_white(grid.grid_cell[i][j]);
                }
            }
            for (const i of [6, 7, 8]) {
                for (const j of [3, 4, 5]) {
                    turn_red(grid.grid_cell[i][j]);
                }
            }
        } else if (process === 4) {
            for (const i of [6, 7, 8]) {
                for (const j of [3, 4, 5]) {
                    turn_white(grid.grid_cell[i][j]);
                }
            }
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_red(grid.grid_cell[i][3]);
            }
        } else if (process === 5) {
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_white(grid.grid_cell[i][3]);
            }
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_red(grid.grid_cell[i][7]);
            }
        } else if (process === 6) {
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_white(grid.grid_cell[i][7]);
            }
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_red(grid.grid_cell[2][i]);
            }
        } else if (process === 7) {
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_white(grid.grid_cell[2][i]);
            }
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_red(grid.grid_cell[5][i]);
            }
        } else if (process === 8) {
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                turn_white(grid.grid_cell[5][i]);
            }
        } else if (process === 9) {
            const cells: [[number, number], number][] = [
                [[0, 2], 4],
                [[0, 3], 6],
                [[0, 5], 8],
                [[0, 6], 9],
                [[0, 7], 1],
                [[0, 8], 2],
                [[1, 1], 7],
                [[1, 2], 2],
                [[1, 6], 3],
                [[1, 7], 4],
                [[1, 8], 8],
                [[2, 0], 1],
                [[2, 3], 3],
                [[2, 4], 4],
                [[2, 5], 2],
                [[2, 6], 5],
                [[2, 8], 7],
                [[3, 1], 5],
                [[3, 2], 9],
                [[3, 3], 7],
                [[3, 5], 1],
                [[3, 6], 4],
                [[3, 7], 2],
                [[4, 1], 2],
                [[4, 2], 6],
                [[4, 4], 5],
                [[4, 6], 7],
                [[4, 7], 9],
                [[5, 1], 1],
                [[5, 2], 3],
                [[5, 3], 9],
                [[5, 5], 4],
                [[5, 6], 8],
                [[5, 7], 5],
                [[6, 0], 9],
                [[6, 2], 1],
                [[6, 3], 5],
                [[6, 4], 3],
                [[6, 5], 7],
                [[6, 8], 4],
                [[7, 0], 2],
                [[7, 1], 8],
                [[7, 2], 7],
                [[7, 6], 6],
                [[7, 7], 3],
                [[8, 0], 3],
                [[8, 0], 3],
                [[8, 1], 4],
                [[8, 2], 5],
                [[8, 3], 2],
                [[8, 5], 6],
                [[8, 6], 1],
            ];
            for (const [[i, j], cell_val] of cells) {
                grid.grid[i][j] = cell_val;
            }
            await tick();
            for (const [[i, j], _] of cells) {
                animate(grid.grid_span[i][j], {
                    opacity: [0, 1],
                    color: ["var(--color-blue-700)"],
                });
            }
        }
        process += 1;
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
    <h1 class="text-6xl font-bold mb-8">
        <button onclick={proceed}>Sudoku</button>
    </h1>

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
