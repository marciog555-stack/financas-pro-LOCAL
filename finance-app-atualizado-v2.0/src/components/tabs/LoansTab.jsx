import { useState } from "react";
import { Plus, Trash2, Percent } from "lucide-react";
import { fmt, uid } from "../../utils/formatters";
import { INPUT_CLASS } from "../../constants";
import { Modal } from "../shared/Modal";
import { Field } from "../shared/Field";
import { Badge } from "../shared/Badge";
import { OwnerToggle } from "../shared/OwnerToggle";
import { ProgressBar } from "../shared/ProgressBar";
import { SaveBtn } from "../shared/SaveBtn";

export function LoansTab({ loans, setLoans, mode }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    name: "",
    totalAmount: "",
    interestRate: "",
    totalInstallments: "",
    remainingInstallments: "",
    monthlyPayment: "",
    owner: "me",
  });

  const save = () => {
    if (!f.name.trim() || !f.totalAmount || !f.totalInstallments) return;
    setLoans((p) => [
      ...p,
      {
        ...f,
        id: uid(),
        totalAmount: parseFloat(f.totalAmount),
        interestRate: parseFloat(f.interestRate || 0),
        totalInstallments: parseInt(f.totalInstallments),
        remainingInstallments: parseInt(f.remainingInstallments || f.totalInstallments),
        monthlyPayment: parseFloat(f.monthlyPayment || 0),
      },
    ]);
    setF({
      name: "",
      totalAmount: "",
      interestRate: "",
      totalInstallments: "",
      remainingInstallments: "",
      monthlyPayment: "",
      owner: "me",
    });
    setOpen(false);
  };

  const totalMonthly = loans.reduce((a, b) => a + b.monthlyPayment, 0);
  const totalRemaining = loans.reduce((a, b) => a + b.remainingInstallments * b.monthlyPayment, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-6">
          <div>
            <p className="text-slate-400 text-xs">Parcelas/mês</p>
            <p className="text-red-400 font-mono font-bold text-xl">{fmt(totalMonthly)}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Total restante</p>
            <p className="text-white font-mono font-bold text-xl">{fmt(totalRemaining)}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-lg shadow-emerald-900/30"
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>

      <div className="space-y-4">
        {loans.length === 0 && (
          <p className="text-slate-500 text-center py-12 text-sm">
            Nenhum empréstimo ou dívida cadastrada
          </p>
        )}
        {loans.map((loan) => {
          const paid = loan.totalInstallments - loan.remainingInstallments;
          const paidPct = (paid / loan.totalInstallments) * 100;
          const remaining = loan.remainingInstallments * loan.monthlyPayment;
          return (
            <div key={loan.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white font-semibold text-base mb-1.5">{loan.name}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge color="red">
                      <Percent size={10} className="inline mr-0.5" />
                      {loan.interestRate}% a.m.
                    </Badge>
                    {mode === "couple" && (
                      <Badge color="blue">{loan.owner === "me" ? "Eu" : "Parceiro(a)"}</Badge>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setLoans((p) => p.filter((l) => l.id !== loan.id))}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Valor Total", value: fmt(loan.totalAmount), color: "text-slate-300" },
                  { label: "Parcela", value: fmt(loan.monthlyPayment), color: "text-red-400" },
                  { label: "Restante", value: fmt(remaining), color: "text-amber-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-slate-800/50 rounded-xl p-3 text-center">
                    <p className="text-slate-500 text-xs mb-1">{label}</p>
                    <p className={`font-mono font-bold text-sm ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">
                    {paid} de {loan.totalInstallments} parcelas pagas
                  </span>
                  <span className="text-slate-500">{loan.remainingInstallments} restante(s)</span>
                </div>
                <ProgressBar pct={paidPct} color="#10B981" />
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <Modal title="Novo Empréstimo / Dívida" onClose={() => setOpen(false)}>
          <Field label="Nome / Descrição">
            <input
              className={INPUT_CLASS}
              placeholder="Ex: Financiamento Notebook"
              value={f.name}
              onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor Total (R$)">
              <input
                className={INPUT_CLASS}
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={f.totalAmount}
                onChange={(e) => setF((p) => ({ ...p, totalAmount: e.target.value }))}
              />
            </Field>
            <Field label="Juros (% a.m.)">
              <input
                className={INPUT_CLASS}
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 1.99"
                value={f.interestRate}
                onChange={(e) => setF((p) => ({ ...p, interestRate: e.target.value }))}
              />
            </Field>
            <Field label="Total de Parcelas">
              <input
                className={INPUT_CLASS}
                type="number"
                min="1"
                placeholder="Ex: 12"
                value={f.totalInstallments}
                onChange={(e) => setF((p) => ({ ...p, totalInstallments: e.target.value }))}
              />
            </Field>
            <Field label="Parcelas Restantes">
              <input
                className={INPUT_CLASS}
                type="number"
                min="0"
                placeholder="Ex: 8"
                value={f.remainingInstallments}
                onChange={(e) => setF((p) => ({ ...p, remainingInstallments: e.target.value }))}
              />
            </Field>
          </div>
          <Field label="Valor da Parcela (R$)">
            <input
              className={INPUT_CLASS}
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={f.monthlyPayment}
              onChange={(e) => setF((p) => ({ ...p, monthlyPayment: e.target.value }))}
            />
          </Field>
          <OwnerToggle
            value={f.owner}
            onChange={(v) => setF((p) => ({ ...p, owner: v }))}
            mode={mode}
          />
          <SaveBtn onClick={save}>Salvar Empréstimo</SaveBtn>
        </Modal>
      )}
    </div>
  );
}
