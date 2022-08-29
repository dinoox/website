<template>
    <div class="canvas-outer">
        <canvas id="bg-canvas"></canvas>
    </div>

</template>
<script>
export default {
    head() {
        // 引入js,css
        return {
            script: [
                { src: 'js/script.js', body: true }
            ]
        }
    }
}   
</script>

<script setup>
onMounted(() => {

})
</script>

<style scoped>
.canvas-outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

#bg-canvas {
    position: fixed;
    top: 0;
    right: auto;
    display: inline-block;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>