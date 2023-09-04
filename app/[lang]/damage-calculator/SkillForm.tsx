'use client'
import React, { useEffect } from 'react'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export type Skill = {
    skillAmp: number
    addAttack: number
    criticalDamage: number
    defenseReduction: number
    penetration: number
}
export const SkillForm = () => {
    const { setSkill } = useDamageCalculator()

    useEffect(() => {
        setSkill({
            skillAmp: 0,
            addAttack: 0,
            criticalDamage: 0,
            defenseReduction: 0,
            penetration: 0,
        })
    }, [setSkill])

    return <div>Skill</div>
}