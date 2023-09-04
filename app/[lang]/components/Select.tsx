import React from 'react'
import { cls } from '@/lib/utils'

type Props = {
    name: string
    label: string
    items: { value: string; label: string }[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: number
    disabled?: boolean
    className?: string
}

export const Select = ({ onChange, name, label, value, items, disabled, className }: Props) => {
    return (
        <div className={cls('flex w-full items-center gap-1 text-[10px]', className)}>
            <select
                name={name}
                aria-label={label}
                value={value}
                onChange={onChange}
                className="w-full border border-neutral-900 bg-neutral-950 bg-opacity-50 p-1.5 text-neutral-400 outline-none"
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