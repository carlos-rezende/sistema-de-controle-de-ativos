import { apiClient } from "@/api/apiClient.js";

export const ativoService = {
  getAtivos: () => apiClient("/ativos/"),
  addAtivo: (ativo) =>
    apiClient("/ativos/", {
      method: "POST",
      body: JSON.stringify(ativo),
    }),
  syncQuotes: (tickers) =>
    apiClient("/api/sync/quotes", {
      method: "POST",
      body: JSON.stringify({ tickers }),
    }),
};
