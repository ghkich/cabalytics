import { CharacterStats } from '@/app/[lang]/components/CharacterForm'
import { attackAttributes, AttackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'
import useFormatLocale from '@/lib/useFormatLocale'
import React from 'react'

export type CombatPower = {
    attack: {
        general: string
        pvp: string
        pve: string
        total: string
    }
    defense: {
        general: string
        pvp: string
        pve: string
        total: string
    }
    total: string
}

const sumAttackAttributes = (attributes: AttackAttributes, isMagicBased?: boolean) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof AttackAttributes
        let attributeScore = attackAttributes[attributeKey].score
        if (isMagicBased && attributeKey === 'attack') attributeScore = 0
        if (!isMagicBased && attributeKey === 'magicAttack') attributeScore = 0
        if (isMagicBased && attributeKey === 'swordSkillAmp') attributeScore = 0
        if (!isMagicBased && attributeKey === 'magicSkillAmp') attributeScore = 0
        return acc + value * attributeScore
    }, 0)
}

const sumDefenseAttributes = (attributes: DefenseAttributes) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof DefenseAttributes
        let attributeScore = defenseAttributes[attributeKey].score
        return acc + value * attributeScore
    }, 0)
}

export const useCombatPower = (characterStats: CharacterStats, isMagicBased?: boolean): CombatPower => {
    const { formatNumber } = useFormatLocale()

    const attackGeneralCombatPower = React.useMemo(
        () => sumAttackAttributes(characterStats.attack.general, isMagicBased),
        [characterStats.attack.general, isMagicBased]
    )
    const attackPvPCombatPower = React.useMemo(
        () => sumAttackAttributes(characterStats.attack.pvp, isMagicBased),
        [characterStats.attack.pvp, isMagicBased]
    )
    const attackPvECombatPower = React.useMemo(
        () => sumAttackAttributes(characterStats.attack.pve, isMagicBased),
        [characterStats.attack.pve, isMagicBased]
    )
    const defenseGeneralCombatPower = React.useMemo(
        () => sumDefenseAttributes(characterStats.defense.general),
        [characterStats.defense.general]
    )
    const defensePvPCombatPower = React.useMemo(
        () => sumDefenseAttributes(characterStats.defense.pvp),
        [characterStats.defense.pvp]
    )
    const defensePvECombatPower = React.useMemo(
        () => sumDefenseAttributes(characterStats.defense.pve),
        [characterStats.defense.pve]
    )

    const attackTotal = attackGeneralCombatPower + attackPvPCombatPower + attackPvECombatPower
    const defenseTotal = defenseGeneralCombatPower + defensePvPCombatPower + defensePvECombatPower

    return {
        attack: {
            general: formatNumber(attackGeneralCombatPower),
            pvp: formatNumber(attackPvPCombatPower),
            pve: formatNumber(attackPvECombatPower),
            total: formatNumber(attackTotal),
        },
        defense: {
            general: formatNumber(defenseGeneralCombatPower),
            pvp: formatNumber(defensePvPCombatPower),
            pve: formatNumber(defensePvECombatPower),
            total: formatNumber(defenseTotal),
        },
        total: formatNumber(attackTotal + defenseTotal),
    }
}