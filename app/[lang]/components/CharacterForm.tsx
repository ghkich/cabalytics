import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/types/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { BattleStyles, getBattleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'
import { Select } from '@/app/[lang]/components/Select'
import useTranslation from '@/lib/useTranslation'
import useFormatLocale from '@/lib/useFormatLocale'
import { TabButton } from '@/app/[lang]/components/TabButton'

const starrkAttackAttributes: AttackAttributes = {
    attack: 1614,
    magicAttack: 2896,
    attackRate: 5396,
    criticalRate: 67,
    criticalDamage: 274 + 4,
    swordSkillAmp: 131 + 3,
    magicSkillAmp: 241 + 3,
    accuracy: 1566,
    penetration: 834,
    minimumDamage: 0,
    addDamage: 68,
    ignoreEvasion: 782,
    finalDamageUp: 6,
    ignoreDamageReduction: 173,
    ignoreResistCriticalRate: 12,
    ignoreResistCriticalDamage: 96,
    ignoreResistSkillAmp: 13,
    normalDamageUp: 51,
    cancelIgnorePenetration: 72,
}

const starrkDefenseAttributes: DefenseAttributes = {
    hp: 10000,
    defense: 5243 + 2,
    defenseRate: 8205,
    evasion: 1478,
    damageReduction: 741,
    resistCriticalRate: 24,
    resistCriticalDamage: 195,
    resistMagicSkillAmp: 68 + 31,
    resistSwordSkillAmp: 68 + 13,
    ignorePenetration: 473,
    ignoreAccuracy: 965,
    cancelIgnoreDamageReduction: 36,
    cancelIgnoreEvasion: 5,
    finalDamageDown: 7,
}

const initialAttackAttributes: AttackAttributes = {
    // attack: 0,
    // magicAttack: 0,
    // attackRate: 0,
    // criticalRate: 0,
    // criticalDamage: 0,
    // swordSkillAmp: 0,
    // magicSkillAmp: 0,
    // accuracy: 0,
    // penetration: 0,
    // minimumDamage: 0,
    // addDamage: 0,
    // ignoreEvasion: 0,
    // finalDamageUp: 0,
    // ignoreDamageReduction: 0,
    // ignoreResistCriticalRate: 0,
    // ignoreResistCriticalDamage: 0,
    // ignoreResistSkillAmp: 0,
    // normalDamageUp: 0,
    // cancelIgnorePenetration: 0,
    ...starrkAttackAttributes,
}

const initialDefenseAttributes: DefenseAttributes = {
    // hp: 0,
    // defense: 0,
    // defenseRate: 0,
    // evasion: 0,
    // damageReduction: 0,
    // resistCriticalRate: 0,
    // resistCriticalDamage: 0,
    // resistMagicSkillAmp: 0,
    // resistSwordSkillAmp: 0,
    // ignoreAccuracy: 0,
    // ignorePenetration: 0,
    // cancelIgnoreDamageReduction: 0,
    // cancelIgnoreEvasion: 0,
    // finalDamageDown: 0,
    ...starrkDefenseAttributes,
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

export type CombatPower = {
    attackAbility: {
        general: number
        pvp: number
        pve: number
    }
    defenseAbility: {
        general: number
        pvp: number
        pve: number
    }
}
const sumAttackAttributes = (attributes: AttackAttributes, isMagicBased: boolean) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof AttackAttributes
        let attributeScore = attackAttributes[attributeKey].score
        if (isMagicBased && attributeKey === 'attack') attributeScore = 0
        if (!isMagicBased && attributeKey === 'magicAttack') attributeScore = 0
        if (isMagicBased && attributeKey === 'swordSkillAmp') attributeScore = 0
        if (!isMagicBased && attributeKey === 'magicSkillAmp') attributeScore = 0
        return acc + value * attributeScore
    }, 0)
}

const sumDefenseAttributes = (attributes: DefenseAttributes) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof DefenseAttributes
        let attributeScore = defenseAttributes[attributeKey].score
        return acc + value * attributeScore
    }, 0)
}

type Props = {
    onChange: (character: CharacterFormData) => void
}

export const CharacterForm = ({ onChange }: Props) => {
    const { lang, t } = useTranslation()
    const { formatNumber } = useFormatLocale()
    const [battleStyle, setBattleStyle] = useState<BattleStyles>(BattleStyles.ForceArcher)
    const [attributeType, setAttributeType] = useState<AttributeTypeValue>('attack')
    const [attributeCategory, setAttributeCategory] = useState<AttributeCategoryValue>('general')
    const [attackGeneral, setAttackGeneral] = useState<AttackAttributes>(initialAttackAttributes)
    const [defenseGeneral, setDefenseGeneral] = useState<DefenseAttributes>(initialDefenseAttributes)

    const isMagicBased = battleStyle && magicBasedBattleStyles.includes(battleStyle)
    const attackGeneralCombatPower = React.useMemo(
        () => sumAttackAttributes(attackGeneral, isMagicBased),
        [attackGeneral, isMagicBased]
    )
    const defenseGeneralCombatPower = React.useMemo(() => sumDefenseAttributes(defenseGeneral), [defenseGeneral])

    const getCombatPower = (type: AttributeTypeValue | 'total', category?: AttributeCategoryValue | 'total') => {
        if (type === 'total') {
            return formatNumber(attackGeneralCombatPower + defenseGeneralCombatPower)
        }
        if (type === 'attack' && category === 'general') {
            return formatNumber(attackGeneralCombatPower)
        }
        if (type === 'attack' && category === 'total') {
            return formatNumber(attackGeneralCombatPower)
        }
        if (type === 'defense' && category === 'general') {
            return formatNumber(defenseGeneralCombatPower)
        }
        if (type === 'defense' && category === 'total') {
            return formatNumber(defenseGeneralCombatPower)
        }
    }

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target

            if (attributeType === 'attack' && attributeCategory === 'general') {
                setAttackGeneral((prev) => ({ ...prev, [name]: value }))
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
        <div className="flex flex-col gap-0.5">
            <Select
                name="battle-style"
                label={t('placeholders.battle_style')}
                items={getBattleStyles(lang)}
                value={battleStyle}
                onChange={(e) => {
                    setBattleStyle(e.target.value as BattleStyles)
                }}
            />
            <div className="bg-neutral-910 text-neutral-450 p-1.5 text-center text-[10px] font-light">
                <div className="">Combat Power</div>
                <div className="text-xs text-orange-200">{getCombatPower('total')}</div>
            </div>
            <div className="flex justify-evenly gap-0.5">
                {attributeTypes.map((type) => (
                    <TabButton
                        key={type.value}
                        active={attributeType === type.value}
                        onClick={() => setAttributeType(type.value)}
                    >
                        <div className="text-[12px]">{type.label}</div>
                        <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                            {getCombatPower(attributeType, 'total')}
                        </div>
                    </TabButton>
                ))}
            </div>
            <div className="flex justify-evenly gap-0.5">
                {attributeCategories.map((category) => (
                    <TabButton
                        key={category.value}
                        active={attributeCategory === category.value}
                        onClick={() => setAttributeCategory(category.value)}
                    >
                        <div className="text-[11px]">{category.label[lang]}</div>
                        <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                            {getCombatPower(attributeType, attributeCategory)}
                        </div>
                    </TabButton>
                ))}
            </div>
            <div className="">
                <form className="flex flex-col gap-0.5">
                    {attributeType === 'attack' &&
                        Object.entries(attackAttributes).map(([key, { description }]) => {
                            const typedKey = key as keyof AttackAttributes
                            const { min, max } = attackAttributes[typedKey]
                            const value = attackGeneral?.[typedKey]

                            if (isMagicBased && typedKey === 'attack') return null
                            if (!isMagicBased && typedKey === 'magicAttack') return null
                            if (isMagicBased && typedKey === 'swordSkillAmp') return null
                            if (!isMagicBased && typedKey === 'magicSkillAmp') return null
                            if (isMagicBased && typedKey === 'minimumDamage') return null

                            return (
                                <AttributeInput
                                    key={key}
                                    name={key}
                                    label={description[lang]}
                                    onChange={handleChange}
                                    value={value}
                                    min={min}
                                    max={max}
                                />
                            )
                        })}
                </form>
                <form className="flex flex-col gap-0.5">
                    {attributeType === 'defense' &&
                        Object.entries(defenseAttributes).map(([key, { description }]) => {
                            const typedKey = key as keyof DefenseAttributes
                            const { min, max } = defenseAttributes[typedKey]
                            const value = defenseGeneral?.[typedKey]

                            return (
                                <AttributeInput
                                    key={key}
                                    name={key}
                                    label={description[lang]}
                                    onChange={handleChange}
                                    value={value}
                                    min={min}
                                    max={max}
                                />
                            )
                        })}
                </form>
            </div>
        </div>
    )
}