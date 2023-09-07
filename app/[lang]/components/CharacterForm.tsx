import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/types/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { BattleStyles, getBattleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'
import { Select } from '@/app/[lang]/components/Select'
import useTranslation from '@/lib/useTranslation'
import { TabButton } from '@/app/[lang]/components/TabButton'
import useMergeState from '@/lib/useMergeState'
import { useCombatPower } from '@/lib/useCombatPower'

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
    ignorePenetration: 0,
    ignoreAccuracy: 0,
    cancelIgnoreDamageReduction: 0,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
}

export type CharacterStats = {
    attack: {
        general: AttackAttributes
        pvp: AttackAttributes
        pve: AttackAttributes
    }
    defense: {
        general: DefenseAttributes
        pvp: DefenseAttributes
        pve: DefenseAttributes
    }
}

export type CharacterFormData = {
    battleStyle?: BattleStyles
    stats: CharacterStats
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
    const { lang, t } = useTranslation()
    const [battleStyle, setBattleStyle] = useState<BattleStyles>()
    const isMagicBased = !!(battleStyle && magicBasedBattleStyles.includes(battleStyle))
    const [attributeType, setAttributeType] = useState<AttributeTypeValue>('attack')
    const [attributeCategory, setAttributeCategory] = useState<AttributeCategoryValue>('general')
    const [characterStats, updateCharacterStats] = useMergeState<CharacterStats>({
        attack: {
            general: initialAttackAttributes,
            pvp: initialAttackAttributes,
            pve: initialAttackAttributes,
        },
        defense: {
            general: initialDefenseAttributes,
            pvp: initialDefenseAttributes,
            pve: initialDefenseAttributes,
        },
    })
    const combatPower = useCombatPower(characterStats, isMagicBased)

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            const partialStateUpdate = {
                ...characterStats,
                [attributeType]: {
                    ...characterStats[attributeType],
                    [attributeCategory]: {
                        ...characterStats[attributeType][attributeCategory],
                        [name]: value,
                    },
                },
            }
            updateCharacterStats(partialStateUpdate)
        },
        [characterStats, attributeType, attributeCategory, updateCharacterStats]
    )

    useEffect(() => {
        onChange({
            battleStyle,
            stats: characterStats,
        })
    }, [characterStats, battleStyle, onChange])

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
                <div className="text-xs text-orange-200">{combatPower.total}</div>
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
                            {combatPower[type.value].total}
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
                            {combatPower[attributeType][category.value]}
                        </div>
                    </TabButton>
                ))}
            </div>
            <div className="">
                {attributeType === 'attack' && (
                    <form className="flex flex-col gap-0.5">
                        {Object.entries(attackAttributes).map(([key, { description }]) => {
                            const typedKey = key as keyof AttackAttributes
                            const { min, max } = attackAttributes[typedKey]
                            const value = characterStats.attack[attributeCategory][typedKey]

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
                )}
                {attributeType === 'defense' && (
                    <form className="flex flex-col gap-0.5">
                        {Object.entries(defenseAttributes).map(([key, { description }]) => {
                            const typedKey = key as keyof DefenseAttributes
                            const { min, max } = defenseAttributes[typedKey]
                            const value = characterStats.defense[attributeCategory][typedKey]

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
                )}
            </div>
        </div>
    )
}