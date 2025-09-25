import { apiClient } from "@/api/apiClient.js";

const BASE_URL = "/wallet";

export const carteiraService = {
  getCarteiras: () => apiClient(BASE_URL + "/"),

  getCarteiraById: (carteiraId) => apiClient(BASE_URL + `/${carteiraId}`),

  createCarteira: (carteira) =>
    apiClient(BASE_URL + "/", {
      method: "POST",
      body: JSON.stringify(carteira),
    }),
  deleteCarteira: (carteiraId) =>
    apiClient(BASE_URL + `/${carteiraId}`, {
      method: "DELETE",
    }),

  getAtivosNaCarteira: (carteiraId) =>
    apiClient(BASE_URL + `/${carteiraId}/ativos`),
  addAtivoToCarteira: (carteiraId, ativo) =>
    apiClient(BASE_URL + `/${carteiraId}/ativos`, {
      method: "POST",
      body: JSON.stringify(ativo),
    }),
  removeAtivoFromCarteira: (carteiraAtivoId) =>
    apiClient(BASE_URL + `/ativos/${carteiraAtivoId}`, {
      method: "DELETE",
    }),

  getTransacoes: (carteiraId) =>
    apiClient(BASE_URL + `/${carteiraId}/transacoes`),
  createTransacao: (carteiraId, transacao) =>
    apiClient(BASE_URL + `/${carteiraId}/transacoes`, {
      method: "POST",
      body: JSON.stringify(transacao),
    }),
};
