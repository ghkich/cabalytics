import { Locale } from '@/i18n.config'
import forceArcherIcon from '@/public/icons/icon_bs_FA.png'
import wizardIcon from '@/public/icons/icon_bs_WI.png'
import forceGunnerIcon from '@/public/icons/icon_bs_FG.png'
import darkMageIcon from '@/public/icons/icon_bs_DM.png'
import warriorIcon from '@/public/icons/icon_bs_WA.png'
import bladerIcon from '@/public/icons/icon_bs_BL.png'
import gladiatorIcon from '@/public/icons/icon_bs_GL.png'
import forceShielderIcon from '@/public/icons/icon_bs_FS.png'
import forceBladerIcon from '@/public/icons/icon_bs_FB.png'
import { StaticImageData } from 'next/image'

type BattleStyle = {
    icon: StaticImageData
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
        icon: forceArcherIcon,
        description: { pt: 'Arqueiro Arcano', en: 'Force Archer' },
        acronym: { pt: 'AA', en: 'FA' },
        criticalEffectiveness: 0.8605,
        penetrationArmorFactor: 1.07,
        baselineArmor: 1060,
    },
    [BattleStyles.Wizard]: {
        icon: wizardIcon,
        description: { pt: 'Mago', en: 'Wizard' },
        acronym: { pt: 'MA', en: 'WI' },
        criticalEffectiveness: 0.92,
        penetrationArmorFactor: 1.15,
        baselineArmor: 985,
    },
    [BattleStyles.ForceGunner]: {
        icon: forceGunnerIcon,
        description: { pt: 'Atirador Arcano', en: 'Force Gunner' },
        acronym: { pt: 'AT', en: 'FG' },
        criticalEffectiveness: 0.86,
        penetrationArmorFactor: 1.07,
        baselineArmor: 985,
    },
    [BattleStyles.DarkMage]: {
        icon: darkMageIcon,
        description: { pt: 'Mago Negro', en: 'Dark Mage' },
        acronym: { pt: 'MN', en: 'DM' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 1.15,
        baselineArmor: 985,
    },
    [BattleStyles.Warrior]: {
        icon: warriorIcon,
        description: { pt: 'Guerreiro', en: 'Warrior' },
        acronym: { pt: 'GU', en: 'WA' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.Blader]: {
        icon: bladerIcon,
        description: { pt: 'Duelista', en: 'Blader' },
        acronym: { pt: 'DU', en: 'BL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.Gladiator]: {
        icon: gladiatorIcon,
        description: { pt: 'Gladiador', en: 'Gladiator' },
        acronym: { pt: 'GL', en: 'GL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.ForceShielder]: {
        icon: forceShielderIcon,
        description: { pt: 'Guardião Arcano', en: 'Force Shielder' },
        acronym: { pt: 'GA', en: 'FS' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
    [BattleStyles.ForceBlader]: {
        icon: forceBladerIcon,
        description: { pt: 'Espadachim Arcano', en: 'Force Blader' },
        acronym: { pt: 'EA', en: 'FB' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
    },
}

export const getBattleStyles = (lang: Locale) =>
    Object.entries(battleStyles).map(([key, item]) => ({
        value: key,
        acronym: item.acronym[lang],
        label: item.acronym[lang] + ` - ` + item.description[lang],
    }))

export const magicBasedBattleStyles = [
    BattleStyles.Wizard,
    BattleStyles.ForceArcher,
    BattleStyles.ForceGunner,
    BattleStyles.DarkMage,
]