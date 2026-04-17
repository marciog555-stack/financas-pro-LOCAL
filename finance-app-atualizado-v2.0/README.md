# 📊 FinançasPro – Gestão Financeira Inteligente

Uma aplicação React moderna para gestão financeira pessoal e em casal, com dados salvos localmente no navegador.

## 🎯 Funcionalidades

- **Dashboard Dinâmico**: Visão completa da saúde financeira
- **Gestão de Renda**: Rastreie fontes de renda recorrentes e únicas
- **Controle de Despesas**: Organize despesas por categoria com status de pagamento
- **Cartões de Benefício**: Gerencie VR, VA, VT e outros benefícios
- **Gestão de Dívidas**: Acompanhe empréstimos e financiamentos
- **Metas de Economia**: Crie e monitore objetivos financeiros com progresso visual
- **Modo Casal**: Suporte para gestão financeira compartilhada
- **Exportação de Dados**: Baixe seus dados em formato JSON
- **Integração localStorage**: Dados salvos automaticamente no navegador

## 📁 Estrutura do Projeto

```
finance-app-organized/
├── public/                          # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── shared/                  # Componentes reutilizáveis
│   │   │   ├── Modal.jsx
│   │   │   ├── Field.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── OwnerToggle.jsx
│   │   │   └── SaveBtn.jsx
│   │   ├── tabs/                    # Componentes de abas
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IncomeTab.jsx
│   │   │   ├── ExpensesTab.jsx
│   │   │   ├── BenefitsTab.jsx
│   │   │   ├── LoansTab.jsx
│   │   │   └── GoalsTab.jsx
│   │   └── modals/                  # Componentes modais
│   │       └── (removido SQLModal)
│   ├── constants/
│   │   └── index.js                 # Categorias, cores, configurações
│   ├── lib/
│   │   ├── seed.js                  # Dados iniciais
│   │   └── schemas.sql              # Schema do banco de dados (documentação)
│   ├── utils/
│   │   └── formatters.js            # Funções de formatação
│   ├── App.jsx                      # Componente principal
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Estilos globais
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Abra em seu navegador:**
```
http://localhost:5173
```

## 🔧 Configuração do Supabase
Os dados são salvos automaticamente no localStorage do navegador.
## 🎨 Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Ícones
- **Supabase** - Backend e autenticação
- **DM Sans & DM Mono** - Tipografia

## 📱 Modos

### Modo Individual
- Rastreie suas finanças pessoais
- Dashboard focado em seus dados

### Modo Casal
- Compartilhe despesas entre partners
- Controle de propriedade: "Eu", "Parceiro(a)" ou "Compartilhado"
- Visão consolidada de renda e metas

## 🛠️ Desenvolvimento

### Build para produção:
```bash
npm run build
```

### Preview do build:
```bash
npm run preview
```

## 📝 Componentes Principais

### Dashboard
Visão geral com 6 cards informativos:
- Renda Total
- Despesas Fixas
- Saldo Líquido
- Vale Benefícios
- Parcelas/mês
- Progresso Metas

### Abas Funcionais
- **Renda**: Adicione e gerencie fontes de renda
- **Despesas**: Organize por categoria com status de pagamento
- **Benefícios**: Rastreie cartões com saldos
- **Dívidas**: Monitore empréstimos com progresso de pagamento
- **Metas**: Crie objetivos com prazos e cores personalizadas

## 🎯 Próximas Melhorias

- [ ] Autenticação Supabase integrada
- [ ] Sincronização em tempo real
- [ ] Relatórios e gráficos avançados
- [ ] Exportação de dados (CSV, PDF)
- [ ] Modo escuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Aplicativo mobile

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ para simplificar a gestão financeira.

---

**FinançasPro**: Suas finanças, sob controle! 💰
