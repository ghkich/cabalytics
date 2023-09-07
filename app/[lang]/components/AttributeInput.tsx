import React from 'react'
import { cls } from '@/lib/utils'
import { RangeSlider } from '@/app/[lang]/components/RangeSlider/RangeSlider'

const getClassNameByAttributeName = (name: string) => {
    switch (name) {
        case 'criticalRate':
            return 'text-purple-300 group-hover:text-purple-300'
        case 'criticalDamage':
            return 'text-sky-300 group-hover:text-sky-300'
    }
}

type Props = {
    name: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number
    min: number
    max: number
}

export const AttributeInput = ({ onChange, name, label, value, min, max }: Props) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const syntheticEvent = {
            ...e,
            target: { ...e.target, name, value: e.target.value },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
    }

    return (
        <div className="group relative flex w-full flex-col items-center gap-1 overflow-hidden bg-neutral-900 pl-2 text-xs transition-all duration-200 hover:py-2">
            <div className="flex w-full items-center gap-1">
                <label
                    htmlFor={name}
                    className="text-neutral-450 w-full whitespace-nowrap group-hover:text-neutral-200"
                >
                    {label}
                </label>
                <div>
                    <input
                        id={name}
                        type="text"
                        name={name}
                        aria-label={label}
                        value={value}
                        onChange={onChange}
                        className={cls(
                            'w-[78px] bg-transparent px-2 py-1 text-right text-neutral-400 outline-none group-hover:text-neutral-200',
                            getClassNameByAttributeName(name)
                        )}
                        min={min}
                    />
                </div>
            </div>
            <div className="absolute left-2 right-14 h-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <RangeSlider
                    id={`${name}-slider`}
                    name={`${name}-slider`}
                    min={min}
                    max={max}
                    value={value || 0}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    )
}