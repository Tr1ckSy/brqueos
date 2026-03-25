"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download,
  Upload,
  X,
  Camera,
  Save,
} from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  costPrice: number
  salePrice: number
  stock: number
  minStock: number
  status: "active" | "low_stock" | "out_of_stock"
  image?: string
  margin: number
  lastSale?: string
}

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 14 Pro Max 256GB",
    sku: "IPH-14PM-256",
    category: "Eletronicos",
    costPrice: 5800,
    salePrice: 7299,
    stock: 12,
    minStock: 5,
    status: "active",
    margin: 25.8,
    lastSale: "2h atras",
  },
  {
    id: "2",
    name: "MacBook Air M2 512GB",
    sku: "MBA-M2-512",
    category: "Eletronicos",
    costPrice: 8500,
    salePrice: 10499,
    stock: 4,
    minStock: 5,
    status: "low_stock",
    margin: 23.5,
    lastSale: "5h atras",
  },
  {
    id: "3",
    name: "AirPods Pro 2a Geracao",
    sku: "APP-2G",
    category: "Acessorios",
    costPrice: 1200,
    salePrice: 1849,
    stock: 28,
    minStock: 10,
    status: "active",
    margin: 54.1,
    lastSale: "30min atras",
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra",
    sku: "SGS-24U-256",
    category: "Eletronicos",
    costPrice: 5200,
    salePrice: 6799,
    stock: 0,
    minStock: 3,
    status: "out_of_stock",
    margin: 30.7,
    lastSale: "3 dias",
  },
  {
    id: "5",
    name: "Apple Watch Series 9 45mm",
    sku: "AW-S9-45",
    category: "Wearables",
    costPrice: 2800,
    salePrice: 3699,
    stock: 9,
    minStock: 5,
    status: "active",
    margin: 32.1,
    lastSale: "1h atras",
  },
  {
    id: "6",
    name: "iPad Pro 12.9 M2 256GB",
    sku: "IPP-129-M2",
    category: "Tablets",
    costPrice: 7200,
    salePrice: 9299,
    stock: 3,
    minStock: 4,
    status: "low_stock",
    margin: 29.2,
    lastSale: "1 dia",
  },
]

const statusConfig = {
  active: { label: "Ativo", color: "bg-success/15 text-success border-success/30" },
  low_stock: { label: "Estoque Baixo", color: "bg-warning/15 text-warning border-warning/30" },
  out_of_stock: { label: "Esgotado", color: "bg-destructive/15 text-destructive border-destructive/30" },
}

const categories = ["Eletronicos", "Acessorios", "Wearables", "Tablets", "Audio", "Outros"]

export function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !selectedFilter || product.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    lowStock: products.filter((p) => p.status === "low_stock").length,
    outOfStock: products.filter((p) => p.status === "out_of_stock").length,
    totalValue: products.reduce((acc, p) => acc + p.salePrice * p.stock, 0),
  }

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setShowViewModal(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  const handleDelete = (product: Product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Total de Produtos</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Package size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Ativos</p>
                <p className="text-3xl font-bold text-success">{stats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center">
                <CheckCircle size={24} className="text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border-warning/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Estoque Baixo</p>
                <p className="text-3xl font-bold text-warning">{stats.lowStock}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center">
                <AlertTriangle size={24} className="text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/10 via-info/5 to-transparent border-info/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Valor em Estoque</p>
                <p className="text-3xl font-bold">
                  R$ {(stats.totalValue / 1000).toFixed(0)}k
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-info/15 flex items-center justify-center">
                <BarChart3 size={24} className="text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-3 w-full md:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary/50 border-border/50"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedFilter(null)}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedFilter("active")}>
                    Ativos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("low_stock")}>
                    Estoque Baixo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("out_of_stock")}>
                    Esgotados
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Download size={14} className="mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Upload size={14} className="mr-2" />
                Importar
              </Button>
              <Button 
                size="sm" 
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                onClick={() => setShowNewProductModal(true)}
              >
                <Plus size={14} className="mr-2" />
                Novo Produto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent bg-muted/30">
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                    Produto
                    <ArrowUpDown size={12} className="ml-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">SKU</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Categoria</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Custo</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Venda</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Margem</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Estoque</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-border/50 hover:bg-secondary/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                        <Package size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Ultima venda: {product.lastSale}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">{product.sku}</code>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{product.category}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm text-muted-foreground">
                      R$ {product.costPrice.toLocaleString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold">
                      R$ {product.salePrice.toLocaleString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {product.margin >= 30 ? (
                        <TrendingUp size={14} className="text-success" />
                      ) : (
                        <TrendingDown size={14} className="text-warning" />
                      )}
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          product.margin >= 30 ? "text-success" : "text-warning"
                        )}
                      >
                        {product.margin.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-semibold">{product.stock}</span>
                      <Progress
                        value={(product.stock / (product.minStock * 3)) * 100}
                        className="h-1.5 w-14"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] font-semibold", statusConfig[product.status].color)}
                    >
                      {statusConfig[product.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(product)}>
                          <Eye size={14} className="mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Edit size={14} className="mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Excluir
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

      {/* New Product Modal */}
      <Dialog open={showNewProductModal} onOpenChange={setShowNewProductModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Plus size={16} className="text-primary" />
              </div>
              Novo Produto
            </DialogTitle>
            <DialogDescription>
              Adicione um novo produto ao seu estoque
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-xl bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                <Camera size={24} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Adicionar foto</span>
              </div>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel>Nome do produto</FieldLabel>
                <Input placeholder="Ex: iPhone 14 Pro Max 256GB" />
              </Field>
            </FieldGroup>

            <div className="grid grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>SKU</FieldLabel>
                  <Input placeholder="Ex: IPH-14PM-256" />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>Categoria</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Preco de custo</FieldLabel>
                  <Input placeholder="R$ 0,00" type="number" />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>Preco de venda</FieldLabel>
                  <Input placeholder="R$ 0,00" type="number" />
                </Field>
              </FieldGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Estoque inicial</FieldLabel>
                  <Input placeholder="0" type="number" />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>Estoque minimo</FieldLabel>
                  <Input placeholder="0" type="number" />
                </Field>
              </FieldGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProductModal(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save size={14} className="mr-2" />
              Salvar Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-info/15 flex items-center justify-center">
                <Eye size={16} className="text-info" />
              </div>
              Detalhes do Produto
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                  <Package size={28} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedProduct.name}</h3>
                  <code className="text-xs bg-muted px-2 py-0.5 rounded">{selectedProduct.sku}</code>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Categoria</p>
                  <p className="font-medium text-sm">{selectedProduct.category}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge variant="outline" className={cn("text-xs", statusConfig[selectedProduct.status].color)}>
                    {statusConfig[selectedProduct.status].label}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Custo</p>
                  <p className="font-semibold">R$ {selectedProduct.costPrice.toLocaleString("pt-BR")}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Venda</p>
                  <p className="font-semibold">R$ {selectedProduct.salePrice.toLocaleString("pt-BR")}</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <p className="text-xs text-muted-foreground mb-1">Margem</p>
                  <p className="font-semibold text-success">{selectedProduct.margin.toFixed(1)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Estoque atual</p>
                  <p className="font-semibold text-lg">{selectedProduct.stock} unidades</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Estoque minimo</p>
                  <p className="font-semibold text-lg">{selectedProduct.minStock} unidades</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Fechar
            </Button>
            <Button onClick={() => { setShowViewModal(false); handleEdit(selectedProduct!); }}>
              <Edit size={14} className="mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
                <Edit size={16} className="text-warning" />
              </div>
              Editar Produto
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Nome do produto</FieldLabel>
                  <Input defaultValue={selectedProduct.name} />
                </Field>
              </FieldGroup>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel>SKU</FieldLabel>
                    <Input defaultValue={selectedProduct.sku} />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Categoria</FieldLabel>
                    <Select defaultValue={selectedProduct.category.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Preco de custo</FieldLabel>
                    <Input defaultValue={selectedProduct.costPrice} type="number" />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Preco de venda</FieldLabel>
                    <Input defaultValue={selectedProduct.salePrice} type="number" />
                  </Field>
                </FieldGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Estoque atual</FieldLabel>
                    <Input defaultValue={selectedProduct.stock} type="number" />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Estoque minimo</FieldLabel>
                    <Input defaultValue={selectedProduct.minStock} type="number" />
                  </Field>
                </FieldGroup>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save size={14} className="mr-2" />
              Salvar Alteracoes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                <Trash2 size={16} className="text-destructive" />
              </div>
              Excluir Produto
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta acao nao pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Package size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedProduct.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedProduct.sku}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteModal(false)}>
              <Trash2 size={14} className="mr-2" />
              Excluir Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
