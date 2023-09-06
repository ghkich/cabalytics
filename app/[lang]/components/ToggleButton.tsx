import React from 'react'
import { cls } from '@/lib/utils'

export type ButtonProps = {
    active?: boolean
    onClick?: () => void
    children: React.ReactNode
}

export function ToggleButton({ active, onClick, children }: ButtonProps) {
    return (
        <button
            type="button"
            className={cls(
                'bg-neutral-850 text-neutral-450 border border-neutral-800 px-4 py-1.5 text-xs transition-colors duration-200 hover:text-neutral-300',
                {
                    ['bg-neutral-825 border-emerald-100 border-opacity-5 text-emerald-300 hover:text-emerald-200']:
                        active,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}