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
                'w-full bg-neutral-800 bg-opacity-10 p-1 text-xs leading-normal text-neutral-600 transition-all duration-200 hover:bg-opacity-30 hover:text-neutral-300',
                {
                    ['bg-neutral-800 bg-opacity-50 text-neutral-200 hover:bg-opacity-50']: active,
                }
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}