import { NextResponse } from 'next/server'
import { Skill } from '@/app/data/skills'
import { Attacker, calculateSkillsDamage, Defender } from '@/app/api/calculate-skills-damage/calculateSkillsDamage'

export type CalculateSkillsDamageRequest = {
    attacker: Attacker
    defender: Defender
    skills: Skill[]
}

export type CalculateSkillsDamageResponse = Record<
    string,
    {
        normal: number
        average: number
        critical: number
        averageDps: number
        averageDpsCombo: number
    }
>

const validateParams = (params: CalculateSkillsDamageRequest) => {
    const { attacker, skills, defender } = params

    if (!attacker) return { isValid: false, missingParam: 'attacker' }
    if (!skills) return { isValid: false, missingParam: 'skills' }
    if (!defender) return { isValid: false, missingParam: 'defender' }

    return { isValid: true, missingParam: null }
}

export async function POST(request: Request) {
    const params: CalculateSkillsDamageRequest = await request.json()
    const { isValid, missingParam } = validateParams(params)
    if (!isValid) {
        return NextResponse.json({ message: `Missing ${missingParam}` }, { status: 400 })
    }
    const { attacker, defender, skills } = params
    const skillsDamage: CalculateSkillsDamageResponse = {}

    skills?.forEach((skill) => {
        skillsDamage[skill.id] = calculateSkillsDamage(attacker, defender, skill)
    })

    return NextResponse.json(skillsDamage)
}