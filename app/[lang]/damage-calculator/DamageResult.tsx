'use client'
import React, { useState } from 'react'
import { TabButton } from '@/app/[lang]/components/TabButton'
import { cls } from '@/lib/utils'
import { skills } from '@/app/types/skills'
import { SkillDamageItem } from '@/app/[lang]/components/SkillDamageItem'
import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAxeBattle, faCardsBlank, faSwords } from '@fortawesome/pro-duotone-svg-icons'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

const damageTabs = [
    {
        id: 'skills',
        label: 'Skills',
        icon: faCardsBlank,
    },
    {
        id: 'bm2',
        label: 'BM2',
        icon: faAxeBattle,
    },
    {
        id: 'bm3',
        label: 'BM3',
        icon: faSwords,
    },
]

type Props = {
    normal: string
    average: string
    critical: string
    header?: string
    className?: string
}
export const DamageNumbers = ({ normal, average, critical, header, className }: Props) => {
    return (
        <div className={cls('flex w-[80px] flex-col items-center font-light leading-snug', className)}>
            {header && <div className="text-[11px] text-neutral-500">{header}</div>}
            <div>
                <div className="flex gap-1 text-sm">
                    <div className="text-amber-400">{normal}</div>
                    <div className="opacity-20">/</div>
                    <div className="text-blue-400">{critical}</div>
                </div>
            </div>
            <div className="text-[11px] text-neutral-500" title="Average">
                {average}
            </div>
        </div>
    )
}
export const DamageResult = () => {
    const { attacker, skillsDamage } = useDamageCalculator()
    const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
    const [comboActive, setComboActive] = useState(false)

    const selectedSkillsDamage = React.useMemo(() => {
        if (!selectedSkillIds.length || !skillsDamage) return { normal: 0, average: 0, critical: 0 }
        return Object.entries(skillsDamage).reduce(
            (acc, [skillId, damage]) => {
                if (selectedSkillIds.includes(skillId)) {
                    acc.normal += damage.normal
                    acc.average += damage.average
                    acc.critical += damage.critical
                }
                return acc
            },
            { normal: 0, average: 0, critical: 0 }
        )
    }, [skillsDamage, selectedSkillIds])

    const handleSelectSkill = React.useCallback((skillId: string) => {
        setSelectedSkillIds((selectedIds) => {
            if (selectedIds.includes(skillId)) return selectedIds.filter((selectedId) => selectedId !== skillId)
            return [...selectedIds, skillId]
        })
    }, [])

    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full gap-0.5">
                {damageTabs.map((mode) => (
                    <TabButton key={mode.id} active={mode.id === 'skills'}>
                        <div className="p-2.5 uppercase">
                            <FontAwesomeIcon icon={mode.icon} className="mr-3" />
                            <span>{mode.label}</span>
                        </div>
                    </TabButton>
                ))}
            </div>
            <div className="my-0.5 flex w-full bg-neutral-800 bg-opacity-30 p-4">
                <div className="flex w-full items-center gap-3">
                    <ToggleButton active={comboActive} onClick={() => setComboActive((prev) => !prev)}>
                        Combo {comboActive ? 'On' : 'Off'}
                    </ToggleButton>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                        {selectedSkillIds.length} skills
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <DamageNumbers normal={'0'} average={'0'} critical={'0'} header="DPS" />
                    <DamageNumbers
                        normal={selectedSkillsDamage.normal.toFixed()}
                        average={selectedSkillsDamage.average.toFixed()}
                        critical={selectedSkillsDamage.critical.toFixed()}
                        header="Final"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col gap-0.5 bg-neutral-800 bg-opacity-10">
                {attacker?.battleStyle &&
                    skills[attacker.battleStyle]?.map((skill) => (
                        <SkillDamageItem
                            key={skill.id}
                            skill={skill}
                            onClick={handleSelectSkill}
                            selected={selectedSkillIds.includes(skill.id)}
                        />
                    ))}
            </div>
        </div>
    )
}