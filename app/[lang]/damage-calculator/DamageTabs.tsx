'use client'
import React from 'react'
import { TabButton } from '@/app/[lang]/components/TabButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAxeBattle, faCardsBlank, faSwords } from '@fortawesome/pro-duotone-svg-icons'
import { cls } from '@/lib/utils'
import SkillsDamageTab from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageTab'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'

const damageTabs = [
    {
        id: 'skills',
        label: 'Skills',
        icon: faCardsBlank,
        className: 'text-emerald-400',
    },
    {
        id: 'bm2',
        label: 'BM2',
        icon: faAxeBattle,
        className: 'text-neutral-500',
        disabled: true,
    },
    {
        id: 'bm3',
        label: 'BM3',
        icon: faSwords,
        className: 'text-neutral-500',
        disabled: true,
    },
]

export const DamageTabs = () => {
    const { selectedAttackerBuild } = useCharacterBuilds()

    return (
        <div
            className={cls('flex w-full flex-col gap-0.5 @container', {
                ['pointer-events-none select-none opacity-50 grayscale']: !selectedAttackerBuild?.data.battleStyleType,
            })}
        >
            <div className="flex w-full gap-0.5">
                {damageTabs.map((mode) => (
                    <TabButton key={mode.id} isActive={mode.id === 'skills'} disabled={mode.disabled}>
                        <div className=" p-2.5 uppercase">
                            <FontAwesomeIcon icon={mode.icon} className={cls('mr-2 text-sm', mode.className)} />
                            <span>{mode.label}</span>
                        </div>
                    </TabButton>
                ))}
            </div>
            <SkillsDamageTab />
        </div>
    )
}