'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { AttackAttributes } from '@/app/data/attributes'
import { battleStylesData, BattleStyleTypes } from '@/app/data/battleStyles'

export type Attacker = {
    battleStyleType: BattleStyleTypes
    effectiveAttack: number
    effectiveSkillAmp: number
    criticalEffectiveness: number
} & Omit<AttackAttributes, 'swordSkillAmp' | 'magicSkillAmp' | 'attack' | 'magicAttack'>

const getFinalAttributeValue = (
    attacker: CharacterFormData,
    attribute: keyof AttackAttributes,
    damageMode?: DamageMode
) => {
    const generalAttribute = attacker?.stats.attack?.general?.[attribute] || 0
    const pvpAttribute = attacker?.stats.attack?.pvp?.[attribute] || 0
    const pveAttribute = attacker?.stats.attack?.pve?.[attribute] || 0
    if (damageMode === 'pve') return Number(generalAttribute) + Number(pveAttribute)
    return Number(generalAttribute) + Number(pvpAttribute)
}

export const AttackerForm = () => {
    const { setAttacker } = useDamageCalculator()

    const handleChange = React.useCallback(
        (character: CharacterFormData) => {
            if (!character.battleStyleType) return
            const isAttackerMagicBased = battleStylesData[character.battleStyleType].isMagicBased
            setAttacker({
                battleStyleType: character.battleStyleType,
                criticalEffectiveness: battleStylesData[character.battleStyleType].criticalEffectiveness,
                effectiveAttack: getFinalAttributeValue(character, isAttackerMagicBased ? 'magicAttack' : 'attack'),
                criticalDamage: getFinalAttributeValue(character, 'criticalDamage') / 100,
                criticalRate: getFinalAttributeValue(character, 'criticalRate') / 100,
                effectiveSkillAmp:
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
                attackRate: getFinalAttributeValue(character, 'attackRate') / 100,
                accuracy: getFinalAttributeValue(character, 'accuracy') / 100,
                minimumDamage: getFinalAttributeValue(character, 'minimumDamage'),
                ignoreEvasion: getFinalAttributeValue(character, 'ignoreEvasion'),
            })
        },
        [setAttacker]
    )

    return (
        <div>
            <CharacterForm type="attacker" onChange={handleChange} />
        </div>
    )
}