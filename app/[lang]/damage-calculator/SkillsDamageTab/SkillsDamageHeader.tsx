import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { cls } from '@/lib/utils'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import React, { useEffect } from 'react'
import useTranslation from '@/lib/useTranslation'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export const SkillsDamageHeader = () => {
    const { t } = useTranslation()
    const { attacker, skillsTab, skillsTabDispatch } = useDamageCalculator()

    const skillsDamageTotal = React.useMemo(() => {
        return skillsTab.selectedSkills.reduce(
            (acc, skillId) => {
                const skillDamage = skillsTab.skillsDamage[skillId]
                if (!skillDamage) return acc
                acc.normal += skillDamage.normal
                acc.average += skillDamage.average
                acc.critical += skillDamage.critical
                acc.averageDps += skillDamage.averageDps / skillsTab.selectedSkills.length
                acc.averageDpsCombo += skillDamage.averageDpsCombo / skillsTab.selectedSkills.length
                return acc
            },
            { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        )
    }, [skillsTab.selectedSkills, skillsTab.skillsDamage])

    useEffect(() => {
        skillsTabDispatch({ type: 'UPDATE_SELECTED_SKILLS', payload: [] })
    }, [attacker?.battleStyle, skillsTabDispatch])

    return (
        <div className="bg-neutral-910 @[350px]:flex-row flex w-full flex-col items-center gap-3 p-4">
            <div className="@[400px]:flex-row flex w-full flex-col items-center gap-3">
                <ToggleButton
                    active={skillsTab.comboActive}
                    onClick={() => skillsTabDispatch({ type: 'TOGGLE_COMBO_ACTIVE' })}
                >
                    Combo {skillsTab.comboActive ? 'On' : 'Off'}
                </ToggleButton>
                <div className="text-neutral-450 flex items-center gap-1 text-xs">
                    <span className={cls('text-neutral-300', { ['text-emerald-300']: skillsTab.comboActive })}>
                        {skillsTab.selectedSkills.length}
                    </span>{' '}
                    skills
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DamageDisplay
                    header={t('damage.average_dps')}
                    value={
                        skillsTab.comboActive
                            ? skillsDamageTotal.averageDpsCombo.toFixed()
                            : skillsDamageTotal.averageDps.toFixed()
                    }
                    className="text-indigo-400"
                />
                <DamageDisplay
                    header={t('damage.average')}
                    value={skillsDamageTotal.average.toFixed()}
                    className="text-purple-400"
                />
                <DamageDisplay
                    header={t('damage.normal')}
                    value={skillsDamageTotal.normal.toFixed()}
                    className="text-orange-300"
                />
                <DamageDisplay
                    header={t('damage.critical')}
                    value={skillsDamageTotal.critical.toFixed()}
                    className="text-sky-400"
                />
            </div>
        </div>
    )
}