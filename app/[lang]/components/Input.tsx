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
        <div className="w-ful flex items-center gap-1 border-b border-white border-opacity-10 text-[10px]">
            <label htmlFor={name} className="w-full whitespace-nowrap text-gray-500">
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
                    className="w-[60px] bg-white bg-opacity-5 px-1 py-0.5 text-right  text-gray-300 outline-none [&::-webkit-inner-spin-button]:ml-1"
                    disabled={disabled}
                    min={min}
                />
            </div>
        </div>
    )
}