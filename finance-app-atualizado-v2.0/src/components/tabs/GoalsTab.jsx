import { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import { fmt, uid } from "../../utils/formatters";
import { INPUT_CLASS, GOAL_COLORS } from "../../constants";
import { Modal } from "../shared/Modal";
import { Field } from "../shared/Field";
import { ProgressBar } from "../shared/ProgressBar";
import { SaveBtn } from "../shared/SaveBtn";

export function GoalsTab({ goals, setGoals }) {
  const [open, setOpen] = useState(false);
  const [dep, setDep] = useState({});
  const [f, setF] = useState({
    name: "",
    currentAmount: "",
    targetAmount: "",
    targetDate: "",
    color: GOAL_COLORS[0],
  });

  const save = () => {
    if (!f.name.trim() || !f.targetAmount) return;
    setGoals((p) => [
      ...p,
      {
        ...f,
        id: uid(),
        currentAmount: parseFloat(f.currentAmount || 0),
        targetAmount: parseFloat(f.targetAmount),
      },
    ]);
    setF({
      name: "",
      currentAmount: "",
      targetAmount: "",
      targetDate: "",
      color: GOAL_COLORS[0],
    });
    setOpen(false);
  };

  const deposit = (id) => {
    const v = parseFloat(dep[id] || 0);
    if (!v || v <= 0) return;
    setGoals((p) =>
      p.map((g) =>
        g.id === id
          ? {
              ...g,
              currentAmount: Math.min(
                g.targetAmount,
                parseFloat((g.currentAmount + v).toFixed(2))
              ),
            }
          : g
      )
    );
    setDep((p) => ({ ...p, [id]: "" }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-slate-400 text-sm">{goals.length} meta(s) ativa(s)</p>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-lg shadow-emerald-900/30"
        >
          <Plus size={16} /> Nova Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.length === 0 && (
          <p className="text-slate-500 text-center py-12 text-sm">Nenhuma meta cadastrada</p>
        )}
        {goals.map((goal) => {
          const pct = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
          const left = Math.max(0, goal.targetAmount - goal.currentAmount);
          const daysLeft = goal.targetDate
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(goal.targetDate + "T00:00:00") - new Date()) / 86400000
                )
              )
            : null;
          const done = pct >= 100;

          return (
            <div key={goal.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ backgroundColor: goal.color }}
                  />
                  <p className="text-white font-semibold">{goal.name}</p>
                </div>
                <button
                  onClick={() => setGoals((p) => p.filter((g) => g.id !== goal.id))}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex items-end justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold font-mono text-white">
                    {fmt(goal.currentAmount)}
                  </span>
                  <span className="text-slate-400 text-sm ml-2">de {fmt(goal.targetAmount)}</span>
                </div>
                <span className="text-2xl font-bold font-mono" style={{ color: goal.color }}>
                  {pct.toFixed(0)}%
                </span>
              </div>

              <ProgressBar pct={pct} color={goal.color} />

              <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                <span>
                  Faltam <span className="font-mono text-slate-300 font-medium">{fmt(left)}</span>
                </span>
                {daysLeft !== null && (
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {daysLeft === 0 ? "Meta hoje!" : `${daysLeft} dias restantes`}
                  </span>
                )}
              </div>

              {done ? (
                <div className="mt-4 bg-emerald-900/30 border border-emerald-800/50 rounded-xl py-2.5 text-center text-emerald-400 text-sm font-semibold">
                  🎉 Meta alcançada!
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Depositar valor..."
                    className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                    value={dep[goal.id] || ""}
                    onChange={(e) => setDep((p) => ({ ...p, [goal.id]: e.target.value }))}
                  />
                  <button
                    onClick={() => deposit(goal.id)}
                    className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: goal.color }}
                  >
                    Depositar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {open && (
        <Modal title="Nova Meta de Economia" onClose={() => setOpen(false)}>
          <Field label="Nome da Meta">
            <input
              className={INPUT_CLASS}
              placeholder="Ex: Viagem, Reserva de Emergência..."
              value={f.name}
              onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Saldo Atual (R$)">
              <input
                className={INPUT_CLASS}
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={f.currentAmount}
                onChange={(e) => setF((p) => ({ ...p, currentAmount: e.target.value }))}
              />
            </Field>
            <Field label="Valor Alvo (R$)">
              <input
                className={INPUT_CLASS}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={f.targetAmount}
                onChange={(e) => setF((p) => ({ ...p, targetAmount: e.target.value }))}
              />
            </Field>
          </div>
          <Field label="Data Alvo (prazo)">
            <input
              className={INPUT_CLASS}
              type="date"
              value={f.targetDate}
              onChange={(e) => setF((p) => ({ ...p, targetDate: e.target.value }))}
            />
          </Field>
          <Field label="Cor da Meta">
            <div className="flex gap-3 flex-wrap">
              {GOAL_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setF((p) => ({ ...p, color: c }))}
                  className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    outline: f.color === c ? `3px solid ${c}` : "none",
                    outlineOffset: "2px",
                    transform: f.color === c ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </Field>
          <SaveBtn onClick={save}>Criar Meta</SaveBtn>
        </Modal>
      )}
    </div>
  );
}
