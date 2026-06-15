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
        'rounded-[22px] border border-border-soft bg-surface/88',
        hover && 'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30',
        className
      )}
    >
      {children}
    </div>
  )
}
