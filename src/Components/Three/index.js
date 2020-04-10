import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

import './index.css';

function createSphere (radius = 1, widthSegments = 5, heightSegments = 5, color = 0xFFFF00) {
  const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
  var material = new THREE.MeshPhongMaterial( {color, flatShading: true} );
  return new THREE.Mesh( geometry, material );
}

export default function Three() {
  const threeContainerRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({canvas: threeContainerRef.current});
    const objects = [];
    //Адаптивность:
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);

    light.position.set(0, 20, 40);
    scene.add(light);

    const sun = createSphere(1, 5, 5);
    const earth = createSphere(1, 5, 5, '#ffc0cb');
    const moon = createSphere(1, 5, 5, 'red');
    // sun.add(earth);
    sun.scale.set(2, 2, 2);
        // objects.push(earth);

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    const earthSystem = new THREE.Object3D();
    scene.add(earthSystem);
    objects.push(earthSystem);

    earthSystem.add(earth);
    earthSystem.add(moon);
    earthSystem.position.x = -7;
  
    solarSystem.add(earthSystem);
    solarSystem.add(sun);

    moon.position.x = -3;

    // const axes = new THREE.AxesHelper();
    // axes.material.depthTest = false;
    // axes.renderOrder = 1;
    // earth.add(axes)

    camera.position.z = 15;
    // sun.position.z = -10;

    var animate = function (time) {
      requestAnimationFrame( animate );

      // console.log(time);
      // sun.rotation.x += 0.01;
      // sun.rotation.y += 0.01;
      // sun.position.z -= 0.1;
      objects.forEach((obj) => {
        obj.rotation.z += 0.01;
      });

      renderer.render( scene, camera );
    };

    animate();

    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowUp') {
        sun.position.z -= 0.1;
      }

      if (event.code === 'ArrowDown') {
        sun.position.z += 0.1;
      }

      if (event.code === 'ArrowLeft') {
        sun.position.x -= 0.1;
      }

      if (event.code === 'ArrowRight') {
        sun.position.x += 0.1;
      }
    })
  }, []);

  return <div className="three-container">
    <canvas ref={threeContainerRef} />
  </div>;
}