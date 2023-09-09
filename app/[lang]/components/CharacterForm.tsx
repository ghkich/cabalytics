import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { battleStylesData, BattleStyleTypes, getBattleStyles } from '@/app/data/battleStyles'
import useTranslation from '@/lib/useTranslation'
import { TabButton } from '@/app/[lang]/components/TabButton'
import useMergeState from '@/lib/useMergeState'
import { useCombatPower } from '@/lib/useCombatPower'
import Image from 'next/image'
import { cls } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/sharp-light-svg-icons'

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
    battleStyleType?: BattleStyleTypes
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
    initialBattleStyleType?: BattleStyleTypes
    onChange: (character: CharacterFormData) => void
}

export const CharacterForm = ({ initialBattleStyleType, onChange }: Props) => {
    const { lang } = useTranslation()
    const [selectedBattleStyleType, setSelectedBattleStyleType] = useState<BattleStyleTypes | undefined>(
        initialBattleStyleType
    )
    const [showBattleStyleSelector, setShowBattleStyleSelector] = useState(!selectedBattleStyleType)
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
    const battleStyles = getBattleStyles(lang)
    const selectedBattleStyle = selectedBattleStyleType ? battleStylesData[selectedBattleStyleType] : undefined
    const combatPower = useCombatPower(characterStats, selectedBattleStyle?.isMagicBased)

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

    const handleBattleStyleChange = (battleStyleType: BattleStyleTypes) => {
        setSelectedBattleStyleType(battleStyleType)
        setShowBattleStyleSelector(false)
    }

    useEffect(() => {
        onChange({
            battleStyleType: selectedBattleStyleType,
            stats: characterStats,
        })
    }, [characterStats, selectedBattleStyleType, onChange])

    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex w-full gap-0.5">
                <div className="flex w-full items-center justify-center bg-neutral-900 py-1 text-center text-[10px] uppercase text-neutral-600">
                    <h1>Atacante</h1>
                </div>
                <div className="flex gap-0.5 text-center text-xs text-neutral-500">
                    <button
                        type="button"
                        className={cls('w-8 bg-neutral-900 py-0.5', {
                            'bg-neutral-825 text-neutral-400': true,
                        })}
                    >
                        1
                    </button>
                    <button type="button" className="w-8 bg-neutral-900">
                        2
                    </button>
                    <button type="button" className="w-8 bg-neutral-900">
                        3
                    </button>
                    <button type="button" className="w-8 bg-neutral-900">
                        4
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-neutral-450 flex gap-0.5 text-[10px] font-light">
                    <button
                        type="button"
                        onClick={() => setShowBattleStyleSelector((prev) => !prev)}
                        className="bg-neutral-875 hover:bg-neutral-825 relative flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-200 active:bg-neutral-900"
                    >
                        {battleStyles.map((battleStyle) => {
                            return (
                                <Image
                                    key={`${battleStyle.type}-${selectedBattleStyleType}`}
                                    src={battleStyle.icon}
                                    alt={battleStyle.description}
                                    loading="eager"
                                    className={cls('animate-spin-selection absolute opacity-0', {
                                        'opacity-100': selectedBattleStyleType === battleStyle.type,
                                    })}
                                    width={32}
                                />
                            )
                        })}
                        {!selectedBattleStyleType && (
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                className={cls('mb-[-10px] animate-bounce text-xl text-neutral-600', {
                                    'text-emerald-300': selectedBattleStyleType,
                                })}
                            />
                        )}
                    </button>
                    <div className="bg-neutral-910 flex w-full flex-col justify-center px-2 py-1">
                        {selectedBattleStyleType ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="">Combat Power</div>
                                    <div className="text-[11px] font-light text-orange-200">{combatPower.total}</div>
                                </div>
                                <div className="pr-3"></div>
                            </div>
                        ) : (
                            <div className="font-light text-neutral-500">
                                Selecione o <b className="text-neutral-450 font-normal">estilo de luta</b> do atacante
                            </div>
                        )}
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
                    {battleStyles.map((battleStyle) => (
                        <div
                            key={`select-battle-style-${battleStyle.type}`}
                            className={cls(
                                'hover:bg-neutral-850 mt-0.5 flex cursor-pointer items-center justify-center bg-neutral-900 px-0.5 py-1 transition-all duration-200 hover:opacity-100',
                                {
                                    'bg-neutral-825 opacity-100': selectedBattleStyleType === battleStyle.type,
                                }
                            )}
                            onClick={() => handleBattleStyleChange(battleStyle.type)}
                        >
                            <Image
                                src={battleStyle.icon}
                                alt={battleStyle.description}
                                className="opacity-90 transition-all duration-200"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-0.5">
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

                                if (selectedBattleStyle?.isMagicBased && typedKey === 'attack') return null
                                if (!selectedBattleStyle?.isMagicBased && typedKey === 'magicAttack') return null
                                if (selectedBattleStyle?.isMagicBased && typedKey === 'swordSkillAmp') return null
                                if (!selectedBattleStyle?.isMagicBased && typedKey === 'magicSkillAmp') return null
                                if (selectedBattleStyle?.isMagicBased && typedKey === 'minimumDamage') return null

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
        </div>
    )
}