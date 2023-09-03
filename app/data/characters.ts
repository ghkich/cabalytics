import { AttackStats, BattleStyles, DefenseStats } from '@/app/data/stats'
import { lancaTerraMA, meteoroChamas } from '@/app/data/skills'

export type Character = AttackStats &
    DefenseStats & {
        battleStyle: BattleStyles
    }

export const jota4: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 4008 + 30,
    criticalRate: 0.63,
    criticalDamage: 2.22 + 0.02,
    magicSkillAmp: 1.33 + 0.01,
    penetration: 267 + 15,
    addDamage: 151,
    finalDamageUp: 0,
    ignoreDamageReduction: 23,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.26,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3605,
    defenseRate: 6602,
    evasion: 1591,
    damageReduction: 409 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.64,
    resistMagicSkillAmp: 0.57 + 0.2,
    resistSwordSkillAmp: 0.57 + 0.06,
    ignorePenetration: 201,
    ignoreAccuracy: 712,
    cancelIgnoreDamageReduction: 10,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota4ArcGuard: Character = {
    ...jota4,
    defense: 3820,
    damageReduction: 474 + 30,
    ignorePenetration: 266,
    finalDamageDown: 0.05,
}

export const jota4DebuffIgnPerf: Character = {
    ...jota4ArcGuard,
    ignorePenetration: jota4ArcGuard.ignorePenetration - 320,
}

export const starrk4: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 5022,
    criticalRate: 0.81,
    criticalDamage: 4.68 + 0.04,
    magicSkillAmp: 2.69 + 0.03,
    penetration: 1034,
    addDamage: 68,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 198 + 1,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.14,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 86,
    defense: 2083 + 2,
    damageReduction: 683 + 30,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.75,
    resistMagicSkillAmp: 0.49 + 0.31,
    resistSwordSkillAmp: 0.49 + 0.13,
    ignorePenetration: 454,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.13,
    damageReductionPercentage: 0.03,
}

export const starrk4Sem1Orb: Character = {
    ...starrk4,
    magicAttack: starrk4.magicAttack - 573 - 40 - 130 - 83 - 20,
    magicSkillAmp: starrk4.magicSkillAmp - 0.1 - 0.03,
    penetration: starrk4.penetration - 30 - 50,
    criticalDamage: starrk4.criticalDamage - 0.22 - 0.32 - 0.15 - 0.13,
    cancelIgnorePenetration: starrk4.cancelIgnorePenetration - 5,
}

export const starrk4SemOrbes: Character = {
    ...starrk4Sem1Orb,
    magicAttack: starrk4Sem1Orb.magicAttack - 670 - 90 - 130 - 88,
    penetration: starrk4Sem1Orb.penetration - 30 - 35,
    criticalDamage: starrk4Sem1Orb.criticalDamage - 0.27 - 0.36 - 0.15 - 0.11,
}

export const starrk4SemOrbesArcana: Character = {
    ...starrk4SemOrbes,
    magicAttack: starrk4SemOrbes.magicAttack - 135,
    penetration: starrk4SemOrbes.penetration - 55,
    criticalDamage: starrk4SemOrbes.criticalDamage - 0.25,
    magicSkillAmp: starrk4SemOrbes.magicSkillAmp - 0.16,
    ignoreDamageReduction: starrk4SemOrbes.ignoreDamageReduction - 25,
    cancelIgnorePenetration: starrk4SemOrbes.cancelIgnorePenetration - 14,
}

export const starrk4SemOrbesArcanaBracs: Character = {
    ...starrk4SemOrbesArcana,
    magicAttack: starrk4SemOrbesArcana.magicAttack - 25 - 35 - 25 - 45 - 14,
    penetration: starrk4SemOrbesArcana.penetration - 50 - 50,
    criticalDamage: starrk4SemOrbesArcana.criticalDamage - 0.09 - 0.09,
    magicSkillAmp: starrk4SemOrbesArcana.magicSkillAmp - 0.04 - 0.01 - 0.01 - 0.04 - 0.02,
    normalDamageUp: starrk4SemOrbesArcana.normalDamageUp - 0.07 - 0.06,
}

export const starrk4SemOrbesArcanaBracsDrag: Character = {
    ...starrk4SemOrbesArcanaBracs,
    magicAttack: starrk4SemOrbesArcanaBracs.magicAttack - 180,
    magicSkillAmp: starrk4SemOrbesArcanaBracs.magicSkillAmp - 0.11,
}

export const starrk4SemOrbesArcanaBracsCinto: Character = {
    ...starrk4SemOrbesArcanaBracsDrag,
    magicAttack: starrk4SemOrbesArcanaBracsDrag.magicAttack - 125,
    magicSkillAmp: starrk4SemOrbesArcanaBracsDrag.magicSkillAmp - 0.14,
    criticalDamage: starrk4SemOrbesArcanaBracsDrag.criticalDamage - 0.22,
    penetration: starrk4SemOrbesArcanaBracsDrag.penetration - 80,
}

export const starrk4SemOrbesArcanaBracsCintoTalis: Character = {
    ...starrk4SemOrbesArcanaBracsCinto,
    magicAttack: starrk4SemOrbesArcanaBracsCinto.magicAttack - 15 - 50,
    magicSkillAmp: starrk4SemOrbesArcanaBracsCinto.magicSkillAmp - 0.02 - 0.06,
    finalDamageUp: starrk4SemOrbesArcanaBracsCinto.finalDamageUp - 0.06,
}

export const starrk4SemOrbesArcanaBracsCintoTalisCorn: Character = {
    ...starrk4SemOrbesArcanaBracsCintoTalis,
    criticalDamage: starrk4SemOrbesArcanaBracsCintoTalis.criticalDamage - 0.16,
    magicSkillAmp: starrk4SemOrbesArcanaBracsCintoTalis.magicSkillAmp - 0.1,
    penetration: starrk4SemOrbesArcanaBracsCintoTalis.penetration - 60,
}

export const starrk4SemOrbesArcanaBracsCintoTalisCornBrincAmul: Character = {
    ...starrk4SemOrbesArcanaBracsCintoTalisCorn,
    magicAttack: starrk4SemOrbesArcanaBracsCintoTalisCorn.magicAttack - 50 - 50,
    criticalDamage: starrk4SemOrbesArcanaBracsCintoTalisCorn.criticalDamage - 0.06 - 0.06,
    normalDamageUp: starrk4SemOrbesArcanaBracsCintoTalisCorn.normalDamageUp - 0.07 - 0.07,
}

export const jota3: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 4008 + 30,
    criticalRate: 0.63,
    criticalDamage: 2.22 + 0.02,
    magicSkillAmp: 1.33 + 0.01,
    penetration: 267 + 15,
    addDamage: 151,
    finalDamageUp: 0,
    ignoreDamageReduction: 23,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.26,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3628,
    damageReduction: 449 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.48,
    resistMagicSkillAmp: 0.49 + 0.2,
    resistSwordSkillAmp: 0.49 + 0.16,
    ignorePenetration: 226,
    cancelIgnoreDamageReduction: 10,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const starrk3: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 3469,
    criticalRate: 0.6,
    criticalDamage: 4.61 + 0.04,
    magicSkillAmp: 1.44 + 0.03,
    penetration: 925,
    addDamage: 68,
    finalDamageUp: 0.07,
    ignoreDamageReduction: 198 + 1,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 86,
    defense: 2083 + 2,
    damageReduction: 683 + 30,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.75,
    resistMagicSkillAmp: 0.49 + 0.31,
    resistSwordSkillAmp: 0.49 + 0.13,
    ignorePenetration: 454,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.13,
    damageReductionPercentage: 0.03,
}

export const rockstarrk2: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 3469,
    criticalRate: 0.6,
    criticalDamage: 4.61 + 0.04,
    magicSkillAmp: 1.44 + 0.03,
    penetration: 925,
    addDamage: 68,
    finalDamageUp: 0.07,
    ignoreDamageReduction: 198 + 1,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 86,
    defense: 426,
    damageReduction: 258,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.22,
    resistMagicSkillAmp: 0.27 + 0.3,
    resistSwordSkillAmp: 0.27 + 0.12,
    ignorePenetration: 42,
    cancelIgnoreDamageReduction: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0.03,
}
export const talrasha: Character = {
    battleStyle: BattleStyles.Warrior,
    attack: 3668,
    magicAttack: 0,
    criticalRate: 0.48,
    criticalDamage: 2.38,
    swordSkillAmp: 1.27,
    magicSkillAmp: 0,
    penetration: 230,
    addDamage: 93,
    finalDamageUp: 0,
    ignoreDamageReduction: 1,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.03,
    ignoreResistSkillAmp: 0.03,
    normalDamageUp: 0.2,
    cancelIgnorePenetration: 0,
    defense: 3304,
    damageReduction: 602,
    resistCriticalRate: 0.17,
    resistCriticalDamage: 0.79,
    resistSwordSkillAmp: 0.25 + 0.24,
    resistMagicSkillAmp: 0.25 + 0.12,
    ignorePenetration: 193,
    cancelIgnoreDamageReduction: 70,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}
export const starrk2: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 2246,
    criticalRate: 0.48,
    criticalDamage: 0.81,
    magicSkillAmp: 0.05,
    penetration: 225,
    addDamage: 81,
    finalDamageUp: 0,
    ignoreDamageReduction: 1,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 2,
    defense: 2282,
    damageReduction: 558,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.96,
    resistMagicSkillAmp: 0.49 + 0.31,
    ignorePenetration: 455,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.01,
    damageReductionPercentage: 0.03,
}
export const jotinha2: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 2246,
    criticalRate: 0.48,
    criticalDamage: 0.81,
    magicSkillAmp: 0.05,
    penetration: 225,
    addDamage: 81,
    finalDamageUp: 0,
    ignoreDamageReduction: 1,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 2,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}
export const starrkPvEBuffGM: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 5097 + 51,
    criticalRate: 0.82,
    criticalDamage: 5.31 + 0.1,
    magicSkillAmp: 2.83 + 0.09,
    penetration: 1134 + 40,
    addDamage: 68 + 20,
    finalDamageUp: 0.07,
    ignoreDamageReduction: 198 + 2,
    ignoreResistCriticalRate: 0.13,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.13,
    normalDamageUp: 0.6 + 0.02,
    cancelIgnorePenetration: 141,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}
export const starrkPvE: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 5027 + 51,
    criticalRate: 0.81,
    criticalDamage: 4.7 + 0.1,
    magicSkillAmp: 2.7 + 0.09,
    penetration: 1034 + 40,
    addDamage: 68 + 20,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 198 + 2,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.14,
    normalDamageUp: 0.51 + 0.02,
    cancelIgnorePenetration: 86,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}
export const starrkPvEAmp65: Character = {
    ...starrkPvE,
    magicSkillAmp: starrkPvE.magicSkillAmp + 0.65,
}

export const starrkPvEDanos95: Character = {
    ...starrkPvE,
    criticalDamage: starrkPvE.criticalDamage + 0.95,
}

export const starrkPvEPerfura250: Character = {
    ...starrkPvE,
    penetration: starrkPvE.penetration + 250,
}

export const starrkPvESemArmas: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 3111 + 51,
    criticalRate: 0.67,
    criticalDamage: 2.99 + 0.1,
    magicSkillAmp: 2.57 + 0.09,
    penetration: 889 + 40,
    addDamage: 68 + 20,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 198 + 2,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.14,
    normalDamageUp: 0.51 + 0.02,
    cancelIgnorePenetration: 86,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}

export const starrkPvEFraco: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 3177 + 51,
    criticalRate: 0.34,
    criticalDamage: 2.51 + 0.1,
    magicSkillAmp: 1.76 + 0.09,
    penetration: 619,
    addDamage: 68 + 20,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 163 + 2,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.58,
    ignoreResistSkillAmp: 0.11,
    normalDamageUp: 0.6 + 0.02,
    cancelIgnorePenetration: 141,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}

export const starrkPvEFracoBuffGM: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 2682 + 51,
    criticalRate: 0.35,
    criticalDamage: 1.25 + 0.04,
    magicSkillAmp: 2.42 + 0.04,
    penetration: 374,
    addDamage: 68,
    finalDamageUp: 0.07,
    ignoreDamageReduction: 98 + 2,
    ignoreResistCriticalRate: 0.1,
    ignoreResistCriticalDamage: 0.5,
    ignoreResistSkillAmp: 0.1,
    normalDamageUp: 0.31 + 0.02,
    cancelIgnorePenetration: 72,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68,
    ignorePenetration: 558 + 23,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}

export const overAA: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 7000,
    criticalRate: 82,
    criticalDamage: 7,
    magicSkillAmp: 5,
    penetration: 1500,
    addDamage: 140,
    finalDamageUp: 0.1,
    ignoreDamageReduction: 500,
    ignoreResistCriticalRate: 0.3,
    ignoreResistCriticalDamage: 3,
    ignoreResistSkillAmp: 1.5,
    normalDamageUp: 1.2,
    cancelIgnorePenetration: 150,
    defense: 7000,
    damageReduction: 1000,
    resistCriticalRate: 0,
    resistCriticalDamage: 0,
    resistMagicSkillAmp: 0,
    ignorePenetration: 2000,
    cancelIgnoreDamageReduction: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}
export const fantoche: Character = {
    battleStyle: BattleStyles.Fantoche,
    magicAttack: 0,
    criticalRate: 0,
    criticalDamage: 0,
    magicSkillAmp: 0,
    penetration: 0,
    addDamage: 0,
    finalDamageUp: 0,
    ignoreDamageReduction: 0,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 0,
    defense: 50000,
    damageReduction: 1500,
    resistCriticalRate: 0,
    resistCriticalDamage: 0,
    resistMagicSkillAmp: 0,
    ignorePenetration: 500,
    cancelIgnoreDamageReduction: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 4033 + 30,
    criticalRate: 0.63,
    criticalDamage: 2.5 + 0.02,
    magicSkillAmp: 1.33 + 0.01,
    penetration: 267 + 15,
    addDamage: 151,
    finalDamageUp: 0,
    ignoreDamageReduction: 53,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.26,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3622,
    damageReduction: 437 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.51,
    resistMagicSkillAmp: 0.54 + 0.2,
    ignorePenetration: 221,
    cancelIgnoreDamageReduction: 10,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota2: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 4008 + 30,
    criticalRate: 0.63,
    criticalDamage: 2.22 + 0.02,
    magicSkillAmp: 1.33 + 0.01,
    penetration: 267 + 15,
    addDamage: 151,
    finalDamageUp: 0,
    ignoreDamageReduction: 23,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.26,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3607,
    damageReduction: 447 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.51,
    resistMagicSkillAmp: 0.49 + 0.2,
    ignorePenetration: 221,
    cancelIgnoreDamageReduction: 10,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota2Perfura80 = { ...jota2, penetration: jota2.penetration + 80 }
export const jota2Perfura200 = { ...jota2, penetration: jota2.penetration + 200 }
export const jota2Perfura250 = { ...jota2, penetration: jota2.penetration + 250 }
export const jota2Perfura450 = { ...jota2, penetration: jota2.penetration + 450 }

export const rock2: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 1631,
    criticalRate: 0.28,
    criticalDamage: 0.77,
    magicSkillAmp: 0.08,
    penetration: 301,
    addDamage: 66,
    finalDamageUp: 0,
    ignoreDamageReduction: 8,
    ignoreResistCriticalRate: 0.09,
    ignoreResistCriticalDamage: 0.3,
    ignoreResistSkillAmp: 0.1,
    normalDamageUp: 0.01,
    cancelIgnorePenetration: 0,
    defense: 426,
    damageReduction: 258,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.22,
    resistMagicSkillAmp: 0.27 + 0.3,
    ignorePenetration: 42,
    cancelIgnoreDamageReduction: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0.03,
}

export const rock2SemTempus = {
    ...rock2,
    penetration: rock2.penetration - 50,
    criticalDamage: rock2.criticalDamage - 0.05,
    magicAttack: rock2.magicAttack - 15,
}

export const rock2SemTempusDanos20 = {
    ...rock2SemTempus,
    criticalDamage: rock2SemTempus.criticalDamage + 0.2,
}

export const rock2addDmg10 = {
    ...rock2,
    addDamage: rock2.addDamage + 10,
}

export const starrk: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 4932,
    criticalRate: 0.81,
    criticalDamage: 4.67 + 0.04,
    magicSkillAmp: 2.68,
    penetration: 1029,
    addDamage: 68,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 188,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.13,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 81,
    defense: 5553,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68 + 0.31,
    ignorePenetration: 558,
    cancelIgnoreDamageReduction: 41,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}

export const rock: Character = {
    battleStyle: BattleStyles.ForceArcher,
    magicAttack: 1631,
    criticalRate: 0.28,
    criticalDamage: 0.77,
    magicSkillAmp: 0.08,
    penetration: 301,
    addDamage: 66,
    finalDamageUp: 0,
    ignoreDamageReduction: 8,
    ignoreResistCriticalRate: 0.09,
    ignoreResistCriticalDamage: 0.3,
    ignoreResistSkillAmp: 0.1,
    normalDamageUp: 0.01,
    cancelIgnorePenetration: 0,
    defense: 426,
    damageReduction: 258,
    resistCriticalRate: 0.19,
    resistCriticalDamage: 1.22,
    resistMagicSkillAmp: 0.27 + 0.3,
    ignorePenetration: 42,
    cancelIgnoreDamageReduction: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0.03,
}

export const rock20AddDmg = {
    ...rock,
    addDamage: rock.addDamage + 20,
}

export const rock14Amp20Danos = {
    ...rock,
    magicSkillAmp: rock.magicSkillAmp + 0.14,
    criticalDamage: rock.criticalDamage + 0.2,
}

export const starrk1: Character = {
    battleStyle: BattleStyles.ForceArcher,
    attack: 1614,
    magicAttack: 2896,
    attackRate: 5396,
    criticalRate: 0.67,
    criticalDamage: 2.74 + 0.04,
    swordSkillAmp: 1.31 + 0.03,
    magicSkillAmp: 2.41 + 0.03,
    accuracy: 1566,
    penetration: 834,
    addDamage: 68,
    ignoreEvasion: 782,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 173,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.13,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 72,
    defense: 5243 + 2,
    defenseRate: 8205,
    evasion: 1478,
    damageReduction: 741,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.95,
    resistMagicSkillAmp: 0.68 + 0.31,
    resistSwordSkillAmp: 0.68 + 0.13,
    ignorePenetration: 473,
    ignoreAccuracy: 965,
    cancelIgnoreDamageReduction: 36,
    cancelIgnoreEvasion: 5,
    finalDamageDown: 0.07,
    damageReductionPercentage: 0.03,
}

export const jotinha: Character = {
    battleStyle: BattleStyles.Wizard,
    magicAttack: 2046,
    criticalRate: 0.48,
    criticalDamage: 0.81,
    magicSkillAmp: 0.05,
    penetration: 225,
    addDamage: 81,
    finalDamageUp: 0,
    ignoreDamageReduction: 1,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 1,
    defense: 3552,
    damageReduction: 437 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.45,
    resistMagicSkillAmp: 0.49 + 0.2,
    ignorePenetration: 221,
    cancelIgnoreDamageReduction: 10,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jotinhaPerfura80 = { ...jotinha, penetration: jotinha.penetration + 80 }
export const jotinhaPerfura250 = { ...jotinha, penetration: jotinha.penetration + 250 }
export const jotinhaPerfura450 = { ...jotinha, penetration: jotinha.penetration + 450 }

export const jota1: Character = {
    battleStyle: BattleStyles.Wizard,
    attack: 1917 + 30,
    magicAttack: 4023 + 30,
    attackRate: 5902,
    criticalRate: 0.61,
    criticalDamage: 2.32 + 0.02,
    swordSkillAmp: 0.75 + 0.01,
    magicSkillAmp: 1.3 + 0.01,
    accuracy: 923,
    penetration: 267 + 15,
    addDamage: 151,
    ignoreEvasion: 407,
    finalDamageUp: 0,
    ignoreDamageReduction: 23,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.23,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3552,
    defenseRate: 6497,
    evasion: 1591,
    damageReduction: 437 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.45,
    resistMagicSkillAmp: 0.49 + 0.2,
    resistSwordSkillAmp: 0.49 + 0.06,
    ignorePenetration: 221,
    ignoreAccuracy: 687,
    cancelIgnoreDamageReduction: 10,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota1Amplificar = {
    ...jota1,
    defense: jota1.defense + 60,
    damageReduction: jota1.damageReduction + 20,
}

export const starrk0: Character = {
    battleStyle: BattleStyles.ForceArcher,
    attack: 1614,
    magicAttack: 2896,
    attackRate: 5396,
    criticalRate: 0.67,
    criticalDamage: 2.74 + 0.04,
    swordSkillAmp: 1.31 + 0.03,
    magicSkillAmp: 2.41 + 0.03,
    accuracy: 1566,
    penetration: 834,
    addDamage: 68,
    ignoreEvasion: 782,
    finalDamageUp: 0.06,
    ignoreDamageReduction: 173,
    ignoreResistCriticalRate: 0.12,
    ignoreResistCriticalDamage: 0.96,
    ignoreResistSkillAmp: 0.13,
    normalDamageUp: 0.51,
    cancelIgnorePenetration: 72,
    defense: 5567 + 2,
    defenseRate: 8525,
    evasion: 1418,
    damageReduction: 826,
    resistCriticalRate: 0.24,
    resistCriticalDamage: 1.97,
    resistMagicSkillAmp: 0.7 + 0.31,
    resistSwordSkillAmp: 0.7 + 0.13,
    ignorePenetration: 558,
    ignoreAccuracy: 1085,
    cancelIgnoreDamageReduction: 36,
    cancelIgnoreEvasion: 5,
    finalDamageDown: 0.12,
    damageReductionPercentage: 0.03,
}

export const starrk0SemMoto = { ...starrk0, defense: starrk0.defense - 628 }
export const starrk0SemMotoRes5Amp = { ...starrk0SemMoto, resistMagicSkillAmp: starrk0.resistMagicSkillAmp + 0.05 }
export const starrk0SemMotoRes6Danos = { ...starrk0SemMoto, resistCriticalDamage: starrk0.resistCriticalDamage + 0.06 }
export const starrk0ReducaoDano30 = { ...starrk0, damageReduction: starrk0.damageReduction + 30 }
export const starrk0IgnorarPerfura30 = { ...starrk0, ignorePenetration: starrk0.ignorePenetration + 30 }
export const starrk0SemMotoCoturno = {
    ...starrk0SemMoto,
    defense: starrk0SemMoto.defense - 552 - 110 - 92,
    damageReduction: starrk0.damageReduction - 36,
    ignorePenetration: starrk0.ignorePenetration - 6 - 25 - 60,
    resistMagicSkillAmp: starrk0.resistMagicSkillAmp - 0.03,
}
export const starrk0SemMotoCoturnoTraje = {
    ...starrk0SemMotoCoturno,
    defense: starrk0SemMotoCoturno.defense - 530 - 110 - 92,
    damageReduction: starrk0SemMotoCoturno.damageReduction - 36 - 50,
    ignorePenetration: starrk0SemMotoCoturno.ignorePenetration - 6 - 25,
    resistMagicSkillAmp: starrk0SemMotoCoturno.resistMagicSkillAmp - 0.07,
}
export const starrk0SemMotoCoturnoTrajeLuva = {
    ...starrk0SemMotoCoturnoTraje,
    defense: starrk0SemMotoCoturnoTraje.defense - 530 - 110 - 92,
    damageReduction: starrk0SemMotoCoturnoTraje.damageReduction - 36,
    ignorePenetration: starrk0SemMotoCoturnoTraje.ignorePenetration - 6 - 25,
}

export const jota0: Character = {
    battleStyle: BattleStyles.Wizard,
    attack: 2007 + 30,
    magicAttack: 4033 + 30,
    attackRate: 6702,
    criticalRate: 0.63,
    criticalDamage: 2.5 + 0.02,
    swordSkillAmp: 0.78 + 0.01,
    magicSkillAmp: 1.33 + 0.01,
    accuracy: 883,
    penetration: 267 + 15,
    addDamage: 151,
    ignoreEvasion: 467,
    finalDamageUp: 0,
    ignoreDamageReduction: 53,
    ignoreResistCriticalRate: 0.05,
    ignoreResistCriticalDamage: 0.23,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0.24 + 0.06,
    cancelIgnorePenetration: 2,
    defense: 3552,
    defenseRate: 6497,
    evasion: 1591,
    damageReduction: 437 + 30,
    resistCriticalRate: 0.2,
    resistCriticalDamage: 1.45,
    resistMagicSkillAmp: 0.49 + 0.2,
    resistSwordSkillAmp: 0.49 + 0.06,
    ignorePenetration: 221,
    ignoreAccuracy: 687,
    cancelIgnoreDamageReduction: 10,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
    damageReductionPercentage: 0,
}

export const jota0Atk80 = { ...jota0, magicAttack: jota0.magicAttack + 80 }
export const jota0AddDmg30 = { ...jota0, addDamage: jota0.addDamage + 30 }
export const jota0Perfura80 = { ...jota0, penetration: jota0.penetration + 80 }
export const jota0Perfura120 = { ...jota0, penetration: jota0.penetration + 120 }
export const jota0TecAmp65 = { ...jota0, magicSkillAmp: jota0.magicSkillAmp + 0.65 }
export const jota0Perfura250 = { ...jota0, penetration: jota0.penetration + 250 }
export const jota0Danos95 = { ...jota0, criticalDamage: jota0.criticalDamage + 0.95 }
export const jota0Perfura450 = { ...jota0, penetration: jota0.penetration + 450 }

export const allTests = [
    {
        attacker: jotinha2,
        defender: starrk2,
        builds: [
            {
                description: 'normal',
                attacks: [
                    {
                        skill: lancaTerraMA,
                        expected: [19, 43],
                    },
                    {
                        skill: meteoroChamas,
                        expected: [83, 108],
                    },
                ],
            },
            {
                description: 'perfura +200',
                attackerAdditionalStats: {
                    penetration: 200,
                },
                attacks: [
                    {
                        skill: lancaTerraMA,
                        expected: [52, 83],
                    },
                    {
                        skill: meteoroChamas,
                        expected: [136, 167],
                    },
                ],
            },
            {
                description: 'perf +200 / ign perf +45',
                attackerAdditionalStats: {
                    penetration: 200,
                },
                defenderAdditionalStats: {
                    ignorePenetration: 45,
                },
                attacks: [
                    {
                        skill: lancaTerraMA,
                        expected: [45, 74],
                    },
                    {
                        skill: meteoroChamas,
                        expected: [124, 153],
                    },
                ],
            },
            {
                description: 'perf +250 / buffs',
                attackerAdditionalStats: {
                    penetration: 250 + 250 + 85,
                    magicSkillAmp: 0.25,
                    magicAttack: 170,
                    criticalDamage: 0.01,
                    maximumCriticalDamage: 1.01,
                    maximumSkillAmp: 1.01,
                    cancelIgnorePenetration: 30,
                },
                attacks: [
                    {
                        skill: meteoroChamas,
                        expected: [320, 369],
                    },
                ],
            },
            {
                description: 'perf +250 / buffs / ign +45',
                attackerAdditionalStats: {
                    penetration: 250 + 250 + 85,
                    magicSkillAmp: 0.25,
                    magicAttack: 170,
                    criticalDamage: 0.01,
                    maximumCriticalDamage: 1.01,
                    maximumSkillAmp: 1.01,
                    cancelIgnorePenetration: 30,
                },
                defenderAdditionalStats: {
                    ignorePenetration: 45,
                },
                attacks: [
                    {
                        skill: meteoroChamas,
                        expected: [306, 353],
                    },
                ],
            },
            {
                description: 'perf +250 / buffs / perf -45',
                attackerAdditionalStats: {
                    penetration: 250 + 250 + 85 - 45,
                    magicSkillAmp: 0.25,
                    magicAttack: 170,
                    criticalDamage: 0.01,
                    maximumCriticalDamage: 1.01,
                    maximumSkillAmp: 1.01,
                    cancelIgnorePenetration: 30,
                },
                attacks: [
                    {
                        skill: meteoroChamas,
                        expected: [306, 353],
                    },
                ],
            },
        ],
    },
]