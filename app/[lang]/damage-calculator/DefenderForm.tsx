'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { DefenseAttributes } from '@/app/data/attributes'
import { battleStylesData, BattleStyleTypes } from '@/app/data/battleStyles'

export type Defender = {
    penetrationArmorFactor: number
    baselineArmor: number
    defense: number
    damageReduction: number
    resistCriticalRate: number
    resistCriticalDamage: number
    resistSkillAmp: number
    ignorePenetration: number
    cancelIgnoreDamageReduction: number
    finalDamageDown: number
}
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
                defense: getFinalAttributeValue(character, 'defense'),
                damageReduction: getFinalAttributeValue(character, 'damageReduction'),
                resistCriticalRate: getFinalAttributeValue(character, 'resistCriticalRate') / 100,
                resistCriticalDamage: getFinalAttributeValue(character, 'resistCriticalDamage') / 100,
                resistSkillAmp:
                    getFinalAttributeValue(
                        character,
                        isAttackerMagicBased ? 'resistMagicSkillAmp' : 'resistSwordSkillAmp'
                    ) / 100,
                ignorePenetration: getFinalAttributeValue(character, 'ignorePenetration'),
                cancelIgnoreDamageReduction: getFinalAttributeValue(character, 'cancelIgnoreDamageReduction'),
                finalDamageDown: getFinalAttributeValue(character, 'finalDamageDown') / 100,
            })
        },
        [setDefender, attacker?.battleStyleType]
    )

    return (
        <div>
            <CharacterForm initialBattleStyleType={BattleStyleTypes.Warrior} onChange={handleChange} />
        </div>
    )
}