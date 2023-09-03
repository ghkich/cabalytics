'use client'
import { CharacterForm, CharacterFormData } from '@/app/components/CharacterForm'
import React, { useEffect, useState } from 'react'
import { battleStyles, magicBasedBattleStyles } from '@/app/types/battleStyles'
import { AttackAttributes, DefenseAttributes } from '@/app/types/attributes'
import { CalculateDamageRequest } from '@/app/api/calculate-damage/route'

type DamageMode = 'pvp' | 'pve'
const getAttackAttributeFinalValue = (
    attacker: CharacterFormData,
    attribute: keyof AttackAttributes,
    damageMode?: DamageMode
) => {
    const generalAttribute = attacker?.attackAttributes?.general?.[attribute] || 0
    const pvpAttribute = attacker?.attackAttributes?.pvp?.[attribute] || 0
    const pveAttribute = attacker?.attackAttributes?.pve?.[attribute] || 0
    if (damageMode === 'pve') return generalAttribute + pveAttribute
    return generalAttribute + pvpAttribute
}

const getDefenseAttributeFinalValue = (
    defender: CharacterFormData,
    attribute: keyof DefenseAttributes,
    damageMode?: DamageMode
) => {
    const generalAttribute = defender?.defenseAttributes?.general?.[attribute] || 0
    const pvpAttribute = defender?.defenseAttributes?.pvp?.[attribute] || 0
    const pveAttribute = defender?.defenseAttributes?.pve?.[attribute] || 0
    if (damageMode === 'pve') return generalAttribute + pveAttribute
    return generalAttribute + pvpAttribute
}
const prepareCalculateDamagePayload = (
    attacker: CharacterFormData,
    defender: CharacterFormData
): CalculateDamageRequest => {
    if (!attacker.battleStyle || !defender.battleStyle) return {} as CalculateDamageRequest
    const isAttackerMagicBased = magicBasedBattleStyles.includes(attacker.battleStyle)
    return {
        attacker: {
            criticalEffectiveness: battleStyles[attacker.battleStyle].criticalEffectiveness,
            attack: getAttackAttributeFinalValue(attacker, isAttackerMagicBased ? 'magicAttack' : 'attack'),
            criticalDamage: getAttackAttributeFinalValue(attacker, 'criticalDamage'),
            criticalRate: getAttackAttributeFinalValue(attacker, 'criticalRate'),
            skillAmp: getAttackAttributeFinalValue(attacker, isAttackerMagicBased ? 'magicSkillAmp' : 'swordSkillAmp'),
            penetration: getAttackAttributeFinalValue(attacker, 'penetration'),
            addDamage: getAttackAttributeFinalValue(attacker, 'addDamage'),
            finalDamageUp: getAttackAttributeFinalValue(attacker, 'finalDamageUp'),
            ignoreDamageReduction: getAttackAttributeFinalValue(attacker, 'ignoreDamageReduction'),
            ignoreResistCriticalDamage: getAttackAttributeFinalValue(attacker, 'ignoreResistCriticalDamage'),
            ignoreResistCriticalRate: getAttackAttributeFinalValue(attacker, 'ignoreResistCriticalRate'),
            ignoreResistSkillAmp: getAttackAttributeFinalValue(attacker, 'ignoreResistSkillAmp'),
            normalDamageUp: getAttackAttributeFinalValue(attacker, 'normalDamageUp'),
            cancelIgnorePenetration: getAttackAttributeFinalValue(attacker, 'cancelIgnorePenetration'),
        },
        defender: {
            penetrationArmorFactor: battleStyles[defender.battleStyle].penetrationArmorFactor,
            baselineArmor: battleStyles[defender.battleStyle].baselineArmor,
            defense: getDefenseAttributeFinalValue(defender, 'defense'),
            damageReduction: getDefenseAttributeFinalValue(defender, 'damageReduction'),
            resistCriticalRate: getDefenseAttributeFinalValue(defender, 'resistCriticalRate'),
            resistCriticalDamage: getDefenseAttributeFinalValue(defender, 'resistCriticalDamage'),
            resistSkillAmp: getDefenseAttributeFinalValue(
                defender,
                isAttackerMagicBased ? 'resistMagicSkillAmp' : 'resistSwordSkillAmp'
            ),
            ignorePenetration: getDefenseAttributeFinalValue(defender, 'ignorePenetration'),
            cancelIgnoreDamageReduction: getDefenseAttributeFinalValue(defender, 'cancelIgnoreDamageReduction'),
            finalDamageDown: getDefenseAttributeFinalValue(defender, 'finalDamageDown'),
        },
        skill: {
            skillAmp: 1,
            addAttack: 200,
            criticalDamage: 0,
            penetration: 0,
            defenseReduction: 0,
        },
    }
}
export default function DamageCalculator() {
    const [attacker, setAttacker] = useState<CharacterFormData>()
    const [defender, setDefender] = useState<CharacterFormData>()
    const [damage, setDamage] = useState({ normal: 0, critical: 0 })

    useEffect(() => {
        if (!attacker || !defender) return
        const payload = prepareCalculateDamagePayload(attacker, defender)
        if (!payload.attacker || !payload.defender) return
        fetch('/api/calculate-damage', { method: 'POST', body: JSON.stringify(payload) })
            .then((res) => res.json())
            .then((data) => {
                setDamage(data)
            })
    }, [attacker, defender])

    return (
        <div className="">
            <div className="flex">
                <div className="min-w-[180px]">
                    <CharacterForm onChange={(character) => setAttacker(character)} />
                </div>
                <div className="flex w-full justify-center px-2">
                    <div className="flex gap-2">
                        <div className="text-yellow-400">{damage.normal.toFixed()}</div>
                        <div className="text-blue-400">{damage.critical.toFixed()}</div>
                    </div>
                </div>
                <div className="min-w-[180px]">
                    <CharacterForm onChange={(character) => setDefender(character)} />
                </div>
            </div>
        </div>
    )
}