"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingBag, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const recentSales = [
  { item: "iPhone 13 Pro", value: 4200, profit: 850, status: "success" },
  { item: "MacBook Air M2", value: 7500, profit: 1200, status: "success" },
  { item: "Samsung Galaxy S23", value: 3800, profit: 620, status: "success" },
  { item: "AirPods Pro 2", value: 1200, profit: 280, status: "success" },
]

const recentPurchases = [
  { item: "PlayStation 5", cost: 3200, status: "estoque" },
  { item: "Nintendo Switch", cost: 1800, status: "estoque" },
  { item: "Xbox Series X", cost: 2900, status: "vendido" },
  { item: "Monitor LG 27\"", cost: 1500, status: "estoque" },
]

const turnoverData = [
  { category: "Celulares", days: 12, trend: "fast" },
  { category: "Eletrônicos", days: 18, trend: "medium" },
  { category: "Games", days: 8, trend: "fast" },
  { category: "Roupas", days: 25, trend: "slow" },
  { category: "Acessórios", days: 15, trend: "medium" },
]

export function RecentSales() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center">
            <DollarSign size={13} className="text-success" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Últimas Vendas</CardTitle>
            <p className="text-[10px] text-muted-foreground">Mais recentes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="text-right py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Valor</th>
                <th className="text-right py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Lucro</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 font-medium truncate max-w-[120px]">{sale.item}</td>
                  <td className="py-2.5 text-right text-muted-foreground">R$ {sale.value.toLocaleString('pt-BR')}</td>
                  <td className="py-2.5 text-right font-semibold text-success">+R$ {sale.profit.toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentPurchases() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShoppingBag size={13} className="text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Últimas Compras</CardTitle>
            <p className="text-[10px] text-muted-foreground">Mais recentes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="text-right py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Custo</th>
                <th className="text-right py-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((purchase, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 font-medium truncate max-w-[120px]">{purchase.item}</td>
                  <td className="py-2.5 text-right text-muted-foreground">R$ {purchase.cost.toLocaleString('pt-BR')}</td>
                  <td className="py-2.5 text-right">
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-[9px] px-2 py-0.5 font-bold",
                        purchase.status === "estoque" 
                          ? "bg-primary/10 text-primary hover:bg-primary/10" 
                          : "bg-success/10 text-success hover:bg-success/10"
                      )}
                    >
                      {purchase.status === "estoque" ? "Em Estoque" : "Vendido"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export function TurnoverChart() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Activity size={13} className="text-destructive" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Giro de Produtos</CardTitle>
            <p className="text-[10px] text-muted-foreground">Por categoria</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {turnoverData.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">{item.days} dias</span>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-[9px] px-2 py-0.5 font-bold",
                    item.trend === "fast" && "bg-success/10 text-success hover:bg-success/10",
                    item.trend === "medium" && "bg-warning/10 text-warning hover:bg-warning/10",
                    item.trend === "slow" && "bg-destructive/10 text-destructive hover:bg-destructive/10"
                  )}
                >
                  {item.trend === "fast" ? "Rápido" : item.trend === "medium" ? "Médio" : "Lento"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AdvancedMetrics() {
  const metrics = [
    { label: "Ticket Médio", value: "R$ 2.450", change: "+12%" },
    { label: "Margem Média", value: "23.5%", change: "+2.3%" },
    { label: "ROI Médio", value: "34%", change: "+5%" },
    { label: "Taxa de Giro", value: "2.8x", change: "+0.3" },
  ]

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-info/10 flex items-center justify-center">
            <Activity size={13} className="text-info" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Indicadores</CardTitle>
            <p className="text-[10px] text-muted-foreground">Métricas avançadas</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">{metric.value}</span>
                <span className="text-[10px] font-bold text-success">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
