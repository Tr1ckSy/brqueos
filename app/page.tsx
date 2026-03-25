"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { HeroSection } from "@/components/dashboard/hero-section"
import { MetricCard } from "@/components/dashboard/metric-card"
import { RevenueChart, ProfitChart } from "@/components/dashboard/revenue-chart"
import { CategoryRanking } from "@/components/dashboard/category-ranking"
import { StockDistribution } from "@/components/dashboard/stock-distribution"
import { RecentSales, RecentPurchases, TurnoverChart, AdvancedMetrics } from "@/components/dashboard/recent-transactions"
import { ProductsSection } from "@/components/dashboard/sections/products-section"
import { SalesSection } from "@/components/dashboard/sections/sales-section"
import { PurchasesSection } from "@/components/dashboard/sections/purchases-section"
import { ReportsSection } from "@/components/dashboard/sections/reports-section"
import { LevelsSection } from "@/components/dashboard/sections/levels-section"
import { ProfileSection } from "@/components/dashboard/sections/profile-section"
import { PlansSection } from "@/components/dashboard/sections/plans-section"
import { Loader2 } from "lucide-react"
import { 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  Percent,
} from "lucide-react"

const sectionTitles: Record<string, string> = {
  dashboard: "Dashboard",
  niveis: "Niveis & XP",
  produtos: "Produtos",
  compras: "Compras",
  vendas: "Vendas",
  relatorios: "Relatorios",
  perfil: "Meu Perfil",
  planos: "Planos",
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  const userName = user?.name?.split(" ")[0] || "Usuario"

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <HeroSection
              username={userName}
              levelName="Aprendiz"
              nextLevelName="Intermediario"
              progress={65}
              totalProfit={12850}
            />

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
              <MetricCard
                label="Compras"
                value="R$ 28.500"
                subtitle="investido no mes"
                icon={ShoppingBag}
                color="info"
                trend={{ value: 8, isPositive: true }}
              />
              <MetricCard
                label="Vendas"
                value="R$ 41.200"
                subtitle="faturamento mensal"
                icon={TrendingUp}
                color="success"
                trend={{ value: 23, isPositive: true }}
              />
              <MetricCard
                label="Lucro"
                value="R$ 12.700"
                subtitle="lucro liquido"
                icon={DollarSign}
                color="success"
                trend={{ value: 18, isPositive: true }}
              />
              <MetricCard
                label="Margem"
                value="30.8%"
                subtitle="margem media"
                icon={Percent}
                color="primary"
                trend={{ value: 2.5, isPositive: true }}
              />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
              <RevenueChart />
              <ProfitChart />
            </div>

            {/* Middle Cards Row */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <CategoryRanking />
              <StockDistribution />
              <RecentSales />
            </div>

            {/* Bottom Cards Row */}
            <div className="grid md:grid-cols-3 gap-4">
              <AdvancedMetrics />
              <RecentPurchases />
              <TurnoverChart />
            </div>
          </div>
        )

      case "niveis":
        return (
          <div className="max-w-5xl mx-auto">
            <LevelsSection />
          </div>
        )

      case "produtos":
        return (
          <div className="max-w-7xl mx-auto">
            <ProductsSection />
          </div>
        )

      case "vendas":
        return (
          <div className="max-w-7xl mx-auto">
            <SalesSection />
          </div>
        )

      case "compras":
        return (
          <div className="max-w-7xl mx-auto">
            <PurchasesSection />
          </div>
        )

      case "relatorios":
        return (
          <div className="max-w-6xl mx-auto">
            <ReportsSection />
          </div>
        )

      case "perfil":
        return (
          <div className="max-w-3xl mx-auto">
            <ProfileSection />
          </div>
        )

      case "planos":
        return (
          <div className="max-w-5xl mx-auto">
            <PlansSection />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section)
            setMobileMenuOpen(false)
          }}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          title={sectionTitles[activeSection] || "Dashboard"} 
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
