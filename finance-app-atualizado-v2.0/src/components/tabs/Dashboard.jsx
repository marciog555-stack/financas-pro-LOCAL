import { AlertCircle, Calendar, Target } from "lucide-react";
import { TrendingUp, Home, CreditCard, DollarSign, Percent } from "lucide-react";
import { fmt, fmtDate } from "../../utils/formatters";
import { CAT, PALETTE } from "../../constants";
import { ProgressBar } from "../shared/ProgressBar";

export function Dashboard({ incomes, expenses, benefits, loans, goals }) {
  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const net = totalIncome - totalExpenses;
  const totalBenefits = benefits.reduce((a, b) => a + b.balance, 0);
  const loanMonthly = loans.reduce((a, b) => a + b.monthlyPayment, 0);
  const loanTotal = loans.reduce((a, b) => a + b.remainingInstallments * b.monthlyPayment, 0);
  const avgGoal = goals.length ? goals.reduce((a, b) => a + (b.currentAmount / b.targetAmount) * 100, 0) / goals.length : 0;
  const pendingExp = expenses.filter((e) => !e.isPaid);

  const cards = [
    { label: "Renda Total", value: fmt(totalIncome), icon: TrendingUp, color: "emerald", sub: `${incomes.length} fonte(s)` },
    { label: "Despesas Fixas", value: fmt(totalExpenses), icon: Home, color: "amber", sub: `${pendingExp.length} pendente(s)` },
    { label: "Saldo Líquido", value: fmt(net), icon: DollarSign, color: net >= 0 ? "emerald" : "red", sub: net >= 0 ? "✓ positivo" : "✗ atenção!" },
    { label: "Vale Benefícios", value: fmt(totalBenefits), icon: CreditCard, color: "blue", sub: `${benefits.length} cartão(ões)` },
    { label: "Parcelas/mês", value: fmt(loanMonthly), icon: Percent, color: "red", sub: `${fmt(loanTotal)} restante` },
    { label: "Progresso Metas", value: `${avgGoal.toFixed(0)}%`, icon: Target, color: "purple", sub: `${goals.length} meta(s) ativa(s)` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cards.map(({ label, value, icon: Icon, color, sub }) => {
          const c = PALETTE[color] || PALETTE.emerald;
          return (
            <div key={label} className={`${c.bg} border ${c.border} rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs font-medium">{label}</span>
                <Icon size={15} className={c.icon} />
              </div>
              <div className={`font-bold text-lg font-mono tabular-nums ${c.val}`}>{value}</div>
              <div className="text-slate-500 text-xs mt-1">{sub}</div>
            </div>
          );
        })}
      </div>

      {/* Pending Payments */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <AlertCircle size={16} className="text-amber-400" />
          Contas Pendentes
          <span className="ml-auto text-amber-400 font-mono text-sm">
            {fmt(pendingExp.reduce((a, b) => a + b.amount, 0))}
          </span>
        </h3>
        {pendingExp.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">Nenhuma conta pendente 🎉</p>
        ) : (
          <div className="space-y-3">
            {pendingExp.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2.5 border-b border-slate-800/80 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{CAT[e.category]?.emoji}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{e.name}</p>
                    {e.dueDate && (
                      <p className="text-slate-500 text-xs flex items-center gap-1">
                        <Calendar size={10} /> Vence {fmtDate(e.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-amber-400 font-mono font-bold text-sm">{fmt(e.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals snapshot */}
      {goals.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Target size={16} className="text-emerald-400" />
            Resumo das Metas
          </h3>
          <div className="space-y-4">
            {goals.map((g) => {
              const pct = Math.min(100, (g.currentAmount / g.targetAmount) * 100);
              return (
                <div key={g.id}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 text-sm">{g.name}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: g.color }}>
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <ProgressBar pct={pct} color={g.color} />
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-500 text-xs">{fmt(g.currentAmount)}</span>
                    <span className="text-slate-500 text-xs">{fmt(g.targetAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
