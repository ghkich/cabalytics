import React from 'react'
import { cls } from '@/lib/utils'

const getClassNameByAttributeName = (name: string) => {
    switch (name) {
        case 'criticalRate':
            return 'text-purple-300 group-hover:text-purple-300'
        case 'criticalDamage':
            return 'text-sky-300 group-hover:text-sky-300'
    }
}

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
        <div className="group flex w-full items-center gap-1 bg-neutral-900 bg-opacity-75 pl-2 text-xs">
            <label htmlFor={name} className="text-neutral-450 w-full whitespace-nowrap group-hover:text-neutral-200">
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
                    className={cls(
                        'bg-neutral-850 w-[78px] px-2 py-1 text-right text-neutral-400 outline-none group-hover:text-neutral-200 [&::-webkit-inner-spin-button]:ml-1',
                        getClassNameByAttributeName(name)
                    )}
                    disabled={disabled}
                    min={min}
                />
            </div>
        </div>
    )
}