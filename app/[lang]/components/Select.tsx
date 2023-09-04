import React from 'react'

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
        <div
            className={`flex w-full items-center gap-1 border-b border-white border-opacity-10 text-[10px] ${className}`}
        >
            <select
                name={name}
                aria-label={label}
                value={value}
                onChange={onChange}
                className="w-full bg-white bg-opacity-5 px-1 py-0.5  text-gray-300 outline-none"
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