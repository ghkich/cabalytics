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
            className="bg-neutral-875 hover:bg-neutral-825 relative flex h-12 w-[66px] shrink-0 items-center justify-center overflow-hidden transition-colors duration-200 active:bg-neutral-900"
        >
            <div className="absolute h-8 w-8 rounded-full bg-neutral-100 bg-opacity-5 blur"></div>
            {battleStyles.map((battleStyle) => {
                return (
                    <Image
                        key={`${battleStyle.type}-${selectedBattleStyleType}`}
                        src={battleStyle.icon}
                        alt={battleStyle.description}
                        loading="eager"
                        className={cls('animate-spin-selection absolute opacity-0', {
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