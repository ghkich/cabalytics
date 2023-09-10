import React from 'react'
import { cls } from '@/lib/utils'
import Image from 'next/image'
import { BattleStyle, BattleStyleTypes } from '@/app/data/battleStyles'

type BattleStyleSelectorProps = {
    battleStyles: BattleStyle[]
    selectedBattleStyleType?: BattleStyleTypes
    activeColor: string
    isOpen: boolean
    onChange: (type: BattleStyleTypes) => void
}

const BattleStyleSelector: React.FC<BattleStyleSelectorProps> = ({
    battleStyles,
    selectedBattleStyleType,
    activeColor,
    onChange,
    isOpen,
}) => {
    return (
        <div
            className={cls('transition-max-height max-h-0 overflow-hidden duration-300 ease-in-out', {
                'max-h-[120px]': isOpen,
            })}
        >
            <div className="grid grid-cols-3 gap-x-0.5">
                {battleStyles.map((battleStyle) => (
                    <button
                        type="button"
                        key={`select-battle-style-${battleStyle.type}`}
                        className={cls(
                            'hover:bg-neutral-825 bg-neutral-875 mt-0.5 flex cursor-pointer flex-col items-center justify-center gap-1 px-0.5 py-2  text-neutral-400 transition-all duration-200 hover:opacity-100',
                            {
                                [`bg-neutral-825 ${activeColor} opacity-100`]:
                                    selectedBattleStyleType === battleStyle.type,
                            }
                        )}
                        onClick={() => onChange(battleStyle.type)}
                    >
                        <div className="flex items-center gap-2">
                            <Image
                                src={battleStyle.icon}
                                alt={battleStyle.description}
                                className="opacity-90 transition-all duration-200"
                                width={20}
                            />
                            <div className="text-xs">{battleStyle.acronym}</div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-0.5 h-1 w-full bg-neutral-900"></div>
        </div>
    )
}

export default BattleStyleSelector