import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/types/attributes'
import { Input } from '@/app/[lang]/components/Input'
import { battleStyleItems, BattleStyles } from '@/app/types/battleStyles'
import { Select } from '@/app/[lang]/components/Select'
import { cls } from '@/lib/utils'
import useTranslations from '@/lib/useTranslations'
import { useLanguage } from '@/app/[lang]/language-provider'

const initialAttackAttributes: AttackAttributes = {
    attack: 0,
    magicAttack: 0,
    attackRate: 0,
    criticalRate: 0,
    criticalDamage: 0,
    swordSkillAmp: 0,
    magicSkillAmp: 0,
    accuracy: 0,
    penetration: 0,
    minimumDamage: 0,
    addDamage: 0,
    ignoreEvasion: 0,
    finalDamageUp: 0,
    ignoreDamageReduction: 0,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 0,
}

const initialDefenseAttributes: DefenseAttributes = {
    hp: 0,
    defense: 0,
    defenseRate: 0,
    evasion: 0,
    damageReduction: 0,
    resistCriticalRate: 0,
    resistCriticalDamage: 0,
    resistMagicSkillAmp: 0,
    resistSwordSkillAmp: 0,
    ignoreAccuracy: 0,
    ignorePenetration: 0,
    cancelIgnoreDamageReduction: 0,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
}

export type CharacterFormData = {
    battleStyle?: BattleStyles
    attackAttributes: {
        general: AttackAttributes
        pvp?: AttackAttributes
        pve?: AttackAttributes
    }
    defenseAttributes: {
        general: DefenseAttributes
        pvp?: DefenseAttributes
        pve?: DefenseAttributes
    }
}

type AttributeTypeValue = 'attack' | 'defense'
const attributeTypes: { value: AttributeTypeValue; label: string }[] = [
    {
        value: 'attack',
        label: 'ATK',
    },
    {
        value: 'defense',
        label: 'DEF',
    },
]
type AttributeCategoryValue = 'general' | 'pvp' | 'pve'
const attributeCategories: { value: AttributeCategoryValue; label: { pt: string; en: string } }[] = [
    {
        value: 'general',
        label: {
            pt: 'Geral',
            en: 'General',
        },
    },
    {
        value: 'pvp',
        label: {
            pt: 'PVP',
            en: 'PVP',
        },
    },
    {
        value: 'pve',
        label: {
            pt: 'PVE',
            en: 'PVE',
        },
    },
]

type Props = {
    onChange: (character: CharacterFormData) => void
}
export const CharacterForm = ({ onChange }: Props) => {
    const { t } = useTranslations()
    const lang = useLanguage()
    const [battleStyle, setBattleStyle] = useState<BattleStyles>()
    const [attributeType, setAttributeType] = useState<AttributeTypeValue>('attack')
    const [attributeCategory, setAttributeCategory] = useState<AttributeCategoryValue>('general')
    const [attackGeneral, setAttackGeneral] = useState<AttackAttributes>(initialAttackAttributes)
    const [attackPvP, setAttackPvP] = useState<AttackAttributes>(initialAttackAttributes)
    const [defenseGeneral, setDefenseGeneral] = useState<DefenseAttributes>(initialDefenseAttributes)

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target

            if (attributeType === 'attack' && attributeCategory === 'general') {
                setAttackGeneral((prev) => ({ ...prev, [name]: value }))
                return
            }

            if (attributeType === 'attack' && attributeCategory === 'pvp') {
                setAttackPvP((prev) => ({ ...prev, [name]: value }))
                return
            }

            if (attributeType === 'defense' && attributeCategory === 'general') {
                setDefenseGeneral((prev) => ({ ...prev, [name]: value }))
                return
            }
        },
        [attributeType, attributeCategory]
    )

    useEffect(() => {
        onChange({
            battleStyle,
            attackAttributes: { general: attackGeneral },
            defenseAttributes: { general: defenseGeneral },
        })
    }, [battleStyle, attackGeneral, defenseGeneral, onChange])

    return (
        <div className="">
            <Select
                name="battle-style"
                label={t('placeholders.battle_style')}
                items={battleStyleItems}
                onChange={(e) => {
                    setBattleStyle(e.target.value as BattleStyles)
                }}
                className="pb-1"
            />
            <div className="flex flex-col gap-0.5 pb-0.5">
                <div className="flex justify-evenly  gap-0.5">
                    {attributeTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            className={cls('w-full p-1 text-[11px]', {
                                ['bg-white bg-opacity-5 opacity-30']: attributeType !== type.value,
                            })}
                            onClick={() => setAttributeType(type.value)}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                <div className="flex justify-evenly gap-0.5">
                    {attributeCategories.map((category) => (
                        <button
                            key={category.value}
                            type="button"
                            className={cls('w-full p-1 text-[9px]', {
                                'bg-white bg-opacity-5 opacity-30': attributeCategory === category.value,
                            })}
                            onClick={() => setAttributeCategory(category.value)}
                        >
                            {category.label[lang]}
                        </button>
                    ))}
                </div>
            </div>
            <form>
                {attributeType === 'attack' &&
                    Object.entries(attackAttributes).map(([key, { description }]) => (
                        <Input
                            key={key}
                            type="number"
                            name={key}
                            label={description[lang]}
                            onChange={handleChange}
                            value={attackGeneral?.[key as keyof AttackAttributes]}
                            min={0}
                        />
                    ))}
            </form>
            <form>
                {attributeType === 'defense' &&
                    Object.entries(defenseAttributes).map(([key, { description }]) => (
                        <Input
                            key={key}
                            type="number"
                            name={key}
                            label={description[lang]}
                            onChange={handleChange}
                            value={defenseGeneral?.[key as keyof DefenseAttributes]}
                            min={0}
                        />
                    ))}
            </form>
        </div>
    )
}