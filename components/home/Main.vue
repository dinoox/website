<template>
  <EffectFluid/>
  <CommonHeader/>
  <div class="position-relative w-100">
    <div id="canvas" class="w-100 h-100">
      <canvas id="canvas-bg" style="z-index: -2;"></canvas>
    </div>
    <div class="position-absolute d-flex flex-column justify-content-center"
         style="left: 5%; top: 6%; max-width: 685px;">
      <h1 class="title animate__animated animate__rollIn" style="font-size: 70px; line-height: 1.04">
        The Personal Website of Dinoox.
      </h1>
      <div class="animate__animated animate__fadeIn"
           style="line-height: 1.59; font-size: 18.662px; font-weight: 260; letter-spacing: -0.007326rem; margin-top: 1.5rem;">
        CodePen is the best place to build, test, and discover front-end code. CodePen is a social development
        environment for front-end designers and developers. Build and deploy a website, show off your work, build test
        cases to learn and debug, and find inspiration.
      </div>
    </div>
    <EffectFog />
  </div>
  <HomeBlog/>
  <HomeResume/>
  <CommonFooter/>
</template>

<style>
.title {
  background: linear-gradient(135deg, hsla(0, 0%, 100%, 0) 56%, #ffcaba 98%), linear-gradient(25deg, #f5d1ff 23%, #fff 60%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<script>
import * as THREE from 'three';
import {PointLight} from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';

export default {
  data: () => ({
    pointLight: PointLight
  }),
  mounted() {
    this.initThree()
    addEventListener('mousemove', e => this.pointLight.position.set(e.clientX - (e.clientX/2), e.clientY- (e.clientY/2), 200))
  },
  methods: {
    initThree() {
      let camera, scene, renderer
      const init = () => {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
        camera.position.z = 250

        // scene
        scene = new THREE.Scene()

        // light
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.3)
        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(0, 0, 0)
        this.pointLight = pointLight

        scene.add(ambientLight, pointLight)
        scene.add(camera)

        // model
        new MTLLoader()
            .setPath('/model/')
            .load('male02.mtl', function (materials) {
              materials.preload()

              new OBJLoader()
                  .setPath('/model/')
                  .setMaterials(materials)
                  .load('male02.obj', function (object) {

                    object.position.y = -95
                    scene.add(object)

                  })

            })

        renderer = new THREE.WebGLRenderer({antialias: true, canvas: document.getElementById('canvas-bg')})
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.setPixelRatio(devicePixelRatio)
        renderer.setSize(innerWidth, innerHeight)
        addEventListener('resize', onWindowResize)
      }
      init();
      animate();

      function onWindowResize() {
        camera.aspect = innerWidth / innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
      }

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
    }
  },
}
</script>