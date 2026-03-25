"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  ShoppingBag,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Truck,
  Calendar,
  DollarSign,
  Package,
  Clock,
  ArrowDownRight,
  FileText,
  CheckCircle,
  AlertCircle,
  Timer,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { PurchaseModal, type PurchaseFormData } from "@/components/dashboard/modals/purchase-modal"

interface Purchase {
  id: string
  supplier: string
  supplierInitials: string
  items: number
  total: number
  status: "delivered" | "in_transit" | "pending" | "cancelled"
  date: string
  expectedDelivery?: string
}

const purchases: Purchase[] = [
  {
    id: "CMP-001",
    supplier: "Tech Distribuidora",
    supplierInitials: "TD",
    items: 15,
    total: 45800,
    status: "delivered",
    date: "20/03/2024",
  },
  {
    id: "CMP-002",
    supplier: "Apple Brasil",
    supplierInitials: "AB",
    items: 8,
    total: 72500,
    status: "in_transit",
    date: "22/03/2024",
    expectedDelivery: "25/03/2024",
  },
  {
    id: "CMP-003",
    supplier: "Samsung Oficial",
    supplierInitials: "SO",
    items: 12,
    total: 38200,
    status: "pending",
    date: "24/03/2024",
    expectedDelivery: "28/03/2024",
  },
  {
    id: "CMP-004",
    supplier: "Acessórios Plus",
    supplierInitials: "AP",
    items: 50,
    total: 12500,
    status: "delivered",
    date: "18/03/2024",
  },
  {
    id: "CMP-005",
    supplier: "Import Tech",
    supplierInitials: "IT",
    items: 6,
    total: 28900,
    status: "in_transit",
    date: "21/03/2024",
    expectedDelivery: "26/03/2024",
  },
]

const chartData = [
  { name: "Jan", valor: 42000 },
  { name: "Fev", valor: 38000 },
  { name: "Mar", valor: 52000 },
  { name: "Abr", valor: 45000 },
  { name: "Mai", valor: 48000 },
  { name: "Jun", valor: 55000 },
]

const statusConfig = {
  delivered: { 
    label: "Entregue", 
    color: "bg-success/15 text-success border-success/30",
    icon: CheckCircle,
  },
  in_transit: { 
    label: "Em Trânsito", 
    color: "bg-info/15 text-info border-info/30",
    icon: Truck,
  },
  pending: { 
    label: "Pendente", 
    color: "bg-warning/15 text-warning border-warning/30",
    icon: Timer,
  },
  cancelled: { 
    label: "Cancelado", 
    color: "bg-destructive/15 text-destructive border-destructive/30",
    icon: AlertCircle,
  },
}

export function PurchasesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const handleNewPurchase = (data: PurchaseFormData) => {
    console.log("[v0] Nova compra registrada:", data)
    // Aqui seria integrado com a API
  }

  const stats = {
    monthlyPurchases: 197900,
    pendingOrders: 3,
    avgDeliveryDays: 4,
    totalSuppliers: 12,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Compras do Mês</p>
                <p className="text-2xl font-bold">
                  R$ {(stats.monthlyPurchases / 1000).toFixed(0)}k
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight size={12} className="text-info" />
                  <span className="text-xs text-info">Investido</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pedidos Pendentes</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingOrders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Aguardando</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Package size={20} className="text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Prazo Médio</p>
                <p className="text-2xl font-bold">{stats.avgDeliveryDays} dias</p>
                <div className="flex items-center gap-1 mt-1">
                  <Truck size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Entrega</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Truck size={20} className="text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Fornecedores</p>
                <p className="text-2xl font-bold">{stats.totalSuppliers}</p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle size={12} className="text-success" />
                  <span className="text-xs text-success">Ativos</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <ShoppingBag size={20} className="text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Investimento Mensal</CardTitle>
            <span className="text-xs text-muted-foreground">Últimos 6 meses</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]}
                />
                <Bar
                  dataKey="valor"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
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
                placeholder="Buscar por fornecedor ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border/50"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <FileText size={14} className="mr-2" />
                Relatório
              </Button>
              <Button 
                size="sm" 
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90"
                onClick={() => setShowPurchaseModal(true)}
              >
                <Plus size={14} className="mr-2" />
                Nova Compra
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchases Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground">ID</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Fornecedor</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Itens</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Total</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Data</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Previsão</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => {
                const StatusIcon = statusConfig[purchase.status].icon
                return (
                  <TableRow key={purchase.id} className="border-border/50 hover:bg-secondary/30">
                    <TableCell>
                      <code className="text-xs bg-secondary px-2 py-1 rounded">{purchase.id}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-secondary text-xs">
                            {purchase.supplierInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{purchase.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">{purchase.items}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-semibold">
                        R$ {purchase.total.toLocaleString("pt-BR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-medium gap-1",
                          statusConfig[purchase.status].color
                        )}
                      >
                        <StatusIcon size={10} />
                        {statusConfig[purchase.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">{purchase.date}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-muted-foreground">
                        {purchase.expectedDelivery || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye size={14} className="mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit size={14} className="mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={14} className="mr-2" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Nova Compra */}
      <PurchaseModal 
        open={showPurchaseModal} 
        onOpenChange={setShowPurchaseModal}
        onSubmit={handleNewPurchase}
      />
    </div>
  )
}
