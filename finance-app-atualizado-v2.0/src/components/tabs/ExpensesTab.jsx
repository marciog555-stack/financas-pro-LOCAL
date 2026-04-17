import { useState } from "react";
import { Plus, Trash2, Calendar, CheckCircle2 } from "lucide-react";
import { fmt, fmtDate, uid } from "../../utils/formatters";
import { CAT, INPUT_CLASS } from "../../constants";
import { Modal } from "../shared/Modal";
import { Field } from "../shared/Field";
import { Badge } from "../shared/Badge";
import { OwnerToggle } from "../shared/OwnerToggle";
import { SaveBtn } from "../shared/SaveBtn";

export function ExpensesTab({ expenses, setExpenses, mode }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ category: "rent", name: "", amount: "", dueDate: "", isPaid: false, owner: "shared" });

  const save = () => {
    if (!f.name.trim() || !f.amount) return;
    setExpenses((p) => [...p, { ...f, id: uid(), amount: parseFloat(f.amount) }]);
    setF({ category: "rent", name: "", amount: "", dueDate: "", isPaid: false, owner: "shared" });
    setOpen(false);
  };

  const toggle = (id) => setExpenses((p) => p.map((e) => (e.id === id ? { ...e, isPaid: !e.isPaid } : e)));
  const del = (id) => setExpenses((p) => p.filter((e) => e.id !== id));

  const totalPending = expenses.filter((e) => !e.isPaid).reduce((a, b) => a + b.amount, 0);
  const grouped = Object.keys(CAT).reduce((acc, k) => {
    const items = expenses.filter((e) => e.category === k);
    if (items.length) acc[k] = items;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-6">
          <div>
            <p className="text-slate-400 text-xs">Total mensal</p>
            <p className="text-white font-mono font-bold text-lg">{fmt(expenses.reduce((a, b) => a + b.amount, 0))}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Pendente</p>
            <p className="text-amber-400 font-mono font-bold text-lg">{fmt(totalPending)}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-lg shadow-emerald-900/30"
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>

      <div className="space-y-5">
        {Object.keys(CAT)
          .filter((k) => grouped[k])
          .map((cat) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-xl">{CAT[cat].emoji}</span>
                <h4 className="text-slate-300 font-semibold text-sm">{CAT[cat].label}</h4>
                <span className="ml-auto text-slate-500 text-xs font-mono">
                  {fmt(grouped[cat].reduce((a, b) => a + b.amount, 0))}
                </span>
              </div>
              <div className="space-y-2">
                {grouped[cat].map((exp) => (
                  <div
                    key={exp.id}
                    className={`border rounded-2xl p-4 flex items-center gap-3 transition-all ${
                      exp.isPaid
                        ? "bg-slate-900/30 border-slate-800/50 opacity-55"
                        : "bg-slate-900 border-slate-800"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(exp.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        exp.isPaid
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600 hover:border-emerald-500"
                      }`}
                    >
                      {exp.isPaid && <CheckCircle2 size={13} className="text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${exp.isPaid ? "line-through text-slate-500" : "text-white"}`}>
                        {exp.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        {exp.dueDate && (
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <Calendar size={10} />
                            vence {fmtDate(exp.dueDate)}
                          </span>
                        )}
                        {mode === "couple" && (
                          <Badge color={exp.owner === "shared" ? "slate" : "blue"}>
                            {exp.owner === "shared" ? "Compartilhado" : exp.owner === "me" ? "Eu" : "Parceiro(a)"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`font-mono font-bold text-sm ${exp.isPaid ? "text-emerald-600" : "text-white"}`}>
                        {fmt(exp.amount)}
                      </span>
                      <button
                        onClick={() => del(exp.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {expenses.length === 0 && <p className="text-slate-500 text-center py-12 text-sm">Nenhuma despesa cadastrada</p>}
      </div>

      {open && (
        <Modal title="Nova Despesa" onClose={() => setOpen(false)}>
          <Field label="Categoria">
            <select
              className={INPUT_CLASS}
              value={f.category}
              onChange={(e) => setF((p) => ({ ...p, category: e.target.value }))}
            >
              {Object.entries(CAT).map(([k, { label, emoji }]) => (
                <option key={k} value={k}>
                  {emoji} {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nome / Descrição">
            <input
              className={INPUT_CLASS}
              placeholder="Ex: Conta de Luz"
              value={f.name}
              onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <Field label="Valor (R$)">
            <input
              className={INPUT_CLASS}
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={f.amount}
              onChange={(e) => setF((p) => ({ ...p, amount: e.target.value }))}
            />
          </Field>
          <Field label="Data de Vencimento">
            <input
              className={INPUT_CLASS}
              type="date"
              value={f.dueDate}
              onChange={(e) => setF((p) => ({ ...p, dueDate: e.target.value }))}
            />
          </Field>
          {mode === "couple" ? (
            <OwnerToggle
              value={f.owner}
              onChange={(v) => setF((p) => ({ ...p, owner: v }))}
              mode={mode}
              allowShared
            />
          ) : null}
          <SaveBtn onClick={save}>Salvar Despesa</SaveBtn>
        </Modal>
      )}
    </div>
  );
}
