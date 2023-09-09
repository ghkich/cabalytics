import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/sharp-light-svg-icons'
import React, { useEffect } from 'react'
import { Skill } from '@/app/data/skills'
import { cls } from '@/lib/utils'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { useCalculateSkillDamage } from '@/lib/useCalculateSkillDamage'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import useTranslation from '@/lib/useTranslation'

type Props = {
    skill: Skill
    onClick: (skillId: string) => void
    selected?: boolean
    isComboActive?: boolean
    className?: string
    style?: React.CSSProperties
}

export const SkillsDamageListItem = ({ skill, onClick, selected, isComboActive, className, style }: Props) => {
    const { lang, t } = useTranslation()
    const { attacker, defender, skillsTabDispatch } = useDamageCalculator()
    const { damage, isCalculating, calculateDamage } = useCalculateSkillDamage()

    useEffect(() => {
        if (!attacker || !defender || !skill) return
        calculateDamage({ attacker, defender, skill })?.then()
    }, [attacker, defender, skill, calculateDamage])

    React.useEffect(() => {
        if (!damage) return
        const skillDamage = {
            normal: damage.normal,
            average: damage.average,
            critical: damage.critical,
            averageDps: damage.average / skill.castingTime,
            averageDpsCombo: damage.average / skill.comboCastingTime,
        }
        skillsTabDispatch({ type: 'UPDATE_SKILLS_DAMAGE', payload: { [skill.id]: skillDamage } })
    }, [damage, skill, skillsTabDispatch])

    return (
        <div
            role="checkbox"
            aria-checked={selected}
            onClick={() => onClick(skill.id)}
            className={cls(
                `bg-neutral-875 active:bg-neutral-910 animate- hover:bg-neutral-850 flex w-full cursor-pointer items-center text-neutral-400 transition-colors duration-200 hover:text-neutral-400`,
                {
                    'bg-neutral-825 hover:bg-neutral-825 text-neutral-300 hover:text-neutral-200': selected,
                },
                className
            )}
            style={style}
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
        </div>
    )
}