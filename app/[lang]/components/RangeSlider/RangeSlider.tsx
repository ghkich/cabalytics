import React from 'react'
import styles from './styles.module.css'
import { cls } from '@/lib/utils'

type Props = {
    id: string
    name: string
    min: number
    max: number
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RangeSlider = ({ id, name, min, max, value, onChange }: Props) => {
    return (
        <div className={cls(styles.container)}>
            <input
                className="absolute w-full"
                type="range"
                id={id}
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                step={1}
            />
        </div>
    )
}