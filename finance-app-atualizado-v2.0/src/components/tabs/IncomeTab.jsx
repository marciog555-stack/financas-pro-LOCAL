import { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { fmt, fmtDate, uid } from "../../utils/formatters";
import { Modal } from "../shared/Modal";
import { Field } from "../shared/Field";
import { Badge } from "../shared/Badge";
import { OwnerToggle } from "../shared/OwnerToggle";
import { SaveBtn } from "../shared/SaveBtn";
import { INPUT_CLASS } from "../../constants";

export function IncomeTab({ incomes, setIncomes, mode }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ source: "", amount: "", date: "", isRecurring: false, owner: "me" });

  const save = () => {
    if (!f.source.trim() || !f.amount || !f.date) return;
    setIncomes((p) => [...p, { ...f, id: uid(), amount: parseFloat(f.amount) }]);
    setF({ source: "", amount: "", date: "", isRecurring: false, owner: "me" });
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-slate-400 text-sm">Renda total</p>
          <p className="text-emerald-400 font-mono font-bold text-2xl">
            {fmt(incomes.reduce((a, b) => a + b.amount, 0))}
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-lg shadow-emerald-900/30"
        >
          <Plus size={16} /> Adicionar Renda
        </button>
      </div>

      <div className="space-y-3">
        {incomes.length === 0 && (
          <p className="text-slate-500 text-center py-12 text-sm">Nenhuma renda cadastrada</p>
        )}
        {incomes.map((inc) => (
          <div key={inc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-11 h-11 bg-emerald-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{inc.source}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Calendar size={10} />
                  {fmtDate(inc.date)}
                </span>
                <Badge color={inc.isRecurring ? "emerald" : "slate"}>
                  {inc.isRecurring ? "Recorrente" : "Único"}
                </Badge>
                {mode === "couple" && (
                  <Badge color="blue">{inc.owner === "me" ? "Eu" : "Parceiro(a)"}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-emerald-400 font-mono font-bold">{fmt(inc.amount)}</span>
              <button
                onClick={() => setIncomes((p) => p.filter((i) => i.id !== inc.id))}
                className="text-slate-600 hover:text-red-400 transition-colors p-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title="Nova Fonte de Renda" onClose={() => setOpen(false)}>
          <Field label="Origem / Fonte">
            <input
              className={INPUT_CLASS}
              placeholder="Ex: Salário, Freelance, Aluguel..."
              value={f.source}
              onChange={(e) => setF((p) => ({ ...p, source: e.target.value }))}
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
          <Field label="Data de Recebimento">
            <input
              className={INPUT_CLASS}
              type="date"
              value={f.date}
              onChange={(e) => setF((p) => ({ ...p, date: e.target.value }))}
            />
          </Field>
          <Field label="Frequência">
            <div className="flex gap-2">
              {[
                { v: false, l: "Único" },
                { v: true, l: "Recorrente" },
              ].map(({ v, l }) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setF((p) => ({ ...p, isRecurring: v }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    f.isRecurring === v
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
          <OwnerToggle value={f.owner} onChange={(v) => setF((p) => ({ ...p, owner: v }))} mode={mode} />
          <SaveBtn onClick={save}>Salvar Renda</SaveBtn>
        </Modal>
      )}
    </div>
  );
}
