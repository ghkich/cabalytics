'use client'
import React from 'react'
import { TabButton } from '@/app/[lang]/components/TabButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAxeBattle, faCardsBlank, faSwords } from '@fortawesome/pro-duotone-svg-icons'
import { cls } from '@/lib/utils'
import SkillsDamageTab from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageTab'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

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
    },
    {
        id: 'bm3',
        label: 'BM3',
        icon: faSwords,
        className: 'text-neutral-500',
    },
]

export const DamageTabs = () => {
    const { attacker } = useDamageCalculator()
    return (
        <div
            className={cls('@container flex w-full flex-col gap-0.5', {
                ['pointer-events-none select-none opacity-50 grayscale']: !attacker,
            })}
        >
            <div className="flex w-full gap-0.5">
                {damageTabs.map((mode) => (
                    <TabButton key={mode.id} active={mode.id === 'skills'}>
                        <div className="p-2.5 uppercase">
                            <FontAwesomeIcon icon={mode.icon} className={cls('mr-3 text-sm', mode.className)} />
                            <span>{mode.label}</span>
                        </div>
                    </TabButton>
                ))}
            </div>
            <SkillsDamageTab />
        </div>
    )
}