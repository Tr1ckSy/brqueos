import { NextRequest, NextResponse } from "next/server"
import type { Sale, ApiResponse, PaginatedResponse } from "@/lib/types"

// Mock data - em producao seria substituido por banco de dados
const sales: Sale[] = [
  {
    id: "VND-001",
    productId: "1",
    productName: "iPhone 14 Pro Max 256GB",
    customer: "Joao Silva",
    salePrice: 7299,
    costPrice: 5850,
    profit: 1449,
    margin: 19.85,
    platform: "Mercado Livre",
    paymentMethod: "PIX",
    status: "completed",
    date: "2024-03-24",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "VND-002",
    productId: "3",
    productName: "AirPods Pro 2a Geracao",
    customer: "Maria Santos",
    salePrice: 1849,
    costPrice: 1200,
    profit: 649,
    margin: 35.1,
    platform: "OLX",
    paymentMethod: "Dinheiro",
    status: "completed",
    date: "2024-03-24",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "VND-003",
    productId: "2",
    productName: "MacBook Air M2 512GB",
    customer: "Pedro Oliveira",
    salePrice: 10499,
    costPrice: 8650,
    profit: 1849,
    margin: 17.61,
    platform: "WhatsApp",
    paymentMethod: "Cartao de Credito",
    status: "pending",
    date: "2024-03-25",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const platform = searchParams.get("platform") || ""

  let filteredSales = [...sales]

  // Filtrar por busca
  if (search) {
    filteredSales = filteredSales.filter(
      (s) =>
        s.productName.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.customer?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Filtrar por status
  if (status) {
    filteredSales = filteredSales.filter((s) => s.status === status)
  }

  // Filtrar por plataforma
  if (platform) {
    filteredSales = filteredSales.filter((s) => s.platform === platform)
  }

  // Paginacao
  const total = filteredSales.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedSales = filteredSales.slice(startIndex, endIndex)

  const response: PaginatedResponse<Sale> = {
    data: paginatedSales,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }

  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const profit = body.salePrice - body.costPrice
    const margin = (profit / body.salePrice) * 100

    const newSale: Sale = {
      id: `VND-${String(Date.now()).slice(-6)}`,
      productId: body.productId,
      productName: body.productName,
      productImage: body.productImage || "",
      customer: body.customer || "",
      salePrice: body.salePrice,
      costPrice: body.costPrice,
      profit,
      margin,
      platform: body.platform,
      paymentMethod: body.paymentMethod,
      status: "pending",
      date: body.date || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    sales.push(newSale)

    const response: ApiResponse<Sale> = {
      success: true,
      data: newSale,
      message: "Venda registrada com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao registrar venda" },
      { status: 400 }
    )
  }
}
