// src/pages/CarteirasPage/CarteirasPage.jsx

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { carteiraService } from '@/service/carteiraService.js'
import { AlertCircle, BarChart3, Plus } from 'lucide-react'
import { useState } from 'react'

export const CarteirasPage = ({ carteiras, setCarteiras }) => {
  const [novaCarteira, setNovaCarteira] = useState({
    nome: '',
    descricao: ''
  })

  const criarNovaCarteira = async () => {
    try {

      const response = await carteiraService.createCarteira(novaCarteira)


      setCarteiras([...carteiras, response])


      setNovaCarteira({ nome: '', descricao: '' })
    } catch (error) {
      console.error('Erro ao criar carteira:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carteiras</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Carteira
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Carteira</DialogTitle>
              <DialogDescription>
                Dê um nome e uma descrição para sua nova carteira.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Minha primeira carteira"
                  value={novaCarteira.nome}
                  onChange={(e) => setNovaCarteira({ ...novaCarteira, nome: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  placeholder="Carteira de longo prazo com foco em dividendos"
                  value={novaCarteira.descricao}
                  onChange={(e) => setNovaCarteira({ ...novaCarteira, descricao: e.target.value })}
                />
              </div>
              <Button onClick={criarNovaCarteira} className="w-full">
                Criar Carteira
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {carteiras.map((carteira) => (
          <Card key={carteira.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {carteira.nome}
                <Badge variant="outline">
                  {carteira.ativa ? 'Ativa' : 'Inativa'}
                </Badge>
              </CardTitle>
              <CardDescription>{carteira.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor Total:</span>
                  <span className="font-medium">
                    R$ {carteira.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {carteiras.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma carteira encontrada</h3>
            <p className="text-muted-foreground text-center mb-4">
              Crie sua primeira carteira para começar a gerenciar seus investimentos
            </p>
            <Button onClick={() => { }}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeira Carteira
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}