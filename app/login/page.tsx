import { LoginForm } from "@/components/auth/login-form"
import { Package2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Login - BriqueOS",
  description: "Acesse sua conta BriqueOS",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }} />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              BriqueOS
            </span>
          </Link>

          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground">
              Gestao inteligente para seu negocio
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Controle total sobre estoque, vendas e financas. Simplifique sua operacao e maximize seus lucros.
            </p>
            
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <span className="text-foreground">Cadastre seus produtos rapidamente</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <span className="text-foreground">Registre compras e vendas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <span className="text-foreground">Acompanhe seus resultados em tempo real</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            2024 BriqueOS. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              BriqueOS
            </span>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
