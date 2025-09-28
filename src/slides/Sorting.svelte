<script lang="ts">
    import { animate } from "motion";
    import SortingList from "../lib/SortingList.svelte";
    let list: SortingList;
    let slide: HTMLElement;
    let list_container: HTMLElement;
    let playing = $state(false);

    async function play_bubble_sort() {
        if (!playing) {
            playing = true;
            for (let i = 0; i < list.len - 1; i += 1) {
                let swapped = false;
                for (let j = 0; j < list.len - i - 1; j += 1) {
                    if (list.arr[j] > list.arr[j + 1]) {
                        await list.swap(j, j + 1);
                        swapped = true;
                    }
                }
            }
            playing = false;
        }
    }

    async function play_selection_sort() {
        if (!playing) {
            playing = true;
            for (let i = 0; i < list.len - 1; i += 1) {
                let min_index = i;
                animate(
                    list.el_list[min_index],
                    {
                        backgroundColor: "var(--color-green-300)",
                    },
                    {
                        duration: 0.1,
                    },
                );
                for (let j = i + 1; j < list.len; j += 1) {
                    await animate(
                        list.el_list[j],
                        {
                            backgroundColor: "var(--color-indigo-300)",
                        },
                        {
                            duration: 0.02,
                        },
                    );
                    if (list.arr[j] < list.arr[min_index]) {
                        await animate(
                            list.el_list[j],
                            {
                                backgroundColor: "var(--color-green-300)",
                            },
                            {
                                duration: 0.05,
                            },
                        ),
                            animate(
                                list.el_list[min_index],
                                {
                                    backgroundColor: "rgb(0, 0, 0)",
                                },
                                {
                                    duration: 0.05,
                                },
                            );

                        min_index = j;
                    } else {
                        await animate(
                            list.el_list[j],
                            {
                                backgroundColor: "rgb(0,0,0)",
                            },
                            {
                                duration: 0.02,
                            },
                        );
                    }
                }
                await animate(
                    list.el_list[min_index],
                    {
                        backgroundColor: "rgb(0, 0, 0)",
                    },
                    {
                        duration: 0.1,
                    },
                );
                list.swap(min_index, i);
            }
            playing = false;
        }
    }

    async function play_insertion_sort() {
        if (!playing) {
            playing = true;
            for (let i = 0; i < list.len; i += 1) {
                let j = i;
                while (j > 0 && list.arr[j - 1] > list.arr[j]) {
                    await list.swap(j, j - 1);
                    j -= 1;
                }
            }
            playing = false;
        }
    }

    async function play_quick_sort() {
        if (!playing) {
            playing = true;
            async function quicksort(low: number, high: number) {
                if (low < high && low >= 0) {
                    console.log("quicksort start", low, high);
                    let p = list.arr[high];
                    let i = low;
                    for (let j = low; j < high; j += 1) {
                        if (list.arr[j] <= p) {
                            await list.swap(i, j);
                            i += 1;
                        }
                        console.log("What are you waiting???");
                    }
                    await list.swap(i, high);
                    let res = i;
                    await quicksort(low, res - 1);
                    await quicksort(res + 1, high);
                }
            }

            await quicksort(0, list.len - 1);
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
    <button onclick={() => list.reset_arr()}>
        <h1 class="text-5xl hover:scale-105 transition-all mb-10">Sorting</h1>
    </button>

    <div class="flex gap-10">
        <button
            class="p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors text-3xl"
            onclick={play_bubble_sort}>Bubble Sort</button
        >
        <button
            class="p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors text-3xl"
            onclick={play_selection_sort}>Selection Sort</button
        >
        <button
            class="p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors text-3xl"
            onclick={play_insertion_sort}>Insertion Sort</button
        >
        <button
            class="p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors text-3xl"
            onclick={play_quick_sort}>Quick Sort</button
        >
    </div>

    <div class="p-4 flex flex-col items-center" bind:this={list_container}>
        <SortingList bind:this={list} />
    </div>
</div>
