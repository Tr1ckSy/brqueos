"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvatarUpload } from "@/components/ui/avatar-upload"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Star,
  Trophy,
  Calendar,
  Target,
} from "lucide-react"

export function ProfileSection() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

  const handleAvatarChange = (file: File | null, preview: string | null) => {
    setAvatarImage(preview)
    if (file) {
      console.log("[v0] Foto de perfil atualizada:", file.name)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <AvatarUpload
              currentImage={avatarImage || undefined}
              fallback="MS"
              size="xl"
              onImageChange={handleAvatarChange}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl font-extrabold">Marco Silva</h2>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Star size={10} className="mr-1" />
                  Nível 3
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">marco.silva@email.com</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>Membro desde Mar 2024</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target size={12} />
                  <span>R$ 12.850 de lucro total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy size={12} />
                  <span>4 conquistas</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <User size={14} className="mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bell size={14} className="mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield size={14} className="mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Personal Info */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs">Nome</Label>
                  <Input id="firstName" defaultValue="Marco" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs">Sobrenome</Label>
                  <Input id="lastName" defaultValue="Silva" className="bg-secondary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" defaultValue="marco.silva@email.com" className="pl-9 bg-secondary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs">Telefone</Label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" defaultValue="(11) 99999-9999" className="pl-9 bg-secondary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs">Endereço</Label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="address" defaultValue="São Paulo, SP" className="pl-9 bg-secondary/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Info */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Informações do Negócio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-xs">Nome do Negócio</Label>
                <Input id="businessName" defaultValue="MS Tech Store" className="bg-secondary/50" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-xs">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-99" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segment" className="text-xs">Segmento</Label>
                  <Input id="segment" defaultValue="Eletrônicos" className="bg-secondary/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90">
              <Save size={14} className="mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Notificações por Email</Label>
                  <p className="text-xs text-muted-foreground">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Notificações Push</Label>
                  <p className="text-xs text-muted-foreground">
                    Alertas em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Relatório Semanal</Label>
                  <p className="text-xs text-muted-foreground">
                    Resumo semanal de vendas e lucros
                  </p>
                </div>
                <Switch
                  checked={weeklyReport}
                  onCheckedChange={setWeeklyReport}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Alertas Automáticos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Bell size={14} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estoque Baixo</p>
                    <p className="text-xs text-muted-foreground">Quando produtos atingirem estoque mínimo</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <Bell size={14} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nova Venda</p>
                    <p className="text-xs text-muted-foreground">Quando uma venda for realizada</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Meta Atingida</p>
                    <p className="text-xs text-muted-foreground">Quando atingir metas mensais</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-xs">Senha Atual</Label>
                <Input id="currentPassword" type="password" className="bg-secondary/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-xs">Nova Senha</Label>
                <Input id="newPassword" type="password" className="bg-secondary/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs">Confirmar Nova Senha</Label>
                <Input id="confirmPassword" type="password" className="bg-secondary/50" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Sessões Ativas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <Globe size={14} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Chrome - Windows</p>
                    <p className="text-xs text-muted-foreground">São Paulo, SP - Agora</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/30">
                  Atual
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Globe size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Safari - iPhone</p>
                    <p className="text-xs text-muted-foreground">São Paulo, SP - 2h atrás</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                  Encerrar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-destructive">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                Ao excluir sua conta, todos os dados serão permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
              <Button variant="destructive" size="sm">
                Excluir Minha Conta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
