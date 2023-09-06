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
                className="bg-neutral-850 hover:bg-neutral-825 w-full cursor-pointer appearance-none p-2 text-center text-neutral-300 outline-none transition-colors duration-200 hover:text-neutral-200"
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