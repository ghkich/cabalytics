import { cls } from '@/lib/utils'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/sharp-light-svg-icons'

type Props = {
    header?: string
    value?: string
    loading?: boolean
    className?: string
}

export const DamageNumber = ({ header, value, loading, className }: Props) => {
    const placeholderOrValue =
        value === undefined ? <FontAwesomeIcon icon={faSpinnerThird} className="text-xs" spin /> : value
    return (
        <div
            className={cls(
                'flex min-w-[50px] flex-col items-center font-light leading-normal text-neutral-400',
                className
            )}
        >
            {header && <div className="whitespace-nowrap text-[9px] text-neutral-600">{header}</div>}
            <div
                className={cls(`text-sm font-normal`, {
                    'animate-pulse': value === undefined || loading,
                })}
            >
                {placeholderOrValue}
            </div>
        </div>
    )
}