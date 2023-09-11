import React from 'react'
import { cls, getBuildTypeColor } from '@/lib/utils'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import useTranslation from '@/lib/useTranslation'
import { TabButton } from '@/app/[lang]/components/TabButton'

type Props = {
    buildType: 'attacker' | 'defender'
}

const BuildSelectorHeader = ({ buildType }: Props) => {
    const { t } = useTranslation()
    const { builds, selectedBuild, setSelectedAttackerBuildId, setSelectedDefenderBuildId } =
        useCharacterBuilds(buildType)
    const buildTypeColor = getBuildTypeColor(buildType)
    const middleIndex = Math.ceil(builds.length / 2)
    const [firstHalf, secondHalf] = [builds.slice(0, middleIndex), builds.slice(middleIndex)]

    const handleSelectBuildId = (buildId: string) => {
        if (buildType === 'attacker') {
            setSelectedAttackerBuildId(buildId)
        } else {
            setSelectedDefenderBuildId(buildId)
        }
    }

    return (
        <div className="flex w-full gap-0.5">
            <div className="flex gap-0.5 text-center text-xs text-neutral-500">
                {firstHalf.map((build, index) => (
                    <TabButton
                        key={build.id}
                        isActive={build.id === selectedBuild?.id}
                        onClick={() => handleSelectBuildId(build.id)}
                        activeClassName={buildTypeColor}
                        className="w-8"
                    >
                        {index + 1}
                    </TabButton>
                ))}
            </div>
            <div
                className={cls(
                    'bg-neutral-875 text-neutral-450 flex w-full items-center justify-center py-2 text-center text-[10px] uppercase transition-all duration-200',
                    {
                        [`text-[11px] ${buildTypeColor}`]: !selectedBuild?.data.battleStyleType,
                    }
                )}
            >
                <h1>{t(`terms.${buildType}`)}</h1>
            </div>
            <div className="flex gap-0.5 text-center text-xs text-neutral-500">
                {secondHalf.map((build, index) => (
                    <TabButton
                        key={build.id}
                        isActive={build.id === selectedBuild?.id}
                        onClick={() => handleSelectBuildId(build.id)}
                        activeClassName={buildTypeColor}
                        className="w-8"
                    >
                        {index + middleIndex + 1}
                    </TabButton>
                ))}
            </div>
        </div>
    )
}

export default BuildSelectorHeader