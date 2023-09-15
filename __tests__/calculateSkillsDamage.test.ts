import { Attacker, calculateSkillsDamage, Defender } from '@/app/api/calculate-skills-damage/calculateSkillsDamage'
import { BattleStyleTypes } from '@/app/data/battleStyles'
import { Skill } from '@/app/data/skills'
import { calculatePenetration } from '@/app/api/calculate-skills-damage/calculateAttributeFactors'

const mockedAttacker: Attacker = {
    battleStyleType: BattleStyleTypes.ForceArcher,
    effectiveAttack: 1000,
    effectiveSkillAmp: 100,
    criticalEffectiveness: 1,
    criticalDamage: 100,
    criticalRate: 50,
    penetration: 500,
    addDamage: 100,
    finalDamageUp: 10,
    ignoreDamageReduction: 200,
    ignoreResistCriticalDamage: 10,
    ignoreResistCriticalRate: 10,
    ignoreResistSkillAmp: 10,
    normalDamageUp: 5,
    cancelIgnorePenetration: 50,
    attackRate: 1000,
    accuracy: 1000,
    minimumDamage: 0,
    ignoreEvasion: 1000,
}

const mockedDefender: Defender = {
    type: 'player',
    effectiveResistSkillAmp: 10,
    penetrationArmorFactor: 1.15,
    baselineArmor: 1000,
    hp: 10000,
    defense: 1000,
    defenseRate: 1000,
    evasion: 1000,
    damageReduction: 200,
    resistCriticalRate: 20,
    resistCriticalDamage: 20,
    ignorePenetration: 100,
    ignoreAccuracy: 200,
    cancelIgnoreDamageReduction: 100,
    cancelIgnoreEvasion: 100,
    finalDamageDown: 10,
}

const mockedSkill: Skill = {
    id: 'test-skill',
    data: {
        name: { pt: 'Skill Teste', en: 'Test Skill' },
        type: 'attack',
        rank: 0,
        castingTime: 1,
        comboCastingTime: 1,
        coolDown: 1,
        stats: {
            skillAmp: 100,
            addAttack: 1000,
        },
    },
}

const updateSkill = (skill: Skill, data: Partial<Skill['data']>, stats: Partial<Skill['data']['stats']> = {}) => {
    return {
        ...skill,
        data: {
            ...skill.data,
            ...data,
            stats: {
                ...skill.data.stats,
                ...stats,
            },
        },
    }
}

describe.only('calculateSkillsDamage', () => {
    describe('calculatePenetration', () => {
        describe('when there is no cancelIgnorePenetration or skill penetration', () => {
            it('should return the same penetration and ignorePenetration', () => {
                const attacker = { ...mockedAttacker, penetration: 500, cancelIgnorePenetration: 0 }
                const defender = { ...mockedDefender, ignorePenetration: 300 }
                const { ignorePenetration, penetration } = calculatePenetration(attacker, defender, mockedSkill)
                expect(penetration).toBe(500)
                expect(ignorePenetration).toBe(300)
            })
        })
        describe('when attacker has cancelIgnorePenetration', () => {
            it('should subtract that value from the ignorePenetration of the defender', () => {
                const attacker = { ...mockedAttacker, cancelIgnorePenetration: 100 }
                const defender = { ...mockedDefender, ignorePenetration: 300 }
                const { ignorePenetration } = calculatePenetration(attacker, defender, mockedSkill)
                expect(ignorePenetration).toBe(200)
            })
        })
        describe('when skill penetration has some value', () => {
            it('should sum penetration of the skill and the attacker', () => {
                const attacker = { ...mockedAttacker, penetration: 300 }
                const defender = { ...mockedDefender }
                const skill = updateSkill(mockedSkill, {}, { penetration: 100 })
                const { penetration } = calculatePenetration(attacker, defender, skill)
                expect(penetration).toBe(400)
            })
        })
    })
})