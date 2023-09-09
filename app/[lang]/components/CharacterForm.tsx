import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/types/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { battleStyles, BattleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'
import useTranslation from '@/lib/useTranslation'
import { TabButton } from '@/app/[lang]/components/TabButton'
import useMergeState from '@/lib/useMergeState'
import { useCombatPower } from '@/lib/useCombatPower'
import Image from 'next/image'
import { cls } from '@/lib/utils'

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
    initialBattleStyle?: BattleStyles
    onChange: (character: CharacterFormData) => void
}

export const CharacterForm = ({ initialBattleStyle, onChange }: Props) => {
    const { lang } = useTranslation()
    const [battleStyle, setBattleStyle] = useState<BattleStyles | undefined>(initialBattleStyle)
    const [showBattleStyleSelector, setShowBattleStyleSelector] = useState(!battleStyle)
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

    const handleBattleStyleChange = (battleStyle: BattleStyles) => {
        setBattleStyle(battleStyle)
        setShowBattleStyleSelector(false)
    }

    useEffect(() => {
        onChange({
            battleStyle,
            stats: characterStats,
        })
    }, [characterStats, battleStyle, onChange])

    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex flex-col">
                <div className="text-neutral-450 flex gap-0.5 text-[10px] font-light">
                    <button
                        type="button"
                        onClick={() => setShowBattleStyleSelector((prev) => !prev)}
                        className="bg-neutral-875 hover:bg-neutral-825 flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-200 active:bg-neutral-900"
                    >
                        {battleStyle && (
                            <Image
                                key={battleStyle}
                                src={battleStyles[battleStyle].icon}
                                alt={battleStyles[battleStyle].description[lang]}
                                className="animate-spin-selection"
                                width={32}
                            />
                        )}
                    </button>
                    <div className="bg-neutral-910 flex w-full flex-col justify-center px-2 py-1">
                        <div className="">Combat Power</div>
                        <div className="text-[11px] font-light text-orange-200">{combatPower.total}</div>
                    </div>
                </div>
                <div
                    className={cls(
                        'transition-max-height grid max-h-0 grid-cols-9 gap-0.5 overflow-hidden duration-500 ease-in-out',
                        {
                            'max-h-[30px]': showBattleStyleSelector,
                        }
                    )}
                >
                    {Object.entries(battleStyles).map(([key, style]) => (
                        <div
                            key={style.acronym[lang]}
                            className={cls(
                                'hover:bg-neutral-850 mt-0.5 flex cursor-pointer items-center justify-center bg-neutral-900 px-0.5 py-1 opacity-75 transition-all duration-200 hover:opacity-100',
                                {
                                    'bg-neutral-825 opacity-100': battleStyle === key,
                                }
                            )}
                            onClick={() => handleBattleStyleChange(key as BattleStyles)}
                        >
                            <Image
                                src={style.icon}
                                alt={style.description[lang]}
                                className="transition-all duration-200"
                            />
                        </div>
                    ))}
                </div>
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