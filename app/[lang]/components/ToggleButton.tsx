import React from 'react'
import { cls } from '@/lib/utils'

export type ButtonProps = {
    isActive?: boolean
    activeClassName?: string
    onClick: () => void
    children: React.ReactNode
    className?: string
}

export function ToggleButton({ isActive, activeClassName, onClick, className, children }: ButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'whitespace-nowrap border border-neutral-800 bg-neutral-850 px-4 py-2.5 text-[12px] text-neutral-450 transition-colors duration-200 hover:text-neutral-300 md:py-1.5',
                {
                    [`border-neutral-100 border-opacity-5 bg-neutral-825 ${activeClassName} hover:${activeClassName}`]:
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