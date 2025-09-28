<script lang="ts">
    export const grid_cell: HTMLElement[][] = $state(
        Array.from({ length: 30 }, () =>
            Array.from({ length: 30 }, () => undefined!),
        ),
    );
</script>

<table>
    <tbody>
        {#each { length: 30 }, i}
            <tr>
                {#each { length: 30 }, j}
                    <td
                        class="border-1 border-black text-center w-6 h-6"
                        bind:this={grid_cell[i][j]}
                    >
                        <div class="block w-full h-full"></div>
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
