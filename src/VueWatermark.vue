<template>
    <div ref="containerRef" style="position: relative;">
        <slot></slot>
        <canvas ref="watermarkRef" :style="{ position: 'absolute', zIndex: 9999, pointerEvents: 'none' }"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import debounce from 'lodash/debounce';

const props = defineProps({
    text: {
        type: String,
        default: 'Default Watermark',
    },
});

const watermarkRef = ref(null);
const containerRef = ref(null);
const dynamicColor = 'rgba(0, 0, 0, 0.7)';

const draw = () => {
    const canvas = watermarkRef.value;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px Arial';
    ctx.fillStyle = dynamicColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const { width, height } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    ctx.fillText(props.text, width / 2, height / 2);
};

const drawIfRemoved = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.removedNodes.length > 0) {
            for (const node of mutation.removedNodes) {
                if (node === watermarkRef.value) {
                    draw();
                    return;
                }
            }
        }
    }
};

const debouncedDraw = debounce(draw, 200);

onMounted(() => {
    draw();

    const onResize = () => draw();
    window.addEventListener('resize', onResize);

    const observer = new MutationObserver((mutationsList) => {
        debouncedDraw();
        drawIfRemoved(mutationsList);
    });
    observer.observe(containerRef.value, { childList: true });

    const resizeObserver = new ResizeObserver(() => draw());
    resizeObserver.observe(containerRef.value);

    onUnmounted(() => {
        observer.disconnect();
        window.removeEventListener('resize', onResize);
        resizeObserver.disconnect();
    });
});

watch(props.text, () => {
    draw();
});
</script>
