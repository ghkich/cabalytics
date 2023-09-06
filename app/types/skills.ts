import { BattleStyles } from '@/app/types/battleStyles'
import { v4 as uuidv4 } from 'uuid'

export type SkillStats = {
    skillAmp: number
    addAttack: number
    penetration?: number
    criticalDamage?: number
    defenseReduction?: number
    castingTime: number
    comboCastingTime: number
}

export type Skill = {
    id: string
    name: { pt: string; en: string }
} & SkillStats

const generateSkill = (namePt: string, nameEn: string, stats: SkillStats) => ({
    id: uuidv4(),
    name: { pt: namePt, en: nameEn },
    ...stats,
})

export const skills: Record<BattleStyles, Skill[]> = {
    [BattleStyles.ForceArcher]: [
        generateSkill('Lança de Terra', 'Earth Arrow', {
            skillAmp: 0.95,
            addAttack: 143,
            castingTime: 1.3,
            comboCastingTime: 1.05,
        }),
        generateSkill("Lança d'Água", 'Water Arrow', {
            skillAmp: 0.85,
            addAttack: 173,
            castingTime: 1.3,
            comboCastingTime: 1.05,
        }),
        generateSkill('Lança do Fogo', 'Fire Arrow', {
            skillAmp: 0.85,
            addAttack: 202,
            castingTime: 1.3,
            comboCastingTime: 1.05,
        }),
        generateSkill('Disparo Crítico', 'Critical Shot', {
            skillAmp: 0.25,
            addAttack: 147,
            criticalDamage: 1,
            castingTime: 1.3,
            comboCastingTime: 1.1,
        }),
        generateSkill('Distorção Gravitacional', 'Gravitational Distortion', {
            skillAmp: 0.8,
            addAttack: 1239,
            castingTime: 2.3,
            comboCastingTime: 1.5,
        }),
        generateSkill('Disparo Perfurante', 'Piercing Shot', {
            skillAmp: 0.55,
            addAttack: 672,
            castingTime: 2.7,
            comboCastingTime: 2.25,
        }),
        generateSkill('Floresta de Flechas', 'Forest of Arrows', {
            skillAmp: 1.05,
            addAttack: 3239,
            castingTime: 2.5,
            comboCastingTime: 2.1,
        }),
    ],
    [BattleStyles.Wizard]: [
        generateSkill('Lança de Terra', 'Earth Arrow', {
            skillAmp: 0.85,
            addAttack: 129,
            castingTime: 1.8,
            comboCastingTime: 1.05,
        }),
        generateSkill('Meteoro de Chamas', 'Fire Meteor', {
            skillAmp: 0.85,
            addAttack: 1584,
            castingTime: 2.3,
            comboCastingTime: 1.5,
        }),
        generateSkill('Canhão de Pedra', 'Earth Cannon', {
            skillAmp: 0.95,
            addAttack: 193,
            castingTime: 2,
            comboCastingTime: 1.25,
        }),
        generateSkill('Canhão Múltiplo', 'Multiple Cannon', {
            skillAmp: 1,
            addAttack: 2838,
            penetration: 20,
            castingTime: 2.5,
            comboCastingTime: 2,
        }),
    ],
    [BattleStyles.Warrior]: [
        generateSkill('Esmagador', 'Smash', { skillAmp: 1, addAttack: 2909, castingTime: 2.5, comboCastingTime: 2 }),
        generateSkill('Desbalancear', 'Unbalance', {
            skillAmp: 0,
            addAttack: 136,
            castingTime: 1.6,
            comboCastingTime: 0.95,
        }),
        generateSkill('Abalo Sísmico', 'Earthquake', {
            skillAmp: 0.8,
            addAttack: 1786,
            castingTime: 3,
            comboCastingTime: 2.25,
        }),
    ],
    [BattleStyles.Blader]: [],
    [BattleStyles.ForceBlader]: [],
    [BattleStyles.ForceShielder]: [],
    [BattleStyles.Gladiator]: [],
    [BattleStyles.ForceGunner]: [],
    [BattleStyles.DarkMage]: [],
}