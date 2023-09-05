import React from 'react'
import { cls } from '@/lib/utils'
import { BattleStyles } from '@/app/types/battleStyles'

type Props = {
    name: string
    label: string
    items: { value: string; label: string }[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: BattleStyles
    disabled?: boolean
    className?: string
}

export const Select = ({ onChange, name, label, value, items, disabled, className }: Props) => {
    return (
        <div className={cls('flex w-full items-center gap-1 text-xs', className)}>
            <select
                name={name}
                aria-label={label}
                value={value}
                onChange={onChange}
                className="w-full cursor-pointer appearance-none bg-neutral-800 bg-opacity-40 p-2 text-center text-neutral-100 outline-none transition-colors duration-200 hover:bg-opacity-60 hover:text-white"
                disabled={disabled}
            >
                <option value="">{label}</option>
                {items.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
}