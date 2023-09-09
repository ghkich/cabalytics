import React from 'react'
import { SkillsDamageHeader } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageHeader'
import { skills } from '@/app/data/skills'
import { SkillsDamageListItem } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageListItem'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export default function SkillsDamageTab() {
    const { attacker, skillsTab, skillsTabDispatch } = useDamageCalculator()

    const handleSelectSkill = React.useCallback(
        (skillId: string) => {
            const newSelectedSkills = skillsTab.selectedSkills.includes(skillId)
                ? skillsTab.selectedSkills.filter((id) => id !== skillId)
                : [...skillsTab.selectedSkills, skillId]
            skillsTabDispatch({ type: 'UPDATE_SELECTED_SKILLS', payload: newSelectedSkills })
        },
        [skillsTab.selectedSkills, skillsTabDispatch]
    )

    return (
        <>
            <SkillsDamageHeader />
            <div className="flex w-full flex-col gap-0.5 bg-neutral-800 bg-opacity-10">
                {attacker?.battleStyleType &&
                    skills[attacker.battleStyleType]?.map((skill, index) => {
                        return (
                            <SkillsDamageListItem
                                key={skill.id}
                                skill={skill}
                                onClick={handleSelectSkill}
                                selected={skillsTab.selectedSkills.includes(skill.id)}
                                isComboActive={skillsTab.comboActive}
                                className={`animate-scale-fade-in`}
                                style={{ animationDelay: `${index * 30}ms` }}
                            />
                        )
                    })}
            </div>
        </>
    )
}