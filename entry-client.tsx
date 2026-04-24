
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Flame,
  Cpu, 
  Globe, 
  Menu, 
  X,
  BookOpen,
  ArrowRight,
  FileText,
  Radio,
  Compass,
  ZapOff,
  Scale,
  Send,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Clock,
  Briefcase,
  Eye,
  Radar,
  Lock,
  Terminal,
  Activity,
  Layers,
  GraduationCap,
  Users,
  Mic,
  Settings2,
  Linkedin,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Anchor,
  Database,
  BrainCircuit,
  Binary,
  History,
  FlaskConical,
  Trophy,
  Dna,
  Zap as Sparkles,
  Calendar,
  Timer,
  Box,
  Server,
  Cloud,
  Search,
  Split,
  ShieldAlert,
  ZapIcon,
  Map
} from 'lucide-react';
import { Article, Language, AIProject } from './types';

// --- Sample AI Projects Data ---
const AI_PROJECTS: AIProject[] = [
  {
    id: 'lex-sovereign',
    name: "LexSovereign",
    description: {
      en: "AI agent for monitoring and anticipating European and international public regulation shifts (AI Act, DMA, DSA, export controls).",
      fr: "Agent IA pour la surveillance et l'anticipation des évolutions réglementaires publiques européennes et internationales (AI Act, DMA, DSA, contrôles export)."
    },
    status: 'LIVE',
    tech: ['Regulatory OSINT', 'LLM Analysis', 'Predictive Compliance'],
    business: ['Public Regulation', 'Lawfare Protection', 'Compliance Strategy'],
    industry: 'Public Regulation'
  },
  {
    id: 'techstack-vanguard',
    name: "TechStack Vanguard",
    description: {
      en: "Mapping critical tech dependencies and identifying sovereignty vulnerabilities in the value chain (semiconductors, cloud, cyber).",
      fr: "Cartographie des dépendances technologiques critiques et identification des vulnérabilités de souveraineté dans la chaîne de valeur (semi-conducteurs, cloud, cyber)."
    },
    status: 'R&D',
    tech: ['Supply Chain Mapping', 'Vulnerability Scanning', 'Tech Graph'],
    business: ['Geo-tech', 'Strategic Autonomy', 'Value Chain Recomposition'],
    industry: 'Tech'
  },
  {
    id: 'aegis-command',
    name: "Aegis Command",
    description: {
      en: "Multi-domain intelligence for the defense economy. Tracking defense budgets, procurement programs, and dual-use technology proliferation.",
      fr: "Renseignement multi-milieux pour l'économie de défense. Suivi des budgets de défense, des programmes d'acquisition et de la prolifération des technologies à double usage."
    },
    status: 'LIVE',
    tech: ['Defense OSINT', 'Signal Intelligence', 'Dual-use Tracking'],
    business: ['Defense Economy', 'War Economy', 'Strategic Stock'],
    industry: 'Defense'
  },
  {
    id: 'europa-nexus',
    name: "Europa Nexus",
    description: {
      en: "Analyzing the European strategic landscape, tracking industrial policies, state aid, and the formation of European tech champions.",
      fr: "Analyse du paysage stratégique européen, suivi des politiques industrielles, des aides d'État et de la formation des champions technologiques européens."
    },
    status: 'LIVE',
    tech: ['Policy Tracking', 'Industrial Data', 'Ecosystem Mapping'],
    business: ['European Sovereignty', 'Industrial Policy', 'Market Intel'],
    industry: 'Europe'
  },
  {
    id: 'atlas-geopolitics',
    name: "Atlas Geopolitics",
    description: {
      en: "Real-time geopolitical risk correlation engine. Monitoring sanctions, trade wars, and decoupling dynamics across international markets.",
      fr: "Moteur de corrélation des risques géopolitiques en temps réel. Surveillance des sanctions, des guerres commerciales et des dynamiques de découplage sur les marchés internationaux."
    },
    status: 'BETA',
    tech: ['Geopolitical OSINT', 'Risk Correlation', 'Event Prediction'],
    business: ['Geo-economics', 'Strategic Decoupling', 'Trade War'],
    industry: 'International'
  }
];

// --- Animated Strategic Intelligence Map Component ---

const StrategicIntelligenceMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; label: string }[] = [];
    const nodeCount = 18;
    const labels = ["NODE_A1", "PORT_SNG", "NODE_ROT", "HUB_DBX", "LNK_X", "SIG_ALPHA", "THREAT_MAP"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        label: labels[Math.floor(Math.random() * labels.length)]
      });
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connections (Supply Chain Flows)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 200)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Traveling pulses
            const pulsePos = (time * 0.05 + i * j) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
            ctx.fillStyle = '#d4af37';
            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = '#d4af37';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#d4af37';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        if (i % 3 === 0) {
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }

        // Radar pulses
        if (i === 4 || i === 12) {
          const radarSize = (time * 0.03 + i * 10) % 60;
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 * (1 - radarSize / 60)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radarSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // HUD Overlays
      // Removed canvas HUD overlays to avoid duplication with HTML overlays

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-4 right-4 flex flex-col items-end opacity-40">
        <div className="text-[8px] font-mono text-blue-400">LAT: 48.8566</div>
        <div className="text-[8px] font-mono text-blue-400">LON: 2.3522</div>
      </div>
    </div>
  );
};

// --- Sample Article Data ---
const ARTICLES: Article[] = [
  {
    id: 'sovereign-ai',
    title: { 
      en: "The Architectures of Sovereignty", 
      fr: "Les Architectures de la Souveraineté" 
    },
    date: { en: "March 12, 2025", fr: "12 Mars 2025" },
    category: { en: "Tech Autonomy", fr: "Autonomie Tech" },
    readTime: { en: "6 min", fr: "6 min" },
    excerpt: { 
      en: "Why generalist AI is a strategic liability. The shift toward proprietary, air-gapped agentic systems within global networks.",
      fr: "Pourquoi l'IA généraliste est un risque stratégique. La transition vers des systèmes agentiques propriétaires dans les réseaux mondiaux."
    },
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
    content: {
      en: [
        "In the current geopolitical landscape, reliance on third-party AI infrastructure is no longer just an operational risk; it's a direct threat to strategic autonomy.",
        "We are witnessing the emergence of 'Digital Iron Curtains' where data flows and compute power are being weaponized. The dependency on centralized black-box models controlled by foreign entities creates a structural vulnerability for European industry.",
        "Prometheus Advisory advocates for a decoupling from public models in favor of custom, localized architectures that preserve decisional integrity. This 'sovereign layer' is not about isolationism, but about the ability to maintain a conceptual lead even when external networks become hostile or opaque."
      ],
      fr: [
        "Dans le paysage géopolitique actuel, la dépendance à l'égard des infrastructures d'IA tierces n'est plus seulement un risque opérationnel ; c'est une menace directe pour l'autonomie stratégique.",
        "Nous assistons à l'émerégence de 'rideaux de fer numériques' où les flux de données et la puissance de calcul sont militarisés. La dépendance à des modèles boîte noire centralisés contrôlés par des entités étrangères crée une vulnérabilité structurelle pour l'industrie européenne.",
        "Prometheus Advisory préconise un découplage des modèles publics au profit d'architectures personnalisées et localisées qui préservent l'intégrité décisionnelle. Cette 'couche souveraine' ne concerne pas l'isolationnisme, mais la capacité à maintenir une avance conceptuelle même lorsque les réseaux externes deviennent hostiles ou opaques."
      ]
    }
  },
  {
    id: 'supply-chain-warfare',
    title: { 
      en: "Supply Chain Asymmetry", 
      fr: "L'Asymétrie des Chaînes de Valeur" 
    },
    date: { en: "February 28, 2025", fr: "28 Février 2025" },
    category: { en: "Geopolitics", fr: "Géopolitique" },
    readTime: { en: "8 min", fr: "8 min" },
    excerpt: { 
      en: "Mapping the weaponization of maritime nodes and the end of linear shipping globalization.",
      fr: "Cartographier la militarisation des nœuds maritimes et la fin de la mondialisation linéaire des flux."
    },
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
    content: {
      en: [
        "The era of peaceful globalization is over. Supply chains are being reshaped by security imperatives rather than efficiency. What was once 'Just-in-Time' is becoming 'Just-in-Case' or 'Friend-Shoring'.",
        "Critical dependencies on adversarial states are being identified as 'strategic choke points'. These maritime and logistical nodes are no longer neutral infrastructure but instruments of power projection.",
        "Resilience now requires a complete overhaul of logistics, moving from optimization to strategic redundancy. We map these asymmetries to allow our clients to navigate the high-friction corridors of modern trade."
      ],
      fr: [
        "L'ère de la mondialisation pacifique est révolue. Les chaînes d'approvisionnement sont remodelées par des impératifs de sécurité plutôt que d'efficacité. Ce qui était autrefois le 'Juste-à-Temps' devient le 'Juste-au-Cas' ou le 'Friend-Shoring'.",
        "Les dépendances critiques vis-à-vis d'États adversaires sont identifiées comme des 'points d'étranglement stratégiques'. Ces nœuds maritimes et logistiques ne sont plus des infrastructures neutres mais des instruments de projection de puissance.",
        "La résilience nécessite désormais une refonte complète de la logistique, passant de l'optimisation à la redondance stratégique. Nous cartographions ces asymétries pour permettre à nos clients de naviguer dans les couloirs à haute friction du commerce moderne."
      ]
    }
  }
];

// --- Constants & Translations ---

const UI_TEXT: Record<Language, any> = {
  en: {
    nav: { manifesto: "Briefing", services: "Advisory", education: "Education", foundry: "AI Foundry", expertise: "Fields", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Core Expertise.",
      intro: "Power transition, the end of globalization, the advent of AI — three simultaneous disruptions that redefine who wins and who loses. Prometheus helps you get ahead thanks to our areas of strategic expertise.",
      items: [
        { title: "Regulation", icon: <Scale size={24} /> },
        { title: "Tech", icon: <Cpu size={24} /> },
        { title: "Defense", icon: <Shield size={24} /> },
        { title: "Europe", icon: <Map size={24} /> },
        { title: "Global", icon: <Globe size={24} /> }
      ]
    },
    solutions: { subtitle: "Our services", title: "Strategic Solutions." },
    hero: {
      tag: "Status: Operative",
      headline: "Think different is easy.",
      headlineItalic: "Being right makes the difference.",
      subheadline: "A new world is emerging. Only those who see clearly survive. Prometheus helps you write your rules — and enforce them.",
      ctaPrimary: "Briefing",
      ctaSecondary: "Manifesto",
      labels: ["Geo-economics", "Geo-tech", "Geo-org"]
    },
    visionSection: {
      subtitle: "Doctrine",
      title: "Accuracy is Advantage.",
      body: "Reality is inescapable. In a world of radical friction, only the finest endure. We fuse machine speed with human taste. Think against the consensus. Preserve autonomy.",
      pillars: [
        { title: "Discernment", desc: "See what competitors miss. Filter noise. Act first. Preserve autonomy." },
        { title: "Global Grid", desc: "Decode new rules: blocs, sanctions, sovereignty, and standards." },
        { title: "Clarity", desc: "Master speed and dependencies. Separate reversible from terminal options." }
      ]
    },
    useCase: {
      subtitle: "A new-generation boutique.",
      title: "For a shifting world.",
      intro: "Analysis is not missing. The courage to see what one sees is.",
      cells: [
        { label: "The market", body: "Frameworks. Methods. Reports. <b>But still just mainstream.</b>" },
        { label: "Prometheus", body: "<b>Say what you see. See what you see.</b>", accent: true },
        { label: "Data vs Judgment", body: "<b>We built the only model that needs both.</b> AI sees what humans miss. Humans conclude where AI cannot." },
        { label: "Analysis vs Conviction", body: "We help you establish the ground rules <b>so you capitalize on your advantage.</b>" }
      ],
      quote: "“Thinking different is easy.”",
      answer: "Being right makes the difference."
    },
    intelligence: {
      subtitle: "Methodology",
      title: "Three layers. Your decision.",
      story: "Data without judgment is noise. Judgment without data is intuition. Prometheus is structured to respond to the increasing complexity of strategic environments — by articulating what AI does better than humans with what humans do better than AI.",
      synthesis: "Optimized AI. Human Judgment.",
      layers: [
        { 
          id: 'ai',
          title: "AI Foundry", 
          subtitle: "Proprietary IA Agent Library", 
          desc: "Regulatory monitoring, ecosystem mapping, geopolitical OSINT, predictive compliance, supply chain — real-time, global scale.",
          dot: "bg-emerald-500",
          shadow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        },
        { 
          id: 'specialists',
          title: "Hyper-specialists", 
          subtitle: "Global Expert Network", 
          desc: "Cutting-edge analysis from experts who know their industry from the inside (finance, industry, energy, regulation).",
          dot: "bg-indigo-500",
          shadow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        },
        { 
          id: 'strategic',
          title: "Strategic Intelligence", 
          subtitle: "Judgment, experience, culture", 
          desc: "Transforming analysis into a stand. Common sense, courage, and general culture — what AI lacks alone.",
          dot: "bg-amber-600",
          shadow: "shadow-[0_0_10px_rgba(217,119,6,0.5)]"
        }
      ]
    },
    foundryPage: {
      subtitle: "AI Foundry",
      title: "Our team of AI agents",
      intro: "Proprietary AI for accurate vision. The foundation of next-gen advisory.",
      previewCta: "Explore Index",
      filters: {
        industry: "Sphere",
        tech: "Capability",
        business: "Domain",
        all: "All"
      }
    },
    briefingsPage: {
      subtitle: "Reports",
      title: "Tactical Insights.",
      back: "Archives"
    },
    manifestoPage: {
      subtitle: "The Lead",
      title: "Reality has no substitute.",
      discernment: "Contrarian thinking is the only path to advantage.",
      points: [
        "Eliminate noise. Recover speed. Protect autonomy.",
        "Decrypt brutal rules. Dominate the geostrategic revolution.",
        "Analyze reversible vs terminal options in complex environments."
      ],
      militarization: "Conflict is the new order. Business fog is political. Power is back: supply chain warfare, extraterritoriality, cognitive shock. We face reality.",
      regain: "Regain the lead. Execute advantage in the battles ahead.",
      intelligenceArchitecture: {
        title: "AI & HUMAN INTELLIGENCE.",
        aiTitle: "Proprietary Agents",
        aiDescription: "WE TRANSFORM CHAOS INTO ACTIONABLE DECISIONS.",
        aiItems: [
          { title: "Auto OSINT", desc: "FILTERING, CORRELATION, AND ANOMALY DETECTION.", icon: <Database size={24} /> },
          { title: "Analytics", desc: "HIGH-FIDELITY GEOPOLITICAL AND TECHNICAL INTERPRETATION.", icon: <Binary size={24} /> },
          { title: "AcademIA", desc: "DIRECT ACCESS TO FUNDAMENTAL RESEARCH.", icon: <GraduationCap size={24} /> }
        ],
        humanTitle: "Decisional Layer",
        humanDescription: "EXPERIENCED EXPERTISE TO CONTEXTUALIZE MACHINE SIGNALS.",
        humanItems: [
          { title: "Core Culture", desc: "DEEP KNOWLEDGE IN HISTORY AND SCIENCE.", icon: <History size={24} /> },
          { title: "High-Level", desc: "DIRECT ENGAGEMENT WITH SENIOR DECISION-MAKERS.", icon: <Users size={24} /> },
          { title: "Polyvalence", desc: "CROSS-INDUSTRY EXPERTISE TO DETECT RISK CONTAMINATION.", icon: <Layers size={24} /> }
        ]
      },
      whyPrometheusTitle: "Prometheus: Bringer of Fire",
      whyPrometheusIntro: "The titan who stole fire to illuminate the dark.",
      howItInspires: [
        { title: "Flow Control", desc: "Injecting intelligence where it accelerates most." },
        { title: "Passage", desc: "Finding exits in strategic dead-ends." },
        { title: "Asymmetry", desc: "Advantage through non-obvious options." },
        { title: "Realism", desc: "No sugar-coating. Hard facts." }
      ]
    },
    expertisePage: {
      subtitle: "Domains",
      hero: "Intelligence Fields.",
      intro: "Where power and tech collide. We operate in high-friction environments.",
      domains: [
        { id: "reg", title: "Global Regulation", icon: <FileText size={24} />, desc: "Extraterritoriality and cognitive warfare.", tags: ["Lawfare", "Sovereignty", "Lobbying"] },
        { id: "tech", title: "Tech Autonomy", icon: <Cpu size={24} />, desc: "Transforming chaos into signals.", tags: ["OSINT", "Agentic AI", "Cyber"] },
        { id: "def", title: "Defense Economy", icon: <Shield size={24} />, desc: "Securing critical dependencies.", tags: ["Resilience", "Stocks", "Armor"] },
        { id: "int", title: "Geopolitics", icon: <Globe size={24} />, desc: "Mapping the return of raw power.", tags: ["Risk", "Brussels", "Trade War"] }
      ]
    },
    servicesPage: {
      subtitle: "Command",
      title: "Advisory",
      cta: "Explore Framework",
      intro: "Align your trajectory with the coming global friction. We decode power to protect your sovereignty.",
      items: [
        { 
          title: "Strategic Advisory", 
          subtitle: "Master Brief", 
          icon: <Briefcase size={24} />,
          desc: "Radical realignment. We audit sovereignty, map exposure, and redefine your trajectory.",
          features: ["Sovereignty Audit", "Decoupling Strategy", "Executive Training"]
        },
        { 
          title: "Fresh Eyes", 
          subtitle: "Red Teaming", 
          icon: <Eye size={24} />,
          desc: "Stress-testing assumptions. We expose blind spots and challenge the consensus.",
          features: ["Blind Spot Extraction", "Pre-mortem Analysis", "Dissidence Simulation"]
        },
        { 
          title: "Continuous intelligence", 
          subtitle: "Signal 24/7", 
          icon: <Radar size={24} />,
          desc: "Automated signal extraction with elite analysis. Stay ahead of emerging threats.",
          features: ["Monthly Reports", "OSINT Access", "Real-time Correlation"]
        }
      ]
    },
    educationPage: {
      subtitle: "Leadership",
      title: "Executive Education.",
      cta: "View Programs",
      intro: "Transferring strategic lead through intensive high-level immersions for decision-makers.",
      offers: [
        { 
          id: "exco", 
          title: "Strategic EXCO", 
          icon: <Users size={24} />, 
          desc: "Board-level alignment sessions for new geopolitical realities.",
          details: ["Stress Tests", "Red-Teaming"]
        },
        { 
          id: "seminars", 
          title: "Seminars", 
          icon: <GraduationCap size={24} />, 
          desc: "Expert-led immersions on friction points and contested frameworks.",
          details: ["Data Sovereignty", "War Economy"]
        }
      ]
    },
    teamSection: {
      subtitle: "Our Command team",
      title: "Strategy Command.",
      members: [
        {
          name: "Bruno Alomar",
          role: "Managing Partner",
          bio: "Economist and senior strategist. Expert: European Affairs, competition and defence.",
          image: "https://www.sansdoute.info/wp-content/uploads/2025/02/Bruno-Alomar.webp"
        },
        {
          name: "Thomas Kurkdjian",
          role: "Managing Partner",
          bio: "Entrepreneur and consultant. Expert: Tech, AI, Defence.",
          image: "https://media.licdn.com/dms/image/v2/D4E03AQGVPsr_u0XTIg/profile-displayphoto-scale_400_400/B4EZu5DTUbKQAk-/0/1768336212447?e=1772064000&v=beta&t=WrcB-yazRUT2HB7wwOgJevLCnXSk5n3OMsO8sFsd7bM"
        }
      ]
    },
    contactPage: {
      subtitle: "Secure",
      title: "Establish Communication.",
      intro: "Establish a secure line.",
      labels: {
        name: "User",
        email: "Operational Contact",
        company: "Organization",
        subject: "Intent",
        message: "Brief",
        submit: "Send Request",
        success: "Transmitted. Absolute discretion."
      },
      subjects: ["Strategic Audit", "Executive Education", "Defense Advisory", "Red Teaming"]
    },
    finalCta: { title: "Recover the Lead.", desc: "Build strategies others can't.", ctaPrimary: "Establish Session" },
    useCaseTaiwan: {
      subtitle: "Simulation",
      title: "The Taiwan Equation.",
      intro: "What if China seizes Taiwan? We analyze irreversible shifts in Tech & Finance.",
      scenario: "Kinetic Reunification & Global Blockade",
      methodology: {
        ai: {
          title: "AI: The Watchers",
          desc: "Proprietary agents monitoring friction points standard audits miss.",
          items: [
            { title: "OSINT Node", desc: "Real-time tracking of maritime logistics and mobilization signals.", icon: <Radar size={24} /> },
            { title: "Tech Graph", desc: "Mapping TSMC dependencies and value chain choke points.", icon: <Cpu size={24} /> },
            { title: "Sanction Engine", desc: "Predictive modeling of 'Digital Iron Curtains' on financial flows.", icon: <Binary size={24} /> }
          ]
        },
        advisory: {
          title: "Advisory: Decision",
          desc: "Human judgment navigating the end of linear globalization.",
          items: [
            { title: "Decoupling", desc: "Phased exit from high-risk dependencies without losing speed.", icon: <Split size={24} /> },
            { title: "Red Teaming", desc: "Stress-testing strategy against total US-China tech decoupling.", icon: <Eye size={24} /> },
            { title: "Fresh Eyes", desc: "Contrarian views on the 'One China' consensus.", icon: <Target size={24} /> }
          ]
        },
        education: {
          title: "Education: Shield",
          desc: "Transferring the lead to your executive committee.",
          items: [
            { title: "EXCO War Games", desc: "Simulating the first 72 hours of conflict to find failure points.", icon: <Shield size={24} /> },
            { title: "War Economy", desc: "Training teams to operate in high-friction, sanctioned environments.", icon: <GraduationCap size={24} /> }
          ]
        }
      },
      cta: "Request Simulation Briefing"
    },
    footer: { quote: "Bypass consensus. Navigate the new rules.", legal: "Protocols", privacy: "Policy", methodology: "Action" }
  },
  fr: {
    nav: { manifesto: "Briefing", services: "Advisory", education: "Formation", foundry: "AI Foundry", expertise: "Champs", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Expertise Centrale.",
      intro: "Transition de puissance, fin de la mondialisation, avènement de l'IA — trois ruptures simultanées qui redéfinissent qui gagne et qui perd. Prometheus vous aide à en faire une longueur d'avance grâce à nos domaines d'expertises stratégiques.",
      items: [
        { title: "Régulation", icon: <Scale size={24} /> },
        { title: "Tech", icon: <Cpu size={24} /> },
        { title: "Défense", icon: <Shield size={24} /> },
        { title: "Europe", icon: <Map size={24} /> },
        { title: "Global", icon: <Globe size={24} /> }
      ]
    },
    solutions: { subtitle: "Nos services", title: "Solutions Stratégiques." },
    hero: {
      tag: "Statut : Opérationnel",
      headline: "Penser différemment est facile.",
      headlineItalic: "Avoir raison fait la différence.",
      subheadline: "Un nouveau monde émerge. Seuls ceux qui voient juste survivent. Prometheus vous aide à écrire vos règles — et à les imposer.",
      ctaPrimary: "Briefing",
      ctaSecondary: "Manifeste",
      labels: ["Géo-économie", "Géo-tech", "Géo-org"]
    },
    visionSection: {
      subtitle: "Doctrine",
      title: "La Justesse est l'Avantage.",
      body: "Le réel est incontournable. Dans un monde de friction radicale, seuls les plus fins perdurent. Nous fusionnons vitesse machine et saveur humaine. Pensez contre le consensus. Préservez l'autonomie.",
      pillars: [
        { title: "Discernement", desc: "Voir ce que les concurrents manquent. Filtrer le bruit. Agir d'abord. Préserver l'autonomie." },
        { title: "Grille Globale", desc: "Décrypter les nouvelles règles : blocs, sanctions, souveraineté et standards." },
        { title: "Clarté", desc: "Maîtriser la vitesse et les dépendances. Distinguer options réversibles et terminales." }
      ]
    },
    useCase: {
      subtitle: "Une boutique nouvelle génération.",
      title: "Pour un monde qui bascule.",
      intro: "Ce n'est pas l'analyse qui manque. C'est le courage de voir ce que l'on voit.",
      cells: [
        { label: "Le marché", body: "Frameworks. Méthodes. Rapports. <b>Mais toujours le consensus.</b>" },
        { label: "Prometheus", body: "<b>Dire ce que l'on voit. Voir ce que l'on voit.</b>", accent: true },
        { label: "Donnée vs jugement", body: "<b>Nous avons bâti le seul modèle qui nécessite les deux.</b> L'IA capte ce que l'humain rate. L'humain conclut là où l'IA ne peut pas." },
        { label: "Analyse vs conviction", body: "Nous vous aidons à établir les règles du jeu <b>pour capitaliser sur votre avantage.</b>" }
      ],
      quote: "« Penser différemment est facile. »",
      answer: "Avoir raison fait la différence."
    },
    intelligence: {
      subtitle: "Méthodologie",
      title: "Trois couches. Votre décision.",
      story: "La donnée sans jugement est du bruit. Le jugement sans données est de l'intuition. Prometheus est structuré pour répondre à la complexité croissante des environnements stratégiques — en articulant ce que l’IA fait mieux que l’humain avec ce que l’humain fait mieux que l’IA.",
      synthesis: "IA Optimisée. Jugement Humain.",
      layers: [
        { 
          id: 'ai',
          title: "AI Foundry", 
          subtitle: "Librairie d'agents IA propriétaire", 
          desc: "Veille réglementaire, cartographie des écosystèmes, OSINT géopolitique, compliance prédictive, supply chain — en temps réel, à l'échelle mondiale.",
          dot: "bg-emerald-500",
          shadow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        },
        { 
          id: 'specialists',
          title: "Hyper-spécialistes", 
          subtitle: "Réseau d'experts sectoriels", 
          desc: "Des analyses de pointe produites par des experts qui connaissent leur secteur de l'intérieur — finance, industrie, santé, énergie, régulation.",
          dot: "bg-indigo-500",
          shadow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        },
        { 
          id: 'strategic',
          title: "Intelligence stratégique", 
          subtitle: "Jugement, expérience, culture", 
          desc: "Transformer l'analyse en position assumée. Bon sens, expérience de terrain, courage intellectuel et culture générale — ce qui manque à toute IA seule.",
          dot: "bg-amber-600",
          shadow: "shadow-[0_0_10px_rgba(217,119,6,0.5)]"
        }
      ]
    },
    foundryPage: {
      subtitle: "AI Foundry",
      title: "Notre équipe d'agents IA",
      intro: "IA propriétaire pour une vision juste. Le socle du conseil de nouvelle génération.",
      previewCta: "Explorer l'Index",
      filters: {
        industry: "Sphère",
        tech: "Capacité",
        business: "Domaine",
        all: "Tous"
      }
    },
    briefingsPage: {
      subtitle: "Rapports",
      title: "Insights Tactiques.",
      back: "Archives"
    },
    manifestoPage: {
      subtitle: "L'Avance",
      title: "La réalité n'a pas de substitut.",
      discernment: "La pensée à contre-courant est la seule voie vers l'avantage.",
      points: [
        "Éliminer le bruit. Retrouver la vitesse. Protéger l'autonomie.",
        "Décrypter les règles brutales. Dominer la révolution géostratégique.",
        "Analyser les options réversibles vs terminales en milieu complexe."
      ],
      militarization: "Le conflit est le nouvel ordre. Le brouillard des affaires est politique. La puissance est de retour : guerre logistique, extraterritorialité, choc cognitif. Face au réel.",
      regain: "Retrouvez l'avance. Exécutez l'avantage dans les batailles à venir.",
      intelligenceArchitecture: {
        title: "IA & INTELLIGENCE HUMAINE.",
        aiTitle: "Agents Propriétaires",
        aiDescription: "NOUS TRANSFORMONS LE CHAOS EN DÉCISIONS ACTIONNABLES.",
        aiItems: [
          { title: "OSINT Auto", desc: "FILTRAGE, CORRÉLATION ET DÉTECTION D'ANOMALIES.", icon: <Database size={24} /> },
          { title: "Analytique", desc: "INTERPRÉTATION GÉOPOLITIQUE ET TECHNIQUE HAUTE FIDÉLITÉ.", icon: <Binary size={24} /> },
          { title: "AcademIA", desc: "ACCÈS DIRECT À LA RECHERCHE FONDAMENTALE.", icon: <GraduationCap size={24} /> }
        ],
        humanTitle: "Couche Décisionnelle",
        humanDescription: "EXPERTISE EXPÉRIMENTÉE POUR CONTEXTUALISER LA MACHINE.",
        humanItems: [
          { title: "Culture", desc: "CONNAISSANCES PROFONDES EN HISTOIRE ET SCIENCE.", icon: <History size={24} /> },
          { title: "Haut Niveau", desc: "ENGAGEMENT DIRECT AVEC LES DÉCIDEURS SENIORS.", icon: <Users size={24} /> },
          { title: "Polyvalence", desc: "EXPERTISE INTER-INDUSTRIES CONTRE LA CONTAMINATION DES RISQUES.", icon: <Layers size={24} /> }
        ]
      },
      whyPrometheusTitle: "Prometheus : Porteur de Feu",
      whyPrometheusIntro: "Le titan qui vola le feu pour éclairer les ténèbres.",
      howItInspires: [
        { title: "Contrôle des Flux", desc: "Injecter l'intelligence là où elle accélère le plus." },
        { title: "Passage", desc: "Trouver des issues dans les impasses stratégiques." },
        { title: "Asymétrie", desc: "Avantage par des options non évidentes." },
        { title: "Réalisme", desc: "Pas d'édulcoration. Faits bruts." }
      ]
    },
    expertisePage: {
      subtitle: "Domaines",
      hero: "Champs d'Intelligence.",
      intro: "Où puissance et tech entrent en collision. Nous opérons en haute friction.",
      domains: [
        { id: "reg", title: "Régulation Mondiale", icon: <FileText size={24} />, desc: "Extraterritorialité et guerre cognitive.", tags: ["Lawfare", "Souveraineté", "Lobbying"] },
        { id: "tech", title: "Autonomie Tech", icon: <Cpu size={24} />, desc: "Transformer le chaos en signaux.", tags: ["OSINT", "IA Agentique", "Cyber"] },
        { id: "def", title: "Économie de Défense", icon: <Shield size={24} />, desc: "Sécuriser les dépendances critiques.", tags: ["Résilience", "Stocks", "Blindage"] },
        { id: "int", title: "Géopolitique", icon: <Globe size={24} />, desc: "Cartographier le retour de la puissance brute.", tags: ["Risque", "Bruxelles", "Trade War"] }
      ]
    },
    servicesPage: {
      subtitle: "Commandement",
      title: "Advisory",
      cta: "Explorer le Cadre",
      intro: "Réalignez votre trajectoire face aux frictions mondiales. Nous décodons la puissance pour protéger votre souveraineté.",
      items: [
        { 
          title: "Conseil Stratégique", 
          subtitle: "Master Brief", 
          icon: <Briefcase size={24} />,
          desc: "Réalignement radical. Audit de souveraineté, cartographie d'exposition et redéfinition de trajectoire.",
          features: ["Audit Souveraineté", "Stratégie Découplage", "Formation Exécutive"]
        },
        { 
          title: "Second Avis", 
          subtitle: "Red Teaming", 
          icon: <Eye size={24} />,
          desc: "Stress-test des hypothèses. Exposition des angles morts et défi du consensus.",
          features: ["Angles Morts", "Analyse Pré-mortem", "Simulation Dissidence"]
        },
        { 
          title: "Intelligence continue", 
          subtitle: "Signal 24/7", 
          icon: <Radar size={24} />,
          desc: "Extraction de signaux automatisée et analyse d'élite. Anticiper les menaces.",
          features: ["Rapports Mensuels", "Accès OSINT", "Corrélation Temps Réel"]
        }
      ]
    },
    educationPage: {
      subtitle: "Leadership",
      title: "Formation Exécutive.",
      cta: "Voir les Programmes",
      intro: "Transfert d'avance stratégique par des immersions intensives de haut niveau pour les décideurs.",
      offers: [
        { 
          id: "exco", 
          title: "EXCO Stratégique", 
          icon: <Users size={24} />, 
          desc: "Alignement du conseil face aux nouvelles réalités géopolitiques.",
          details: ["Stress Tests", "Red-Teaming"]
        },
        { 
          id: "seminars", 
          title: "Séminaires", 
          icon: <GraduationCap size={24} />, 
          desc: "Immersions expertes sur les points de friction et cadres contestés.",
          details: ["Souveraineté Données", "Économie de Guerre"]
        }
      ]
    },
    teamSection: {
      subtitle: "Notre équipe de commandement",
      title: "Commandement Stratégique.",
      members: [
        {
          name: "Bruno Alomar",
          role: "Managing Partner",
          bio: "Économiste et stratège senior. Expert : Affaires européennes, concurrence et défense.",
          image: "https://www.sansdoute.info/wp-content/uploads/2025/02/Bruno-Alomar.webp"
        },
        {
          name: "Thomas Kurkdjian",
          role: "Managing Partner",
          bio: "Entrepreneur et consultant. Expert : Tech, IA, Défense.",
          image: "https://media.licdn.com/dms/image/v2/D4E03AQGVPsr_u0XTIg/profile-displayphoto-scale_400_400/B4EZu5DTUbKQAk-/0/1768336212447?e=1772064000&v=beta&t=WrcB-yazRUT2HB7wwOgJevLCnXSk5n3OMsO8sFsd7bM"
        }
      ]
    },
    contactPage: {
      subtitle: "Sécurisé",
      title: "Établir la Liaison.",
      intro: "Établir une ligne sécurisée.",
      labels: {
        name: "Utilisateur",
        email: "Point de Contact",
        company: "Organisation",
        subject: "Intention",
        message: "Brief",
        submit: "Transmettre",
        success: "Transmis. Discrétion absolue."
      },
      subjects: ["Audit Stratégique", "Formation Exécutive", "Conseil Défense", "Red Teaming"]
    },
    finalCta: { title: "Retrouvez l'Avance.", desc: "Construisez des stratégies inaccessibles aux autres.", ctaPrimary: "Établir une Session" },
    useCaseTaiwan: {
      subtitle: "Simulation",
      title: "L'Équation Taïwan.",
      intro: "Et si la Chine s'emparait de Taïwan ? Analyse des basculements irréversibles en Tech & Finance.",
      scenario: "Réunification Cinétique & Blocus Global",
      methodology: {
        ai: {
          title: "IA : Les Veilleurs",
          desc: "Agents propriétaires surveillant les frictions ignorées par les audits standards.",
          items: [
            { title: "Nœud OSINT", desc: "Suivi temps réel de la logistique maritime et des signaux de mobilisation.", icon: <Radar size={24} /> },
            { title: "Graphe Tech", desc: "Cartographie des dépendances TSMC et points d'étranglement.", icon: <Cpu size={24} /> },
            { title: "Moteur Sanctions", desc: "Modélisation prédictive des 'Rideaux de Fer Numériques' sur les flux.", icon: <Binary size={24} /> }
          ]
        },
        advisory: {
          title: "Advisory : Décision",
          desc: "Jugement humain naviguant la fin de la mondialisation linéaire.",
          items: [
            { title: "Découplage", desc: "Sortie progressive des dépendances sans perte de vitesse.", icon: <Split size={24} /> },
            { title: "Red Teaming", desc: "Stress-test stratégique face au découplage total US-Chine.", icon: <Eye size={24} /> },
            { title: "Second Avis", desc: "Vision à contre-courant sur le consensus 'Une seule Chine'.", icon: <Target size={24} /> }
          ]
        },
        education: {
          title: "Formation : Bouclier",
          desc: "Transférer l'avance à votre comité exécutif.",
          items: [
            { title: "War Games EXCO", desc: "Simulation des 72 premières heures pour trouver les ruptures.", icon: <Shield size={24} /> },
            { title: "Économie Guerre", desc: "Former les équipes à opérer sous sanctions et haute friction.", icon: <GraduationCap size={24} /> }
          ]
        }
      },
      cta: "Demander le Briefing"
    },
    footer: { quote: "Bypass consensus. Navigate the new rules.", legal: "Protocoles", privacy: "Politique", methodology: "Action" }
  }
};

// --- Helper Components ---

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[110] pointer-events-none">
      <div className="h-full bg-[#d4af37] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)]" style={{ width: `${scroll}%` }} />
    </div>
  );
};

const PrometheusIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Flame className={className} />
);

const SectionHeading = ({ subtitle, title, mono = false, theme = 'dark', accentColor }: { subtitle: string, title: string, mono?: boolean, theme?: 'dark' | 'light', accentColor?: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-[2px] ${accentColor ? accentColor : theme === 'light' ? 'bg-[#7a641d]' : 'bg-[#d4af37]'}`}></div>
      <p className={`font-mono ${accentColor ? accentColor.replace('bg-', 'text-') : theme === 'light' ? 'text-[#7a641d]' : 'text-[#d4af37]'} tracking-[0.2em] text-[13px] font-bold`}>{subtitle}</p>
    </div>
    <h2 className={`${mono ? 'font-mono tracking-tighter' : 'font-sans tracking-tight'} text-4xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.15] ${theme === 'light' ? 'text-black font-extrabold' : 'text-white'} relative z-10`}>{title}</h2>
  </div>
);

const useTypewriter = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayedText;
};

// --- Main Components ---

const Navbar = ({ lang, setLang, page, setPage }: { lang: Language, setLang: (l: Language) => void, page: string, setPage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = UI_TEXT[lang].nav;
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if navbar needs to be light for contrast against light page
  const isLightBackground = page === 'foundry';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'py-3' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex justify-between items-center h-14 px-6 rounded-2xl border transition-all duration-500 ${isScrolled ? 'glass-panel bg-black/60 border-white/20' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage('home')}>
            <PrometheusIcon className="w-8 h-8 text-[#d4af37]" />
            <span className={`font-sans text-xl font-bold transition-colors ${isLightBackground && !isScrolled ? 'text-slate-950' : 'text-white'}`}>Prometheus <span className="text-[#d4af37]">Advisory</span></span>
          </div>
          <div className={`hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest font-bold transition-colors ${isLightBackground && !isScrolled ? 'text-slate-700' : 'text-slate-300'}`}>
            <button onClick={() => setPage('manifesto')} className={page === 'manifesto' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] transition-colors'}>{t.manifesto}</button>
            <button onClick={() => setPage('services')} className={page === 'services' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] transition-colors'}>{t.services}</button>
            <button onClick={() => setPage('education')} className={page === 'education' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] transition-colors'}>{t.education}</button>
            <button onClick={() => setPage('foundry')} className={page === 'foundry' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] transition-colors'}>{t.foundry}</button>
            <button onClick={() => setPage('contact')} className="px-5 py-2 bg-[#d4af37] text-slate-950 rounded-lg hover:bg-slate-950 hover:text-[#d4af37] transition-all">{t.contact}</button>
            <div className="flex gap-2 ml-4">
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-[#d4af37]' : 'text-slate-500'}>EN</button>
              <button onClick={() => setLang('fr')} className={lang === 'fr' ? 'text-[#d4af37]' : 'text-slate-500'}>FR</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ParallaxMemberCard: React.FC<{ member: any }> = ({ member }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(distance * 0.1);
    };
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="glass-panel grid grid-cols-1 lg:grid-cols-12 gap-8 p-10 rounded-3xl border-white/10 group overflow-hidden">
      <div ref={containerRef} className="lg:col-span-5 aspect-square overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 relative">
        <img 
          src={member.image} 
          className="w-full h-full object-cover" 
          style={{ transform: `translateY(${offset}px) scale(1.1)` }}
          alt={member.name} 
        />
      </div>
      <div className="lg:col-span-7 flex flex-col justify-center">
        <span className="font-mono text-[10px] text-[#d4af37] font-black uppercase tracking-[0.4em] mb-4">{member.role}</span>
        <h3 className="text-3xl font-sans tracking-tight text-white mb-4 font-bold">{member.name}</h3>
        <p className="text-slate-200 font-mono text-[14px] font-bold opacity-80 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
};

// --- AI Foundry View (Light Themed with Simplified Card Structure) ---

const FoundryView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].foundryPage;
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [activeBusiness, setActiveBusiness] = useState<string | null>(null);

  // Extract unique filters
  const industries = useMemo(() => Array.from(new Set(AI_PROJECTS.map(p => p.industry))), []);
  const techs = useMemo(() => Array.from(new Set(AI_PROJECTS.flatMap(p => p.tech))), []);
  const businesses = useMemo(() => Array.from(new Set(AI_PROJECTS.flatMap(p => p.business))), []);

  const filteredProjects = useMemo(() => {
    return AI_PROJECTS.filter(p => {
      const matchIndustry = activeIndustry === 'all' || p.industry === activeIndustry;
      const matchTech = !activeTech || p.tech.includes(activeTech);
      const matchBusiness = !activeBusiness || p.business.includes(activeBusiness);
      return matchIndustry && matchTech && matchBusiness;
    });
  }, [activeIndustry, activeTech, activeBusiness]);

  return (
    <div className="pt-56 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle={t.subtitle} title={t.title} theme="light" />
        <p className="text-black text-xl font-mono font-black mb-20 max-w-3xl border-l-4 border-[#d4af37] pl-8 opacity-100">
          {t.intro}
        </p>

        {/* Tactical Filter Dashboard */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 mb-20 space-y-12 transition-all hover:shadow-2xl">
          {/* Strategic Sphere Filter */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-[#d4af37]" />
              <span className="font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600">{t.filters.industry}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveIndustry('all')}
                className={`px-6 py-2 rounded-full font-mono text-[11px] uppercase font-bold border transition-all ${activeIndustry === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'border-slate-200 text-slate-600 hover:border-[#d4af37]'}`}
              >
                {t.filters.all}
              </button>
              {industries.map(ind => (
                <button 
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-6 py-2 rounded-full font-mono text-[11px] uppercase font-bold border transition-all ${activeIndustry === ind ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'border-slate-200 text-slate-600 hover:border-[#d4af37]'}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Capability Stack */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Cpu size={14} className="text-blue-600" />
                <span className="font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600">{t.filters.tech}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map(tech => (
                  <button 
                    key={tech}
                    onClick={() => setActiveTech(activeTech === tech ? null : tech)}
                    className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all ${activeTech === tech ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-400'}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategic Domain */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase size={14} className="text-emerald-600" />
                <span className="font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600">{t.filters.business}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {businesses.map(biz => (
                  <button 
                    key={biz}
                    onClick={() => setActiveBusiness(activeBusiness === biz ? null : biz)}
                    className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all ${activeBusiness === biz ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400'}`}
                  >
                    {biz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Project List */}
        <div className="space-y-6">
          {filteredProjects.length > 0 ? filteredProjects.map((project) => (
            <div key={project.id} className="bg-white group p-10 rounded-[2.5rem] border border-slate-200 hover:border-[#d4af37]/60 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl flex flex-col md:flex-row justify-between gap-8 items-center">
              
              <div className="flex-1 w-full space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="text-3xl md:text-4xl font-sans tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors">{project.name}</h3>
                  <div className={`px-3 py-1 rounded-md font-mono text-[9px] font-black tracking-widest border uppercase ${
                    project.status === 'LIVE' ? 'text-emerald-700 border-emerald-100 bg-emerald-50' : 
                    project.status === 'R&D' ? 'text-blue-700 border-blue-100 bg-blue-50' : 
                    'text-[#d4af37] border-amber-100 bg-amber-50'
                  }`}>
                    {project.status}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-100">/ {project.industry}</span>
                </div>
                
                <p className="text-slate-700 font-mono text-[13px] leading-relaxed font-black max-w-3xl opacity-100">{project.description[lang]}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {[...project.tech, ...project.business].map((tag, idx) => (
                    <span key={tag} className={`px-2.5 py-0.5 rounded-md font-mono text-[8px] uppercase font-black border ${
                      idx < project.tech.length ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-amber-50 text-[#d4af37]/90 border-amber-100'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 group-hover:translate-x-2 transition-transform">
                <div className="p-4 bg-slate-50 border border-slate-100 text-[#d4af37] rounded-full group-hover:bg-[#d4af37] group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={24} />
                </div>
              </div>

              {/* Shimmer line effect (Simplified) */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-50 group-hover:bg-[#d4af37]/20 transition-colors"></div>
            </div>
          )) : (
            <div className="py-32 md:py-48 text-center bg-white rounded-[3rem] border border-slate-200 shadow-inner">
              <ZapOff size={48} className="mx-auto mb-8 text-slate-300" />
              <p className="font-mono text-slate-500 uppercase font-black">No matching assets found in local node.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Use Case: Taiwan ---

const UseCaseTaiwanView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].useCaseTaiwan;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-48 px-6 relative overflow-hidden"
    >
      {/* Tactical Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading subtitle={t.subtitle} title={t.title} accentColor="bg-red-500" />
        
        <div className="max-w-4xl mb-24">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-sans tracking-tight text-white leading-tight font-bold mb-10"
          >
            {t.intro}
          </motion.p>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block font-mono text-red-500 text-[12px] uppercase font-black tracking-widest bg-red-500/10 px-8 py-4 rounded-full border border-red-500/20 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            {t.scenario}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Section */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-[3rem] border-[#d4af37]/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center rounded-2xl">
                  <Cpu size={28} />
                </div>
                <h3 className="text-2xl font-sans tracking-tight text-white font-bold">{t.methodology.ai.title}</h3>
              </div>
              <p className="text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium">{t.methodology.ai.desc}</p>
              <div className="space-y-10">
                {t.methodology.ai.items.map((item: any, i: number) => (
                  <div key={i} className="border-l-2 border-[#d4af37]/30 pl-6 group/item">
                    <div className="flex items-center gap-4 text-white mb-3">
                      <span className="text-[#d4af37] group-hover/item:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-sans font-bold text-lg">{item.title}</span>
                    </div>
                    <p className="font-mono text-[12px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advisory Section */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-10 rounded-[3rem] border-red-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center rounded-2xl">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-2xl font-sans tracking-tight text-white font-bold">{t.methodology.advisory.title}</h3>
              </div>
              <p className="text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium">{t.methodology.advisory.desc}</p>
              <div className="space-y-10">
                {t.methodology.advisory.items.map((item: any, i: number) => (
                  <div key={i} className="border-l-2 border-red-400/30 pl-6 group/item">
                    <div className="flex items-center gap-4 text-white mb-3">
                      <span className="text-red-400 group-hover/item:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-sans font-bold text-lg">{item.title}</span>
                    </div>
                    <p className="font-mono text-[12px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-10 rounded-[3rem] border-slate-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-slate-500/10 border border-slate-500/30 text-slate-400 flex items-center justify-center rounded-2xl">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl font-sans tracking-tight text-white font-bold">{t.methodology.education.title}</h3>
              </div>
              <p className="text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium">{t.methodology.education.desc}</p>
              <div className="space-y-10">
                {t.methodology.education.items.map((item: any, i: number) => (
                  <div key={i} className="border-l-2 border-slate-400/30 pl-6 group/item">
                    <div className="flex items-center gap-4 text-white mb-3">
                      <span className="text-slate-400 group-hover/item:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-sans font-bold text-lg">{item.title}</span>
                    </div>
                    <p className="font-mono text-[12px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-16 py-8 bg-[#d4af37] text-slate-950 font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(239,68,68,0.3)] text-sm">
            {t.cta}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Landing View ---

const LandingView = ({ lang, setPage, t }: { lang: Language, setPage: (p: string) => void, t: any }) => {
  const heroSub = useTypewriter(t.hero.subheadline, 20);
  const intelT = t.intelligence;
  const servicesT = t.servicesPage;
  const educationT = t.educationPage;
  const briefingsT = t.briefingsPage;
  const foundryT = t.foundryPage;
  const caseT = t.useCase;
  const solutionsT = t.solutions;

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full mb-8">
              <Activity size={12} className="text-[#d4af37]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-black">{t.hero.tag}</span>
            </div>
            <h1 className="font-sans text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] md:leading-[1.0] mb-8 text-white">
              <span className="block">{t.hero.headline}</span>
              <span className="text-[#d4af37] font-sans tracking-tight block mt-2">
                {t.hero.headlineItalic}
              </span>
            </h1>
            <p className="font-mono text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mb-10 border-l-2 border-[#d4af37] pl-6 bg-gradient-to-r from-[#d4af37]/5 to-transparent py-3">
              {heroSub}<span className="inline-block w-2 h-4 bg-[#d4af37] animate-pulse ml-2 align-middle"></span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => setPage('contact')} className="px-8 py-4 bg-[#d4af37] text-slate-950 font-black uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:bg-white hover:text-slate-950 transition-all text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                {t.hero.ctaPrimary} <ArrowRight size={16} />
              </button>
              <button onClick={() => setPage('manifesto')} className="px-8 py-4 border border-white/20 uppercase tracking-[0.15em] font-black rounded-xl text-white hover:bg-white hover:text-slate-950 transition-all text-sm">
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-slate-950/80 border border-white/10 aspect-[4/5] rounded-[2rem] relative overflow-hidden group shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-color z-10 group-hover:bg-transparent transition-all duration-1000"></div>
              
              {/* Replace static image with Animated Map */}
              <StrategicIntelligenceMap />

              <div className="absolute top-8 left-8 space-y-2 z-20">
                <div className="font-mono text-[10px] text-slate-300 tracking-wider">OSINT_STREAM: <span className="text-white">25s</span></div>
                <div className="font-mono text-[10px] text-slate-300 tracking-wider">ACTIVE_CORRELATIONS: <span className="text-white">54</span></div>
                <div className="font-mono text-[10px] text-slate-300 tracking-wider">LAT: <span className="text-white">48.8566</span></div>
                <div className="font-mono text-[10px] text-slate-300 tracking-wider">LON: <span className="text-white">2.3522</span></div>
              </div>

              <div className="absolute bottom-8 left-8 space-y-4 z-20">
                {t.hero.labels.map((l: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]"></div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white font-black">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1) WHY A NEW GENERATION FIRM - Rationale Section */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#0d0d0b] border-b border-white/5">
        <div className="absolute inset-0 bg-grid-tactical opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-2 max-w-xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {caseT.subtitle}
          </h2>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-8 max-w-xl text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {caseT.title}
          </h2>
          <p className="font-serif text-lg md:text-xl italic text-slate-500 mb-16 max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {caseT.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {caseT.cells.map((cell: any, idx: number) => (
              <div key={idx} className={`p-10 md:p-14 flex flex-col gap-6 transition-all duration-700 hover:bg-white/[0.03] group ${cell.accent ? 'bg-white/[0.02]' : 'bg-[#0d0d0b]'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-4 ${cell.accent ? 'bg-[#d4af37]' : 'bg-white/20'}`}></div>
                  <p className={`font-mono text-[10px] tracking-[0.2em] uppercase font-black ${cell.accent ? 'text-[#d4af37]' : 'text-white/40'}`}>
                    {cell.label}
                  </p>
                </div>
                <p className={`font-sans text-lg md:text-xl leading-relaxed font-medium transition-colors ${cell.accent ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}
                   dangerouslySetInnerHTML={{ __html: cell.body }}
                />
              </div>
            ))}
          </div>

          <div className="mt-1 flex flex-col md:flex-row items-stretch gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-10 md:p-14 bg-[#0d0d0b] flex-1 flex items-center italic">
              <p className="font-serif text-xl md:text-2xl text-white/40 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {caseT.quote}
              </p>
            </div>
            <div className="p-10 md:p-14 bg-white/[0.02] flex-1 flex items-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#d4af37] leading-tight max-w-[280px]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {caseT.answer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2) DOCTRINE SECTION WITH VIDEO BACKGROUND */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden border-y border-white/10 group">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover filter brightness-50 contrast-125 grayscale"
          >
            <source src="https://player.vimeo.com/external/538749842.hd.mp4?s=12643a6c117e3f8a4f9103e3347514125f4836f6&profile_id=174" type="video/mp4" />
          </video>
          {/* Tactical Gold Overlay */}
          <div className="absolute inset-0 bg-slate-950/90 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-slate-950 opacity-80"></div>
          {/* Scanning lines effect on the video */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="w-full h-[1px] bg-white animate-pulse" style={{ marginTop: `${idx * 10}%`, animationDelay: `${idx * 0.2}s` }}></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 sticky top-32 glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl bg-slate-950/60 backdrop-blur-xl">
              <SectionHeading subtitle={t.visionSection.subtitle} title={t.visionSection.title} />
              <p className="text-white font-mono text-base leading-relaxed border-l-2 border-[#d4af37] pl-6 py-2 opacity-100">
                {t.visionSection.body}
              </p>
            </div>
            <div className="lg:col-span-7 space-y-8">
              {t.visionSection.pillars.map((p: any, i: number) => (
                <div key={i} className="glass-panel p-10 md:p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/40 transition-all group/pillar relative overflow-hidden flex flex-col sm:flex-row gap-8 items-start bg-slate-950/60 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover/pillar:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 shrink-0 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center rounded-2xl relative z-10 group-hover/pillar:bg-[#d4af37] group-hover/pillar:text-slate-950 transition-colors duration-500">
                    {i === 0 ? <Shield size={28} /> : i === 1 ? <Target size={28} /> : <Zap size={28} />}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-sans tracking-tight text-white mb-4 font-bold group-hover/pillar:text-[#d4af37] transition-colors">{p.title}</h3>
                    <p className="text-slate-200 font-mono text-[15px] font-medium leading-relaxed opacity-100">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2) SYNTHESIZED INTELLIGENCE SECTION */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden border-b border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <SectionHeading subtitle={intelT.subtitle} title={intelT.title} mono={true} />
              <p className="text-xl md:text-2xl font-sans tracking-tight text-white leading-tight font-bold mb-6">
                {intelT.story.split('. ')[0]}. {intelT.story.split('. ')[1]}.
              </p>
              <p className="text-sm md:text-md font-mono text-slate-400 leading-relaxed opacity-80 font-black max-w-xl">
                {intelT.story.split('. ').slice(2).join('. ')}
              </p>
            </div>
            <div className="w-16 h-1 bg-[#d4af37] hidden lg:block mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {intelT.layers.map((layer: any, i: number) => (
              <div key={layer.id} className="glass-panel p-8 rounded-[2rem] border-white/5 relative group hover:bg-white/[0.02] transition-all duration-500 flex flex-col h-full">
                {/* Tactical Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-3xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${layer.dot} ${layer.shadow}`}></div>
                </div>

                <div className="mb-6">
                  <p className="text-[#d4af37] font-mono text-[9px] uppercase font-black tracking-[0.2em] mb-2 opacity-60">
                    {layer.subtitle}
                  </p>
                  <h3 className="text-2xl font-sans font-bold text-white tracking-tight leading-tight">
                    {layer.title}
                  </h3>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="text-slate-400 font-mono text-[13px] leading-relaxed font-medium">
                    {layer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Synthesis Banner - More compact */}
          <div className="mt-16 glass-panel py-8 px-12 rounded-2xl border-white/5 flex flex-col items-center justify-center relative overflow-hidden group max-w-xl mx-auto text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
            
            <div className="flex items-center gap-4 mb-3">
              <Sparkles size={18} className="text-emerald-500 animate-pulse" />
              <div className="h-[1px] w-8 bg-white/10"></div>
              <Sparkles size={18} className="text-amber-600 animate-pulse" />
            </div>
            
            <h4 className="text-white font-mono text-[13px] uppercase tracking-[0.4em] font-black">
              {intelT.synthesis}
            </h4>
          </div>
        </div>
      </section>

      {/* 3.5) ENGAGEMENTS (ADVISORY + EDUCATION COMBINED) */}
      <section className="py-32 md:py-48 px-6 bg-black relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle={solutionsT.subtitle} title={solutionsT.title} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full mt-24">
            {/* Advisory Pillar */}
            <div className="p-8 md:p-14 lg:border-r border-white/10 relative group">
              <div className="flex flex-col gap-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-4 py-2 px-5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full">
                    <Briefcase size={20} className="text-[#d4af37]" />
                    <span className="font-mono text-[10px] uppercase font-black tracking-[0.3em] text-[#d4af37]">{servicesT.subtitle || 'Mandates'}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white font-bold leading-none">
                    {servicesT.title}
                  </h3>
                  <p className="text-slate-400 font-mono text-[15px] leading-relaxed max-w-md border-l border-[#d4af37]/30 pl-6 py-2">
                    {servicesT.intro}
                  </p>
                </div>

                <div className="space-y-6 mt-4">
                  {servicesT.items.slice(0, 3).map((item: any, i: number) => (
                    <div key={i} className="group/item relative overflow-hidden p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]/30 group-hover/item:bg-[#d4af37] transition-colors"></div>
                      <h4 className="text-xl font-sans tracking-tight text-white mb-2 font-bold transition-colors">{item.title}</h4>
                      <p className="text-slate-400 font-mono text-[13px] font-medium leading-relaxed opacity-80">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button onClick={() => setPage('services')} className="flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.4em] hover:gap-8 transition-all">
                    {servicesT.cta} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Education Pillar */}
            <div className="p-8 md:p-14 relative group">
              <div className="flex flex-col gap-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-4 py-2 px-5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full">
                    <GraduationCap size={20} className="text-[#d4af37]" />
                    <span className="font-mono text-[10px] uppercase font-black tracking-[0.3em] text-[#d4af37]">{educationT.subtitle}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white font-bold leading-none">
                    {educationT.title}
                  </h3>
                  <p className="text-slate-400 font-mono text-[15px] leading-relaxed max-w-md border-l border-[#d4af37]/30 pl-6 py-2">
                    {educationT.intro}
                  </p>
                </div>

                <div className="space-y-6 mt-4">
                  {educationT.offers.map((offer: any, i: number) => (
                    <div key={i} className="group/item relative overflow-hidden p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 h-full">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]/30 group-hover/item:bg-[#d4af37] transition-colors"></div>
                      <h4 className="text-xl font-sans tracking-tight text-white mb-2 font-bold transition-colors">{offer.title}</h4>
                      <p className="text-slate-400 font-mono text-[13px] font-medium leading-relaxed opacity-80">{offer.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button onClick={() => setPage('education')} className="flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.4em] hover:gap-8 transition-all">
                    {educationT.cta} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) DOMAINS OF EXPERTISE */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-black/60 border-b border-white/5 font-mono">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle={t.domains.subtitle} title={t.domains.title} />
          
          <div className="max-w-4xl mb-20 p-8 md:p-12 glass-panel border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#d4af37]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <p className="text-white font-serif text-xl md:text-2xl leading-relaxed border-l-4 border-[#d4af37] pl-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.domains.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {t.domains.items.map((item: any, i: number) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 group hover:border-[#d4af37]/30 transition-all bg-slate-900/20 hover:bg-slate-900/40 flex flex-col items-center text-center gap-6 shadow-xl shadow-black/20">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-slate-950 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) AI FOUNDRY PREVIEW (LIGHT MODE) */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle={foundryT.subtitle} title={foundryT.title} theme="light" />
          
          <div className="max-w-3xl mb-20">
            <p className="text-xl md:text-2xl font-sans tracking-tight text-slate-900 leading-relaxed font-medium">
              {foundryT.intro}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {AI_PROJECTS.slice(0, 4).map((project) => (
              <div 
                key={project.id} 
                onClick={() => setPage('foundry')}
                className="bg-slate-50 group p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Cpu size={80} className="text-slate-900" />
                </div>
                
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-3xl font-sans tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors">{project.name}</h3>
                    <span className="font-mono text-[8px] px-2 py-0.5 border border-amber-200 bg-amber-50 text-[#8c7324] rounded font-black tracking-widest">{project.status}</span>
                  </div>
                  <p className="text-slate-800 font-mono text-[14px] font-bold leading-relaxed mb-6 opacity-100">
                    {project.description[lang].slice(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/50 pt-6">
                  <div className="flex gap-2">
                    {project.tech.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-slate-200/40 rounded font-mono text-[8px] uppercase font-black text-slate-800">{t}</span>
                    ))}
                  </div>
                  <div className="text-[#d4af37] group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setPage('foundry')}
            className="group flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.3em]"
          >
            {foundryT.previewCta} <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </section>

      {/* 6) TACTICAL INSIGHTS */}
      <section className="py-32 md:py-48 px-6 bg-black/80">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle={briefingsT.subtitle} title={briefingsT.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ARTICLES.map((article) => (
              <div 
                key={article.id} 
                onClick={() => setPage(`briefings/${article.id}`)}
                className="glass-panel group cursor-pointer overflow-hidden rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 bg-white/[0.02] shadow-xl hover:shadow-[#d4af37]/10"
              >
                <div className="aspect-[16/9] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out">
                  <img src={article.imageUrl} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 img-tactical-gold" alt={article.title[lang]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d4af37]/30 transition-all duration-500 z-20 pointer-events-none"></div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] font-black">{article.category[lang]}</span>
                    <div className="flex items-center gap-2 text-slate-100 font-mono text-[14px] uppercase font-bold">
                      <Timer size={12} /> {article.readTime[lang]}
                    </div>
                  </div>
                  <h3 className="text-3xl font-sans tracking-tight text-white mb-6 font-bold group-hover:text-[#d4af37] transition-colors duration-500">{article.title[lang]}</h3>
                  <p className="text-slate-100 font-mono text-[14px] font-bold leading-relaxed opacity-100 mb-8">{article.excerpt[lang]}</p>
                  <div className="flex items-center gap-3 text-[#d4af37] font-mono text-[11px] uppercase font-bold tracking-widest group-hover:gap-5 transition-all">
                    Read Report <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) TEAM SECTION */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle={t.teamSection.subtitle} title={t.teamSection.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.teamSection.members.map((m: any, i: number) => (
              <ParallaxMemberCard key={i} member={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ArticleDetailView = ({ lang, articleId, setPage }: { lang: Language, articleId: string, setPage: (p: string) => void }) => {
  const article = ARTICLES.find(a => a.id === articleId);
  const t = UI_TEXT[lang].briefingsPage;

  if (!article) return <div className="pt-56 text-center text-white">Report not found.</div>;

  return (
    <div className="pt-56 pb-32 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-3 font-mono text-[11px] uppercase font-bold text-[#d4af37] mb-16 hover:gap-5 transition-all"
        >
          <ArrowLeft size={14} /> Return home
        </button>

        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8 font-mono text-[11px] uppercase font-bold text-slate-300">
             <span className="text-[#d4af37]">{article.category[lang]}</span>
             <span className="flex items-center gap-2"><Calendar size={12} /> {article.date[lang]}</span>
             <span className="flex items-center gap-2"><Timer size={12} /> {article.readTime[lang]}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white font-bold leading-tight mb-12">{article.title[lang]}</h1>
          <div className="aspect-video rounded-[3rem] overflow-hidden grayscale brightness-75 mb-16 border border-white/10 shadow-2xl relative">
            <img src={article.imageUrl} className="w-full h-full object-cover" alt={article.title[lang]} />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="space-y-12">
            {article.content[lang].map((para, i) => (
              <p key={i} className="text-xl md:text-2xl text-slate-200 leading-relaxed font-sans opacity-90">{para}</p>
            ))}
          </div>
        </div>

        <div className="glass-panel p-12 rounded-[2.5rem] border-l-4 border-[#d4af37] bg-[#d4af37]/5">
           <p className="font-mono text-xs uppercase font-black tracking-widest text-[#d4af37] mb-6 italic opacity-80">Transmission Summary</p>
           <p className="text-slate-300 font-mono text-sm leading-relaxed font-black">Strategic autonomy requires a decoupling from foreign dependencies. This report maps the transition towards sovereign agentic systems as the primary mode of operational security.</p>
        </div>
      </div>
    </div>
  );
};

const ManifestoView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].manifestoPage;
  const arch = t.intelligenceArchitecture;

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="pt-56 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionHeading subtitle={t.subtitle} title={t.title} />
            <p className="text-[#d4af37] font-sans text-3xl tracking-tight mb-16 font-bold">{t.discernment}</p>
            <div className="space-y-12 mb-20">
              {t.points.map((p: any, i: number) => (
                <div key={i} className="flex gap-8 group">
                  <span className="font-mono text-[#d4af37] text-5xl italic font-black opacity-40 group-hover:opacity-100 transition-all duration-500">0{i+1}</span>
                  <p className="text-slate-100 text-xl leading-relaxed pt-2 font-medium">{p}</p>
                </div>
              ))}
            </div>
            <div className="p-12 glass-panel border-l-4 border-[#d4af37] font-mono text-[13px] tracking-widest text-slate-200 leading-[1.8] italic rounded-r-3xl font-black bg-[#d4af37]/5">{t.militarization}</div>
          </div>
          <div className="relative group">
             <div className="aspect-[4/5] glass-panel p-2 border-white/20 overflow-hidden relative rounded-[3rem] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 animate-breath" alt="Tactical Port Nodes" />
                <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-80"></div>
             </div>
          </div>
        </div>
      </section>

      {/* AI AGENTS & HUMAN INTELLIGENCE BLOCK */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-4xl md:text-7xl leading-tight mb-20 text-white tracking-tight uppercase">
            {arch.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent relative group overflow-hidden animate-scan">
              {/* Enhanced Background Data Processing Effect */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] break-all select-none overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className={`inline-block mx-1 ${i % 3 === 0 ? 'animate-pulse text-[#d4af37]' : 'text-white'}`} style={{ animationDelay: `${i * 0.05}s` }}>
                    {Math.random() > 0.5 ? '0' : '1'}{Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '0' : '1'}{Math.random() > 0.5 ? '1' : '1'} 
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 mb-12 relative z-10">
                <div className="w-16 h-16 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-700 bg-black/40 group-hover:bg-[#d4af37]/10">
                  <Cpu size={32} className="group-hover:animate-pulse group-hover:scale-110" />
                </div>
                <h3 className="text-4xl font-sans tracking-tight text-white font-bold group-hover:translate-x-2 transition-transform duration-500">{arch.aiTitle}</h3>
              </div>
              <p className="font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10 group-hover:text-[#d4af37] transition-colors">{arch.aiDescription}</p>
              
              <div className="space-y-12 relative z-10">
                {arch.aiItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-8 items-start group/item">
                    <div className="w-14 h-14 glass-panel border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] rounded-2xl group-hover/item:bg-[#d4af37] group-hover/item:text-slate-950 group-hover/item:rotate-[12deg] group-hover/item:scale-110 group-hover/item:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 cursor-pointer">
                      {React.cloneElement(item.icon, { className: 'group-hover/item:animate-spin-slow' })}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-sans tracking-tight text-white mb-3 font-bold group-hover/item:text-[#d4af37] transition-colors flex items-center gap-3">
                        {item.title} 
                        {/* Flickering signal dot */}
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full group-hover/item:animate-ping shadow-[0_0_8px_#d4af37]"></div>
                      </h4>
                      <div className="relative overflow-hidden group/text">
                        <p className="text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity">
                          {item.desc}
                        </p>
                        {/* Scanning shimmer overlay for processing feel */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent -translate-x-[200%] group-hover/item:animate-[scan-shimmer_1.5s_infinite] pointer-events-none"></div>
                        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-white/10 group-hover/item:bg-[#d4af37]/40 transition-colors"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent relative group overflow-hidden animate-aura">
              <div className="flex items-center gap-6 mb-12 relative z-10">
                <div className="w-16 h-16 border-2 border-blue-400 flex items-center justify-center text-blue-400 rounded-2xl shadow-xl shadow-blue-500/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 bg-black/40">
                  <Anchor size={32} className="group-hover:animate-bounce" />
                </div>
                <h3 className="text-4xl font-sans tracking-tight text-white font-bold">{arch.humanTitle}</h3>
              </div>
              <p className="font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10">{arch.humanDescription}</p>
              
              <div className="space-y-12 relative z-10">
                {arch.humanItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-8 items-start group/item">
                    <div className="w-14 h-14 glass-panel border-blue-400/40 flex items-center justify-center text-blue-400 rounded-2xl group-hover/item:bg-blue-400 group-hover/item:text-slate-950 group-hover/item:animate-subtle-bounce transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-sans tracking-tight text-white mb-3 font-bold group-hover/item:text-blue-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 px-6 relative overflow-hidden border-y border-white/10">
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading subtitle="The Mythos" title={t.whyPrometheusTitle} mono={true} />
          <p className="text-[#d4af37] text-2xl font-sans tracking-tight mb-10 font-bold">{t.whyPrometheusIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.howItInspires.map((item: any, i: number) => (
              <div key={i} className="p-12 glass-panel border-white/10 group hover:border-[#d4af37]/60 transition-all rounded-[2.5rem] bg-white/[0.04] shadow-2xl">
                <div className="w-16 h-16 flex items-center justify-center text-slate-950 mb-10 bg-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20">
                  {i === 0 ? <Radio size={28} /> : i === 1 ? <Compass size={28} /> : i === 2 ? <ZapOff size={28} /> : <Scale size={28} />}
                </div>
                <h4 className="text-2xl font-sans tracking-tight mb-6 text-white group-hover:text-[#d4af37] transition-colors font-bold">{item.title}</h4>
                <p className="text-slate-100 font-mono text-[13px] tracking-wider leading-relaxed font-bold opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].servicesPage;
  return (
    <div className="pt-56 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle={t.subtitle} title={t.title} />
        <p className="text-white text-xl font-mono font-black mb-20">{t.intro}</p>
        <div className="space-y-12">
          {t.items.map((item: any, i: number) => (
            <div key={i} className="glass-panel p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-12 gap-12 border-white/10 bg-white/[0.01]">
              <div className="md:col-span-1 text-[#d4af37]">{item.icon}</div>
              <div className="md:col-span-7">
                <h3 className="text-4xl font-sans tracking-tight text-white font-bold mb-4">{item.title}</h3>
                <p className="text-[#d4af37] font-mono text-xs font-black mb-8">{item.subtitle}</p>
                <p className="text-slate-300 leading-relaxed font-medium">{item.desc}</p>
              </div>
              <div className="md:col-span-4 glass-panel bg-white/5 rounded-2xl p-8 border-white/5">
                 <ul className="space-y-4">
                   {item.features.map((f: any, j: number) => (
                     <li key={j} className="flex gap-4 items-center font-mono text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
                        {f}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExecutiveEducationView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].educationPage;
  return (
    <div className="pt-56 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle={t.subtitle} title={t.title} />
        <p className="text-white text-xl font-mono font-black mb-20">{t.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {t.offers.map((offer: any) => (
            <div key={offer.id} className="glass-panel p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all bg-white/[0.02]">
              <div className="text-[#d4af37] mb-8">{offer.icon}</div>
              <h3 className="text-3xl font-sans tracking-tight text-white font-bold mb-6">{offer.title}</h3>
              <p className="text-slate-300 font-mono text-xs font-black mb-10 opacity-80">{offer.desc}</p>
              <div className="space-y-4 pt-8 border-t border-white/10">
                {offer.details.map((d: any, i: number) => (
                  <p key={i} className="font-mono text-[11px] font-bold text-slate-300">• {d}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactView = ({ lang }: { lang: Language }) => {
  const t = UI_TEXT[lang].contactPage;
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const errors = {
    name: formData.name.trim().length < 2 ? 'Name must be at least 2 characters.' : null,
    email: !validateEmail(formData.email) ? 'Please enter a valid email address.' : null,
    message: formData.message.trim().length < 10 ? 'Message must be at least 10 characters.' : null,
  };

  const isFormValid = !errors.name && !errors.email && !errors.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const subject = encodeURIComponent(`Contact Request from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:thomas@skilmi.fr?subject=${subject}&body=${body}`;
      setSuccess(true);
    }
  };

  return (
    <div className="pt-56 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading subtitle={t.subtitle} title={t.title} />
        <div className="glass-panel p-12 rounded-[2.5rem]">
          {success ? (
            <div className="text-center py-20 animate-in zoom-in">
               <CheckCircle2 size={64} className="text-[#d4af37] mx-auto mb-10" />
               <h3 className="text-3xl font-sans tracking-tight text-white font-bold mb-4">Transmission Successful</h3>
               <p className="font-mono text-slate-300 font-black">{t.labels.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 text-white">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="font-mono text-[10px] text-[#d4af37] font-black uppercase">{t.labels.name}</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-black/40 border-2 p-5 rounded-2xl outline-none transition-colors pr-12 ${touched.name && errors.name ? 'border-red-500/50 focus:border-red-500' : touched.name && !errors.name ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-white/10 focus:border-[#d4af37]'}`} 
                      />
                      {touched.name && !errors.name && <CheckCircle2 size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" />}
                    </div>
                    {touched.name && errors.name && <p className="text-red-400 font-mono text-[10px] uppercase tracking-wider">{errors.name}</p>}
                  </div>
                  <div className="space-y-4">
                    <label className="font-mono text-[10px] text-[#d4af37] font-black uppercase">{t.labels.email}</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full bg-black/40 border-2 p-5 rounded-2xl outline-none transition-colors pr-12 ${touched.email && errors.email ? 'border-red-500/50 focus:border-red-500' : touched.email && !errors.email ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-white/10 focus:border-[#d4af37]'}`} 
                      />
                      {touched.email && !errors.email && <CheckCircle2 size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" />}
                    </div>
                    {touched.email && errors.email && <p className="text-red-400 font-mono text-[10px] uppercase tracking-wider">{errors.email}</p>}
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="font-mono text-[10px] text-[#d4af37] font-black uppercase">{t.labels.message}</label>
                  <div className="relative">
                    <textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-black/40 border-2 p-5 rounded-2xl outline-none resize-none transition-colors pr-12 ${touched.message && errors.message ? 'border-red-500/50 focus:border-red-500' : touched.message && !errors.message ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-white/10 focus:border-[#d4af37]'}`}
                    ></textarea>
                    {touched.message && !errors.message && <CheckCircle2 size={18} className="absolute right-5 top-6 text-emerald-500" />}
                  </div>
                  {touched.message && errors.message && <p className="text-red-400 font-mono text-[10px] uppercase tracking-wider">{errors.message}</p>}
               </div>
               <button 
                 type="submit" 
                 disabled={!isFormValid}
                 className={`w-full py-6 font-black uppercase tracking-[0.4em] rounded-2xl transition-all ${isFormValid ? 'bg-[#d4af37] text-slate-950 hover:bg-white cursor-pointer' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
               >
                 {t.labels.submit}
               </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<string>('home');
  const t = UI_TEXT[lang];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  // Determine dynamic background color based on current page
  const getBgColor = () => {
    switch (page) {
      case 'services':
        return 'bg-gradient-to-br from-[#060b1e] via-[#030510] to-[#010205]'; // Distinct Midnight Command Navy for Advisory
      case 'education':
        return 'bg-gradient-to-br from-[#120e0c] via-[#0a0705] to-[#050302]'; // Distinct Walnut Antique Charcoal for Education
      case 'foundry':
        return 'bg-slate-50'; // Keep flat for light mode readability
      case 'manifesto':
        return 'bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]'; // Pure Obsidian for Briefing/Manifesto
      case 'use-case-taiwan':
        return 'bg-gradient-to-br from-[#1a0a0a] via-[#080404] to-[#000000]'; // Deep Kinetic Red for Taiwan Scenario
      case 'contact':
        return 'bg-gradient-to-br from-[#111111] via-[#080808] to-[#000000]'; // Neutral Deep Black for Contact
      default:
        return 'bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]'; // Default Obsidian for Home
    }
  };

  const renderContent = () => {
    if (page === 'home') return <LandingView lang={lang} setPage={setPage} t={t} />;
    if (page === 'manifesto') return <ManifestoView lang={lang} />;
    if (page === 'services') return <ServicesView lang={lang} />;
    if (page === 'education') return <ExecutiveEducationView lang={lang} />;
    if (page === 'foundry') return <FoundryView lang={lang} />;
    if (page === 'use-case-taiwan') return <UseCaseTaiwanView lang={lang} />;
    if (page === 'contact') return <ContactView lang={lang} />;
    
    // Handle dynamic article routes
    if (page.startsWith('briefings/')) {
      const id = page.split('/')[1];
      return <ArticleDetailView lang={lang} articleId={id} setPage={setPage} />;
    }

    return <LandingView lang={lang} setPage={setPage} t={t} />;
  };

  return (
    <div className={`min-h-screen ${getBgColor()} bg-fixed ${page === 'foundry' ? 'text-slate-900' : 'text-slate-100'} selection:bg-[#d4af37] selection:text-slate-950 transition-colors duration-[1200ms] ease-in-out`}>
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} page={page} setPage={setPage} />
      <main className="relative z-10">
        {renderContent()}
        <section className={`py-56 bg-[#d4af37] text-slate-950 px-6 text-center transition-all duration-700`}>
          <h2 className="font-sans tracking-tight text-6xl md:text-8xl mb-16 font-bold">Recover the Lead.</h2>
          <button onClick={() => setPage('contact')} className="px-16 py-6 bg-slate-950 text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all">
            Establish Session
          </button>
        </section>
      </main>
      <footer className={`py-20 border-t border-white/10 px-6 bg-black/80 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <PrometheusIcon className="w-8 h-8 text-[#d4af37]" />
            <span className="font-sans text-2xl font-bold text-white">Prometheus Advisory</span>
          </div>
          <div className="flex gap-10 font-mono text-[10px] uppercase font-bold text-slate-300">
             <button className="hover:text-[#d4af37]">Protocols</button>
             <button className="hover:text-[#d4af37]">Data Policy</button>
             <button className="hover:text-[#d4af37]">Theory of Action</button>
          </div>
          <p className="font-mono text-[9px] opacity-40 uppercase font-black">© 2025 PROMETHEUS ADVISORY GROUP</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
