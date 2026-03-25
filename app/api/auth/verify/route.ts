import { NextRequest, NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "briqueos-jwt-secret-key-2024"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token nao fornecido" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        sub: number
        email: string
        name: string
        role: string
      }

      return NextResponse.json({
        valid: true,
        user: {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        },
      })
    } catch {
      return NextResponse.json(
        { message: "Token invalido" },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Verify error:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
