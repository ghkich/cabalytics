import React from 'react'
import { cls } from '@/lib/utils'

export type TextCardProps = {
    title?: string
    titleClassName?: string
    className?: string
    children?: React.ReactNode
}

export function TextCard({ title, titleClassName, className, children }: TextCardProps) {
    return (
        <div className={cls('flex w-full flex-col gap-0.5', className)}>
            {title && (
                <h2
                    className={cls('bg-neutral-875 p-2 text-center text-xs uppercase text-neutral-500', titleClassName)}
                >
                    {title}
                </h2>
            )}
            {children && (
                <div className={cls('space-y-2 bg-neutral-910 p-4 text-[13px] text-neutral-400')}>{children}</div>
            )}
        </div>
    )
}