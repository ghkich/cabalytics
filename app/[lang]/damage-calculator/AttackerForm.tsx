'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { AttackAttributes } from '@/app/types/attributes'
import { BattleStyles, battleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'

export type Attacker = {
    battleStyle: BattleStyles
    criticalEffectiveness: number
    attack: number
    criticalDamage: number
    criticalRate: number
    skillAmp: number
    penetration: number
    addDamage: number
    finalDamageUp: number
    ignoreDamageReduction: number
    ignoreResistCriticalDamage: number
    ignoreResistCriticalRate: number
    ignoreResistSkillAmp: number
    normalDamageUp: number
    cancelIgnorePenetration: number
}

const getFinalAttributeValue = (
    attacker: CharacterFormData,
    attribute: keyof AttackAttributes,
    damageMode?: DamageMode
) => {
    const generalAttribute = attacker?.attackAttributes?.general?.[attribute] || 0
    const pvpAttribute = attacker?.attackAttributes?.pvp?.[attribute] || 0
    const pveAttribute = attacker?.attackAttributes?.pve?.[attribute] || 0
    if (damageMode === 'pve') return Number(generalAttribute) + Number(pveAttribute)
    return Number(generalAttribute) + Number(pvpAttribute)
}

export const AttackerForm = () => {
    const { setAttacker } = useDamageCalculator()

    const handleChange = React.useCallback(
        (character: CharacterFormData) => {
            if (!character.battleStyle) return
            const isAttackerMagicBased = magicBasedBattleStyles.includes(character.battleStyle)
            setAttacker({
                battleStyle: character.battleStyle,
                criticalEffectiveness: battleStyles[character.battleStyle].criticalEffectiveness,
                attack: getFinalAttributeValue(character, isAttackerMagicBased ? 'magicAttack' : 'attack'),
                criticalDamage: getFinalAttributeValue(character, 'criticalDamage'),
                criticalRate: getFinalAttributeValue(character, 'criticalRate'),
                skillAmp: getFinalAttributeValue(character, isAttackerMagicBased ? 'magicSkillAmp' : 'swordSkillAmp'),
                penetration: getFinalAttributeValue(character, 'penetration'),
                addDamage: getFinalAttributeValue(character, 'addDamage'),
                finalDamageUp: getFinalAttributeValue(character, 'finalDamageUp'),
                ignoreDamageReduction: getFinalAttributeValue(character, 'ignoreDamageReduction'),
                ignoreResistCriticalDamage: getFinalAttributeValue(character, 'ignoreResistCriticalDamage'),
                ignoreResistCriticalRate: getFinalAttributeValue(character, 'ignoreResistCriticalRate'),
                ignoreResistSkillAmp: getFinalAttributeValue(character, 'ignoreResistSkillAmp'),
                normalDamageUp: getFinalAttributeValue(character, 'normalDamageUp'),
                cancelIgnorePenetration: getFinalAttributeValue(character, 'cancelIgnorePenetration'),
            })
        },
        [setAttacker]
    )

    return (
        <div>
            <CharacterForm onChange={handleChange} />
        </div>
    )
}