import * as THREE from 'three';

let infoDisplay = document.getElementById('infoDisplay')
let infoDisplayCanvas = document.getElementById('infoDisplayCanvas')

let expandButtonInfo = document.getElementById('expandButtonInfo')

let buttonOn = false
expandButtonInfo.addEventListener("click", function (e) {
  if (buttonOn==false) {
    infoDisplay.style.display = 'block'
    animateCSS('#infoDisplay', 'slideInDown');
    buttonOn = true
  } else {
    animateCSS('#infoDisplay', 'slideOutUp').then((message) => {
      infoDisplay.style.display = 'none'
      buttonOn = false
    });
  }
});

let hemiLightDisplay, cloudsDisplay, waterworldmeshDisplay,dateDisplay

var scene = new THREE.Scene();
var textureLoader = new THREE.TextureLoader();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 70000 );
camera.position.set(0, 0, 12300)
scene.add(camera)

var renderer = new THREE.WebGLRenderer({alpha: true});

renderer.setSize( window.innerWidth, window.innerHeight );
infoDisplayCanvas.appendChild( renderer.domElement );

// WaterWorld
var waterWorldGeometry = new THREE.SphereGeometry( 30,60,60 );

var material = new THREE.MeshPhongMaterial ( 
  { 
    map: textureLoader.load('../three/textures/watermap.png', function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    normalMap: textureLoader.load( '../three/textures/waternormals.jpg', function ( texture ) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    color: 0x0000FF,

    displacementScale: 0.06,

    reflectivity: 0.1, 
    shininess: 0.1,
  } 

);

waterworldmeshDisplay = new THREE.Mesh( waterWorldGeometry, material );

var customMaterial = new THREE.ShaderMaterial( 
{
  uniforms: 
  { 
    "c":   { type: "f", value: 0.8 },
    "p":   { type: "f", value: 5.1 },
    glowColor: { type: "c", value: new THREE.Color(0x0000FF) },
    viewVector: { type: "v3", value: camera.position }
  },
  vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

var glowGeometry = new THREE.SphereGeometry(32, 64, 64)
var atmosphereGlow = new THREE.Mesh( glowGeometry,customMaterial);

let cloudGeo = new THREE.SphereGeometry(30.5, 64, 64)
let cloudsMat = new THREE.MeshStandardMaterial({
  alphaMap: textureLoader.load('../three/textures/clouds.jpg'),
  transparent: true,
})

cloudsDisplay = new THREE.Mesh(cloudGeo, cloudsMat)

const waterworld = new THREE.Group();
waterworld.add(waterworldmeshDisplay)
waterworld.add(cloudsDisplay)
waterworld.add(atmosphereGlow)
waterworld.position.set(-170, 0, 12000)
scene.add(waterworld)

hemiLightDisplay = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
hemiLightDisplay.color.setHSL( 0.6, 1, 0.6 );
hemiLightDisplay.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLightDisplay.position.set( 0, 0, 0 );
scene.add(hemiLightDisplay)

// moon.rotation.x = 3.1415*0.02;
// moon.rotation.y = 3.1415*1.54;


function animate() {
	requestAnimationFrame( animate );
  waterworldmeshDisplay.rotation.y += -0.000090;
  waterworldmeshDisplay.rotation.x += -0.000090;
  dateDisplay = Date.now() * 0.0001;
  cloudsDisplay.rotateY(0.00020)
	renderer.render( scene, camera );
}

animate();


function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);
