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
    ForceShielder = 'ForceShielder',
    Gladiator = 'Gladiator',
    Blader = 'Blader',
    ForceBlader = 'ForceBlader',
    ForceGunner = 'ForceGunner',
    DarkMage = 'DarkMage',
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
    [BattleStyles.ForceGunner]: {
        description: { pt: 'Atirador Arcano', en: 'Force Gunner' },
        acronym: { pt: 'AT', en: 'FG' },
        criticalEffectiveness: 0.86,
        penetrationArmorFactor: 1.07,
        baselineArmor: 985,
    },
    [BattleStyles.DarkMage]: {
        description: { pt: 'Mago Negro', en: 'Dark Mage' },
        acronym: { pt: 'MN', en: 'DM' },
        criticalEffectiveness: 0.93,
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
    [BattleStyles.Blader]: {
        description: { pt: 'Duelista', en: 'Blader' },
        acronym: { pt: 'DU', en: 'BL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.Gladiator]: {
        description: { pt: 'Gladiador', en: 'Gladiator' },
        acronym: { pt: 'GL', en: 'GL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.ForceShielder]: {
        description: { pt: 'Guardião Arcano', en: 'Force Shielder' },
        acronym: { pt: 'GA', en: 'FS' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.ForceBlader]: {
        description: { pt: 'Espadachim Arcano', en: 'Force Blader' },
        acronym: { pt: 'EA', en: 'FB' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
}

export const battleStyleItems = Object.entries(battleStyles).map(([key, item]) => ({
    value: key,
    acronym: item.acronym.pt,
    label: item.description.pt,
}))

export const magicBasedBattleStyles = [
    BattleStyles.Wizard,
    BattleStyles.ForceArcher,
    BattleStyles.ForceGunner,
    BattleStyles.DarkMage,
]