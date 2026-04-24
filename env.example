@import "tailwindcss";

@theme {
  --font-sans: "Castoro", serif;
  --font-mono: "JetBrains Mono", monospace;
  --color-gold: #d4af37;
  --color-obsidian: #030406;
}

:root {
  --gold: #d4af37;
  --obsidian: #030406;
  --glass-bg: rgba(15, 18, 25, 0.7);
  --border-white: rgba(255, 255, 255, 0.12);
}

body {
  font-family: 'Castoro', serif;
  background-color: var(--obsidian);
  color: #f1f5f9;
  letter-spacing: -0.011em;
  line-height: 1.7;
  overflow-x: hidden;
}

.bg-grid-tactical {
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.08) 1px, transparent 0);
  background-size: 64px 64px;
}

.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-white);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}

.ambient-glow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
  background: 
    radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
}

.noise-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1000;
}

h1, h2, h3 {
  text-wrap: balance;
}

::selection {
  background: var(--gold);
  color: #000;
}

@keyframes scan-line {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: translateY(200%); opacity: 0; }
}

.animate-scan {
  position: relative;
  overflow: hidden;
}

.animate-scan::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, transparent, var(--gold), transparent);
  opacity: 0;
  pointer-events: none;
}

.animate-scan:hover::after {
  animation: scan-line 2s linear infinite;
}

@keyframes aura-pulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.2); }
  70% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

.animate-aura:hover {
  animation: aura-pulse 2s infinite;
}

@keyframes subtle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-subtle-bounce {
  animation: subtle-bounce 1s ease-in-out infinite;
}

@keyframes image-breath {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.animate-breath {
  animation: image-breath 15s ease-in-out infinite;
}

.tactical-mask {
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

.img-tactical-gold {
  filter: sepia(0.6) brightness(0.7) contrast(1.1) hue-rotate(-10deg);
  transition: filter 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .img-tactical-gold {
  filter: sepia(0) brightness(1) contrast(1) hue-rotate(0deg);
}
