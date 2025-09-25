import { MainLayout } from '@/components/layout/MainLayout.jsx';
import { useApi } from '@/hooks/useApi.js';
import { AnalysePage } from '@/pages/AnalysePage/AnalysePage.jsx';
import { AtivosPage } from '@/pages/AtivosPage/AtivosPage.jsx';
import { CarteirasPage } from '@/pages/CarteirasPage/CarteirasPage.jsx';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage.jsx';
import { ativoService } from '@/service/ativoService.js';
import { carteiraService } from '@/service/carteiraService.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const { data: ativosData, loading: ativosLoading, error: ativosError } = useApi(ativoService.getAtivos);
  const { data: carteirasData, loading: carteirasLoading, error: carteirasError } = useApi(carteiraService.getCarteiras);

  const loading = ativosLoading || carteirasLoading;
  const error = ativosError || carteirasError;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Erro ao carregar dados: {error.message}
      </div>
    );
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage ativos={ativosData} carteiras={carteirasData} />} />
          <Route path="/ativos" element={<AtivosPage ativos={ativosData} />} />
          <Route path="/carteiras" element={<CarteirasPage carteiras={carteirasData} />} />
          <Route path="/analises" element={<p>Página de Análises</p>} />
          <Route path="/analise/:ticker" element={<AnalysePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
