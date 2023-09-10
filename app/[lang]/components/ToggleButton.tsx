import React from 'react'
import { cls } from '@/lib/utils'

export type ButtonProps = {
    isActive?: boolean
    activeColor?: string
    onClick: () => void
    children: React.ReactNode
    className?: string
}

export function ToggleButton({ isActive, activeColor, onClick, className, children }: ButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'bg-neutral-850 text-neutral-450 whitespace-nowrap border border-neutral-800 px-4 py-1.5 text-xs transition-colors duration-200 hover:text-neutral-300',
                {
                    [`bg-neutral-825 border-neutral-100 border-opacity-5 ${activeColor} hover:${activeColor}`]:
                        isActive,
                },
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}