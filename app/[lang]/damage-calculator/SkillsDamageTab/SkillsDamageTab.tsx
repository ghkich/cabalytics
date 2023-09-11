import React, { useEffect } from 'react'
import { SkillsDamageHeader } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageHeader'
import { SkillsDamageListItem } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageListItem'
import { useCharacterBuilds } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { useCalculateSkillsDamage } from '@/lib/useCalculateSkillsDamage'
import {
    prepareAttacker,
    prepareDefender,
} from '@/app/[lang]/damage-calculator/SkillsDamageTab/prepareApiRequestPayload'
import { battleStyleSkills } from '@/app/data/skills'

export default function SkillsDamageTab() {
    const { selectedAttackerBuild, selectedDefenderBuild } = useCharacterBuilds()
    const { skillsDamage, isCalculating, calculateSkillsDamage } = useCalculateSkillsDamage()
    const [isComboActive, setIsComboActive] = React.useState(true)
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])

    const selectedBattleStyle = selectedAttackerBuild?.data.battleStyleType
    const selectedBattleStyleSkills = React.useMemo(() => {
        if (!selectedBattleStyle) return []
        return battleStyleSkills[selectedBattleStyle]
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
            <div className="flex w-full flex-col gap-0.5 bg-neutral-800 bg-opacity-10">
                {selectedBattleStyleSkills.map((skill, index) => {
                    return (
                        <SkillsDamageListItem
                            key={skill.id}
                            skill={skill}
                            onClick={handleSelectSkill}
                            selected={selectedSkills.includes(skill.id)}
                            isComboActive={isComboActive}
                            damage={skillsDamage?.[skill.id]}
                            isCalculating={isCalculating}
                            className={`animate-scale-fade-in`}
                            style={{ animationDelay: `${index * 30}ms` }}
                        />
                    )
                })}
            </div>
        </>
    )
}