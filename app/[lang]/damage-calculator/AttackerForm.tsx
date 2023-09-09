'use client'
import React from 'react'
import { CharacterForm, CharacterFormData } from '@/app/[lang]/components/CharacterForm'
import { DamageMode, useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { AttackAttributes } from '@/app/data/attributes'
import { battleStylesData, BattleStyleTypes } from '@/app/data/battleStyles'

export type Attacker = {
    battleStyleType: BattleStyleTypes
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