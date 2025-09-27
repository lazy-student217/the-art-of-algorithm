<script lang="ts">
    export const grid_cell: (HTMLElement | undefined)[][] = $state(
        Array.from({ length: 32 }, () =>
            Array.from({ length: 32 }, () => undefined),
        ),
    );
    interface Props {
        callback: (i: number, j: number) => void;
    }
    const { callback }: Props = $props();
</script>

<table>
    <tbody>
        {#each { length: 32 }, i}
            <tr>
                {#each { length: 32 }, j}
                    <td
                        class="border-1 border-black text-center w-6.5 h-6.5"
                        bind:this={grid_cell[i][j]}
                    >
                        <button
                            aria-labelledby="cell"
                            onclick={() => callback(i, j)}
                            class="block w-full h-full"
                        ></button>
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
