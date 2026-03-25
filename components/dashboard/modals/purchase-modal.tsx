"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingBag,
  Camera,
  Upload,
  X,
  DollarSign,
  Truck,
  Wrench,
  MoreHorizontal,
  Calendar,
  CreditCard,
  MapPin,
  Link as LinkIcon,
  Tag,
  Package,
  Loader2,
  Check,
  ImageIcon,
} from "lucide-react"

interface PurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export interface PurchaseFormData {
  title: string
  category: string
  condition: string
  brand: string
  model: string
  image: File | null
  imagePreview: string | null
  purchasePrice: number
  freight: number
  repair: number
  others: number
  totalCost: number
  date: string
  paymentMethod: string
  source: string
  city: string
  adLink: string
  notes: string
}

const categories = [
  "Eletronicos",
  "Celulares",
  "Tablets",
  "Notebooks",
  "Acessorios",
  "Wearables",
  "Audio",
  "Games",
  "Cameras",
  "Outros",
]

const conditions = [
  "Novo",
  "Seminovo - Excelente",
  "Seminovo - Bom",
  "Seminovo - Regular",
  "Com Defeito",
  "Para Pecas",
]

const paymentMethods = [
  "PIX",
  "Dinheiro",
  "Cartao de Credito",
  "Cartao de Debito",
  "Transferencia",
  "Boleto",
]

const sources = [
  "OLX",
  "Mercado Livre",
  "Facebook Marketplace",
  "Instagram",
  "WhatsApp",
  "Loja Fisica",
  "Fornecedor",
  "Outros",
]

export function PurchaseModal({ open, onOpenChange, onSubmit }: PurchaseModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PurchaseFormData>({
    title: "",
    category: "",
    condition: "",
    brand: "",
    model: "",
    image: null,
    imagePreview: null,
    purchasePrice: 0,
    freight: 0,
    repair: 0,
    others: 0,
    totalCost: 0,
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "PIX",
    source: "OLX",
    city: "",
    adLink: "",
    notes: "",
  })

  const calculateTotal = (data: Partial<PurchaseFormData>) => {
    const purchasePrice = data.purchasePrice ?? formData.purchasePrice
    const freight = data.freight ?? formData.freight
    const repair = data.repair ?? formData.repair
    const others = data.others ?? formData.others
    return purchasePrice + freight + repair + others
  }

  const updateField = <K extends keyof PurchaseFormData>(field: K, value: PurchaseFormData[K]) => {
    const newData = { ...formData, [field]: value }
    if (["purchasePrice", "freight", "repair", "others"].includes(field)) {
      newData.totalCost = calculateTotal(newData)
    }
    setFormData(newData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande. Maximo 5MB.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null,
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || formData.purchasePrice <= 0) {
      alert("Preencha os campos obrigatorios: Titulo, Categoria e Preco de Compra")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSubmit?.(formData)
      onOpenChange(false)
      // Reset form
      setFormData({
        title: "",
        category: "",
        condition: "",
        brand: "",
        model: "",
        image: null,
        imagePreview: null,
        purchasePrice: 0,
        freight: 0,
        repair: 0,
        others: 0,
        totalCost: 0,
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "PIX",
        source: "OLX",
        city: "",
        adLink: "",
        notes: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <ShoppingBag size={20} className="text-primary" />
            </div>
            <div>
              <span className="block">Registrar Compra</span>
              <span className="text-xs font-normal text-muted-foreground">
                Adicione uma nova compra ao seu estoque
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informacoes do Produto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Package size={16} className="text-primary" />
              Informacoes do Produto
            </div>

            {/* Titulo */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-medium">
                Titulo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: iPhone 13 128GB Preto"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            {/* Categoria e Condicao */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Categoria <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Selecionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Condicao</Label>
                <Select value={formData.condition} onValueChange={(v) => updateField("condition", v)}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Selecionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((cond) => (
                      <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Marca e Modelo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-xs font-medium">Marca</Label>
                <Input
                  id="brand"
                  placeholder="Apple, Samsung..."
                  value={formData.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-xs font-medium">Modelo</Label>
                <Input
                  id="model"
                  placeholder="iPhone 13"
                  value={formData.model}
                  onChange={(e) => updateField("model", e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
            </div>

            {/* Foto do Produto */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Foto do Produto</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              {formData.imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border bg-secondary/50">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-background/90 text-xs font-medium flex items-center gap-1.5 hover:bg-background transition-colors"
                  >
                    <Camera size={14} />
                    Trocar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 rounded-xl border-2 border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <ImageIcon size={24} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Clique para adicionar foto</span>
                  <span className="text-xs text-muted-foreground">JPG, PNG — max. 5MB</span>
                </button>
              )}
            </div>
          </div>

          <Separator />

          {/* Custos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <DollarSign size={16} className="text-primary" />
              Custos
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice" className="text-xs font-medium flex items-center gap-1.5">
                  <DollarSign size={12} className="text-muted-foreground" />
                  Preco Compra <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.purchasePrice || ""}
                  onChange={(e) => updateField("purchasePrice", parseFloat(e.target.value) || 0)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freight" className="text-xs font-medium flex items-center gap-1.5">
                  <Truck size={12} className="text-muted-foreground" />
                  Frete
                </Label>
                <Input
                  id="freight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.freight || ""}
                  onChange={(e) => updateField("freight", parseFloat(e.target.value) || 0)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repair" className="text-xs font-medium flex items-center gap-1.5">
                  <Wrench size={12} className="text-muted-foreground" />
                  Conserto
                </Label>
                <Input
                  id="repair"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.repair || ""}
                  onChange={(e) => updateField("repair", parseFloat(e.target.value) || 0)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="others" className="text-xs font-medium flex items-center gap-1.5">
                  <MoreHorizontal size={12} className="text-muted-foreground" />
                  Outros
                </Label>
                <Input
                  id="others"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.others || ""}
                  onChange={(e) => updateField("others", parseFloat(e.target.value) || 0)}
                  className="bg-secondary/50"
                />
              </div>
            </div>

            {/* Resumo de Custos */}
            <Card className="bg-muted/30 border-border/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preco de Compra</span>
                  <span>{formatCurrency(formData.purchasePrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{formatCurrency(formData.freight)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conserto</span>
                  <span>{formatCurrency(formData.repair)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Outros</span>
                  <span>{formatCurrency(formData.others)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-primary">Custo Total</span>
                  <span className="text-primary text-lg">{formatCurrency(formData.totalCost)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Data e Pagamento */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calendar size={16} className="text-primary" />
              Data e Pagamento
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-medium flex items-center gap-1.5">
                  <Calendar size={12} className="text-muted-foreground" />
                  Data <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <CreditCard size={12} className="text-muted-foreground" />
                  Pagamento
                </Label>
                <Select value={formData.paymentMethod} onValueChange={(v) => updateField("paymentMethod", v)}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Origem */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin size={16} className="text-primary" />
              Origem
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Fonte</Label>
                <Select value={formData.source} onValueChange={(v) => updateField("source", v)}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-xs font-medium">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Sao Paulo - SP"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adLink" className="text-xs font-medium flex items-center gap-1.5">
                <LinkIcon size={12} className="text-muted-foreground" />
                Link do Anuncio
              </Label>
              <Input
                id="adLink"
                placeholder="https://..."
                value={formData.adLink}
                onChange={(e) => updateField("adLink", e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-xs font-medium">Observacoes</Label>
              <Textarea
                id="notes"
                placeholder="Anotacoes sobre a compra..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="bg-secondary/50 min-h-[80px] resize-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Check size={16} className="mr-2" />
                Registrar Compra
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
