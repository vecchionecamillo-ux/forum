'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  varying vec2 vUv;

  // Basic pseudo-random number generator
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  // Simplex noise (for more organic movement)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.wz + h.yz * x12.xw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    vec3 finalColor = vec3(0.0);

    // 3 layers of tiles
    for (float i = 1.0; i <= 3.0; i++) {
        float speed_multiplier = 0.4 + (i * 0.2); // Layer 1: 0.6, Layer 2: 0.8, Layer 3: 1.0
        float scale = 15.0 + i * 10.0; // Layer 1: 25, Layer 2: 35, Layer 3: 45

        vec2 grid_uv = st * scale;
        
        // --- Parallax Scroll Effect ---
        // We use sine/cosine to create a looping, gentle drift
        float scroll_effect = u_scroll * speed_multiplier * 0.1;
        grid_uv.y += scroll_effect;
        grid_uv.x += sin(scroll_effect * 0.5) * 0.5;

        vec2 grid_id = floor(grid_uv);
        vec2 grid_st = fract(grid_uv);

        // --- Mouse Interaction ---
        vec2 mouse_norm = u_mouse / u_resolution;
        mouse_norm.x *= u_resolution.x / u_resolution.y;
        float mouse_dist = distance(grid_uv / scale, mouse_norm);
        float mouse_effect = smoothstep(0.15, 0.0, mouse_dist) * 0.5;

        // Add noise to grid for organic movement
        grid_id.x += snoise(vec2(grid_id.y, u_time * 0.05 * speed_multiplier)) * 0.5;
        grid_id.y += snoise(vec2(grid_id.x, u_time * 0.05 * speed_multiplier)) * 0.5;

        float tile_rand = rand(grid_id);
        
        vec3 tile_color = vec3(1.0);
        float opacity = 0.0;
        
        // Only draw a small fraction of tiles per layer
        if (tile_rand > 0.95) {
            // Assign color based on another random value
            float color_rand = rand(grid_id + vec2(1.23, 4.56));
            if (color_rand < 0.33) {
                tile_color = vec3(0.12, 0.47, 0.87); // Blue (Primary)
            } else if (color_rand < 0.66) {
                tile_color = vec3(0.92, 0.26, 0.31); // Red (Accent)
            } else {
                tile_color = vec3(1.0, 0.76, 0.05); // Yellow
            }
            
            // Define shape (rectangles)
            float tile_width = 0.05 + rand(grid_id + vec2(7.8, 9.0)) * 0.1; // Thin rectangles
            if (grid_st.x > 0.5 - tile_width / 2.0 && grid_st.x < 0.5 + tile_width / 2.0) {
                 opacity = 0.2 + (i / 3.0) * 0.3; // Fainter tiles on further layers
            }
        }
        
        // Apply mouse effect - slight brightness change
        tile_color += mouse_effect;
        opacity += mouse_effect * 0.2;

        finalColor += tile_color * opacity;
    }

    gl_FragColor = vec4(finalColor, 1.0);
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
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    
    // Set a solid, light gray background color
    renderer.setClearColor(0xF8F9FA, 1); 
    
    const clock = new THREE.Clock();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: uniforms.current,
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
      uniforms.current.u_resolution.value.x = width;
      uniforms.current.u_resolution.value.y = height;
    };

    const handleMouseMove = (event: MouseEvent) => {
        uniforms.current.u_mouse.value.x = event.clientX;
        uniforms.current.u_mouse.value.y = window.innerHeight - event.clientY; // Invert Y
    };

    const handleScroll = () => {
        uniforms.current.u_scroll.value = window.scrollY;
    };

    // Initial setup
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

  return <canvas ref={canvasRef} id="art-background" className="fixed top-0 left-0 w-full h-screen -z-20" />;
}
