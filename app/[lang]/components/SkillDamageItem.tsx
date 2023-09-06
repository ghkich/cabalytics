import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/sharp-light-svg-icons'
import React, { useEffect } from 'react'
import { Skill } from '@/app/types/skills'
import { cls } from '@/lib/utils'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { useCalculateSkillDamage } from '@/lib/useCalculateSkillDamage'
import { DamageNumber } from '@/app/[lang]/components/DamageNumber'
import useTranslation from '@/lib/useTranslation'

type Props = {
    skill: Skill
    onClick: (id: string) => void
    selected?: boolean
    isComboActive?: boolean
}
export const SkillDamageItem = ({ skill, onClick, selected, isComboActive }: Props) => {
    const { lang, t } = useTranslation()
    const { attacker, defender, setSkillsDamage } = useDamageCalculator()
    const { damage, isCalculating, calculateSkillDamage } = useCalculateSkillDamage()

    useEffect(() => {
        if (!attacker || !defender || !skill) return
        calculateSkillDamage({ attacker, defender, skill })?.then()
    }, [attacker, defender, skill, calculateSkillDamage])

    useEffect(() => {
        if (!damage) return
        const averageDps = damage.average / skill.castingTime
        const averageDpsCombo = damage.average / skill.comboCastingTime
        setSkillsDamage((prev) => ({
            ...prev,
            [skill.id]: {
                ...damage,
                averageDps,
                averageDpsCombo,
            },
        }))
    }, [damage, setSkillsDamage, skill.castingTime, skill.comboCastingTime, skill.id])

    return (
        <label
            htmlFor="skill"
            className={cls(
                `bg-neutral-875 active:bg-neutral-910 hover:bg-neutral-850 flex w-full cursor-pointer items-center text-neutral-400 transition-colors duration-200 hover:text-neutral-400`,
                {
                    'bg-neutral-825 hover:bg-neutral-825 text-neutral-300 hover:text-neutral-200': selected,
                }
            )}
            onClick={() => onClick(skill.id)}
        >
            <div className="w-16 border-r border-neutral-700 border-opacity-50 text-center">
                <FontAwesomeIcon
                    icon={selected ? faCircleCheck : faCircle}
                    className={cls(`text-sm text-neutral-700`, {
                        'text-emerald-300': selected,
                    })}
                />
            </div>
            <div className="flex w-full px-4 py-3">
                <div className="w-full">
                    <h2 className="text-[13px]">{skill.name[lang]}</h2>
                    <div className="flex gap-1.5 text-[10px] text-neutral-500 text-opacity-75">
                        <div>
                            Cast{' '}
                            <span
                                className={cls({
                                    'text-indigo-300 text-opacity-75': selected,
                                })}
                            >
                                {isComboActive ? skill.comboCastingTime : skill.castingTime}s
                            </span>{' '}
                        </div>
                        <div>
                            [ {(skill.skillAmp * 100).toFixed()}% / +{skill.addAttack} ]
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <DamageNumber
                        header={t('damage.normal')}
                        value={damage?.normal.toFixed(0)}
                        className={cls('text-neutral-500', {
                            'text-orange-300 opacity-100': selected,
                        })}
                        loading={isCalculating}
                    />
                    <DamageNumber
                        header={t('damage.critical')}
                        value={damage?.critical.toFixed(0)}
                        className={cls('text-neutral-500', {
                            'text-sky-400': selected,
                        })}
                        loading={isCalculating}
                    />
                </div>
            </div>
        </label>
    )
}