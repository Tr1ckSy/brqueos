"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  Moon, 
  Sun, 
  Bell, 
  Clock, 
  Upload, 
  Plus,
  Package,
  ShoppingBag,
  TrendingUp 
} from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  title: string
  onMenuClick?: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(true)
  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>
        <h1 className="font-heading text-base font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Quick Add */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-8 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
              <Plus size={14} />
              <span className="hidden sm:inline">Novo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Package size={14} className="text-primary" />
              Novo Produto
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <ShoppingBag size={14} className="text-info" />
              Nova Compra
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <TrendingUp size={14} className="text-success" />
              Nova Venda
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hidden sm:flex"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        {/* History */}
        <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
          <Clock size={16} />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell size={16} />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
          )}
        </Button>

        {/* Backup */}
        <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
          <Upload size={16} />
        </Button>
      </div>
    </header>
  )
}
