<script lang="ts">
    import { ArrowDown } from "@lucide/svelte";
    import { animate } from "motion";
    import { tick } from "svelte";

    let slide: HTMLElement;
    let progress = $state(0);
    let description_div: HTMLElement | undefined = $state(undefined);

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

    async function change_description() {
        await animate(description_div!, { opacity: 0, y: [0, -100] });
        progress += 1;
        await tick();
        description_div!.style.opacity = "0";
        animate(description_div!, { opacity: [0, 1], y: [100, 0] });
    }
</script>

<div bind:this={slide}>
    {#if progress === 0}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>There is still much to explore!</p>
        </button>
    {:else if progress === 1}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>
                A* Algorithm, Array, Dijkstra's Algorithm, Priority queue,
                Euclid Algorithm, Floyd-Warshall Algorithm, Segment Tree, Binary
                Search, Tarjan's algorithm, Fenwick tree, Kahn's algorithm,
                Sorting, Binary Heap, Divide & Conquer, Set, Breadth-first
                Search, Depth-first Search, Trie, Dynamic Programming, Greedy,
                Hash table, Bellman-Ford Algorithm, Hashing, Fast Fourier
                Transform, Recursion, Backtracking, Graph, Brute-force,
                Levenshtein distance, Tree, Linked list, Queue, Binary Search
                Tree, Dynamic array, Red-Black Tree, Boyer-Moore majority vote
                algorithm, Sieve of Eratosthenes, Modular exponentiation,
                Monotonic Stack, Union Find, Two pointers, Sliding window,
                Multiset
            </p>
        </button>
    {:else if progress === 2}
        <button
            class="text-6xl/relaxed text-center"
            bind:this={description_div}
            onclick={change_description}
        >
            <p>and much more!</p>
            <p class="text-5xl">(I can talk about them for a whole week!)</p>
        </button>
    {:else if progress === 3}
        <button
            class="text-6xl/relaxed text-center"
            onclick={change_description}
            bind:this={description_div}
        >
            <p>
                Thousands computer scientists <br /> working on these algorithm!
                <br />
                Not for anything else but <br /> the beauty of algorithms!
            </p>
        </button>
    {:else if progress === 4}
        <button
            class="text-5xl/relaxed text-center"
            onclick={change_description}
            bind:this={description_div}
        >
            <p>
                Binary Search might seems very intuitive, obvious
                <br />
                (Maybe some of you wanted to shout out the answer)
                <br />
                But it has a lot of unexpected usecase!

                <br />
                It also turns out to be the <b>optimal</b> searching
                <br />
                way for general sorted list!
            </p>
        </button>
    {:else if progress === 5}
        <div class="text-6xl/relaxed text-center" bind:this={description_div}>
            <p>
                The Beauty of Algorithms <ArrowDown class="wh-em mx-auto" /> The
                Crystal of Human Wisdom
                <br />
                <span class="text-3xl"
                    >Of course, many other knowledge is also the crystal of
                    human wisdom!</span
                >
            </p>
        </div>
    {/if}
</div>
