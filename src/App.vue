<script setup>
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import { Scene3d } from "./js/index.js";
let viewer = shallowRef(null);
onMounted(() => {
  viewer = new Scene3d.Viewer("scene-container", {
    isStat: true,
    isAxesHelper: true,
    isClick: false,
  });
  console.log(viewer);
});
onBeforeUnmount(() => {
  viewer.destroy();
});
</script>

<template>
  <div id="scene-container"></div>
</template>

<style scoped>
#scene-container {
  width: 100%;
  height: 100%;
}
</style>
