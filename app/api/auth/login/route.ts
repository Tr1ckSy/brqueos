import { NextRequest, NextResponse } from "next/server"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

// In-memory users storage (replace with database in production)
const users = [
  {
    id: 1,
    email: "admin@briqueos.com",
    // Password: admin123
    password: "$2a$10$Qjm5yDhGKjvqkXGpLGzPpOzJxSvNPv1N6VvJHxlG6nGTwVxq0gUGK",
    name: "Administrador",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: 2,
    email: "usuario@briqueos.com",
    // Password: user123
    password: "$2a$10$Qjm5yDhGKjvqkXGpLGzPpOzJxSvNPv1N6VvJHxlG6nGTwVxq0gUGK",
    name: "Usuario Teste",
    role: "user",
    createdAt: new Date(),
  },
]

const JWT_SECRET = process.env.JWT_SECRET || "briqueos-jwt-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha sao obrigatorios" },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { message: "Credenciais invalidas" },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciais invalidas" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    )

    return NextResponse.json({
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
