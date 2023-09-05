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
                criticalDamage: getFinalAttributeValue(character, 'criticalDamage') / 100,
                criticalRate: getFinalAttributeValue(character, 'criticalRate') / 100,
                skillAmp:
                    getFinalAttributeValue(character, isAttackerMagicBased ? 'magicSkillAmp' : 'swordSkillAmp') / 100,
                penetration: getFinalAttributeValue(character, 'penetration'),
                addDamage: getFinalAttributeValue(character, 'addDamage'),
                finalDamageUp: getFinalAttributeValue(character, 'finalDamageUp') / 100,
                ignoreDamageReduction: getFinalAttributeValue(character, 'ignoreDamageReduction'),
                ignoreResistCriticalDamage: getFinalAttributeValue(character, 'ignoreResistCriticalDamage') / 100,
                ignoreResistCriticalRate: getFinalAttributeValue(character, 'ignoreResistCriticalRate') / 100,
                ignoreResistSkillAmp: getFinalAttributeValue(character, 'ignoreResistSkillAmp') / 100,
                normalDamageUp: getFinalAttributeValue(character, 'normalDamageUp') / 100,
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