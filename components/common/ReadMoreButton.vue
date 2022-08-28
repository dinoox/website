<template>
    <div class="d-flex justify-content-center">
        <div ref="box" style="transform: translate(0px, 0px); transition: all .5s;" @mousemove="handle" @mouseleave="handleMouseleave">
            <a href="#" class="readmore-button" style="transform: rotate(45deg);">
                <i class="readmore-button__outer">
                    <span class="readmore-button__text">
                        <img src="https://advanced.team/assets/img/icons/readmore-text.svg" alt="Read more Awards"
                            draggable="false">
                    </span>
                    <span class="readmore-button__ico">
                        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 40C15 40 15 18.9683 15 -9.53674e-07M15 -9.53674e-07C15 13.7026 1 16.2319 1 16.2319M15 -9.53674e-07C15 13.7026 29 16.2319 29 16.2319"
                                stroke="white" stroke-width="2"></path>
                        </svg>
                    </span>
                </i>
            </a>
        </div>
    </div>
</template>

<script setup>
const box = ref(null)
function handle(e) {
    let x = e.offsetX,
        y = e.offsetY,
        refX = (x - 90) / 90 * 45,
        refY = (y - 90) / 90 * 45;

    // console.log(e.target);

    console.log(refX, refY);
    box.value.style.transform = `translate(${refX}px, ${refY}px)`
}

function handleMouseleave(){
        box.value.style.transform = `translate(${0}px, ${0}px)`
}
</script>


<style scoped>
.readmore-button {

    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    position: relative;
    z-index: 1;
    display: block;
    width: 11.25rem;
    height: 11.25rem;
    border-radius: 50%;
}

.readmore-button:before {
    border: 1px solid #fff;
    transform: scale(.99);
}

.readmore-button:after {
    transition: transform .75s;
    transform: scale(0);
    background-color: #fff;
}

.readmore-button:after,
.readmore-button:before {
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    bottom: auto;
    left: 0;
    right: auto;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    border-radius: 50%;
}

.readmore-button__outer {

    height: 100%;
    position: absolute;
    bottom: auto;
    left: 0;
    right: auto;
    top: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    mix-blend-mode: difference;
}

.readmore-button__text {
    display: block;
    position: relative;
    width: 88%;
    height: 88%;
    opacity: 0;
    transition: opacity calc(0.75s/2);
    transition-delay: 0s;
    transition-timing-function: ease;
    animation-name: readmore-button-text-rotation;
    animation-duration: 6s;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
}

.readmore-button__ico,
.readmore-button__text img,
.readmore-button__text svg {
    height: 100%;
    position: absolute;
    bottom: auto;
    left: 0;
    right: auto;
    top: 0;
    width: 100%;
}

svg {
    pointer-events: none;
}

html:not(.v-mobile-device) .readmore-button:hover .readmore-button__text {
    opacity: 1;
    transition: opacity 0.75s;
    transition-delay: calc(0.75s/2);
    transition-timing-function: ease;
}

html:not(.v-mobile-device) .readmore-button:hover:after {
    transform: scale(1);
}

.readmore-button__ico {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

@keyframes readmore-button-text-rotation {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(-1turn);
    }
}
</style>