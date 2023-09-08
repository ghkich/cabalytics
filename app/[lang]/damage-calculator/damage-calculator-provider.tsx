'use client'
import React, { createContext, useReducer } from 'react'
import { Attacker } from '@/app/[lang]/damage-calculator/AttackerForm'
import { Defender } from '@/app/[lang]/damage-calculator/DefenderForm'

export type DamageMode = 'pvp' | 'pve'
export type Damage = {
    normal: number
    average: number
    critical: number
    averageDps: number
    averageDpsCombo: number
}

export type SkillsDamage = Record<string, Damage>

export type SkillsTabState = {
    comboActive: boolean
    selectedSkills: string[]
    skillsDamage: SkillsDamage
}

export type DamageCalculatorContext = {
    attacker?: Attacker
    setAttacker: (attacker: Attacker) => void
    defender?: Defender
    setDefender: (defender: Defender) => void
    skillsTab: SkillsTabState
    skillsTabDispatch: React.Dispatch<Action>
}

const initialState: DamageCalculatorContext = {
    setAttacker: () => {},
    setDefender: () => {},
    skillsTab: {
        comboActive: true,
        selectedSkills: [],
        skillsDamage: {},
    },
    skillsTabDispatch: () => {},
}

type ToggleComboActiveAction = {
    type: 'TOGGLE_COMBO_ACTIVE'
}

type UpdateSkillsDamageAction = {
    type: 'UPDATE_SKILLS_DAMAGE'
    payload: SkillsDamage
}

type UpdateSelectedSkillsAction = {
    type: 'UPDATE_SELECTED_SKILLS'
    payload: string[]
}

type Action = ToggleComboActiveAction | UpdateSkillsDamageAction | UpdateSelectedSkillsAction

const skillsTabReducer = (state: SkillsTabState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_COMBO_ACTIVE':
            return { ...state, comboActive: !state.comboActive }
        case 'UPDATE_SKILLS_DAMAGE':
            return { ...state, skillsDamage: { ...state.skillsDamage, ...action.payload } }
        case 'UPDATE_SELECTED_SKILLS':
            return { ...state, selectedSkills: action.payload }
        default:
            return state
    }
}

const DamageCalculatorContext = createContext<DamageCalculatorContext>(initialState)
export const DamageCalculatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [attacker, setAttacker] = React.useState<Attacker>()
    const [defender, setDefender] = React.useState<Defender>()
    const [skillsTab, skillsTabDispatch] = useReducer(skillsTabReducer, initialState.skillsTab)

    return (
        <DamageCalculatorContext.Provider
            value={{
                attacker,
                setAttacker,
                defender,
                setDefender,
                skillsTab,
                skillsTabDispatch,
            }}
        >
            {children}
        </DamageCalculatorContext.Provider>
    )
}

export const useDamageCalculator = () => {
    return React.useContext(DamageCalculatorContext)
}