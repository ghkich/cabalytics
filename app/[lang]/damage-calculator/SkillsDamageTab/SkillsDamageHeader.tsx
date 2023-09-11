import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { cls } from '@/lib/utils'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import React from 'react'
import useTranslation from '@/lib/useTranslation'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { battleStyleSkills } from '@/app/data/skills'

type Props = {
    selectedSkills: string[]
    skillsDamage?: Record<
        string,
        {
            normal: number
            average: number
            critical: number
            averageDps: number
            averageDpsCombo: number
        }
    >
    isComboActive: boolean
    isCalculating: boolean
    onToggleCombo: () => void
}

export const SkillsDamageHeader = ({
    selectedSkills,
    skillsDamage,
    isComboActive,
    isCalculating,
    onToggleCombo,
}: Props) => {
    const { t } = useTranslation()
    const { selectedAttackerBuild } = useCharacterBuilds()

    const attackerBattleStyle = selectedAttackerBuild?.data.battleStyleType
    const sameBattleStyleSkills = React.useMemo(() => {
        if (!attackerBattleStyle) return []
        return battleStyleSkills[attackerBattleStyle].filter((skill) => selectedSkills.includes(skill.id))
    }, [attackerBattleStyle, selectedSkills])

    const skillsDamageTotal = React.useMemo(() => {
        return sameBattleStyleSkills.reduce(
            (acc, { id: skillId }) => {
                const skillDamage = skillsDamage?.[skillId]
                if (!skillDamage) return acc
                acc.normal += skillDamage.normal
                acc.average += skillDamage.average
                acc.critical += skillDamage.critical
                acc.averageDps += skillDamage.averageDps / sameBattleStyleSkills.length
                acc.averageDpsCombo += skillDamage.averageDpsCombo / sameBattleStyleSkills.length
                return acc
            },
            { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        )
    }, [sameBattleStyleSkills, skillsDamage])

    return (
        <div className="bg-neutral-910 @[350px]:flex-row flex w-full flex-col items-center gap-3 p-4">
            <div className="@[400px]:flex-row flex w-full flex-col items-center gap-3">
                <ToggleButton isActive={isComboActive} activeColor={'text-emerald-400'} onClick={onToggleCombo}>
                    Combo {isComboActive ? 'On' : 'Off'}
                </ToggleButton>
                <div className="text-neutral-450 flex items-center gap-1 text-xs">
                    <span className={cls('text-neutral-300', { ['text-emerald-300']: isComboActive })}>
                        {sameBattleStyleSkills.length}
                    </span>{' '}
                    skills
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DamageDisplay
                    header={t('damage.average_dps')}
                    value={
                        isComboActive
                            ? skillsDamageTotal.averageDpsCombo.toFixed()
                            : skillsDamageTotal.averageDps.toFixed()
                    }
                    loading={isCalculating}
                    className="text-indigo-400"
                />
                <DamageDisplay
                    header={t('damage.average')}
                    value={skillsDamageTotal.average.toFixed()}
                    loading={isCalculating}
                    className="text-purple-400"
                />
                <DamageDisplay
                    header={t('damage.normal')}
                    value={skillsDamageTotal.normal.toFixed()}
                    loading={isCalculating}
                    className="text-orange-300"
                />
                <DamageDisplay
                    header={t('damage.critical')}
                    value={skillsDamageTotal.critical.toFixed()}
                    loading={isCalculating}
                    className="text-sky-400"
                />
            </div>
        </div>
    )
}