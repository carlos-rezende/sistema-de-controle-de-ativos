import { Activity, BarChart3, DollarSign, Target, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-background">
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <DollarSign className="h-6 w-6" />
          <h1 className="text-xl font-bold">Controle de Ativos</h1>
        </div>
      </div>
    </div>

    <div className="flex">
      <aside className="w-64 border-r bg-muted/10 min-h-[calc(100vh-4rem)]">
        <nav className="p-4 space-y-2">
          <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "bg-muted/50 text-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2"
              : "text-muted-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2 hover:bg-muted/50 hover:text-foreground"
          } end>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span className="ml-2">Dashboard</span>
          </NavLink>
          <NavLink to="/ativos" className={({ isActive }) =>
            isActive
              ? "bg-muted/50 text-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2"
              : "text-muted-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2 hover:bg-muted/50 hover:text-foreground"
          }>
            <Target className="mr-2 h-4 w-4" />
            <span className="ml-2">Ativos</span>
          </NavLink>
          <NavLink to="/carteiras" className={({ isActive }) =>
            isActive
              ? "bg-muted/50 text-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2"
              : "text-muted-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2 hover:bg-muted/50 hover:text-foreground"
          }>
            <Wallet className="mr-2 h-4 w-4" />
            <span className="ml-2">Carteiras</span>
          </NavLink>
          <NavLink to="/analises" className={({ isActive }) =>
            isActive
              ? "bg-muted/50 text-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2"
              : "text-muted-foreground w-full inline-flex items-center justify-start rounded-md px-4 py-2 hover:bg-muted/50 hover:text-foreground"
          }>
            <Activity className="mr-2 h-4 w-4" />
            <span className="ml-2">Análises</span>
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  </div>
);
