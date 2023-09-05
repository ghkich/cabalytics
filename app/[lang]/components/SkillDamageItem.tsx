import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquareCheck } from '@fortawesome/sharp-light-svg-icons'
import React, { useEffect } from 'react'
import { DamageNumbers } from '@/app/[lang]/damage-calculator/DamageResult'
import { Skill } from '@/app/types/skills'
import { useLanguage } from '@/app/[lang]/language-provider'
import { cls } from '@/lib/utils'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { useCalculateSkillDamage } from '@/lib/useCalculateSkillDamage'

type Props = {
    skill: Skill
    onClick: (id: string) => void
    selected?: boolean
}
export const SkillDamageItem = ({ skill, onClick, selected }: Props) => {
    const lang = useLanguage()
    const { attacker, defender, setSkillsDamage } = useDamageCalculator()
    const { damage, calculateSkillDamage } = useCalculateSkillDamage()

    useEffect(() => {
        if (!attacker || !defender || !skill) return
        calculateSkillDamage({ attacker, defender, skill })?.then()
    }, [attacker, defender, skill, calculateSkillDamage])

    useEffect(() => {
        setSkillsDamage((prev) => ({
            ...prev,
            [skill.id]: damage,
        }))
    }, [damage, setSkillsDamage, skill.id])

    return (
        <label
            htmlFor="skill"
            className={cls(
                `flex w-full cursor-pointer items-center bg-neutral-800 bg-opacity-30 text-neutral-500 transition-all duration-200 hover:bg-opacity-40 hover:text-neutral-400 active:bg-opacity-20`,
                {
                    'bg-opacity-60 text-neutral-300 hover:bg-opacity-60 hover:text-neutral-300': selected,
                }
            )}
            onClick={() => onClick(skill.id)}
        >
            <div className="w-16 border-r border-neutral-800 text-center">
                <FontAwesomeIcon
                    icon={selected ? faSquareCheck : faSquare}
                    className={cls(`text-neutral-700`, {
                        'text-sky-300': selected,
                    })}
                />
            </div>
            <div className="flex w-full px-4 py-3">
                <div className="w-full">
                    <h2 className="text-sm">{skill.name[lang]}</h2>
                    <div className="text-[10px] opacity-25">
                        Amp {(skill.skillAmp * 100).toFixed()}% / Add +{skill.addAttack}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    {/*<DamageNumbers*/}
                    {/*    normal={'300'}*/}
                    {/*    average={'400'}*/}
                    {/*    critical={'500'}*/}
                    {/*    className={cls('opacity-50', {*/}
                    {/*        'opacity-75': selected,*/}
                    {/*    })}*/}
                    {/*/>*/}
                    <DamageNumbers
                        normal={damage.normal.toFixed(0)}
                        average={damage.average.toFixed(0)}
                        critical={damage.critical.toFixed(0)}
                        className={cls('opacity-50', {
                            'opacity-100': selected,
                        })}
                    />
                </div>
            </div>
        </label>
    )
}