<template>
  <div>
    <VueWatermark :text="'Your Custom Watermark'">
      <!-- Your content here -->
      <div>Some content</div>
    </VueWatermark>
  </div>
</template>

<script>
import VueWatermark from './VueWatermark.vue';

export default {
  components: {
    VueWatermark
  }
};
</script>
