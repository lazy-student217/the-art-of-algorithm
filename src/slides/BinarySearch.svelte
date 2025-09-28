<script lang="ts">
    import { animate } from "motion";
    import { tick } from "svelte";
    import ShortOrder from "../lib/ShortOrder.svelte";
    import { flip } from "../lib/utils";
    import { ArrowDown, ArrowRight, EqualApproximately } from "@lucide/svelte";
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
                step_html = "We choose the middle one to check.";
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
                step_html = "If there is multiple one, choose the left one.";
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
                step_html =
                    "It turns out F has 8521 books, less than 10000 books.";
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
                step_html =
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
                step_html =
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
                step_html = "Choose the left one.";
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
                step_html =
                    "It turns out that library H has 12107 books, more than 10000 books.";
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
                step_html =
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
                step_html = "We then check the only remaining library B.";
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
                step_html =
                    "It turns out library B has 10000 books, as desired!";
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
                <ShortOrder
                    slots={["A", "C", "D", "F", "B", "H", "E", "G"]}
                    bind:this={short_order}
                />
            </div>

            {#if subprogress! === 2}
                <p class="my-[1em]" bind:this={subprogress_div}>
                    If <b class="text-indigo-600">D</b> has exactly 10000 books,
                    <br />
                    then we are done!
                </p>
            {/if}
            {#if subprogress! === 3}
                <p class="my-[1em]" bind:this={subprogress_div}>
                    If <b class="text-indigo-600">D</b> has <i>less</i> than
                    10000 books, then we know that
                    <br />
                    all libraries having books <i>less</i> than
                    <b class="text-indigo-600">D</b>'s must <i>not</i> have exactly
                    10000 books.
                </p>
            {/if}
            {#if subprogress! === 4}
                <p class="my-[1em]" bind:this={subprogress_div}>
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
                To ensure we filter out as many as possible in each
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
                    <ShortOrder
                        slots={["A", "C", "D", "F", "B", "H", "E", "G"]}
                        bind:this={short_order}
                    />
                </div>
                <p
                    class="text-4xl/relaxed text-gray-600 mt-8"
                    bind:this={step_div}
                >
                    {@html step_html}
                </p>
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
                        1 library, any count of books <ArrowRight
                            class="inline wh-em"
                        /> 1 day to count books
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
                        It doesn't seem like it makes a big difference...
                    </p>
                {/if}
                {#if subprogress! === 5}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        However, maybe someone has found out, <br />
                        this is a <i>huge</i> improvement from linear searching!
                    </p>
                {/if}
                {#if subprogress! === 6}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>Filtering out half of libraries</p>
                        <ArrowDown class="wh-em" />
                        <p>
                            Find any library with arbitrary book within 3 days!
                        </p>
                    </div>
                {/if}
                {#if subprogress! === 7}
                    <p class="my-[1em]" bind:this={subprogress_div}>
                        This algorithm works even better when <br /> we got numerous
                        libraries to work with!
                    </p>
                {/if}
                {#if subprogress! === 8}
                    <div
                        class="my-[1em] flex flex-col items-center"
                        bind:this={subprogress_div}
                    >
                        <p>
                            Libraries needed to search have doubled (16
                            libraries)
                        </p>
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
                        <p>In math, for <Latex tex="n" /> libraries</p>
                        <ArrowDown class="wh-em" />
                        <p>
                            Binary Search: at most <Latex tex="\log_2(n)" /> days!
                            <br />
                            Linear Search: at worst
                            <Latex tex="n" /> days...
                        </p>
                    </div>
                {/if}
            </div>
        </button>
    {/if}
</div>
