'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { DefenseAttributes } from '@/app/types/attributes'
import { BattleStyles, battleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'

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
            if (!character.battleStyle || !attacker?.battleStyle) return
            const isAttackerMagicBased = magicBasedBattleStyles.includes(attacker.battleStyle)
            setDefender({
                penetrationArmorFactor: battleStyles[character.battleStyle].penetrationArmorFactor,
                baselineArmor: battleStyles[character.battleStyle].baselineArmor,
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
        [setDefender, attacker?.battleStyle]
    )

    return (
        <div>
            <CharacterForm initialBattleStyle={BattleStyles.Warrior} onChange={handleChange} />
        </div>
    )
}