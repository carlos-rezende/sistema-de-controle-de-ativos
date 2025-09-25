import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { analyticsService } from '@/service/analyticsService.js';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const AnalysePage = () => {
  const { ticker } = useParams();
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalise = async () => {
      if (!ticker) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await analyticsService.analisarAtivo(ticker);
        setAnalise(data);
        setError(null);
      } catch (err) {
        // Captura a mensagem de erro do backend para exibição
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalise();
  }, [ticker]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando análise para {ticker}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-red-500">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold mb-4">Ocorreu um problema</h2>
        <p>Detalhes do erro: {error}</p>
      </div>
    );
  }

  if (!analise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Análise não encontrada para {ticker}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{analise.ticker}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada</CardTitle>
          <CardDescription>Principais métricas de performance do ativo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Rentabilidade Anual:</strong> {analise?.performance?.retorno_anualizado ? (analise.performance.retorno_anualizado * 100).toFixed(2) + '%' : 'N/A'}
          </p>
          <p>
            <strong>Volatilidade:</strong> {analise?.performance?.volatilidade ? (analise.performance.volatilidade * 100).toFixed(2) + '%' : 'N/A'}
          </p>
          <p>
            <strong>Beta:</strong> {analise?.performance?.beta?.toFixed(2) || 'N/A'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gráfico será inserido aqui...</p>
        </CardContent>
      </Card>
    </div>
  );
};
