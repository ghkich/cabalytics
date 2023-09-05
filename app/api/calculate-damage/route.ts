import { NextResponse } from 'next/server'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'
import { Skill } from '@/app/types/skills'

export type CalculateDamageRequest = {
    attacker: Attacker
    defender: Defender
    skill: Skill
}

export type Damage = {
    normal: number
    average: number
    critical: number
}
const validateParams = (params: CalculateDamageRequest) => {
    const { attacker, skill, defender } = params

    if (!attacker) return { isValid: false, missingParam: 'attacker' }
    if (!skill) return { isValid: false, missingParam: 'skill' }
    if (!defender) return { isValid: false, missingParam: 'defender' }

    return { isValid: true, missingParam: null }
}

export async function POST(request: Request) {
    const params: CalculateDamageRequest = await request.json()
    const { isValid, missingParam } = validateParams(params)
    if (!isValid) {
        return NextResponse.json({ message: `Missing ${missingParam}` }, { status: 400 })
    }
    const { attacker, skill, defender } = params
    let ignorePenetration = Math.max(defender.ignorePenetration - attacker.cancelIgnorePenetration, 0)
    const penetration = Math.max(attacker.penetration + (skill?.penetration || 0), 0)
    const ignoreDamageReduction = Math.max(attacker.ignoreDamageReduction - defender.cancelIgnoreDamageReduction, 0)
    const damageReduction = Math.max(defender.damageReduction - ignoreDamageReduction, 0)
    const resistSkillAmp = Math.max(defender.resistSkillAmp - attacker.ignoreResistSkillAmp, 0)
    const skillAmp = Math.max(attacker.skillAmp + skill.skillAmp - resistSkillAmp, 0)
    const resistCriticalDamage = Math.max(defender.resistCriticalDamage - attacker.ignoreResistCriticalDamage, 0)
    const criticalDamage = Math.max(attacker.criticalDamage + (skill?.criticalDamage || 0) - resistCriticalDamage, 0.25)

    const attack = attacker.attack * (1 + skillAmp)

    let finalDefense = defender.defense - (skill?.defenseReduction || 0)
    finalDefense += ignorePenetration * defender.penetrationArmorFactor
    finalDefense -= penetration * defender.penetrationArmorFactor
    finalDefense = Math.max(finalDefense, 0)

    const attackReduction = Math.max(
        1 - finalDefense / (defender.defense + defender.baselineArmor - skill.addAttack / 85),
        0
    )

    const damage: Damage = { normal: 0, average: 0, critical: 0 }

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

    damage.average = damage.normal * (1 - attacker.criticalRate) + damage.critical * attacker.criticalRate

    return NextResponse.json(damage)
}