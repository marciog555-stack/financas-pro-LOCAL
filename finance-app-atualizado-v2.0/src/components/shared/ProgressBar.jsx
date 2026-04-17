export function ProgressBar({ pct, color = "#10B981" }) {
  return (
    <div className="w-full bg-slate-700/60 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, Math.max(0, pct))}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
