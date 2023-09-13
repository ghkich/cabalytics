import useFormatLocale from '@/lib/useFormatLocale'
import { CharacterBuild } from '@/app/data/builds'
import { DamageMode } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { calculateCombatPower } from '@/lib/calculateCombatPower'

export type CombatPower = {
    attack: {
        general: { formatted: string; value: number }
        pvp: { formatted: string; value: number }
        pve: { formatted: string; value: number }
        total: { formatted: string; value: number }
    }
    defense: {
        general: { formatted: string; value: number }
        pvp: { formatted: string; value: number }
        pve: { formatted: string; value: number }
        total: { formatted: string; value: number }
    }
    total: { formatted: string; value: number }
}

export const useCalculateCombatPower = () => {
    const { formatNumber } = useFormatLocale()

    return (characterBuild: CharacterBuild, damageMode?: DamageMode): CombatPower => {
        const result = calculateCombatPower(characterBuild, damageMode)
        return {
            attack: {
                general: {
                    formatted: formatNumber(result.attack.general),
                    value: result.attack.general,
                },
                pvp: {
                    formatted: formatNumber(result.attack.pvp),
                    value: result.attack.pvp,
                },
                pve: {
                    formatted: formatNumber(result.attack.pve),
                    value: result.attack.pve,
                },
                total: {
                    formatted: formatNumber(result.attack.total),
                    value: result.attack.total,
                },
            },
            defense: {
                general: {
                    formatted: formatNumber(result.defense.general),
                    value: result.defense.general,
                },
                pvp: {
                    formatted: formatNumber(result.defense.pvp),
                    value: result.defense.pvp,
                },
                pve: {
                    formatted: formatNumber(result.defense.pve),
                    value: result.defense.pve,
                },
                total: {
                    formatted: formatNumber(result.defense.total),
                    value: result.defense.total,
                },
            },
            total: {
                formatted: formatNumber(result.total),
                value: result.total,
            },
        }
    }
}