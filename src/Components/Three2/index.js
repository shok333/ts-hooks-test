import React from 'react';
import * as THREE from 'three';

const width = 800;
const height = 600;
const sphereRadius = 10;
const startPosition = 288.7 - sphereRadius;

export default class Three2 extends React.Component {
  componentDidMount () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 60, width / height, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({canvas: this.threeContainerRef});

    const sphereGeometry = new THREE.SphereBufferGeometry(sphereRadius, 12, 12);
    const sphereMaterial = new THREE.MeshBasicMaterial( {color: 'pink', flatShading: true} );

    this.sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    this.camera.position.z = 500;
    this.sphere.position.y = startPosition;

    this.scene.add(this.sphere);

    this.renderer.render( this.scene, this.camera );
  }

  startAnimation = () => {
    this.isAnimation = true;

    const animate = () => {
      requestAnimationFrame((time) => {
        // if (this.isAnimation) {
        //   if (!this.start) {
        //     this.start = time;
        //   }

        //   time = (time - this.start) / 1000;
        //   ///////////////////////////////////
    
        //   const s = (9.8 * time * time) / 2;
        //   const posY = startPosition - s * 90;

        //   if (posY > -startPosition) {
        //     this.sphere.position.y = posY
        //     console.log(this.sphere.position.y);
            
        //     animate();
        //   } else {
        //     this.sphere.position.y = -startPosition
        //   }
        // }
       
        this.renderer.render( this.scene, this.camera );
      });
    }

    animate();
  }

  calculateTopSpeed = () => {
    
  }

  resetAnimation = () => {
    this.isAnimation = false;
    this.start = null;
    this.sphere.position.y = startPosition;
    this.renderer.render( this.scene, this.camera );
  }

  render () {
    return (
      <div>
        <button onClick={this.startAnimation}>start</button>
        <button onClick={this.resetAnimation}>reset</button>

        <canvas width={width} height={height} ref={(threeContainerRef) => this.threeContainerRef = threeContainerRef} />
      </div>
    );
  }
}