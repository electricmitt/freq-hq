import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMoodStore } from '@/store/moodStore';

interface ParticleSystemProps {
  particleCount?: number;
  particleSize?: number;
  particleSpeed?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 200,
  particleSize = 0.15,
  particleSpeed = 0.01,
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const { currentMood, moodConfig } = useMoodStore();

  // Generate particles
  const { positions, colors, sizes, velocities, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = 10 * Math.sqrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Store initial positions
      initialPositions[i * 3] = positions[i * 3];
      initialPositions[i * 3 + 1] = positions[i * 3 + 1];
      initialPositions[i * 3 + 2] = positions[i * 3 + 2];

      // Generate unique color
      const hue = Math.random();
      const saturation = 0.8 + Math.random() * 0.2;
      const lightness = 0.6 + Math.random() * 0.2;
      const color = new THREE.Color().setHSL(hue, saturation, lightness);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Sizes
      sizes[i] = particleSize * (0.4 + Math.random() * 0.6);

      // Velocities
      velocities[i * 3] = (Math.random() - 0.5) * particleSpeed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * particleSpeed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * particleSpeed;
    }

    return { positions, colors, sizes, velocities, initialPositions };
  }, [particleCount, particleSize, particleSpeed]);

  // Animation
  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Wave motion
      positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.01;
      positions[i * 3] += Math.cos(time * 0.5 + i * 0.1) * 0.005;
      positions[i * 3 + 2] += Math.sin(time * 0.3 + i * 0.1) * 0.005;

      // Pulsing effect
      const pulse = Math.sin(time * 2 + i * 0.1) * 0.1;
      positions[i * 3] += pulse;
      positions[i * 3 + 1] += pulse;
      positions[i * 3 + 2] += pulse;

      // Boundary check
      const radius = Math.sqrt(
        positions[i * 3] * positions[i * 3] +
        positions[i * 3 + 1] * positions[i * 3 + 1] +
        positions[i * 3 + 2] * positions[i * 3 + 2]
      );

      if (radius > 15) {
        positions[i * 3] = initialPositions[i * 3] + (Math.random() - 0.5) * 2;
        positions[i * 3 + 1] = initialPositions[i * 3 + 1] + (Math.random() - 0.5) * 2;
        positions[i * 3 + 2] = initialPositions[i * 3 + 2] + (Math.random() - 0.5) * 2;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            
            float glow = 1.0 - r * 2.0;
            float coreGlow = pow(glow, 2.0);
            float outerGlow = pow(glow, 0.5);
            float finalGlow = mix(outerGlow, coreGlow, 0.5);
            
            vec3 finalColor = vColor * (0.95 + 0.1 * sin(gl_PointCoord.x * 10.0));
            finalColor = mix(finalColor, vec3(1.0), 0.2 * outerGlow);
            
            gl_FragColor = vec4(finalColor, 0.8 * finalGlow);
          }
        `}
      />
    </points>
  );
}; 