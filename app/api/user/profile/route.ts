import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import type { User, ApiResponse } from "@/lib/types"

const JWT_SECRET = process.env.JWT_SECRET || "briqueos-secret-key-2024"

// Mock user data - em producao seria substituido por banco de dados
const users: User[] = [
  {
    id: 1,
    email: "admin@briqueos.com",
    name: "Marco Silva",
    role: "admin",
    phone: "(11) 99999-9999",
    address: "Sao Paulo, SP",
    businessName: "MS Tech Store",
    cnpj: "12.345.678/0001-99",
    segment: "Eletronicos",
    level: 3,
    levelName: "Aprendiz",
    totalProfit: 12850,
    createdAt: "2024-03-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
]

function getUserFromToken(request: NextRequest): User | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: number; email: string }
    return users.find((u) => u.id === decoded.sub) || null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = getUserFromToken(request)

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Nao autorizado" },
      { status: 401 }
    )
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  }

  return NextResponse.json(response)
}

export async function PUT(request: NextRequest) {
  const user = getUserFromToken(request)

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Nao autorizado" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Atualizar dados do usuario
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Usuario nao encontrado" },
        { status: 404 }
      )
    }

    const updatedUser: User = {
      ...users[userIndex],
      name: body.name || users[userIndex].name,
      phone: body.phone || users[userIndex].phone,
      address: body.address || users[userIndex].address,
      businessName: body.businessName || users[userIndex].businessName,
      cnpj: body.cnpj || users[userIndex].cnpj,
      segment: body.segment || users[userIndex].segment,
      avatar: body.avatar || users[userIndex].avatar,
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser

    const response: ApiResponse<User> = {
      success: true,
      data: updatedUser,
      message: "Perfil atualizado com sucesso",
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao atualizar perfil" },
      { status: 400 }
    )
  }
}
