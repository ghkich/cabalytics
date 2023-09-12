import { attackAttributes, AttackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'
import useFormatLocale from '@/lib/useFormatLocale'
import { CharacterBuild } from '@/app/data/builds'
import { DamageMode } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { isBattleStyleMagicBased } from '@/app/data/battleStyles'

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

export const calculateCombatPower = (build: CharacterBuild, damageMode?: DamageMode) => {
    const stats = build.data.stats
    const isMagicBased = isBattleStyleMagicBased(build.data.battleStyleType)
    const attackGeneralCombatPower = sumAttackAttributes(stats.attack.general, isMagicBased)
    const attackPvPCombatPower = sumAttackAttributes(stats.attack.pvp, isMagicBased)
    const attackPvECombatPower = sumAttackAttributes(stats.attack.pve, isMagicBased)
    const defenseGeneralCombatPower = sumDefenseAttributes(stats.defense.general)
    const defensePvPCombatPower = sumDefenseAttributes(stats.defense.pvp)
    const defensePvECombatPower = sumDefenseAttributes(stats.defense.pve)
    let attackTotal = attackGeneralCombatPower
    if (damageMode === 'pvp') attackTotal += attackPvPCombatPower
    if (damageMode === 'pve') attackTotal += attackPvECombatPower
    let defenseTotal = defenseGeneralCombatPower
    if (damageMode === 'pvp') defenseTotal += defensePvPCombatPower
    if (damageMode === 'pve') defenseTotal += defensePvECombatPower

    return {
        attackGeneralCombatPower,
        attackPvPCombatPower,
        attackPvECombatPower,
        defenseGeneralCombatPower,
        defensePvPCombatPower,
        defensePvECombatPower,
        attackTotal,
        defenseTotal,
        total: attackTotal + defenseTotal,
    }
}

export const useCalculateCombatPower = () => {
    const { formatNumber } = useFormatLocale()

    return (characterBuild: CharacterBuild, damageMode?: DamageMode): CombatPower => {
        const result = calculateCombatPower(characterBuild, damageMode)
        return {
            attack: {
                general: {
                    formatted: formatNumber(result.attackGeneralCombatPower),
                    value: result.attackGeneralCombatPower,
                },
                pvp: {
                    formatted: formatNumber(result.attackPvPCombatPower),
                    value: result.attackPvPCombatPower,
                },
                pve: {
                    formatted: formatNumber(result.attackPvECombatPower),
                    value: result.attackPvECombatPower,
                },
                total: {
                    formatted: formatNumber(result.attackTotal),
                    value: result.attackTotal,
                },
            },
            defense: {
                general: {
                    formatted: formatNumber(result.defenseGeneralCombatPower),
                    value: result.defenseGeneralCombatPower,
                },
                pvp: {
                    formatted: formatNumber(result.defensePvPCombatPower),
                    value: result.defensePvPCombatPower,
                },
                pve: {
                    formatted: formatNumber(result.defensePvECombatPower),
                    value: result.defensePvECombatPower,
                },
                total: {
                    formatted: formatNumber(result.defenseTotal),
                    value: result.defenseTotal,
                },
            },
            total: {
                formatted: formatNumber(result.total),
                value: result.total,
            },
        }
    }
}