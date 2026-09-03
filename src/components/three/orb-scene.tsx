"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { orbFragment, orbVertex } from "./orb-shader";

/**
 * The hero's 3D object: a noise-displaced icosahedron inside a slowly
 * counter-rotating wireframe shell.
 *
 * Deliberately cheap. Two meshes, no lights, no shadows, no
 * post-processing, no textures — about 20k triangles total, shaded
 * entirely in the fragment stage. The expensive-looking part (the
 * liquid surface) is a vertex displacement, which the GPU does for
 * free relative to anything CPU-side.
 */

const MINT = new THREE.Color("#2ee6a8");
const BLUE = new THREE.Color("#2f8ef0");
const VIOLET = new THREE.Color("#8b5cf6");

/**
 * Uniforms live at module scope because they are written on every
 * frame and must never participate in a React render. There is only
 * ever one orb on the page, so a single shared object is correct.
 */
const uniforms = {
  uTime: { value: 0 },
  uAmp: { value: 0.17 },
  uPointer: { value: 0 },
  uMint: { value: MINT },
  uBlue: { value: BLUE },
  uViolet: { value: VIOLET },
};

function Orb() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Clamp delta so a backgrounded tab doesn't jump the animation
    // forward by seconds when it returns.
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += dt;

    const { x, y } = state.pointer;
    uniforms.uPointer.value += (Math.hypot(x, y) - uniforms.uPointer.value) * 0.05;

    if (group.current) {
      group.current.rotation.y += dt * 0.16;
      // Ease toward the pointer rather than snapping to it.
      group.current.rotation.x += (y * 0.28 - group.current.rotation.x) * 0.04;
      group.current.position.x += (x * 0.35 - group.current.position.x) * 0.04;
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.09;
      shell.current.rotation.z += dt * 0.04;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.3, 5]} />
        <shaderMaterial
          vertexShader={orbVertex}
          fragmentShader={orbFragment}
          uniforms={uniforms}
          transparent
          // No depth write, so the far side of the displaced sphere shows
          // through the near side — that read-through is what sells it as
          // glass. Normal blending rather than additive, because additive
          // blows out to white on the light theme. Front faces only —
          // drawing the inside as well just muddies the centre.
          depthWrite={false}
        />
      </mesh>

      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial
          color={MINT}
          wireframe
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function OrbScene({ active }: { active: boolean }) {
  return (
    <Canvas
      // Rendering stops entirely when the hero is off screen or the tab
      // is hidden — an idle canvas costs nothing.
      frameloop={active ? "always" : "never"}
      // Modest pixel ratio and no MSAA: the object is soft and glowing,
      // so neither is missed, and both are the usual cost on retina.
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: "none" }}
    >
      <Orb />
    </Canvas>
  );
}
