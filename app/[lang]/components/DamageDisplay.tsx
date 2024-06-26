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
    const undefinedOrLoading = value === undefined || loading
    const loaderOrValue = undefinedOrLoading ? (
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
            {header && <div className="whitespace-nowrap text-[11px] text-neutral-600 md:text-[9px]">{header}</div>}
            <div
                className={cls(`text-[16px] font-normal md:text-sm`, {
                    'animate-pulse': undefinedOrLoading,
                })}
            >
                {loaderOrValue}
            </div>
        </div>
    )
}