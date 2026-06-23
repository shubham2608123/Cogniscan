import React from "react";

export type GameObjectId =
  | "book" | "laptop" | "bottle" | "clock" | "plant" | "bag"
  | "headphones" | "phone" | "notebook" | "pen" | "cup" | "photo-frame"
  | "toy" | "shoes" | "keyboard" | "glasses" | "lamp" | "mouse"
  | "ruler" | "pencil" | "apple" | "candle" | "vase" | "eraser";

export type ObjectDef = { id: GameObjectId; name: string; svg: React.FC<{ size?: number }> };

export const BookSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 48 36">
    <rect x="2" y="2" width="44" height="32" rx="3" fill="#2563eb" />
    <rect x="4" y="4" width="40" height="28" rx="2" fill="#3b82f6" />
    <rect x="6" y="6" width="36" height="2" rx="1" fill="#93c5fd" opacity="0.6" />
    <rect x="6" y="11" width="28" height="1.5" rx="1" fill="#93c5fd" opacity="0.4" />
    <rect x="6" y="15" width="32" height="1.5" rx="1" fill="#93c5fd" opacity="0.4" />
    <rect x="2" y="2" width="5" height="32" rx="2" fill="#1d4ed8" />
    <line x1="4" y1="8" x2="4" y2="30" stroke="#93c5fd" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export const LaptopSVG: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 52 36">
    <rect x="6" y="2" width="40" height="26" rx="3" fill="#1e293b" />
    <rect x="8" y="4" width="36" height="20" rx="2" fill="#38bdf8" />
    <rect x="10" y="6" width="32" height="16" rx="1" fill="#0ea5e9" />
    <rect x="12" y="8" width="10" height="6" rx="1" fill="#7dd3fc" opacity="0.5" />
    <rect x="24" y="8" width="16" height="1.5" rx="1" fill="#e0f2fe" opacity="0.6" />
    <rect x="24" y="12" width="12" height="1.5" rx="1" fill="#e0f2fe" opacity="0.4" />
    <path d="M2 30 Q26 26 50 30 L48 34 Q26 31 4 34 Z" fill="#475569" />
    <rect x="20" y="29" width="12" height="2" rx="1" fill="#64748b" />
  </svg>
);

export const BottleSVG: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 20 44">
    <rect x="7" y="2" width="6" height="6" rx="2" fill="#0d9488" />
    <path d="M6 8 Q6 12 4 16 L4 40 Q4 42 6 42 L14 42 Q16 42 16 40 L16 16 Q14 12 14 8 Z" fill="#2dd4bf" />
    <rect x="6" y="22" width="8" height="10" rx="1" fill="white" opacity="0.3" />
    <rect x="7" y="24" width="6" height="1.5" rx="0.5" fill="white" opacity="0.5" />
    <rect x="8" y="27" width="4" height="1" rx="0.5" fill="white" opacity="0.4" />
  </svg>
);

export const ClockSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="20" fill="#1e293b" />
    <circle cx="22" cy="22" r="18" fill="white" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return <line key={deg} x1={22 + 15 * Math.sin(rad)} y1={22 - 15 * Math.cos(rad)} x2={22 + 16.5 * Math.sin(rad)} y2={22 - 16.5 * Math.cos(rad)} stroke="#64748b" strokeWidth={deg % 90 === 0 ? 1.5 : 0.7} />;
    })}
    <line x1="22" y1="22" x2="22" y2="10" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="22" x2="30" y2="18" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="22" cy="22" r="2" fill="#ef4444" />
  </svg>
);

export const PlantSVG: React.FC<{ size?: number }> = ({ size = 42 }) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 34 46">
    <path d="M8 38 L12 44 L22 44 L26 38 Z" fill="#92400e" />
    <rect x="10" y="36" width="14" height="4" rx="2" fill="#a16207" />
    <path d="M17 36 Q8 28 6 18 Q8 20 12 22 Q10 14 14 6 Q16 12 17 18 Z" fill="#16a34a" />
    <path d="M17 36 Q26 28 28 18 Q26 20 22 22 Q24 14 20 6 Q18 12 17 18 Z" fill="#22c55e" />
    <path d="M17 34 Q12 24 10 16 Q14 20 17 24 Q14 14 17 4 Q20 14 17 24 Q20 20 24 16 Q22 24 17 34 Z" fill="#15803d" opacity="0.7" />
    <path d="M17 30 Q15 24 13 18" stroke="#166534" strokeWidth="0.8" fill="none" />
    <path d="M17 30 Q19 24 21 18" stroke="#166534" strokeWidth="0.8" fill="none" />
  </svg>
);

export const BagSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size * 0.85} height={size} viewBox="0 0 36 42">
    <path d="M8 14 Q8 6 18 4 Q28 6 28 14 L28 38 Q28 40 26 40 L10 40 Q8 40 8 38 Z" fill="#7c3aed" />
    <path d="M12 14 Q12 2 18 2 Q24 2 24 14" fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="12" y="20" width="12" height="1.5" rx="1" fill="#a78bfa" opacity="0.5" />
    <circle cx="18" cy="28" r="3" fill="#a78bfa" opacity="0.4" />
  </svg>
);

export const HeadphonesSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 42 36">
    <path d="M6 22 Q6 8 21 6 Q36 8 36 22" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
    <rect x="3" y="20" width="8" height="12" rx="4" fill="#334155" />
    <rect x="31" y="20" width="8" height="12" rx="4" fill="#334155" />
    <rect x="5" y="22" width="4" height="8" rx="2" fill="#475569" />
    <rect x="33" y="22" width="4" height="8" rx="2" fill="#475569" />
  </svg>
);

export const PhoneSVG: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size * 0.55} height={size} viewBox="0 0 20 38">
    <rect x="1" y="1" width="18" height="36" rx="3" fill="#1e293b" />
    <rect x="2" y="3" width="16" height="28" rx="1" fill="#0ea5e9" />
    <rect x="4" y="6" width="5" height="3" rx="1" fill="#7dd3fc" opacity="0.5" />
    <rect x="4" y="11" width="12" height="1" rx="0.5" fill="#bae6fd" opacity="0.5" />
    <rect x="4" y="14" width="10" height="1" rx="0.5" fill="#bae6fd" opacity="0.4" />
    <circle cx="10" cy="33" r="1.5" fill="#475569" />
    <rect x="6" y="2" width="8" height="1.5" rx="1" fill="#475569" />
  </svg>
);

export const NotebookSVG: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 30 40">
    <rect x="2" y="2" width="26" height="36" rx="2" fill="#fbbf24" />
    <rect x="4" y="4" width="22" height="32" rx="1" fill="#fcd34d" />
    <line x1="8" y1="4" x2="8" y2="36" stroke="#f59e0b" strokeWidth="0.8" />
    {[10, 14, 18, 22, 26, 30].map((y) => (
      <line key={y} x1="10" y1={y} x2="24" y2={y} stroke="#d97706" strokeWidth="0.4" opacity="0.4" />
    ))}
    <circle cx="5" cy="10" r="1" fill="#f59e0b" />
    <circle cx="5" cy="16" r="1" fill="#f59e0b" />
    <circle cx="5" cy="22" r="1" fill="#f59e0b" />
    <circle cx="5" cy="28" r="1" fill="#f59e0b" />
    <circle cx="5" cy="34" r="1" fill="#f59e0b" />
  </svg>
);

export const PenSVG: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size * 0.25} height={size} viewBox="0 0 10 40">
    <polygon points="5,0 8,8 2,8" fill="#1e40af" />
    <rect x="2" y="8" width="6" height="24" rx="1" fill="#2563eb" />
    <rect x="2" y="32" width="6" height="3" rx="0.5" fill="#1d4ed8" />
    <rect x="3" y="35" width="4" height="3" rx="0.5" fill="#60a5fa" />
  </svg>
);

export const CupSVG: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size * 0.8} height={size} viewBox="0 0 30 38">
    <path d="M5 8 L7 34 Q7 36 9 36 L19 36 Q21 36 21 34 L23 8 Z" fill="#f8fafc" />
    <ellipse cx="14" cy="8" rx="9" ry="3" fill="#f1f5f9" />
    <ellipse cx="14" cy="8" rx="7" ry="2" fill="#92400e" opacity="0.6" />
    <path d="M23 12 Q30 12 30 18 Q30 24 23 24" fill="none" stroke="#e2e8f0" strokeWidth="2" />
  </svg>
);

export const PhotoFrameSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size * 0.8} height={size} viewBox="0 0 34 44">
    <rect x="2" y="2" width="30" height="40" rx="2" fill="#92400e" />
    <rect x="5" y="5" width="24" height="30" rx="1" fill="#86efac" />
    <rect x="5" y="5" width="24" height="20" rx="1" fill="#93c5fd" />
    <circle cx="22" cy="14" r="4" fill="#fde68a" />
    <path d="M5 25 Q12 20 17 24 Q22 20 29 25 L29 35 L5 35 Z" fill="#22c55e" />
  </svg>
);

export const ToySVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size * 0.85} height={size} viewBox="0 0 36 42">
    <ellipse cx="18" cy="36" rx="10" ry="5" fill="#d4a574" />
    <circle cx="18" cy="22" r="12" fill="#d4a574" />
    <circle cx="14" cy="20" r="2" fill="#1e293b" />
    <circle cx="22" cy="20" r="2" fill="#1e293b" />
    <ellipse cx="18" cy="25" rx="3" ry="2" fill="#f59e0b" />
    <circle cx="18" cy="24" r="0.8" fill="#1e293b" />
    <circle cx="10" cy="14" r="5" fill="#d4a574" />
    <circle cx="26" cy="14" r="5" fill="#d4a574" />
    <circle cx="10" cy="14" r="3" fill="#fcd34d" />
    <circle cx="26" cy="14" r="3" fill="#fcd34d" />
    <path d="M12 28 Q18 32 24 28" stroke="#92400e" strokeWidth="1" fill="none" />
  </svg>
);

export const ShoesSVG: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 44 26">
    <path d="M2 20 Q2 14 8 12 L20 10 Q26 8 30 10 L38 14 Q42 16 42 20 L42 22 Q42 24 40 24 L4 24 Q2 24 2 22 Z" fill="#2563eb" />
    <rect x="4" y="22" width="36" height="3" rx="1.5" fill="#1e40af" />
    <circle cx="10" cy="16" r="1" fill="white" opacity="0.6" />
    <circle cx="14" cy="14" r="1" fill="white" opacity="0.6" />
    <circle cx="18" cy="13" r="1" fill="white" opacity="0.6" />
  </svg>
);

export const KeyboardSVG: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 52 22">
    <rect x="1" y="1" width="50" height="20" rx="3" fill="#334155" />
    <rect x="3" y="3" width="46" height="16" rx="2" fill="#475569" />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={5 + i * 3.5} y="5" width="3" height="2.5" rx="0.5" fill="#64748b" />
    ))}
    {Array.from({ length: 11 }, (_, i) => (
      <rect key={i} x={7 + i * 3.5} y="8.5" width="3" height="2.5" rx="0.5" fill="#64748b" />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={9 + i * 3.5} y="12" width="3" height="2.5" rx="0.5" fill="#64748b" />
    ))}
    <rect x="16" y="15.5" width="18" height="2.5" rx="0.5" fill="#64748b" />
  </svg>
);

export const GlassesSVG: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size} height={size * 0.45} viewBox="0 0 44 20">
    <circle cx="12" cy="12" r="8" fill="none" stroke="#1e293b" strokeWidth="2" />
    <circle cx="32" cy="12" r="8" fill="none" stroke="#1e293b" strokeWidth="2" />
    <path d="M20 12 Q22 10 24 12" fill="none" stroke="#1e293b" strokeWidth="1.5" />
    <line x1="4" y1="10" x2="1" y2="8" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="10" x2="43" y2="8" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="7" fill="#60a5fa" opacity="0.15" />
    <circle cx="32" cy="12" r="7" fill="#60a5fa" opacity="0.15" />
  </svg>
);

export const LampSVG: React.FC<{ size?: number }> = ({ size = 42 }) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 26 44">
    <rect x="10" y="38" width="6" height="4" rx="1" fill="#78716c" />
    <rect x="12" y="16" width="2" height="22" rx="1" fill="#a8a29e" />
    <path d="M4 16 L13 2 L22 16 Z" fill="#fbbf24" />
    <line x1="4" y1="16" x2="22" y2="16" stroke="#d97706" strokeWidth="1" />
  </svg>
);

export const MouseSVG: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size * 0.65} height={size} viewBox="0 0 22 34">
    <rect x="3" y="3" width="16" height="28" rx="8" fill="#475569" />
    <line x1="11" y1="3" x2="11" y2="16" stroke="#334155" strokeWidth="0.8" />
    <rect x="8" y="5" width="2.5" height="8" rx="1.2" fill="#64748b" />
    <rect x="11.5" y="5" width="2.5" height="8" rx="1.2" fill="#64748b" />
  </svg>
);

export const RulerSVG: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size * 0.2} viewBox="0 0 50 10">
    <rect x="1" y="1" width="48" height="8" rx="1" fill="#fbbf24" />
    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map((x, i) => (
      <line key={i} x1={3 + x} y1={i % 5 === 0 ? 1 : 4} x2={3 + x} y2="9" stroke="#92400e" strokeWidth={i % 5 === 0 ? 0.8 : 0.4} />
    ))}
  </svg>
);

export const PencilSVG: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size * 0.22} height={size} viewBox="0 0 10 42">
    <polygon points="5,0 8,8 2,8" fill="#fbbf24" />
    <rect x="2" y="8" width="6" height="28" rx="1" fill="#fcd34d" />
    <rect x="2" y="36" width="6" height="3" rx="0.5" fill="#d97706" />
    <polygon points="3,39 7,39 5,42" fill="#1e293b" />
  </svg>
);

export const AppleSVG: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size * 0.85} height={size} viewBox="0 0 30 36">
    <path d="M15 8 Q4 10 3 20 Q2 30 10 34 Q14 36 15 34 Q16 36 20 34 Q28 30 27 20 Q26 10 15 8 Z" fill="#ef4444" />
    <path d="M15 8 Q15 2 18 1" stroke="#166534" strokeWidth="1.5" fill="none" />
    <path d="M16 6 Q20 3 22 5" stroke="#22c55e" strokeWidth="1.2" fill="none" />
    <ellipse cx="10" cy="18" rx="3" ry="4" fill="#fca5a5" opacity="0.3" />
  </svg>
);

export const CandleSVG: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 18 40">
    <rect x="5" y="30" width="8" height="8" rx="1" fill="#78716c" />
    <rect x="6" y="14" width="6" height="16" rx="1" fill="#fef3c7" />
    <line x1="9" y1="14" x2="9" y2="8" stroke="#1e293b" strokeWidth="0.8" />
    <path d="M9 4 Q7 8 9 8 Q11 8 9 4 Z" fill="#f97316" />
    <ellipse cx="9" cy="4" rx="1.5" ry="2" fill="#fbbf24" opacity="0.6" />
  </svg>
);

export const VaseSVG: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 24 42">
    <path d="M8 38 L6 30 Q4 20 8 14 L8 8 Q8 4 12 4 Q16 4 16 8 L16 14 Q20 20 18 30 L16 38 Z" fill="#6366f1" />
    <ellipse cx="12" cy="4" rx="4" ry="1.5" fill="#4f46e5" />
    <path d="M12 2 Q10 -2 8 0 Q10 2 12 2 Z" fill="#22c55e" />
    <path d="M12 2 Q14 -2 16 0 Q14 2 12 2 Z" fill="#16a34a" />
    <circle cx="10" cy="0" r="1.5" fill="#f43f5e" />
    <circle cx="14" cy="1" r="1" fill="#ec4899" />
  </svg>
);

export const EraserSVG: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 36 18">
    <rect x="2" y="2" width="28" height="14" rx="3" fill="#fca5a5" />
    <rect x="2" y="2" width="28" height="7" rx="3" fill="#fecaca" />
    <rect x="30" y="2" width="4" height="14" rx="1" fill="#e5e7eb" />
  </svg>
);

export const OBJECT_MAP: Record<GameObjectId, ObjectDef> = {
  book: { id: "book", name: "Book", svg: BookSVG },
  laptop: { id: "laptop", name: "Laptop", svg: LaptopSVG },
  bottle: { id: "bottle", name: "Bottle", svg: BottleSVG },
  clock: { id: "clock", name: "Clock", svg: ClockSVG },
  plant: { id: "plant", name: "Plant", svg: PlantSVG },
  bag: { id: "bag", name: "Bag", svg: BagSVG },
  headphones: { id: "headphones", name: "Headphones", svg: HeadphonesSVG },
  phone: { id: "phone", name: "Phone", svg: PhoneSVG },
  notebook: { id: "notebook", name: "Notebook", svg: NotebookSVG },
  pen: { id: "pen", name: "Pen", svg: PenSVG },
  cup: { id: "cup", name: "Cup", svg: CupSVG },
  "photo-frame": { id: "photo-frame", name: "Photo Frame", svg: PhotoFrameSVG },
  toy: { id: "toy", name: "Toy", svg: ToySVG },
  shoes: { id: "shoes", name: "Shoes", svg: ShoesSVG },
  keyboard: { id: "keyboard", name: "Keyboard", svg: KeyboardSVG },
  glasses: { id: "glasses", name: "Glasses", svg: GlassesSVG },
  lamp: { id: "lamp", name: "Lamp", svg: LampSVG },
  mouse: { id: "mouse", name: "Mouse", svg: MouseSVG },
  ruler: { id: "ruler", name: "Ruler", svg: RulerSVG },
  pencil: { id: "pencil", name: "Pencil", svg: PencilSVG },
  apple: { id: "apple", name: "Apple", svg: AppleSVG },
  candle: { id: "candle", name: "Candle", svg: CandleSVG },
  vase: { id: "vase", name: "Vase", svg: VaseSVG },
  eraser: { id: "eraser", name: "Eraser", svg: EraserSVG },
};

export const ALL_OBJECT_IDS: GameObjectId[] = Object.keys(OBJECT_MAP) as GameObjectId[];
