'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
    uniform float u_time;
    varying vec2 vUv;
    float PI = 3.141592653589793238;
    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
    void main() {
        vec2 uv = vUv - 0.5;
        float t = u_time * 0.05;
        float r = length(uv) * 1.5;
        float a = atan(uv.y, uv.x);
        float f = cos(a * 3.0 + t) * cos(a * 3.0 + t) + 0.1 * cos(a * 15.0 + t * 2.0);
        float c = 1.0 / (200.0 * pow(abs(r - f), 2.0));
        gl_FragColor = vec4(vec3(c * 0.2, c * 0.25, c * 0.5) * (1.0 - length(uv) * 1.2), 1.0);
    }
`;

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const clock = new THREE.Clock();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
      `,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="art-background" className="fixed top-0 left-0 w-full h-screen -z-10" />;
}
