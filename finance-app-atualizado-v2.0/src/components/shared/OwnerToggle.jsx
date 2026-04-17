import { Field } from "./Field";

export function OwnerToggle({ value, onChange, mode, allowShared = false }) {
  if (mode !== "couple") return null;

  const opts = allowShared
    ? [
        { v: "shared", l: "Compartilhado" },
        { v: "me", l: "Eu" },
        { v: "partner", l: "Parceiro(a)" },
      ]
    : [
        { v: "me", l: "Eu" },
        { v: "partner", l: "Parceiro(a)" },
      ];

  return (
    <Field label="Responsável">
      <div className="flex gap-2">
        {opts.map(({ v, l }) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              value === v
                ? "bg-emerald-500 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </Field>
  );
}
