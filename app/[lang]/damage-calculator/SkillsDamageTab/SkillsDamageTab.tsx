import React, { useEffect } from 'react'
import { SkillsDamageHeader } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageHeader'
import { SkillsDamageListItem } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageListItem'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { useCalculateSkillsDamage } from '@/lib/useCalculateSkillsDamage'
import {
    prepareAttacker,
    prepareDefender,
} from '@/app/[lang]/damage-calculator/SkillsDamageTab/prepareApiRequestPayload'
import { battleStyleSkills, SkillRank, skillRanks, SkillRankType } from '@/app/data/skills'
import { ToggleButton } from '@/app/[lang]/components/ToggleButton'
import { useLanguage } from '@/app/[lang]/language-provider'

export default function SkillsDamageTab() {
    const lang = useLanguage()
    const { selectedAttackerBuild, selectedDefenderBuild } = useCharacterBuilds()
    const { skillsDamage, isCalculating, calculateSkillsDamage } = useCalculateSkillsDamage()
    const [isComboActive, setIsComboActive] = React.useState(true)
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])
    const [selectedSkillRankTypes, setSelectedSkillRankTypes] = React.useState<SkillRankType[]>([
        SkillRankType.Regular,
        SkillRankType.Expert,
        SkillRankType.Transcender,
    ])

    const selectedBattleStyle = selectedAttackerBuild?.data.battleStyleType
    const selectedBattleStyleSkills = React.useMemo(() => {
        if (!selectedBattleStyle) return []
        return battleStyleSkills[selectedBattleStyle].filter(
            (skill) => skill.disabled !== true && skill.data.type === 'attack'
        )
    }, [selectedBattleStyle])

    const handleSelectSkill = React.useCallback(
        (skillId: string) => {
            const newSelectedSkills = selectedSkills.includes(skillId)
                ? selectedSkills.filter((id) => id !== skillId)
                : [...selectedSkills, skillId]
            setSelectedSkills(newSelectedSkills)
        },
        [selectedSkills, setSelectedSkills]
    )

    const handleToggleSkillRankType = (skillRank: SkillRankType) => {
        console.log(skillRank)
        setSelectedSkillRankTypes((prevSelectedRanks) => {
            if (prevSelectedRanks.includes(skillRank)) {
                return prevSelectedRanks.filter((r) => r !== skillRank)
            } else {
                return [...prevSelectedRanks, skillRank]
            }
        })
    }

    useEffect(() => {
        const attacker = prepareAttacker(selectedAttackerBuild)
        const defender = prepareDefender(selectedDefenderBuild, selectedAttackerBuild)
        if (!attacker || !defender || !selectedBattleStyleSkills) return
        calculateSkillsDamage({ attacker, defender, skills: selectedBattleStyleSkills })?.then()
    }, [selectedBattleStyleSkills, calculateSkillsDamage, selectedAttackerBuild, selectedDefenderBuild])

    return (
        <>
            <SkillsDamageHeader
                selectedSkills={selectedSkills}
                skillsDamage={skillsDamage}
                isComboActive={isComboActive}
                isCalculating={isCalculating}
                onToggleCombo={() => setIsComboActive((prev) => !prev)}
            />
            <div className="relative z-50 grid grid-cols-5 gap-[1px] bg-neutral-950">
                {skillRanks.map((skillRank: SkillRank) => (
                    <ToggleButton
                        key={skillRank.type}
                        onClick={() => handleToggleSkillRankType(skillRank.type)}
                        isActive={selectedSkillRankTypes.includes(skillRank.type)}
                        className="truncate border-none px-2 text-[11px]"
                        activeClassName="text-emerald-300"
                    >
                        {skillRank.description[lang]}
                    </ToggleButton>
                ))}
            </div>
            <div className="flex w-full flex-col bg-neutral-800 bg-opacity-10">
                {selectedBattleStyleSkills.map((skill, index) => {
                    return (
                        <SkillsDamageListItem
                            key={skill.id}
                            skill={skill}
                            onClick={handleSelectSkill}
                            isSelected={selectedSkills.includes(skill.id)}
                            isComboActive={isComboActive}
                            isHidden={!selectedSkillRankTypes.includes(skill.data.rank)}
                            isCalculating={isCalculating}
                            damage={skillsDamage?.[skill.id]}
                            style={{ zIndex: selectedBattleStyleSkills.length - index }}
                        />
                    )
                })}
            </div>
        </>
    )
}