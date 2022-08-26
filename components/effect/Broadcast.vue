<template>
  <section class="marquee-header w-100 text-truncate">
    <div class="banner d-inline-block">
      &nbsp;Awards — Recognition —
    </div>
    <div v-for="n in 3" class="banner position-absolute d-inline-block" style="top: 0; left: 0;">
      &nbsp;Awards — Recognition —
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

let arr = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

let arrs = [arr, [...arr], [...arr], [...arr]]
let bannerWidth, speed;
let nodes = []


function init() {
  speed = 3;
  bannerWidth = document.querySelector('.banner').offsetWidth
  arrs[0][12] = 0
  arrs[1][12] = bannerWidth
  arrs[2][12] = bannerWidth * 2
  arrs[3][12] = bannerWidth * 3

  for (let i = 1; i <= 4; i++) {
    let node = document.querySelector(`.banner:nth-child(${i})`)
    nodes.push(node)
    node.style.transform = getMatrix3D(arrs[i - 1])
  }
}

function getMatrix3D(arr) {
  return `matrix3d(${arr.join(',')})`
}

function float() {
  for (let i = 1; i <= 4; i++) {
    let arr = arrs[i - 1];
    arr[12] <= -bannerWidth ? arr[12] = 3 * bannerWidth : arr[12] -= speed
    nodes[i - 1].style.transform = getMatrix3D(arr)
  }
  requestAnimationFrame(float)
}

onMounted(() => {
  init()
  float()
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