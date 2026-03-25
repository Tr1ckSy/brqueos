// Tipos do Sistema BriqueOS

// Usuario
export interface User {
  id: number
  email: string
  name: string
  role: "admin" | "user"
  avatar?: string
  phone?: string
  address?: string
  businessName?: string
  cnpj?: string
  segment?: string
  level: number
  levelName: string
  totalProfit: number
  createdAt: string
  updatedAt: string
}

// Produto
export interface Product {
  id: string
  name: string
  sku: string
  category: string
  condition: string
  brand?: string
  model?: string
  image?: string
  costPrice: number
  salePrice: number
  stock: number
  minStock: number
  status: "active" | "low_stock" | "out_of_stock"
  margin: number
  lastSale?: string
  createdAt: string
  updatedAt: string
}

// Compra
export interface Purchase {
  id: string
  title: string
  category: string
  condition?: string
  brand?: string
  model?: string
  image?: string
  purchasePrice: number
  freight: number
  repair: number
  others: number
  totalCost: number
  date: string
  paymentMethod: string
  source: string
  city?: string
  adLink?: string
  notes?: string
  status: "pending" | "delivered" | "in_transit" | "cancelled"
  supplier?: string
  supplierInitials?: string
  items?: number
  expectedDelivery?: string
  createdAt: string
  updatedAt: string
}

// Venda
export interface Sale {
  id: string
  productId: string
  productName: string
  productImage?: string
  customer?: string
  salePrice: number
  costPrice: number
  profit: number
  margin: number
  platform: string
  paymentMethod: string
  status: "completed" | "pending" | "cancelled" | "refunded"
  date: string
  createdAt: string
  updatedAt: string
}

// Plano
export interface Plan {
  id: string
  name: string
  description: string
  price: number
  period: string
  periodLabel?: string
  features: string[]
  popular?: boolean
  current?: boolean
  badge?: string
  badgeColor?: string
}

// Assinatura
export interface Subscription {
  id: string
  userId: number
  planId: string
  planName: string
  status: "active" | "cancelled" | "expired" | "trial"
  startDate: string
  endDate: string
  renewalDate?: string
  createdAt: string
}

// Nivel/XP
export interface Level {
  level: number
  name: string
  minProfit: number
  maxProfit: number
  badge: string
  perks: string[]
}

// Dashboard Stats
export interface DashboardStats {
  totalPurchases: number
  totalSales: number
  totalProfit: number
  averageMargin: number
  productsCount: number
  lowStockCount: number
  pendingOrders: number
}

// Categoria
export interface Category {
  id: string
  name: string
  icon?: string
  productsCount: number
  totalValue: number
}

// Relatorio
export interface Report {
  id: string
  type: "daily" | "weekly" | "monthly" | "custom"
  startDate: string
  endDate: string
  totalRevenue: number
  totalCost: number
  totalProfit: number
  topProducts: Product[]
  salesCount: number
  purchasesCount: number
  createdAt: string
}

// Notificacao
export interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  createdAt: string
}

// Pagamentos
export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "pix" | "boleto"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

// Sessao
export interface Session {
  id: string
  device: string
  browser: string
  location: string
  lastActive: string
  current: boolean
}

// Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
