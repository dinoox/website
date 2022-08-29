<template>
  <div
    class="header w-100 position-fixed justify-content-between align-items-center animate__animated animate__fadeInDown"
    :style="{ backgroundColor: background }" v-show="headerShow">
    <div class="logo pointer">
      <!-- <img :style="{ opacity: isHidden ? 0 : 1 }"
        src="/img/logo.png" height="36px" width="144px" alt=""> -->
    </div>
    <div class="nav d-flex align-item-center" style="font-size: 17px; font-weight: 250;">
      <span>Resume</span>
      <span><a href="#blog-intr">Blogs</a></span>
      <span>Repo</span>
    </div>
  </div>
</template>
  
<style scoped>
.header {
  top: 0;
  left: 0;
  z-index: 9;
  height: 81px;
  padding: 0 60px;
  display: flex;
}

.header,
img {
  transition: all .5s;
}

.nav span {
  opacity: .5;
  cursor: pointer;
  margin: 0 2.5rem;
  align-self: center;
  transition: all .5s !important;
}

.nav span:hover {
  opacity: 1;
}
</style>
<script setup>
import { ref, computed } from 'vue'

let transparent = `rgba(0, 0, 0, 0)`,
  back = `rgba(0, 0, 0, .75)`

let headerShow = ref(true)
let background = ref(transparent)


const isHidden = computed(() => {
  return background.value == transparent ? true : false
})

onMounted(() => {
  addEventListener('mousewheel', (e) => headerShow.value = e.wheelDelta < 0 ? false : true)
  addEventListener('scroll', () => background.value = window.pageYOffset > 500 ? back : transparent)
})



</script>