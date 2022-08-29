<template>
    <div class="footer position-relative overflow-hidden" style="margin-bottom: 200px;">
        <img class="hand" src="/img/hand.png" alt="hand">
        <div class="wrap">
            <div class="sphere">
            </div>
        </div>
    </div>
</template>


<style scoped>
.footer {
    height: 384px;
}

.hand {
    width: 28rem;
    top: 50%;
    left: 0;
    right: auto;
    transform: rotate(160deg);
    position: absolute;
}

.wrap {
    left: 5%;
    top: 20%;
    position: absolute;
    animation: orbFloat 4s ease-in-out infinite alternate;
}

.sphere {
    position: relative;
    width: 10.625rem;
    height: 10.625rem;
}

.sphere:after,
.sphere:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.sphere:before {
    opacity: .5;
    width: 100%;
    height: 100%;
    background: radial-gradient(50% 50% at 50% 50%, #b8ff40 0, rgba(12, 245, 255, 0) 100%);
}

.sphere:after {
    width: 4.95rem;
    height: 4.95rem;
    border-radius: 100%;
    background: 50%/contain no-repeat url(/img/sphere.jpg);
}

@keyframes orbFloat {
    0% {
        transform: translateY(-20%);
    }

    100% {
        transform: translateY(20%);
    }
}
</style>