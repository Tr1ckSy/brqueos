"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Trophy,
  Target,
  Zap,
  Award,
  Lock,
  CheckCircle,
  TrendingUp,
  Crown,
  ShoppingCart,
  Package,
  DollarSign,
  Flame,
} from "lucide-react"

interface Level {
  number: number
  name: string
  minProfit: number
  maxProfit: number
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  bgColor: string
  unlocked: boolean
  current?: boolean
}

const levels: Level[] = [
  {
    number: 1,
    name: "Iniciante",
    minProfit: 0,
    maxProfit: 500,
    description: "Primeiros passos no mundo do brique",
    icon: Star,
    color: "text-slate-400",
    bgColor: "bg-slate-500/10",
    unlocked: true,
  },
  {
    number: 2,
    name: "Novato",
    minProfit: 500,
    maxProfit: 1500,
    description: "Comecando a entender o negocio",
    icon: Zap,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    unlocked: true,
  },
  {
    number: 3,
    name: "Aprendiz",
    minProfit: 1500,
    maxProfit: 2500,
    description: "Desenvolvendo suas habilidades",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
    unlocked: true,
    current: true,
  },
  {
    number: 4,
    name: "Intermediario",
    minProfit: 2500,
    maxProfit: 5000,
    description: "Dominando as estrategias",
    icon: Award,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    unlocked: false,
  },
  {
    number: 5,
    name: "Experiente",
    minProfit: 5000,
    maxProfit: 10000,
    description: "Consolidando resultados",
    icon: Trophy,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    unlocked: false,
  },
  {
    number: 6,
    name: "Mestre",
    minProfit: 10000,
    maxProfit: 999999,
    description: "Nivel maximo alcancado",
    icon: Crown,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    unlocked: false,
  },
]

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  progress: number
  total: number
  completed: boolean
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Primeira Venda",
    description: "Realize sua primeira venda no sistema",
    icon: ShoppingCart,
    progress: 1,
    total: 1,
    completed: true,
  },
  {
    id: "2",
    title: "Estoque Completo",
    description: "Cadastre 50 produtos no estoque",
    icon: Package,
    progress: 38,
    total: 50,
    completed: false,
  },
  {
    id: "3",
    title: "Vendedor Ouro",
    description: "Alcance R$ 10.000 em vendas no mes",
    icon: DollarSign,
    progress: 8500,
    total: 10000,
    completed: false,
  },
  {
    id: "4",
    title: "Margem de Lucro",
    description: "Mantenha margem media acima de 30%",
    icon: TrendingUp,
    progress: 32,
    total: 30,
    completed: true,
  },
  {
    id: "5",
    title: "Sequencia de Vendas",
    description: "Venda por 7 dias consecutivos",
    icon: Flame,
    progress: 5,
    total: 7,
    completed: false,
  },
]

export function LevelsSection() {
  const currentLevel = levels.find((l) => l.current)
  const currentProfit = 1850
  const nextLevel = levels.find((l) => l.number === (currentLevel?.number || 0) + 1)
  const progressToNext = nextLevel
    ? ((currentProfit - (currentLevel?.minProfit || 0)) /
        ((nextLevel?.minProfit || 1) - (currentLevel?.minProfit || 0))) *
      100
    : 100

  return (
    <div className="space-y-8">
      {/* Current Level Card */}
      <Card className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/30 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-orange-500/10 blur-3xl" />
        <CardContent className="p-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3 hover:rotate-0 transition-transform">
                  {currentLevel && <currentLevel.icon size={44} className="text-white" />}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-card border-2 border-primary flex items-center justify-center shadow-lg">
                  <span className="text-lg font-black text-primary">{currentLevel?.number}</span>
                </div>
              </div>
              <div>
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 text-xs px-3 py-1">
                  Nivel Atual
                </Badge>
                <h2 className="font-heading text-3xl font-extrabold mb-1">{currentLevel?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  R$ {currentProfit.toLocaleString("pt-BR")} de lucro acumulado
                </p>
              </div>
            </div>

            <div className="w-full md:w-72 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progresso para {nextLevel?.name}</span>
                <span className="font-bold text-primary">{progressToNext.toFixed(0)}%</span>
              </div>
              <Progress value={progressToNext} className="h-3 mb-2" />
              <p className="text-[11px] text-muted-foreground text-right">
                Faltam <span className="font-semibold text-foreground">R$ {((nextLevel?.minProfit || 0) - currentProfit).toLocaleString("pt-BR")}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Levels Timeline */}
      <div>
        <h3 className="font-heading text-xl font-bold mb-6">Jornada de Niveis</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-border to-border/30 hidden md:block" />
          
          <div className="grid gap-4">
            {levels.map((level, index) => (
              <Card
                key={level.number}
                className={cn(
                  "relative transition-all duration-300 hover:scale-[1.01]",
                  level.current && "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10",
                  !level.unlocked && "opacity-50"
                )}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                        level.current 
                          ? "bg-gradient-to-br from-primary to-orange-600 shadow-lg shadow-primary/30" 
                          : level.unlocked 
                            ? level.bgColor 
                            : "bg-muted/50"
                      )}
                    >
                      {level.unlocked ? (
                        <level.icon 
                          size={26} 
                          className={level.current ? "text-white" : level.color} 
                        />
                      ) : (
                        <Lock size={22} className="text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-muted-foreground font-medium">Nivel {level.number}</span>
                        {level.current && (
                          <Badge className="text-[9px] px-2 py-0 bg-primary text-primary-foreground">
                            Voce esta aqui
                          </Badge>
                        )}
                        {level.unlocked && !level.current && (
                          <CheckCircle size={14} className="text-success" />
                        )}
                      </div>
                      <h4 className="font-semibold text-base">{level.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{level.description}</p>
                    </div>

                    {/* Profit Range */}
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground mb-1">Lucro necessario</p>
                      <p className="text-sm font-semibold">
                        R$ {level.minProfit.toLocaleString("pt-BR")}
                        {level.maxProfit < 999999 && (
                          <span className="text-muted-foreground font-normal"> - R$ {level.maxProfit.toLocaleString("pt-BR")}</span>
                        )}
                        {level.maxProfit === 999999 && <span className="text-muted-foreground font-normal">+</span>}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-heading text-xl font-bold mb-6">Conquistas</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={cn(
                "transition-all hover:scale-[1.02]",
                achievement.completed 
                  ? "border-success/30 bg-success/5" 
                  : "bg-card/50 border-border/50"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      achievement.completed ? "bg-success/15" : "bg-secondary"
                    )}
                  >
                    <achievement.icon
                      size={24}
                      className={achievement.completed ? "text-success" : "text-muted-foreground"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      {achievement.completed && (
                        <CheckCircle size={14} className="text-success flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={(achievement.progress / achievement.total) * 100}
                        className="h-1.5 flex-1"
                      />
                      <span className={cn(
                        "text-[10px] font-medium",
                        achievement.completed ? "text-success" : "text-muted-foreground"
                      )}>
                        {achievement.completed
                          ? "Completo"
                          : `${achievement.progress.toLocaleString("pt-BR")}/${achievement.total.toLocaleString("pt-BR")}`}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
