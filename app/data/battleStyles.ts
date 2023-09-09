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
import { v4 as uuidv4 } from 'uuid'

export enum BattleStyleTypes {
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

type BatteStyleData = {
    icon: StaticImageData
    description: Record<'pt' | 'en', string>
    acronym: Record<'pt' | 'en', string>
    criticalEffectiveness: number
    penetrationArmorFactor: number
    baselineArmor: number
    isMagicBased: boolean
    popularity: number
}

type BattleStyle = Omit<BatteStyleData, 'description' | 'acronym'> & {
    id: string
    description: string
    acronym: string
    type: BattleStyleTypes
}

const generateBattleStyle = (data: BatteStyleData) => ({
    id: uuidv4(),
    ...data,
})

export const battleStylesData: Record<BattleStyleTypes, { id: string } & BatteStyleData> = {
    [BattleStyleTypes.ForceArcher]: generateBattleStyle({
        icon: forceArcherIcon,
        description: { pt: 'Arqueiro Arcano', en: 'Force Archer' },
        acronym: { pt: 'AA', en: 'FA' },
        criticalEffectiveness: 0.8605,
        penetrationArmorFactor: 1.07,
        baselineArmor: 1060,
        isMagicBased: true,
        popularity: 3,
    }),
    [BattleStyleTypes.Wizard]: generateBattleStyle({
        icon: wizardIcon,
        description: { pt: 'Mago', en: 'Wizard' },
        acronym: { pt: 'MA', en: 'WI' },
        criticalEffectiveness: 0.92,
        penetrationArmorFactor: 1.15,
        baselineArmor: 985,
        isMagicBased: true,
        popularity: 2,
    }),
    [BattleStyleTypes.ForceGunner]: generateBattleStyle({
        icon: forceGunnerIcon,
        description: { pt: 'Atirador Arcano', en: 'Force Gunner' },
        acronym: { pt: 'AT', en: 'FG' },
        criticalEffectiveness: 0.86,
        penetrationArmorFactor: 1.07,
        baselineArmor: 985,
        isMagicBased: true,
        popularity: 5,
    }),
    [BattleStyleTypes.DarkMage]: generateBattleStyle({
        icon: darkMageIcon,
        description: { pt: 'Mago Negro', en: 'Dark Mage' },
        acronym: { pt: 'MN', en: 'DM' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 1.15,
        baselineArmor: 985,
        isMagicBased: true,
        popularity: 4,
    }),
    [BattleStyleTypes.Warrior]: generateBattleStyle({
        icon: warriorIcon,
        description: { pt: 'Guerreiro', en: 'Warrior' },
        acronym: { pt: 'GU', en: 'WA' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
        isMagicBased: false,
        popularity: 7,
    }),
    [BattleStyleTypes.Blader]: generateBattleStyle({
        icon: bladerIcon,
        description: { pt: 'Duelista', en: 'Blader' },
        acronym: { pt: 'DU', en: 'BL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
        isMagicBased: false,
        popularity: 1,
    }),
    [BattleStyleTypes.Gladiator]: generateBattleStyle({
        icon: gladiatorIcon,
        description: { pt: 'Gladiador', en: 'Gladiator' },
        acronym: { pt: 'GL', en: 'GL' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
        isMagicBased: false,
        popularity: 9,
    }),
    [BattleStyleTypes.ForceShielder]: generateBattleStyle({
        icon: forceShielderIcon,
        description: { pt: 'Guardião Arcano', en: 'Force Shielder' },
        acronym: { pt: 'GA', en: 'FS' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
        isMagicBased: false,
        popularity: 8,
    }),
    [BattleStyleTypes.ForceBlader]: generateBattleStyle({
        icon: forceBladerIcon,
        description: { pt: 'Espadachim Arcano', en: 'Force Blader' },
        acronym: { pt: 'EA', en: 'FB' },
        criticalEffectiveness: 0.93,
        penetrationArmorFactor: 2.35,
        baselineArmor: 975,
        isMagicBased: false,
        popularity: 4,
    }),
}

export const getBattleStyles = (lang: Locale): BattleStyle[] =>
    Object.entries(battleStylesData)
        .map(([type, { acronym, description, ...data }]) => ({
            ...data,
            type: type as BattleStyleTypes,
            acronym: acronym[lang],
            description: description[lang],
        }))
        .sort((a, b) => a.popularity - b.popularity)