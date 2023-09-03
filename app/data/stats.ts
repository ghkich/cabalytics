export type AttackStats = {
    attack?: number
    magicAttack: number
    attackRate?: number
    criticalRate: number
    criticalDamage: number
    swordSkillAmp?: number
    magicSkillAmp: number
    accuracy?: number
    penetration: number
    addDamage: number
    ignoreEvasion?: number
    finalDamageUp: number
    ignoreDamageReduction: number
    ignoreResistCriticalRate: number
    ignoreResistCriticalDamage: number
    ignoreResistSkillAmp: number
    normalDamageUp: number
    cancelIgnorePenetration: number
}

export type DefenseStats = {
    defense: number
    defenseRate?: number
    evasion?: number
    damageReduction: number
    resistCriticalRate: number
    resistCriticalDamage: number
    resistSwordSkillAmp?: number
    resistMagicSkillAmp: number
    ignorePenetration: number
    ignoreAccuracy?: number
    cancelIgnoreDamageReduction: number
    cancelIgnoreEvasion?: number
    finalDamageDown: number
    damageReductionPercentage: number
}

export enum BattleStyles {
    Fantoche = 'Fantoche',
    ForceArcher = 'Force Archer',
    Warrior = 'Warrior',
    Wizard = 'Wizard',
    // ForceShielder = 'Force Shielder',
    // Gladiator = 'Gladiator',
    // Blader = 'Blader',
    // ForceBlader = 'Force Blader',
    // ForceGunner = 'Force Gunner',
    // DarkMage = 'Dark Mage',
}

export const attackStats: { name: keyof AttackStats; description: string }[] = [
    {
        name: 'attack',
        description: 'Attack',
    },
    {
        name: 'magicAttack',
        description: 'Magic Attack',
    },
    {
        name: 'attackRate',
        description: 'Attack Rate',
    },
    {
        name: 'criticalRate',
        description: 'Critical Rate',
    },
    {
        name: 'criticalDamage',
        description: 'Critical Damage',
    },
    {
        name: 'swordSkillAmp',
        description: 'Sword Skill Amp',
    },
    {
        name: 'magicSkillAmp',
        description: 'Magic Skill Amp',
    },
    {
        name: 'accuracy',
        description: 'Accuracy',
    },
    {
        name: 'penetration',
        description: 'Penetration',
    },
    {
        name: 'addDamage',
        description: 'Add Damage',
    },
    {
        name: 'ignoreEvasion',
        description: 'Ignore Evasion',
    },
    {
        name: 'finalDamageUp',
        description: 'Final Damage UP',
    },
    {
        name: 'ignoreDamageReduction',
        description: 'Ignore Damage Reduction',
    },
    {
        name: 'ignoreResistCriticalRate',
        description: 'Ignore Resist Critical Rate',
    },
    {
        name: 'ignoreResistCriticalDamage',
        description: 'Ignore Resist Critical Damage',
    },
    {
        name: 'ignoreResistSkillAmp',
        description: 'Ignore Resist Skill Amp',
    },
    {
        name: 'normalDamageUp',
        description: 'Normal Damage UP',
    },
    {
        name: 'cancelIgnorePenetration',
        description: 'Cancel Ignore Penetration',
    },
]

export const defenseStats: { name: keyof DefenseStats; description: string }[] = [
    {
        name: 'defense',
        description: 'Defense',
    },
    {
        name: 'defenseRate',
        description: 'Defense Rate',
    },
    {
        name: 'evasion',
        description: 'Evasion',
    },
    {
        name: 'damageReduction',
        description: 'Damage Reduction',
    },
    {
        name: 'resistCriticalRate',
        description: 'Resist Critical Rate',
    },
    {
        name: 'resistCriticalDamage',
        description: 'Resist Critical Damage',
    },
    {
        name: 'resistSwordSkillAmp',
        description: 'Resist Sword Skill Amp',
    },
    {
        name: 'resistMagicSkillAmp',
        description: 'Resist Magic Skill Amp',
    },
    {
        name: 'ignorePenetration',
        description: 'Ignore Penetration',
    },
    {
        name: 'ignoreAccuracy',
        description: 'Ignore Accuracy',
    },
    {
        name: 'cancelIgnoreDamageReduction',
        description: 'Cancel Ignore Damage Reduction',
    },
    {
        name: 'cancelIgnoreEvasion',
        description: 'Cancel Ignore Evasion',
    },
    {
        name: 'finalDamageDown',
        description: 'Final Damage Down',
    },
]