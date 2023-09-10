import { cls } from '@/lib/utils'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripDots } from '@fortawesome/sharp-solid-svg-icons'

type Props = {
    header?: string
    value?: string
    loading?: boolean
    className?: string
}

export const DamageDisplay = ({ header, value, loading, className }: Props) => {
    const loadingOrValue =
        value === undefined || loading ? (
            <FontAwesomeIcon icon={faGripDots} className="animate-pulse text-[10px]" />
        ) : (
            value
        )
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
                {loadingOrValue}
            </div>
        </div>
    )
}