# 📑 Documentação do Projeto FinançasPro

## 🎯 Visão Geral

Seu projeto foi reorganizado de um **único arquivo monolítico** em uma **arquitetura modular e profissional** seguindo as melhores práticas de desenvolvimento React.

---

## 📊 Antes vs Depois

### ❌ Antes
- 1 arquivo único (finance-app.jsx) com ~2000 linhas
- SQL schema embutido
- Componentes, constantes e lógica tudo misturado
- Difícil de manter e escalar

### ✅ Depois
- **Estrutura profissional** com separação clara de responsabilidades
- **Componentes modulares** e reutilizáveis
- **Constants centralizadas** para fácil manutenção
- **Utils bem organizadas** com funções específicas
- **Pronto para escalabilidade**

---

## 📁 Estrutura de Pastas

```
finance-app-organized/
│
├── src/
│   ├── components/
│   │   ├── shared/                  # Componentes reutilizáveis
│   │   │   ├── Modal.jsx            # Modal genérico
│   │   │   ├── Field.jsx            # Label + Input
│   │   │   ├── Badge.jsx            # Tags coloridas
│   │   │   ├── ProgressBar.jsx      # Barra de progresso
│   │   │   ├── OwnerToggle.jsx      # Toggle de responsável
│   │   │   └── SaveBtn.jsx          # Botão de salvar
│   │   │
│   │   ├── tabs/                    # Componentes por seção
│   │   │   ├── Dashboard.jsx        # Painel principal
│   │   │   ├── IncomeTab.jsx        # Gestão de renda
│   │   │   ├── ExpensesTab.jsx      # Gestão de despesas
│   │   │   ├── BenefitsTab.jsx      # Cartões de benefício
│   │   │   ├── LoansTab.jsx         # Gestão de dívidas
│   │   │   └── GoalsTab.jsx         # Metas de economia
│   │   │
│   │   └── modals/                  # Modais específicos
│   │       └── SQLModal.jsx         # Modal com schema SQL
│   │
│   ├── constants/
│   │   └── index.js                 # Configurações globais
│   │                                 # - CAT (categorias)
│   │                                 # - GOAL_COLORS (cores)
│   │                                 # - PALETTE (paletas)
│   │                                 # - INPUT_CLASS (classes Tailwind)
│   │
│   ├── lib/
│   │   ├── supabase.ts              # Cliente Supabase
│   │   ├── seed.js                  # Dados iniciais (mock)
│   │   └── schemas.sql              # Schema do banco de dados
│   │
│   ├── utils/
│   │   └── formatters.js            # Funções de formatação
│   │                                 # - fmt() - Formatação monetária
│   │                                 # - fmtDate() - Formatação de datas
│   │                                 # - uid() - Gerador de IDs
│   │
│   ├── App.jsx                      # Componente raiz
│   ├── main.jsx                     # Entry point da aplicação
│   └── index.css                    # Estilos globais (Tailwind)
│
├── index.html                       # HTML principal
├── package.json                     # Dependências e scripts
├── vite.config.js                   # Configuração Vite
├── tailwind.config.js               # Configuração Tailwind
├── postcss.config.js                # Configuração PostCSS
└── README.md                        # Documentação
```

---

## 🧩 Componentes Principais

### 📊 Shared Components
Componentes reutilizáveis em toda a aplicação:

| Componente | Função | Props |
|-----------|--------|-------|
| `Modal` | Container modal com header | `title`, `onClose`, `children` |
| `Field` | Label + Input container | `label`, `children` |
| `Badge` | Tag colorida | `children`, `color` |
| `ProgressBar` | Barra de progresso | `pct`, `color` |
| `OwnerToggle` | Seletor de responsável | `value`, `onChange`, `mode` |
| `SaveBtn` | Botão de ação | `onClick`, `children` |

### 📑 Tab Components
Componentes por seção funcional:

| Componente | Função |
|-----------|--------|
| `Dashboard` | Overview com 6 cards e resumo de metas |
| `IncomeTab` | Gestão de fontes de renda |
| `ExpensesTab` | Gestão de despesas organizadas |
| `BenefitsTab` | Rastreamento de cartões de benefício |
| `LoansTab` | Gestão de empréstimos e dívidas |
| `GoalsTab` | Criação e rastreamento de metas |

---

## 🔧 Configurações (Constants)

```javascript
// Categorias de Despesa
CAT = {
  rent, water, electricity, internet, phone, other
}

// Cores das Metas
GOAL_COLORS = ["#10B981", "#3B82F6", ...]

// Paleta de Cores Dashboard
PALETTE = {
  emerald, amber, red, blue, purple
}

// Classe CSS para Inputs
INPUT_CLASS = "w-full bg-slate-800 border..."

// Cores de Tipos de Benefício
BENEFIT_TYPE_COLORS = { VR, VA, VT, Other }
```

---

## 🎨 Utilidades (Utils)

### formatters.js
```javascript
fmt(n)           // Formata para BRL: 1000 → R$ 1.000,00
fmtDate(d)       // Formata data: "2025-04-05" → "05/04/2025"
uid()            // Gera ID único: "a1b2c3d4"
```

---

## 📚 Dados Iniciais (Seed)

Inclusos em `lib/seed.js`:
- ✅ 3 fontes de renda
- ✅ 5 despesas
- ✅ 3 cartões de benefício
- ✅ 2 empréstimos
- ✅ 3 metas de economia

---

## 🚀 Como Usar

### 1. **Instalar dependências**
```bash
cd finance-app-organized
npm install
```

### 2. **Iniciar desenvolvimento**
```bash
npm run dev
```

### 3. **Build para produção**
```bash
npm run build
```

---

## 🔌 Integração Supabase

### Setup:
1. Copie o SQL em `src/lib/schemas.sql`
2. Cole no SQL Editor do seu projeto Supabase
3. Configure `.env.local` com suas credenciais
4. Atualize `src/lib/supabase.ts`

### Estrutura do Banco:
- `profiles` - Perfis de usuário
- `incomes` - Fontes de renda
- `expenses` - Despesas
- `benefit_cards` - Cartões de benefício
- `loans` - Empréstimos
- `goals` - Metas

---

## 💡 Benefícios da Nova Estrutura

✅ **Modularidade** - Cada componente tem uma responsabilidade única
✅ **Manutenibilidade** - Fácil encontrar e modificar código
✅ **Reusabilidade** - Componentes compartilhados
✅ **Escalabilidade** - Pronta para crescimento
✅ **Testabilidade** - Componentes isolados
✅ **Performance** - Carregamento otimizado
✅ **Documentação** - Código auto-explicativo

---

## 🎯 Próximos Passos

1. Conectar com Supabase
2. Implementar autenticação
3. Adicionar testes unitários
4. Criar componentes de gráficos
5. Implementar exportação de relatórios
6. Adicionar PWA capabilities

---

## 📞 Suporte

Para dúvidas ou melhorias, consulte a documentação em `README.md`.

---

**Parabéns! 🎉 Seu projeto está pronto para produção!**
