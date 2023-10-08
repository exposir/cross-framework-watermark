<template>
    <div class="watermark-container">
        <slot></slot>
        <canvas ref="watermarkCanvas" class="watermark"></canvas>
    </div>
</template>
  
<script>
export default {
    props: ['text'],
    data() {
        return {
            animationFrameId: null
        };
    },
    mounted() {
        this.animationFrameId = requestAnimationFrame(this.draw);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animationFrameId);
    },
    watch: {
        text: {
            immediate: true,
            handler() {
                this.animationFrameId && cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = requestAnimationFrame(this.draw);
            }
        }
    },
    methods: {
        draw() {
            const canvas = this.$refs.watermarkCanvas;
            const ctx = canvas.getContext('2d');

            // 清空Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 设置Canvas属性
            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 获取父元素尺寸
            const parent = canvas.parentElement;
            const { width, height } = parent.getBoundingClientRect();

            // 设置Canvas尺寸
            canvas.width = width;
            canvas.height = height;

            // 绘制水印
            ctx.fillText(this.text || 'Default Watermark', width / 2, height / 2);
        }
    }
};
</script>
  
<style scoped>
.watermark-container {
    position: relative;
}

.watermark {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
  