<script lang="ts">
    import { animate } from "motion";
    import { tick } from "svelte";
    import ShortOrder from "../lib/ShortOrder.svelte";
    import { flip } from "../lib/utils";
    import {
        ArrowDown,
        ArrowRight,
        Cross,
        EqualApproximately,
        X,
    } from "@lucide/svelte";
    import Latex from "../lib/Latex.svelte";

    let slide: HTMLElement;
    let progress = $state(1);
    let subprogress: number = $state(0);
    let subprogress_div: HTMLElement | undefined = $state(undefined);
    let content_div: HTMLElement | undefined = $state(undefined);
    let description_div: HTMLElement | undefined = $state(undefined);
    let step_div: HTMLElement | undefined = $state(undefined);
    let step_html: string | undefined = $state(undefined);
    let short_order: ShortOrder | undefined = $state(undefined);
    let chosen_lib: HTMLElement | undefined = $state(undefined);
    let step = $state(0);

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
                backgroundColor: "var(--color-indigo-300)",
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
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 2) {
            await animate(subprogress_div!, {
                opacity: 0,
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            for (const i of [0, 1]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-red-300)",
                });
            }
            animate(short_order!.slot_divs[2]!, {
                backgroundColor: "var(--color-indigo-300)",
            });
            for (const i of [3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-green-300)",
                });
            }
            animate(subprogress_div!, {
                opacity: [0, 1],
            });
        } else if (subprogress === 3) {
            await animate(subprogress_div!, {
                opacity: 0,
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            for (const i of [0, 1]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-green-300)",
                });
            }
            for (const i of [3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-red-300)",
                });
            }
            animate(subprogress_div!, {
                opacity: [0, 1],
            });
        } else {
            await change_description();
        }
    }

    async function proceed_progress4() {
        if (subprogress === 0) {
            await flip([description_div!], () => {
                step += 1;
                return tick();
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            animate(short_order!.slot_divs[3]!, {
                backgroundColor: "var(--color-yellow-300)",
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: "var(--color-yellow-300)",
            });
            subprogress! += 1;
        } else if (subprogress === 1) {
            await animate(step_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                step += 1;
                return tick();
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: "rgba(0, 0, 0, 0)",
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
                step += 1;
                return tick();
            });
            animate(short_order!.slot_divs[3]!, {
                backgroundColor: "var(--color-indigo-300)",
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
                step += 1;
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
                step += 1;
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
                step += 1;
                return tick();
            });
            animate(short_order!.slot_divs[6]!, {
                backgroundColor: "rgba(0, 0, 0, 0)",
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
                step += 1;
                return tick();
            });
            animate(short_order!.slot_divs[5]!, {
                backgroundColor: "var(--color-indigo-300)",
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
                step += 1;
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
                step += 1;
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
                step += 1;
                return tick();
            });
            animate(short_order!.slot_divs[4]!, {
                backgroundColor: "var(--color-green-500)",
            });
            animate(step_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            subprogress! += 1;
        } else {
            await change_description();
        }
    }
    async function proceed_progress5() {
        if (subprogress === 0) {
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 1) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            for (const i of [0, 1, 2, 3, 4]) {
                await animate(
                    short_order!.slot_divs[i]!,
                    {
                        backgroundColor: "var(--color-indigo-300)",
                    },
                    { duration: 0.2 },
                );
            }
        } else if (subprogress === 2) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            const animations = [];
            for (const i of [0, 1, 2, 3, 4]) {
                animations.push(
                    animate(short_order!.slot_divs[i]!, {
                        backgroundColor: "rgba(0, 0, 0, 0)",
                    }),
                );
            }
            await Promise.all(animations);
            for (const i of [3, 5, 4]) {
                await animate(
                    short_order!.slot_divs[i]!,
                    {
                        backgroundColor: "var(--color-indigo-300)",
                    },
                    { duration: 0.2 },
                );
            }
        } else if (subprogress === 3) {
            const animations = [
                animate(subprogress_div!, {
                    opacity: [1, 0],
                    y: [0, 100],
                }),
            ];
            for (const i of [3, 5, 4]) {
                animations.push(
                    animate(short_order!.slot_divs[i]!, {
                        backgroundColor: "rgba(0, 0, 0, 0)",
                    }),
                );
            }
            await Promise.all(animations);
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 4) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            }),
                await flip([description_div!], () => {
                    subprogress! += 1;
                    return tick();
                });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 5) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "var(--color-yellow-300)",
                });
            }
        } else if (subprogress === 6) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                });
            }
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 7) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
                animate(short_order!.slot_divs[i]!, {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                });
            }
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 8) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 9) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
        } else if (subprogress === 10) {
            await animate(subprogress_div!, {
                opacity: [1, 0],
                y: [0, 100],
            });
            await flip([description_div!], () => {
                subprogress! += 1;
                return tick();
            });
            subprogress_div!.style.opacity = "0";
            animate(subprogress_div!, {
                opacity: [0, 1],
                y: [100, 0],
            });
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
                    Only checking <b bind:this={chosen_lib}>D</b>
                </p>
                <ShortOrder
                    slots={["A", "C", "D", "F", "B", "H", "E", "G"]}
                    bind:this={short_order}
                />
            </div>

            {#if subprogress! === 2}
                <p class="my-[1em]" bind:this={subprogress_div}>
                    <b class="text-indigo-600">D</b> = 10000 books <ArrowRight
                        class="inline wh-em"
                    /> done!
                </p>
            {/if}
            {#if subprogress! === 3}
                <p class="my-[1em]" bind:this={subprogress_div}>
                    <b class="text-indigo-600">D</b>
                    {"<"} 10000 books
                    <ArrowDown class="wh-em mx-auto" />
                    <X class="wh-em inline" color="red" /> all libraries having books
                    {"<"}
                    <b class="text-indigo-600">D</b>
                </p>
            {/if}
            {#if subprogress! === 4}
                <p class="my-[1em]" bind:this={subprogress_div}>
                    <b class="text-indigo-600">D</b>
                    {">"} 10000 books
                    <ArrowDown class="wh-em mx-auto" />
                    <X class="wh-em inline" color="red" /> all libraries having books
                    {">"}
                    <b class="text-indigo-600">D</b>
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
                Only search <i>essential</i> libraries
            </p>
            <br />
            <p>
                Filter out as many as possible in each step
                <ArrowDown class="wh-em mx-auto" />
                choose <b>the middle one</b> to check
            </p>
        </button>
    {:else if progress === 3}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={change_description}
        >
            <p>
                <b>Algorithm: Binary Search</b>
            </p>
            <br />
            <div>
                <b>Binary</b>: <i>two</i>
                <ArrowDown class="wh-em mx-auto" />
                <p>Dividing the search range into <i>half</i></p>
            </div>
        </button>
    {:else if progress === 4}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={proceed_progress4}
        >
            <div>
                <div class="w-fit mx-auto" bind:this={description_div}>
                    <p class="my-4">Let's run it together!</p>
                    <p class="my-4">
                        B: <span class="text-green-600">10000 books</span>
                    </p>
                    <ShortOrder
                        slots={["A", "C", "D", "F", "B", "H", "E", "G"]}
                        bind:this={short_order}
                    />
                </div>
                <div
                    class="text-4xl/relaxed text-gray-600 mt-8"
                    bind:this={step_div}
                >
                    {#if step === 1}
                        <p>Choose the middle one.</p>
                    {:else if step === 2}
                        <p>
                            Choose the left one when the middle cannot be
                            decided.
                        </p>
                    {:else if step === 3}
                        <p>F has 8500 books {"<"} 10000 books.</p>
                    {:else if step === 4}
                        <p>
                            All libraries that are in the left of F are
                            eliminated.
                        </p>
                    {:else if step === 5}
                        <p>Choose the middle one.</p>
                    {:else if step === 6}
                        <p>Choose the left one.</p>
                    {:else if step === 7}
                        <p>H has 12000 books {">"} 10000 books.</p>
                    {:else if step === 8}
                        <p>
                            All libraries that are in the right of H are
                            eliminated.
                        </p>
                    {:else if step === 9}
                        <p>
                            Choose the middle one, also the only remaining one.
                        </p>
                    {:else if step === 10}
                        <p>B has 10000 books, task completed!</p>
                    {/if}
                </div>
            </div>
        </button>
    {:else if progress === 5}
        <button
            class="text-5xl/relaxed text-center"
            bind:this={content_div}
            onclick={proceed_progress5}
        >
            <div>
                <div class="w-fit mx-auto" bind:this={description_div}>
                    <p class="my-4">
                        Why it is <i>much</i> faster?
                    </p>
                    <ShortOrder
                        slots={["A", "C", "D", "F", "B", "H", "E", "G"]}
                        bind:this={short_order}
                    />
                </div>
                {#if subprogress! === 1}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        1 library <ArrowRight class="inline wh-em" /> 1 day
                    </p>
                {/if}
                {#if subprogress! === 2}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        Linear Search: 5 days
                    </p>
                {/if}
                {#if subprogress! === 3}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        Binary Search: only <b>3</b> days
                    </p>
                {/if}
                {#if subprogress! === 4}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        Not super impressive...
                    </p>
                {/if}
                {#if subprogress! === 5}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        Actually, this is a <i>huge</i> improvement from linear search!
                    </p>
                {/if}
                {#if subprogress! === 6}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>Changing the number 10000</p>
                        <ArrowDown class="wh-em" />
                        <p>Find any library within 3 days!</p>
                    </div>
                {/if}
                {#if subprogress! === 7}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        Even better when we got more libraries to work with!
                    </p>
                {/if}
                {#if subprogress! === 8}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>Double libraries (16 libraries)</p>
                        <ArrowDown class="wh-em" />
                        <p>
                            Binary Search: still at most <b>4 days</b>!
                            <br />
                            Linear Search: at worst <b>16 days</b>...
                        </p>
                    </div>
                {/if}
                {#if subprogress! === 9}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>1000 libraries</p>
                        <ArrowDown class="wh-em" />
                        <p>
                            Binary Search: at most <b>10 days</b>!
                            <br />
                            Linear Search: at worst
                            <b
                                >1000 days <EqualApproximately
                                    class="wh-em inline"
                                /> 3 years</b
                            >...
                        </p>
                    </div>
                {/if}
                {#if subprogress! === 10}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>Mathematically, for <Latex tex="n" /> libraries</p>
                        <ArrowDown class="wh-em" />
                        <p>
                            Binary Search: at most <Latex tex="\log_2(n)" /> days!
                            <br />
                            Linear Search: at worst
                            <Latex tex="n" /> days...
                        </p>
                    </div>
                {/if}
                {#if subprogress! === 11}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>
                            Only knowing that Binary Search is <br /> much faster
                            is enough!
                        </p>
                    </div>
                {/if}
            </div>
        </button>
    {/if}
</div>
