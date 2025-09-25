<script lang="ts">
    import { animate } from "motion";
    import { tick } from "svelte";
    import ShortOrder from "../lib/ShortOrder.svelte";
    import { flip } from "../lib/utils";

    let slide: HTMLElement;
    let progress = $state(1);
    let subprogress: number = $state(0);
    let progress1_div: HTMLElement | undefined = $state(undefined);
    let content_div: HTMLElement | undefined = $state(undefined);
    let description_div: HTMLElement | undefined = $state(undefined);
    let step_div: HTMLElement | undefined = $state(undefined);
    let step_text: string | undefined = $state(undefined);
    let short_order: ShortOrder | undefined = $state(undefined);
    let chosen_lib: HTMLElement | undefined = $state(undefined);

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
        await animate(content_div!, { opacity: 0, y: [0, -100] });
        progress += 1;
        subprogress = 0;
        await tick();
        content_div!.style.opacity = "0";
        animate(content_div!, { opacity: [0, 1], y: [100, 0] });
    }

    async function proceed_progress1() {
        if (subprogress === 0) {
            animate(short_order!.slot_divs[2]!, {
                backgroundColor: ["oklch(100% 0 0)", "var(--color-indigo-300)"],
            });
            animate(chosen_lib!, {
                color: ["oklch(0% 0 0)", "var(--color-indigo-600)"],
            });
            subprogress! += 1;
        } else if (subprogress === 1) {
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            animate(short_order!.slot_divs[2]!, {
                backgroundColor: [
                    "var(--color-indigo-300)",
                    "var(--color-green-500)",
                ],
            });
            animate(progress1_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 2) {
            await animate(progress1_div!, {
                opacity: 0,
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            for (const i of [0, 1]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: [
                        "oklch(100% 0 0)",
                        "var(--color-red-300)",
                    ],
                });
            }
            animate(short_order!.slot_divs[2]!, {
                backgroundColor: [
                    "var(--color-green-500)",
                    "var(--color-indigo-300)",
                ],
            });
            for (const i of [3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: [
                        "oklch(100% 0 0)",
                        "var(--color-green-300)",
                    ],
                });
            }
            animate(progress1_div!, {
                opacity: [0, 1],
            });
        } else if (subprogress === 3) {
            await animate(progress1_div!, {
                opacity: 0,
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            for (const i of [0, 1]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: [
                        "var(--color-red-300)",
                        "var(--color-green-300)",
                    ],
                });
            }
            for (const i of [3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: [
                        "var(--color-green-300)",
                        "var(--color-red-300)",
                    ],
                });
            }
            animate(progress1_div!, {
                opacity: [0, 1],
            });
        } else {
            await change_description();
        }
    }

    async function proceed_progress4() {
        if (subprogress === 0) {
            await flip([description_div!], () => {
                step_text = "We choose the middle one to check.";
                return tick();
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            animate(short_order!.slot_divs[3]!, {
                backgroundColor: ["oklch(100% 0 0)", "var(--color-yellow-300)"],
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: [
                    "oklch(100% 0 0 / 0%)",
                    "var(--color-yellow-300)",
                ],
            });
            subprogress! += 1;
        } else if (subprogress === 1) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text = "If there is multiple one, choose the left one.";
                return tick();
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: ["var(--color-yellow-300)", "oklch(100% 0 0)"],
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 2) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "It turns out F has 8521 books, less than 10000 books.";
                return tick();
            });
            animate(short_order!.slot_divs[3]!, {
                backgroundColor: [
                    "var(--color-yellow-300)",
                    "var(--color-indigo-300)",
                ],
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 3) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "All libraries having books less than F's, <br /> including F itself must not be our target.";
                return tick();
            });
            for (const i of [0, 1, 2, 3])
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-red-300)",
                });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 4) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "Again, choose the middle one between the remaining libraries.";
                return tick();
            });
            for (const i of [5, 6]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-yellow-300)",
                });
            }
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 5) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text = "Choose the left one.";
                return tick();
            });
            animate(short_order!.slot_divs[6]!, {
                backgroundColor: "oklch(100% 0 0)",
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 6) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "It turns out that library H has 12107 books, more than 10000 books.";
                return tick();
            });
            animate(short_order!.slot_divs[5]!, {
                backgroundColor: [
                    "var(--color-yellow-300)",
                    "var(--color-indigo-300)",
                ],
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 7) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "All libraries having books more than H's, <br /> including H itself must not be our target.";
                return tick();
            });
            for (const i of [5, 6, 7])
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-red-300)",
                });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 8) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text = "We then check the only remaining library B.";
                return tick();
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: "var(--color-yellow-300)",
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else if (subprogress === 9) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step_text =
                    "It turns out library B has 10000 books, as desired!";
                return tick();
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: "var(--color-green-600)",
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        }
    }
</script>

<div bind:this={slide}>
    {#if progress === 1}
        <button
            class="text-4xl/relaxed text-center"
            bind:this={content_div}
            onclick={proceed_progress1}
        >
            <div bind:this={description_div} class="w-fit mx-auto">
                <p class="text-5xl/relaxed w-fit mx-auto">
                    If we check only one libraries in the order, say <b
                        bind:this={chosen_lib}>D</b
                    >.
                </p>
                <ShortOrder bind:this={short_order} />
            </div>

            {#if subprogress! === 2}
                <p class="my-[1em]" bind:this={progress1_div}>
                    If <b class="text-indigo-600">D</b> has exactly 10000 books,
                    <br />
                    then we are done!
                </p>
            {/if}
            {#if subprogress! === 3}
                <p class="my-[1em]" bind:this={progress1_div}>
                    If <b class="text-indigo-600">D</b> has <i>less</i> than
                    10000 books, then we know that
                    <br />
                    all libraries having books <i>less</i> than
                    <b class="text-indigo-600">D</b>'s must <i>not</i> have exactly
                    10000 books.
                </p>
            {/if}
            {#if subprogress! === 4}
                <p class="my-[1em]" bind:this={progress1_div}>
                    If <b class="text-indigo-600">D</b> has <i>more</i> than
                    10000 books, then we know that
                    <br />
                    all libraries having books <i>more</i> than
                    <b class="text-indigo-600">D</b>'s must <i>not</i> have exactly
                    10000 books.
                </p>
            {/if}
        </button>
    {:else if progress === 2}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={change_description}
        >
            <p>
                This fliter allows us to search
                <br />
                only <i>essential</i> libraries.
            </p>
            <br />
            <p>
                To ensure we filter out as much as possible in each
                <br />
                case, we always choose <b>the middle one</b> to check.
            </p>
        </button>
    {:else if progress === 3}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={change_description}
        >
            <p>
                This <i>algorithm</i> is called <b>`Binary Search`</b>.
            </p>
            <br />
            <p>
                <b>Binary</b> means <i>two</i>, also meaning that we divide the
                <br />
                range into half each step.
            </p>
        </button>
    {:else if progress === 4}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={proceed_progress4}
        >
            <div>
                <div class="w-fit mx-auto" bind:this={description_div}>
                    <p class="my-4">
                        Too see this in real action, let's run it together!
                    </p>
                    <p class="my-4">
                        Assume only library B has exactly 10000 books.
                    </p>
                    <ShortOrder bind:this={short_order} />
                </div>
                <p
                    class="text-4xl/relaxed text-gray-600 mt-8"
                    bind:this={step_div}
                >
                    {@html step_text}
                </p>
            </div>
        </button>
    {/if}
</div>
