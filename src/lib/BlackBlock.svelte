<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        height: Number;
    }
    let el: HTMLElement;
    let { height } = $props();
    onMount(() => {
        el.style.height = `${height * 8}px`;
    });
    export { el };
</script>

<div class="bg-black w-6" bind:this={el}></div>
