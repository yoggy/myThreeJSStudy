/**
  test02.js - dynamic texture update

  https://github.com/yoggy/myThreeJSStudy
 
  Copyright (c) 2014 yoggy
  This software is released under the MIT License.
  http://opensource.org/licenses/mit-license.php

*/

// config
var texture_update_interval = 200;
var texture_url = 'http://localhost:10080/camera.jpg';

//
var stats;
var camera, scene, renderer;
var controls;

var material;
var texture_tmp;

function aspect() {
	return window.innerWidth/window.innerHeight;
}

function render() {
	controls.update();
	renderer.render(scene, camera);
}

function onLoadTexture() {
	material.map = texture_tmp;
	material.needsUpdate = true;
}

function updateTexture() {
	var url = texture_url + "?dummy=" + (new Date).getTime();
	console.log("url=" + url);
	
	// load image asynchronous...
	texture_tmp = THREE.ImageUtils.loadTexture(url, THREE.UVMapping, onLoadTexture);
}

function initScene() {
	scene = new THREE.Scene();
	
	var geometry = new THREE.BoxGeometry(10, 10, 10);
	
	// CORS restriction. see also..
	//    http://www.w3.org/TR/cors/
	//    https://developer.mozilla.org/ja/docs/HTTP_access_control
	//    http://logicalerror.seesaa.net/article/388132177.html
	//    http://threejs.org/docs/#Reference/Extras/ImageUtils
	//
	// Don't forget "Access-Control-Allow-Origin" header in your http server response...
	//
	THREE.ImageUtils.crossOrigin = "*";
	
	var texture = THREE.ImageUtils.loadTexture(texture_url);
	texture.anisotropy = renderer.getMaxAnisotropy();
	
	material = new THREE.MeshBasicMaterial({map: texture});
	var mesh = new THREE.Mesh(geometry, material);
	
	scene.add( mesh );
	setInterval(updateTexture, texture_update_interval);
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
