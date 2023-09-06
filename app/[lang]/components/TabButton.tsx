import React from 'react'
import { cls } from '@/lib/utils'

export type ButtonProps = {
    active?: boolean
    onClick?: () => void
    children: React.ReactNode
}

export function TabButton({ active, onClick, children }: ButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'hover:bg-neutral-850 bg-neutral-875 text-neutral-450 w-full p-1 text-xs leading-normal transition-colors duration-200 hover:text-neutral-200',
                {
                    ['bg-neutral-825 hover:bg-neutral-825 text-neutral-300 hover:text-neutral-200']: active,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}