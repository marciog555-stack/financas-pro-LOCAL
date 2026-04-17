// Expense Categories
export const CAT = {
  rent:        { label: "Aluguel",  emoji: "🏠" },
  water:       { label: "Água",     emoji: "💧" },
  electricity: { label: "Energia",  emoji: "⚡" },
  internet:    { label: "Internet", emoji: "📡" },
  phone:       { label: "Celular",  emoji: "📱" },
  other:       { label: "Outros",   emoji: "📦" },
};

// Goal Colors
export const GOAL_COLORS = [
  "#10B981", // emerald
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#F59E0B", // amber
  "#EF4444", // red
  "#EC4899", // pink
];

// Color Palette for Dashboard Cards
export const PALETTE = {
  emerald: { bg: "bg-emerald-950/50", border: "border-emerald-800/40", icon: "text-emerald-400", val: "text-emerald-300" },
  amber:   { bg: "bg-amber-950/50",   border: "border-amber-800/40",   icon: "text-amber-400",   val: "text-amber-300" },
  red:     { bg: "bg-red-950/50",     border: "border-red-800/40",     icon: "text-red-400",     val: "text-red-300" },
  blue:    { bg: "bg-blue-950/50",    border: "border-blue-800/40",    icon: "text-blue-400",    val: "text-blue-300" },
  purple:  { bg: "bg-purple-950/50",  border: "border-purple-800/40",  icon: "text-purple-400",  val: "text-purple-300" },
};

// Badge Colors
export const BADGE_COLORS = {
  emerald: "bg-emerald-900/60 text-emerald-400 border border-emerald-800/50",
  blue:    "bg-blue-900/60 text-blue-400 border border-blue-800/50",
  amber:   "bg-amber-900/60 text-amber-400 border border-amber-800/50",
  red:     "bg-red-900/60 text-red-400 border border-red-800/50",
  purple:  "bg-purple-900/60 text-purple-400 border border-purple-800/50",
  slate:   "bg-slate-700/60 text-slate-300 border border-slate-600/50",
};

// Input Styling
export const INPUT_CLASS = "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-600 transition-colors";

// Benefit Card Type Colors
export const BENEFIT_TYPE_COLORS = { VR: "emerald", VA: "blue", VT: "amber", Other: "slate" };
