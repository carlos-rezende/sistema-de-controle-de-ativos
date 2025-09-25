const API_BASE_URL = "http://localhost:8000";

/**
 * Função utilitária para fazer requisições à API.
 * @param {string} endpoint - O endpoint da API (ex: '/ativos/').
 * @param {object} options - Opções de fetch (method, body, headers, etc.).
 */
export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(
        errorData.detail ||
          errorData.message ||
          `HTTP error! status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
