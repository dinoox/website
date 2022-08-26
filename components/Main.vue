<template>
  <div class="position-relative w-100 vh-100">
    <div id="canvas" class="w-100 h-100">
      <canvas />
    </div>
    <div class="position-absolute d-flex flex-column justify-content-center"
      style="left: 5%; top: 6%; max-width: 685px;">
      <h1 class="title animate__animated animate__rollIn" style="font-size: 5rem; line-height: 1.04">
        The Personal Website of Dinoox.
      </h1>
      <div class="animate__animated animate__fadeIn"
        style="line-height: 1.59; font-size: 1.333rem; font-weight: 260; letter-spacing: -0.007326rem; margin-top: 1.5rem;">
        CodePen is the best place to build, test, and discover front-end code. CodePen is a social development
        environment for front-end designers and developers. Build and deploy a website, show off your work, build test
        cases to learn and debug, and find inspiration.
      </div>
    </div>

    <HeaderFixed />
    <EffectFog />
  </div>

</template>

<style>
.title {
  background: linear-gradient(135deg, hsla(0, 0%, 100%, 0) 56%, #ffcaba 98%), linear-gradient(25deg, #f5d1ff 23%, #fff 60%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<script>
import gsap from "gsap"
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


export default {
  name: 'Header',
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {

      let hex;

      let camera, cameraTarget, scene, renderer;

      let group, textMesh1, textMesh2, textGeo, materials;

      let text = 'Dinoox',

        font = undefined,

        fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = 'bold'; // normal bold

      const height = 20,
        size = 70,
        hover = 30,
        curveSegments = 4,
        bevelThickness = 2,
        bevelSize = 1.5;

      const mirror = true;

      const fontMap = {
        'helvetiker': 0,
        'optimer': 1,
        'gentilis': 2,
        'droid/droid_sans': 3,
        'droid/droid_serif': 4
      };

      const weightMap = {
        'regular': 0,
        'bold': 1
      };

      const mouse = {
        x: undefined,
        y: undefined
      }

      const reverseFontMap = [];
      const reverseWeightMap = [];

      for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
      for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

      let targetRotation = 0;

      init();
      animate();

      function decimalToHex(d) {
        let hex = Number(d).toString(16);
        hex = '000000'.substring(0, 6 - hex.length) + hex;
        return hex.toUpperCase();
      }


      function init() {

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1500);
        camera.position.set(0, 400, 700);

        cameraTarget = new THREE.Vector3(0, 150, 0);

        // SCENE
        scene = new THREE.Scene();

        // LIGHTS
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
        dirLight.position.set(0, 0, 1).normalize();
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(0, 100, 90);
        scene.add(pointLight);

        pointLight.color.setHSL(Math.random(), 1, 0.5);
        hex = decimalToHex(pointLight.color.getHex());

        materials = [
          new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
          new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
        ];

        group = new THREE.Group();
        group.position.y = 100;

        scene.add(group);

        loadFont();

        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(10000, 10000),
          new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.6, transparent: true })
        );
        plane.position.y = 100;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        // Stars
        const starGeometry = new THREE.BufferGeometry()
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })
        const starVertices = []
        for (let i = 0; i < 6000; i++) {//clear array
          const x = (Math.random() - 0.5) * 1500
          const y = (Math.random() - 0.5) * 1500
          const z = -Math.random() * 1500
          starVertices.push(x, y, z)
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('canvas') });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // STATS

        addEventListener('mousemove', (event) => {
          mouse.x = (event.clientX / innerWidth) * 2 - 1
          mouse.y = -(event.clientY / innerWidth) * 2 + 1
        })

        // EVENTS
        window.addEventListener('resize', onWindowResize);

      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

      }


      function loadFont() {
        const loader = new FontLoader();
        loader.load('fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {
          font = response;
          refreshText();
        });
      }

      function createText() {

        textGeo = new TextGeometry(text, {
          font: font,
          size: size,
          height: height,
          curveSegments: curveSegments,

          bevelThickness: bevelThickness,
          bevelSize: bevelSize,
          bevelEnabled: true

        });

        textGeo.computeBoundingBox();

        const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

        textMesh1 = new THREE.Mesh(textGeo, materials);

        textMesh1.position.set(centerOffset, hover, 0);

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        group.add(textMesh1);

        if (mirror) {

          textMesh2 = new THREE.Mesh(textGeo, materials);

          textMesh2.position.x = centerOffset;
          textMesh2.position.y = -hover;
          textMesh2.position.z = height;

          textMesh2.rotation.x = Math.PI;
          textMesh2.rotation.y = Math.PI * 2;

          group.add(textMesh2);

        }
      }

      function refreshText() {
        group.remove(textMesh1);
        if (mirror) group.remove(textMesh2);
        if (!text) return;
        createText();
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
        group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
        camera.lookAt(cameraTarget);
        gsap.to(group.rotation, {
          x: -mouse.y * 0.15,
          y: mouse.x * 0.3,
          duration: 3
        })

        renderer.clear();
        renderer.render(scene, camera);
      }
    },
  },
}
</script>