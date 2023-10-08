<template>
    <div class="watermark-container">
        <slot></slot>
        <div class="watermark" v-html="watermarkText"></div>
    </div>
</template>
  
<script>
export default {
    props: ['text'],
    computed: {
        watermarkText() {
            return this.text || 'Default Watermark';
        }
    }
}
</script>
  
<style scoped>
.watermark-container {
    position: relative;
}

.watermark {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
}
</style>
  