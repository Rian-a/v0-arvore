"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, Search, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "warning" | "info"

interface FeedbackToastProps {
  message: string
  type: ToastType
  isVisible: boolean
  onClose: () => void
}

export function FeedbackToast({ message, type, isVisible, onClose }: FeedbackToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <XCircle className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "info":
        return <Search className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-emerald-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-amber-500 text-white"
      case "info":
        return "bg-sky-500 text-white"
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg",
        "animate-in slide-in-from-bottom-4 fade-in duration-300",
        getStyles()
      )}
    >
      {getIcon()}
      <span className="font-medium">{message}</span>
    </div>
  )
}
