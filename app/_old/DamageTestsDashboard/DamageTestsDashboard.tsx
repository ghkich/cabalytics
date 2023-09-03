'use client'
import React from 'react'
import * as char from '@/app/_old/DamageTestsDashboard/characters'
import { Character } from '@/app/_old/DamageTestsDashboard/characters'
import {
    abaloSismico,
    canhaoMultiplo,
    canhaoPedraAA,
    canhaoPedraMA,
    desbalancearGU,
    disparoPerfurante,
    distorcaoGravitacional,
    esmagador,
    florestaFlechas,
    lancaTerraAA,
    lancaTerraMA,
    meteoroChamas,
    normalAttack,
    Skill,
} from '@/app/data/skills'
import { BattleStyles } from '@/app/_old/DamageTestsDashboard/stats'

const magicBattlesStyles = [BattleStyles.Wizard, BattleStyles.ForceArcher]

const attackScore = {
    attack: 34.5,
    attackRate: 3,
    criticalRate: 750,
    criticalDamage: 177,
    skillAmp: 349,
    accuracy: 6.5,
    penetration: 71,
    addDamage: 35,
    ignoreEvasion: 4.5,
    finalDamageUp: 1604,
    ignoreDamageReduction: 16.8,
    ignoreResistCriticalRate: 574,
    ignoreResistCriticalDamage: 142.5,
    ignoreResistSkillAmp: 267,
    normalDamageUp: 85,
    cancelIgnorePenetration: 47.8,
}

const defenseScore = {
    hp: 5,
    defense: 21,
    defenseRate: 2.4,
    evasion: 5.3,
    damageReduction: 19.5,
    resistCriticalRate: 636,
    resistCriticalDamage: 150,
    resistSkillAmp: 296.5,
    ignorePenetration: 53.1,
    ignoreAccuracy: 5.3,
    finalDamageDown: 1451,
    cancelIgnoreDamageReduction: 19.9,
}

export const getAttackAbility = (char: Character) => {
    let score = 0
    const attack = (magicBattlesStyles.includes(char.battleStyle) ? char.magicAttack : char.attack) || 0
    score += attack * attackScore.attack
    score += (char.attackRate || 0) * attackScore.attackRate
    score += (char.criticalRate || 0) * 100 * attackScore.criticalRate
    score += (char.criticalDamage || 0) * 100 * attackScore.criticalDamage
    const skillAmp = (magicBattlesStyles.includes(char.battleStyle) ? char.magicSkillAmp : char.swordSkillAmp) || 0
    score += skillAmp * attackScore.skillAmp
    score += (char.accuracy || 0) * attackScore.accuracy
    score += (char.penetration || 0) * attackScore.penetration
    score += (char.addDamage || 0) * attackScore.addDamage
    score += (char.ignoreEvasion || 0) * attackScore.ignoreEvasion
    score += (char.finalDamageUp || 0) * 100 * attackScore.finalDamageUp
    score += (char.ignoreDamageReduction || 0) * attackScore.ignoreDamageReduction
    score += (char.ignoreResistCriticalRate || 0) * 100 * attackScore.ignoreResistCriticalRate
    score += (char.ignoreResistCriticalDamage || 0) * 100 * attackScore.ignoreResistCriticalDamage
    score += (char.ignoreResistSkillAmp || 0) * 100 * attackScore.ignoreResistSkillAmp
    score += (char.normalDamageUp || 0) * 100 * attackScore.normalDamageUp
    score += (char.cancelIgnorePenetration || 0) * attackScore.cancelIgnorePenetration
    return score
}

export const getDefenseAbility = (char: Character) => {
    let score = 0
    score += (char.hp || 0) * defenseScore.hp
    score += (char.defense || 0) * defenseScore.defense
    score += (char.defenseRate || 0) * defenseScore.defenseRate
    score += (char.evasion || 0) * defenseScore.evasion
    score += (char.damageReduction || 0) * defenseScore.damageReduction
    score += (char.resistCriticalRate || 0) * 100 * defenseScore.resistCriticalRate
    score += (char.resistCriticalDamage || 0) * 100 * defenseScore.resistCriticalDamage
    const resistSkillAmp = (magicBattlesStyles.includes(char.battleStyle) ? char.resistMagicSkillAmp : char.resistSwordSkillAmp) || 0
    score += resistSkillAmp * 100 * defenseScore.resistSkillAmp
    score += (char.ignorePenetration || 0) * defenseScore.ignorePenetration
    score += (char.ignoreAccuracy || 0) * defenseScore.ignoreAccuracy
    score += (char.finalDamageDown || 0) * 100 * defenseScore.finalDamageDown
    score += (char.cancelIgnoreDamageReduction || 0) * defenseScore.cancelIgnoreDamageReduction
    return score
}

const getRatioColor = (ratio: number, isSmallValues: boolean) => {
    if (ratio <= 100) {
        if (ratio === 100) {
            return 'text-green-400'
        } else if (false ? ratio > 95 : ratio > 97.5) {
            return 'text-green-300'
        } else if (false ? ratio > 90 : ratio > 95) {
            return 'text-yellow-300'
        } else if (false ? ratio > 85 : ratio > 90) {
            return 'text-orange-400'
        }
    } else {
        if (false ? ratio < 105 : ratio < 102.5) {
            return 'text-green-300'
        } else if (false ? ratio < 110 : ratio < 105) {
            return 'text-yellow-300'
        } else if (false ? ratio < 115 : ratio < 110) {
            return 'text-orange-400'
        }
    }
    return 'text-red-400'
}

const average = (array: number[]) => {
    // return max number
    return Math.max(...array)
    // return array.reduce((a, b) => a + b) / array.length
}

const BattleStylesData = {
    [BattleStyles.Warrior]: {
        abbr: 'WA',
        ampEffectiveness: 1,
        criticalEffectiveness: 0.93,
        penetrationResistance: 2.35,
        defenseCompensation: 975,
    },
    [BattleStyles.Fantoche]: {
        abbr: 'X',
        ampEffectiveness: 1,
        criticalEffectiveness: 1,
        penetrationResistance: 1.175,
        defenseCompensation: 1000,
    },
    [BattleStyles.Wizard]: {
        abbr: 'WI',
        ampEffectiveness: 1,
        criticalEffectiveness: 0.92,
        penetrationResistance: 1.15,
        defenseCompensation: 1060,
    },
    [BattleStyles.ForceArcher]: {
        abbr: 'FA',
        ampEffectiveness: 1,
        criticalEffectiveness: 0.8605,
        penetrationResistance: 1.07,
        defenseCompensation: 985,
    },
}
const getSkillAmp = (char: Character) => (magicBattlesStyles.includes(char.battleStyle) ? char.magicSkillAmp : char.swordSkillAmp) || 0
const getAttack = (char: Character) => (magicBattlesStyles.includes(char.battleStyle) ? char.magicAttack : char.attack) || 0
const getResistSkillAmp = (attacker: Character, defender: Character) =>
    (magicBattlesStyles.includes(attacker.battleStyle) ? defender.resistMagicSkillAmp : defender.resistSwordSkillAmp) || 0
export const DamageCalculator = () => {
    const [characterView, setCharacterView] = React.useState<Character>()

    const damage = {
        normal: 0,
        critical: 0,
    }

    const getPlayerDamage = (
        skill: Skill,
        attacker: Character,
        defender: Character,
        description: string,
        expectedNormal: number,
        expectedCritical: number,
        mode?: 'pve' | 'pvp'
    ) => {
        let ignorePenetration = Math.max(defender.ignorePenetration - attacker.cancelIgnorePenetration, 0)
        const penetration = Math.max(attacker.penetration + (skill?.penetration || 0), 0)
        const ignoreDamageReduction = Math.max(attacker.ignoreDamageReduction - defender.cancelIgnoreDamageReduction, 0)
        const damageReduction = Math.max(defender.damageReduction - ignoreDamageReduction, 0)
        const resistSkillAmp = Math.max(getResistSkillAmp(attacker, defender) - attacker.ignoreResistSkillAmp, 0)
        const skillAmp = Math.max(getSkillAmp(attacker) + skill.skillAmp - resistSkillAmp, 0)
        const resistCriticalDamage = Math.max(defender.resistCriticalDamage - attacker.ignoreResistCriticalDamage, 0)
        const criticalDamage = Math.max(attacker.criticalDamage + (skill?.criticalDamage || 0) - resistCriticalDamage, 0.25)

        const attackAmp = 1 + skillAmp * BattleStylesData[attacker.battleStyle].ampEffectiveness
        let attack = getAttack(attacker)
        if (skill.name !== 'Ataque Normal') {
            attack *= attackAmp
        }

        let finalDefense = defender.defense - (skill.defenseReduction || 0)
        const penetrationResistance = BattleStylesData[defender.battleStyle].penetrationResistance
        finalDefense += ignorePenetration * penetrationResistance
        finalDefense -= penetration * penetrationResistance
        finalDefense = Math.max(finalDefense, 0)

        const attackDefenseDifference = attack - finalDefense
        const initialDefenseCompensation = BattleStylesData[attacker.battleStyle].defenseCompensation
        const getDefenseCompensation = () => {
            let compensation = initialDefenseCompensation

            if (attackDefenseDifference < 2400) {
                // compensation -= 50
            } else {
            }
            compensation -= skill.addAttack / 85

            return compensation
        }

        const baselineArmorDefense = defender.defense + getDefenseCompensation()
        // const baselineArmorDefense = defender.defense + defenseCompensation
        // if (finalDefense > baselineArmorDefense) {
        //     finalDefense = baselineArmorDefense
        // }
        function getAttackReduction() {
            return Math.max(1 - finalDefense / baselineArmorDefense, 0)
        }

        let ignoreDifference = penetration - ignorePenetration
        if (penetration > ignorePenetration) {
            ignoreDifference = penetration - ignorePenetration
        }

        const attackReduction = getAttackReduction()
        const skillAttackReduction = getAttackReduction()

        const attackReduced = attack * attackReduction
        let skillAddAttack = skill.addAttack * skillAttackReduction

        damage.normal = attackReduced
        damage.critical = damage.normal * (1 + criticalDamage) * BattleStylesData[attacker.battleStyle].criticalEffectiveness

        // damage.normal *= 1 - defender.damageReductionPercentage
        const baseNormal = damage.normal
        // damage.critical *= 1 - defender.damageReductionPercentage
        const baseCritical = damage.critical

        damage.normal *= 1 + attacker.normalDamageUp
        damage.normal += skillAddAttack
        damage.normal -= damageReduction
        damage.normal = Math.max(damage.normal, 0)
        damage.normal += attacker.addDamage

        damage.critical += skillAddAttack
        damage.critical -= damageReduction
        damage.critical = Math.max(damage.critical, 0)
        damage.critical += attacker.addDamage
        damage.critical = Math.max(damage.critical, damage.normal)

        const damageMode = (damage: number) => (mode === 'pve' ? damage : damage / 4.688)

        const finalDamageCalculation = (damage: number) => {
            let finalDamage = damage * (1 + attacker.finalDamageUp) * (1 - defender.finalDamageDown)
            finalDamage = Math.max(finalDamage, 1)
            finalDamage = damageMode(finalDamage)
            return Number(finalDamage.toFixed(0))
        }

        const finalNormal = finalDamageCalculation(damage.normal)
        const finalCritical = finalDamageCalculation(damage.critical)

        const expectedToNormalRatio = (finalNormal / expectedNormal) * 100
        const expectedToCriticalRatio = (finalCritical / expectedCritical) * 100

        const attackerAttackAbility = getAttackAbility(attacker)
        const defenderDefenseAbility = getDefenseAbility(defender)

        if (characterView) {
            return (
                <div
                    className="relative min-w-[200px] rounded border border-white border-opacity-10 p-0.5 text-xs text-white"
                    onClick={() => setCharacterView(undefined)}
                >
                    <div className="opacity-75">{characterView.battleStyle}</div>
                    <div>
                        <span className="opacity-50">Attack:</span> {characterView.attack}
                    </div>
                    <div>
                        <span className="opacity-50">Magic Attack:</span> {characterView.magicAttack}
                    </div>
                    <div>
                        <span className="opacity-50">Sword Skill Amp:</span> {characterView.swordSkillAmp}
                    </div>
                    <div>
                        <span className="opacity-50">Magic Skill Amp:</span> {characterView.magicSkillAmp}
                    </div>
                    <div>
                        <span className="opacity-50">Critical Damage:</span> {characterView.criticalDamage}
                    </div>
                    <div>
                        <span className="opacity-50">Ignore Resist Skill:</span> {characterView.ignoreResistSkillAmp}
                    </div>
                    <div>
                        <span className="opacity-50">Ignore Resist Critical:</span> {characterView.ignoreResistCriticalDamage}
                    </div>
                    <div>
                        <span className="opacity-50">Resist Critical Damage:</span> {characterView.resistCriticalDamage}
                    </div>
                    <div>
                        <span className="opacity-50">Resist Sword Skill:</span> {characterView.resistSwordSkillAmp}
                    </div>
                    <div>
                        <span className="opacity-50">Resist Magic Skill:</span> {characterView.resistMagicSkillAmp}
                    </div>
                </div>
            )
        }

        return (
            <div className="relative min-w-[200px] rounded border border-white border-opacity-10 p-0.5">
                <div
                    className="absolute left-4 top-6 text-xs text-gray-500"
                    title={JSON.stringify(attacker)}
                    onClick={() => setCharacterView(attacker)}
                >
                    {BattleStylesData[attacker.battleStyle].abbr}
                </div>
                <div
                    className="absolute right-4 top-6 text-xs text-gray-500"
                    title={JSON.stringify(defender)}
                    onClick={() => setCharacterView(defender)}
                >
                    {BattleStylesData[defender.battleStyle].abbr}
                </div>
                <table className="w-full text-center">
                    <tbody>
                        <tr>
                            <td colSpan={3} className="text-xs text-gray-100">
                                <h5 className="text max-w-[180px] truncate text-[8px] uppercase">{description}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-[10px] text-gray-400">
                                <h5>{skill.name} </h5>
                                <div className="text-[8px] text-gray-500">
                                    (x{skill.skillAmp.toFixed(2)}/+{skill.addAttack})
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-[8px] text-gray-200">
                                {attackerAttackAbility.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="text-[8px] text-gray-200">
                                {(attackerAttackAbility - defenderDefenseAbility).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="text-[8px] text-gray-200">
                                {defenderDefenseAbility.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                            </td>
                        </tr>
                        <tr className="border-y border-white border-opacity-5 opacity-40">
                            <td className="text-xs text-gray-200">{defender.defense.toFixed(0)}</td>
                            <td className="text-[8px] text-gray-300">
                                per (<b className="text-gray-100">{penetration}</b>) / ign (<b className="text-gray-100">{ignorePenetration}</b>)
                            </td>
                            <td className="text-xs text-gray-200">{finalDefense.toFixed(0)}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-[8px] text-gray-400">
                                <div>penetration: {ignoreDifference}</div>
                                <div>compensation: {getDefenseCompensation().toFixed(4)}</div>
                                <div>{attackDefenseDifference.toFixed()}</div>
                            </td>
                        </tr>
                        <tr className="border-y border-white border-opacity-5 opacity-40">
                            <td className="text-xs text-gray-200">
                                <div className="text-[8px] text-gray-300">{getAttack(attacker).toFixed(0)}</div>
                                <div className="text-[8px] text-gray-300">{(1 + skillAmp).toFixed(2)}</div>
                                <div>{attack.toFixed(0)}</div>
                            </td>
                            <td className="text-xs text-gray-200">
                                <div className="text-[8px] text-gray-300">reduction</div>
                                <div className="text-[8px] text-gray-300">{attackReduction.toFixed(4)}</div>
                                <div>{attackReduced.toFixed(0)}</div>
                            </td>
                            <td className="text-xs text-gray-200">
                                <div className="text-[8px] text-gray-300">critical</div>
                                <div className="text-[8px] text-gray-300">{(1 + criticalDamage).toFixed(2)}</div>
                                <div>{baseCritical.toFixed(0)}</div>
                            </td>
                        </tr>
                        <tr className="text-[10px]">
                            <td className={getRatioColor(expectedToNormalRatio, expectedNormal <= 150)}>
                                <div className="opacity-50">{expectedNormal.toFixed()}</div>
                                <div className="text-[8px] opacity-75">{expectedToNormalRatio.toFixed(2)}%</div>
                                <div className="text-xl">{finalNormal}</div>
                            </td>
                            <td />
                            <td className={getRatioColor(expectedToCriticalRatio, expectedNormal <= 150)}>
                                <h3 className="opacity-50">{expectedCritical}</h3>
                                <h2 className="text-[8px] opacity-75">{expectedToCriticalRatio.toFixed(2)}%</h2>
                                <h1 className="text-xl">{finalCritical}</h1>
                            </td>
                        </tr>
                        <tr className="opacity-40">
                            <td className="text-xs text-gray-200">{damageMode(baseNormal).toFixed(0)}</td>
                            <td className="text-[8px] text-gray-400">base</td>
                            <td className="text-xs text-gray-200">{damageMode(baseCritical).toFixed(0)}</td>
                        </tr>
                        <tr className="opacity-40">
                            <td className="text-xs text-gray-200">+{finalDamageCalculation(skillAddAttack)}</td>
                            <td className="text-[8px] text-gray-400">skill add atk</td>
                            <td className="text-xs text-gray-200">+{finalDamageCalculation(skillAddAttack)}</td>
                        </tr>
                        <tr className="opacity-40">
                            <td className="text-xs text-gray-200">-{damageMode(damageReduction).toFixed(0)}</td>
                            <td className="text-[8px] text-gray-400">damage reduction</td>
                            <td className="text-xs text-gray-200">-{damageMode(damageReduction).toFixed(0)}</td>
                        </tr>
                        <tr className="opacity-40">
                            <td className="text-xs text-gray-200">+{finalDamageCalculation(attacker.addDamage)}</td>
                            <td className="text-[8px] text-gray-400">add damage</td>
                            <td className="text-xs text-gray-200">+{finalDamageCalculation(attacker.addDamage)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className="text-center text-[10px] uppercase text-gray-500">Damage Calculator</h1>
            <div className="mt-2 flex flex-wrap gap-2">
                {getPlayerDamage(
                    florestaFlechas,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCornBrincAmul,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor/bri/amu',
                    707,
                    1044
                )}
                {getPlayerDamage(
                    lancaTerraAA,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCornBrincAmul,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor/bri/amu',
                    521,
                    845
                )}
                {getPlayerDamage(
                    normalAttack,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCornBrincAmul,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor/bri/amu',
                    30,
                    107
                )}
                {getPlayerDamage(
                    florestaFlechas,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCorn,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor',
                    824,
                    1242
                )}
                {getPlayerDamage(
                    lancaTerraAA,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCorn,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor',
                    635,
                    1038
                )}
                {getPlayerDamage(
                    normalAttack,
                    char.starrk4SemOrbesArcanaBracsCintoTalisCorn,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis/cor',
                    46,
                    151
                )}
                {getPlayerDamage(
                    florestaFlechas,
                    char.starrk4SemOrbesArcanaBracsCintoTalis,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis',
                    885,
                    1408
                )}
                {getPlayerDamage(
                    lancaTerraAA,
                    char.starrk4SemOrbesArcanaBracsCintoTalis,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis',
                    688,
                    1193
                )}
                {getPlayerDamage(
                    normalAttack,
                    char.starrk4SemOrbesArcanaBracsCintoTalis,
                    char.jota4ArcGuard,
                    's/orb/arc/brac/drag/cinto/talis',
                    57,
                    173
                )}
                {getPlayerDamage(florestaFlechas, char.starrk4SemOrbesArcanaBracsCinto, char.jota4ArcGuard, 's/orb/arc/brac/drag/cinto', 980, 1561)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbesArcanaBracsCinto, char.jota4ArcGuard, 's/orb/arc/brac/drag/cinto', 771, 1332)}
                {getPlayerDamage(normalAttack, char.starrk4SemOrbesArcanaBracsCinto, char.jota4ArcGuard, 's/orb/arc/brac/drag/cinto', 73, 194)}
                {getPlayerDamage(florestaFlechas, char.starrk4SemOrbesArcanaBracsDrag, char.jota4ArcGuard, 's/orb/arc/brac/drag', 1123, 1922)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbesArcanaBracsDrag, char.jota4ArcGuard, 's/orb/arc/brac/drag', 901, 1675)}
                {getPlayerDamage(normalAttack, char.starrk4SemOrbesArcanaBracsDrag, char.jota4ArcGuard, 's/orb/arc/brac/drag', 78, 229)}
                {getPlayerDamage(florestaFlechas, char.starrk4SemOrbesArcanaBracs, char.jota4ArcGuard, 's/orb s/arc s/brac', 1222, 2101)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbesArcanaBracs, char.jota4ArcGuard, 's/orb s/arc s/brac', 998, 1850)}
                {getPlayerDamage(normalAttack, char.starrk4SemOrbesArcanaBracs, char.jota4ArcGuard, 's/orb s/arc s/brac', 68, 229)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbesArcana, char.jota4DebuffIgnPerf, 's/orb s/arc debf ign perf', 1442, 2568)}
                {getPlayerDamage(florestaFlechas, char.starrk4SemOrbesArcana, char.jota4ArcGuard, 's/orb s/arc', 1522, 2558)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbesArcana, char.jota4ArcGuard, 's/orb s/arc', 1280, 2284)}
                {getPlayerDamage(normalAttack, char.starrk4SemOrbesArcana, char.jota4ArcGuard, 's/orb s/arc', 111, 297)}
                {getPlayerDamage(florestaFlechas, char.starrk4SemOrbes, char.jota4ArcGuard, 's/orb', 1724, 3116)}
                {getPlayerDamage(lancaTerraAA, char.starrk4SemOrbes, char.jota4ArcGuard, 's/orb', 1471, 2822)}
                {getPlayerDamage(normalAttack, char.starrk4SemOrbes, char.jota4ArcGuard, 's/orb', 125, 379)}
                {getPlayerDamage(florestaFlechas, char.starrk4Sem1Orb, char.jota4ArcGuard, 's/1orb', 707 + 707 + 943, 1624 + 1624 + 2166)}
                {getPlayerDamage(lancaTerraAA, char.starrk4Sem1Orb, char.jota4ArcGuard, 's/1orb', 2083, 5055)}
                {getPlayerDamage(normalAttack, char.starrk4Sem1Orb, char.jota4ArcGuard, 's/1orb', 224, 776)}
                {getPlayerDamage(lancaTerraAA, char.starrk4, char.jota4ArcGuard, 'normal + arc guardiao', 2735, 7884)}
                {getPlayerDamage(normalAttack, char.starrk4, char.jota4ArcGuard, 'normal + arc guardiao', 355, 1303)}
                {getPlayerDamage(lancaTerraAA, char.starrk4, char.jota4, 'normal', 3137, 9009)}
                {getPlayerDamage(normalAttack, char.starrk4, char.jota4, 'normal', 399, 1504)}
                {getPlayerDamage(esmagador, char.talrasha, char.jota3, 'normal', average([579, 582, 585, 621, 628]), 894)}
                {getPlayerDamage(abaloSismico, char.talrasha, char.jota3, 'normal', average([452, 480, 484, 495, 503]), 784)}
                {getPlayerDamage(desbalancearGU, char.talrasha, char.jota3, 'normal', average([248, 249, 274]), 467)}
                {getPlayerDamage(normalAttack, char.talrasha, char.jota3, 'normal', average([96, 105, 108]), 230)}

                {getPlayerDamage(esmagador, char.talrasha, char.starrk3, 'normal', average([449, 480, 494, 529, 538]), 693)}
                {getPlayerDamage(abaloSismico, char.talrasha, char.starrk3, 'normal', average([390, 407, 421, 434, 436, 462]), 593)}
                {getPlayerDamage(desbalancearGU, char.talrasha, char.starrk3, 'normal', average([180, 185, 192, 197, 218, 228]), 316)}
                {getPlayerDamage(normalAttack, char.talrasha, char.starrk3, 'normal', average([47, 48, 56, 63, 69, 75, 78]), 157)}

                {getPlayerDamage(esmagador, char.talrasha, char.rockstarrk2, 'normal', average([2389, 2466, 2488, 2528, 2624, 2752]), 4406)}
                {getPlayerDamage(abaloSismico, char.talrasha, char.rockstarrk2, 'normal', average([2069, 2051, 2229, 2371, 2416, 2445]), 3945)}
                {getPlayerDamage(desbalancearGU, char.talrasha, char.rockstarrk2, 'normal', average([1379, 1345, 1289, 1301, 1421, 1532]), 2581)}
                {getPlayerDamage(normalAttack, char.talrasha, char.rockstarrk2, 'normal', average([553, 557, 562, 573, 642, 675]), 1324)}

                {getPlayerDamage(lancaTerraAA, char.jota3, char.talrasha, 'normal', 782, 1581)}
                {getPlayerDamage(meteoroChamas, char.jota3, char.talrasha, 'normal', 856, 1655)}
                {char.allTests.map((test) =>
                    test.builds.map((build) =>
                        build.attacks.map((attack) =>
                            getPlayerDamage(
                                attack.skill,
                                {
                                    ...test.attacker,
                                    ...(build.attackerAdditionalStats &&
                                        Object.entries(build.attackerAdditionalStats).reduce((acc, [key, value]) => {
                                            if (value) {
                                                // @ts-ignore
                                                acc[key] = test.attacker[key] + value
                                            }
                                            return acc
                                        }, {} as any)),
                                },
                                {
                                    ...test.defender,
                                    ...(build.defenderAdditionalStats &&
                                        Object.entries(build.defenderAdditionalStats).reduce((acc, [key, value]) => {
                                            if (value) {
                                                // @ts-ignore
                                                acc[key] = test.defender[key] + value
                                            }
                                            return acc
                                        }, {} as any)),
                                },
                                build.description,
                                attack.expected[0],
                                attack.expected[1]
                            )
                        )
                    )
                )}
                {/*{false && (*/}
                {/*    <div>*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvE, char.fantoche, 'normal', 1292, 6339, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1292, 6339, 'pve')}*/}
                {/*        {getPlayerDamage(disparoCritico, char.starrkPvEFraco, char.fantoche, 'fraco', 94, 1308, 'pve')}*/}
                {/*        {getPlayerDamage(florestaFlechas, char.starrkPvEFracoBuffGM, char.fantoche, 'fraco buff gm', 73, 500, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEFraco, char.fantoche, 'fraco', 155, 1150, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEFracoBuffGM, char.fantoche, 'fraco buff gm', 73, 185, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEBuffGM, char.fantoche, 'buff gm', 1542, 7509, 'pve')}*/}
                {/*        {getPlayerDamage(normalAttack, char.starrkPvEBuffGM, char.fantoche, 'buff gm', 95, 309, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEAmp65, char.fantoche, 'amp +65%', 1629, 7354, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvEDanos95, char.fantoche, 'danos +95%', 1292, 7526, 'pve')}*/}
                {/*        {getPlayerDamage(lancaFogoAA, char.starrkPvESemArmas, char.fantoche, 'sem armas', 422, 2187, 'pve')}*/}
                {/*        {getPlayerDamage(disparoCritico, char.starrkPvEFracoBuffGM, char.fantoche, 'fraco buff gm', 73, 429, 'pve')}*/}
                {/*        {getPlayerDamage(florestaFlechas, char.starrkPvEBuffGM, char.fantoche, 'buff gm', 1790, 8010, 'pve')}*/}
                {/*        {getPlayerDamage(canhaoPedraAA, char.starrkPvEBuffGM, char.fantoche, 'buff gm', 1628, 7849, 'pve')}*/}
                {/*        {getPlayerDamage(lancaAguaAA, char.starrkPvE, char.fantoche, 'normal', 1290, 6337, 'pve')}*/}
                {/*        {getPlayerDamage(lancaAguaAA, char.starrkPvESemArmas, char.fantoche, 'sem armas', 420, 2186, 'pve')}*/}
                {/*        {getPlayerDamage(lancaTerraAA, char.starrkPvE, char.fantoche, 'normal', 1329, 6492, 'pve')}*/}
                {/*        {getPlayerDamage(disparoCritico, char.starrkPvE, char.fantoche, 'normal', 1041, 6487, 'pve')}*/}
                {/*        {getPlayerDamage(distorcaoGravitacional, char.starrkPvE, char.fantoche, 'normal', 1326, 6316, 'pve')}*/}
                {/*        {getPlayerDamage(lancaAguaAA, char.starrkPvEAmp65, char.fantoche, 'amp +65%', 1628, 7353, 'pve')}*/}
                {/*        {getPlayerDamage(lancaTerraAA, char.starrkPvEAmp65, char.fantoche, 'amp +65%', 1667, 7506, 'pve')}*/}
                {/*        {getPlayerDamage(disparoCritico, char.starrkPvEAmp65, char.fantoche, 'amp +65%', 1379, 7676, 'pve')}*/}
                {/*        {getPlayerDamage(distorcaoGravitacional, char.starrkPvEAmp65, char.fantoche, 'amp +65%', 1664, 7330, 'pve')}*/}
                {/*        {getPlayerDamage(lancaAguaAA, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1290, 6337, 'pve')}*/}
                {/*        {getPlayerDamage(lancaTerraAA, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1329, 6492, 'pve')}*/}
                {/*        {getPlayerDamage(disparoCritico, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1041, 6487, 'pve')}*/}
                {/*        {getPlayerDamage(distorcaoGravitacional, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1326, 6316, 'pve')}*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*{getPlayerDamage(lancaFogoAA, char.starrkPvE, char.fantoche, 'normal', 1292, 6339, 'pve')}*/}
                {/*{getPlayerDamage(lancaFogoAA, char.starrkPvEPerfura250, char.fantoche, 'perfura +250', 1292, 6339, 'pve')}*/}
                {/*{getPlayerDamage(disparoCritico, char.overAA, char.starrk, 'OVER AA', 128, 188)}*/}
                {getPlayerDamage(lancaTerraMA, char.jota0, char.starrk0, 'normal', 128, 188)}
                {getPlayerDamage(meteoroChamas, char.jota0, char.starrk0, 'normal', 155, 215)}
                {getPlayerDamage(lancaTerraMA, char.jota0, char.starrk0SemMoto, 'sem moto', 154, 219)}
                {getPlayerDamage(meteoroChamas, char.jota0, char.starrk0SemMoto, 'sem moto', 184, 250)}
                {getPlayerDamage(lancaTerraMA, char.jota0, char.starrk0ReducaoDano30, 'red dano +30', 123, 182)}
                {getPlayerDamage(meteoroChamas, char.jota0, char.starrk0ReducaoDano30, 'red dano +30', 150, 210)}
                {getPlayerDamage(lancaTerraMA, char.jota0, char.starrk0IgnorarPerfura30, 'ign perfura +30', 116, 173)}
                {getPlayerDamage(meteoroChamas, char.jota0, char.starrk0IgnorarPerfura30, 'ign perfura +30', 143, 199)}
                {getPlayerDamage(lancaTerraMA, char.jota0Atk80, char.starrk0, 'atk +80', 134, 195)}
                {getPlayerDamage(meteoroChamas, char.jota0Atk80, char.starrk0, 'atk +80', 161, 222)}
                {getPlayerDamage(lancaTerraMA, char.jota0AddDmg30, char.starrk0, 'add dmg +30', 133, 193)}
                {getPlayerDamage(meteoroChamas, char.jota0AddDmg30, char.starrk0, 'add dmg +30', 161, 220)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura80, char.starrk0, 'perfura +80', 159, 226)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura80, char.starrk0, 'perfura +80', 190, 256)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura120, char.starrk0, 'perfura +120', 174, 245)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura120, char.starrk0, 'perfura +120', 207, 277)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura120, char.starrk0SemMoto, 'perfura +120 s/moto', 204, 283)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura120, char.starrk0SemMoto, 'perfura +120 s/moto', 240, 318)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura250, char.starrk0, 'perfura +250', 224, 307)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura250, char.starrk0, 'perfura +250', 262, 344)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura250, char.starrk0SemMoto, 'perfura +250 s/moto', 260, 351)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura250, char.starrk0SemMoto, 'perfura +250 s/moto', 302, 393)}
                {getPlayerDamage(lancaTerraMA, char.jota0TecAmp65, char.starrk0, 'tec amp +65%', 206, 277)}
                {getPlayerDamage(meteoroChamas, char.jota0TecAmp65, char.starrk0, 'tec amp +65%', 233, 326)}
                {getPlayerDamage(lancaTerraMA, char.jota0Danos95, char.starrk0, 'danos +95%', 128, 345)}
                {getPlayerDamage(meteoroChamas, char.jota0Danos95, char.starrk0, 'danos +95%', 155, 373)}
                {getPlayerDamage(lancaTerraMA, char.jota0Danos95, char.starrk0SemMoto, 'danos +95% s/moto', 154, 394)}
                {getPlayerDamage(meteoroChamas, char.jota0Danos95, char.starrk0SemMoto, 'danos +95% s/moto', 184, 424)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura450, char.starrk0, 'perfura +450', 300, 401)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura450, char.starrk0, 'perfura +450', 347, 448)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura450, char.starrk0SemMoto, 'perf +450 s/moto', 344, 456)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura450, char.starrk0SemMoto, 'perf +450 s/moto', 395, 508)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura450, char.starrk0SemMotoRes5Amp, 'perf +450 s/moto 5% r.amp', 335, 443)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura450, char.starrk0SemMotoRes5Amp, 'perf +450 s/moto 5% r.amp', 386, 495)}
                {getPlayerDamage(lancaTerraMA, char.jota0Perfura450, char.starrk0SemMotoRes6Danos, 'perf +450 s/moto 6% r.danos', 344, 437)}
                {getPlayerDamage(meteoroChamas, char.jota0Perfura450, char.starrk0SemMotoRes6Danos, 'perf +450 s/moto 6% r.danos', 395, 489)}
                {getPlayerDamage(lancaTerraMA, char.jota2, char.rock2, 'normal', 2633, 4234)}
                {getPlayerDamage(meteoroChamas, char.jota2, char.rock2, 'normal', 2891, 4491)}
                {getPlayerDamage(lancaTerraMA, char.jota2Perfura80, char.rock2, 'perfura +80', 2818, 4530)}
                {getPlayerDamage(meteoroChamas, char.jota2Perfura80, char.rock2, 'perfura +80', 3094, 4806)}
                {getPlayerDamage(lancaTerraMA, char.jota2Perfura200, char.rock2, 'perfura +200', 2964, 4764)}
                {getPlayerDamage(meteoroChamas, char.jota2Perfura200, char.rock2, 'perfura +200', 3254, 5095)}
                {getPlayerDamage(lancaTerraMA, char.jota2Perfura250, char.rock2, 'perfura +250', 2964, 4764)}
                {getPlayerDamage(meteoroChamas, char.jota2Perfura250, char.rock2, 'perfura +250', 3254, 5095)}
                {getPlayerDamage(lancaTerraMA, char.jota2Perfura450, char.rock2, 'perfura +450', 2964, 4764)}
                {getPlayerDamage(meteoroChamas, char.jota2Perfura450, char.rock2, 'perfura +450', 3254, 5095)}
                {getPlayerDamage(lancaTerraMA, char.jotinha, char.starrk0, 'normal', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinha, char.starrk0, 'normal', 15, 15)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura80, char.starrk0, 'perfura +80', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura80, char.starrk0, 'perfura +80', 15, 15)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura250, char.starrk0, 'perfura +250', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura250, char.starrk0, 'perfura +250', 15, 15)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura450, char.starrk0, 'perfura +450', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura450, char.starrk0, 'perfura +450', 15, 15)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura450, char.starrk0SemMoto, 'per +450 s/moto', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura450, char.starrk0SemMoto, 'per +450 s/moto', 15, 15)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura450, char.starrk0SemMotoCoturno, 'per +450 s/moto s/cot', 15, 15)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura450, char.starrk0SemMotoCoturno, 'per +450 s/moto s/cot', 30, 47)}
                {getPlayerDamage(lancaTerraMA, char.jotinhaPerfura450, char.starrk0SemMotoCoturnoTraje, 'p+450 s/moto s/cot s/traj', 15, 18)}
                {getPlayerDamage(meteoroChamas, char.jotinhaPerfura450, char.starrk0SemMotoCoturnoTraje, 'p+450 s/moto s/cot s/traj', 75, 93)}
                {getPlayerDamage(
                    lancaTerraMA,
                    char.jotinhaPerfura450,
                    char.starrk0SemMotoCoturnoTrajeLuva,
                    'p+450 s/moto s/cot s/traj s/luv',
                    36,
                    52
                )}
                {getPlayerDamage(
                    meteoroChamas,
                    char.jotinhaPerfura450,
                    char.starrk0SemMotoCoturnoTrajeLuva,
                    'p+450 s/moto s/cot s/traj s/luv',
                    124,
                    143
                )}
                {getPlayerDamage(canhaoPedraMA, char.jota, char.starrk, 'normal', 140, 209)}
                {getPlayerDamage(canhaoMultiplo, char.jota, char.starrk, 'normal', 204, 277)}
                {getPlayerDamage(canhaoPedraMA, char.jota, char.rock, 'normal', 2799, 5047)}
                {getPlayerDamage(lancaTerraMA, char.jota, char.rock, 'normal', 2696, 4851)}
                {getPlayerDamage(lancaTerraAA, char.rock2, char.jota2, 'normal', 38, 57)}
                {getPlayerDamage(canhaoPedraAA, char.rock2, char.jota2, 'normal', 49, 70)}
                {getPlayerDamage(disparoPerfurante, char.rock2, char.jota2, 'normal', 32, 45)}
                {getPlayerDamage(distorcaoGravitacional, char.rock2, char.jota2, 'normal', 77, 95)}
                {getPlayerDamage(lancaTerraAA, char.rock2addDmg10, char.jota2, 'add dmg +10', 40, 59)}
                {getPlayerDamage(canhaoPedraAA, char.rock2addDmg10, char.jota2, 'add dmg +10', 51, 70)}
                {getPlayerDamage(disparoPerfurante, char.rock2addDmg10, char.jota2, 'add dmg +10', 34, 47)}
                {getPlayerDamage(distorcaoGravitacional, char.rock2addDmg10, char.jota2, 'add dmg +10', 79, 97)}
                {getPlayerDamage(lancaTerraAA, char.rock2SemTempus, char.jota2, 's/tempus', 31, 49)}
                {getPlayerDamage(canhaoPedraAA, char.rock2SemTempus, char.jota2, 's/tempus', 42, 62)}
                {getPlayerDamage(disparoPerfurante, char.rock2SemTempus, char.jota2, 's/tempus', 26, 38)}
                {getPlayerDamage(distorcaoGravitacional, char.rock2SemTempus, char.jota2, 's/tempus', 69, 85)}
                {getPlayerDamage(lancaTerraAA, char.rock2SemTempusDanos20, char.jota2, 's/tempus danos +20%', 31, 49)}
                {getPlayerDamage(canhaoPedraAA, char.rock2SemTempusDanos20, char.jota2, 's/tempus danos +20%', 42, 62)}
                {getPlayerDamage(disparoPerfurante, char.rock2SemTempusDanos20, char.jota2, 's/tempus danos +20%', 26, 38)}
                {getPlayerDamage(distorcaoGravitacional, char.rock2SemTempusDanos20, char.jota2, 's/tempus danos +20%', 69, 85)}
                {getPlayerDamage(lancaTerraAA, char.rock20AddDmg, char.jota, 'add dmg +20', 39, 58)}
                {getPlayerDamage(disparoPerfurante, char.rock20AddDmg, char.jota, 'add dmg +20', 33, 47)}
                {getPlayerDamage(lancaTerraAA, char.rock14Amp20Danos, char.jota, 'amp +14% danos +20%', 48, 67)}
                {getPlayerDamage(disparoPerfurante, char.rock14Amp20Danos, char.jota, 'amp +14% danos +20%', 42, 55)}
                {getPlayerDamage(lancaTerraAA, char.starrk1, char.jota1, 'normal', 1485, 2825)}
                {getPlayerDamage(distorcaoGravitacional, char.starrk1, char.jota1, 'normal', 1520, 2799)}
                {getPlayerDamage(lancaTerraAA, char.starrk1, char.jota1Amplificar, 'amplificar', 1461, 2784)}
                {getPlayerDamage(distorcaoGravitacional, char.starrk1, char.jota1Amplificar, 'amplificar', 1495, 2758)}
                {getPlayerDamage(disparoPerfurante, char.starrk, char.jota, 'normal', 2799, 8060)}
                {getPlayerDamage(lancaTerraAA, char.rock, char.jota, 'normal', 36, 54)}
                {getPlayerDamage(disparoPerfurante, char.rock, char.jota, 'normal', 29, 43)}
            </div>
        </div>
    )
}