"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

const stockData = [
  { name: "Eletrônicos", count: 24, color: "bg-info" },
  { name: "Celulares", count: 18, color: "bg-success" },
  { name: "Roupas", count: 32, color: "bg-primary" },
  { name: "Games", count: 15, color: "bg-warning" },
  { name: "Acessórios", count: 8, color: "bg-chart-5" },
]

const totalStock = stockData.reduce((sum, item) => sum + item.count, 0)

export function StockDistribution() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package size={13} className="text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Estoque por Categoria</CardTitle>
            <p className="text-[10px] text-muted-foreground">{totalStock} itens em estoque</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {stockData.map((item) => {
            const percentage = (item.count / totalStock) * 100

            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold">{item.count} un</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", item.color)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
