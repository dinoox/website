<template>
  <div class="position-relative w-100 vh-100">
    <div id="canvas" class="w-100 h-100">
      <canvas></canvas>
    </div>

    <div class="position-absolute" style="left: 5%; top: 15%;">
      <h1 class="title" style="font-size: 5rem; max-width: 700px;">
        The Personal Website of Dinoox.
      </h1>
    </div>


  </div>

</template>

<style>
.title {
  background: linear-gradient(135deg, hsla(0, 0%, 100%, 0) 56%, #ffcaba 98%), linear-gradient(25deg, #f5d1ff 23%, #fff 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<script>
import gsap from "gsap"
import * as THREE from "three"
import vertexShader from "/modules/shader/earth/vertexShader.glsl"
import fragmentShader from "/modules/shader/earth/fragmentShader.glsl"
import atmosphereVertexShader from "/modules/shader/atmosphere/vertexShader.glsl"
import atmosphereFragmentShader from "/modules/shader/atmosphere/fragmentShader.glsl"
export default {
  name: 'Header',
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {

      const canvas = document.querySelector("#canvas")
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000
      )

      camera.position.set(0, 0, 15)

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            globeTexture: {
              value: new THREE.TextureLoader().load("/img/earth.jpg")
            }
          },
        })
      )

      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
          vertexShader: atmosphereVertexShader,
          fragmentShader: atmosphereFragmentShader,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        })
      )
      atmosphere.scale.set(1.2, 1.2, 1.2)


      const group = new THREE.Group()
      group.add(sphere)
      scene.add(group)
      scene.add(atmosphere)

      const starGeometry = new THREE.BufferGeometry()
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })
      const starVertices = []

      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000
        const y = (Math.random() - 0.5) * 2000
        const z = -Math.random() * 2000
        starVertices.push(x, y, z)
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)

      const renderer = new THREE.WebGL1Renderer({
        antialias: true,
        canvas: document.querySelector('canvas')
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)



      const mouse = {
        x: undefined,
        y: undefined
      }
      addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = - (event.clientY / innerWidth) * 2 + 1
      })

      addEventListener('resize', () => {
        camera.updateProjectionMatrix()
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      })


      function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        sphere.rotation.y += 0.002
        gsap.to(group.rotation, {
          x: - mouse.y * 0.3,
          y: mouse.x * 0.5,
          duration: 2
        })
      }

      render()

    },
  },
}
</script>