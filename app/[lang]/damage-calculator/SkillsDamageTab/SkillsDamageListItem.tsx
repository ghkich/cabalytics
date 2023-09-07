import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/sharp-light-svg-icons'
import React, { useEffect } from 'react'
import { Skill } from '@/app/types/skills'
import { cls } from '@/lib/utils'
import { Damage, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { useCalculateSkillDamage } from '@/lib/useCalculateSkillDamage'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import useTranslation from '@/lib/useTranslation'

export type SkillDamage = {
    skillId: string
    damage: Damage
}

type Props = {
    skill: Skill
    onClick: (skillDamage: SkillDamage) => void
    selected?: boolean
    isComboActive?: boolean
}

export const SkillsDamageListItem = ({ skill, onClick, selected, isComboActive }: Props) => {
    const { lang, t } = useTranslation()
    const { attacker, defender } = useDamageCalculator()
    const { damage, isCalculating, calculateDamage } = useCalculateSkillDamage()

    useEffect(() => {
        if (!attacker || !defender || !skill) return
        calculateDamage({ attacker, defender, skill })?.then()
    }, [attacker, defender, skill, calculateDamage])

    const damageWithDps = {
        normal: damage?.normal || 0,
        average: damage?.average || 0,
        critical: damage?.critical || 0,
        averageDps: (damage?.average || 0) / skill.castingTime,
        averageDpsCombo: (damage?.average || 0) / skill.comboCastingTime,
    }

    return (
        <label
            htmlFor="skill"
            className={cls(
                `bg-neutral-875 active:bg-neutral-910 hover:bg-neutral-850 flex w-full cursor-pointer items-center text-neutral-400 transition-colors duration-200 hover:text-neutral-400`,
                {
                    'bg-neutral-825 hover:bg-neutral-825 text-neutral-300 hover:text-neutral-200': selected,
                }
            )}
            onClick={() => onClick({ skillId: skill.id, damage: damageWithDps })}
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
                            </span>
                        </div>
                        <div>
                            [ {(skill.skillAmp * 100).toFixed()}% / +{skill.addAttack} ]
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <DamageDisplay
                        header={t('damage.normal')}
                        value={damage?.normal.toFixed(0)}
                        className={cls('text-neutral-500', {
                            'text-orange-300 opacity-100': selected,
                        })}
                        loading={isCalculating}
                    />
                    <DamageDisplay
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