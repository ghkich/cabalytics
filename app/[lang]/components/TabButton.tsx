import React from 'react'
import { cls, getTwColorClassNameByAccent } from '@/lib/utils'

export type ButtonProps = {
    active?: boolean
    accentColor?: 'emerald' | 'red'
    onClick?: () => void
    children: React.ReactNode
}

export function TabButton({ active, accentColor, onClick, children }: ButtonProps) {
    const colorClassName = getTwColorClassNameByAccent(accentColor)
    return (
        <button
            type="button"
            className={cls(
                'hover:bg-neutral-850 bg-neutral-875 text-neutral-450 w-full p-1 text-xs leading-normal transition-colors duration-200 hover:text-neutral-400',
                {
                    [`bg-neutral-825 hover:bg-neutral-825 ${colorClassName} hover:${colorClassName}`]: active,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}