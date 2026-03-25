"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react"

type ColorVariant = "primary" | "success" | "info" | "warning" | "destructive"

interface MetricCardProps {
  label: string
  value: string
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: LucideIcon
  color?: ColorVariant
  className?: string
}

const colorStyles: Record<ColorVariant, { icon: string; glow: string; trend: string }> = {
  primary: {
    icon: "bg-primary/10 text-primary",
    glow: "bg-primary",
    trend: "text-primary",
  },
  success: {
    icon: "bg-success/10 text-success",
    glow: "bg-success",
    trend: "text-success",
  },
  info: {
    icon: "bg-info/10 text-info",
    glow: "bg-info",
    trend: "text-info",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    glow: "bg-warning",
    trend: "text-warning",
  },
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    glow: "bg-destructive",
    trend: "text-destructive",
  },
}

export function MetricCard({
  label,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = "primary",
  className,
}: MetricCardProps) {
  const styles = colorStyles[color]

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:border-border/80 hover:-translate-y-0.5 group",
        className
      )}
    >
      {/* Top glow line */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] opacity-60", styles.glow)} />

      {/* Icon */}
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-4", styles.icon)}>
        <Icon size={17} />
      </div>

      {/* Label */}
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
      </p>

      {/* Value */}
      <p className="font-heading text-2xl font-extrabold leading-none mb-1">{value}</p>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      )}

      {/* Trend Badge */}
      {trend && (
        <div
          className={cn(
            "absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
            trend.isPositive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {trend.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {trend.value > 0 ? "+" : ""}
          {trend.value}%
        </div>
      )}
    </div>
  )
}
