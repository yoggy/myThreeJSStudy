/**
  test01.js - myThreeJSStudy

  https://github.com/yoggy/myThreeJSStudy
 
  Copyright (c) 2014 yoggy
  This software is released under the MIT License.
  http://opensource.org/licenses/mit-license.php

*/
var stats;
var camera, scene, renderer;
var controls;

function aspect() {
	return window.innerWidth/window.innerHeight;
}

function render() {
	controls.update();
	renderer.render(scene, camera);
}

function resize() {
	camera.aspect = aspect();
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}

function initScene() {
	scene = new THREE.Scene();
	
	var geometry = new THREE.BoxGeometry(10, 10, 10);
		
	var texture = THREE.ImageUtils.loadTexture('noimage.png');
	texture.anisotropy = renderer.getMaxAnisotropy();
	
	var material = new THREE.MeshBasicMaterial({map: texture});
	var mesh = new THREE.Mesh(geometry, material);
	
	scene.add( mesh );
}

function init() {
	// FPS status
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);

	// setup renderer
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	// setup camera
	camera = new THREE.PerspectiveCamera(45, aspect(), 1, 1000);
	camera.position.z = 20;
	
	controls = new THREE.TrackballControls(camera, renderer.domElement);
	
	initScene();
	window.addEventListener('resize', resize, false);

	animate();
}

window.addEventListener('load', init, false);
