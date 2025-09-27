<script lang="ts">
    import { render } from "katex";
    import { onMount } from "svelte";

    interface Props {
        display_mode?: boolean;
        tex: string;
    }

    let { display_mode = false, tex }: Props = $props();
    let el: HTMLElement;

    onMount(() => {
        render(tex, el, {
            displayMode: display_mode,
            throwOnError: false,
        });
    });
</script>

<span bind:this={el}></span>
