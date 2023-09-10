import React from 'react'
import { cls } from '@/lib/utils'

export type TabButtonProps = {
    isActive?: boolean
    activeColor?: string
    onClick?: () => void
    className?: string
    children: React.ReactNode
}

export function TabButton({ isActive, activeColor, onClick, className, children }: TabButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'hover:bg-neutral-850 bg-neutral-875 text-neutral-450 w-full p-1 text-xs leading-normal transition-colors duration-200 hover:text-neutral-400',
                {
                    [`bg-neutral-825 hover:bg-neutral-825 ${activeColor} hover:${activeColor}`]: isActive,
                },
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}