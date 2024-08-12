<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { Scene3d } from "./js/index.js";
let viewer = null;
onMounted(() => {
  viewer = new Scene3d.Viewer("scene-container", {
    isStat: true,
    isAxesHelper: true,
    isClick: false,
  });
  viewer._modelLoader.loadModelToScene(
    [
      "city-v1.glb",
      "zuo.glb",
      "75.gltf",
      "billboard_-_lowpoly.glb",
      "car13.gltf",
      "ren.glb",
      "tree_animate/scene.gltf",
      "car.gltf",
    ],
    (gltf) => {
      // console.log(gltf);
    },
    (progress) => {}
  );
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
