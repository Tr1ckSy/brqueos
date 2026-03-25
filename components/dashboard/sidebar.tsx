"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Star,
  Package,
  ShoppingBag,
  TrendingUp,
  FileText,
  User,
  Calendar,
  Users,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  badge?: number
  badgeColor?: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: "Principal",
    items: [
      { icon: <LayoutDashboard size={16} />, label: "Dashboard", href: "#dashboard" },
      { icon: <Star size={16} />, label: "Níveis & XP", href: "#niveis" },
    ],
  },
  {
    title: "Estoque",
    items: [
      { icon: <Package size={16} />, label: "Produtos", href: "#produtos", badge: 12 },
    ],
  },
  {
    title: "Financeiro",
    items: [
      { icon: <ShoppingBag size={16} />, label: "Compras", href: "#compras", badge: 5 },
      { icon: <TrendingUp size={16} />, label: "Vendas", href: "#vendas", badge: 8 },
      { icon: <FileText size={16} />, label: "Relatórios", href: "#relatorios" },
    ],
  },
  {
    title: "Conta",
    items: [
      { icon: <User size={16} />, label: "Meu Perfil", href: "#perfil" },
      { icon: <Calendar size={16} />, label: "Planos", href: "#planos" },
    ],
  },
]

interface SidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function Sidebar({ activeSection = "dashboard", onSectionChange, collapsed = false, onCollapsedChange }: SidebarProps) {
  const { user, logout } = useAuth()
  
  const handleNavClick = (href: string) => {
    const section = href.replace("#", "")
    onSectionChange?.(section)
  }

  const getUserInitials = () => {
    if (!user?.name) return "US"
    const names = user.name.split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return names[0].substring(0, 2).toUpperCase()
  }

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 pb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
          <Home size={18} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-extrabold tracking-tight">
            Brique<span className="text-primary">OS</span>
          </span>
        )}
      </div>

      {/* Level Card */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/10 blur-xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
              Nível 3
            </span>
            <p className="font-heading text-sm font-extrabold text-foreground mb-0.5">Aprendiz</p>
            <p className="text-[10px] text-muted-foreground mb-2">R$ 1.250 / R$ 2.500 de lucro</p>
            <Progress value={50} className="h-1.5 bg-muted/50" />
            <p className="text-[10px] text-muted-foreground mt-1.5">Próximo: Intermediário</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-2">
            {!collapsed && (
              <p className="px-3 py-2.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 relative mb-0.5",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-primary rounded-r-full" />
                  )}
                  <span className={cn(isActive && "text-primary")}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                          isActive
                            ? "bg-primary/20 text-primary border-primary/30"
                            : item.badgeColor === "purple"
                              ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                              : "bg-secondary text-muted-foreground border-border"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}

        {/* Logout */}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-destructive hover:bg-destructive/10 transition-colors mb-2"
        >
          <LogOut size={16} />
          {!collapsed && <span>Sair</span>}
        </button>
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-8 w-8 border-2 border-primary/30">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-orange-600 text-white text-xs font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{user?.name || "Usuario"}</p>
              <p className="text-[10px] text-muted-foreground">Ver meu perfil</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onCollapsedChange?.(!collapsed)}
        className="absolute top-20 -right-3 w-6 h-6 rounded-full bg-card border border-border shadow-sm p-0 hover:bg-secondary"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </Button>
    </aside>
  )
}
