import { NextResponse } from 'next/server'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'
import { Skill } from '@/app/[lang]/damage-calculator/SkillForm'

export type CalculateDamageRequest = {
    attacker: Attacker
    defender: Defender
    skill: Skill
}

export async function POST(request: Request) {
    const { attacker, skill, defender }: CalculateDamageRequest = await request.json()
    let ignorePenetration = Math.max(defender.ignorePenetration - attacker.cancelIgnorePenetration, 0)
    const penetration = Math.max(attacker.penetration + skill.penetration, 0)
    const ignoreDamageReduction = Math.max(attacker.ignoreDamageReduction - defender.cancelIgnoreDamageReduction, 0)
    const damageReduction = Math.max(defender.damageReduction - ignoreDamageReduction, 0)
    const resistSkillAmp = Math.max(defender.resistSkillAmp - attacker.ignoreResistSkillAmp, 0)
    const skillAmp = Math.max(attacker.skillAmp + skill.skillAmp - resistSkillAmp, 0)
    const resistCriticalDamage = Math.max(defender.resistCriticalDamage - attacker.ignoreResistCriticalDamage, 0)
    const criticalDamage = Math.max(attacker.criticalDamage + skill.criticalDamage - resistCriticalDamage, 0.25)

    const attack = attacker.attack * (1 + skillAmp)

    let finalDefense = defender.defense - skill.defenseReduction
    finalDefense += ignorePenetration * defender.penetrationArmorFactor
    finalDefense -= penetration * defender.penetrationArmorFactor
    finalDefense = Math.max(finalDefense, 0)

    const attackReduction = Math.max(
        1 - finalDefense / (defender.defense + defender.baselineArmor - skill.addAttack / 85),
        0
    )

    const damage = { normal: 0, critical: 0 }

    damage.normal = attack * attackReduction
    damage.critical = damage.normal * (1 + criticalDamage) * attacker.criticalEffectiveness
    const skillAddAttack = skill.addAttack * attackReduction

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
    damage.normal = damage.normal / 4.688

    damage.critical = damage.critical * (1 + attacker.finalDamageUp) * (1 - defender.finalDamageDown)
    damage.critical = Math.max(damage.critical, 1)
    damage.critical = damage.critical / 4.688

    return NextResponse.json(damage)
}