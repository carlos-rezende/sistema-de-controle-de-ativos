import { apiClient } from "@/api/apiClient.js";

export const analyticsService = {
  getMetricasMercado: () => apiClient("/analytics/metricas-mercado"),

  analisarAtivo: (ticker, periodoDias = 252) =>
    apiClient(`/analytics/ativo/${ticker}?periodo_dias=${periodoDias}`),

  compararAtivos: (tickers, periodoDias = 252) =>
    apiClient("/analytics/comparar-ativos", {
      method: "POST",
      body: JSON.stringify({ tickers, periodo_dias: periodoDias }),
    }),

  analisarCarteira: (carteiraId) =>
    apiClient(`/analytics/carteira/${carteiraId}`),

  getGraficoAtivo: (ticker, periodoDias = 252) =>
    apiClient(`/analytics/ativo/${ticker}/grafico?periodo_dias=${periodoDias}`),

  getRelatorioCarteira: (carteiraId) =>
    apiClient(`/analytics/carteira/${carteiraId}/relatorio`),
};
