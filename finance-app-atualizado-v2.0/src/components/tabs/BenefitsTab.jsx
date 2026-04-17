import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { fmt, uid } from "../../utils/formatters";
import { INPUT_CLASS, BENEFIT_TYPE_COLORS, GOAL_COLORS } from "../../constants";
import { Modal } from "../shared/Modal";
import { Field } from "../shared/Field";
import { Badge } from "../shared/Badge";
import { OwnerToggle } from "../shared/OwnerToggle";
import { SaveBtn } from "../shared/SaveBtn";

export function BenefitsTab({ benefits, setBenefits, mode }) {
  const [open, setOpen] = useState(false);
  const [adj, setAdj] = useState({});
  const [f, setF] = useState({ name: "", type: "VR", balance: "", owner: "me" });

  const save = () => {
    if (!f.name.trim() || f.balance === "") return;
    setBenefits((p) => [...p, { ...f, id: uid(), balance: parseFloat(f.balance) }]);
    setF({ name: "", type: "VR", balance: "", owner: "me" });
    setOpen(false);
  };

  const adjust = (id) => {
    const v = parseFloat(adj[id] || 0);
    if (!v) return;
    setBenefits((p) =>
      p.map((c) =>
        c.id === id ? { ...c, balance: Math.max(0, parseFloat((c.balance + v).toFixed(2))) } : c
      )
    );
    setAdj((p) => ({ ...p, [id]: "" }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-slate-400 text-xs">Saldo total em benefícios</p>
          <p className="text-emerald-400 font-mono font-bold text-2xl">
            {fmt(benefits.reduce((a, b) => a + b.balance, 0))}
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-semibold shadow-lg shadow-emerald-900/30"
        >
          <Plus size={16} /> Novo Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.length === 0 && (
          <p className="text-slate-500 col-span-2 text-center py-12 text-sm">
            Nenhum cartão de benefício cadastrado
          </p>
        )}
        {benefits.map((card) => (
          <div key={card.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={BENEFIT_TYPE_COLORS[card.type] || "slate"}>{card.type}</Badge>
                  {mode === "couple" && (
                    <Badge color="blue">{card.owner === "me" ? "Eu" : "Parceiro(a)"}</Badge>
                  )}
                </div>
                <p className="text-white font-semibold text-base">{card.name}</p>
              </div>
              <button
                onClick={() => setBenefits((p) => p.filter((c) => c.id !== card.id))}
                className="text-slate-600 hover:text-red-400 transition-colors p-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <p className="text-3xl font-bold font-mono text-white mb-5">{fmt(card.balance)}</p>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="+ ou − valor..."
                className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                value={adj[card.id] || ""}
                onChange={(e) => setAdj((p) => ({ ...p, [card.id]: e.target.value }))}
              />
              <button
                onClick={() => adjust(card.id)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Aplicar
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-1.5">Use valor negativo para registrar uso do saldo</p>
          </div>
        ))}
      </div>

      {open && (
        <Modal title="Novo Cartão de Benefício" onClose={() => setOpen(false)}>
          <Field label="Nome do Cartão">
            <input
              className={INPUT_CLASS}
              placeholder="Ex: VR Sodexo, VA Flash..."
              value={f.name}
              onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <Field label="Tipo de Benefício">
            <select
              className={INPUT_CLASS}
              value={f.type}
              onChange={(e) => setF((p) => ({ ...p, type: e.target.value }))}
            >
              <option value="VR">VR – Vale Refeição</option>
              <option value="VA">VA – Vale Alimentação</option>
              <option value="VT">VT – Vale Transporte</option>
              <option value="Other">Outro</option>
            </select>
          </Field>
          <Field label="Saldo Atual (R$)">
            <input
              className={INPUT_CLASS}
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={f.balance}
              onChange={(e) => setF((p) => ({ ...p, balance: e.target.value }))}
            />
          </Field>
          <OwnerToggle
            value={f.owner}
            onChange={(v) => setF((p) => ({ ...p, owner: v }))}
            mode={mode}
          />
          <SaveBtn onClick={save}>Salvar Cartão</SaveBtn>
        </Modal>
      )}
    </div>
  );
}
