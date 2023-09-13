import { CharacterBuild } from '@/app/data/builds'
import { DamageMode } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { isBattleStyleMagicBased } from '@/app/data/battleStyles'
import { attackAttributes, AttackAttributes, defenseAttributes, DefenseAttributes } from '@/app/data/attributes'

export const sumAttackAttributes = (attributes: AttackAttributes, isMagicBased?: boolean) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof AttackAttributes
        let attributeScore = attackAttributes[attributeKey].score
        if (isMagicBased !== undefined) {
            if (isMagicBased && attributeKey === 'attack') attributeScore = 0
            if (!isMagicBased && attributeKey === 'magicAttack') attributeScore = 0
            if (isMagicBased && attributeKey === 'swordSkillAmp') attributeScore = 0
            if (!isMagicBased && attributeKey === 'magicSkillAmp') attributeScore = 0
        }
        return acc + value * attributeScore
    }, 0)
}

export const sumDefenseAttributes = (attributes: DefenseAttributes) => {
    return Object.entries(attributes).reduce((acc, [key, value]) => {
        const attributeKey = key as keyof DefenseAttributes
        let attributeScore = defenseAttributes[attributeKey].score
        return acc + value * attributeScore
    }, 0)
}

export const calculateCombatPower = (build: CharacterBuild, damageMode?: DamageMode) => {
    const stats = build.data.stats
    const isMagicBased = isBattleStyleMagicBased(build.data.battleStyleType)
    const attackGeneral = sumAttackAttributes(stats.attack.general, isMagicBased)
    const attackPvP = sumAttackAttributes(stats.attack.pvp, isMagicBased)
    const attackPvE = sumAttackAttributes(stats.attack.pve, isMagicBased)
    const defenseGeneral = sumDefenseAttributes(stats.defense.general)
    const defensePvP = sumDefenseAttributes(stats.defense.pvp)
    const defensePvE = sumDefenseAttributes(stats.defense.pve)
    let attackTotal = attackGeneral
    if (damageMode === 'pvp') attackTotal += attackPvP
    if (damageMode === 'pve') attackTotal += attackPvE
    let defenseTotal = defenseGeneral
    if (damageMode === 'pvp') defenseTotal += defensePvP
    if (damageMode === 'pve') defenseTotal += defensePvE

    return {
        attack: {
            general: attackGeneral,
            pvp: attackPvP,
            pve: attackPvE,
            total: attackTotal,
        },
        defense: {
            general: defenseGeneral,
            pvp: defensePvP,
            pve: defensePvE,
            total: defenseTotal,
        },
        total: attackTotal + defenseTotal,
    }
}