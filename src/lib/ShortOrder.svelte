<script lang="ts">
    const slots = ["A", "C", "D", "F", "B", "H", "E", "G"];
    export const slot_divs: (HTMLElement | undefined)[] = Array(
        slots.length,
    ).fill(undefined);
</script>

<div class="w-fit mx-auto">
    <div class="flex gap-1 justify-center pt-6 pb-2 px-32">
        {#each slots as slot, i}
            <div
                bind:this={slot_divs[i]}
                class="border-2 w-16 h-16 flex items-center justify-center rounded-md border-black text-4xl font-bold"
            >
                {slot}
            </div>
        {/each}
    </div>
    <div class="flex text-3xl px-14 text-gray-700">
        <p class="text-3xl mr-auto">Less book</p>
        <p class="text-3xl ml-auto">More book</p>
    </div>
</div>
