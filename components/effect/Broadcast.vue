<template>
  <header class="marquee-header node-marquee" translate="no"
    style="width: 100%; overflow: hidden; white-space: nowrap;">
    <div class="float-font1"
      style="display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 392, 0, 0, 1);">
      &nbsp;Awards
      — Recognition —
    </div>
    <div class="float-font"
      style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1336, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
    <div class="float-font"
      style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2280, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
    <div class="float-font"
      style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -551, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'

const { $decomposeMatrix3D } = useNuxtApp()


let arr1 = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  392, 0, 0, 1
];

function changeX(node, width) {
  console.log("width", width);
  if (arr1[12] <= -width) arr1[12] = 4 * width
  console.log("xx");
  arr1[12] -= 5
  node.style.transform = "matrix3d(" + arr1.join(',') + ")"
  requestAnimationFrame(() => changeX(node, width))
}
onMounted(() => {
  const width = document.querySelector('.float-font1').offsetWidth
  let node = document.querySelector('.float-font1')

  node.style.transform = "matrix3d(" + arr1.join(',') + ")"


  requestAnimationFrame(() => changeX(node, width))
})
</script>

<style scoped>
.marquee-header {
  top: 4%;
  left: 0;
  position: absolute;
  font-size: 5.5rem;
}
</style>