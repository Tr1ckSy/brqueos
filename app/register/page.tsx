"use client"

import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.2),transparent_50%)]" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-6 h-6 text-primary-foreground"
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-heading text-2xl font-bold">BriqueOS</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-balance">
              Comece sua jornada hoje
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
              Crie sua conta gratuita e descubra como o BriqueOS pode transformar 
              a gestao do seu negocio.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Configuracao em menos de 5 minutos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Sem necessidade de cartao de credito</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Suporte dedicado 24 horas</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <span>Gratuito</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
            <span>Seguro</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </div>
      
      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-6 h-6 text-primary-foreground"
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">BriqueOS</span>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </main>
  )
}
