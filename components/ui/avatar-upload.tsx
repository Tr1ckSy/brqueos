"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import {
  Camera,
  Upload,
  X,
  Trash2,
  Loader2,
  Check,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AvatarUploadProps {
  currentImage?: string
  fallback: string
  onImageChange?: (file: File | null, preview: string | null) => void
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  disabled?: boolean
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
}

const buttonSizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
}

const iconSizeClasses = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 18,
}

export function AvatarUpload({
  currentImage,
  fallback,
  onImageChange,
  size = "lg",
  className,
  disabled = false,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showCropModal, setShowCropModal] = useState(false)
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [tempFile, setTempFile] = useState<File | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande. Maximo 5MB.")
        return
      }
      if (!file.type.startsWith("image/")) {
        alert("Apenas imagens sao permitidas.")
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempImage(reader.result as string)
        setTempFile(file)
        setShowCropModal(true)
        setZoom(1)
        setRotation(0)
      }
      reader.readAsDataURL(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleConfirm = async () => {
    if (!tempFile || !tempImage) return
    
    setIsUploading(true)
    try {
      // Simular upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      onImageChange?.(tempFile, tempImage)
      setShowCropModal(false)
      setTempImage(null)
      setTempFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onImageChange?.(null, null)
  }

  const handleCancel = () => {
    setShowCropModal(false)
    setTempImage(null)
    setTempFile(null)
    setZoom(1)
    setRotation(0)
  }

  return (
    <>
      <div className={cn("relative group", className)}>
        <Avatar className={cn(
          sizeClasses[size],
          "border-4 border-primary/30 transition-all group-hover:border-primary/50",
          disabled && "opacity-50"
        )}>
          <AvatarImage src={currentImage} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-orange-600 text-primary-foreground font-bold">
            {fallback}
          </AvatarFallback>
        </Avatar>
        
        {!disabled && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all",
              buttonSizeClasses[size],
              "group-hover:scale-110"
            )}
          >
            <Camera size={iconSizeClasses[size]} />
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Modal de Edicao */}
      <Dialog open={showCropModal} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon size={20} className="text-primary" />
              Editar Foto
            </DialogTitle>
            <DialogDescription>
              Ajuste sua foto de perfil
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-border bg-secondary">
                {tempImage && (
                  <img
                    src={tempImage}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Controles */}
            <div className="space-y-4">
              {/* Zoom */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <ZoomIn size={14} />
                    Zoom
                  </label>
                  <span className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
                </div>
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={1}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Rotacao */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(r => r - 90)}
                >
                  <RotateCw size={14} className="mr-1 -scale-x-100" />
                  Girar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(r => r + 90)}
                >
                  <RotateCw size={14} className="mr-1" />
                  Girar
                </Button>
              </div>
            </div>

            {/* Acoes */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-muted-foreground"
              >
                <Upload size={14} className="mr-1" />
                Escolher outra
              </Button>
              
              {currentImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remover foto
                </Button>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isUploading}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={isUploading} className="min-w-[100px]">
              {isUploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Check size={16} className="mr-1" />
                  Salvar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
