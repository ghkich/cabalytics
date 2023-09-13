export type AttributeTypeValue = 'attack' | 'defense'
export const attributeTypes: { value: AttributeTypeValue; label: string }[] = [
    {
        value: 'attack',
        label: 'ATK',
    },
    {
        value: 'defense',
        label: 'DEF',
    },
]
export type AttributeCategoryValue = 'general' | 'pvp' | 'pve'
export const attributeCategories: { value: AttributeCategoryValue; label: { pt: string; en: string } }[] = [
    {
        value: 'general',
        label: {
            pt: 'Geral',
            en: 'General',
        },
    },
    {
        value: 'pvp',
        label: {
            pt: 'PVP',
            en: 'PVP',
        },
    },
    {
        value: 'pve',
        label: {
            pt: 'PVE',
            en: 'PVE',
        },
    },
]

export type AttackAttributes = {
    attack: number
    magicAttack: number
    attackRate: number
    criticalRate: number
    criticalDamage: number
    swordSkillAmp: number
    magicSkillAmp: number
    accuracy: number
    penetration: number
    addDamage: number
    minimumDamage: number
    ignoreEvasion: number
    finalDamageUp: number
    ignoreDamageReduction: number
    ignoreResistCriticalRate: number
    ignoreResistCriticalDamage: number
    ignoreResistSkillAmp: number
    normalDamageUp: number
    cancelIgnorePenetration: number
}

export type DefenseAttributes = {
    hp: number
    defense: number
    defenseRate: number
    evasion: number
    damageReduction: number
    resistCriticalRate: number
    resistCriticalDamage: number
    resistSwordSkillAmp: number
    resistMagicSkillAmp: number
    ignorePenetration: number
    ignoreAccuracy: number
    cancelIgnoreDamageReduction: number
    cancelIgnoreEvasion: number
    finalDamageDown: number
}

type Attribute = {
    description: Record<'pt' | 'en', string>
    score: number
    min: number
    max: number
}

export const attackAttributes: Record<keyof AttackAttributes, Attribute> = {
    attack: {
        description: { pt: 'Ataque', en: 'Attack' },
        score: 34.5,
        min: 0,
        max: 10000,
    },
    magicAttack: {
        description: { pt: 'Ataque Mágico', en: 'Magic Attack' },
        score: 34.5,
        min: 0,
        max: 10000,
    },
    attackRate: {
        description: { pt: 'Precisão', en: 'Attack Rate' },
        score: 3,
        min: 0,
        max: 20000,
    },
    criticalRate: {
        description: { pt: 'Taxa Crítica', en: 'Critical Rate' },
        score: 750,
        min: 0,
        max: 100,
    },
    criticalDamage: {
        description: { pt: 'Dano Crítico', en: 'Critical DMG' },
        score: 177,
        min: 0,
        max: 1000,
    },
    swordSkillAmp: {
        description: { pt: 'Téc. Amp Espada', en: 'Sword Skill Amp' },
        score: 349,
        min: 0,
        max: 750,
    },
    magicSkillAmp: {
        description: { pt: 'Téc. Amp Mágica', en: 'Magic Skill Amp' },
        score: 349,
        min: 0,
        max: 750,
    },
    accuracy: {
        description: { pt: 'Acerto', en: 'Accuracy' },
        score: 6.5,
        min: 0,
        max: 20000,
    },
    penetration: {
        description: { pt: 'Perfuração', en: 'Penetration' },
        score: 71,
        min: 0,
        max: 3500,
    },
    minimumDamage: {
        description: { pt: 'Dano Mínimo', en: 'Minimum Damage' },
        score: 0,
        min: 0,
        max: 25,
    },
    addDamage: {
        description: { pt: 'Dano Adicional', en: 'Add Damage' },
        score: 35,
        min: 0,
        max: 1000,
    },
    ignoreEvasion: {
        description: { pt: 'Ignorar Evasão', en: 'Ignore Evasion' },
        score: 4.5,
        min: 0,
        max: 10000,
    },
    finalDamageUp: {
        description: { pt: 'Dano Final UP', en: 'Final Damage UP' },
        score: 1604,
        min: 0,
        max: 75,
    },
    ignoreDamageReduction: {
        description: { pt: 'Ign. Redução de Dano', en: 'Ign. DMG Reduction' },
        score: 16.8,
        min: 0,
        max: 1000,
    },
    ignoreResistCriticalRate: {
        description: { pt: 'Ign. Res. à Taxa Crítica', en: 'Ign. Resist Critical Rate' },
        score: 574,
        min: 0,
        max: 100,
    },
    ignoreResistCriticalDamage: {
        description: { pt: 'Ign. Res. ao Dano Crítico', en: 'Ign. Resist Critical DMG' },
        score: 142.5,
        min: 0,
        max: 500,
    },
    ignoreResistSkillAmp: {
        description: { pt: 'Ign. Res. à Téc. Amp', en: 'Ignore Resist Skill Amp' },
        score: 267,
        min: 0,
        max: 250,
    },
    normalDamageUp: {
        description: { pt: 'Dano Normal UP', en: 'Normal Damage UP' },
        score: 85,
        min: 0,
        max: 125,
    },
    cancelIgnorePenetration: {
        description: { pt: 'Canc. Ign. Perfuração', en: 'Cancel Ign. Penetration' },
        score: 47.8,
        min: 0,
        max: 500,
    },
}
export const defenseAttributes: Record<keyof DefenseAttributes, Attribute> = {
    hp: {
        description: { pt: 'HP', en: 'HP' },
        score: 5,
        min: 0,
        max: 50000,
    },
    defense: {
        description: { pt: 'Defesa', en: 'Defense' },
        score: 21,
        min: 0,
        max: 10000,
    },
    defenseRate: {
        description: { pt: 'Evasão', en: 'Defense Rate' },
        score: 2.4,
        min: 0,
        max: 20000,
    },
    evasion: {
        description: { pt: 'Bloqueio', en: 'Block' },
        score: 5.3,
        min: 0,
        max: 10000,
    },
    damageReduction: {
        description: { pt: 'Redução de Dano', en: 'Damage Reduction' },
        score: 19.5,
        min: 0,
        max: 2500,
    },
    resistCriticalRate: {
        description: { pt: 'Res. à Taxa Crítica', en: 'Resist Critical Rate' },
        score: 636,
        min: 0,
        max: 100,
    },
    resistCriticalDamage: {
        description: { pt: 'Res. ao Dano Crítico', en: 'Resist Critical Damage' },
        score: 150,
        min: 0,
        max: 500,
    },
    resistSwordSkillAmp: {
        description: { pt: 'Res. à Téc. Amp Esp.', en: 'Resist Sword Skill Amp' },
        score: 296.5,
        min: 0,
        max: 350,
    },
    resistMagicSkillAmp: {
        description: { pt: 'Res. à Téc. Amp Mág.', en: 'Resist Magic Skill Amp' },
        score: 296.5,
        min: 0,
        max: 350,
    },
    ignorePenetration: {
        description: { pt: 'Ignorar Perfuração', en: 'Ignore Penetration' },
        score: 53.1,
        min: 0,
        max: 1000,
    },
    ignoreAccuracy: {
        description: { pt: 'Ignorar Acerto', en: 'Ignore Accuracy' },
        score: 5.3,
        min: 0,
        max: 10000,
    },
    cancelIgnoreDamageReduction: {
        description: { pt: 'Canc. Ign. Red. de Dano', en: 'Canc. Ign. DMG Reduction' },
        score: 19.9,
        min: 0,
        max: 1000,
    },
    cancelIgnoreEvasion: {
        description: { pt: 'Canc. Ign. Evasão', en: 'Cancel Ignore Evasion' },
        score: 5.3,
        min: 0,
        max: 1000,
    },
    finalDamageDown: {
        description: { pt: 'Dano Final Reduzido', en: 'Final Damage Reduction' },
        score: 1451,
        min: 0,
        max: 75,
    },
}