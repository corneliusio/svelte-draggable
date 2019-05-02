<svelte:window on:mousemove={onMousemove} on:mouseup={onMouseup} />

<span style={`transform: translate(${mx - ox}px, ${my - oy}px)`}
    bind:this={el}
    bind:offsetWidth={ow}
    bind:offsetHeight={oh}
    on:mousedown={onMousedown}
></span>

<script>
    import { onMount, tick } from 'svelte';

    let isDragging = false,
        mx = 0,
        my = 0,
        ox = 0,
        oy = 0,
        ow = 0,
        oh = 0,
        el;

    onMount(async () => {
        await tick();
        mx = ox = parseInt(el.getBoundingClientRect().left + (ow / 2));
        my = oy = parseInt(el.getBoundingClientRect().top + (oh / 2));
    });

    function onMousedown(event) {
        isDragging = true;
        onMousemove(event);
        document.body.style.userSelect = 'none';
    }

    function onMouseup(event) {
        isDragging = false;
        document.body.style.userSelect = 'unset';
    }

    function onMousemove(event) {
        if (isDragging) {
            mx = event.clientX;
            my = event.clientY;
        }
    }
</script>

<style>
    span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: red;
        border: 2px solid darkred;
    }
</style>
