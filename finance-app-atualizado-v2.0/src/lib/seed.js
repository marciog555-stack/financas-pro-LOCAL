import { uid } from "../utils/formatters.js";

export const SEED = {
  incomes: [
    { id: uid(), source: "Salário CLT", amount: 5500, date: "2025-04-05", isRecurring: true, owner: "me" },
    { id: uid(), source: "Freelance Design", amount: 1200, date: "2025-04-15", isRecurring: false, owner: "me" },
    { id: uid(), source: "Salário CLT – Parceiro", amount: 4800, date: "2025-04-05", isRecurring: true, owner: "partner" },
  ],
  expenses: [
    { id: uid(), category: "rent", name: "Aluguel Apartamento", amount: 1800, dueDate: "2025-04-05", isPaid: false, owner: "shared" },
    { id: uid(), category: "electricity", name: "Conta de Luz", amount: 180, dueDate: "2025-04-10", isPaid: true, owner: "shared" },
    { id: uid(), category: "internet", name: "Internet Fibra 300MB", amount: 99.90, dueDate: "2025-04-15", isPaid: false, owner: "shared" },
    { id: uid(), category: "water", name: "Conta de Água", amount: 65, dueDate: "2025-04-12", isPaid: false, owner: "shared" },
    { id: uid(), category: "phone", name: "Plano Celular", amount: 59.90, dueDate: "2025-04-20", isPaid: false, owner: "me" },
  ],
  benefits: [
    { id: uid(), name: "VR Sodexo", type: "VR", balance: 420, owner: "me" },
    { id: uid(), name: "VA Flash", type: "VA", balance: 280, owner: "me" },
    { id: uid(), name: "VR Alelo", type: "VR", balance: 380, owner: "partner" },
  ],
  loans: [
    { id: uid(), name: "Notebook Parcelado", totalAmount: 4800, interestRate: 1.99, totalInstallments: 12, remainingInstallments: 8, monthlyPayment: 420, owner: "me" },
    { id: uid(), name: "Empréstimo Pessoal", totalAmount: 15000, interestRate: 2.5, totalInstallments: 24, remainingInstallments: 18, monthlyPayment: 735, owner: "partner" },
  ],
  goals: [
    { id: uid(), name: "Viagem Europa 🌍", currentAmount: 3200, targetAmount: 12000, targetDate: "2025-12-31", color: "#3B82F6" },
    { id: uid(), name: "Fundo de Emergência", currentAmount: 8500, targetAmount: 15000, targetDate: "2025-09-30", color: "#10B981" },
    { id: uid(), name: "Novo Celular 📱", currentAmount: 600, targetAmount: 2000, targetDate: "2025-06-30", color: "#8B5CF6" },
  ],
};
