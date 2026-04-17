// Format number as currency (BRL)
export const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n ?? 0);

// Format date to Brazilian format
export const fmtDate = (d) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—";

// Generate unique ID
export const uid = () => Math.random().toString(36).slice(2, 10);
