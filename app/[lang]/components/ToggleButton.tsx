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
                'bg-neutral-800 bg-opacity-20 px-4 py-1 text-xs leading-normal text-neutral-600 transition-all duration-200 hover:bg-opacity-30 hover:text-neutral-300',
                {
                    ['bg-neutral-800 bg-opacity-50 text-sky-300 hover:bg-opacity-50 hover:text-neutral-50']: active,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}