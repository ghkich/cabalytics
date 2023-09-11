import React, { useState } from 'react'
import BuildSelectorHeader from '@/app/[lang]/damage-calculator/CharacterForm/BuildSelectorHeader'
import CharacterStatsForm from '@/app/[lang]/damage-calculator/CharacterForm/CharacterStatsForm'
import { CharacterBuildType } from '@/app/data/builds'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { BattleStyleTypes, getBattleStyles } from '@/app/data/battleStyles'
import useTranslation from '@/lib/useTranslation'
import { getBuildTypeColor } from '@/lib/utils'
import BattleStyleSelectorTrigger from '@/app/[lang]/damage-calculator/CharacterForm/BattleStyleSelectorTrigger'
import BattleStyleSelector from '@/app/[lang]/damage-calculator/CharacterForm/BattleStyleSelector'

type Props = {
    buildType: CharacterBuildType
}

export const CharacterForm = ({ buildType }: Props) => {
    const { t, lang } = useTranslation()
    const { selectedBuild, combatPower, updateBuild } = useCharacterBuilds(buildType)
    const selectedBattleStyleType = selectedBuild?.data.battleStyleType
    const [showBattleStyleSelector, setShowBattleStyleSelector] = useState(!selectedBattleStyleType)
    const battleStyles = getBattleStyles(lang)
    const buildTypeColor = getBuildTypeColor(buildType)

    React.useEffect(() => {
        if (!selectedBuild) return
        setShowBattleStyleSelector(!selectedBattleStyleType)
    }, [selectedBuild, selectedBattleStyleType])

    const handleBattleStyleChange = (battleStyleType: BattleStyleTypes) => {
        if (!selectedBuild) return
        updateBuild(selectedBuild.id, { ...selectedBuild.data, battleStyleType })
        setShowBattleStyleSelector(false)
    }

    return (
        <div className="flex flex-col gap-0.5">
            <BuildSelectorHeader buildType={buildType} />
            <div className="flex flex-col">
                <div className="text-neutral-450 flex h-12 gap-0.5">
                    {selectedBattleStyleType && (
                        <BattleStyleSelectorTrigger
                            battleStyles={battleStyles}
                            selectedBattleStyleType={selectedBattleStyleType}
                            onClick={() => setShowBattleStyleSelector((prev) => !prev)}
                        />
                    )}
                    <div className="bg-neutral-910 flex w-full flex-col justify-center px-2 py-1">
                        {selectedBattleStyleType && (
                            <div className="flex items-center justify-between">
                                <div className="w-full text-center">
                                    <div className="text-[10px] font-light">Combat Power</div>
                                    <div className="text-[11px] text-orange-200">{combatPower?.total.formatted}</div>
                                </div>
                            </div>
                        )}
                        {!selectedBattleStyleType && (
                            <div className="text-center text-[10px] font-light text-neutral-400">
                                {t(`phrases.select_a`)} <b className="font-semibold">{t(`terms.battle_style`)}</b>
                            </div>
                        )}
                    </div>
                    {selectedBattleStyleType && <div className="w-[66px] shrink-0 bg-neutral-900"></div>}
                </div>
                <BattleStyleSelector
                    battleStyles={battleStyles}
                    selectedBattleStyleType={selectedBattleStyleType}
                    activeClassName={buildTypeColor}
                    isOpen={showBattleStyleSelector}
                    onChange={handleBattleStyleChange}
                />
            </div>
            <CharacterStatsForm buildType={buildType} disabled={showBattleStyleSelector} />
        </div>
    )
}