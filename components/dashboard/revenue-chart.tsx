"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, TrendingUp } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, CartesianGrid, Area, AreaChart } from "recharts"

const revenueData = [
  { month: "Set", receita: 4200, custo: 2800 },
  { month: "Out", receita: 5800, custo: 3200 },
  { month: "Nov", receita: 6500, custo: 3800 },
  { month: "Dez", receita: 8200, custo: 4500 },
  { month: "Jan", receita: 7100, custo: 3900 },
  { month: "Fev", receita: 9400, custo: 5100 },
]

const profitData = [
  { month: "Set", lucro: 1400 },
  { month: "Out", lucro: 2600 },
  { month: "Nov", lucro: 2700 },
  { month: "Dez", lucro: 3700 },
  { month: "Jan", lucro: 3200 },
  { month: "Fev", lucro: 4300 },
]

// Acumulado
const cumulativeData = profitData.reduce((acc, item, index) => {
  const prevTotal = index > 0 ? acc[index - 1].total : 0
  acc.push({ month: item.month, total: prevTotal + item.lucro })
  return acc
}, [] as { month: string; total: number }[])

export function RevenueChart() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-info/10 flex items-center justify-center">
              <Monitor size={13} className="text-info" />
            </div>
            <div>
              <CardTitle className="font-heading text-sm font-bold">Receita por Mês</CardTitle>
              <p className="text-[10px] text-muted-foreground">Últimos 6 meses</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
              <span className="text-muted-foreground">Receita</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-info/60" />
              <span className="text-muted-foreground">Custo</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={revenueData} barGap={4}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
            />
            <Bar dataKey="receita" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="custo" fill="var(--info)" opacity={0.5} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ProfitChart() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp size={13} className="text-success" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Lucro Acumulado</CardTitle>
            <p className="text-[10px] text-muted-foreground">Evolução mensal</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={cumulativeData}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Total']}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="var(--success)" 
              strokeWidth={2}
              fill="url(#profitGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
