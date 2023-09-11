import { BattleStyleTypes } from '@/app/data/battleStyles'
import { v4 as uuidv4 } from 'uuid'

export type SkillStats = {
    skillAmp: number
    addAttack: number
    attack?: number
    penetration?: number
    criticalDamage?: number
    defenseReduction?: number
    ignorePenetration?: number
    ignoreResistSkillAmp?: number
}

export const skillTypes = ['attack', 'buff', 'debuff', 'passive'] as const
export type SkillType = (typeof skillTypes)[number]

export enum SkillRank {
    Novice = 'Novice',
    Apprentice = 'Apprentice',
    Regular = 'Regular',
    Expert = 'Expert',
    AExpert = 'AExpert',
    Master = 'Master',
    AMaster = 'AMaster',
    GMaster = 'GMaster',
    Completer = 'Completer',
    Transcender = 'Transcender',
}

export const skillRanks = [
    SkillRank.Novice,
    SkillRank.Apprentice,
    SkillRank.Regular,
    SkillRank.Expert,
    SkillRank.AExpert,
    SkillRank.Master,
    SkillRank.AMaster,
    SkillRank.GMaster,
    SkillRank.Completer,
    SkillRank.Transcender,
] as const

export type SkillData = {
    name: { pt: string; en: string }
    type: SkillType
    rank: SkillRank
    castingTime: number
    comboCastingTime: number
    coolDown: number
    duration?: number
    stats: SkillStats
}

export type Skill = {
    id: string
    data: SkillData
    disabled?: boolean
}

const generateSkill = (data: SkillData, disabled?: boolean) => ({
    id: uuidv4(),
    data,
    disabled,
})

// generateSkill('Lança de Terra', 'Earth Arrow', {
//     skillAmp: 0.85,
//     addAttack: 129,
//     castingTime: 1.8,
//     comboCastingTime: 1.05,
// }),
//     generateSkill('Meteoro de Chamas', 'Fire Meteor', {
//         skillAmp: 0.85,
//         addAttack: 1584,
//         castingTime: 2.3,
//         comboCastingTime: 1.5,
//     }),
//     generateSkill('Canhão de Pedra', 'Earth Cannon', {
//         skillAmp: 0.95,
//         addAttack: 193,
//         castingTime: 2,
//         comboCastingTime: 1.25,
//     }),
//     generateSkill('Canhão Múltiplo', 'Multiple Cannon', {
//         skillAmp: 1,
//         addAttack: 2838,
//         penetration: 20,
//         castingTime: 2.5,
//         comboCastingTime: 2,
//     }),

// generateSkill('Esmagador', 'Smash', { skillAmp: 1, addAttack: 2909, castingTime: 2.5, comboCastingTime: 2 }),
//     generateSkill('Desbalancear', 'Unbalance', {
//         skillAmp: 0,
//         addAttack: 136,
//         castingTime: 1.6,
//         comboCastingTime: 0.95,
//     }),
//     generateSkill('Abalo Sísmico', 'Earthquake', {
//         skillAmp: 0.8,
//         addAttack: 1786,
//         castingTime: 3,
//         comboCastingTime: 2.25,
//     }),

export const battleStyleSkills: Record<BattleStyleTypes, Skill[]> = {
    [BattleStyleTypes.ForceArcher]: [
        generateSkill({
            name: { pt: 'Disparo Crítico', en: 'Critical Shot' },
            type: 'attack',
            rank: SkillRank.Novice,
            castingTime: 1.3,
            comboCastingTime: 1.1,
            coolDown: 1.8,
            stats: {
                skillAmp: 25,
                addAttack: 147,
                criticalDamage: 100,
            },
        }),
        generateSkill({
            name: { pt: 'Lança de Terra', en: 'Earth Lance' },
            type: 'attack',
            rank: SkillRank.Regular,
            castingTime: 1.3,
            comboCastingTime: 1.05,
            coolDown: 5.3,
            stats: {
                skillAmp: 95,
                addAttack: 143,
            },
        }),
        generateSkill({
            name: { pt: "Lança d'Água", en: 'Water Lance' },
            type: 'attack',
            rank: SkillRank.Regular,
            castingTime: 1.3,
            comboCastingTime: 1.05,
            coolDown: 4.5,
            stats: {
                skillAmp: 85,
                addAttack: 173,
            },
        }),
        generateSkill({
            name: { pt: 'Lança de Fogo', en: 'Fire Lance' },
            type: 'attack',
            rank: SkillRank.Regular,
            castingTime: 1.3,
            comboCastingTime: 1.05,
            coolDown: 4.9,
            stats: {
                skillAmp: 85,
                addAttack: 202,
            },
        }),
        generateSkill(
            {
                name: { pt: 'Lança de Vento', en: 'Wind Lance' },
                type: 'attack',
                rank: SkillRank.Regular,
                castingTime: 1.3,
                comboCastingTime: 1.05,
                coolDown: 4.9,
                stats: {
                    skillAmp: 75,
                    addAttack: 205,
                },
            },
            true
        ),
        generateSkill(
            {
                name: { pt: 'Lança Congelante', en: 'Freezing Lance' },
                type: 'attack',
                rank: SkillRank.Regular,
                castingTime: 1.3,
                comboCastingTime: 1.05,
                coolDown: 4.5,
                stats: {
                    skillAmp: 75,
                    addAttack: 220,
                },
            },
            true
        ),
        generateSkill(
            {
                name: { pt: 'Lança Relampejante', en: 'Lightning Lance' },
                type: 'attack',
                rank: SkillRank.Regular,
                castingTime: 1.5,
                comboCastingTime: 1.25,
                coolDown: 5.8,
                stats: {
                    skillAmp: 95,
                    addAttack: 197,
                },
            },
            true
        ),
        generateSkill({
            name: { pt: 'Canhão de Pedra', en: 'Earth Cannon' },
            type: 'attack',
            rank: SkillRank.Expert,
            castingTime: 1.5,
            comboCastingTime: 1.25,
            coolDown: 5.8,
            stats: {
                skillAmp: 105,
                addAttack: 222,
            },
        }),
        generateSkill({
            name: { pt: "Canhão d'Água", en: 'Water Cannon' },
            type: 'attack',
            rank: SkillRank.Expert,
            castingTime: 1.5,
            comboCastingTime: 1.25,
            coolDown: 4.8,
            stats: {
                skillAmp: 95,
                addAttack: 260,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão de Fogo', en: 'Fire Cannon' },
            type: 'attack',
            rank: SkillRank.Expert,
            castingTime: 1.5,
            comboCastingTime: 1.25,
            coolDown: 5.3,
            stats: {
                skillAmp: 95,
                addAttack: 282,
            },
        }),
        generateSkill(
            {
                name: { pt: 'Disparo Perfurante', en: 'Piercing Shot' },
                type: 'attack',
                rank: SkillRank.Master,
                castingTime: 2.7,
                comboCastingTime: 2.25,
                coolDown: 3.2,
                stats: {
                    skillAmp: 55,
                    addAttack: 672,
                },
            },
            true
        ),
        generateSkill({
            name: { pt: 'Distorção Gravitacional', en: 'Gravitational Distortion' },
            type: 'attack',
            rank: SkillRank.GMaster,
            castingTime: 2.3,
            comboCastingTime: 1.5,
            coolDown: 4.7,
            stats: {
                skillAmp: 80,
                addAttack: 1239,
            },
        }),
        generateSkill({
            name: { pt: 'Estrela Cadente', en: 'Falling Star' },
            type: 'attack',
            rank: SkillRank.Completer,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 5.5,
            stats: {
                skillAmp: 80,
                addAttack: 1324,
            },
        }),
        generateSkill({
            name: { pt: 'Floresta de Flechas', en: 'Arrows Forest' },
            type: 'attack',
            rank: SkillRank.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 5.8,
            stats: {
                skillAmp: 105,
                addAttack: 3239,
            },
        }),
        generateSkill({
            name: { pt: 'Barragem de Flechas', en: 'Arrows Barrage' },
            type: 'attack',
            rank: SkillRank.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 5.8,
            stats: {
                skillAmp: 95,
                addAttack: 2587,
            },
        }),
        generateSkill({
            name: { pt: 'Disparo Sônico', en: 'Sonic Shot' },
            type: 'attack',
            rank: SkillRank.Transcender,
            castingTime: 2.5,
            comboCastingTime: 2.5,
            coolDown: 5.6,
            stats: {
                skillAmp: 95,
                addAttack: 1764,
            },
        }),
        generateSkill({
            name: { pt: 'Fragilizar Defesa', en: 'Fragilizar Defesa' },
            type: 'debuff',
            rank: SkillRank.Expert,
            castingTime: 0.7,
            comboCastingTime: 0.7,
            coolDown: 180,
            duration: 10,
            stats: {
                skillAmp: 0,
                addAttack: 0,
                ignorePenetration: -350,
            },
        }),
        generateSkill({
            name: { pt: 'Aguçar', en: 'Aguçar' },
            type: 'buff',
            rank: SkillRank.AExpert,
            castingTime: 1,
            comboCastingTime: 1,
            coolDown: 1.9,
            duration: 3690,
            stats: {
                skillAmp: 0,
                addAttack: 0,
                attack: 80,
                ignoreResistSkillAmp: 1,
            },
        }),
    ],
    [BattleStyleTypes.Wizard]: [],
    [BattleStyleTypes.Warrior]: [],
    [BattleStyleTypes.Blader]: [],
    [BattleStyleTypes.ForceBlader]: [],
    [BattleStyleTypes.ForceShielder]: [],
    [BattleStyleTypes.Gladiator]: [],
    [BattleStyleTypes.ForceGunner]: [],
    [BattleStyleTypes.DarkMage]: [],
}