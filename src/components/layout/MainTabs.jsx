import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { AtivosPage } from '@/pages/AtivosPage/AtivosPage.jsx';
import { CarteirasPage } from '@/pages/CarteirasPage/CarteirasPage.jsx';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage.jsx';
import { useState } from 'react';

export const MainTabs = ({ ativosData, carteirasData, setAtivos }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="ativos">Ativos</TabsTrigger>
        <TabsTrigger value="carteiras">Carteiras</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        {ativosData && carteirasData && <DashboardPage ativos={ativosData} carteiras={carteirasData} />}
      </TabsContent>

      <TabsContent value="ativos">
        {ativosData && <AtivosPage ativos={ativosData} setAtivos={setAtivos} />}
      </TabsContent>

      <TabsContent value="carteiras">
        {carteirasData && <CarteirasPage carteiras={carteirasData} />}
      </TabsContent>
    </Tabs>
  );
};
