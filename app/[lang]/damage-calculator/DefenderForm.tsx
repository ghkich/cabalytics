'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { DefenseAttributes } from '@/app/data/attributes'
import { battleStylesData } from '@/app/data/battleStyles'

export type Defender = {
    penetrationArmorFactor: number
    baselineArmor: number
    effectiveResistSkillAmp: number
} & Omit<DefenseAttributes, 'resistSkillAmp' | 'resistMagicSkillAmp' | 'resistSwordSkillAmp'>

const getFinalAttributeValue = (
    defender: CharacterFormData,
    attribute: keyof DefenseAttributes,
    damageMode?: DamageMode
) => {
    const generalAttribute = defender?.stats.defense?.general?.[attribute] ?? 0
    const pvpAttribute = defender?.stats.defense?.pvp?.[attribute] ?? 0
    const pveAttribute = defender?.stats.defense?.pve?.[attribute] ?? 0
    if (damageMode === 'pve') return Number(generalAttribute) + Number(pveAttribute)
    return Number(generalAttribute) + Number(pvpAttribute)
}
export const DefenderForm = () => {
    const { attacker, setDefender } = useDamageCalculator()

    const handleChange = React.useCallback(
        (character: CharacterFormData) => {
            if (!character.battleStyleType || !attacker?.battleStyleType) return
            const isAttackerMagicBased = battleStylesData[attacker.battleStyleType].isMagicBased
            setDefender({
                penetrationArmorFactor: battleStylesData[character.battleStyleType].penetrationArmorFactor,
                baselineArmor: battleStylesData[character.battleStyleType].baselineArmor,
                hp: getFinalAttributeValue(character, 'hp'),
                defense: getFinalAttributeValue(character, 'defense'),
                defenseRate: getFinalAttributeValue(character, 'defenseRate') / 100,
                evasion: getFinalAttributeValue(character, 'evasion') / 100,
                damageReduction: getFinalAttributeValue(character, 'damageReduction'),
                resistCriticalRate: getFinalAttributeValue(character, 'resistCriticalRate') / 100,
                resistCriticalDamage: getFinalAttributeValue(character, 'resistCriticalDamage') / 100,
                effectiveResistSkillAmp:
                    getFinalAttributeValue(
                        character,
                        isAttackerMagicBased ? 'resistMagicSkillAmp' : 'resistSwordSkillAmp'
                    ) / 100,
                ignorePenetration: getFinalAttributeValue(character, 'ignorePenetration'),
                ignoreAccuracy: getFinalAttributeValue(character, 'ignoreAccuracy'),
                cancelIgnoreDamageReduction: getFinalAttributeValue(character, 'cancelIgnoreDamageReduction'),
                cancelIgnoreEvasion: getFinalAttributeValue(character, 'cancelIgnoreEvasion'),
                finalDamageDown: getFinalAttributeValue(character, 'finalDamageDown') / 100,
            })
        },
        [setDefender, attacker?.battleStyleType]
    )

    return (
        <div>
            <CharacterForm type="defender" onChange={handleChange} />
        </div>
    )
}