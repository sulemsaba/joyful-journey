import { cn } from '@/exxonim/utils/cn'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-border-soft bg-surface/88 backdrop-blur-sm shadow-card',
        hover && 'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-accent-glow transition-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}
