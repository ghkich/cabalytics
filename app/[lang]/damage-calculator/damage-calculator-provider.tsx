'use client'
import React, { createContext } from 'react'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'
import { Damage } from '@/app/api/calculate-damage/route'

export type DamageMode = 'pvp' | 'pve'
export type SkillsDamage = Record<string, Damage>

export type DamageCalculatorContext = {
    attacker?: Attacker
    setAttacker: (attacker: Attacker) => void
    defender?: Defender
    setDefender: (defender: Defender) => void
    skillsDamage?: Record<string, Damage>
    setSkillsDamage: React.Dispatch<React.SetStateAction<SkillsDamage>>
}

const initialState: DamageCalculatorContext = {
    setAttacker: () => {},
    setDefender: () => {},
    setSkillsDamage: () => {},
}

const DamageCalculatorContext = createContext<DamageCalculatorContext>(initialState)
export const DamageCalculatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [attacker, setAttacker] = React.useState<Attacker>()
    const [defender, setDefender] = React.useState<Defender>()
    const [skillsDamage, setSkillsDamage] = React.useState<SkillsDamage>({})

    return (
        <DamageCalculatorContext.Provider
            value={{
                attacker,
                setAttacker,
                defender,
                setDefender,
                skillsDamage,
                setSkillsDamage,
            }}
        >
            {children}
        </DamageCalculatorContext.Provider>
    )
}

export const useDamageCalculator = () => {
    return React.useContext(DamageCalculatorContext)
}