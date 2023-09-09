import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { battleStylesData, BattleStyleTypes, getBattleStyles } from '@/app/data/battleStyles'
import useTranslation from '@/lib/useTranslation'
import { TabButton } from '@/app/[lang]/components/TabButton'
import useMergeState from '@/lib/useMergeState'
import { useCombatPower } from '@/lib/useCombatPower'
import { cls, getAccentColorByType, getTwColorClassNameByAccent } from '@/lib/utils'
import BattleStyleSelectorTrigger from '@/app/[lang]/components/BattleStyleSelectorTrigger'
import BattleStyleSelector from '@/app/[lang]/components/BattleStyleSelector'

const zeroAttackAttributes: AttackAttributes = {
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

const initialAttackAttributes: AttackAttributes = {
    attack: 4000,
    magicAttack: 4000,
    attackRate: 6500,
    criticalRate: 50,
    criticalDamage: 200,
    swordSkillAmp: 125,
    magicSkillAmp: 125,
    accuracy: 750,
    penetration: 300,
    minimumDamage: 0,
    addDamage: 100,
    ignoreEvasion: 450,
    finalDamageUp: 0,
    ignoreDamageReduction: 50,
    ignoreResistCriticalRate: 5,
    ignoreResistCriticalDamage: 10,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 25,
    cancelIgnorePenetration: 0,
}

const zeroDefenseAttributes: DefenseAttributes = {
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

const initialDefenseAttributes: DefenseAttributes = {
    hp: 7500,
    defense: 3500,
    defenseRate: 6500,
    evasion: 1500,
    damageReduction: 400,
    resistCriticalRate: 20,
    resistCriticalDamage: 100,
    resistMagicSkillAmp: 50,
    resistSwordSkillAmp: 50,
    ignorePenetration: 200,
    ignoreAccuracy: 600,
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
    type: 'attacker' | 'defender'
    onChange: (character: CharacterFormData) => void
}

export const CharacterForm = ({ type, onChange }: Props) => {
    const { t, lang } = useTranslation()
    const [selectedBattleStyleType, setSelectedBattleStyleType] = useState<BattleStyleTypes | undefined>(
        type === 'attacker' ? undefined : undefined
    )
    const [showBattleStyleSelector, setShowBattleStyleSelector] = useState(!selectedBattleStyleType)
    const [selectedAttributeType, setSelectedAttributeType] = useState<AttributeTypeValue>(
        type === 'attacker' ? 'attack' : 'defense'
    )
    const [attributeCategory, setAttributeCategory] = useState<AttributeCategoryValue>('general')
    const [characterStats, updateCharacterStats] = useMergeState<CharacterStats>({
        attack: {
            general: initialAttackAttributes,
            pvp: zeroAttackAttributes,
            pve: zeroAttackAttributes,
        },
        defense: {
            general: initialDefenseAttributes,
            pvp: zeroDefenseAttributes,
            pve: zeroDefenseAttributes,
        },
    })
    const battleStyles = getBattleStyles(lang)
    const selectedBattleStyle = selectedBattleStyleType ? battleStylesData[selectedBattleStyleType] : undefined
    const combatPower = useCombatPower(characterStats, selectedBattleStyle?.isMagicBased)

    const accentColor = getAccentColorByType(type)
    const accentColorClassName = getTwColorClassNameByAccent(accentColor)

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            const partialStateUpdate = {
                ...characterStats,
                [selectedAttributeType]: {
                    ...characterStats[selectedAttributeType],
                    [attributeCategory]: {
                        ...characterStats[selectedAttributeType][attributeCategory],
                        [name]: value,
                    },
                },
            }
            updateCharacterStats(partialStateUpdate)
        },
        [characterStats, selectedAttributeType, attributeCategory, updateCharacterStats]
    )

    useEffect(() => {
        onChange({
            battleStyleType: selectedBattleStyleType,
            stats: characterStats,
        })
    }, [characterStats, selectedBattleStyleType, onChange])

    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex w-full gap-0.5">
                <div className="flex gap-0.5 text-center text-xs text-neutral-500">
                    <button type="button" className={cls('bg-neutral-825 w-8 py-0.5', accentColorClassName)}>
                        1
                    </button>
                    <button type="button" className="bg-neutral-875 w-8">
                        2
                    </button>
                </div>
                <div
                    className={cls(
                        'bg-neutral-875 text-neutral-450 flex w-full items-center justify-center py-2 text-center text-[10px] uppercase transition-all duration-200',
                        {
                            [`text-[11px] ${accentColorClassName}`]: !selectedBattleStyleType,
                        }
                    )}
                >
                    <h1>{t(`terms.${type}`)}</h1>
                </div>
                <div className="flex gap-0.5 text-center text-xs text-neutral-500">
                    <button type="button" className="bg-neutral-875 w-8">
                        3
                    </button>
                    <button type="button" className="bg-neutral-875 w-8">
                        4
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-neutral-450 flex h-12 gap-0.5">
                    {selectedBattleStyleType && (
                        <BattleStyleSelectorTrigger
                            battleStyles={battleStyles}
                            selectedBattleStyleType={selectedBattleStyleType}
                            onClick={() => setShowBattleStyleSelector((prev) => !prev)}
                        />
                    )}
                    <div className="bg-neutral-910 flex w-full flex-col justify-center px-2 py-1">
                        {selectedBattleStyleType && (
                            <div className="flex items-center justify-between">
                                <div className="w-full text-center">
                                    <div className="text-[10px] font-light">Combat Power</div>
                                    <div className="text-[11px] font-light text-orange-200">{combatPower.total}</div>
                                </div>
                            </div>
                        )}
                        {!selectedBattleStyleType && (
                            <div className="text-center text-[10px] font-light text-neutral-400">
                                {t(`phrases.select_a`)} <b className="font-semibold">{t(`terms.battle_style`)}</b>
                            </div>
                        )}
                    </div>
                    {selectedBattleStyleType && <div className="w-[66px] shrink-0 bg-neutral-900"></div>}
                </div>
                <BattleStyleSelector
                    battleStyles={battleStyles}
                    selectedBattleStyleType={selectedBattleStyleType}
                    accentColorClassName={accentColorClassName}
                    isOpen={showBattleStyleSelector}
                    onChange={(battleStyleType) => {
                        setSelectedBattleStyleType(battleStyleType)
                        setShowBattleStyleSelector(false)
                    }}
                />
            </div>
            <div
                className={cls('flex flex-col gap-0.5 opacity-100 transition-opacity duration-500', {
                    ['pointer-events-none select-none opacity-20']: showBattleStyleSelector,
                })}
            >
                <div className="flex justify-evenly gap-0.5">
                    {attributeTypes.map((attributeType) => (
                        <TabButton
                            key={attributeType.value}
                            active={selectedAttributeType === attributeType.value}
                            accentColor={accentColor}
                            onClick={() => setSelectedAttributeType(attributeType.value)}
                        >
                            <div className="text-[12px]">{attributeType.label}</div>
                            <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                                {combatPower[attributeType.value].total}
                            </div>
                        </TabButton>
                    ))}
                </div>
                <div className="flex justify-evenly gap-0.5">
                    {attributeCategories.map((category) => (
                        <TabButton
                            key={category.value}
                            active={attributeCategory === category.value}
                            accentColor={accentColor}
                            onClick={() => setAttributeCategory(category.value)}
                        >
                            <div className="text-[11px]">{category.label[lang]}</div>
                            <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                                {combatPower[selectedAttributeType][category.value]}
                            </div>
                        </TabButton>
                    ))}
                </div>
                <div className="">
                    {selectedAttributeType === 'attack' && (
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
                    {selectedAttributeType === 'defense' && (
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