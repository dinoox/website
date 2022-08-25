<template>
  <div class="magic w-100 vh-100 d-flex overflow-hidden position-relative">
    <div id="drag-container">
      <div id="spin-container">
        <!-- Add your images (or video) here -->
        <img
            src="https://images.pexels.com/photos/206395/pexels-photo-206395.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">
        <img
            src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">
        <img
            src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">
        <img
            src="https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">
        <img
            src="https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">
        <img
            src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="">

        <!-- Example image with link -->
        <a target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
          <img
              src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="">
        </a>

        <!-- Example add video  -->
        <video controls autoplay="autoplay" loop>
          <source
              src="https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761"
              type="video/mp4">
        </video>

        <!-- Text at center of ground -->
        <p>Dinoox Blog Category</p>
      </div>
      <div id="ground"></div>
    </div>
  </div>
</template>

<style>
.magic {
  z-index: 5;
  perspective: 1000px;
  transform-style: preserve-3d;
}

#drag-container, #spin-container {
  position: relative;
  display: flex;
  margin: auto;
  transform-style: preserve-3d;
  transform: rotateX(-10deg);
}

#drag-container img, #drag-container video {
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  box-shadow: 0 0 8px #fff;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
}

#drag-container img:hover, #drag-container video:hover {
  box-shadow: 0 0 15px #fffd;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
}

#drag-container p {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(90deg);
  color: #fff;
}

#ground {
  width: 900px;
  height: 900px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(90deg);
  background: -webkit-radial-gradient(center center, farthest-side, #9993, transparent);
}

@keyframes spin {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

@keyframes spinRevert {
  from {
    transform: rotateY(360deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>

<script>
export default {
  name: "carousel",
  mounted() {

    let radius = 240,
        autoRotate = true,
        rotateSpeed = -60
    
    let imgWidth = 120,
        imgHeight = 170

    setTimeout(init, 1000)

    let drag = document.getElementById('drag-container'),
        spin = document.getElementById('spin-container')

    let images = spin.getElementsByTagName('img'),
        videos = spin.getElementsByTagName('video')

    let elements = [...images, ...videos];

    // Size of images
    spin.style.width = imgWidth + "px";
    spin.style.height = imgHeight + "px";

    // Size of ground - depend on radius
    let ground = document.getElementById('ground');
    ground.style.width = ground.style.height = radius * 3 + "px";

    function init(delayTime) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transform = "rotateY(" + (i * (360 / elements.length)) + "deg) translateZ(" + radius + "px)";
        elements[i].style.transition = "transform 1s";
        elements[i].style.transitionDelay = delayTime || (elements.length - i) / 4 + "s";
      }
    }

    function applyTransform(obj) {
      // Constrain the angle of camera (between 0 and 180)
      if (tY > 180) tY = 180; if (tY < 0) tY = 0;

      // Apply the angle
      obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
    }

    function playSpin(yes) {
      spin.style.animationPlayState = (yes ? 'running' : 'paused');
    }

    let desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

    // auto spin
    if (autoRotate) {
      let animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
      spin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }


    // setup events
    document.onpointerdown = function (e) {
      clearInterval(drag.timer);
      let sX = e.clientX,
          sY = e.clientY;

      console.log(this)

      this.onpointermove = function (e) {
        let nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(drag);
        sX = nX;
        sY = nY;
      };

      this.onpointerup = function (e) {
        drag.timer = setInterval(function () {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(drag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(drag.timer);
            playSpin(true);
          }
        }, 17);
        this.onpointermove = this.onpointerup = null;
      };
      return false;
    };

    document.onmousewheel = (e) => {
      radius += e.wheelDelta / 20 || -e.detail;
      init(1);
    };

  }
}
</script>
