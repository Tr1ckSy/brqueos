import { RegisterForm } from "@/components/auth/register-form"
import { Package2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Criar Conta - BriqueOS",
  description: "Crie sua conta gratuita no BriqueOS",
}

export default function RegisterPage() {
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
              Comece a gerenciar seu negocio hoje
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Junte-se a milhares de empreendedores que ja transformaram a gestao de seus negocios.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Gratuito para comecar</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Acesso em qualquer lugar</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-2xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">Para configurar</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="text-2xl font-bold text-success">+30%</div>
                <div className="text-sm text-muted-foreground">Aumento em lucros</div>
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

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
