export type Skill = {
    name: string
    skillAmp: number
    addAttack: number
    penetration?: number
    criticalDamage?: number
    defenseReduction?: number
}

export const lancaTerraMA: Skill = {
    name: 'Lança Terra',
    skillAmp: 0.85,
    addAttack: 129,
}

export const meteoroChamas: Skill = {
    name: 'Meteoro Chamas',
    skillAmp: 0.85,
    addAttack: 1584,
}

export const lancaTerraAA: Skill = {
    name: 'Lança Terra',
    skillAmp: 0.95,
    addAttack: 143,
}

export const lancaAguaAA: Skill = {
    name: 'Lança Água',
    skillAmp: 0.85,
    addAttack: 173,
}

export const lancaFogoAA: Skill = {
    name: 'Lança Fogo',
    skillAmp: 0.85,
    addAttack: 202,
}

export const disparoCritico: Skill = {
    name: 'Disparo Crítico',
    skillAmp: 0.25,
    addAttack: 147,
    criticalDamage: 1,
}
export const distorcaoGravitacional: Skill = {
    name: 'Distorção Gravitacional',
    skillAmp: 0.8,
    addAttack: 1239,
}

export const florestaFlechas: Skill = {
    name: 'Floresta Flechas',
    skillAmp: 1.05,
    addAttack: 3239,
}

export const canhaoPedraMA: Skill = {
    name: 'Canhão Pedra',
    skillAmp: 0.95,
    addAttack: 193,
}

export const normalAttack: Skill = {
    name: 'Ataque Normal',
    skillAmp: 0,
    addAttack: 0,
}
export const canhaoMultiplo: Skill = {
    name: 'Canhão Múltiplo',
    skillAmp: 1,
    addAttack: 2838,
    penetration: 20,
}

export const disparoPerfurante: Skill = {
    name: 'Disparo Perfurante',
    skillAmp: 0.55,
    addAttack: 672,
}

export const canhaoPedraAA: Skill = {
    name: 'Canhão Pedra',
    skillAmp: 1.05,
    addAttack: 222,
}

export const esmagador: Skill = {
    name: 'Esmagador',
    skillAmp: 1,
    addAttack: 2909,
    defenseReduction: 20,
}

export const desbalancearGU: Skill = {
    name: 'Desbalancear',
    skillAmp: 0,
    addAttack: 136,
}

export const abaloSismico: Skill = {
    name: 'Abalo Sísmico',
    skillAmp: 0.8,
    addAttack: 1786,
}