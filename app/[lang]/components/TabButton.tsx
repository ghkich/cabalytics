import React from 'react'
import { cls } from '@/lib/utils'

export type TabButtonProps = {
    isActive?: boolean
    activeClassName?: string
    onClick?: () => void
    className?: string
    disabled?: boolean
    children: React.ReactNode
}

export function TabButton({ isActive, activeClassName, onClick, className, disabled, children }: TabButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'w-full bg-neutral-875 p-2 text-sm leading-normal text-neutral-450 transition-colors duration-200 hover:bg-neutral-850 hover:text-neutral-400 md:p-1 md:text-xs',
                {
                    [`bg-neutral-825 hover:bg-neutral-825 ${activeClassName} hover:${activeClassName}`]: isActive,
                    ['pointer-events-none select-none opacity-75']: disabled,
                },
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}