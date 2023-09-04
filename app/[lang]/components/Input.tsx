import React from 'react'

type Props = {
    type?: string
    name: string
    label: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number
    disabled?: boolean
    min?: number
}

export const Input = ({ onChange, name, label, placeholder, value, type, disabled, min }: Props) => {
    return (
        <div className="group flex w-full items-center gap-1 text-xs">
            <label htmlFor={name} className="w-full whitespace-nowrap text-neutral-500 group-hover:text-neutral-200">
                {label}
            </label>
            <div>
                <input
                    id={name}
                    type={type}
                    name={name}
                    aria-label={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-[80px] bg-neutral-800 bg-opacity-30 px-2 py-1 text-right text-neutral-500 outline-none group-hover:bg-opacity-50 group-hover:text-neutral-200 [&::-webkit-inner-spin-button]:ml-1"
                    disabled={disabled}
                    min={min}
                />
            </div>
        </div>
    )
}