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
}

export const attackAttributes: Record<keyof AttackAttributes, Attribute> = {
    attack: {
        description: { pt: 'Ataque', en: 'Attack' },
        score: 34.5,
    },
    magicAttack: {
        description: { pt: 'Ataque Mágico', en: 'Magic Attack' },
        score: 34.5,
    },
    attackRate: {
        description: { pt: 'Precisão', en: 'Attack Rate' },
        score: 3,
    },
    criticalRate: {
        description: { pt: 'Taxa Crítica', en: 'Critical Rate' },
        score: 750,
    },
    criticalDamage: {
        description: { pt: 'Dano Crítico', en: 'Critical DMG' },
        score: 177,
    },
    swordSkillAmp: {
        description: { pt: 'Téc. Amp Espada', en: 'Sword Skill Amp' },
        score: 349,
    },
    magicSkillAmp: {
        description: { pt: 'Téc. Amp Mágica', en: 'Magic Skill Amp' },
        score: 349,
    },
    accuracy: {
        description: { pt: 'Acerto', en: 'Accuracy' },
        score: 6.5,
    },
    penetration: {
        description: { pt: 'Perfuração', en: 'Penetration' },
        score: 71,
    },
    minimumDamage: {
        description: { pt: 'Dano Mínimo', en: 'Minimum Damage' },
        score: 0,
    },
    addDamage: {
        description: { pt: 'Dano Adicional', en: 'Add Damage' },
        score: 35,
    },
    ignoreEvasion: {
        description: { pt: 'Ignorar Evasão', en: 'Ignore Evasion' },
        score: 4.5,
    },
    finalDamageUp: {
        description: { pt: 'Dano Final UP', en: 'Final Damage UP' },
        score: 1604,
    },
    ignoreDamageReduction: {
        description: { pt: 'Ign. Redução de Dano', en: 'Ign. DMG Reduction' },
        score: 16.8,
    },
    ignoreResistCriticalRate: {
        description: { pt: 'Ign. Res. à Taxa Crítica', en: 'Ign. Resist Critical Rate' },
        score: 574,
    },
    ignoreResistCriticalDamage: {
        description: { pt: 'Ign. Res. ao Dano Crítico', en: 'Ign. Resist Critical DMG' },
        score: 142.5,
    },
    ignoreResistSkillAmp: {
        description: { pt: 'Ign. Res. à Téc. Amp', en: 'Ignore Resist Skill Amp' },
        score: 267,
    },
    normalDamageUp: {
        description: { pt: 'Dano Normal UP', en: 'Normal Damage UP' },
        score: 85,
    },
    cancelIgnorePenetration: {
        description: { pt: 'Canc. Ign. Perfuração', en: 'Cancel Ign. Penetration' },
        score: 47.8,
    },
}
export const defenseAttributes: Record<keyof DefenseAttributes, Attribute> = {
    hp: {
        description: { pt: 'HP', en: 'HP' },
        score: 5,
    },
    defense: {
        description: { pt: 'Defesa', en: 'Defense' },
        score: 21,
    },
    defenseRate: {
        description: { pt: 'Evasão', en: 'Defense Rate' },
        score: 2.4,
    },
    evasion: {
        description: { pt: 'Bloqueio', en: 'Block' },
        score: 5.3,
    },
    damageReduction: {
        description: { pt: 'Redução de Dano', en: 'Damage Reduction' },
        score: 19.5,
    },
    resistCriticalRate: {
        description: { pt: 'Res. à Taxa Crítica', en: 'Resist Critical Rate' },
        score: 636,
    },
    resistCriticalDamage: {
        description: { pt: 'Res. ao Dano Crítico', en: 'Resist Critical Damage' },
        score: 150,
    },
    resistSwordSkillAmp: {
        description: { pt: 'Res. à Téc. Amp Esp.', en: 'Resist Sword Skill Amp' },
        score: 296.5,
    },
    resistMagicSkillAmp: {
        description: { pt: 'Res. à Téc. Amp Mág.', en: 'Resist Magic Skill Amp' },
        score: 296.5,
    },
    ignorePenetration: {
        description: { pt: 'Ignorar Perfuração', en: 'Ignore Penetration' },
        score: 53.1,
    },
    ignoreAccuracy: {
        description: { pt: 'Ignorar Acerto', en: 'Ignore Accuracy' },
        score: 5.3,
    },
    cancelIgnoreDamageReduction: {
        description: { pt: 'Canc. Ign. Red. de Dano', en: 'Canc. Ign. DMG Reduction' },
        score: 19.9,
    },
    cancelIgnoreEvasion: {
        description: { pt: 'Canc. Ign. Evasão', en: 'Cancel Ignore Evasion' },
        score: 5.3,
    },
    finalDamageDown: {
        description: { pt: 'Dano Final Reduzido', en: 'Final Damage Reduction' },
        score: 1451,
    },
}