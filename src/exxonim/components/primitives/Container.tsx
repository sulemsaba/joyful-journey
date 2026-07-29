import { cn } from '@/exxonim/utils/cn'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1240px] px-4 sm:px-6', className)}>
      {children}
    </div>
  )
}
