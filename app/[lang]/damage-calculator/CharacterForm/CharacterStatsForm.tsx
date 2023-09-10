import React, { ChangeEvent, useState } from 'react'
import { cls, getBuildTypeColor } from '@/lib/utils'
import { TabButton } from '@/app/[lang]/components/TabButton'
import { AttackAttributes, attackAttributes, DefenseAttributes, defenseAttributes } from '@/app/data/attributes'
import { AttributeInput } from '@/app/[lang]/components/AttributeInput'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import useTranslation from '@/lib/useTranslation'
import { getBattleStyles } from '@/app/data/battleStyles'
import { CharacterBuildType } from '@/app/data/builds'

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

type CharacterStatsFormProps = {
    buildType: CharacterBuildType
    disabled?: boolean
}

export default function CharacterStatsForm({ buildType, disabled }: CharacterStatsFormProps) {
    const { lang } = useTranslation()
    const { selectedBuild, combatPower, updateBuild } = useCharacterBuilds(buildType)
    const [selectedAttributeType, setSelectedAttributeType] = useState<AttributeTypeValue>(
        buildType === 'attacker' ? 'attack' : 'defense'
    )
    const [selectedAttributeCategory, setSelectedAttributeCategory] = useState<AttributeCategoryValue>('general')
    const buildTypeColor = getBuildTypeColor(buildType)

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            const characterStats = selectedBuild?.data.stats
            if (!characterStats) return
            updateBuild(selectedBuild.id, {
                ...selectedBuild.data,
                stats: {
                    ...characterStats,
                    [selectedAttributeType]: {
                        ...characterStats[selectedAttributeType],
                        [selectedAttributeCategory]: {
                            ...characterStats[selectedAttributeType][selectedAttributeCategory],
                            [name]: value,
                        },
                    },
                },
            })
        },
        [selectedAttributeCategory, selectedAttributeType, selectedBuild, updateBuild]
    )

    if (!selectedBuild) return null

    const selectedBattleStyle = getBattleStyles(lang).find(
        (battleStyle) => battleStyle.type === selectedBuild.data.battleStyleType
    )

    return (
        <div
            className={cls('flex flex-col gap-0.5 opacity-100 transition-opacity duration-500', {
                ['pointer-events-none select-none opacity-20']: disabled,
            })}
        >
            <div className="flex justify-evenly gap-0.5">
                {attributeTypes.map((attributeType) => (
                    <TabButton
                        key={attributeType.value}
                        isActive={selectedAttributeType === attributeType.value}
                        activeColor={buildTypeColor}
                        onClick={() => setSelectedAttributeType(attributeType.value)}
                    >
                        <div className="text-[12px]">{attributeType.label}</div>
                        <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                            {combatPower?.[attributeType.value].total.formatted}
                        </div>
                    </TabButton>
                ))}
            </div>
            <div className="flex justify-evenly gap-0.5">
                {attributeCategories.map((attributeCategory) => (
                    <TabButton
                        key={attributeCategory.value}
                        isActive={selectedAttributeCategory === attributeCategory.value}
                        activeColor={buildTypeColor}
                        onClick={() => setSelectedAttributeCategory(attributeCategory.value)}
                    >
                        <div className="text-[11px]">{attributeCategory.label[lang]}</div>
                        <div className="text-[9px] font-light text-neutral-500 text-opacity-75">
                            {combatPower?.[selectedAttributeType][attributeCategory.value].formatted}
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
                            const value = selectedBuild.data.stats.attack[selectedAttributeCategory][typedKey]

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
                            const value = selectedBuild.data.stats.defense[selectedAttributeCategory][typedKey]

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