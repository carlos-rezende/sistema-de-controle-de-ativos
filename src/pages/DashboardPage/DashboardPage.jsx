import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { useApi } from '@/hooks/useApi.js'
import { analyticsService } from '@/service/analyticsService.js'
import { AlertCircle, PieChart, Plus, Target, TrendingUp, Wallet } from 'lucide-react'

export const DashboardPage = ({ ativos, carteiras }) => {

  const { data: metricas, loading: metricasLoading, error: metricasError } = useApi(analyticsService.getMetricasMercado);


  if (metricasLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (metricasError) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-red-500">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p>Erro ao carregar métricas: {metricasError.message}</p>
      </div>
    );
  }


  if (!metricas) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p>Dados de métricas não disponíveis.</p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard page</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Ativo
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ativos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.total_ativos || 0}</div>
            <p className="text-xs text-muted-foreground">
              Ativos cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carteiras</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carteiras.length}</div>
            <p className="text-xs text-muted-foreground">
              Carteiras ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ações</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.distribuicao_tipos?.ACAO || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Ações cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FIIs</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.distribuicao_tipos?.FII || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Fundos Imobiliários
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ativos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Ativos Recentes</CardTitle>
          <CardDescription>
            Últimos ativos adicionados ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Setor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ativos.slice(0, 5).map((ativo) => (
                <TableRow key={ativo.id}>
                  <TableCell className="font-medium">{ativo.ticker}</TableCell>
                  <TableCell>{ativo.nome_curto}</TableCell>
                  <TableCell>
                    <Badge variant={ativo.tipo === 'ACAO' ? 'default' : 'secondary'}>
                      {ativo.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{ativo.setor || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}