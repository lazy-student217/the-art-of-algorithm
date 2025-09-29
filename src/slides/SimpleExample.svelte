<script lang="ts">
    import { ArrowDown } from "@lucide/svelte";
    import { animate } from "motion";
    import { tick } from "svelte";

    let slide: HTMLElement;
    let simple_example: HTMLElement | undefined = $state(undefined);
    let progress = $state(0);
    let example_div: HTMLElement | undefined = $state(undefined);

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

    async function show_example() {
        await animate(simple_example!, { opacity: 0, y: [0, -100] });
        progress = 1;
        await tick();
        example_div!.style.opacity = "0";
        animate(example_div!, { opacity: [0, 1], y: [100, 0] });
    }

    async function change_description() {
        await animate(example_div!, { opacity: 0, y: [0, -100] });
        progress += 1;
        await tick();
        example_div!.style.opacity = "0";
        animate(example_div!, { opacity: [0, 1], y: [100, 0] });
    }
</script>

<div bind:this={slide}>
    {#if progress === 1}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={example_div}
            onclick={change_description}
        >
            <div>
                <h1 class="text-6xl font-bold my-10">Task</h1>
                <p>
                    Find a library that has <b>exactly 10000</b> <br /> books over
                    1000 libraries.
                </p>
            </div>
        </button>
    {:else if progress === 2}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={example_div}
            onclick={change_description}
        >
            <p>
                Searching it library by library...?
                <br />
                A <b>linear search</b> is <i>too slow</i>!
                <br />
                <i>Something else...?</i>
            </p>
        </button>
    {:else if progress === 3}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={example_div}
            onclick={change_description}
        >
            <p>
                Over <b>1000</b> libraries to search <br /> <br /> a
                <b>loooong</b>
                time to count how <br /> many books are in <b>one</b> library
            </p>
        </button>
    {:else if progress === 4}
        <div class="text-5xl/relaxed text-center" bind:this={example_div}>
            <br />
            <b>Key to solve the problem:</b>
            <p>The <b>order</b> of library's book count</p>
            <br />
            <p>
                Listing out the libraries by the order of book count
                <ArrowDown class="wh-em mx-auto" />
                <b>Sorting</b>
            </p>
        </div>
    {:else}<button
            class="text-6xl/25 text-center"
            onclick={show_example}
            bind:this={simple_example}>Let's have a simple example!</button
        >{/if}
</div>
