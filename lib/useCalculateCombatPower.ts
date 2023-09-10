import { attackAttributes, AttackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'
import useFormatLocale from '@/lib/useFormatLocale'
import { CharacterBuildStats } from '@/app/data/builds'

export type CombatPower = {
    attack: {
        general: { formatted: string; value: number }
        pvp: { formatted: string; value: number }
        pve: { formatted: string; value: number }
        total: { formatted: string; value: number }
    }
    defense: {
        general: { formatted: string; value: number }
        pvp: { formatted: string; value: number }
        pve: { formatted: string; value: number }
        total: { formatted: string; value: number }
    }
    total: { formatted: string; value: number }
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

export const useCalculateCombatPower = () => {
    const { formatNumber } = useFormatLocale()

    return (characterStats: CharacterBuildStats, isMagicBased?: boolean): CombatPower => {
        const attackGeneralCombatPower = sumAttackAttributes(characterStats.attack.general, isMagicBased)
        const attackPvPCombatPower = sumAttackAttributes(characterStats.attack.pvp, isMagicBased)
        const attackPvECombatPower = sumAttackAttributes(characterStats.attack.pve, isMagicBased)
        const defenseGeneralCombatPower = sumDefenseAttributes(characterStats.defense.general)
        const defensePvPCombatPower = sumDefenseAttributes(characterStats.defense.pvp)
        const defensePvECombatPower = sumDefenseAttributes(characterStats.defense.pve)
        const attackTotal = attackGeneralCombatPower + attackPvPCombatPower + attackPvECombatPower
        const defenseTotal = defenseGeneralCombatPower + defensePvPCombatPower + defensePvECombatPower

        return {
            attack: {
                general: {
                    formatted: formatNumber(attackGeneralCombatPower),
                    value: attackGeneralCombatPower,
                },
                pvp: {
                    formatted: formatNumber(attackPvPCombatPower),
                    value: attackPvPCombatPower,
                },
                pve: {
                    formatted: formatNumber(attackPvECombatPower),
                    value: attackPvECombatPower,
                },
                total: {
                    formatted: formatNumber(attackTotal),
                    value: attackTotal,
                },
            },
            defense: {
                general: {
                    formatted: formatNumber(defenseGeneralCombatPower),
                    value: defenseGeneralCombatPower,
                },
                pvp: {
                    formatted: formatNumber(defensePvPCombatPower),
                    value: defensePvPCombatPower,
                },
                pve: {
                    formatted: formatNumber(defensePvECombatPower),
                    value: defensePvECombatPower,
                },
                total: {
                    formatted: formatNumber(defenseTotal),
                    value: defenseTotal,
                },
            },
            total: {
                formatted: formatNumber(attackTotal + defenseTotal),
                value: attackTotal + defenseTotal,
            },
        }
    }
}