'use client'
import React, { createContext } from 'react'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'
import useMergeState from '@/lib/useMergeState'

export type DamageMode = 'pvp' | 'pve'
export type Damage = {
    normal: number
    average: number
    critical: number
    averageDps: number
    averageDpsCombo: number
}

export type SkillsTabState = {
    comboActive: boolean
    selectedSkills: Record<string, Damage>
}

export type DamageCalculatorContext = {
    attacker?: Attacker
    setAttacker: (attacker: Attacker) => void
    defender?: Defender
    setDefender: (defender: Defender) => void
    skillsTab: SkillsTabState
    updateSkillsTab: React.Dispatch<Partial<SkillsTabState>>
}

const initialState: DamageCalculatorContext = {
    setAttacker: () => {},
    setDefender: () => {},
    skillsTab: {
        comboActive: true,
        selectedSkills: {},
    },
    updateSkillsTab: () => {},
}

const DamageCalculatorContext = createContext<DamageCalculatorContext>(initialState)
export const DamageCalculatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [attacker, setAttacker] = React.useState<Attacker>()
    const [defender, setDefender] = React.useState<Defender>()
    const [skillsTab, updateSkillsTab] = useMergeState<SkillsTabState>(initialState.skillsTab)

    return (
        <DamageCalculatorContext.Provider
            value={{
                attacker,
                setAttacker,
                defender,
                setDefender,
                skillsTab,
                updateSkillsTab,
            }}
        >
            {children}
        </DamageCalculatorContext.Provider>
    )
}

export const useDamageCalculator = () => {
    return React.useContext(DamageCalculatorContext)
}