<template>
  <div>
    <VueWatermarkWithText></VueWatermarkWithText>
  </div>
</template>

<script>
import { getVueWatermarkWithText } from './path-to-your-entry-file';

export default {
  components: {
    VueWatermarkWithText: getVueWatermarkWithText("My Custom Text")
  }
}
</script>
