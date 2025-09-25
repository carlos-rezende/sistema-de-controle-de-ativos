// src/hooks/useFetchData.js

import { apiCall } from "@/api/apiClient.js";
import { useEffect, useState } from "react";

/**
 * Hook para buscar dados da API.
 * @param {string[]} endpoints - Array de endpoints para buscar.
 */
export const useFetchData = (endpoints) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          endpoints.map((endpoint) => apiCall(endpoint))
        );

        const newData = {};
        endpoints.forEach((endpoint, index) => {
          // Usa o nome do endpoint como chave (ex: 'ativos', 'carteiras')
          const key = endpoint.replace(/\//g, "");
          newData[key] = results[index];
        });

        setData(newData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoints]);

  return { data, loading, error };
};
