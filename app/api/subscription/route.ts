import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import type { Subscription, Plan, ApiResponse } from "@/lib/types"

const JWT_SECRET = process.env.JWT_SECRET || "briqueos-secret-key-2024"

// Mock plans
const plans: Plan[] = [
  {
    id: "trial",
    name: "Trial",
    description: "Experimente tudo por 7 dias",
    price: 0,
    period: "7 dias gratis",
    periodLabel: "Sem compromisso",
    features: [
      "Produtos ilimitados",
      "Dashboard completo",
      "Todos os relatorios",
      "Usuarios ilimitados",
      "Alertas de estoque",
      "Exportacao de dados",
      "Suporte prioritario",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    description: "Tudo que voce precisa para crescer",
    price: 49,
    period: "/mes",
    periodLabel: "Cobrado mensalmente",
    features: [
      "Produtos ilimitados",
      "Dashboard completo",
      "Todos os relatorios",
      "Usuarios ilimitados",
      "Alertas de estoque",
      "Exportacao de dados",
      "Suporte prioritario",
      "Integracao com marketplaces",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Melhor custo-beneficio",
    price: 117,
    period: "/trimestre",
    periodLabel: "Equivale a R$ 39/mes",
    features: [
      "Tudo do Starter",
      "Previsao de demanda com IA",
      "Analise avancada de tendencias",
      "API de acesso",
      "Consultoria mensal",
      "Suporte 24/7",
      "Backup prioritario",
      "Relatorios personalizados",
    ],
    popular: true,
  },
]

// Mock subscriptions
const subscriptions: Subscription[] = [
  {
    id: "sub-001",
    userId: 1,
    planId: "starter",
    planName: "Starter",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    renewalDate: "2024-04-15",
    createdAt: new Date().toISOString(),
  },
]

function getUserIdFromToken(request: NextRequest): number | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: number }
    return decoded.sub
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const userId = getUserIdFromToken(request)

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Nao autorizado" },
      { status: 401 }
    )
  }

  const userSubscription = subscriptions.find((s) => s.userId === userId)

  const response: ApiResponse<{ subscription: Subscription | null; plans: Plan[] }> = {
    success: true,
    data: {
      subscription: userSubscription || null,
      plans,
    },
  }

  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromToken(request)

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Nao autorizado" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { planId } = body

    const plan = plans.find((p) => p.id === planId)
    if (!plan) {
      return NextResponse.json(
        { success: false, error: "Plano nao encontrado" },
        { status: 404 }
      )
    }

    // Calcular datas
    const startDate = new Date()
    let endDate = new Date()
    
    if (planId === "trial") {
      endDate.setDate(endDate.getDate() + 7)
    } else if (planId === "starter") {
      endDate.setMonth(endDate.getMonth() + 1)
    } else if (planId === "pro") {
      endDate.setMonth(endDate.getMonth() + 3)
    }

    const newSubscription: Subscription = {
      id: `sub-${String(Date.now()).slice(-6)}`,
      userId,
      planId: plan.id,
      planName: plan.name,
      status: planId === "trial" ? "trial" : "active",
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }

    // Remover assinatura anterior do usuario
    const existingIndex = subscriptions.findIndex((s) => s.userId === userId)
    if (existingIndex !== -1) {
      subscriptions.splice(existingIndex, 1)
    }

    subscriptions.push(newSubscription)

    const response: ApiResponse<Subscription> = {
      success: true,
      data: newSubscription,
      message: `Assinatura do plano ${plan.name} realizada com sucesso`,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erro ao processar assinatura" },
      { status: 400 }
    )
  }
}
