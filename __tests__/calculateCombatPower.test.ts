import {
    CharacterBuild,
    generateCharacterBuild,
    initialAttackAttributes,
    initialDefenseAttributes,
    zeroAttackAttributes,
    zeroDefenseAttributes,
} from '@/app/data/builds'
import { calculateCombatPower } from '@/lib/calculateCombatPower'
import { AttackAttributes, attackAttributes, AttributeCategoryValue, AttributeTypeValue } from '@/app/data/attributes'
import { battleStylesData, BattleStyleTypes } from '@/app/data/battleStyles'
import { DamageMode } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'

type UpdateBuildAttributeParams<T> = {
    type: AttributeTypeValue
    category: AttributeCategoryValue
    attributes: {
        [key in keyof T]?: number
    }
}

function updateBuildAttribute<T>(build: CharacterBuild, params: UpdateBuildAttributeParams<T>): CharacterBuild {
    const { type, category, attributes } = params

    return {
        ...build,
        data: {
            ...build.data,
            stats: {
                ...build.data.stats,
                [type]: {
                    ...build.data.stats[type],
                    [category]: { ...build.data.stats[type][category], ...attributes },
                },
            },
        },
    }
}

const assertCombatPowerTotal = (combatPower: any, damageMode: string | undefined) => {
    let attackTotalExpectation = combatPower.attack.general
    let defenseTotalExpectation = combatPower.defense.general

    if (damageMode) {
        attackTotalExpectation += combatPower.attack[damageMode]
        defenseTotalExpectation += combatPower.defense[damageMode]
    }

    expect(combatPower.attack.total).toBe(attackTotalExpectation)
    expect(combatPower.defense.total).toBe(defenseTotalExpectation)
    expect(combatPower.total).toBe(attackTotalExpectation + defenseTotalExpectation)
}

const zeroStatsBuild = generateCharacterBuild({
    type: 'attacker',
    stats: {
        attack: {
            general: zeroAttackAttributes,
            pvp: zeroAttackAttributes,
            pve: zeroAttackAttributes,
        },
        defense: {
            general: zeroDefenseAttributes,
            pvp: zeroDefenseAttributes,
            pve: zeroDefenseAttributes,
        },
    },
})

const initialStatsBuild = generateCharacterBuild({
    type: 'attacker',
    stats: {
        attack: {
            general: initialAttackAttributes,
            pvp: { ...initialAttackAttributes, penetration: 10 },
            pve: { ...initialAttackAttributes, penetration: 500 },
        },
        defense: {
            general: initialDefenseAttributes,
            pvp: { ...initialDefenseAttributes, resistSwordSkillAmp: 10 },
            pve: { ...initialDefenseAttributes, resistMagicSkillAmp: 500 },
        },
    },
})

describe('calculateCombatPower', () => {
    describe('when stats are 0', () => {
        it('should return 0 for all combat power values', () => {
            const combatPower = calculateCombatPower(zeroStatsBuild)
            expect(combatPower.attack.general).toBe(0)
            expect(combatPower.attack.pvp).toBe(0)
            expect(combatPower.attack.pve).toBe(0)
            expect(combatPower.attack.total).toBe(0)
            expect(combatPower.defense.general).toBe(0)
            expect(combatPower.defense.pvp).toBe(0)
            expect(combatPower.defense.pve).toBe(0)
            expect(combatPower.defense.total).toBe(0)
            expect(combatPower.total).toBe(0)
        })
    })
    describe('For magic-based battle styles', () => {
        const damageModes: (DamageMode | undefined)[] = [undefined, 'pvp', 'pve']
        damageModes.forEach((damageMode) => {
            describe(`when damageMode is ${damageMode || 'undefined'}`, () => {
                it('should return the correct total', () => {
                    const combatPower = calculateCombatPower(initialStatsBuild, damageMode)
                    assertCombatPowerTotal(combatPower, damageMode)
                })
            })
        })
    })
    describe('For magic-based battle styles', () => {
        const magicBasedStyles = Object.entries(battleStylesData).filter(([_, style]) => style.isMagicBased)

        Object.keys(attackAttributes).forEach((key) => {
            const attributeKey = key as keyof typeof attackAttributes

            it(`returns the correct general attack power score for attribute "${key}"`, () => {
                magicBasedStyles.forEach(([battleStyleType, _]) => {
                    const build = updateBuildAttribute<AttackAttributes>(zeroStatsBuild, {
                        type: 'attack',
                        category: 'general',
                        attributes: { [attributeKey]: 1 },
                    })
                    build.data.battleStyleType = battleStyleType as BattleStyleTypes
                    const combatPower = calculateCombatPower(build)
                    const expectedScore = ['attack', 'swordSkillAmp'].includes(key)
                        ? 0
                        : attackAttributes[attributeKey].score
                    expect(combatPower.attack.general).toBe(expectedScore)
                })
            })
        })
    })
    describe('For non-magic-based battle styles', () => {
        const nonMagicBasedStyles = Object.entries(battleStylesData).filter(([_, style]) => !style.isMagicBased)

        Object.keys(attackAttributes).forEach((key) => {
            const attributeKey = key as keyof typeof attackAttributes

            it(`returns the correct general attack power score for attribute "${key}"`, () => {
                nonMagicBasedStyles.forEach(([battleStyleType, _]) => {
                    const build = updateBuildAttribute<AttackAttributes>(zeroStatsBuild, {
                        type: 'attack',
                        category: 'general',
                        attributes: { [attributeKey]: 1 },
                    })
                    build.data.battleStyleType = battleStyleType as BattleStyleTypes
                    const combatPower = calculateCombatPower(build)
                    const expectedScore = ['magicAttack', 'magicSkillAmp'].includes(key)
                        ? 0
                        : attackAttributes[attributeKey].score
                    expect(combatPower.attack.general).toBe(expectedScore)
                })
            })
        })
    })
})