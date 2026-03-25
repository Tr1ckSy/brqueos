"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  ShoppingBag,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  ArrowRight,
  FileBarChart,
  Sparkles,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
} from "recharts"

const profitData = [
  { name: "Jan", lucro: 8200 },
  { name: "Fev", lucro: 9500 },
  { name: "Mar", lucro: 7800 },
  { name: "Abr", lucro: 11200 },
  { name: "Mai", lucro: 10800 },
  { name: "Jun", lucro: 12700 },
]

const categoryData = [
  { name: "Eletronicos", value: 45, color: "hsl(var(--primary))" },
  { name: "Acessorios", value: 25, color: "hsl(var(--success))" },
  { name: "Wearables", value: 18, color: "hsl(var(--info))" },
  { name: "Outros", value: 12, color: "hsl(var(--warning))" },
]

const salesByDayData = [
  { name: "Seg", vendas: 12 },
  { name: "Ter", vendas: 8 },
  { name: "Qua", vendas: 15 },
  { name: "Qui", vendas: 11 },
  { name: "Sex", vendas: 18 },
  { name: "Sab", vendas: 22 },
  { name: "Dom", vendas: 6 },
]

const reports = [
  {
    id: 1,
    title: "Relatorio de Vendas",
    description: "Analise completa de vendas, lucros e margens",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
    lastGenerated: "Hoje, 10:30",
  },
  {
    id: 2,
    title: "Relatorio de Estoque",
    description: "Inventario, produtos baixo estoque e giro",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
    lastGenerated: "Ontem, 18:00",
  },
  {
    id: 3,
    title: "Relatorio Financeiro",
    description: "Fluxo de caixa, despesas e receitas",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10",
    lastGenerated: "23/03/2024",
  },
  {
    id: 4,
    title: "Relatorio de Compras",
    description: "Fornecedores, custos e prazos",
    icon: ShoppingBag,
    color: "text-info",
    bgColor: "bg-info/10",
    lastGenerated: "22/03/2024",
  },
]

export function ReportsSection() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-success/15 flex items-center justify-center">
                <TrendingUp size={28} className="text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Lucro Acumulado</p>
                <p className="text-2xl font-bold">R$ 60.200</p>
                <p className="text-[10px] text-success font-medium mt-0.5">+18% vs mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                <BarChart3 size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Margem Media</p>
                <p className="text-2xl font-bold">32.5%</p>
                <p className="text-[10px] text-primary font-medium mt-0.5">+2.3% vs mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/10 via-info/5 to-transparent border-info/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-info/15 flex items-center justify-center">
                <Activity size={28} className="text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Giro de Estoque</p>
                <p className="text-2xl font-bold">4.2x</p>
                <p className="text-[10px] text-info font-medium mt-0.5">Otimo desempenho</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Profit Evolution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Evolucao do Lucro</CardTitle>
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                +18% vs ano anterior
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Lucro"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="lucro"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    fill="url(#profitGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Day */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Vendas por Dia da Semana</CardTitle>
            <span className="text-xs text-muted-foreground">Media dos ultimos 3 meses</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByDayData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [value, "Vendas"]}
                />
                <Bar
                  dataKey="vendas"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold">Relatorios Disponiveis</h3>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Ver todos
            <ArrowRight size={12} className="ml-1" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <Card 
              key={report.id} 
              className="bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${report.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <report.icon size={26} className={report.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{report.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock size={10} />
                      <span>Ultimo: {report.lastGenerated}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary">
                    <Download size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generate Custom Report */}
      <Card className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/25 overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-4 right-4 opacity-10">
          <Sparkles size={100} className="text-primary" />
        </div>
        <CardContent className="p-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-xl shadow-primary/30">
                <FileBarChart size={32} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-1">Relatorio Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Crie um relatorio com os dados e periodo que voce precisa
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
              <Calendar size={16} className="mr-2" />
              Gerar Relatorio
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
