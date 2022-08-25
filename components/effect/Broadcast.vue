<template>
  <header class="marquee-header node-marquee" translate="no"
          style="width: 100%; overflow: hidden; white-space: nowrap;">
    <div class="node-marquee__el"
         style="display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 392.5, 0, 0, 1);">&nbsp;Awards
      — Recognition —
    </div>
    <div class="node-marquee__el"
         style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1336.5, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
    <div class="node-marquee__el"
         style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2280.5, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
    <div class="node-marquee__el"
         style="position: absolute; top: 0; left: 0; display: inline-block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -551.5, 0, 0, 1);">
      &nbsp;Awards — Recognition —
    </div>
  </header>
</template>

<script setup>
import {onMounted} from 'vue'

const {$decomposeMatrix3D} = useNuxtApp()

onMounted(() => {
  // let nodes = document.querySelectorAll('.node-marquee__el')
  // for (let node of nodes) {
  //   console.log(node.style.transform.x)
  //   node.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 392.5, 0, 0, 1)`
  //   console.log(node.style.transform)
  // }
  console.log($decomposeMatrix3D)

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