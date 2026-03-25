import { NextRequest, NextResponse } from "next/server"
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

// In-memory users storage (should be shared with login route in production)
const users: Array<{
  id: number
  email: string
  password: string
  name: string
  role: string
  createdAt: Date
}> = [
  {
    id: 1,
    email: "admin@briqueos.com",
    password: "$2a$10$Qjm5yDhGKjvqkXGpLGzPpOzJxSvNPv1N6VvJHxlG6nGTwVxq0gUGK",
    name: "Administrador",
    role: "admin",
    createdAt: new Date(),
  },
]

const JWT_SECRET = process.env.JWT_SECRET || "briqueos-jwt-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Todos os campos sao obrigatorios" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "A senha deve ter no minimo 6 caracteres" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: "Este email ja esta em uso" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: "user",
      createdAt: new Date(),
    }
    users.push(newUser)

    // Generate JWT token
    const token = jwt.sign(
      {
        sub: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    )

    return NextResponse.json({
      access_token: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
