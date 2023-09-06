'use client'
import React, { useEffect, useState } from 'react'
import { TabButton } from '@/app/[lang]/components/TabButton'
import { skills } from '@/app/types/skills'
import { SkillDamageItem } from '@/app/[lang]/components/SkillDamageItem'
import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAxeBattle, faCardsBlank, faSwords } from '@fortawesome/pro-duotone-svg-icons'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { DamageNumber } from '@/app/[lang]/components/DamageNumber'
import { cls } from '@/lib/utils'
import useTranslation from '@/lib/useTranslation'

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
        className: 'text-sky-400',
    },
    {
        id: 'bm3',
        label: 'BM3',
        icon: faSwords,
        className: 'text-red-400',
    },
]

export const DamageResult = () => {
    const { t } = useTranslation()
    const { attacker, skillsDamage } = useDamageCalculator()
    const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
    const [comboActive, setComboActive] = useState(true)

    const selectedSkillsDamage = React.useMemo(() => {
        if (!selectedSkillIds.length || !skillsDamage)
            return { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        return Object.entries(skillsDamage).reduce(
            (acc, [skillId, damage]) => {
                if (selectedSkillIds.includes(skillId)) {
                    acc.normal += damage.normal
                    acc.average += damage.average
                    acc.critical += damage.critical
                    acc.averageDps += damage.averageDps / selectedSkillIds.length
                    acc.averageDpsCombo += damage.averageDpsCombo / selectedSkillIds.length
                }
                return acc
            },
            { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        )
    }, [skillsDamage, selectedSkillIds])

    useEffect(() => {
        setSelectedSkillIds([])
    }, [attacker?.battleStyle])

    const handleSelectSkill = React.useCallback((skillId: string) => {
        setSelectedSkillIds((selectedIds) => {
            if (selectedIds.includes(skillId)) return selectedIds.filter((selectedId) => selectedId !== skillId)
            return [...selectedIds, skillId]
        })
    }, [])

    return (
        <div className="flex w-full flex-col gap-0.5">
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
            <div className="bg-neutral-910 flex w-full p-4">
                <div className="flex w-full items-center gap-3">
                    <ToggleButton active={comboActive} onClick={() => setComboActive((prev) => !prev)}>
                        Combo {comboActive ? 'On' : 'Off'}
                    </ToggleButton>
                    <div className="text-neutral-450 flex items-center gap-1 text-xs">
                        <span className={cls('text-neutral-300', { ['text-emerald-300']: comboActive })}>
                            {selectedSkillIds.length}
                        </span>{' '}
                        skills
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <DamageNumber
                        header={t('damage.average_dps')}
                        value={
                            comboActive
                                ? selectedSkillsDamage.averageDpsCombo.toFixed()
                                : selectedSkillsDamage.averageDps.toFixed()
                        }
                        className="text-purple-300"
                    />
                    <DamageNumber
                        header={t('damage.average')}
                        value={selectedSkillsDamage.average.toFixed()}
                        className="text-purple-400"
                    />
                    <DamageNumber
                        header={t('damage.normal')}
                        value={selectedSkillsDamage.normal.toFixed()}
                        className="text-orange-300"
                    />
                    <DamageNumber
                        header={t('damage.critical')}
                        value={selectedSkillsDamage.critical.toFixed()}
                        className="text-sky-400"
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