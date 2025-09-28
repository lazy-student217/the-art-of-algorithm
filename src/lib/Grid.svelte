<script lang="ts">
    import { animate, type AnimationPlaybackControlsWithThen } from "motion";

    interface Props {
        grid: (number | null)[][];
        large?: boolean;
    }
    const { grid: grid_props, large = false }: Props = $props();
    let grid = $state(grid_props);

    let grid_span: HTMLSpanElement[][] = $state(
        Array.from({ length: grid.length }, () =>
            Array(grid[0].length).fill(undefined),
        ),
    );

    let grid_cell: HTMLTableCellElement[][] = $state(
        Array.from({ length: grid.length }, () =>
            Array(grid[0].length).fill(undefined),
        ),
    );

    export { grid_span, grid, grid_cell };

    function move_element(
        el: HTMLElement,
        x: number,
        y: number,
    ): AnimationPlaybackControlsWithThen {
        const bounds = el.getBoundingClientRect();
        const dx = x - bounds.x;
        const dy = y - bounds.y;
        return animate(el, {
            x: dx,
            y: dy,
        });
    }

    async function move_element_fade(
        el: HTMLElement,
        x: number,
        y: number,
    ): Promise<void> {
        const bounds = el.getBoundingClientRect();
        const dx = x - bounds.x;
        const dy = y - bounds.y;
        await animate(el, {
            x: dx,
            y: dy,
            opacity: 0.4,
        });
        await animate(
            el,
            {
                opacity: 0,
            },
            { duration: 0.1 },
        );
    }

    export async function move_copy_to_fade(
        i1: number,
        j1: number,
        i2: number,
        j2: number,
    ): Promise<void> {
        const span1_origin = grid_span[i1][j1];
        const span1 = span1_origin.cloneNode(true) as HTMLSpanElement;
        const bound1 = span1_origin.getBoundingClientRect();
        span1.style.position = "absolute";
        span1.style.top = `${bound1.y + window.screenY}px`;
        span1.style.left = `${bound1.x + window.scrollX}px`;
        document.body.appendChild(span1);
        const span2 = grid_span[i2][j2];
        const bounds2 = span2.getBoundingClientRect();
        await move_element_fade(span1, bounds2.x, bounds2.y);
        span1.remove();
    }

    export async function swap(
        i1: number,
        j1: number,
        i2: number,
        j2: number,
    ): Promise<void> {
        const span1 = grid_span[i1][j1];
        const bounds1 = span1.getBoundingClientRect();
        const span2 = grid_span[i2][j2];
        const bounds2 = span2.getBoundingClientRect();
        const anim1 = move_element(span1, bounds2.x, bounds2.y);
        const anim2 = move_element(span2, bounds1.x, bounds1.y);
        await Promise.all([anim1, anim2]);
        const tmp = grid[i1][j1];
        grid[i1][j1] = grid[i2][j2];
        grid[i2][j2] = tmp;
    }

    const cell_class = $derived(
        `border-2 border-black text-center ${large ? "min-w-18 h-18" : "min-w-16 h-16"} rounded-lg`,
    );
    const span_class = $derived(
        `inline-block ${large ? "text-4xl" : "text-3xl"}`,
    );
</script>

<table class="border-separate">
    <tbody>
        {#each grid as row, i}
            <tr>
                {#each row as item, j}
                    <td class={cell_class} bind:this={grid_cell[i][j]}>
                        {#key item}
                            <span
                                class={span_class}
                                bind:this={grid_span[i][j]}
                            >
                                {item}
                            </span>
                        {/key}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
