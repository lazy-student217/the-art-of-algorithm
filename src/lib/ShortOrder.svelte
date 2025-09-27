<script lang="ts">
    interface Props {
        slots: string[];
        span_class?: string;
    }
    const { slots, span_class = "text-4xl" }: Props = $props();
    export const slot_divs: (HTMLElement | undefined)[] = $state(
        Array(slots.length).fill(undefined),
    );
    export { slots };
</script>

<div class="w-fit mx-auto">
    <div class="flex gap-1 justify-center pt-6 pb-2 px-32">
        {#each slots as slot, i}
            <div
                bind:this={slot_divs[i]}
                class={`border-2 w-18 h-18 flex items-center justify-center rounded-md border-black font-bold ${span_class}`}
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
