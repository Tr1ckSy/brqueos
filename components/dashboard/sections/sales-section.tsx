"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TrendingUp,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Printer,
  DollarSign,
  ShoppingCart,
  Receipt,
  CreditCard,
  Banknote,
  QrCode,
  ArrowUpRight,
  Clock,
  Calendar,
  Package,
  Trash2,
  X,
  Check,
} from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface SaleItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Sale {
  id: string
  customer: string
  customerInitials: string
  items: number
  itemsList?: SaleItem[]
  total: number
  profit: number
  paymentMethod: "pix" | "credit" | "debit" | "cash"
  status: "completed" | "pending" | "cancelled"
  date: string
  time: string
}

const sales: Sale[] = [
  {
    id: "VND-001",
    customer: "Maria Santos",
    customerInitials: "MS",
    items: 3,
    itemsList: [
      { id: "1", name: "iPhone 14 Pro Max 256GB", quantity: 1, price: 7299 },
      { id: "2", name: "AirPods Pro 2a Geracao", quantity: 2, price: 1849 },
    ],
    total: 4599,
    profit: 897,
    paymentMethod: "pix",
    status: "completed",
    date: "Hoje",
    time: "14:32",
  },
  {
    id: "VND-002",
    customer: "Joao Oliveira",
    customerInitials: "JO",
    items: 1,
    itemsList: [
      { id: "1", name: "MacBook Air M2 512GB", quantity: 1, price: 10499 },
    ],
    total: 10499,
    profit: 1999,
    paymentMethod: "credit",
    status: "completed",
    date: "Hoje",
    time: "12:15",
  },
  {
    id: "VND-003",
    customer: "Ana Costa",
    customerInitials: "AC",
    items: 2,
    itemsList: [
      { id: "1", name: "Apple Watch Series 9", quantity: 1, price: 3699 },
    ],
    total: 2198,
    profit: 448,
    paymentMethod: "debit",
    status: "completed",
    date: "Hoje",
    time: "10:45",
  },
  {
    id: "VND-004",
    customer: "Pedro Lima",
    customerInitials: "PL",
    items: 5,
    total: 8750,
    profit: 1650,
    paymentMethod: "pix",
    status: "pending",
    date: "Ontem",
    time: "18:20",
  },
  {
    id: "VND-005",
    customer: "Carla Souza",
    customerInitials: "CS",
    items: 1,
    total: 7299,
    profit: 1499,
    paymentMethod: "cash",
    status: "completed",
    date: "Ontem",
    time: "15:10",
  },
]

const chartData = [
  { name: "Seg", vendas: 4200, lucro: 840 },
  { name: "Ter", vendas: 3800, lucro: 720 },
  { name: "Qua", vendas: 5100, lucro: 1020 },
  { name: "Qui", vendas: 4700, lucro: 940 },
  { name: "Sex", vendas: 6200, lucro: 1240 },
  { name: "Sab", vendas: 7800, lucro: 1560 },
  { name: "Dom", vendas: 3200, lucro: 640 },
]

const paymentIcons = {
  pix: <QrCode size={14} className="text-success" />,
  credit: <CreditCard size={14} className="text-info" />,
  debit: <CreditCard size={14} className="text-primary" />,
  cash: <Banknote size={14} className="text-warning" />,
}

const paymentLabels = {
  pix: "PIX",
  credit: "Credito",
  debit: "Debito",
  cash: "Dinheiro",
}

const statusConfig = {
  completed: { label: "Concluida", color: "bg-success/15 text-success border-success/30" },
  pending: { label: "Pendente", color: "bg-warning/15 text-warning border-warning/30" },
  cancelled: { label: "Cancelada", color: "bg-destructive/15 text-destructive border-destructive/30" },
}

const products = [
  { id: "1", name: "iPhone 14 Pro Max 256GB", price: 7299 },
  { id: "2", name: "MacBook Air M2 512GB", price: 10499 },
  { id: "3", name: "AirPods Pro 2a Geracao", price: 1849 },
  { id: "4", name: "Apple Watch Series 9 45mm", price: 3699 },
  { id: "5", name: "iPad Pro 12.9 M2 256GB", price: 9299 },
]

export function SalesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewSaleModal, setShowNewSaleModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [cartItems, setCartItems] = useState<{ product: typeof products[0]; quantity: number }[]>([])

  const stats = {
    todaySales: 17296,
    todayProfit: 3344,
    totalOrders: 12,
    avgTicket: 1441,
  }

  const handleViewSale = (sale: Sale) => {
    setSelectedSale(sale)
    setShowViewModal(true)
  }

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const existing = cartItems.find(item => item.product.id === productId)
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId))
  }

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Vendas Hoje</p>
                <p className="text-2xl font-bold">
                  R$ {stats.todaySales.toLocaleString("pt-BR")}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">+23% vs ontem</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <DollarSign size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Lucro Hoje</p>
                <p className="text-2xl font-bold text-success">
                  R$ {stats.todayProfit.toLocaleString("pt-BR")}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">+18% vs ontem</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center">
                <TrendingUp size={24} className="text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/10 via-info/5 to-transparent border-info/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Pedidos Hoje</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">+4 vs ontem</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-info/15 flex items-center justify-center">
                <ShoppingCart size={24} className="text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border-warning/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Ticket Medio</p>
                <p className="text-2xl font-bold">
                  R$ {stats.avgTicket.toLocaleString("pt-BR")}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={12} className="text-success" />
                  <span className="text-xs text-success font-medium">+12%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center">
                <Receipt size={24} className="text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Vendas da Semana</CardTitle>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">Vendas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-success" />
                <span className="text-muted-foreground">Lucro</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="lucro"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Actions Bar */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border/50"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Calendar size={14} className="mr-2" />
                Filtrar Data
              </Button>
              <Button 
                size="sm" 
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                onClick={() => setShowNewSaleModal(true)}
              >
                <Plus size={14} className="mr-2" />
                Nova Venda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent bg-muted/30">
                <TableHead className="text-xs font-semibold text-muted-foreground">ID</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Itens</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Total</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Lucro</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Pagamento</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Data</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} className="border-border/50 hover:bg-secondary/30 transition-colors">
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">{sale.id}</code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-9 w-9 border-2 border-border">
                        <AvatarFallback className="bg-secondary text-xs font-semibold">
                          {sale.customerInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{sale.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{sale.items}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-bold">
                      R$ {sale.total.toLocaleString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm text-success font-semibold">
                      +R$ {sale.profit.toLocaleString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5 bg-secondary/50 rounded-full px-2 py-1 w-fit mx-auto">
                      {paymentIcons[sale.paymentMethod]}
                      <span className="text-xs font-medium">{paymentLabels[sale.paymentMethod]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] font-semibold", statusConfig[sale.status].color)}
                    >
                      {statusConfig[sale.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium">{sale.date}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock size={10} />
                        {sale.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewSale(sale)}>
                          <Eye size={14} className="mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer size={14} className="mr-2" />
                          Imprimir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Sale Modal */}
      <Dialog open={showNewSaleModal} onOpenChange={(open) => { setShowNewSaleModal(open); if (!open) setCartItems([]); }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <ShoppingCart size={16} className="text-primary" />
              </div>
              Nova Venda
            </DialogTitle>
            <DialogDescription>
              Adicione produtos e finalize a venda
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 py-4">
            {/* Products */}
            <div className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Cliente</FieldLabel>
                  <Input placeholder="Nome do cliente" />
                </Field>
              </FieldGroup>

              <div>
                <FieldLabel className="mb-2 block">Adicionar produto</FieldLabel>
                <Select onValueChange={addToCart}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center justify-between gap-4 w-full">
                          <span>{product.name}</span>
                          <span className="text-muted-foreground">R$ {product.price.toLocaleString("pt-BR")}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel className="mb-2 block">Forma de pagamento</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <QrCode size={14} className="mr-2 text-success" />
                    PIX
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <CreditCard size={14} className="mr-2 text-info" />
                    Credito
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <CreditCard size={14} className="mr-2 text-primary" />
                    Debito
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Banknote size={14} className="mr-2 text-warning" />
                    Dinheiro
                  </Button>
                </div>
              </div>
            </div>

            {/* Cart */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Package size={14} />
                  Carrinho ({cartItems.length} itens)
                </h4>
                
                {cartItems.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    Nenhum produto adicionado
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.product.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {item.quantity}x R$ {item.product.price.toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold">
                            R$ {(item.product.price * item.quantity).toLocaleString("pt-BR")}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-xl font-bold text-primary">
                      R$ {cartTotal.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowNewSaleModal(false); setCartItems([]); }}>
              Cancelar
            </Button>
            <Button className="bg-success hover:bg-success/90" disabled={cartItems.length === 0}>
              <Check size={14} className="mr-2" />
              Finalizar Venda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Sale Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-info/15 flex items-center justify-center">
                <Receipt size={16} className="text-info" />
              </div>
              Detalhes da Venda
            </DialogTitle>
          </DialogHeader>
          
          {selectedSale && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarFallback className="bg-secondary text-sm font-bold">
                      {selectedSale.customerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedSale.customer}</p>
                    <p className="text-xs text-muted-foreground">{selectedSale.date} as {selectedSale.time}</p>
                  </div>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{selectedSale.id}</code>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Total</p>
                  <p className="font-bold text-lg">R$ {selectedSale.total.toLocaleString("pt-BR")}</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <p className="text-xs text-muted-foreground mb-1">Lucro</p>
                  <p className="font-bold text-lg text-success">+R$ {selectedSale.profit.toLocaleString("pt-BR")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Pagamento</p>
                  <div className="flex items-center gap-2">
                    {paymentIcons[selectedSale.paymentMethod]}
                    <span className="font-medium">{paymentLabels[selectedSale.paymentMethod]}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge variant="outline" className={cn("text-xs", statusConfig[selectedSale.status].color)}>
                    {statusConfig[selectedSale.status].label}
                  </Badge>
                </div>
              </div>

              {selectedSale.itemsList && (
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="font-semibold text-sm mb-3">Itens ({selectedSale.items})</h4>
                  <div className="space-y-2">
                    {selectedSale.itemsList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">R$ {item.price.toLocaleString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Fechar
            </Button>
            <Button variant="outline">
              <Printer size={14} className="mr-2" />
              Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
