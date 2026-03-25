import { NextRequest, NextResponse } from "next/server"
import type { Purchase, ApiResponse, PaginatedResponse } from "@/lib/types"

// Mock data - em producao seria substituido por banco de dados
const purchases: Purchase[] = [
  {
    id: "CMP-001",
    title: "iPhone 14 Pro Max 256GB",
    category: "Eletronicos",
    condition: "Seminovo - Excelente",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    purchasePrice: 5800,
    freight: 50,
    repair: 0,
    others: 0,
    totalCost: 5850,
    date: "2024-03-20",
    paymentMethod: "PIX",
    source: "OLX",
    city: "Sao Paulo - SP",
    status: "delivered",
    supplier: "Tech Distribuidora",
    supplierInitials: "TD",
    items: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "CMP-002",
    title: "MacBook Air M2 512GB",
    category: "Eletronicos",
    condition: "Novo",
    brand: "Apple",
    model: "MacBook Air M2",
    purchasePrice: 8500,
    freight: 100,
    repair: 0,
    others: 50,
    totalCost: 8650,
    date: "2024-03-22",
    paymentMethod: "Cartao de Credito",
    source: "Fornecedor",
    city: "Rio de Janeiro - RJ",
    status: "in_transit",
    supplier: "Apple Brasil",
    supplierInitials: "AB",
    items: 1,
    expectedDelivery: "2024-03-25",
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

  let filteredPurchases = [...purchases]

  // Filtrar por busca
  if (search) {
    filteredPurchases = filteredPurchases.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.supplier?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Filtrar por status
  if (status) {
    filteredPurchases = filteredPurchases.filter((p) => p.status === status)
  }

  // Paginacao
  const total = filteredPurchases.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPurchases = filteredPurchases.slice(startIndex, endIndex)

  const response: PaginatedResponse<Purchase> = {
    data: paginatedPurchases,
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

    const newPurchase: Purchase = {
      id: `CMP-${String(Date.now()).slice(-6)}`,
      title: body.title,
      category: body.category,
      condition: body.condition || "",
      brand: body.brand || "",
      model: body.model || "",
      image: body.image || "",
      purchasePrice: body.purchasePrice,
      freight: body.freight || 0,
      repair: body.repair || 0,
      others: body.others || 0,
      totalCost: body.purchasePrice + (body.freight || 0) + (body.repair || 0) + (body.others || 0),
      date: body.date,
      paymentMethod: body.paymentMethod,
      source: body.source,
      city: body.city || "",
      adLink: body.adLink || "",
      notes: body.notes || "",
      status: "pending",
      supplier: body.source,
      supplierInitials: body.source.substring(0, 2).toUpperCase(),
      items: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    purchases.push(newPurchase)

    const response: ApiResponse<Purchase> = {
      success: true,
      data: newPurchase,
      message: "Compra registrada com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao registrar compra" },
      { status: 400 }
    )
  }
}
