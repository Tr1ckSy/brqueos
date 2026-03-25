"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Check,
  Star,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  CreditCard,
  Calendar,
  Shield,
  X,
  Gift,
} from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  period: string
  periodLabel?: string
  features: string[]
  icon: React.ComponentType<{ size?: number; className?: string }>
  popular?: boolean
  current?: boolean
  color: string
  gradient: string
  badge?: string
  badgeColor?: string
}

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
    icon: Gift,
    badge: "7 dias gratis",
    badgeColor: "bg-success text-success-foreground",
    color: "text-success",
    gradient: "from-success/20 to-success/5",
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
    icon: Zap,
    current: true,
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
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
    icon: Crown,
    popular: true,
    badge: "Economize 20%",
    badgeColor: "bg-warning text-warning-foreground",
    color: "text-warning",
    gradient: "from-warning/20 to-warning/5",
  },
]

const comparisons = [
  { feature: "Produtos cadastrados", trial: "Ilimitado", starter: "Ilimitado", pro: "Ilimitado" },
  { feature: "Usuarios", trial: "Ilimitado", starter: "Ilimitado", pro: "Ilimitado" },
  { feature: "Dashboard", trial: "Completo", starter: "Completo", pro: "Avancado" },
  { feature: "Relatorios", trial: "Todos", starter: "Todos", pro: "Personalizados" },
  { feature: "Alertas de estoque", trial: true, starter: true, pro: true },
  { feature: "Exportacao de dados", trial: true, starter: true, pro: true },
  { feature: "Previsao de demanda IA", trial: false, starter: false, pro: true },
  { feature: "Integracao marketplaces", trial: false, starter: true, pro: true },
  { feature: "API de acesso", trial: false, starter: false, pro: true },
  { feature: "Suporte", trial: "Prioritario", starter: "Prioritario", pro: "24/7" },
]

const faqs = [
  {
    question: "O que acontece apos os 7 dias de trial?",
    answer: "Apos o periodo de teste, voce pode escolher um dos planos pagos para continuar usando o sistema. Seus dados serao mantidos por mais 30 dias caso nao escolha um plano.",
  },
  {
    question: "Posso trocar de plano a qualquer momento?",
    answer: "Sim! Voce pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alteracoes serao aplicadas imediatamente e o valor sera ajustado proporcionalmente.",
  },
  {
    question: "Quais formas de pagamento sao aceitas?",
    answer: "Aceitamos cartoes de credito (Visa, Mastercard, Amex), PIX e boleto bancario. O PIX tem aprovacao instantanea.",
  },
  {
    question: "Existe fidelidade ou multa de cancelamento?",
    answer: "Nao! Voce pode cancelar a qualquer momento sem multas. No plano trimestral, o valor nao utilizado pode ser estornado proporcionalmente.",
  },
]

export function PlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleSelectPlan = (plan: Plan) => {
    if (!plan.current) {
      setSelectedPlan(plan)
      setShowPaymentModal(true)
    }
  }

  return (
    <div className="space-y-8">
      {/* Current Plan Banner */}
      <Card className="bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border-primary/30 overflow-hidden relative">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-xl shadow-primary/30">
                <Zap size={28} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-lg">Plano Starter</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Ativo</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Seu plano renova em 15 de Abril de 2024
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CreditCard size={14} className="mr-2" />
                Gerenciar Pagamento
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative bg-card/50 border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
              plan.current && "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10",
              plan.popular && "border-warning/50 ring-2 ring-warning/20 shadow-lg shadow-warning/10"
            )}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge className={cn("shadow-lg", plan.badgeColor)}>
                  <Sparkles size={10} className="mr-1" />
                  {plan.badge}
                </Badge>
              </div>
            )}

            <CardHeader className={cn("pb-4 rounded-t-lg bg-gradient-to-br", plan.gradient)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center shadow-lg">
                  <plan.icon size={24} className={plan.color} />
                </div>
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {plan.current && (
                    <Badge variant="outline" className="text-[9px] mt-1 bg-primary/10 text-primary border-primary/30">
                      Plano Atual
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-black bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
                      Gratis
                    </span>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="text-4xl font-black">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </>
                  )}
                </div>
                {plan.periodLabel && (
                  <p className="text-xs text-muted-foreground mt-1">{plan.periodLabel}</p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", 
                      plan.current ? "bg-primary/20" : plan.popular ? "bg-warning/20" : "bg-success/20"
                    )}>
                      <Check size={12} className={plan.current ? "text-primary" : plan.popular ? "text-warning" : "text-success"} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan)}
                className={cn(
                  "w-full h-12 text-sm font-semibold transition-all",
                  plan.current
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : plan.popular
                    ? "bg-gradient-to-r from-warning to-amber-500 text-warning-foreground hover:opacity-90 shadow-lg shadow-warning/30"
                    : plan.price === 0
                    ? "bg-gradient-to-r from-success to-emerald-500 text-white hover:opacity-90 shadow-lg shadow-success/30"
                    : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                )}
                disabled={plan.current}
              >
                {plan.current ? "Plano Atual" : plan.price === 0 ? "Comecar Trial Gratis" : "Escolher Plano"}
                {!plan.current && <ArrowRight size={16} className="ml-2" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-lg font-semibold">Comparacao de Planos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">
                    Funcionalidade
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-success">
                    <div className="flex flex-col items-center gap-1">
                      <Gift size={16} />
                      Trial
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-primary bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={16} />
                      Starter
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-semibold text-warning">
                    <div className="flex flex-col items-center gap-1">
                      <Crown size={16} />
                      Pro
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.trial === "boolean" ? (
                        row.trial ? (
                          <Check size={18} className="mx-auto text-success" />
                        ) : (
                          <X size={18} className="mx-auto text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.trial}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary/5">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check size={18} className="mx-auto text-primary" />
                        ) : (
                          <X size={18} className="mx-auto text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm font-medium">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check size={18} className="mx-auto text-warning" />
                        ) : (
                          <X size={18} className="mx-auto text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm font-medium">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-sm mb-2 flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{idx + 1}</span>
                </span>
                {faq.question}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPlan && (
                <>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                    selectedPlan.price === 0 ? "bg-success/15" : selectedPlan.popular ? "bg-warning/15" : "bg-primary/15"
                  )}>
                    <selectedPlan.icon size={20} className={selectedPlan.color} />
                  </div>
                  <span>Assinar {selectedPlan.name}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan?.price === 0 
                ? "Comece seu trial de 7 dias gratuitamente" 
                : `R$ ${selectedPlan?.price}${selectedPlan?.period}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedPlan?.price === 0 ? (
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <Gift size={20} className="text-success" />
                  <span className="font-semibold text-sm">7 dias gratis</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Voce tera acesso a todas as funcionalidades sem precisar de cartao de credito.
                </p>
              </div>
            ) : (
              <>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Numero do cartao</FieldLabel>
                    <Input placeholder="0000 0000 0000 0000" />
                  </Field>
                </FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Validade</FieldLabel>
                      <Input placeholder="MM/AA" />
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>CVV</FieldLabel>
                      <Input placeholder="123" />
                    </Field>
                  </FieldGroup>
                </div>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Nome no cartao</FieldLabel>
                    <Input placeholder="Nome completo" />
                  </Field>
                </FieldGroup>
              </>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield size={14} className="text-success" />
              <span>Pagamento seguro com criptografia SSL</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => setShowPaymentModal(false)}
              className={cn(
                selectedPlan?.price === 0 
                  ? "bg-success hover:bg-success/90" 
                  : selectedPlan?.popular 
                    ? "bg-warning hover:bg-warning/90 text-warning-foreground" 
                    : "bg-primary hover:bg-primary/90"
              )}
            >
              {selectedPlan?.price === 0 ? "Comecar Trial" : "Confirmar Pagamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
