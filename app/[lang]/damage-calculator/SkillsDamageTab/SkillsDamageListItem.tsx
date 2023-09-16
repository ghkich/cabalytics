import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/sharp-light-svg-icons'
import React from 'react'
import { Skill } from '@/app/data/skills'
import { cls } from '@/lib/utils'
import { DamageDisplay } from '@/app/[lang]/components/DamageDisplay'
import useTranslation from '@/lib/useTranslation'

type Props = {
    skill: Skill
    onClick: (skillId: string) => void
    isSelected?: boolean
    isComboActive?: boolean
    isCalculating?: boolean
    isHidden?: boolean
    damage?: {
        normal: number
        critical: number
    }
    className?: string
    style?: React.CSSProperties
}

export const SkillsDamageListItem = ({
    skill,
    onClick,
    isSelected,
    isComboActive,
    isCalculating,
    isHidden = true,
    damage,
    className,
    style,
}: Props) => {
    const { lang, t } = useTranslation()

    return (
        <div
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => onClick(skill.id)}
            className={cls(
                `transition-max-height flex max-h-[60px] w-full animate-slide-in-long cursor-pointer items-center bg-neutral-875 text-neutral-400 transition-all duration-200 hover:bg-neutral-850 hover:text-neutral-400 active:bg-neutral-910 `,
                {
                    'bg-neutral-825 text-neutral-300 hover:bg-neutral-825 hover:text-neutral-200': isSelected,
                    ['pointer-events-none max-h-0 !opacity-0']: isHidden && !isSelected,
                    ['mb-0.5']: !isHidden || isSelected,
                },
                className
            )}
            style={style}
        >
            <div className="w-12 border-r border-neutral-700 border-opacity-50 text-center md:w-14">
                <FontAwesomeIcon
                    icon={isSelected ? faCircleCheck : faCircle}
                    className={cls(`text-[16px] text-neutral-700 md:text-sm`, {
                        'text-emerald-300': isSelected,
                    })}
                />
            </div>
            <div className="flex w-full items-center px-4 py-3">
                <div className="w-full">
                    <h2 className="text-[13px]">{skill.data.name[lang]}</h2>
                    <div className="flex gap-1.5 text-[10px] text-neutral-500 text-opacity-75">
                        <div>
                            Cast{' '}
                            <span
                                className={cls({
                                    'text-indigo-300 text-opacity-75': isSelected,
                                })}
                            >
                                {isComboActive ? skill.data.comboCastingTime : skill.data.castingTime}s
                            </span>
                        </div>
                        <div className="hidden md:inline">
                            [ {skill.data.stats.skillAmp.toFixed()}% / +{skill.data.stats.addAttack} ]
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {skill.data.continuousDamage && (
                        <DamageDisplay
                            header={`${t('damage.continuous')} (${skill.data.continuousDamage.duration}s)`}
                            value={skill.data.continuousDamage.value.toFixed(0)}
                            className={cls('text-neutral-500', {
                                'text-rose-400 opacity-100': isSelected,
                            })}
                        />
                    )}
                    <DamageDisplay
                        header={t('damage.normal')}
                        value={damage?.normal.toFixed(0)}
                        loading={isCalculating}
                        className={cls('text-neutral-500', {
                            'text-orange-300 opacity-100': isSelected,
                        })}
                    />
                    <DamageDisplay
                        header={t('damage.critical')}
                        value={damage?.critical.toFixed(0)}
                        loading={isCalculating}
                        className={cls('text-neutral-500', {
                            'text-sky-400': isSelected,
                        })}
                    />
                </div>
            </div>
        </div>
    )
}