import * as THREE from 'three';
import { OrbitControls } from '../three/controls/OrbitControls.js';
import { Lensflare, LensflareElement } from '../three/objects/Lensflare.js';

let hemiLight, skyboxGeo, skybox, clouds, waterworldmesh,sun,date
let orbitRadius = 12000
let canvas = document.getElementById('canvas')

var scene = new THREE.Scene();
var textureLoader = new THREE.TextureLoader();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 70000 );
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();

var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = true;
controls.target.set(0, 0, 12000);
controls.minDistance = 100;
controls.maxDistance = 300;
controls.update();


renderer.setSize( window.innerWidth, window.innerHeight );
canvas.appendChild( renderer.domElement );

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

waterworldmesh = new THREE.Mesh( waterWorldGeometry, material );

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
	}   );
var glowGeometry = new THREE.SphereGeometry(32, 64, 64)
var atmosphereGlow = new THREE.Mesh( glowGeometry,customMaterial);

let cloudGeo = new THREE.SphereGeometry(30.5, 64, 64)
let cloudsMat = new THREE.MeshStandardMaterial({
  alphaMap: textureLoader.load('../three/textures/clouds.jpg'),
  transparent: true,
})
clouds = new THREE.Mesh(cloudGeo, cloudsMat)

const waterworld = new THREE.Group();
waterworld.add(waterworldmesh)
waterworld.add(clouds)
waterworld.add(atmosphereGlow)
waterworld.position.set(0, 0, 12000)
scene.add(waterworld)

// Sun
var sunGeometry = new THREE.SphereGeometry(1000,60,60);

var sunMaterial = new THREE.MeshBasicMaterial ( 
  { 
    map: textureLoader.load('../three/textures/sunmap.jpg'),
    color: 0xFFA500,
  } 

);

sun = new THREE.Mesh(sunGeometry, sunMaterial)

var sunLight = new THREE.PointLight( 0xffffff, 10000, 15000, 1);

var sunLightGlow = new THREE.ShaderMaterial( 
	{
	    uniforms: 
		{ 
			"c":   { type: "f", value: 0.9 },
			"p":   { type: "f", value: 4.0 },
			glowColor: { type: "c", value: new THREE.Color(0xFFA500) },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );
var sunGlowGeometry = new THREE.SphereGeometry(1060, 64, 64)
var sunGlow = new THREE.Mesh( sunGlowGeometry,sunLightGlow);

const sunGroup = new THREE.Group();
sunGroup.add(sunGlow)
sunGroup.add(sunLight)
sunGroup.add(sun)
sunGroup.position.set(0, 1000, 0)
scene.add(sunGroup)

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 0, 0 );

let skyBoxMaterialArray = [];
let texture_ft = textureLoader.load( '../three/textures/skybox/front.png');
let texture_bk = textureLoader.load( '../three/textures/skybox/back.png');
let texture_up = textureLoader.load( '../three/textures/skybox/top.png');
let texture_dn = textureLoader.load( '../three/textures/skybox/bot.png');
let texture_rt = textureLoader.load( '../three/textures/skybox/right.png');
let texture_lf = textureLoader.load( '../three/textures/skybox/left.png');
  
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
skyBoxMaterialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++) {
  skyBoxMaterialArray[i].side = THREE.BackSide;
}

skyboxGeo = new THREE.BoxGeometry(  70000, 70000, 70000);
skybox = new THREE.Mesh( skyboxGeo, skyBoxMaterialArray );
scene.add( skybox );
skybox.position.set(0,0,0)
// moon.rotation.x = 3.1415*0.02;
// moon.rotation.y = 3.1415*1.54;


function animate() {
	requestAnimationFrame( animate );
  waterworldmesh.rotation.y += -0.000090;
  waterworldmesh.rotation.x += -0.000090;
  date = Date.now() * 0.0001;
  waterworld.position.set(
    Math.cos(date) * orbitRadius,
    0,
    Math.sin(date) * orbitRadius
  );
  let waterworldPosition = {
    x: waterworld.position.x,
    y: waterworld.position.y,
    z: waterworld.position.z
  }
  camera.position.set(waterworldPosition.x,waterworldPosition.y,waterworldPosition.z-100)
  camera.lookAt(waterworld.position)
  clouds.rotateY(0.00020)
	renderer.render( scene, camera );
}

animate();


function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);
