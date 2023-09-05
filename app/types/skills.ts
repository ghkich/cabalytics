import { BattleStyles } from '@/app/types/battleStyles'
import { v4 as uuidv4 } from 'uuid'

export type SkillStats = {
    skillAmp: number
    addAttack: number
    penetration?: number
    criticalDamage?: number
    defenseReduction?: number
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
        generateSkill('Lança da Terra', 'Earth Arrow', { skillAmp: 0.95, addAttack: 143 }),
        generateSkill('Lança da Água', 'Water Arrow', { skillAmp: 0.85, addAttack: 173 }),
        generateSkill('Lança do Fogo', 'Fire Arrow', { skillAmp: 0.85, addAttack: 202 }),
        generateSkill('Disparo Crítico', 'Critical Shot', { skillAmp: 0.25, addAttack: 147, criticalDamage: 1 }),
        generateSkill('Distorção Gravitacional', 'Gravitational Distortion', { skillAmp: 0.8, addAttack: 1239 }),
        generateSkill('Disparo Perfurante', 'Piercing Shot', { skillAmp: 0.55, addAttack: 672 }),
        generateSkill('Floresta de Flechas', 'Forest of Arrows', { skillAmp: 1.05, addAttack: 3239 }),
    ],
    [BattleStyles.Wizard]: [
        generateSkill('Lança da Terra', 'Earth Arrow', { skillAmp: 0.85, addAttack: 129 }),
        generateSkill('Meteoro de Chamas', 'Fire Meteor', { skillAmp: 0.85, addAttack: 1584 }),
        generateSkill('Canhão de Pedra', 'Earth Cannon', { skillAmp: 0.95, addAttack: 193 }),
        generateSkill('Canhão Múltiplo', 'Multiple Cannon', { skillAmp: 1, addAttack: 2838, penetration: 20 }),
    ],
    [BattleStyles.Warrior]: [
        generateSkill('Esmagador', 'Smash', { skillAmp: 1, addAttack: 2909 }),
        generateSkill('Desbalancear', 'Unbalance', { skillAmp: 0, addAttack: 136 }),
        generateSkill('Abalo Sísmico', 'Earthquake', { skillAmp: 0.8, addAttack: 1786 }),
    ],
    [BattleStyles.Blader]: [],
    [BattleStyles.ForceBlader]: [],
    [BattleStyles.ForceShielder]: [],
    [BattleStyles.Gladiator]: [],
    [BattleStyles.ForceGunner]: [],
    [BattleStyles.DarkMage]: [],
}