import { Attacker, Defender } from '@/app/api/calculate-skills-damage/calculateSkillsDamage'
import { Skill } from '@/app/data/skills'

export function calculatePenetration(attacker: Attacker, defender: Defender, skill: Skill) {
    // Calculate the components that make up ignorePenetration
    const baseIgnorePenetration = defender.ignorePenetration
    const skillIgnorePenetration = skill.data.debuffs?.ignorePenetration || 0
    const cancelIgnorePenetration = attacker.cancelIgnorePenetration
    // Sum the components and ensure the result is not less than zero
    const summedIgnorePenetration = baseIgnorePenetration + skillIgnorePenetration - cancelIgnorePenetration
    const ignorePenetration = Math.max(summedIgnorePenetration, 0)
    // Calculate the components that make up penetration
    const basePenetration = attacker.penetration
    const skillPenetration = skill.data.stats.penetration || 0
    // Sum the components and ensure the result is not less than zero
    const summedPenetration = basePenetration + skillPenetration
    const penetration = Math.max(summedPenetration, 0)
    return { ignorePenetration, penetration }
}

export function calculateDamageReduction(attacker: Attacker, defender: Defender) {
    // Calculate the components for ignoreDamageReduction
    const baseIgnoreDamageReduction = attacker.ignoreDamageReduction
    const cancelIgnoreDamageReduction = defender.cancelIgnoreDamageReduction
    // Calculate ignoreDamageReduction and ensure it's not less than zero
    const summedIgnoreDamageReduction = baseIgnoreDamageReduction - cancelIgnoreDamageReduction
    const ignoreDamageReduction = Math.max(summedIgnoreDamageReduction, 0)
    // Calculate the components for damageReduction
    const baseDamageReduction = defender.damageReduction
    // Calculate damageReduction and ensure it's not less than zero
    const summedDamageReduction = baseDamageReduction - ignoreDamageReduction
    const damageReduction = Math.max(summedDamageReduction, 0)
    return { ignoreDamageReduction, damageReduction }
}

export function calculateSkillAmplification(attacker: Attacker, defender: Defender, skill: Skill) {
    // Calculate the components that make up resistSkillAmp
    const baseEffectiveResistSkillAmp = defender.effectiveResistSkillAmp
    const attackerIgnoreResistSkillAmp = attacker.ignoreResistSkillAmp
    const skillIgnoreResistSkillAmp = skill.data.stats.ignoreResistSkillAmp || 0
    // Calculate resistSkillAmp and ensure it's not less than zero
    const summedIgnoreResistSkillAmp = attackerIgnoreResistSkillAmp + skillIgnoreResistSkillAmp
    const resistSkillAmpValue = baseEffectiveResistSkillAmp - summedIgnoreResistSkillAmp
    const resistSkillAmp = Math.max(resistSkillAmpValue, 0)
    // Calculate the components that make up skillAmp
    const baseEffectiveSkillAmp = attacker.effectiveSkillAmp
    const skillSkillAmp = skill.data.stats.skillAmp || 0
    // Calculate skillAmp and ensure it's not less than zero
    const skillAmpValue = (baseEffectiveSkillAmp + skillSkillAmp - resistSkillAmp) / 100
    const skillAmp = Math.max(skillAmpValue, 0)
    return { resistSkillAmp, skillAmp }
}

export function calculateCriticalRate(attacker: Attacker, defender: Defender, skill: Skill) {
    // Calculate the components that make up resistCriticalRate
    const baseResistCriticalRate = defender.resistCriticalRate
    const skillResistCriticalRate = skill.data.debuffs?.resistCriticalRate || 0
    const attackerIgnoreResistCriticalRate = attacker.ignoreResistCriticalRate
    // Calculate resistCriticalRate and ensure it's not less than zero
    const summedResistCriticalRate = baseResistCriticalRate + skillResistCriticalRate - attackerIgnoreResistCriticalRate
    const resistCriticalRate = Math.max(summedResistCriticalRate, 0)
    // Calculate the components that make up criticalRate
    const baseCriticalRate = attacker.criticalRate
    // Calculate criticalRate and ensure it's not less than zero
    const criticalRateValue = (baseCriticalRate - resistCriticalRate) / 100
    const criticalRate = Math.max(criticalRateValue, 0)
    return { resistCriticalRate, criticalRate }
}

export function calculateCriticalDamage(attacker: Attacker, defender: Defender, skill: Skill) {
    // Calculate the components that make up resistCriticalDamage
    const baseResistCriticalDamage = defender.resistCriticalDamage
    const skillResistCriticalDamage = skill.data.debuffs?.resistCriticalDamage || 0
    const attackerIgnoreResistCriticalDamage = attacker.ignoreResistCriticalDamage
    // Calculate resistCriticalDamage and ensure it's not less than zero
    const summedResistCriticalDamage =
        baseResistCriticalDamage + skillResistCriticalDamage - attackerIgnoreResistCriticalDamage
    const resistCriticalDamage = Math.max(summedResistCriticalDamage, 0)
    // Calculate the components that make up criticalDamage
    const baseCriticalDamage = attacker.criticalDamage
    const skillCriticalDamage = skill.data.stats.criticalDamage || 0
    // Calculate criticalDamage and ensure it's not less than 0.25
    const criticalDamageValue = (baseCriticalDamage + skillCriticalDamage - resistCriticalDamage) / 100
    const criticalDamage = Math.max(criticalDamageValue, 0.25)
    return { resistCriticalDamage, criticalDamage }
}

export function calculateFinalDefense(
    defender: Defender,
    skill: Skill,
    ignorePenetration: number,
    penetration: number
) {
    // Calculate the initial defense, accounting for skill debuffs
    const initialDefense = Math.max(defender.defense + (skill.data.debuffs?.defense || 0), 0)

    // Calculate the adjustments for ignorePenetration and penetration
    const ignorePenetrationAdjustment = ignorePenetration * defender.penetrationArmorFactor
    const penetrationAdjustment = penetration * defender.penetrationArmorFactor

    // Calculate final defense and ensure it's not less than zero
    let finalDefenseValue = initialDefense + ignorePenetrationAdjustment - penetrationAdjustment

    return Math.max(finalDefenseValue, 0)
}

export function calculateAttackReduction(defender: Defender, skill: Skill, finalDefense: number) {
    const DEFENSE_CORRECTION_FACTOR = 85
    // Calculate the denominator for attack reduction, accounting for defender and skill factors
    const defenseBaselineArmor = defender.defense + defender.baselineArmor
    const skillAddAttackFactor = skill.data.stats.addAttack / DEFENSE_CORRECTION_FACTOR
    // Calculate attack reduction and ensure it's not less than zero
    const attackReductionValue = 1 - finalDefense / (defenseBaselineArmor - skillAddAttackFactor)
    return Math.max(attackReductionValue, 0)
}