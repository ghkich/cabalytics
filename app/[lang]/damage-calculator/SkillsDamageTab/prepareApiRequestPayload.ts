import { CharacterBuild, CharacterBuildStats } from '@/app/data/builds'
import { AttackAttributes, DefenseAttributes } from '@/app/data/attributes'
import { battleStylesData } from '@/app/data/battleStyles'
import { Attacker, Defender } from '@/app/api/calculate-skills-damage/calculateSkillsDamage'

const getFinalAttackAttributeValue = (
    stats: CharacterBuildStats,
    attribute: keyof AttackAttributes,
    damageMode?: 'pve' | 'pvp'
) => {
    const generalAttribute = stats.attack?.general?.[attribute] || 0
    const pvpAttribute = stats.attack?.pvp?.[attribute] || 0
    const pveAttribute = stats.attack?.pve?.[attribute] || 0
    if (damageMode === 'pve') return Number(generalAttribute) + Number(pveAttribute)
    return Number(generalAttribute) + Number(pvpAttribute)
}

export const prepareAttacker = (attackBuild?: CharacterBuild): Attacker | undefined => {
    if (!attackBuild) return
    const buildStats = attackBuild.data.stats
    const battleStyleType = attackBuild.data.battleStyleType
    if (!battleStyleType) return
    const isAttackerMagicBased = battleStylesData[battleStyleType].isMagicBased
    return {
        battleStyleType,
        criticalEffectiveness: battleStylesData[battleStyleType].criticalEffectiveness,
        effectiveAttack: getFinalAttackAttributeValue(buildStats, isAttackerMagicBased ? 'magicAttack' : 'attack'),
        criticalDamage: getFinalAttackAttributeValue(buildStats, 'criticalDamage') / 100,
        criticalRate: getFinalAttackAttributeValue(buildStats, 'criticalRate') / 100,
        effectiveSkillAmp:
            getFinalAttackAttributeValue(buildStats, isAttackerMagicBased ? 'magicSkillAmp' : 'swordSkillAmp') / 100,
        penetration: getFinalAttackAttributeValue(buildStats, 'penetration'),
        addDamage: getFinalAttackAttributeValue(buildStats, 'addDamage'),
        finalDamageUp: getFinalAttackAttributeValue(buildStats, 'finalDamageUp') / 100,
        ignoreDamageReduction: getFinalAttackAttributeValue(buildStats, 'ignoreDamageReduction'),
        ignoreResistCriticalDamage: getFinalAttackAttributeValue(buildStats, 'ignoreResistCriticalDamage') / 100,
        ignoreResistCriticalRate: getFinalAttackAttributeValue(buildStats, 'ignoreResistCriticalRate') / 100,
        ignoreResistSkillAmp: getFinalAttackAttributeValue(buildStats, 'ignoreResistSkillAmp') / 100,
        normalDamageUp: getFinalAttackAttributeValue(buildStats, 'normalDamageUp') / 100,
        cancelIgnorePenetration: getFinalAttackAttributeValue(buildStats, 'cancelIgnorePenetration'),
        attackRate: getFinalAttackAttributeValue(buildStats, 'attackRate') / 100,
        accuracy: getFinalAttackAttributeValue(buildStats, 'accuracy') / 100,
        minimumDamage: getFinalAttackAttributeValue(buildStats, 'minimumDamage'),
        ignoreEvasion: getFinalAttackAttributeValue(buildStats, 'ignoreEvasion'),
    }
}

const getFinalDefenseAttributeValue = (
    stats: CharacterBuildStats,
    attribute: keyof DefenseAttributes,
    damageMode?: 'pve' | 'pvp'
) => {
    const generalAttribute = stats.defense?.general?.[attribute] ?? 0
    const pvpAttribute = stats.defense?.pvp?.[attribute] ?? 0
    const pveAttribute = stats.defense?.pve?.[attribute] ?? 0
    if (damageMode === 'pve') return Number(generalAttribute) + Number(pveAttribute)
    return Number(generalAttribute) + Number(pvpAttribute)
}

export const prepareDefender = (defenseBuild?: CharacterBuild, attackBuild?: CharacterBuild): Defender | undefined => {
    if (!defenseBuild || !attackBuild) return
    const buildStats = defenseBuild.data.stats
    const battleStyleType = defenseBuild.data.battleStyleType
    const attackerBattleStyle = attackBuild.data.battleStyleType
    if (!battleStyleType || !attackerBattleStyle) return
    const isAttackerMagicBased = battleStylesData[attackerBattleStyle].isMagicBased
    return {
        penetrationArmorFactor: battleStylesData[battleStyleType].penetrationArmorFactor,
        baselineArmor: battleStylesData[battleStyleType].baselineArmor,
        hp: getFinalDefenseAttributeValue(buildStats, 'hp'),
        defense: getFinalDefenseAttributeValue(buildStats, 'defense'),
        defenseRate: getFinalDefenseAttributeValue(buildStats, 'defenseRate') / 100,
        evasion: getFinalDefenseAttributeValue(buildStats, 'evasion') / 100,
        damageReduction: getFinalDefenseAttributeValue(buildStats, 'damageReduction'),
        resistCriticalRate: getFinalDefenseAttributeValue(buildStats, 'resistCriticalRate') / 100,
        resistCriticalDamage: getFinalDefenseAttributeValue(buildStats, 'resistCriticalDamage') / 100,
        effectiveResistSkillAmp:
            getFinalDefenseAttributeValue(
                buildStats,
                isAttackerMagicBased ? 'resistMagicSkillAmp' : 'resistSwordSkillAmp'
            ) / 100,
        ignorePenetration: getFinalDefenseAttributeValue(buildStats, 'ignorePenetration'),
        ignoreAccuracy: getFinalDefenseAttributeValue(buildStats, 'ignoreAccuracy'),
        cancelIgnoreDamageReduction: getFinalDefenseAttributeValue(buildStats, 'cancelIgnoreDamageReduction'),
        cancelIgnoreEvasion: getFinalDefenseAttributeValue(buildStats, 'cancelIgnoreEvasion'),
        finalDamageDown: getFinalDefenseAttributeValue(buildStats, 'finalDamageDown') / 100,
    }
}