import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Zap } from 'lucide-react';

const SESSION_KEY = 'gfg-phcet-intro-seen';

interface IntroAnimationProps {
  forceShow?: boolean;
  onClose?: () => void;
}

const INTRO_STAGES = [
  {
    tag: 'PHASE 01 // QUANTUM BOOT',
    title: 'INITIALIZING CYBERSPACE',
    highlight: 'GFG PHCET',
    subtitle: 'Connecting to Pillai HOC College of Engineering & Technology Chapter Network...',
    stat: 'PORT 5173 // SECURE',
  },
  {
    tag: 'PHASE 02 // CODE MATRIX',
    title: 'WHERE CODE MEETS',
    highlight: 'COMMUNITY',
    subtitle: 'Empowering 21 core engineers across 6 specialized tech & creative domains.',
    stat: '21 DOSSIERS LOADED',
  },
  {
    tag: 'PHASE 03 // TENURE CHARTER',
    title: 'ACADEMIC YEAR',
    highlight: '2026–2027',
    subtitle: 'Competitive Programming · Open Source · Hackathons · Digital Identity System',
    stat: 'VERIFIED CREDENTIALS',
  },
  {
    tag: 'PHASE 04 // SYSTEM READY',
    title: 'ACCESS',
    highlight: 'GRANTED',
    subtitle: 'Welcome to the official digital portal of the GeeksForGeeks PHCET Chapter.',
    stat: 'SYSTEM ONLINE 100%',
  },
];

export default function IntroAnimation({ forceShow = false, onClose }: IntroAnimationProps) {
  // Active on initial site visit only; persists across navigation
  const [active, setActive] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });

  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpSpeedRef = useRef(1);

  useEffect(() => {
    if (forceShow) {
      setActive(true);
      setProgress(0);
      setIsWarping(false);
      warpSpeedRef.current = 1;
    }
  }, [forceShow]);

  // Support replaying intro from navbar/footer
  useEffect(() => {
    const handleReplay = () => {
      setActive(true);
      setProgress(0);
      setIsWarping(false);
      warpSpeedRef.current = 1;
    };
    window.addEventListener('replay-gfg-intro', handleReplay);
    return () => window.removeEventListener('replay-gfg-intro', handleReplay);
  }, []);

  const dismiss = () => {
    setIsWarping(true);
    warpSpeedRef.current = 18; // Hyperspace burst!
    setTimeout(() => {
      setActive(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      if (onClose) onClose();
    }, 600);
  };

  // Keyboard shortcut listener (Escape / Enter / Space)
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // Progress timeline and stage transitions
  useEffect(() => {
    if (!active || isWarping) return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        const stageIdx = Math.min(Math.floor((next / 100) * INTRO_STAGES.length), INTRO_STAGES.length - 1);
        setCurrentStageIndex(stageIdx);

        if (next >= 100) {
          window.clearInterval(interval);
          setTimeout(dismiss, 250);
          return 100;
        }
        return next;
      });
    }, 18);

    return () => window.clearInterval(interval);
  }, [active, isWarping]);

  // Three.js High-End Cinematic 3D Scene
  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040605, 0.025);

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Hyperspace Starfield / Particle Vortex (1200 particles)
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 90;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      particleSpeeds[i] = 0.2 + Math.random() * 0.6;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      color: 0x00df82,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 2. Central 3D Outer Complex Polyhedral Cage
    const icoGeo = new THREE.IcosahedronGeometry(9, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00df82,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icoMesh);

    // 3. Inner Rotating Glowing Dodecahedron Core
    const dodecaGeo = new THREE.DodecahedronGeometry(5.5, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x00df82,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x04351d,
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    scene.add(dodecaMesh);

    // 4. Undulating Cyber Grid Floor
    const gridGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00df82,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.3;
    gridMesh.position.y = -18;
    scene.add(gridMesh);

    // 5. Triple Concentric Cyber Orbit Rings
    const ringGeo1 = new THREE.RingGeometry(14, 14.1, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00df82,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(18, 18.1, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const ringGeo3 = new THREE.RingGeometry(22, 22.08, 64);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x2ecc71,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    scene.add(ring3);

    // 6. Floating 3D Holographic ID Card Planes in Space
    const cardGroup = new THREE.Group();
    const cardGeo = new THREE.PlaneGeometry(3.6, 5.2);
    const cardCount = 6;
    for (let i = 0; i < cardCount; i++) {
      const cardMat = new THREE.MeshBasicMaterial({
        color: 0x00df82,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const miniCard = new THREE.Mesh(cardGeo, cardMat);
      const angle = (i / cardCount) * Math.PI * 2;
      miniCard.position.set(Math.cos(angle) * 16, Math.sin(angle) * 8, Math.sin(angle * 2) * 6);
      miniCard.rotation.y = angle + Math.PI / 2;
      cardGroup.add(miniCard);
    }
    scene.add(cardGroup);

    // 7. Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const greenPoint = new THREE.PointLight(0x00df82, 4, 80);
    greenPoint.position.set(0, 0, 15);
    scene.add(greenPoint);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const warp = warpSpeedRef.current;

      // Particle streaming vortex
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += particleSpeeds[i] * warp;
        if (positions[i * 3 + 2] > 40) {
          positions[i * 3 + 2] = -80;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Geometries Rotation
      icoMesh.rotation.x = elapsed * 0.28;
      icoMesh.rotation.y = elapsed * 0.4;

      dodecaMesh.rotation.x = -elapsed * 0.45;
      dodecaMesh.rotation.z = elapsed * 0.35;

      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.z = -elapsed * 0.25;
      ring3.rotation.x = elapsed * 0.15;

      cardGroup.rotation.y = elapsed * 0.3;

      // Camera motion & smooth mouse parallax
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.05;

      if (warp > 1) {
        camera.position.z -= 0.8;
      }

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      dodecaGeo.dispose();
      dodecaMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      cardGeo.dispose();
    };
  }, [active]);

  if (!active) return null;

  const currentStage = INTRO_STAGES[currentStageIndex];

  return (
    <div className={`cinematic-3d-intro-root${isWarping ? ' warping' : ''}`} role="dialog" aria-modal="true">
      {/* Fullscreen 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="cinematic-3d-canvas" />

      {/* Cyber Corner HUD Brackets */}
      <div className="cyber-bracket cyber-tl" />
      <div className="cyber-bracket cyber-tr" />
      <div className="cyber-bracket cyber-bl" />
      <div className="cyber-bracket cyber-br" />

      {/* Audio Visualizer / Frequency Bars Decoration */}
      <div className="hud-telemetry-left">
        <div className="hud-freq-bars">
          <span className="freq-bar bar-1" />
          <span className="freq-bar bar-2" />
          <span className="freq-bar bar-3" />
          <span className="freq-bar bar-4" />
          <span className="freq-bar bar-5" />
        </div>
        <span className="hud-freq-label">{currentStage.stat}</span>
      </div>

      <div className="hud-telemetry-right">
        <span className="hud-coords">SEC_ID // 2026-27</span>
        <span className="hud-status-dot" />
      </div>

      {/* Floating Center Glass HUD */}
      <div className="cinematic-hud-center">
        {/* Animated Phase Tag */}
        <div className="cinematic-phase-badge">
          <span className="live-pulse" />
          <span>{currentStage.tag}</span>
        </div>

        {/* Floating Glowing Chapter Crest */}
        <div className="cinematic-crest-holder">
          <div className="cinematic-crest-aura" />
          <div className="cinematic-crest-circle">
            <img
              src="/assets/gfg_phcet_logo_clean.png"
              alt="GFG PHCET Official Logo"
              className="cinematic-crest-img"
            />
          </div>
        </div>

        {/* Dynamic Kinetic Stage Typography */}
        <div className="cinematic-text-block">
          <div className="cinematic-title-line">
            <span>{currentStage.title} </span>
            <span className="highlight-emerald">{currentStage.highlight}</span>
          </div>

          <p className="cinematic-desc-line">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Interactive Progress Bar & Telemetry */}
        <div className="cinematic-progress-section">
          <div className="cinematic-progress-info">
            <span className="cinematic-mono-text">
              <span className="cursor-blink">&gt;</span> SYSTEM RECOGNITION STATUS
            </span>
            <span className="cinematic-mono-percent">{progress}%</span>
          </div>

          <div className="cinematic-progress-bar-bg">
            <div
              className="cinematic-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="cinematic-actions-row">
          <button
            type="button"
            className="btn-primary cinematic-enter-btn"
            onClick={dismiss}
            title="Enter Portal"
          >
            <Zap size={16} />
            <span>Enter</span>
          </button>

          <button
            type="button"
            className="cinematic-skip-btn"
            onClick={dismiss}
            title="Skip Intro"
          >
            <span>Skip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
