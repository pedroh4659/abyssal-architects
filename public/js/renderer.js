import * as THREE from 'three';
import { OrbitControls } from '../three/controls/OrbitControls.js';

let hemiLight, skyboxGeo, skybox, clouds, waterworld

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 15000 );
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();

var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.target.set( 0, 0, 0 );
controls.minDistance = 100;
controls.maxDistance = 300.0;
controls.update();


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var waterWorldGeometry = new THREE.SphereGeometry( 30,60,60 );

var textureLoader = new THREE.TextureLoader();

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

waterworld = new THREE.Mesh( waterWorldGeometry, material );

scene.add(waterworld)

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
var moonGlow = new THREE.Mesh( glowGeometry,customMaterial);
moonGlow.position.set(0,0,0)
scene.add( moonGlow );

let cloudGeo = new THREE.SphereGeometry(30.5, 64, 64)
let cloudsMat = new THREE.MeshStandardMaterial({
  alphaMap: textureLoader.load('../three/textures/clouds.jpg'),
  transparent: true,
})
clouds = new THREE.Mesh(cloudGeo, cloudsMat)

scene.add(clouds)

const pointLight = new THREE.PointLight( 0xffffff, 10000, 2000, 2);
pointLight.position.set( 0, 50, 100 );
scene.add( pointLight );


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

skyboxGeo = new THREE.BoxGeometry( 15000, 15000, 15000);
skybox = new THREE.Mesh( skyboxGeo, skyBoxMaterialArray );
scene.add( skybox );
skybox.position.set(0,0,0)
// moon.rotation.x = 3.1415*0.02;
// moon.rotation.y = 3.1415*1.54;


function animate() {
	requestAnimationFrame( animate );
  const time = performance.now() * 0.001;
  // moon.rotation.y += 0.002;
  // moon.rotation.x += 0.0001;
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
