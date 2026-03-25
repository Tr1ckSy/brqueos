import { NextRequest, NextResponse } from "next/server"
import type { DashboardStats, ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  // Mock stats - em producao seria calculado a partir do banco de dados
  const stats: DashboardStats = {
    totalPurchases: 28500,
    totalSales: 41200,
    totalProfit: 12700,
    averageMargin: 30.8,
    productsCount: 45,
    lowStockCount: 5,
    pendingOrders: 3,
  }

  const response: ApiResponse<DashboardStats> = {
    success: true,
    data: stats,
  }

  return NextResponse.json(response)
}
