import { v4 as uuidv4 } from 'uuid'
import { AttackAttributes, DefenseAttributes } from '@/app/data/attributes'
import { BattleStyleTypes } from '@/app/data/battleStyles'

export const initialAttackAttributes: AttackAttributes = {
    attack: 4000,
    magicAttack: 4000,
    attackRate: 6500,
    criticalRate: 50,
    criticalDamage: 200,
    swordSkillAmp: 125,
    magicSkillAmp: 125,
    accuracy: 750,
    penetration: 300,
    minimumDamage: 0,
    addDamage: 100,
    ignoreEvasion: 450,
    finalDamageUp: 0,
    ignoreDamageReduction: 50,
    ignoreResistCriticalRate: 5,
    ignoreResistCriticalDamage: 10,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 25,
    cancelIgnorePenetration: 0,
}

export const zeroAttackAttributes: AttackAttributes = {
    attack: 0,
    magicAttack: 0,
    attackRate: 0,
    criticalRate: 0,
    criticalDamage: 0,
    swordSkillAmp: 0,
    magicSkillAmp: 0,
    accuracy: 0,
    penetration: 0,
    minimumDamage: 0,
    addDamage: 0,
    ignoreEvasion: 0,
    finalDamageUp: 0,
    ignoreDamageReduction: 0,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 0,
}

export const initialDefenseAttributes: DefenseAttributes = {
    hp: 7500,
    defense: 3500,
    defenseRate: 6500,
    evasion: 1500,
    damageReduction: 400,
    resistCriticalRate: 20,
    resistCriticalDamage: 100,
    resistMagicSkillAmp: 50,
    resistSwordSkillAmp: 50,
    ignorePenetration: 200,
    ignoreAccuracy: 600,
    cancelIgnoreDamageReduction: 0,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
}

export const zeroDefenseAttributes: DefenseAttributes = {
    hp: 0,
    defense: 0,
    defenseRate: 0,
    evasion: 0,
    damageReduction: 0,
    resistCriticalRate: 0,
    resistCriticalDamage: 0,
    resistMagicSkillAmp: 0,
    resistSwordSkillAmp: 0,
    ignorePenetration: 0,
    ignoreAccuracy: 0,
    cancelIgnoreDamageReduction: 0,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
}

export type CharacterBuildType = 'attacker' | 'defender'

export type CharacterBuildStats = {
    attack: {
        general: AttackAttributes
        pvp: AttackAttributes
        pve: AttackAttributes
    }
    defense: {
        general: DefenseAttributes
        pvp: DefenseAttributes
        pve: DefenseAttributes
    }
}

export type CharacterBuildData = {
    type: CharacterBuildType
    battleStyleType?: BattleStyleTypes
    stats: CharacterBuildStats
}

export type CharacterBuild = {
    id: string
    data: CharacterBuildData
}

export const generateCharacterBuild = (data: CharacterBuildData): CharacterBuild => {
    return {
        id: uuidv4(),
        data,
    }
}

export const initialAttackerBuilds: CharacterBuild[] = [
    generateCharacterBuild({
        type: 'attacker',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'attacker',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'attacker',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'attacker',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
]

export const initialDefenderBuilds: CharacterBuild[] = [
    generateCharacterBuild({
        type: 'defender',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'defender',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'defender',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
    generateCharacterBuild({
        type: 'defender',
        stats: {
            attack: {
                general: initialAttackAttributes,
                pvp: zeroAttackAttributes,
                pve: zeroAttackAttributes,
            },
            defense: {
                general: initialDefenseAttributes,
                pvp: zeroDefenseAttributes,
                pve: zeroDefenseAttributes,
            },
        },
    }),
]