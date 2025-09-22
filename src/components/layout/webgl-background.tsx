'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  // 'Tela Digitale Vivente' by Cantiere Culturale Creative Tech
  // This shader generates a living, interactive particle system.
  // It uses noise to create organic movement and reacts to user input.

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  varying vec2 vUv;

  // --- Utility Functions ---
  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise function
  float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // --- Main Image Generation ---
  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 finalColor = vec3(0.0);
    float totalAlpha = 0.0;

    // We create 3 layers of particles for a parallax effect.
    for (float i = 1.0; i <= 3.0; i++) {
        // --- Layer-specific properties ---
        float layerDepth = i / 3.0; // 0.33, 0.66, 1.0
        float scale = 10.0 + layerDepth * 20.0; // Layer 1: 16.6, Layer 2: 23.3, Layer 3: 30
        float speedMultiplier = 0.1 + (1.0 - layerDepth) * 0.4; // Slower for deeper layers
        
        vec2 gridUv = st * scale;
        
        // --- Parallax Scroll Effect ---
        // Layers move at different speeds based on scroll.
        float scrollOffset = u_scroll * speedMultiplier * 0.05;
        gridUv.y += scrollOffset;

        vec2 gridId = floor(gridUv);
        vec2 gridSt = fract(gridUv);

        // --- Organic Movement (Perlin Noise based) ---
        // This gives the particles a slow, drifting, "living" motion.
        float noiseVal = noise(gridId + u_time * speedMultiplier * 0.1);
        gridId += vec2(sin(noiseVal * 6.283), cos(noiseVal * 6.283)) * 0.5;

        // --- Particle Generation ---
        float particleRand = random(gridId);
        
        // Only draw a small fraction of particles per layer.
        if (particleRand > 0.98) {
            vec2 particleCenter = vec2(0.5, 0.5);
            
            // --- Particle Shape (Ethereal fragments) ---
            // We use noise to create irregular, soft shapes.
            float shapeNoise = noise(gridId + vec2(u_time * 0.1, 0.0));
            float dist = distance(gridSt, particleCenter);
            float particleSize = 0.05 + shapeNoise * 0.2;
            
            float particleIntensity = smoothstep(particleSize, particleSize - 0.05, dist);
            
            // --- Mouse Interaction (Repulsive Force) ---
            vec2 mouseNorm = u_mouse / u_resolution;
            mouseNorm.y = 1.0 - mouseNorm.y; // Invert Y for shader space
            mouseNorm.x *= u_resolution.x/u_resolution.y;
            float mouseDist = distance(st, mouseNorm);
            // The repulsive force is strongest near the cursor and fades out.
            float repulsion = smoothstep(0.15, 0.0, mouseDist) * 0.5 * (1.0 - layerDepth);
            particleIntensity *= (1.0 - repulsion);


            // --- Particle Color ---
            // Colors are chosen from the vibrant accent palette.
            vec3 particleColor;
            float colorRand = random(gridId + vec2(1.23, 4.56));
            if (colorRand < 0.33) {
                particleColor = vec3(0.25, 0.52, 0.96); // Google Blue
            } else if (colorRand < 0.66) {
                particleColor = vec3(0.96, 0.26, 0.21); // Google Red
            } else {
                particleColor = vec3(1.0, 0.76, 0.05); // Google Yellow
            }

            // --- Particle Opacity ---
            // Most particles are very faint, with a few bright ones.
            float baseAlpha = 0.1;
            if (random(gridId + 7.89) > 0.95) { // 5% of particles are brighter
              baseAlpha = 0.7;
            }
            float particleAlpha = particleIntensity * baseAlpha * layerDepth;
            
            // --- Fading at edges (Lifecycle) ---
            // Particles gently fade in and out at the screen edges.
            float fadeEdge = smoothstep(0.0, 0.1, st.y) * smoothstep(1.0, 0.9, st.y);
            particleAlpha *= fadeEdge;

            // Blend this particle into the final color.
            finalColor += particleColor * particleAlpha;
            totalAlpha += particleAlpha;
        }
    }
    
    // We get the background color from the CSS variable.
    // This is a bit of a trick, as we can't directly read CSS in GLSL.
    // We'll set the canvas to be transparent and let the body's background color show through.
    gl_FragColor = vec4(finalColor, totalAlpha);
  }
`;

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniforms = useRef({
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
    u_scroll: { value: 0.0 },
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    
    renderer.setClearColor(0x000000, 0); 
    
    const clock = new THREE.Clock();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: uniforms.current,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.current.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniforms.current.u_resolution.value.x = width;
      uniforms.current.u_resolution.value.y = height;
    };

    const handleMouseMove = (event: MouseEvent) => {
        uniforms.current.u_mouse.value.x = event.clientX;
        uniforms.current.u_mouse.value.y = event.clientY;
    };

    const handleScroll = () => {
        uniforms.current.u_scroll.value = window.scrollY;
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="art-background" className="fixed top-0 left-0 w-full h-screen -z-10" />;
}
