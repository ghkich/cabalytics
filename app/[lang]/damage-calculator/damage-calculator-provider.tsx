'use client'
import React, { createContext, useEffect } from 'react'
import { Skill } from '@/app/api/calculate-damage/route'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'

export type DamageMode = 'pvp' | 'pve'

export type DamageResult = {
    normal: number
    critical: number
}

export type DamageCalculatorContext = {
    attacker?: Attacker
    setAttacker: (attacker: Attacker) => void
    defender?: Defender
    setDefender: (defender: Defender) => void
    skill?: Skill
    setSkill: (skill: Skill) => void
    damage: DamageResult
    setDamage: (damage: DamageResult) => void
}

const initialState: DamageCalculatorContext = {
    damage: {
        normal: 0,
        critical: 0,
    },
    setDamage: () => {},
    setAttacker: () => {},
    setDefender: () => {},
    setSkill: () => {},
}

const DamageCalculatorContext = createContext<DamageCalculatorContext>(initialState)

export const DamageCalculatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [attacker, setAttacker] = React.useState<Attacker>()
    const [defender, setDefender] = React.useState<Defender>()
    const [skill, setSkill] = React.useState<Skill>()
    const [damage, setDamage] = React.useState({ normal: 0, critical: 0 })

    useEffect(() => {
        if (!attacker || !defender || !skill) return
        fetch('/api/calculate-damage', { method: 'POST', body: JSON.stringify({ attacker, defender, skill }) })
            .then((res) => res.json())
            .then((data) => {
                setDamage(data)
            })
    }, [attacker, defender, skill])

    return (
        <DamageCalculatorContext.Provider
            value={{ attacker, setAttacker, defender, setDefender, skill, setSkill, damage, setDamage }}
        >
            {children}
        </DamageCalculatorContext.Provider>
    )
}

export const useDamageCalculator = () => {
    return React.useContext(DamageCalculatorContext)
}