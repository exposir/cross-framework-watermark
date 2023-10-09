<template>
    <div ref="containerRef" style="position: relative;">
        <slot></slot>
        <canvas ref="watermarkRef" :style="{ position: 'absolute', zIndex: 9999, pointerEvents: 'none' }"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import debounce from 'lodash/debounce';

// 定义组件的props
const props = defineProps({
    text: {
        type: String,
        default: 'Default Watermark',
    },
});

// 创建ref引用
const watermarkRef = ref(null);
const containerRef = ref(null);

// 定义水印颜色
const dynamicColor = 'rgba(0, 0, 0, 0.7)';

// 绘制水印函数
const draw = () => {
    const canvas = watermarkRef.value;
    const ctx = canvas.getContext('2d');
    // 清空现有内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设定绘制样式
    ctx.font = '30px Arial';
    ctx.fillStyle = dynamicColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 获取父容器尺寸，设置canvas尺寸
    const { width, height } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // 在canvas中央绘制文本
    ctx.fillText(props.text, width / 2, height / 2);
};

// 检测水印是否被移除，如果是则重新绘制
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

// 创建防抖版本的绘制函数
const debouncedDraw = debounce(draw, 200);

// 组件挂载和卸载的生命周期函数
onMounted(() => {
    // 初始绘制
    draw();

    // 窗口尺寸变化时重绘
    const onResize = () => draw();
    window.addEventListener('resize', onResize);

    // 创建DOM观察器，监听子节点变化
    const observer = new MutationObserver((mutationsList) => {
        debouncedDraw();
        drawIfRemoved(mutationsList);
    });
    observer.observe(containerRef.value, { childList: true });

    // 创建尺寸观察器，监听容器尺寸变化
    const resizeObserver = new ResizeObserver(() => draw());
    resizeObserver.observe(containerRef.value);

    // 组件卸载时清理
    onUnmounted(() => {
        observer.disconnect();
        window.removeEventListener('resize', onResize);
        resizeObserver.disconnect();
    });
});

// 监听text prop的变化，变化时重绘
watch(props.text, () => {
    draw();
});
</script>
