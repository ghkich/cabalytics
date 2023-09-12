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
                acc.isInitial = false
                return acc
            },
            { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0, isInitial: true }
        )
    }, [sameBattleStyleSkills, skillsDamage])

    const damageLoading = sameBattleStyleSkills.length > 0 ? isCalculating || skillsDamageTotal.isInitial : false

    return (
        <div className="flex w-full flex-col items-center gap-3 bg-neutral-910 p-4 @[350px]:flex-row">
            <div className="flex w-full flex-col items-center gap-3 @[400px]:flex-row">
                <ToggleButton isActive={isComboActive} activeClassName={'text-emerald-400'} onClick={onToggleCombo}>
                    Combo {isComboActive ? 'On' : 'Off'}
                </ToggleButton>
                <div className="flex items-center gap-1 text-xs text-neutral-450">
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
                    loading={damageLoading}
                    className="text-indigo-400"
                />
                <DamageDisplay
                    header={t('damage.average')}
                    value={skillsDamageTotal.average.toFixed()}
                    loading={damageLoading}
                    className="text-purple-400"
                />
                <DamageDisplay
                    header={t('damage.normal')}
                    value={skillsDamageTotal.normal.toFixed()}
                    loading={damageLoading}
                    className="text-orange-300"
                />
                <DamageDisplay
                    header={t('damage.critical')}
                    value={skillsDamageTotal.critical.toFixed()}
                    loading={damageLoading}
                    className="text-sky-400"
                />
            </div>
        </div>
    )
}