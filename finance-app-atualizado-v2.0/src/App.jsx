import { useEffect, useState } from "react";
import { User, Users, Download, BarChart2, TrendingUp, Home, CreditCard, Percent, Target, Wallet } from "lucide-react";
import { Dashboard } from "./components/tabs/Dashboard";
import { IncomeTab } from "./components/tabs/IncomeTab";
import { ExpensesTab } from "./components/tabs/ExpensesTab";
import { BenefitsTab } from "./components/tabs/BenefitsTab";
import { LoansTab } from "./components/tabs/LoansTab";
import { GoalsTab } from "./components/tabs/GoalsTab";
import { SEED } from "./lib/seed";

const TABS = [
  { id: "dashboard", label: "Painel", icon: BarChart2 },
  { id: "income", label: "Renda", icon: TrendingUp },
  { id: "expenses", label: "Despesas", icon: Home },
  { id: "benefits", label: "Benefícios", icon: CreditCard },
  { id: "loans", label: "Dívidas", icon: Percent },
  { id: "goals", label: "Metas", icon: Target },
];

export default function FinanceApp() {
  const [mode, setMode] = useState("single");
  const [tab, setTab] = useState("dashboard");
  const [incomes, setIncomes] = useState(SEED.incomes);
  const [expenses, setExpenses] = useState(SEED.expenses);
  const [benefits, setBenefits] = useState(SEED.benefits);
  const [loans, setLoans] = useState(SEED.loans);
  const [goals, setGoals] = useState(SEED.goals);

  const STORAGE_KEY = "financasProData";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data?.incomes) setIncomes(data.incomes);
      if (data?.expenses) setExpenses(data.expenses);
      if (data?.benefits) setBenefits(data.benefits);
      if (data?.loans) setLoans(data.loans);
      if (data?.goals) setGoals(data.goals);
    } catch (error) {
      console.warn("Falha ao carregar dados do localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ incomes, expenses, benefits, loans, goals })
      );
    } catch (error) {
      console.warn("Falha ao salvar dados no localStorage", error);
    }
  }, [incomes, expenses, benefits, loans, goals]);

  const downloadData = () => {
    const data = { incomes, expenses, benefits, loans, goals, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financas-pro-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // In single mode, filter to only "me" items
  const myIncomes = mode === "single" ? incomes.filter((i) => i.owner === "me") : incomes;
  const myBenefits = mode === "single" ? benefits.filter((b) => b.owner === "me") : benefits;
  const myLoans = mode === "single" ? loans.filter((l) => l.owner === "me") : loans;

  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        input[type=number] { -moz-appearance: textfield; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .font-mono, .tabular-nums { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Header ── */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3.5 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Wallet size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none tracking-tight">
                FinançasPro
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">
                {mode === "couple" ? "👫 Modo Casal" : "👤 Modo Individual"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              type="button"
              onClick={downloadData}
              title="Baixar Dados"
              className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-800 transition-colors"
            >
              <Download size={16} />
            </button>
            {/* Mode Toggle */}
            <div className="flex bg-slate-800 border border-slate-700 rounded-xl p-1">
              {[
                { v: "single", l: "Solteiro", Icon: User },
                { v: "couple", l: "Casal", Icon: Users },
              ].map(({ v, l, Icon }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMode(v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === v
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={14} /> {l}
                </button>
              ))}
            </div>
            {/* SQL Button */}
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav
        className="bg-slate-900/95 border-b border-slate-800 sticky top-[61px] z-30 overflow-x-auto"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-3xl mx-auto flex">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                tab === id
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-16">
        {tab === "dashboard" && (
          <Dashboard
            incomes={myIncomes}
            expenses={expenses}
            benefits={myBenefits}
            loans={myLoans}
            goals={goals}
          />
        )}
        {tab === "income" && <IncomeTab incomes={myIncomes} setIncomes={setIncomes} mode={mode} />}
        {tab === "expenses" && (
          <ExpensesTab expenses={expenses} setExpenses={setExpenses} mode={mode} />
        )}
        {tab === "benefits" && (
          <BenefitsTab benefits={myBenefits} setBenefits={setBenefits} mode={mode} />
        )}
        {tab === "loans" && <LoansTab loans={myLoans} setLoans={setLoans} mode={mode} />}
        {tab === "goals" && <GoalsTab goals={goals} setGoals={setGoals} />}
      </main>

    </div>
  );
}
