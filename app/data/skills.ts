import { BattleStyleTypes } from '@/app/data/battleStyles'
import { v4 as uuidv4 } from 'uuid'

export type SkillStats = {
    skillAmp: number
    addAttack: number
    addAttackPerRage?: number
    attack?: number
    accuracy?: number
    penetration?: number
    criticalDamage?: number
    ignoreResistSkillAmp?: number
}

export type SkillDebuffs = {
    attack?: number
    attackRate?: number
    defense?: number
    ignorePenetration?: number
    resistCriticalRate?: number
    resistCriticalDamage?: number
    evasion?: number
}

export const skillTypes = ['attack', 'buff', 'debuff', 'passive'] as const
export type SkillType = (typeof skillTypes)[number]

export enum SkillRankType {
    Novice = 0,
    Apprentice = 1,
    Regular = 2,
    Expert = 3,
    AExpert = 4,
    Master = 5,
    AMaster = 6,
    GMaster = 7,
    Completer = 8,
    Transcender = 9,
}

export type SkillRank = {
    type: SkillRankType
    description: { pt: string; en: string }
}

export const skillRanks = [
    { type: SkillRankType.Novice, description: { pt: 'Novato', en: 'Novice' } },
    { type: SkillRankType.Apprentice, description: { pt: 'Aprendiz', en: 'Apprentice' } },
    { type: SkillRankType.Regular, description: { pt: 'Aspirante', en: 'Regular' } },
    { type: SkillRankType.Expert, description: { pt: 'Especialista', en: 'Expert' } },
    { type: SkillRankType.AExpert, description: { pt: 'Perito', en: 'A. Expert' } },
    { type: SkillRankType.Master, description: { pt: 'Mestre', en: 'Master' } },
    { type: SkillRankType.AMaster, description: { pt: 'M. Supremo', en: 'A. Master' } },
    { type: SkillRankType.GMaster, description: { pt: 'Grão Mestre', en: 'G. Master' } },
    { type: SkillRankType.Completer, description: { pt: 'Ancião', en: 'Completer' } },
    { type: SkillRankType.Transcender, description: { pt: 'Transcendente', en: 'Transcender' } },
] as const

export type SkillData = {
    name: { pt: string; en: string }
    type: SkillType
    rank: SkillRankType
    castingTime: number
    comboCastingTime: number
    coolDown: number
    duration?: number
    stats: SkillStats
    debuffs?: SkillDebuffs
    isAffectedByNumberOfTargets?: boolean
    continuousDamage?: {
        value: number
        duration: number
    }
    silence?: {
        value: number
        duration: number
    }
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

export const battleStyleSkills: Record<BattleStyleTypes, Skill[]> = {
    [BattleStyleTypes.ForceArcher]: [
        generateSkill({
            name: { pt: 'Floresta de Flechas', en: 'Arrow Forest' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 5.8,
            stats: {
                skillAmp: 105,
                addAttack: 3239,
            },
        }),
        generateSkill({
            name: { pt: 'Barragem de Flechas', en: 'Arrow Barrage' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 5.8,
            stats: {
                skillAmp: 95,
                addAttack: 2587,
            },
        }),
        generateSkill({
            name: { pt: 'Disparo Sônico', en: 'Sonic Shooter' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.5,
            comboCastingTime: 2.5,
            coolDown: 5.6,
            stats: {
                skillAmp: 95,
                addAttack: 1764,
            },
        }),
        generateSkill({
            name: { pt: 'Estrela Cadente', en: 'Shooting Star' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3,
            comboCastingTime: 2.25,
            coolDown: 5.5,
            stats: {
                skillAmp: 80,
                addAttack: 1324,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Distorção Gravitacional', en: 'Gravity Distortion' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 2.3,
            comboCastingTime: 1.5,
            coolDown: 4.7,
            stats: {
                skillAmp: 80,
                addAttack: 1239,
            },
        }),
        generateSkill(
            {
                name: { pt: 'Disparo Perfurante', en: 'Piercing Shot' },
                type: 'attack',
                rank: SkillRankType.Master,
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
            name: { pt: 'Disparo Sombrio', en: 'Shadow Shot' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 1.3,
            comboCastingTime: 1.1,
            coolDown: 1.8,
            stats: {
                skillAmp: 65,
                addAttack: 252,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão de Pedra', en: 'Stone Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.5,
            comboCastingTime: 1.25,
            coolDown: 5.8,
            stats: {
                skillAmp: 105,
                addAttack: 222,
            },
        }),
        generateSkill({
            name: { pt: "Canhão d'Água", en: 'Aqua Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
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
            rank: SkillRankType.Expert,
            castingTime: 1.5,
            comboCastingTime: 1.25,
            coolDown: 5.3,
            stats: {
                skillAmp: 95,
                addAttack: 282,
            },
        }),
        generateSkill({
            name: { pt: 'Lança de Terra', en: 'Terra Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.3,
            comboCastingTime: 1.05,
            coolDown: 5.3,
            stats: {
                skillAmp: 95,
                addAttack: 143,
            },
        }),
        generateSkill({
            name: { pt: "Lança d'Água", en: 'Aqua Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
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
            rank: SkillRankType.Regular,
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
                rank: SkillRankType.Regular,
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
        generateSkill({
            name: { pt: 'Lança Congelante', en: 'Freezing Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.3,
            comboCastingTime: 1.05,
            coolDown: 4.5,
            stats: {
                skillAmp: 75,
                addAttack: 220,
            },
        }),
        generateSkill(
            {
                name: { pt: 'Lança Relampejante', en: 'Lightning Lance' },
                type: 'attack',
                rank: SkillRankType.Regular,
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
            name: { pt: 'Disparo Crítico', en: 'Critical Shot' },
            type: 'attack',
            rank: SkillRankType.Novice,
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
            name: { pt: 'Fragilizar Defesa', en: 'Fragilizar Defesa' },
            type: 'debuff',
            rank: SkillRankType.Expert,
            castingTime: 0.7,
            comboCastingTime: 0.7,
            coolDown: 180,
            duration: 10,
            stats: {
                skillAmp: 0,
                addAttack: 0,
            },
            debuffs: {
                ignorePenetration: -350,
            },
        }),
        generateSkill({
            name: { pt: 'Aguçar', en: 'Aguçar' },
            type: 'buff',
            rank: SkillRankType.AExpert,
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
    [BattleStyleTypes.Wizard]: [
        generateSkill({
            name: { pt: 'Canhão Múltiplo', en: 'Multiple Cannon' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.5,
            stats: {
                skillAmp: 100,
                addAttack: 2838,
                penetration: 20,
            },
            continuousDamage: {
                value: 90,
                duration: 8,
            },
        }),
        generateSkill({
            name: { pt: 'Armadilha Glacial', en: 'Glacial Trap' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 6.5,
            stats: {
                skillAmp: 90,
                addAttack: 2186,
                penetration: 20,
            },
            continuousDamage: {
                value: 90,
                duration: 4,
            },
        }),
        generateSkill({
            name: { pt: 'Meteoro de Chamas', en: 'Meteorite' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.5,
            comboCastingTime: 2.5,
            coolDown: 5.8,
            stats: {
                skillAmp: 85,
                addAttack: 1584,
            },
        }),
        generateSkill({
            name: { pt: 'Campo Multidimensional', en: 'Multidimensional Field' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3,
            comboCastingTime: 2.35,
            coolDown: 5.5,
            stats: {
                skillAmp: 80,
                addAttack: 1712,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão Duplo Supremo', en: 'Supreme Double Cannon' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 2.8,
            comboCastingTime: 1.65,
            coolDown: 5.1,
            stats: {
                skillAmp: 80,
                addAttack: 1507,
            },
            continuousDamage: {
                value: 335,
                duration: 5,
            },
        }),
        generateSkill({
            name: { pt: 'Zero Absoluto', en: 'Absolute Zero' },
            type: 'attack',
            rank: SkillRankType.AMaster,
            castingTime: 3.3,
            comboCastingTime: 2.4,
            coolDown: 4.8,
            stats: {
                skillAmp: 65,
                addAttack: 1014,
            },
        }),
        generateSkill({
            name: { pt: 'Dilúvio', en: 'Deluge' },
            type: 'attack',
            rank: SkillRankType.Master,
            castingTime: 3,
            comboCastingTime: 2.35,
            coolDown: 3.2,
            stats: {
                skillAmp: 55,
                addAttack: 872,
            },
        }),
        generateSkill({
            name: { pt: 'Vácuo', en: 'Vacuum' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 2.9,
            comboCastingTime: 2.9,
            coolDown: 3.4,
            stats: {
                skillAmp: 55,
                addAttack: 515,
            },
        }),
        generateSkill({
            name: { pt: 'Campo de Força', en: 'Force Field' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 1.3,
            comboCastingTime: 0.9,
            coolDown: 180,
            stats: {
                skillAmp: 5,
                addAttack: 500,
            },
            silence: {
                value: 80,
                duration: 4,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão de Pedra', en: 'Stone Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.7,
            comboCastingTime: 1.25,
            coolDown: 5.8,
            stats: {
                skillAmp: 95,
                addAttack: 193,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão de Fogo', en: 'Fire Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.7,
            comboCastingTime: 1.25,
            coolDown: 5.3,
            stats: {
                skillAmp: 85,
                addAttack: 232,
            },
        }),
        generateSkill({
            name: { pt: "Canhão d'Água", en: 'Aqua Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.7,
            comboCastingTime: 1.25,
            coolDown: 4.8,
            stats: {
                skillAmp: 85,
                addAttack: 220,
            },
        }),
        generateSkill({
            name: { pt: 'Canhão Relampejante', en: 'Lightning Cannon' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 2,
            comboCastingTime: 1.25,
            coolDown: 6.6,
            stats: {
                skillAmp: 95,
                addAttack: 285,
            },
        }),
        generateSkill({
            name: { pt: 'Lança de Terra', en: 'Terra Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.5,
            comboCastingTime: 1.05,
            coolDown: 5.3,
            stats: {
                skillAmp: 85,
                addAttack: 129,
            },
        }),
        generateSkill({
            name: { pt: 'Lança de Fogo', en: 'Fire Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.5,
            comboCastingTime: 1.05,
            coolDown: 4.9,
            stats: {
                skillAmp: 75,
                addAttack: 173,
            },
        }),
        generateSkill({
            name: { pt: 'Lança Relampejante', en: 'Lightning Lance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.7,
            comboCastingTime: 1.05,
            coolDown: 5.8,
            stats: {
                skillAmp: 85,
                addAttack: 179,
            },
        }),
    ],
    [BattleStyleTypes.Warrior]: [
        generateSkill({
            name: { pt: 'Esmagador', en: 'Smash' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.5,
            stats: {
                skillAmp: 100,
                addAttack: 2909,
            },
            debuffs: {
                defense: -40,
            },
        }),
        generateSkill({
            name: { pt: 'Decisão Apocalíptica', en: 'Apocalyptic Decision' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.5,
            stats: {
                skillAmp: 90,
                addAttack: 2257,
            },
        }),
        generateSkill({
            name: { pt: 'Tremor da Espada', en: 'Sword Tremor' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 6.6,
            stats: {
                skillAmp: 85,
                addAttack: 2116,
            },
        }),
        generateSkill({
            name: { pt: 'Abalo Sísmico', en: 'Earthquake' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3,
            comboCastingTime: 2.25,
            coolDown: 4.5,
            stats: {
                skillAmp: 80,
                addAttack: 1786,
            },
        }),
        generateSkill({
            name: { pt: 'Tufão', en: 'Typhoon' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 4.3,
            comboCastingTime: 3.2,
            coolDown: 8.6,
            stats: {
                skillAmp: 80,
                addAttack: 1932,
            },
        }),
        generateSkill({
            name: { pt: 'Terremoto', en: 'Earthquake' },
            type: 'attack',
            rank: SkillRankType.AMaster,
            castingTime: 6.5,
            comboCastingTime: 4.45,
            coolDown: 7.0,
            stats: {
                skillAmp: 65,
                addAttack: 1665,
            },
        }),
        generateSkill({
            name: { pt: 'Choque da Espada', en: 'Sword Shock' },
            type: 'attack',
            rank: SkillRankType.Master,
            castingTime: 2.7,
            comboCastingTime: 2.1,
            coolDown: 3.2,
            stats: {
                skillAmp: 55,
                addAttack: 496,
            },
        }),
        generateSkill({
            name: { pt: 'Queda Livre', en: 'Free Fall' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 2.9,
            comboCastingTime: 1.55,
            coolDown: 3.4,
            stats: {
                skillAmp: 45,
                addAttack: 408,
            },
        }),
        generateSkill({
            name: { pt: 'Carga', en: 'Charge' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.3,
            comboCastingTime: 0.8,
            coolDown: 1.8,
            stats: {
                skillAmp: 0,
                addAttack: 201,
            },
        }),
        generateSkill({
            name: { pt: 'Choque Arcano', en: 'Arcane Shock' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1,
            comboCastingTime: 0.4,
            coolDown: 26.5,
            stats: {
                skillAmp: 20,
                addAttack: 306,
            },
        }),
        generateSkill({
            name: { pt: 'Lâmina Crescente', en: 'Crescent Blade' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 2.2,
            comboCastingTime: 1.2,
            coolDown: 2.7,
            stats: {
                skillAmp: 35,
                addAttack: 220,
            },
        }),
        generateSkill({
            name: { pt: 'Desbalancear', en: 'Unbalance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.6,
            comboCastingTime: 0.95,
            coolDown: 2.1,
            stats: {
                skillAmp: 0,
                addAttack: 185,
            },
        }),
    ],
    [BattleStyleTypes.Blader]: [
        generateSkill({
            name: { pt: 'Chamas do Infinito', en: 'Infinite Flame' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 6.5,
            stats: {
                skillAmp: 85,
                addAttack: 2747,
                criticalDamage: 25,
            },
            debuffs: {
                attackRate: -300,
            },
        }),
        generateSkill({
            name: { pt: 'Caçador Falcão', en: 'Falcon&amp;s Prey' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.5,
            stats: {
                skillAmp: 95,
                addAttack: 3399,
                criticalDamage: 25,
            },
            debuffs: {
                attackRate: -300,
            },
        }),
        generateSkill({
            name: { pt: 'Tempestade Mortal', en: 'Deadly Tempest' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 6.5,
            stats: {
                skillAmp: 85,
                addAttack: 2401,
                criticalDamage: 25,
            },
        }),
        generateSkill({
            name: { pt: 'Corte Relâmpago', en: 'Lightning Slash' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3,
            comboCastingTime: 2.8,
            coolDown: 7.1,
            stats: {
                skillAmp: 80,
                addAttack: 1807,
                criticalDamage: 20,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Choque Arcano', en: 'Arcane Shock' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1,
            comboCastingTime: 0.4,
            coolDown: 26.5,
            stats: {
                skillAmp: 20,
                addAttack: 306,
            },
        }),
        generateSkill({
            name: { pt: 'Corte Circular', en: 'Circular Slash' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 2.1,
            comboCastingTime: 1.3,
            coolDown: 2.6,
            stats: {
                skillAmp: 25,
                addAttack: 341,
            },
        }),
    ],
    [BattleStyleTypes.ForceBlader]: [
        generateSkill({
            name: { pt: 'Tremor Cataclísmico', en: 'Cataclysmic Tremor' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 6.9,
            stats: {
                skillAmp: 95,
                addAttack: 2639,
            },
        }),
        generateSkill({
            name: { pt: 'Selo da Condenação', en: 'Seal of Condemnation' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3,
            comboCastingTime: 2.6,
            coolDown: 8.2,
            stats: {
                skillAmp: 95,
                addAttack: 2159,
            },
            debuffs: {
                resistCriticalRate: -10,
                resistCriticalDamage: -10,
            },
        }),
        generateSkill({
            name: { pt: 'Massacre', en: 'Massacre' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3,
            comboCastingTime: 2.6,
            coolDown: 6.5,
            stats: {
                skillAmp: 80,
                addAttack: 1832,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Impacto Infernal', en: 'Infernal Impact' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 4.1,
            comboCastingTime: 3.5,
            coolDown: 8.4,
            stats: {
                skillAmp: 80,
                addAttack: 1625,
            },
            continuousDamage: {
                value: 67,
                duration: 8,
            },
        }),
        generateSkill({
            name: { pt: 'Cristal Ínfero', en: 'Infernal Crystal' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 2.2,
            comboCastingTime: 1.6,
            coolDown: 2.7,
            stats: {
                skillAmp: 55,
                addAttack: 366,
            },
        }),
        generateSkill(
            {
                name: { pt: 'Canhão de Pedra', en: 'Stone Cannon' },
                type: 'attack',
                rank: SkillRankType.Expert,
                castingTime: 1.7,
                comboCastingTime: 1.25,
                coolDown: 5.8,
                stats: {
                    skillAmp: 95,
                    addAttack: 193,
                },
            },
            true
        ),
        generateSkill(
            {
                name: { pt: "Canhão d'Água", en: 'Aqua Cannon' },
                type: 'attack',
                rank: SkillRankType.Expert,
                castingTime: 1.7,
                comboCastingTime: 1.25,
                coolDown: 4.8,
                stats: {
                    skillAmp: 85,
                    addAttack: 220,
                },
            },
            true
        ),
        generateSkill(
            {
                name: { pt: 'Canhão Relampejante', en: 'Lightning Cannon' },
                type: 'attack',
                rank: SkillRankType.Expert,
                castingTime: 2,
                comboCastingTime: 1.25,
                coolDown: 6.6,
                stats: {
                    skillAmp: 95,
                    addAttack: 285,
                },
            },
            true
        ),
        generateSkill({
            name: { pt: 'Choque Arcano', en: 'Arcane Shock' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1,
            comboCastingTime: 0.4,
            coolDown: 26.5,
            stats: {
                skillAmp: 20,
                addAttack: 306,
            },
        }),
        generateSkill({
            name: { pt: 'Corte Astral', en: 'Astral Cut' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.3,
            comboCastingTime: 0.8,
            coolDown: 1.8,
            stats: {
                skillAmp: 15,
                addAttack: 87,
            },
            continuousDamage: {
                value: 62,
                duration: 8,
            },
        }),
        generateSkill({
            name: { pt: 'Assalto Astral', en: 'Astral Assault' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.3,
            comboCastingTime: 0.8,
            coolDown: 1.8,
            stats: {
                skillAmp: 0,
                addAttack: 201,
            },
            continuousDamage: {
                value: 62,
                duration: 8,
            },
        }),
        generateSkill({
            name: { pt: 'Desbalancear', en: 'Unbalance' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 1.6,
            comboCastingTime: 0.95,
            coolDown: 2.1,
            stats: {
                skillAmp: 0,
                addAttack: 185,
            },
        }),
    ],
    [BattleStyleTypes.ForceShielder]: [
        generateSkill({
            name: { pt: 'Granada do Escudo', en: 'Shield Grenade' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 5.1,
            stats: {
                skillAmp: 95,
                addAttack: 2160,
                criticalDamage: 50,
            },
        }),
        generateSkill({
            name: { pt: 'Destruição Infernal', en: 'Infernal Destruction' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 6.5,
            stats: {
                skillAmp: 95,
                addAttack: 1764,
                criticalDamage: 50,
            },
            debuffs: {
                attack: -40,
            },
        }),
        generateSkill({
            name: { pt: 'Barragem de Escudo', en: 'Shield Barrage' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 4,
            comboCastingTime: 3.15,
            coolDown: 4.5,
            stats: {
                skillAmp: 80,
                addAttack: 1659,
                criticalDamage: 100,
            },
            continuousDamage: {
                value: 67,
                duration: 8,
            },
        }),
        generateSkill({
            name: { pt: 'Cólera do Escudo', en: 'Shield Wrath' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 4,
            comboCastingTime: 3.25,
            coolDown: 8.3,
            stats: {
                skillAmp: 80,
                addAttack: 1555,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Explosão do Escudo', en: 'Shield Explosion' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 3.3,
            comboCastingTime: 2,
            coolDown: 3.8,
            stats: {
                skillAmp: 65,
                addAttack: 685,
            },
        }),
        generateSkill({
            name: { pt: 'Raio do Escudo Arcano', en: 'Arcane Shield Ray' },
            type: 'attack',
            rank: SkillRankType.AMaster,
            castingTime: 2.5,
            comboCastingTime: 1.7,
            coolDown: 3,
            stats: {
                skillAmp: 55,
                addAttack: 452,
            },
        }),
        generateSkill({
            name: { pt: 'Carga de Escudo', en: 'Shield Charge' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1.3,
            comboCastingTime: 0.8,
            coolDown: 180,
            stats: {
                skillAmp: 10,
                addAttack: 500,
                accuracy: 1000,
            },
            debuffs: {
                resistCriticalRate: -21,
            },
        }),
        generateSkill({
            name: { pt: 'Choque Arcano', en: 'Arcane Shock' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1,
            comboCastingTime: 0.4,
            coolDown: 26.5,
            stats: {
                skillAmp: 20,
                addAttack: 306,
            },
        }),
    ],
    [BattleStyleTypes.Gladiator]: [
        generateSkill({
            name: { pt: 'Lançamento de Chakram', en: 'Chakram Launch' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.6,
            stats: {
                skillAmp: 90,
                addAttack: 2768,
                addAttackPerRage: 380,
                penetration: 50,
            },
            debuffs: {
                defense: -40,
            },
        }),
        generateSkill({
            name: { pt: 'Lâmina Ilusória', en: 'Illusionary Blade' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.6,
            comboCastingTime: 2.6,
            coolDown: 6.6,
            stats: {
                skillAmp: 80,
                addAttack: 2116,
                addAttackPerRage: 380,
                penetration: 50,
            },
            debuffs: {
                defense: -40,
            },
        }),
        generateSkill({
            name: { pt: 'Ilusão Momentânea', en: 'Momentary Illusion' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3.5,
            comboCastingTime: 3.5,
            coolDown: 8.2,
            stats: {
                skillAmp: 80,
                addAttack: 1961,
                addAttackPerRage: 350,
                penetration: 50,
            },
        }),
        generateSkill({
            name: { pt: 'Lâmina Rubra', en: 'Red Blade' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3.1,
            comboCastingTime: 3.1,
            coolDown: 6.9,
            stats: {
                skillAmp: 75,
                addAttack: 1638,
                addAttackPerRage: 340,
                accuracy: 200,
            },
        }),
        generateSkill({
            name: { pt: 'Lâmina Furiosa', en: 'Furious Blade' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 6.6,
            isAffectedByNumberOfTargets: true,
            stats: {
                skillAmp: 70,
                addAttack: 1088,
                addAttackPerRage: 200,
                accuracy: 200,
            },
        }),
        generateSkill({
            name: { pt: 'Corte Eterno', en: 'Eternal Cut' },
            type: 'attack',
            rank: SkillRankType.AMaster,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 2.5,
            stats: {
                skillAmp: 60,
                addAttack: 553,
                addAttackPerRage: 200,
                penetration: 10,
                criticalDamage: 20,
            },
        }),
        generateSkill({
            name: { pt: 'Ataque Lunar', en: 'Lunar Attack' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 1.1,
            comboCastingTime: 1.1,
            coolDown: 180,
            stats: {
                skillAmp: 10,
                addAttack: 500,
                accuracy: 1000,
            },
        }),
        generateSkill({
            name: { pt: 'Investida Mística', en: 'Mystic Enchant' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 1.3,
            comboCastingTime: 1.3,
            coolDown: 29.5,
            stats: {
                skillAmp: 30,
                addAttack: 510,
                addAttackPerRage: 52,
            },
        }),
        generateSkill({
            name: { pt: 'Desaparecer', en: 'Disappear' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 1.1,
            comboCastingTime: 1.1,
            coolDown: 1.5,
            stats: {
                skillAmp: 55,
                addAttack: 221,
                addAttackPerRage: 36,
                accuracy: 500,
            },
        }),
        generateSkill({
            name: { pt: 'Deslizar Rápida', en: 'Quick Slide' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 1,
            comboCastingTime: 1,
            coolDown: 1.6,
            stats: {
                skillAmp: 20,
                addAttack: 358,
                addAttackPerRage: 32,
            },
        }),
        generateSkill({
            name: { pt: 'Corte da Tempestade', en: 'Storm Cut' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 2.2,
            comboCastingTime: 2.2,
            coolDown: 2.5,
            stats: {
                skillAmp: 45,
                addAttack: 313,
                addAttackPerRage: 46,
            },
        }),
        generateSkill({
            name: { pt: 'Passo da Escuridão', en: 'Darkness Step' },
            type: 'attack',
            rank: SkillRankType.Expert,
            castingTime: 2,
            comboCastingTime: 2,
            coolDown: 3.8,
            stats: {
                skillAmp: 45,
                addAttack: 314,
                addAttackPerRage: 22,
            },
        }),
        generateSkill({
            name: { pt: 'Caminhos Cruzados', en: 'Cross Paths' },
            type: 'attack',
            rank: SkillRankType.Regular,
            castingTime: 2,
            comboCastingTime: 2,
            coolDown: 2.5,
            stats: {
                skillAmp: 35,
                addAttack: 200,
                addAttackPerRage: 22,
            },
        }),
    ],
    [BattleStyleTypes.ForceGunner]: [
        generateSkill({
            name: { pt: 'Corte Mecânico', en: 'Mechanical Cut' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3.3,
            comboCastingTime: 3.3,
            coolDown: 14.3,
            stats: {
                skillAmp: 90,
                addAttack: 3279,
                penetration: 40,
                criticalDamage: 30,
            },
            debuffs: {
                evasion: -200,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Bombardeiro Temporal', en: 'Temporal Bomber' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 2.4,
            comboCastingTime: 2.4,
            coolDown: 6.8,
            stats: {
                skillAmp: 100,
                addAttack: 2838,
                penetration: 40,
                criticalDamage: 30,
            },
            debuffs: {
                evasion: -200,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Vingador', en: 'Avenger' },
            type: 'attack',
            rank: SkillRankType.Transcender,
            castingTime: 3.3,
            comboCastingTime: 3.3,
            coolDown: 6.7,
            stats: {
                skillAmp: 85,
                addAttack: 2090,
                penetration: 40,
                criticalDamage: 30,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Convocação à Valquíria', en: 'Valkyrie Call' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3.2,
            comboCastingTime: 3.2,
            coolDown: 7.5,
            stats: {
                skillAmp: 80,
                addAttack: 1412,
                penetration: 30,
                criticalDamage: 20,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Mouse Mk-2', en: 'Mouse Mk-2' },
            type: 'attack',
            rank: SkillRankType.Completer,
            castingTime: 3.3,
            comboCastingTime: 3.3,
            coolDown: 5.6,
            stats: {
                skillAmp: 80,
                addAttack: 1455,
                penetration: 30,
                criticalDamage: 20,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Tiro de Ampla Cobertura', en: 'Wide Coverage Shot' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 3.7,
            comboCastingTime: 3.7,
            coolDown: 9.3,
            stats: {
                skillAmp: 80,
                addAttack: 1452,
                penetration: 20,
                criticalDamage: 15,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Bombardeiro Explosivo', en: 'Explosive Bomber' },
            type: 'attack',
            rank: SkillRankType.GMaster,
            castingTime: 3.7,
            comboCastingTime: 3.7,
            coolDown: 9.2,
            stats: {
                skillAmp: 80,
                addAttack: 1433,
                penetration: 20,
                criticalDamage: 15,
            },
            isAffectedByNumberOfTargets: true,
        }),
        generateSkill({
            name: { pt: 'Atira Granada', en: 'Throw Grenade' },
            type: 'attack',
            rank: SkillRankType.AMaster,
            castingTime: 3,
            comboCastingTime: 3,
            coolDown: 3.5,
            stats: {
                skillAmp: 65,
                addAttack: 685,
            },
        }),
        generateSkill({
            name: { pt: 'Mísseis do Pôr do Sol', en: 'Sunset Missiles' },
            type: 'attack',
            rank: SkillRankType.Master,
            castingTime: 2.5,
            comboCastingTime: 2.5,
            coolDown: 3.3,
            stats: {
                skillAmp: 60,
                addAttack: 662,
            },
        }),
        generateSkill({
            name: { pt: 'Satélite Relâmpago', en: 'Lightning Satellite' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 2.3,
            comboCastingTime: 2.3,
            coolDown: 2.6,
            stats: {
                skillAmp: 55,
                addAttack: 612,
            },
        }),
        generateSkill({
            name: { pt: 'Bala de Íon', en: 'Ion Bullet' },
            type: 'attack',
            rank: SkillRankType.AExpert,
            castingTime: 2,
            comboCastingTime: 2,
            coolDown: 2.5,
            stats: {
                skillAmp: 55,
                addAttack: 605,
            },
        }),
    ],
    [BattleStyleTypes.DarkMage]: [],
}