import React from 'react'
import Image from 'next/image'
import { cls } from '@/lib/utils'
import { BattleStyle, BattleStyleTypes } from '@/app/data/battleStyles'

type BattleStyleSelectorProps = {
    battleStyles: BattleStyle[]
    selectedBattleStyleType: BattleStyleTypes
    onClick: () => void
}

const BattleStyleSelectorTrigger: React.FC<BattleStyleSelectorProps> = ({
    battleStyles,
    selectedBattleStyleType,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="relative flex h-16 w-[98px] shrink-0 items-center justify-center overflow-hidden bg-neutral-875 transition-colors duration-200 hover:bg-neutral-825 active:bg-neutral-900 md:h-12 md:w-[66px]"
        >
            {battleStyles.map((battleStyle) => {
                return (
                    <Image
                        key={`${battleStyle.type}-${selectedBattleStyleType}`}
                        src={battleStyle.icon}
                        alt={battleStyle.description}
                        loading="eager"
                        className={cls('absolute w-[45px] animate-spin-selection opacity-0 md:w-[32px]', {
                            'opacity-100': selectedBattleStyleType === battleStyle.type,
                        })}
                        width={32}
                    />
                )
            })}
        </button>
    )
}

export default BattleStyleSelectorTrigger