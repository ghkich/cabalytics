import { Skill } from '@/app/data/skills'
import { BattleStyleTypes } from '@/app/data/battleStyles'
import { AttackAttributes, DefenseAttributes } from '@/app/data/attributes'

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
    // Calculate penetration factors
    const ignorePenetration = Math.max(defender.ignorePenetration - attacker.cancelIgnorePenetration, 0)
    const penetration = Math.max(attacker.penetration + (skill.data.stats.penetration || 0), 0)

    // Calculate damage reduction factors
    const ignoreDamageReduction = Math.max(attacker.ignoreDamageReduction - defender.cancelIgnoreDamageReduction, 0)
    const damageReduction = Math.max(defender.damageReduction - ignoreDamageReduction, 0)

    // Calculate skill amplification factors
    const resistSkillAmp = Math.max(defender.effectiveResistSkillAmp - attacker.ignoreResistSkillAmp, 0)
    const skillAmp = Math.max(attacker.effectiveSkillAmp + skill.data.stats.skillAmp / 100 - resistSkillAmp, 0)

    // Calculate critical damage factors
    const resistCriticalDamage = Math.max(defender.resistCriticalDamage - attacker.ignoreResistCriticalDamage, 0)
    const criticalDamage = Math.max(
        attacker.criticalDamage + (skill.data.stats.criticalDamage || 0) / 100 - resistCriticalDamage,
        0.25
    )

    const DEFENSE_CORRECTION_FACTOR = 85

    // Calculate effective attack
    const attack = attacker.effectiveAttack * (1 + skillAmp)

    // Calculate final defense
    let finalDefense = defender.defense - (skill.data.stats.defenseReduction || 0)
    finalDefense += ignorePenetration * defender.penetrationArmorFactor
    finalDefense -= penetration * defender.penetrationArmorFactor
    finalDefense = Math.max(finalDefense, 0)

    // Calculate attack reduction
    const attackReduction = Math.max(
        1 -
            finalDefense /
                (defender.defense + defender.baselineArmor - skill.data.stats.addAttack / DEFENSE_CORRECTION_FACTOR),
        0
    )

    const damage = {
        normal: 0,
        average: 0,
        critical: 0,
        averageDps: 0,
        averageDpsCombo: 0,
    }

    damage.normal = attack * attackReduction
    damage.critical = damage.normal * (1 + criticalDamage) * attacker.criticalEffectiveness
    const skillAddAttack = skill.data.stats.addAttack * attackReduction

    damage.normal *= 1 + attacker.normalDamageUp
    damage.normal += skillAddAttack
    damage.normal -= damageReduction
    damage.normal = Math.max(damage.normal, 0)
    damage.normal += attacker.addDamage

    damage.critical += skillAddAttack
    damage.critical -= damageReduction
    damage.critical = Math.max(damage.critical, 0)
    damage.critical += attacker.addDamage
    damage.critical = Math.max(damage.critical, damage.normal)

    damage.normal = damage.normal * (1 + attacker.finalDamageUp) * (1 - defender.finalDamageDown)
    damage.normal = Math.max(damage.normal, 1)
    damage.normal = damage.normal / getDamageDivisor(defender.type)

    damage.critical = damage.critical * (1 + attacker.finalDamageUp) * (1 - defender.finalDamageDown)
    damage.critical = Math.max(damage.critical, 1)
    damage.critical = damage.critical / getDamageDivisor(defender.type)

    damage.average = damage.normal * (1 - attacker.criticalRate) + damage.critical * attacker.criticalRate

    damage.averageDps = damage.average / skill.data.comboCastingTime
    damage.averageDpsCombo = damage.average / skill.data.castingTime

    return damage
}