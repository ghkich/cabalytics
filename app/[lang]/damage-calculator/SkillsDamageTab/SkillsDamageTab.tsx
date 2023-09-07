import React from 'react'
import { SkillsDamageHeader } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageHeader'
import { skills } from '@/app/types/skills'
import { SkillDamage, SkillsDamageListItem } from '@/app/[lang]/damage-calculator/SkillsDamageTab/SkillsDamageListItem'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export default function SkillsDamageTab() {
    const { attacker, skillsTab, updateSkillsTab } = useDamageCalculator()

    const handleSelectSkill = React.useCallback(
        (skillDamage: SkillDamage) => {
            const updatedSelectedSkills = { ...skillsTab.selectedSkills }
            if (updatedSelectedSkills[skillDamage.skillId]) {
                delete updatedSelectedSkills[skillDamage.skillId]
            } else {
                updatedSelectedSkills[skillDamage.skillId] = skillDamage.damage
            }
            updateSkillsTab({
                selectedSkills: updatedSelectedSkills,
            })
        },
        [skillsTab.selectedSkills, updateSkillsTab]
    )

    return (
        <>
            <SkillsDamageHeader />
            <div className="flex w-full flex-col gap-0.5 bg-neutral-800 bg-opacity-10">
                {attacker?.battleStyle &&
                    skills[attacker.battleStyle]?.map((skill) => (
                        <SkillsDamageListItem
                            key={skill.id}
                            skill={skill}
                            onClick={handleSelectSkill}
                            selected={!!skillsTab.selectedSkills[skill.id]}
                            isComboActive={skillsTab.comboActive}
                        />
                    ))}
            </div>
        </>
    )
}