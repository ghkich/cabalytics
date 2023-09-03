type BattleStyle = {
    description: Record<'pt' | 'en', string>
    acronym: Record<'pt' | 'en', string>
    criticalEffectiveness: number
    penetrationArmorFactor: number
    baselineArmor: number
}

export enum BattleStyles {
    ForceArcher = 'ForceArcher',
    Wizard = 'Wizard',
    Warrior = 'Warrior',
    // ForceShielder = 'ForceShielder',
    // Gladiator = 'Gladiator',
    // Blader = 'Blader',
    // ForceBlader = 'ForceBlader',
    // ForceGunner = 'ForceGunner',
    // DarkMage = 'DarkMage',
}
export const battleStyles: Record<BattleStyles, BattleStyle> = {
    [BattleStyles.ForceArcher]: {
        description: { pt: 'Arqueiro Arcano', en: 'Force Archer' },
        acronym: { pt: 'AA', en: 'FA' },
        criticalEffectiveness: 0.8605,
        penetrationArmorFactor: 1.07,
        baselineArmor: 1060,
    },
    [BattleStyles.Wizard]: {
        description: { pt: 'Mago', en: 'Wizard' },
        acronym: { pt: 'MA', en: 'WI' },
        criticalEffectiveness: 0.92,
        penetrationArmorFactor: 1.15,
        baselineArmor: 985,
    },
    [BattleStyles.Warrior]: {
        description: { pt: 'Guerreiro', en: 'Warrior' },
        acronym: { pt: 'GU', en: 'WA' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
}

export const battleStyleItems = Object.entries(battleStyles).map(([key, item]) => ({ value: key, label: item.description.pt }))

export const magicBasedBattleStyles = [BattleStyles.Wizard, BattleStyles.ForceArcher]