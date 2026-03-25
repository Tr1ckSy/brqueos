"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Smartphone, Shirt, Monitor, Gamepad2, Package } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Eletrônicos", profit: 4850, icon: Monitor, color: "text-info", bg: "bg-info/10" },
  { name: "Celulares", profit: 3200, icon: Smartphone, color: "text-success", bg: "bg-success/10" },
  { name: "Roupas", profit: 2100, icon: Shirt, color: "text-primary", bg: "bg-primary/10" },
  { name: "Games", profit: 1750, icon: Gamepad2, color: "text-warning", bg: "bg-warning/10" },
  { name: "Outros", profit: 980, icon: Package, color: "text-muted-foreground", bg: "bg-muted/50" },
]

const maxProfit = Math.max(...categories.map((c) => c.profit))

export function CategoryRanking() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
            <Star size={13} className="text-warning" />
          </div>
          <div>
            <CardTitle className="font-heading text-sm font-bold">Top Categorias</CardTitle>
            <p className="text-[10px] text-muted-foreground">Por lucro</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            const percentage = (category.profit / maxProfit) * 100

            return (
              <div key={category.name} className="flex items-center gap-3">
                <span className="font-heading text-xs font-extrabold text-muted-foreground w-4 text-center">
                  {index + 1}
                </span>
                <div className={cn("w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0", category.bg)}>
                  <Icon size={12} className={category.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-1 truncate">{category.name}</p>
                  <Progress value={percentage} className="h-1 bg-muted/30" />
                </div>
                <span className="font-heading text-xs font-extrabold min-w-[70px] text-right">
                  R$ {category.profit.toLocaleString("pt-BR")}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
