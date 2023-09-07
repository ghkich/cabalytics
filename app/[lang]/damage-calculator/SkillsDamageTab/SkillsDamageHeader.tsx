import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { cls } from '@/lib/utils'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import React, { useEffect } from 'react'
import useTranslation from '@/lib/useTranslation'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export const SkillsDamageHeader = () => {
    const { t } = useTranslation()
    const { attacker, skillsTab, updateSkillsTab } = useDamageCalculator()

    const selectedSkillsCount = Object.keys(skillsTab.selectedSkills).length
    const selectedSkillsDamage = React.useMemo(() => {
        if (!skillsTab.selectedSkills || selectedSkillsCount === 0) {
            return { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        }
        return Object.values(skillsTab.selectedSkills).reduce(
            (acc, damage) => {
                acc.normal += damage.normal
                acc.average += damage.average
                acc.critical += damage.critical
                acc.averageDps += damage.averageDps / selectedSkillsCount
                acc.averageDpsCombo += damage.averageDpsCombo / selectedSkillsCount
                return acc
            },
            { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }
        )
    }, [selectedSkillsCount, skillsTab.selectedSkills])

    useEffect(() => {
        updateSkillsTab({ selectedSkills: {} })
    }, [attacker?.battleStyle, updateSkillsTab])

    return (
        <div className="bg-neutral-910 @[350px]:flex-row flex w-full flex-col items-center gap-3 p-4">
            <div className="@[400px]:flex-row flex w-full flex-col items-center gap-3">
                <ToggleButton
                    active={skillsTab.comboActive}
                    onClick={() => updateSkillsTab({ comboActive: !skillsTab.comboActive })}
                >
                    Combo {skillsTab.comboActive ? 'On' : 'Off'}
                </ToggleButton>
                <div className="text-neutral-450 flex items-center gap-1 text-xs">
                    <span className={cls('text-neutral-300', { ['text-emerald-300']: skillsTab.comboActive })}>
                        {selectedSkillsCount}
                    </span>{' '}
                    skills
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DamageDisplay
                    header={t('damage.average_dps')}
                    value={
                        skillsTab.comboActive
                            ? selectedSkillsDamage.averageDpsCombo.toFixed()
                            : selectedSkillsDamage.averageDps.toFixed()
                    }
                    className="text-indigo-400"
                />
                <DamageDisplay
                    header={t('damage.average')}
                    value={selectedSkillsDamage.average.toFixed()}
                    className="text-purple-400"
                />
                <DamageDisplay
                    header={t('damage.normal')}
                    value={selectedSkillsDamage.normal.toFixed()}
                    className="text-orange-300"
                />
                <DamageDisplay
                    header={t('damage.critical')}
                    value={selectedSkillsDamage.critical.toFixed()}
                    className="text-sky-400"
                />
            </div>
        </div>
    )
}