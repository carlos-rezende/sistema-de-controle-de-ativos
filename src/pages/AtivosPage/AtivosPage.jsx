// src/pages/AtivosPage/AtivosPage.jsx

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { ativoService } from '@/service/ativoService.js'
import { Activity, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const AtivosPage = ({ ativos, setAtivos }) => {
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [novoAtivo, setNovoAtivo] = useState({
    ticker: '', nome_curto: '', nome_longo: '', tipo: 'ACAO', setor: ''
  })
  const [searchTicker, setSearchTicker] = useState('')

  const ativosFiltrados = ativos.filter(ativo =>
    filtroTipo === 'todos' || ativo.tipo === filtroTipo
  )

  const adicionarAtivo = async () => {
    try {
      const response = await ativoService.addAtivo(novoAtivo)

      setAtivos([...ativos, response])
      setNovoAtivo({
        ticker: '',
        nome_curto: '',
        nome_longo: '',
        tipo: 'ACAO',
        setor: ''
      })
    } catch (error) {
      console.error('Erro ao adicionar ativo:', error)
    }
  }

  const buscarDadosExternos = async (tickers) => {
    try {
      await ativoService.syncQuotes(tickers)
      const ativosData = await ativoService.getAtivos()
      setAtivos(ativosData)
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ativos</h1>
        <div className="flex gap-2">
          {/* Diálogo para buscar dados externos */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Buscar Dados
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buscar Dados Externos</DialogTitle>
                <DialogDescription>
                  Digite os tickers separados por vírgula para buscar dados da API externa
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tickers">Tickers</Label>
                  <Input
                    id="tickers"
                    placeholder="PETR4, VALE3, ITUB4"
                    value={searchTicker}
                    onChange={(e) => setSearchTicker(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => {
                    const tickers = searchTicker.split(',').map(t => t.trim().toUpperCase())
                    buscarDadosExternos(tickers)
                    setSearchTicker('')
                  }}
                  className="w-full"
                >
                  Buscar Dados
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Diálogo para adicionar novo ativo */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Ativo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Ativo</DialogTitle>
                <DialogDescription>
                  Cadastre um novo ativo no sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ticker">Ticker</Label>
                  <Input
                    id="ticker"
                    placeholder="PETR4"
                    value={novoAtivo.ticker}
                    onChange={(e) => setNovoAtivo({ ...novoAtivo, ticker: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <Label htmlFor="nome_curto">Nome Curto</Label>
                  <Input
                    id="nome_curto"
                    placeholder="PETROBRAS PN"
                    value={novoAtivo.nome_curto}
                    onChange={(e) => setNovoAtivo({ ...novoAtivo, nome_curto: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={novoAtivo.tipo} onValueChange={(value) => setNovoAtivo({ ...novoAtivo, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACAO">Ação</SelectItem>
                      <SelectItem value="FII">FII</SelectItem>
                      <SelectItem value="ETF">ETF</SelectItem>
                      <SelectItem value="BDR">BDR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="setor">Setor</Label>
                  <Input
                    id="setor"
                    placeholder="Petróleo e Gás"
                    value={novoAtivo.setor}
                    onChange={(e) => setNovoAtivo({ ...novoAtivo, setor: e.target.value })}
                  />
                </div>
                <Button onClick={adicionarAtivo} className="w-full">
                  Adicionar Ativo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Tipos</SelectItem>
            <SelectItem value="ACAO">Ações</SelectItem>
            <SelectItem value="FII">FIIs</SelectItem>
            <SelectItem value="ETF">ETFs</SelectItem>
            <SelectItem value="BDR">BDRs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ativos</CardTitle>
          <CardDescription>
            {ativosFiltrados.length} ativos encontrados
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
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ativosFiltrados.map((ativo) => (
                <TableRow key={ativo.id}>
                  <TableCell className="font-medium">{ativo.ticker}</TableCell>
                  <TableCell>{ativo.nome_curto}</TableCell>
                  <TableCell>
                    <Badge variant={ativo.tipo === 'ACAO' ? 'default' : 'secondary'}>
                      {ativo.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{ativo.setor || 'N/A'}</TableCell>
                  <TableCell>

                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/analise/${ativo.ticker}`}>
                        <Activity className="mr-2 h-4 w-4" />
                        Analisar
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}