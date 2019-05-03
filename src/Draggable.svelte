<svelte:window
    bind:innerWidth={sw}
    bind:innerHeight={sh}
    on:mousemove={onMousemove}
    on:mouseup={onMouseup}
/>

<div
    bind:this={el}
    bind:offsetWidth={ow}
    bind:offsetHeight={oh}
    on:mousedown={onMousedown}
></div>

<script>
    import { onMount, tick } from 'svelte';

    let isDragging = false,
        mx = 0,
        my = 0,
        ox = 0,
        oy = 0,
        ow = 0,
        oh = 0,
        px = 0,
        py = 0,
        sw = 0,
        sh = 0,
        el;

    onMount(async () => {
        await tick();
        py = (sh - oh) / 2;
        px = (sw - ow) / 2;
    });

    $: if (el) {
        el.style.top = `${Math.max(0, Math.min(py, sh - oh))}px`;
        el.style.left = `${Math.max(0, Math.min(px, sw - ow))}px`;
        el.style.transform = `translate(${mx - ox}px, ${my - oy}px)`;
    }

    function onMousedown(event) {
        ox = event.clientX;
        oy = event.clientY;
        isDragging = true;
        onMousemove(event);
    }

    function onMouseup(event) {
        px = parseInt(el.getBoundingClientRect().left);
        py = parseInt(el.getBoundingClientRect().top);
        mx = ox = my = oy = 0;
        isDragging = false;
    }

    function onMousemove(event) {
        if (isDragging) {
            mx = event.clientX;
            my = event.clientY;
        }
    }
</script>

<style>
    div {
        position: absolute;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #FFF;
    }
</style>
