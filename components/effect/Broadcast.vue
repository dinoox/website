<template>
  <section class="marquee-header w-100 text-truncate position-relative">
    <div ref="banner1" class="banner d-inline-block">
      &nbsp;{{ firstWord }} — {{ lastWord }} —
    </div>
    <div ref="banner2" class="banner position-absolute d-inline-block" style="top: 0; left: 0;">
      &nbsp;{{ firstWord }} — {{ lastWord }} —
    </div>
    <div ref="banner3" class="banner position-absolute d-inline-block" style="top: 0; left: 0;">
      &nbsp;{{ firstWord }} — {{ lastWord }} —
    </div>
    <div ref="banner4" class="banner position-absolute d-inline-block" style="top: 0; left: 0;">
      &nbsp;{{ firstWord }} — {{ lastWord }} —
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps(['firstWord', 'lastWord'])
const banner1 = ref(null),
  banner2 = ref(null),
  banner3 = ref(null),
  banner4 = ref(null);



//
let arr = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

let arrs = [arr, [...arr], [...arr], [...arr]]
let banners = [banner1, banner2, banner3, banner4]
let bannerWidth, speed
let nodes = []


function init() {
  speed = 1.6;
  bannerWidth = banner1.value.offsetWidth
  arrs[0][12] = 0
  arrs[1][12] = bannerWidth
  arrs[2][12] = bannerWidth * 2
  arrs[3][12] = bannerWidth * 3

  for (let i = 1; i <= 4; i++) {
    let node = banners[i - 1].value
    nodes.push(node)
    node.style.transform = getMatrix3D(arrs[i - 1])
  }
}

function getMatrix3D(arr) {
  return `matrix3d(${arr.join(',')})`
}

function float() {
  for (let i = 1; i <= 4; i++) {
    let arr = arrs[i - 1]
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
  font-size: 5rem;
  margin: 6.25rem 0;
}

.banner {
  padding: 1.25rem 0;
  will-change: transform;
}
</style>