import { cls } from '@/lib/utils'
import React from 'react'

type Props = {
    header?: string
    value: string
    className?: string
}

export const DamageNumber = ({ header, value, className }: Props) => {
    return (
        <div
            className={cls(
                'flex min-w-[50px] flex-col items-center font-light leading-normal text-neutral-400',
                className
            )}
        >
            {header && <div className="whitespace-nowrap text-[9px] text-neutral-600">{header}</div>}
            <div className="text-sm font-normal">{value}</div>
        </div>
    )
}