import { NextRequest, NextResponse } from "next/server"
import type { Product, ApiResponse, PaginatedResponse } from "@/lib/types"

// Mock data - em producao seria substituido por banco de dados
const products: Product[] = [
  {
    id: "1",
    name: "iPhone 14 Pro Max 256GB",
    sku: "IPH-14PM-256",
    category: "Eletronicos",
    condition: "Seminovo - Excelente",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    costPrice: 5800,
    salePrice: 7299,
    stock: 12,
    minStock: 5,
    status: "active",
    margin: 25.8,
    lastSale: "2h atras",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "MacBook Air M2 512GB",
    sku: "MBA-M2-512",
    category: "Eletronicos",
    condition: "Novo",
    brand: "Apple",
    model: "MacBook Air M2",
    costPrice: 8500,
    salePrice: 10499,
    stock: 4,
    minStock: 5,
    status: "low_stock",
    margin: 23.5,
    lastSale: "5h atras",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "AirPods Pro 2a Geracao",
    sku: "APP-2G",
    category: "Acessorios",
    condition: "Novo",
    brand: "Apple",
    model: "AirPods Pro 2",
    costPrice: 1200,
    salePrice: 1849,
    stock: 28,
    minStock: 10,
    status: "active",
    margin: 54.1,
    lastSale: "30min atras",
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
  const category = searchParams.get("category") || ""

  let filteredProducts = [...products]

  // Filtrar por busca
  if (search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Filtrar por status
  if (status) {
    filteredProducts = filteredProducts.filter((p) => p.status === status)
  }

  // Filtrar por categoria
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  // Paginacao
  const total = filteredProducts.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const response: PaginatedResponse<Product> = {
    data: paginatedProducts,
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

    const newProduct: Product = {
      id: String(Date.now()),
      name: body.name,
      sku: body.sku,
      category: body.category,
      condition: body.condition || "",
      brand: body.brand || "",
      model: body.model || "",
      image: body.image || "",
      costPrice: body.costPrice,
      salePrice: body.salePrice,
      stock: body.stock || 0,
      minStock: body.minStock || 0,
      status: body.stock === 0 ? "out_of_stock" : body.stock <= body.minStock ? "low_stock" : "active",
      margin: ((body.salePrice - body.costPrice) / body.salePrice) * 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
      message: "Produto criado com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao criar produto" },
      { status: 400 }
    )
  }
}
