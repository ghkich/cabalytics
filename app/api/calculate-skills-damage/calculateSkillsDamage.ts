import { Skill } from '@/app/data/skills'
import { BattleStyleTypes } from '@/app/data/battleStyles'
import { AttackAttributes, DefenseAttributes } from '@/app/data/attributes'
import {
    calculateAttackReduction,
    calculateCriticalDamage,
    calculateCriticalRate,
    calculateDamageReduction,
    calculateFinalDefense,
    calculatePenetration,
    calculateSkillAmplification,
} from '@/app/api/calculate-skills-damage/calculateAttributeFactors'

export type Attacker = {
    battleStyleType: BattleStyleTypes
    effectiveAttack: number
    effectiveSkillAmp: number
    criticalEffectiveness: number
} & Omit<AttackAttributes, 'swordSkillAmp' | 'magicSkillAmp' | 'attack' | 'magicAttack'>

export type Defender = {
    type: 'player' | 'monster'
    penetrationArmorFactor: number
    baselineArmor: number
    effectiveResistSkillAmp: number
} & Omit<DefenseAttributes, 'resistSkillAmp' | 'resistMagicSkillAmp' | 'resistSwordSkillAmp'>

const getDamageDivisor = (defenderType: Defender['type']) => (defenderType === 'player' ? 4.688 : 1)

export function calculateSkillsDamage(attacker: Attacker, defender: Defender, skill: Skill) {
    const { ignorePenetration, penetration } = calculatePenetration(attacker, defender, skill)
    const { damageReduction } = calculateDamageReduction(attacker, defender)
    const { skillAmp } = calculateSkillAmplification(attacker, defender, skill)
    const { criticalRate } = calculateCriticalRate(attacker, defender, skill)
    const { criticalDamage } = calculateCriticalDamage(attacker, defender, skill)

    const attackAmplified = attacker.effectiveAttack * (1 + skillAmp)

    const finalDefense = calculateFinalDefense(defender, skill, ignorePenetration, penetration)
    const attackReduction = calculateAttackReduction(defender, skill, finalDefense)

    const damage = { normal: 0, average: 0, critical: 0, averageDps: 0, averageDpsCombo: 0 }

    // Compute the base normal and critical damage
    damage.normal = attackAmplified * attackReduction
    damage.critical = damage.normal * (1 + criticalDamage) * attacker.criticalEffectiveness

    // Compute additional attack for the skill
    const skillAddAttack = skill.data.stats.addAttack + (skill.data.stats.addAttackPerRage || 0) * 10 * attackReduction

    // Adjust normal damage
    damage.normal *= 1 + attacker.normalDamageUp / 100
    damage.normal += skillAddAttack
    damage.normal -= damageReduction
    damage.normal = Math.max(damage.normal, 0)
    damage.normal += attacker.addDamage

    // Adjust critical damage
    damage.critical += skillAddAttack
    damage.critical -= damageReduction
    damage.critical = Math.max(damage.critical, 0)
    damage.critical += attacker.addDamage
    damage.critical = Math.max(damage.critical, damage.normal)

    // Apply final damage multipliers for normal and critical damage
    const finalDamageMultiplier = (1 + attacker.finalDamageUp / 100) * (1 - defender.finalDamageDown / 100)
    damage.normal *= finalDamageMultiplier
    damage.critical *= finalDamageMultiplier

    // Divide by type-specific damage divisor
    const damageDivisor = getDamageDivisor(defender.type)
    damage.normal /= damageDivisor
    damage.critical /= damageDivisor

    // Ensure minimum damage
    damage.normal = Math.max(damage.normal, 1)
    damage.critical = Math.max(damage.critical, 1)

    // Calculate average damage
    damage.average = damage.normal * (1 - criticalRate) + damage.critical * criticalRate

    // Calculate DPS
    const continuousDamage = skill.data.continuousDamage?.value || 0
    damage.averageDps = damage.average / skill.data.castingTime + continuousDamage
    damage.averageDpsCombo = damage.average / skill.data.comboCastingTime + continuousDamage

    return damage
}