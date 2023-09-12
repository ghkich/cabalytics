'use client'
import React from 'react'
import {
    CharacterBuild,
    CharacterBuildData,
    CharacterBuildType,
    initialAttackerBuilds,
    initialDefenderBuilds,
} from '@/app/data/builds'
import { useCalculateCombatPower } from '@/lib/useCalculateCombatPower'

export type DamageMode = 'pvp' | 'pve'

const getDamageModeByDefender = (defenderBuild?: CharacterBuild): DamageMode | undefined => {
    if (!defenderBuild) return
    if (defenderBuild.data.battleStyleType) return 'pvp'
    return
}

export type CharacterBuildsContext = {
    builds: CharacterBuild[]
    updateBuild: (buildId: string, data: CharacterBuildData) => void
    selectedAttackerBuildId?: string
    selectedDefenderBuildId?: string
    setSelectedAttackerBuildId: (attackerId: string) => void
    setSelectedDefenderBuildId: (defenderId: string) => void
}

const initialState: CharacterBuildsContext = {
    builds: [...initialAttackerBuilds, ...initialDefenderBuilds],
    updateBuild: () => {},
    setSelectedAttackerBuildId: () => {},
    setSelectedDefenderBuildId: () => {},
}

const CharacterBuildsContext = React.createContext<CharacterBuildsContext>(initialState)

export const CharacterBuildsProvider = ({ children }: { children: React.ReactNode }) => {
    const [builds, setBuilds] = React.useState(initialState.builds)
    const [selectedAttackerBuildId, setSelectedAttackerBuildId] = React.useState<string>(initialAttackerBuilds[0].id)
    const [selectedDefenderBuildId, setSelectedDefenderBuildId] = React.useState<string>(initialDefenderBuilds[0].id)

    const updateBuild = React.useCallback((buildId: string, data: CharacterBuildData) => {
        setBuilds((builds) => {
            return builds.map((build) => {
                if (build.id === buildId) return { ...build, data }
                return build
            })
        })
    }, [])

    return (
        <CharacterBuildsContext.Provider
            value={{
                builds,
                updateBuild,
                selectedAttackerBuildId,
                selectedDefenderBuildId,
                setSelectedAttackerBuildId,
                setSelectedDefenderBuildId,
            }}
        >
            {children}
        </CharacterBuildsContext.Provider>
    )
}

export const useCharacterBuilds = (buildType?: CharacterBuildType) => {
    const calculateCombatPower = useCalculateCombatPower()
    const context = React.useContext(CharacterBuildsContext)

    if (!context) {
        throw new Error('useCharacterBuilds must be used within a CharacterBuildsProvider')
    }

    const { builds, selectedAttackerBuildId, selectedDefenderBuildId } = context

    const filteredBuilds = buildType ? builds.filter((build) => build.data.type === buildType) : builds

    const selectedBuildId = buildType === 'attacker' ? selectedAttackerBuildId : selectedDefenderBuildId
    const selectedBuild = builds.find((build) => build.id === selectedBuildId)

    const selectedAttackerBuild = builds.find((build) => build.id === selectedAttackerBuildId)
    const selectedDefenderBuild = builds.find((build) => build.id === selectedDefenderBuildId)

    const combatPower = React.useMemo(() => {
        if (!selectedBuild?.data.stats) return
        const damageMode = getDamageModeByDefender(selectedDefenderBuild)
        return calculateCombatPower(selectedBuild, damageMode)
    }, [selectedBuild, selectedDefenderBuild, calculateCombatPower])

    return {
        ...context,
        builds: filteredBuilds,
        selectedBuild,
        selectedAttackerBuild,
        selectedDefenderBuild,
        combatPower,
    }
}