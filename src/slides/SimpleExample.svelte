<script lang="ts">
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
            <p>You are a manager of over 1000 libraries.</p>
            <br />
            <p>
                One day, your <i>pathological</i> boss told you find <br /> a
                library that has <b>exactly 10000</b> books.
            </p>
        </button>
    {:else if progress === 2}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={example_div}
            onclick={change_description}
        >
            <p>
                You have thought about search it library by library.
                <br />
                However, it's <i>painfully slow</i>.
                <br />
                It's a <b>linear</b>, <b>brute-force</b> search.
                <br />
                We have to think about <u>something else</u>. But...
            </p>
        </button>
    {:else if progress === 3}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={example_div}
            onclick={change_description}
        >
            <p>
                You have absolutely no idea how to find one. <br /> You have
                over 1000 libraries to search <br /> and it takes a
                <b>loooong</b>
                time to count how <br /> many books are in <b>one</b> library.
            </p>
        </button>
    {:else if progress === 4}
        <div class="text-5xl/relaxed text-center" bind:this={example_div}>
            <br />
            <p>Fortunately, there is a key message that you do know:</p>
            <p>The <b>order</b> of libraries' book count.</p>
            <br />
            <p>
                We can list out the libraries by the order <br /> of book count,
                called <b>sorting</b>.
            </p>
        </div>
    {:else}<button
            class="text-6xl/25 text-center"
            onclick={show_example}
            bind:this={simple_example}>Let's have a simple example!</button
        >{/if}
</div>
