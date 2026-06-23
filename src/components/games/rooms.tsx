import React from "react";
import type { GameObjectId } from "./objects";

export type RoomId =
  | "bedroom" | "living-room" | "kitchen" | "dining-room" | "study-room"
  | "classroom" | "library" | "office" | "computer-lab" | "science-lab"
  | "garden" | "playground" | "hospital" | "coffee-shop" | "supermarket"
  | "train-station" | "airport-lounge" | "restaurant" | "art-studio" | "music-room";

export type RoomObjectPlacement = { objectId: GameObjectId; x: number; y: number };

export type RoomDef = { id: RoomId; name: string; roomSvg: React.FC; objects: RoomObjectPlacement[] };

const SD: React.FC = () => (
  <defs>
    <filter id="ss"><feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.15" /></filter>
    <filter id="sm"><feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.2" /></filter>
  </defs>
);

export const ROOMS: RoomDef[] = [
  // ── 1. Bedroom ──
  {
    id: "bedroom", name: "Bedroom",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="brw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e0d4" /><stop offset="100%" stopColor="#d8cfc2" /></linearGradient>
          <linearGradient id="brf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c4a882" /><stop offset="100%" stopColor="#b89c72" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#brw)" />
        <rect y="250" width="800" height="12" fill="#b8a88c" />
        <rect y="262" width="800" height="188" fill="url(#brf)" />
        {[0,100,200,300,400,500,600,700].map(x=><line key={x} x1={x} y1="262" x2={x} y2="450" stroke="#b09060" strokeWidth="0.5" opacity="0.3" />)}
        <rect x="530" y="20" width="160" height="180" rx="4" fill="#b8d4f0" />
        <rect x="530" y="20" width="160" height="180" rx="4" fill="none" stroke="#8B7355" strokeWidth="6" />
        <line x1="610" y1="20" x2="610" y2="200" stroke="#8B7355" strokeWidth="3" />
        <line x1="530" y1="110" x2="690" y2="110" stroke="#8B7355" strokeWidth="3" />
        <path d="M520,15 Q518,100 522,200" fill="#d4c8b4" opacity="0.85" />
        <path d="M698,15 Q702,100 698,200" fill="#d4c8b4" opacity="0.85" />
        <rect x="40" y="210" width="400" height="195" rx="8" fill="#8B7355" filter="url(#sm)" />
        <rect x="50" y="215" width="380" height="90" rx="6" fill="#f0ebe3" />
        <rect x="50" y="260" width="380" height="45" rx="4" fill="#7a8fa6" />
        <ellipse cx="120" cy="235" rx="55" ry="20" fill="#f5f0e8" filter="url(#ss)" />
        <ellipse cx="240" cy="235" rx="55" ry="20" fill="#f5f0e8" filter="url(#ss)" />
        <ellipse cx="120" cy="233" rx="45" ry="14" fill="#faf5ed" />
        <ellipse cx="240" cy="233" rx="45" ry="14" fill="#faf5ed" />
        <rect x="40" y="170" width="130" height="50" rx="6" fill="#6b5b3e" />
        <rect x="450" y="290" width="80" height="100" rx="5" fill="#8B7355" filter="url(#ss)" />
        <rect x="454" y="295" width="72" height="35" rx="3" fill="#a0845c" />
        <circle cx="490" cy="312" r="3" fill="#6b5b3e" />
        <rect x="620" y="50" width="150" height="350" rx="6" fill="#6b5b3e" filter="url(#sm)" />
        <line x1="695" y1="55" x2="695" y2="395" stroke="#5a4a32" strokeWidth="2" />
        <circle cx="686" cy="225" r="4" fill="#a0845c" />
        <circle cx="704" cy="225" r="4" fill="#a0845c" />
        <ellipse cx="250" cy="430" rx="180" ry="20" fill="#a0845c" opacity="0.4" />
      </svg>
    ),
    objects: [
      { objectId: "book", x: 12, y: 70 }, { objectId: "laptop", x: 45, y: 62 },
      { objectId: "lamp", x: 58, y: 48 }, { objectId: "clock", x: 60, y: 12 },
      { objectId: "glasses", x: 56, y: 65 }, { objectId: "toy", x: 20, y: 70 },
      { objectId: "phone", x: 65, y: 58 }, { objectId: "notebook", x: 82, y: 30 },
      { objectId: "shoes", x: 10, y: 88 }, { objectId: "bag", x: 85, y: 70 },
      { objectId: "plant", x: 75, y: 15 }, { objectId: "photo-frame", x: 40, y: 15 },
      { objectId: "headphones", x: 30, y: 65 }, { objectId: "cup", x: 60, y: 62 },
      { objectId: "candle", x: 57, y: 58 },
    ],
  },
  // ── 2. Living Room ──
  {
    id: "living-room", name: "Living Room",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="lrw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e4dc" /><stop offset="100%" stopColor="#d8d0c4" /></linearGradient>
          <linearGradient id="lrf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b898" /><stop offset="100%" stopColor="#b8a888" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#lrw)" />
        <rect y="250" width="800" height="12" fill="#b0a088" />
        <rect y="262" width="800" height="188" fill="url(#lrf)" />
        <rect x="300" y="15" width="200" height="180" rx="4" fill="#b8d4f0" />
        <rect x="300" y="15" width="200" height="180" rx="4" fill="none" stroke="#8B7355" strokeWidth="6" />
        <line x1="400" y1="15" x2="400" y2="195" stroke="#8B7355" strokeWidth="3" />
        <path d="M290,10 Q288,100 292,195" fill="#d4c8b4" opacity="0.8" />
        <path d="M508,10 Q512,100 508,195" fill="#d4c8b4" opacity="0.8" />
        <rect x="50" y="230" width="350" height="40" rx="10" fill="#6a7f96" />
        <rect x="35" y="250" width="25" height="120" rx="10" fill="#6a7f96" />
        <rect x="390" y="250" width="25" height="120" rx="10" fill="#6a7f96" />
        <rect x="50" y="260" width="350" height="120" rx="12" fill="#7a8fa6" filter="url(#sm)" />
        <rect x="60" y="300" width="330" height="70" rx="8" fill="#6a7f96" />
        <rect x="70" y="245" width="100" height="35" rx="10" fill="#9aafcc" />
        <rect x="185" y="245" width="100" height="35" rx="10" fill="#9aafcc" />
        <rect x="300" y="245" width="85" height="35" rx="10" fill="#9aafcc" />
        <rect x="150" y="388" width="200" height="12" rx="4" fill="#a0845c" filter="url(#ss)" />
        <rect x="160" y="400" width="6" height="35" rx="2" fill="#8B7355" />
        <rect x="334" y="400" width="6" height="35" rx="2" fill="#8B7355" />
        <rect x="560" y="280" width="180" height="100" rx="6" fill="#6b5b3e" filter="url(#ss)" />
        <rect x="585" y="170" width="140" height="100" rx="4" fill="#1e293b" filter="url(#sm)" />
        <rect x="590" y="175" width="130" height="85" rx="3" fill="#38bdf8" />
        <rect x="648" y="270" width="24" height="12" rx="2" fill="#475569" />
        <rect x="540" y="50" width="30" height="210" rx="3" fill="#8B7355" />
        <rect x="540" y="50" width="90" height="8" rx="2" fill="#7a6b4e" />
        <rect x="540" y="110" width="90" height="8" rx="2" fill="#7a6b4e" />
        <rect x="540" y="170" width="90" height="8" rx="2" fill="#7a6b4e" />
        <rect x="540" y="248" width="90" height="12" rx="2" fill="#7a6b4e" />
        <rect x="548" y="58" width="12" height="50" rx="1" fill="#2563eb" />
        <rect x="562" y="65" width="10" height="43" rx="1" fill="#ef4444" />
        <rect x="574" y="58" width="14" height="50" rx="1" fill="#16a34a" />
        <rect x="590" y="62" width="11" height="46" rx="1" fill="#f59e0b" />
        <rect x="603" y="58" width="15" height="50" rx="1" fill="#8b5cf6" />
        <rect x="710" y="380" width="30" height="40" rx="4" fill="#92400e" />
        <circle cx="725" cy="365" r="22" fill="#22c55e" />
        <circle cx="715" cy="358" r="15" fill="#16a34a" />
        <circle cx="735" cy="355" r="18" fill="#15803d" />
      </svg>
    ),
    objects: [
      { objectId: "book", x: 12, y: 70 }, { objectId: "cup", x: 50, y: 70 },
      { objectId: "plant", x: 82, y: 20 }, { objectId: "clock", x: 60, y: 12 },
      { objectId: "photo-frame", x: 15, y: 15 }, { objectId: "phone", x: 30, y: 68 },
      { objectId: "notebook", x: 22, y: 62 }, { objectId: "candle", x: 65, y: 65 },
      { objectId: "headphones", x: 80, y: 45 }, { objectId: "vase", x: 85, y: 20 },
      { objectId: "shoes", x: 8, y: 90 }, { objectId: "bag", x: 15, y: 85 },
      { objectId: "pen", x: 55, y: 75 }, { objectId: "glasses", x: 48, y: 68 },
      { objectId: "lamp", x: 10, y: 45 },
    ],
  },
  // ── 3. Kitchen ──
  {
    id: "kitchen", name: "Kitchen",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="ktw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f5f0e8" /><stop offset="100%" stopColor="#e8e0d4" /></linearGradient>
          <linearGradient id="ktf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d4c5a9" /><stop offset="100%" stopColor="#c4b599" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#ktw)" />
        <rect y="250" width="800" height="12" fill="#b8a888" />
        <rect y="262" width="800" height="188" fill="url(#ktf)" />
        <rect x="10" y="150" width="350" height="100" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="10" y="148" width="350" height="8" rx="3" fill="#a0845c" />
        <rect x="10" y="30" width="80" height="110" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="100" y="30" width="80" height="110" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="190" y="30" width="80" height="110" rx="4" fill="#8B7355" filter="url(#ss)" />
        <circle cx="50" cy="85" r="3" fill="#a0845c" />
        <circle cx="140" cy="85" r="3" fill="#a0845c" />
        <circle cx="230" cy="85" r="3" fill="#a0845c" />
        <rect x="420" y="20" width="160" height="140" rx="4" fill="#b8d4f0" />
        <rect x="420" y="20" width="160" height="140" rx="4" fill="none" stroke="#8B7355" strokeWidth="5" />
        <line x1="500" y1="20" x2="500" y2="160" stroke="#8B7355" strokeWidth="2.5" />
        <line x1="420" y1="90" x2="580" y2="90" stroke="#8B7355" strokeWidth="2.5" />
        <rect x="620" y="60" width="130" height="340" rx="6" fill="#d1d5db" filter="url(#sm)" />
        <rect x="620" y="60" width="130" height="180" rx="6" fill="#e5e7eb" />
        <line x1="620" y1="240" x2="750" y2="240" stroke="#9ca3af" strokeWidth="1.5" />
        <rect x="738" y="130" width="4" height="30" rx="2" fill="#9ca3af" />
        <rect x="738" y="280" width="4" height="40" rx="2" fill="#9ca3af" />
        <rect x="380" y="300" width="150" height="140" rx="6" fill="#475569" filter="url(#ss)" />
        <rect x="380" y="298" width="150" height="8" rx="3" fill="#64748b" />
        <circle cx="420" cy="340" r="18" fill="#334155" />
        <circle cx="420" cy="340" r="14" fill="#1e293b" />
        <circle cx="490" cy="340" r="18" fill="#334155" />
        <circle cx="490" cy="340" r="14" fill="#1e293b" />
        <ellipse cx="200" cy="168" rx="40" ry="15" fill="#94a3b8" />
        <ellipse cx="200" cy="168" rx="35" ry="12" fill="#cbd5e1" />
        <rect x="198" y="140" width="4" height="20" rx="2" fill="#94a3b8" />
      </svg>
    ),
    objects: [
      { objectId: "cup", x: 15, y: 12 }, { objectId: "bottle", x: 50, y: 10 },
      { objectId: "apple", x: 70, y: 18 }, { objectId: "plant", x: 85, y: 8 },
      { objectId: "clock", x: 45, y: 42 }, { objectId: "notebook", x: 12, y: 65 },
      { objectId: "pen", x: 25, y: 75 }, { objectId: "phone", x: 80, y: 70 },
      { objectId: "bag", x: 55, y: 85 }, { objectId: "book", x: 78, y: 62 },
      { objectId: "shoes", x: 35, y: 90 }, { objectId: "photo-frame", x: 90, y: 42 },
      { objectId: "toy", x: 60, y: 78 }, { objectId: "headphones", x: 18, y: 82 },
      { objectId: "vase", x: 42, y: 12 },
    ],
  },
  // ── 4. Study Room ──
  {
    id: "study-room", name: "Study Room",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="srw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e4e8" /><stop offset="100%" stopColor="#d0d4d8" /></linearGradient>
          <linearGradient id="srf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b0a898" /><stop offset="100%" stopColor="#a09888" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#srw)" />
        <rect y="250" width="800" height="12" fill="#a09888" />
        <rect y="262" width="800" height="188" fill="url(#srf)" />
        <rect x="50" y="20" width="140" height="170" rx="4" fill="#b8d4f0" />
        <rect x="50" y="20" width="140" height="170" rx="4" fill="none" stroke="#8B7355" strokeWidth="5" />
        <line x1="120" y1="20" x2="120" y2="190" stroke="#8B7355" strokeWidth="2.5" />
        <path d="M42,15 Q40,100 44,190" fill="#d4c8b4" opacity="0.8" />
        <path d="M196,15 Q200,100 196,190" fill="#d4c8b4" opacity="0.8" />
        <rect x="260" y="240" width="320" height="16" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="275" y="256" width="10" height="150" rx="2" fill="#7a6b4e" />
        <rect x="555" y="256" width="10" height="150" rx="2" fill="#7a6b4e" />
        <rect x="540" y="256" width="35" height="90" rx="3" fill="#7a6b4e" />
        <rect x="542" y="260" width="31" height="25" rx="2" fill="#8B7355" />
        <rect x="542" y="290" width="31" height="25" rx="2" fill="#8B7355" />
        <rect x="542" y="320" width="31" height="22" rx="2" fill="#8B7355" />
        <circle cx="557" cy="272" r="2" fill="#a0845c" />
        <circle cx="557" cy="302" r="2" fill="#a0845c" />
        <circle cx="557" cy="331" r="2" fill="#a0845c" />
        <rect x="350" y="340" width="100" height="12" rx="4" fill="#475569" filter="url(#ss)" />
        <rect x="370" y="352" width="60" height="10" rx="2" fill="#334155" />
        <rect x="380" y="362" width="4" height="50" rx="1" fill="#64748b" />
        <rect x="416" y="362" width="4" height="50" rx="1" fill="#64748b" />
        <rect x="370" y="290" width="60" height="55" rx="6" fill="#475569" />
        <rect x="370" y="280" width="60" height="15" rx="4" fill="#334155" />
        <rect x="620" y="40" width="140" height="360" rx="6" fill="#6b5b3e" filter="url(#sm)" />
        {[55,130,205,280,355].map(y=><rect key={y} x="620" y={y} width="140" height="10" rx="2" fill="#5a4a32" />)}
        <rect x="628" y="62" width="14" height="66" rx="1" fill="#2563eb" />
        <rect x="644" y="68" width="12" height="60" rx="1" fill="#ef4444" />
        <rect x="658" y="62" width="16" height="66" rx="1" fill="#16a34a" />
        <rect x="676" y="65" width="11" height="63" rx="1" fill="#f59e0b" />
        <rect x="689" y="62" width="14" height="66" rx="1" fill="#8b5cf6" />
        <rect x="628" y="138" width="16" height="65" rx="1" fill="#0891b2" />
        <rect x="646" y="142" width="13" height="61" rx="1" fill="#dc2626" />
        <rect x="661" y="138" width="12" height="65" rx="1" fill="#059669" />
      </svg>
    ),
    objects: [
      { objectId: "laptop", x: 38, y: 38 }, { objectId: "keyboard", x: 50, y: 50 },
      { objectId: "mouse", x: 58, y: 52 }, { objectId: "cup", x: 60, y: 40 },
      { objectId: "notebook", x: 22, y: 42 }, { objectId: "pen", x: 25, y: 48 },
      { objectId: "plant", x: 82, y: 8 }, { objectId: "book", x: 80, y: 25 },
      { objectId: "phone", x: 48, y: 55 }, { objectId: "clock", x: 15, y: 15 },
      { objectId: "photo-frame", x: 78, y: 45 }, { objectId: "headphones", x: 35, y: 40 },
      { objectId: "bag", x: 10, y: 80 }, { objectId: "shoes", x: 28, y: 88 },
      { objectId: "lamp", x: 62, y: 42 },
    ],
  },
  // ── 5. Classroom ──
  {
    id: "classroom", name: "Classroom",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="clw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f5f0e8" /><stop offset="100%" stopColor="#e8e0d4" /></linearGradient>
          <linearGradient id="clf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b898" /><stop offset="100%" stopColor="#b8a888" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#clw)" />
        <rect y="250" width="800" height="12" fill="#b0a088" />
        <rect y="262" width="800" height="188" fill="url(#clf)" />
        <rect x="200" y="30" width="300" height="170" rx="4" fill="#2d5016" filter="url(#sm)" />
        <rect x="200" y="30" width="300" height="170" rx="4" fill="none" stroke="#8B7355" strokeWidth="6" />
        <rect x="210" y="40" width="280" height="150" rx="2" fill="#3a6b20" opacity="0.5" />
        <text x="240" y="120" fill="white" fontSize="14" opacity="0.5" fontFamily="serif">A + B = C</text>
        <rect x="330" y="190" width="40" height="6" rx="2" fill="#8B7355" />
        <rect x="560" y="20" width="100" height="140" rx="4" fill="#b8d4f0" />
        <rect x="560" y="20" width="100" height="140" rx="4" fill="none" stroke="#8B7355" strokeWidth="4" />
        <line x1="610" y1="20" x2="610" y2="160" stroke="#8B7355" strokeWidth="2" />
        <rect x="680" y="20" width="100" height="140" rx="4" fill="#b8d4f0" />
        <rect x="680" y="20" width="100" height="140" rx="4" fill="none" stroke="#8B7355" strokeWidth="4" />
        <line x1="730" y1="20" x2="730" y2="160" stroke="#8B7355" strokeWidth="2" />
        <rect x="250" y="220" width="200" height="14" rx="3" fill="#8B7355" filter="url(#ss)" />
        <rect x="260" y="234" width="8" height="100" rx="2" fill="#7a6b4e" />
        <rect x="432" y="234" width="8" height="100" rx="2" fill="#7a6b4e" />
        {[0,1,2].map(row=>[0,1,2,3].map(col=>(
          <g key={`${row}-${col}`}>
            <rect x={100+col*150} y={300+row*50} width="80" height="10" rx="2" fill="#a0845c" filter="url(#ss)" />
            <rect x={110+col*150} y={310+row*50} width="4" height="30" rx="1" fill="#8B7355" />
            <rect x={166+col*150} y={310+row*50} width="4" height="30" rx="1" fill="#8B7355" />
          </g>
        )))}
      </svg>
    ),
    objects: [
      { objectId: "book", x: 18, y: 48 }, { objectId: "notebook", x: 58, y: 50 },
      { objectId: "pen", x: 25, y: 55 }, { objectId: "pencil", x: 65, y: 55 },
      { objectId: "eraser", x: 15, y: 75 }, { objectId: "ruler", x: 55, y: 78 },
      { objectId: "clock", x: 80, y: 10 }, { objectId: "plant", x: 10, y: 10 },
      { objectId: "bag", x: 88, y: 85 }, { objectId: "phone", x: 40, y: 80 },
      { objectId: "cup", x: 72, y: 48 }, { objectId: "laptop", x: 22, y: 80 },
      { objectId: "headphones", x: 78, y: 78 }, { objectId: "photo-frame", x: 5, y: 35 },
      { objectId: "toy", x: 88, y: 50 },
    ],
  },
  // ── 6. Library ──
  {
    id: "library", name: "Library",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="lbw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0dcd4" /><stop offset="100%" stopColor="#d0ccc4" /></linearGradient>
          <linearGradient id="lbf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b8a890" /><stop offset="100%" stopColor="#a89880" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#lbw)" />
        <rect y="250" width="800" height="12" fill="#a89880" />
        <rect y="262" width="800" height="188" fill="url(#lbf)" />
        {[0,1,2,3,4].map(i=><g key={i}>
          <rect x={i*155+5} y="30" width="40" height="220" rx="3" fill="#6b5b3e" filter="url(#ss)" />
          <rect x={i*155+5} y="38" width="40" height="5" fill="#5a4a32" />
          <rect x={i*155+5} y="88" width="40" height="5" fill="#5a4a32" />
          <rect x={i*155+5} y="138" width="40" height="5" fill="#5a4a32" />
          <rect x={i*155+5} y="188" width="40" height="5" fill="#5a4a32" />
          <rect x={i*155+5} y="238" width="40" height="12" fill="#5a4a32" />
          <rect x={i*155+8} y="44" width="8" height="42" rx="1" fill={["#2563eb","#ef4444","#16a34a","#f59e0b","#8b5cf6"][i]} />
          <rect x={i*155+18} y="48" width="7" height="38" rx="1" fill={["#ec4899","#0891b2","#dc2626","#7c3aed","#059669"][i]} />
          <rect x={i*155+27} y="44" width="9" height="42" rx="1" fill={["#f97316","#1d4ed8","#059669","#dc2626","#2563eb"][i]} />
        </g>)}
        <rect x="100" y="340" width="600" height="14" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="120" y="354" width="8" height="70" rx="2" fill="#7a6b4e" />
        <rect x="672" y="354" width="8" height="70" rx="2" fill="#7a6b4e" />
        <rect x="200" y="320" width="4" height="20" rx="1" fill="#a0845c" />
        <path d="M188,320 L202,308 L216,320 Z" fill="#fbbf24" />
        <rect x="500" y="320" width="4" height="20" rx="1" fill="#a0845c" />
        <path d="M488,320 L502,308 L516,320 Z" fill="#fbbf24" />
      </svg>
    ),
    objects: [
      { objectId: "book", x: 12, y: 15 }, { objectId: "book", x: 28, y: 15 },
      { objectId: "book", x: 44, y: 15 }, { objectId: "notebook", x: 60, y: 15 },
      { objectId: "lamp", x: 25, y: 65 }, { objectId: "lamp", x: 65, y: 65 },
      { objectId: "pen", x: 35, y: 78 }, { objectId: "glasses", x: 55, y: 78 },
      { objectId: "phone", x: 45, y: 82 }, { objectId: "cup", x: 72, y: 78 },
      { objectId: "clock", x: 88, y: 12 }, { objectId: "plant", x: 92, y: 50 },
      { objectId: "bag", x: 8, y: 88 }, { objectId: "candle", x: 50, y: 75 },
      { objectId: "photo-frame", x: 78, y: 35 },
    ],
  },
  // ── 7. Office ──
  {
    id: "office", name: "Office",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="ofw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e4e8" /><stop offset="100%" stopColor="#d0d4d8" /></linearGradient>
          <linearGradient id="off" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b0a898" /><stop offset="100%" stopColor="#a09888" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#ofw)" />
        <rect y="250" width="800" height="12" fill="#a09888" />
        <rect y="262" width="800" height="188" fill="url(#off)" />
        <rect x="30" y="20" width="120" height="180" rx="4" fill="#b8d4f0" />
        <rect x="30" y="20" width="120" height="180" rx="4" fill="none" stroke="#8B7355" strokeWidth="5" />
        <line x1="90" y1="20" x2="90" y2="200" stroke="#8B7355" strokeWidth="2.5" />
        <rect x="200" y="230" width="350" height="14" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="210" y="244" width="8" height="130" rx="2" fill="#7a6b4e" />
        <rect x="532" y="244" width="8" height="130" rx="2" fill="#7a6b4e" />
        <rect x="300" y="140" width="160" height="90" rx="4" fill="#1e293b" filter="url(#ss)" />
        <rect x="305" y="145" width="150" height="75" rx="3" fill="#38bdf8" />
        <rect x="370" y="230" width="20" height="8" rx="2" fill="#475569" />
        <rect x="350" y="226" width="60" height="6" rx="2" fill="#64748b" />
        <rect x="320" y="340" width="100" height="10" rx="4" fill="#475569" filter="url(#ss)" />
        <rect x="365" y="350" width="10" height="30" rx="2" fill="#334155" />
        <rect x="330" y="280" width="80" height="65" rx="8" fill="#475569" />
        <rect x="330" y="270" width="80" height="16" rx="6" fill="#334155" />
        <rect x="600" y="50" width="160" height="350" rx="6" fill="#6b5b3e" filter="url(#sm)" />
        {[60,130,200,270,340].map(y=><rect key={y} x="600" y={y} width="160" height="8" rx="2" fill="#5a4a32" />)}
        <rect x="608" y="66" width="14" height="62" rx="1" fill="#2563eb" />
        <rect x="624" y="70" width="12" height="58" rx="1" fill="#ef4444" />
        <rect x="638" y="66" width="16" height="62" rx="1" fill="#16a34a" />
        <rect x="656" y="72" width="11" height="56" rx="1" fill="#f59e0b" />
        <rect x="669" y="66" width="14" height="62" rx="1" fill="#8b5cf6" />
        <rect x="580" y="380" width="25" height="35" rx="4" fill="#92400e" />
        <circle cx="592" cy="368" r="18" fill="#22c55e" />
        <circle cx="585" cy="360" r="12" fill="#16a34a" />
      </svg>
    ),
    objects: [
      { objectId: "laptop", x: 38, y: 38 }, { objectId: "keyboard", x: 50, y: 52 },
      { objectId: "mouse", x: 58, y: 52 }, { objectId: "cup", x: 62, y: 40 },
      { objectId: "notebook", x: 22, y: 42 }, { objectId: "pen", x: 25, y: 48 },
      { objectId: "plant", x: 75, y: 8 }, { objectId: "book", x: 80, y: 25 },
      { objectId: "phone", x: 48, y: 55 }, { objectId: "clock", x: 15, y: 15 },
      { objectId: "photo-frame", x: 78, y: 45 }, { objectId: "headphones", x: 35, y: 40 },
      { objectId: "bag", x: 10, y: 80 }, { objectId: "shoes", x: 28, y: 88 },
      { objectId: "lamp", x: 62, y: 42 },
    ],
  },
  // ── 8. Computer Lab ──
  {
    id: "computer-lab", name: "Computer Lab",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="c2w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e4e8" /><stop offset="100%" stopColor="#d0d4d8" /></linearGradient></defs>
        <rect width="800" height="260" fill="url(#c2w)" />
        <rect y="250" width="800" height="12" fill="#a09888" />
        <rect y="262" width="800" height="188" fill="#b0a898" />
        <rect x="250" y="20" width="300" height="140" rx="4" fill="white" filter="url(#ss)" />
        <rect x="250" y="20" width="300" height="140" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
        {[0,1].map(row=>[0,1,2,3].map(col=>(
          <g key={`${row}-${col}`}>
            <rect x={80+col*160} y={280+row*80} width="120" height="10" rx="3" fill="#8B7355" />
            <rect x={90+col*160} y={290+row*80} width="4" height="40" rx="1" fill="#7a6b4e" />
            <rect x={206+col*160} y={290+row*80} width="4" height="40" rx="1" fill="#7a6b4e" />
            <rect x={100+col*160} y={230+row*80} width="80" height="50" rx="3" fill="#1e293b" />
            <rect x={103+col*160} y={233+row*80} width="74" height="40" rx="2" fill="#38bdf8" />
            <rect x={130+col*160} y={272+row*80} width="20" height="6" rx="2" fill="#475569" />
          </g>
        )))}
      </svg>
    ),
    objects: [
      { objectId: "keyboard", x: 18, y: 65 }, { objectId: "mouse", x: 22, y: 68 },
      { objectId: "cup", x: 12, y: 62 }, { objectId: "notebook", x: 28, y: 65 },
      { objectId: "headphones", x: 32, y: 62 }, { objectId: "phone", x: 38, y: 68 },
      { objectId: "bag", x: 8, y: 85 }, { objectId: "book", x: 42, y: 65 },
      { objectId: "pen", x: 15, y: 70 }, { objectId: "clock", x: 88, y: 10 },
      { objectId: "plant", x: 92, y: 35 }, { objectId: "glasses", x: 25, y: 72 },
      { objectId: "laptop", x: 35, y: 65 }, { objectId: "eraser", x: 20, y: 75 },
      { objectId: "shoes", x: 10, y: 90 },
    ],
  },
  // ── 9. Science Lab ──
  {
    id: "science-lab", name: "Science Lab",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="slw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0f0f0" /><stop offset="100%" stopColor="#e0e0e0" /></linearGradient></defs>
        <rect width="800" height="260" fill="url(#slw)" />
        <rect y="250" width="800" height="12" fill="#c0c0c0" />
        <rect y="262" width="800" height="188" fill="#d0d0d0" />
        <rect x="100" y="250" width="600" height="14" rx="3" fill="#94a3b8" filter="url(#ss)" />
        <rect x="110" y="264" width="8" height="100" rx="2" fill="#64748b" />
        <rect x="682" y="264" width="8" height="100" rx="2" fill="#64748b" />
        <rect x="300" y="264" width="8" height="100" rx="2" fill="#64748b" />
        <rect x="10" y="30" width="80" height="220" rx="4" fill="#94a3b8" filter="url(#ss)" />
        <rect x="14" y="35" width="72" height="65" rx="2" fill="#a8b8c8" />
        <rect x="14" y="108" width="72" height="65" rx="2" fill="#a8b8c8" />
        <rect x="14" y="181" width="72" height="65" rx="2" fill="#a8b8c8" />
        <circle cx="50" cy="67" r="3" fill="#64748b" />
        <circle cx="50" cy="140" r="3" fill="#64748b" />
        <circle cx="50" cy="213" r="3" fill="#64748b" />
        <rect x="650" y="30" width="80" height="100" rx="3" fill="white" filter="url(#ss)" />
        <rect x="655" y="35" width="70" height="20" rx="1" fill="#ef4444" />
        <text x="662" y="50" fill="white" fontSize="8" fontWeight="bold">SAFETY</text>
        <path d="M200,250 L195,220 L215,220 L210,250 Z" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
        <path d="M260,250 L255,225 L275,225 L270,250 Z" fill="#bbf7d0" stroke="#86efac" strokeWidth="1" />
        <path d="M400,250 L395,230 L415,230 L410,250 Z" fill="#fecaca" stroke="#fca5a5" strokeWidth="1" />
        <rect x="520" y="230" width="30" height="20" rx="3" fill="#334155" />
        <rect x="532" y="210" width="6" height="25" rx="1" fill="#475569" />
        <rect x="526" y="206" width="18" height="8" rx="2" fill="#1e293b" />
      </svg>
    ),
    objects: [
      { objectId: "bottle", x: 25, y: 55 }, { objectId: "bottle", x: 32, y: 55 },
      { objectId: "notebook", x: 15, y: 25 }, { objectId: "pen", x: 18, y: 30 },
      { objectId: "glasses", x: 22, y: 45 }, { objectId: "clock", x: 88, y: 10 },
      { objectId: "book", x: 82, y: 35 }, { objectId: "phone", x: 85, y: 55 },
      { objectId: "cup", x: 55, y: 55 }, { objectId: "ruler", x: 62, y: 58 },
      { objectId: "pencil", x: 68, y: 55 }, { objectId: "bag", x: 92, y: 85 },
      { objectId: "plant", x: 92, y: 15 }, { objectId: "eraser", x: 58, y: 60 },
      { objectId: "lamp", x: 72, y: 55 },
    ],
  },
  // ── 10. Garden ──
  {
    id: "garden", name: "Garden",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="gsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#87CEEB" /><stop offset="100%" stopColor="#b0e0f0" /></linearGradient></defs>
        <rect width="800" height="250" fill="url(#gsk)" />
        <rect y="250" width="800" height="200" fill="#4ade80" />
        <rect y="250" width="800" height="200" fill="#22c55e" opacity="0.5" />
        <path d="M350,450 Q380,380 400,320 Q420,260 400,250" fill="none" stroke="#d4c5a9" strokeWidth="40" strokeLinecap="round" />
        <rect x="80" y="180" width="18" height="100" rx="4" fill="#92400e" />
        <circle cx="89" cy="160" r="40" fill="#16a34a" />
        <circle cx="70" cy="150" r="30" fill="#22c55e" />
        <circle cx="108" cy="155" r="32" fill="#15803d" />
        <rect x="680" y="160" width="16" height="110" rx="4" fill="#92400e" />
        <circle cx="688" cy="140" r="45" fill="#16a34a" />
        <circle cx="668" cy="130" r="35" fill="#22c55e" />
        <circle cx="708" cy="135" r="38" fill="#15803d" />
        <rect x="150" y="310" width="120" height="8" rx="3" fill="#a16207" />
        <rect x="150" y="330" width="120" height="10" rx="3" fill="#92400e" />
        <rect x="155" y="340" width="6" height="40" rx="2" fill="#78350f" />
        <rect x="259" y="340" width="6" height="40" rx="2" fill="#78350f" />
        {[200,250,300,500,550,600].map((x,i)=><g key={i}>
          <line x1={x} y1={400} x2={x} y2={370} stroke="#16a34a" strokeWidth="2" />
          <circle cx={x} cy={365} r={6} fill={["#f43f5e","#ec4899","#f97316","#fbbf24","#a855f7","#ef4444"][i]} />
          <circle cx={x} cy={365} r={2} fill="#fde68a" />
        </g>)}
        <ellipse cx="400" cy="380" rx="60" ry="25" fill="#94a3b8" />
        <ellipse cx="400" cy="375" rx="55" ry="20" fill="#60a5fa" opacity="0.5" />
        <rect x="395" y="340" width="10" height="35" rx="3" fill="#94a3b8" />
        <ellipse cx="400" cy="338" rx="12" ry="6" fill="#94a3b8" />
        <path d="M400,332 Q395,320 390,330" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M400,332 Q405,320 410,330" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.6" />
        <rect x="0" y="310" width="800" height="4" rx="1" fill="#d4c5a9" />
        {[0,60,120,180,240,560,620,680,740].map((x,i)=><rect key={i} x={x} y="295" width="4" height="20" rx="1" fill="#d4c5a9" />)}
      </svg>
    ),
    objects: [
      { objectId: "bottle", x: 18, y: 75 }, { objectId: "bag", x: 22, y: 80 },
      { objectId: "plant", x: 12, y: 42 }, { objectId: "clock", x: 88, y: 12 },
      { objectId: "toy", x: 62, y: 72 }, { objectId: "cup", x: 55, y: 78 },
      { objectId: "notebook", x: 68, y: 82 }, { objectId: "pen", x: 72, y: 78 },
      { objectId: "phone", x: 78, y: 82 }, { objectId: "shoes", x: 82, y: 85 },
      { objectId: "book", x: 35, y: 82 }, { objectId: "headphones", x: 45, y: 85 },
      { objectId: "lamp", x: 25, y: 65 }, { objectId: "glasses", x: 58, y: 85 },
      { objectId: "vase", x: 50, y: 72 },
    ],
  },
  // ── 11. Playground ──
  {
    id: "playground", name: "Playground",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="pgk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#87CEEB" /><stop offset="100%" stopColor="#b0e0f0" /></linearGradient></defs>
        <rect width="800" height="240" fill="url(#pgk)" />
        <rect y="240" width="800" height="210" fill="#4ade80" />
        <rect x="100" y="180" width="8" height="180" rx="2" fill="#ef4444" />
        <rect x="200" y="220" width="8" height="140" rx="2" fill="#ef4444" />
        <rect x="95" y="175" width="120" height="10" rx="3" fill="#ef4444" />
        <path d="M205,180 Q180,250 150,360" fill="none" stroke="#fbbf24" strokeWidth="12" strokeLinecap="round" />
        <rect x="400" y="180" width="200" height="8" rx="3" fill="#334155" />
        <rect x="410" y="180" width="6" height="160" rx="2" fill="#475569" />
        <rect x="590" y="180" width="6" height="160" rx="2" fill="#475569" />
        <line x1="460" y1="188" x2="450" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="460" y1="188" x2="470" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <rect x="445" y="278" width="30" height="8" rx="3" fill="#f97316" />
        <line x1="540" y1="188" x2="530" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <line x1="540" y1="188" x2="550" y2="280" stroke="#94a3b8" strokeWidth="2" />
        <rect x="525" y="278" width="30" height="8" rx="3" fill="#22c55e" />
        <rect x="650" y="340" width="120" height="40" rx="8" fill="#d4c5a9" />
        <rect x="650" y="336" width="120" height="8" rx="4" fill="#92400e" />
        <rect x="300" y="380" width="100" height="8" rx="3" fill="#92400e" />
        <rect x="300" y="370" width="100" height="6" rx="3" fill="#a16207" />
        <ellipse cx="150" cy="60" rx="40" ry="20" fill="white" opacity="0.8" />
        <ellipse cx="130" cy="55" rx="30" ry="18" fill="white" opacity="0.8" />
        <ellipse cx="600" cy="40" rx="50" ry="22" fill="white" opacity="0.7" />
      </svg>
    ),
    objects: [
      { objectId: "bag", x: 22, y: 80 }, { objectId: "bottle", x: 28, y: 78 },
      { objectId: "toy", x: 82, y: 75 }, { objectId: "toy", x: 88, y: 72 },
      { objectId: "cup", x: 35, y: 85 }, { objectId: "phone", x: 78, y: 85 },
      { objectId: "book", x: 15, y: 85 }, { objectId: "shoes", x: 65, y: 88 },
      { objectId: "notebook", x: 42, y: 82 }, { objectId: "pen", x: 48, y: 80 },
      { objectId: "clock", x: 92, y: 10 }, { objectId: "plant", x: 8, y: 55 },
      { objectId: "headphones", x: 55, y: 85 }, { objectId: "glasses", x: 72, y: 88 },
      { objectId: "eraser", x: 38, y: 88 },
    ],
  },
  // ── 12. Hospital ──
  {
    id: "hospital", name: "Hospital Room",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="hpw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0f4f8" /><stop offset="100%" stopColor="#e0e8f0" /></linearGradient></defs>
        <rect width="800" height="260" fill="url(#hpw)" />
        <rect y="250" width="800" height="12" fill="#d0d8e0" />
        <rect y="262" width="800" height="188" fill="#e0e8f0" />
        <rect x="500" y="20" width="140" height="140" rx="4" fill="#b8d4f0" />
        <rect x="500" y="20" width="140" height="140" rx="4" fill="none" stroke="#94a3b8" strokeWidth="4" />
        <line x1="570" y1="20" x2="570" y2="160" stroke="#94a3b8" strokeWidth="2" />
        <rect x="60" y="280" width="350" height="15" rx="4" fill="#94a3b8" filter="url(#ss)" />
        <rect x="60" y="200" width="80" height="95" rx="4" fill="#cbd5e1" />
        <rect x="60" y="260" width="350" height="35" rx="4" fill="#e0e8f0" />
        <rect x="60" y="250" width="350" height="14" rx="4" fill="white" />
        <ellipse cx="120" cy="255" rx="45" ry="12" fill="white" filter="url(#ss)" />
        <rect x="60" y="230" width="4" height="30" rx="1" fill="#94a3b8" />
        <rect x="406" y="230" width="4" height="30" rx="1" fill="#94a3b8" />
        <circle cx="80" cy="298" r="6" fill="#64748b" />
        <circle cx="390" cy="298" r="6" fill="#64748b" />
        <rect x="470" y="200" width="4" height="180" rx="1" fill="#94a3b8" />
        <rect x="460" y="195" width="24" height="8" rx="2" fill="#94a3b8" />
        <rect x="462" y="150" width="8" height="45" rx="2" fill="#bfdbfe" opacity="0.7" />
        <rect x="474" y="160" width="8" height="35" rx="2" fill="#bbf7d0" opacity="0.7" />
        <rect x="620" y="200" width="100" height="80" rx="5" fill="#1e293b" filter="url(#ss)" />
        <rect x="625" y="205" width="90" height="55" rx="3" fill="#0f172a" />
        <path d="M630,232 L645,225 L655,235 L665,220 L675,230 L685,225 L695,232" stroke="#22c55e" strokeWidth="1.5" fill="none" />
        <rect x="620" y="310" width="100" height="90" rx="4" fill="#94a3b8" filter="url(#ss)" />
        <line x1="620" y1="355" x2="720" y2="355" stroke="#78909c" strokeWidth="1" />
        <circle cx="670" cy="332" r="3" fill="#78909c" />
        <circle cx="670" cy="377" r="3" fill="#78909c" />
      </svg>
    ),
    objects: [
      { objectId: "book", x: 15, y: 62 }, { objectId: "notebook", x: 22, y: 58 },
      { objectId: "pen", x: 18, y: 68 }, { objectId: "phone", x: 28, y: 62 },
      { objectId: "cup", x: 82, y: 55 }, { objectId: "clock", x: 88, y: 12 },
      { objectId: "photo-frame", x: 12, y: 35 }, { objectId: "plant", x: 92, y: 15 },
      { objectId: "bag", x: 35, y: 85 }, { objectId: "glasses", x: 25, y: 55 },
      { objectId: "headphones", x: 32, y: 65 }, { objectId: "lamp", x: 62, y: 55 },
      { objectId: "shoes", x: 8, y: 90 }, { objectId: "candle", x: 85, y: 48 },
      { objectId: "toy", x: 42, y: 82 },
    ],
  },
  // ── 13. Coffee Shop ──
  {
    id: "coffee-shop", name: "Coffee Shop",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="csw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3d2c1e" /><stop offset="100%" stopColor="#2c1c10" /></linearGradient>
          <linearGradient id="csf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B7355" /><stop offset="100%" stopColor="#7a6b4e" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#csw)" />
        <rect y="250" width="800" height="12" fill="#6b5b3e" />
        <rect y="262" width="800" height="188" fill="url(#csf)" />
        <rect x="300" y="20" width="200" height="120" rx="4" fill="#1e293b" filter="url(#sm)" />
        <text x="320" y="50" fill="#fbbf24" fontSize="16" fontWeight="bold" fontFamily="serif">MENU</text>
        <rect x="315" y="60" width="170" height="1" fill="#475569" />
        <text x="320" y="80" fill="#e2e8f0" fontSize="10">Espresso ........... $3</text>
        <text x="320" y="95" fill="#e2e8f0" fontSize="10">Latte .............. $4</text>
        <text x="320" y="110" fill="#e2e8f0" fontSize="10">Cappuccino ......... $4</text>
        <rect x="50" y="230" width="250" height="14" rx="4" fill="#4a3520" filter="url(#ss)" />
        <rect x="50" y="244" width="250" height="100" rx="4" fill="#3d2c1e" />
        <rect x="80" y="170" width="60" height="60" rx="5" fill="#334155" filter="url(#ss)" />
        <rect x="85" y="175" width="50" height="30" rx="3" fill="#475569" />
        <circle cx="110" cy="190" r="8" fill="#1e293b" />
        <circle cx="110" cy="190" r="5" fill="#f97316" opacity="0.6" />
        <circle cx="450" cy="370" r="40" fill="#5a4530" filter="url(#ss)" />
        <rect x="446" y="410" width="8" height="40" rx="2" fill="#4a3520" />
        <circle cx="650" cy="370" r="40" fill="#5a4530" filter="url(#ss)" />
        <rect x="646" y="410" width="8" height="40" rx="2" fill="#4a3520" />
        <ellipse cx="410" cy="400" rx="15" ry="10" fill="#4a3520" />
        <ellipse cx="490" cy="400" rx="15" ry="10" fill="#4a3520" />
        <ellipse cx="610" cy="400" rx="15" ry="10" fill="#4a3520" />
        <ellipse cx="690" cy="400" rx="15" ry="10" fill="#4a3520" />
        <line x1="450" y1="0" x2="450" y2="80" stroke="#fbbf24" strokeWidth="1" />
        <path d="M440,80 L450,95 L460,80 Z" fill="#fbbf24" />
        <line x1="650" y1="0" x2="650" y2="80" stroke="#fbbf24" strokeWidth="1" />
        <path d="M640,80 L650,95 L660,80 Z" fill="#fbbf24" />
        <rect x="750" y="380" width="25" height="30" rx="4" fill="#92400e" />
        <circle cx="762" cy="368" r="16" fill="#22c55e" />
        <circle cx="755" cy="362" r="10" fill="#16a34a" />
      </svg>
    ),
    objects: [
      { objectId: "cup", x: 55, y: 55 }, { objectId: "cup", x: 62, y: 52 },
      { objectId: "notebook", x: 18, y: 65 }, { objectId: "pen", x: 22, y: 70 },
      { objectId: "phone", x: 68, y: 58 }, { objectId: "book", x: 12, y: 62 },
      { objectId: "clock", x: 88, y: 12 }, { objectId: "plant", x: 95, y: 85 },
      { objectId: "bag", x: 8, y: 85 }, { objectId: "headphones", x: 78, y: 62 },
      { objectId: "glasses", x: 62, y: 62 }, { objectId: "lamp", x: 58, y: 25 },
      { objectId: "candle", x: 82, y: 55 }, { objectId: "photo-frame", x: 15, y: 15 },
      { objectId: "vase", x: 92, y: 42 },
    ],
  },
  // ── 14. Supermarket ──
  {
    id: "supermarket", name: "Supermarket",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <rect width="800" height="260" fill="#f8fafc" />
        <rect y="250" width="800" height="12" fill="#e2e8f0" />
        <rect y="262" width="800" height="188" fill="#e8e0d4" />
        {[0,1,2,3].map(i=><g key={i}>
          <rect x={i*180+20} y="50" width="30" height="210" rx="3" fill="#94a3b8" />
          <rect x={i*180+20} y="50" width="140" height="8" rx="2" fill="#94a3b8" />
          <rect x={i*180+20} y="105" width="140" height="8" rx="2" fill="#94a3b8" />
          <rect x={i*180+20} y="160" width="140" height="8" rx="2" fill="#94a3b8" />
          <rect x={i*180+20} y="215" width="140" height="8" rx="2" fill="#94a3b8" />
          <rect x={i*180+30} y="58" width="15" height="45" rx="2" fill={["#ef4444","#22c55e","#2563eb","#f59e0b"][i]} />
          <rect x={i*180+50} y="62" width="12" height="41" rx="2" fill={["#ec4899","#16a34a","#3b82f6","#d97706"][i]} />
          <rect x={i*180+66} y="58" width="14" height="45" rx="2" fill={["#f97316","#15803d","#1d4ed8","#ca8a04"][i]} />
        </g>)}
        <rect x="50" y="350" width="200" height="14" rx="4" fill="#64748b" filter="url(#ss)" />
        <rect x="50" y="364" width="200" height="60" rx="4" fill="#475569" />
      </svg>
    ),
    objects: [
      { objectId: "bottle", x: 12, y: 18 }, { objectId: "apple", x: 28, y: 18 },
      { objectId: "cup", x: 42, y: 18 }, { objectId: "bag", x: 58, y: 18 },
      { objectId: "book", x: 72, y: 18 }, { objectId: "notebook", x: 88, y: 18 },
      { objectId: "clock", x: 92, y: 10 }, { objectId: "plant", x: 8, y: 12 },
      { objectId: "phone", x: 35, y: 82 }, { objectId: "shoes", x: 45, y: 85 },
      { objectId: "headphones", x: 55, y: 82 }, { objectId: "pen", x: 65, y: 85 },
      { objectId: "candle", x: 75, y: 82 }, { objectId: "vase", x: 85, y: 85 },
      { objectId: "eraser", x: 15, y: 82 },
    ],
  },
  // ── 15. Train Station ──
  {
    id: "train-station", name: "Train Station",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="tsw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e4e8" /><stop offset="100%" stopColor="#d0d4d8" /></linearGradient></defs>
        <rect width="800" height="200" fill="url(#tsw)" />
        <rect y="200" width="800" height="8" fill="#94a3b8" />
        <rect y="208" width="800" height="242" fill="#c8c0b4" />
        <rect x="0" y="380" width="800" height="8" fill="#fbbf24" />
        <rect x="0" y="400" width="800" height="50" fill="#78716c" />
        <rect x="0" y="410" width="800" height="4" fill="#a8a29e" />
        <rect x="0" y="436" width="800" height="4" fill="#a8a29e" />
        <rect x="250" y="20" width="300" height="100" rx="4" fill="#1e293b" filter="url(#sm)" />
        <text x="280" y="50" fill="#fbbf24" fontSize="14" fontWeight="bold">DEPARTURES</text>
        <rect x="265" y="58" width="270" height="1" fill="#475569" />
        <text x="280" y="78" fill="#e2e8f0" fontSize="10">10:30  Platform 2  Mumbai</text>
        <text x="280" y="93" fill="#22c55e" fontSize="10">On Time</text>
        <circle cx="600" cy="60" r="35" fill="#1e293b" />
        <circle cx="600" cy="60" r="32" fill="#f8fafc" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(d=>{const r=d*Math.PI/180;return <line key={d} x1={600+26*Math.sin(r)} y1={60-26*Math.cos(r)} x2={600+29*Math.sin(r)} y2={60-29*Math.cos(r)} stroke="#1e293b" strokeWidth={d%90===0?1.5:0.7} />;})}
        <line x1="600" y1="60" x2="600" y2="38" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <line x1="600" y1="60" x2="618" y2="52" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="100" y="330" width="120" height="10" rx="3" fill="#64748b" />
        <rect x="100" y="340" width="120" height="40" rx="3" fill="#475569" />
        <rect x="550" y="330" width="120" height="10" rx="3" fill="#64748b" />
        <rect x="550" y="340" width="120" height="40" rx="3" fill="#475569" />
      </svg>
    ),
    objects: [
      { objectId: "bag", x: 18, y: 72 }, { objectId: "phone", x: 25, y: 68 },
      { objectId: "book", x: 32, y: 75 }, { objectId: "notebook", x: 72, y: 72 },
      { objectId: "cup", x: 78, y: 68 }, { objectId: "clock", x: 75, y: 12 },
      { objectId: "headphones", x: 38, y: 72 }, { objectId: "glasses", x: 45, y: 75 },
      { objectId: "shoes", x: 52, y: 78 }, { objectId: "pen", x: 82, y: 75 },
      { objectId: "lamp", x: 15, y: 62 }, { objectId: "plant", x: 88, y: 15 },
      { objectId: "candle", x: 65, y: 72 }, { objectId: "vase", x: 58, y: 68 },
      { objectId: "photo-frame", x: 92, y: 35 },
    ],
  },
  // ── 16. Airport Lounge ──
  {
    id: "airport-lounge", name: "Airport Lounge",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs><linearGradient id="alw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0f4f8" /><stop offset="100%" stopColor="#e0e8f0" /></linearGradient><linearGradient id="alf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d0d4d8" /><stop offset="100%" stopColor="#c0c4c8" /></linearGradient></defs>
        <rect width="800" height="260" fill="url(#alw)" />
        <rect y="250" width="800" height="12" fill="#b0b4b8" />
        <rect y="262" width="800" height="188" fill="url(#alf)" />
        {[0,1,2,3].map(i=><g key={i}>
          <rect x={i*200+10} y="20" width="180" height="180" rx="4" fill="#b8d4f0" />
          <rect x={i*200+10} y="20" width="180" height="180" rx="4" fill="none" stroke="#94a3b8" strokeWidth="4" />
          <path d={`M${i*200+60},120 L${i*200+100},100 L${i*200+140},120 L${i*200+120},125 L${i*200+140},130 L${i*200+100},115 L${i*200+60},130 L${i*200+80},125 Z`} fill="#94a3b8" opacity="0.3" />
        </g>)}
        {[0,1].map(row=>[0,1,2,3].map(col=>(
          <g key={`${row}-${col}`}>
            <rect x={80+col*170} y={300+row*60} width="100" height="30" rx="6" fill="#475569" />
            <rect x={80+col*170} y={285+row*60} width="100" height="18" rx="6" fill="#334155" />
          </g>
        )))}
        <rect x="300" y="10" width="60" height="40" rx="3" fill="#1e293b" />
        <rect x="303" y="13" width="54" height="30" rx="2" fill="#38bdf8" />
        <rect x="440" y="10" width="60" height="40" rx="3" fill="#1e293b" />
        <rect x="443" y="13" width="54" height="30" rx="2" fill="#22c55e" />
      </svg>
    ),
    objects: [
      { objectId: "phone", x: 18, y: 68 }, { objectId: "bag", x: 25, y: 72 },
      { objectId: "book", x: 35, y: 65 }, { objectId: "notebook", x: 55, y: 65 },
      { objectId: "cup", x: 65, y: 68 }, { objectId: "headphones", x: 75, y: 65 },
      { objectId: "clock", x: 75, y: 10 }, { objectId: "plant", x: 92, y: 15 },
      { objectId: "glasses", x: 42, y: 72 }, { objectId: "pen", x: 82, y: 72 },
      { objectId: "lamp", x: 50, y: 25 }, { objectId: "photo-frame", x: 8, y: 15 },
      { objectId: "shoes", x: 28, y: 88 }, { objectId: "candle", x: 62, y: 62 },
      { objectId: "vase", x: 88, y: 42 },
    ],
  },
  // ── 17. Restaurant ──
  {
    id: "restaurant", name: "Restaurant",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="rrw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2c1c10" /><stop offset="100%" stopColor="#1c0c00" /></linearGradient>
          <linearGradient id="rrf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4530" /><stop offset="100%" stopColor="#4a3520" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#rrw)" />
        <rect y="250" width="800" height="12" fill="#3d2c1e" />
        <rect y="262" width="800" height="188" fill="url(#rrf)" />
        <rect x="550" y="100" width="220" height="14" rx="4" fill="#5a4530" filter="url(#ss)" />
        <rect x="550" y="114" width="220" height="140" rx="4" fill="#3d2c1e" />
        {[0,1,2,3,4,5].map(i=><rect key={i} x={570+i*30} y="60" width="12" height="40" rx="3" fill={["#22c55e","#f59e0b","#ef4444","#2563eb","#8b5cf6","#06b6d4"][i]} opacity="0.7" />)}
        <rect x="560" y="98" width="200" height="4" rx="2" fill="#6b5b3e" />
        {[0,1].map(row=>[0,1,2].map(col=>(
          <g key={`${row}-${col}`}>
            <circle cx={150+col*150} cy={320+row*70} r="30" fill="#5a4530" filter="url(#ss)" />
            <rect x={146+col*150} y={350+row*70} width="8" height="25" rx="2" fill="#4a3520" />
            <rect x={148+col*150} y={298+row*70} width="4" height="10" rx="1" fill="#fef3c7" />
            <circle cx={150+col*150} cy={296+row*70} r="3" fill="#f97316" opacity="0.8" />
          </g>
        )))}
        {[0,1,2].map(i=><g key={i}>
          <line x1={150+i*150} y1="0" x2={150+i*150} y2="80" stroke="#fbbf24" strokeWidth="1" />
          <path d={`M${140+i*150},80 L${150+i*150},95 L${160+i*150},80 Z`} fill="#fbbf24" />
        </g>)}
      </svg>
    ),
    objects: [
      { objectId: "cup", x: 18, y: 68 }, { objectId: "cup", x: 38, y: 68 },
      { objectId: "cup", x: 58, y: 68 }, { objectId: "candle", x: 18, y: 62 },
      { objectId: "candle", x: 38, y: 62 }, { objectId: "candle", x: 58, y: 62 },
      { objectId: "notebook", x: 72, y: 65 }, { objectId: "pen", x: 78, y: 68 },
      { objectId: "clock", x: 75, y: 10 }, { objectId: "plant", x: 92, y: 15 },
      { objectId: "photo-frame", x: 8, y: 15 }, { objectId: "vase", x: 85, y: 35 },
      { objectId: "bag", x: 5, y: 85 }, { objectId: "phone", x: 92, y: 82 },
      { objectId: "lamp", x: 25, y: 25 },
    ],
  },
  // ── 18. Dining Room ──
  {
    id: "dining-room", name: "Dining Room",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="drw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f5f0e8" /><stop offset="100%" stopColor="#e8e0d4" /></linearGradient>
          <linearGradient id="drf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c4a882" /><stop offset="100%" stopColor="#b89c72" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#drw)" />
        <rect y="250" width="800" height="12" fill="#b8a88c" />
        <rect y="262" width="800" height="188" fill="url(#drf)" />
        <rect x="300" y="20" width="200" height="150" rx="4" fill="#b8d4f0" />
        <rect x="300" y="20" width="200" height="150" rx="4" fill="none" stroke="#8B7355" strokeWidth="5" />
        <line x1="400" y1="20" x2="400" y2="170" stroke="#8B7355" strokeWidth="2.5" />
        <line x1="300" y1="95" x2="500" y2="95" stroke="#8B7355" strokeWidth="2.5" />
        <rect x="200" y="300" width="400" height="14" rx="4" fill="#8B7355" filter="url(#ss)" />
        <rect x="220" y="314" width="8" height="80" rx="2" fill="#7a6b4e" />
        <rect x="572" y="314" width="8" height="80" rx="2" fill="#7a6b4e" />
        {[0,1,2,3].map(i=><g key={i}>
          <rect x={210+i*140} y={275} width="50" height="8" rx="2" fill="#6b5b3e" />
          <rect x={220+i*140} y={283} width="4" height="15" rx="1" fill="#5a4a32" />
          <ellipse cx={235+i*140} cy={385} rx="20" ry="12" fill="#5a4530" />
          <rect x={230+i*140} y={395} width="4" height="25" rx="1" fill="#4a3520" />
        </g>)}
        <line x1="400" y1="0" x2="400" y2="60" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M385,60 L400,80 L415,60 Z" fill="#fbbf24" />
        <circle cx="400" cy="65" r="5" fill="#fde68a" />
        <rect x="700" y="100" width="80" height="150" rx="5" fill="#6b5b3e" filter="url(#ss)" />
        <rect x="705" y="105" width="70" height="70" rx="3" fill="#5a4a32" />
        <rect x="705" y="180" width="70" height="65" rx="3" fill="#5a4a32" />
      </svg>
    ),
    objects: [
      { objectId: "cup", x: 30, y: 68 }, { objectId: "cup", x: 50, y: 68 },
      { objectId: "cup", x: 70, y: 68 }, { objectId: "vase", x: 50, y: 58 },
      { objectId: "candle", x: 42, y: 62 }, { objectId: "candle", x: 58, y: 62 },
      { objectId: "clock", x: 88, y: 12 }, { objectId: "plant", x: 92, y: 35 },
      { objectId: "photo-frame", x: 8, y: 15 }, { objectId: "book", x: 88, y: 28 },
      { objectId: "lamp", x: 50, y: 12 }, { objectId: "notebook", x: 12, y: 65 },
      { objectId: "pen", x: 18, y: 70 }, { objectId: "bag", x: 5, y: 85 },
      { objectId: "phone", x: 82, y: 78 },
    ],
  },
  // ── 19. Art Studio ──
  {
    id: "art-studio", name: "Art Studio",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="asw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fef3c7" /><stop offset="100%" stopColor="#fde68a" /></linearGradient>
          <linearGradient id="asf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d4c5a9" /><stop offset="100%" stopColor="#c4b599" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#asw)" />
        <rect y="250" width="800" height="12" fill="#c4b088" />
        <rect y="262" width="800" height="188" fill="url(#asf)" />
        <rect x="80" y="120" width="120" height="160" rx="3" fill="#d4c5a9" filter="url(#ss)" />
        <rect x="80" y="120" width="120" height="160" rx="3" fill="white" />
        <rect x="135" y="280" width="10" height="120" rx="2" fill="#8B7355" />
        <rect x="95" y="395" width="90" height="6" rx="2" fill="#8B7355" />
        <rect x="300" y="230" width="200" height="12" rx="3" fill="#a0845c" filter="url(#ss)" />
        <rect x="310" y="242" width="6" height="110" rx="2" fill="#8B7355" />
        <rect x="484" y="242" width="6" height="110" rx="2" fill="#8B7355" />
        {[0,1,2,3,4,5].map(i=><circle key={i} cx={320+i*28} cy={225} r="10" fill={["#ef4444","#f59e0b","#22c55e","#2563eb","#8b5cf6","#ec4899"][i]} />)}
        <rect x="550" y="200" width="180" height="100" rx="6" fill="#8B7355" filter="url(#ss)" />
        <rect x="555" y="205" width="170" height="90" rx="4" fill="#a0845c" />
        {[0,1,2].map(i=><rect key={i} x={565+i*50} y="215" width="40" height="70" rx="3" fill={["#fef3c7","#e0f2fe","#f0fdf4"][i]} />)}
        <rect x="600" y="20" width="120" height="100" rx="4" fill="#b8d4f0" />
        <rect x="600" y="20" width="120" height="100" rx="4" fill="none" stroke="#8B7355" strokeWidth="4" />
        <rect x="750" y="300" width="30" height="35" rx="4" fill="#92400e" />
        <circle cx="765" cy="288" r="18" fill="#22c55e" />
        <circle cx="758" cy="280" r="12" fill="#16a34a" />
      </svg>
    ),
    objects: [
      { objectId: "pencil", x: 42, y: 52 }, { objectId: "pen", x: 48, y: 50 },
      { objectId: "notebook", x: 55, y: 52 }, { objectId: "eraser", x: 38, y: 55 },
      { objectId: "ruler", x: 62, y: 55 }, { objectId: "cup", x: 32, y: 55 },
      { objectId: "book", x: 72, y: 48 }, { objectId: "phone", x: 78, y: 52 },
      { objectId: "clock", x: 75, y: 10 }, { objectId: "plant", x: 95, y: 65 },
      { objectId: "bag", x: 15, y: 85 }, { objectId: "lamp", x: 68, y: 12 },
      { objectId: "photo-frame", x: 88, y: 15 }, { objectId: "headphones", x: 82, y: 55 },
      { objectId: "candle", x: 28, y: 50 },
    ],
  },
  // ── 20. Music Room ──
  {
    id: "music-room", name: "Music Room",
    roomSvg: () => (
      <svg viewBox="0 0 800 450" className="w-full h-full">
        <SD />
        <defs>
          <linearGradient id="mrw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e1b4b" /><stop offset="100%" stopColor="#312e81" /></linearGradient>
          <linearGradient id="mrf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a3728" /><stop offset="100%" stopColor="#3d2c1e" /></linearGradient>
        </defs>
        <rect width="800" height="260" fill="url(#mrw)" />
        <rect y="250" width="800" height="12" fill="#3d2c1e" />
        <rect y="262" width="800" height="188" fill="url(#mrf)" />
        {/* Piano */}
        <rect x="50" y="180" width="250" height="100" rx="6" fill="#1e293b" filter="url(#sm)" />
        <rect x="55" y="185" width="240" height="90" rx="4" fill="#f8fafc" />
        {Array.from({length:15},(_,i)=><rect key={i} x={58+i*15.5} y="185" width="14" height="90" rx="1" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />)}
        {[0,1,3,4,5,7,8,10,11,12].map(i=><rect key={i} x={68+i*15.5} y="185" width="9" height="55" rx="1" fill="#1e293b" />)}
        {/* Guitar */}
        <rect x="400" y="120" width="6" height="180" rx="3" fill="#92400e" />
        <ellipse cx="403" cy="300" rx="35" ry="45" fill="#b45309" />
        <ellipse cx="403" cy="300" rx="12" ry="15" fill="#78350f" />
        <rect x="395" y="100" width="16" height="30" rx="3" fill="#78350f" />
        {[0,1,2].map(i=><circle key={i} cx={399+i*4} cy={105+i*8} r="1.5" fill="#d97706" />)}
        {/* Music stands */}
        {[550,650].map((x,i)=><g key={i}>
          <rect x={x} y="200" width="4" height="200" rx="1" fill="#475569" />
          <rect x={x-20} y="150" width="50" height="60" rx="3" fill="#334155" />
          <rect x={x-16} y="155" width="42" height="50" rx="2" fill="#475569" />
          {[0,1,2,3].map(j=><line key={j} x1={x-12} y1={162+j*10} x2={x+22} y2={162+j*10} stroke="#94a3b8" strokeWidth="0.5" />)}
        </g>)}
        {/* Sound panels */}
        {[0,1,2,3].map(i=><rect key={i} x={i*200} y="0" width="180" height="250" rx="0" fill="#312e81" opacity="0.3" />)}
        <rect x="700" y="380" width="25" height="35" rx="4" fill="#92400e" />
        <circle cx="712" cy="368" r="18" fill="#22c55e" />
        <circle cx="705" cy="360" r="12" fill="#16a34a" />
      </svg>
    ),
    objects: [
      { objectId: "notebook", x: 72, y: 25 }, { objectId: "pen", x: 78, y: 28 },
      { objectId: "phone", x: 82, y: 22 }, { objectId: "cup", x: 88, y: 25 },
      { objectId: "headphones", x: 55, y: 22 }, { objectId: "bag", x: 12, y: 85 },
      { objectId: "clock", x: 92, y: 10 }, { objectId: "plant", x: 95, y: 65 },
      { objectId: "book", x: 85, y: 35 }, { objectId: "lamp", x: 48, y: 12 },
      { objectId: "photo-frame", x: 8, y: 15 }, { objectId: "glasses", x: 62, y: 28 },
      { objectId: "candle", x: 15, y: 22 }, { objectId: "vase", x: 35, y: 25 },
      { objectId: "toy", x: 5, y: 72 },
    ],
  },
];
