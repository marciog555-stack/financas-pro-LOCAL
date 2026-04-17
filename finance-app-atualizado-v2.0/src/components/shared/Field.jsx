export function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-slate-400 text-sm mb-1.5 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
