import React from 'react'
import { cls } from '@/lib/utils'

export type CardProps = {
    className?: string
    children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
    return (
        <div className={cls('space-y-3 bg-neutral-900 p-5 text-[13px]  text-neutral-450', className)}>{children}</div>
    )
}