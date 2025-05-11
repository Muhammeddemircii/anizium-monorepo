import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "premium" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  className?: string
}

export function AnimatedButton({
  variant = "default",
  size = "default",
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        size={size}
        variant={variant === "premium" ? "default" : variant}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variant === "premium" && "bg-gradient-to-r from-primary-red to-primary hover:from-primary hover:to-primary-red",
          className
        )}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ x: "100%", opacity: 0 }}
          whileHover={{ x: "-100%", opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
        {children}
      </Button>
    </motion.div>
  )
} 