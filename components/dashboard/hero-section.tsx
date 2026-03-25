"use client"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Edit3 } from "lucide-react"

interface HeroSectionProps {
  username: string
  levelName: string
  nextLevelName: string
  progress: number
  totalProfit: number
  monthlyGoal?: number
  currentMonthlyProfit?: number
}

export function HeroSection({
  username,
  levelName,
  nextLevelName,
  progress,
  totalProfit,
  monthlyGoal,
  currentMonthlyProfit = 0,
}: HeroSectionProps) {
  const goalProgress = monthlyGoal ? Math.min((currentMonthlyProfit / monthlyGoal) * 100, 100) : 0
  const formattedProfit = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalProfit)

  const formattedGoal = monthlyGoal
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(monthlyGoal)
    : null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-transparent border border-primary/15 p-6 md:p-8 mb-6">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-success/5 blur-2xl pointer-events-none" />
      
      <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            Painel de Controle
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold leading-tight mb-3">
            Olá, <span className="text-primary">{username}</span>
          </h2>
          
          {/* Level Progress */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{levelName}</span>
            <div className="flex-1 max-w-[200px]">
              <Progress value={progress} className="h-1.5 bg-muted/50" />
            </div>
            <span className="text-xs font-bold text-primary">{progress}%</span>
            <span className="text-[10px] text-muted-foreground">→ {nextLevelName}</span>
          </div>

          {/* Monthly Goal */}
          {monthlyGoal && (
            <div className="mt-4 pt-4 border-t border-primary/10">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] text-muted-foreground">
                  Meta mensal: {formattedGoal}
                </span>
                <div className="flex-1 max-w-[240px]">
                  <Progress 
                    value={goalProgress} 
                    className="h-1.5 bg-muted/50" 
                  />
                </div>
                <span className={`text-xs font-bold ${goalProgress >= 100 ? 'text-success' : 'text-primary'}`}>
                  {goalProgress.toFixed(0)}%
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                  <Edit3 size={12} />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="font-heading text-3xl md:text-4xl font-extrabold text-success leading-none mb-1">
            {formattedProfit}
          </p>
          <p className="text-xs text-muted-foreground">lucro total acumulado</p>
        </div>
      </div>
    </div>
  )
}
