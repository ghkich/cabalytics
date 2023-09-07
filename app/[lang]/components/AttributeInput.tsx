import React from 'react'
import { cls } from '@/lib/utils'
import { RangeSlider } from '@/app/[lang]/components/RangeSlider/RangeSlider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/sharp-solid-svg-icons'

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
    const handleChange = (e?: React.ChangeEvent<HTMLInputElement>, delta?: number) => {
        let newValue: number

        // If there's an event object, it means it's a direct change from the slider
        if (e) {
            newValue = Number(e.target.value)
        } else if (typeof delta === 'number') {
            // Otherwise, adjust based on the delta
            newValue = Number(value) + delta
        } else {
            return // Exit if neither conditions are met
        }

        // Check if the new value is within the acceptable range
        if (newValue >= min && newValue <= max) {
            const targetObj = e ? { ...e.target, name, value: newValue } : { name, value: newValue }
            const syntheticEvent = {
                ...e,
                target: targetObj,
            } as unknown as React.ChangeEvent<HTMLInputElement>
            onChange(syntheticEvent)
        }
    }

    return (
        <div className="group relative flex w-full flex-col items-center gap-1 bg-neutral-900 pl-2 text-xs transition-all duration-200 hover:py-2.5">
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
                        onChange={handleChange}
                        className={cls(
                            'w-[75px] bg-transparent py-1 pr-2 text-right text-neutral-400 outline-none transition-all duration-200 group-hover:pr-6 group-hover:text-sm group-hover:text-neutral-200',
                            getClassNameByAttributeName(name)
                        )}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="bg-neutral-850 absolute right-0 top-0 z-10 flex h-6 w-5 items-center justify-center text-neutral-200 opacity-0 transition-all duration-200 group-hover:opacity-100"
                        onClick={() => handleChange(undefined, 1)}
                    >
                        <FontAwesomeIcon icon={faCaretUp} />
                    </button>
                    <button
                        type="button"
                        className="bg-neutral-850 absolute bottom-0 right-0 z-10 flex h-6 w-5 items-center justify-center text-neutral-200 opacity-0 transition-all duration-200 group-hover:opacity-100"
                        onClick={() => handleChange(undefined, -1)}
                    >
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-1 right-20 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <RangeSlider
                    id={`${name}-slider`}
                    name={`${name}-slider`}
                    min={min}
                    max={max}
                    value={value || 0}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}