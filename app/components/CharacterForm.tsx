import React, { ChangeEvent, useEffect, useState } from 'react'
import { AttackAttributes, attackAttributes, defenseAttributes, DefenseAttributes } from '@/app/types/attributes'
import { Input } from '@/app/components/Input'
import { battleStyleItems, BattleStyles } from '@/app/types/battleStyles'
import { Select } from '@/app/components/Select'
import { cls } from '@/app/lib/utils'

const initialAttackAttributes: AttackAttributes = {
    attack: 0,
    magicAttack: 0,
    attackRate: 0,
    criticalRate: 0,
    criticalDamage: 0,
    swordSkillAmp: 0,
    magicSkillAmp: 0,
    accuracy: 0,
    penetration: 0,
    minimumDamage: 0,
    addDamage: 0,
    ignoreEvasion: 0,
    finalDamageUp: 0,
    ignoreDamageReduction: 0,
    ignoreResistCriticalRate: 0,
    ignoreResistCriticalDamage: 0,
    ignoreResistSkillAmp: 0,
    normalDamageUp: 0,
    cancelIgnorePenetration: 0,
}

const initialDefenseAttributes: DefenseAttributes = {
    hp: 0,
    defense: 0,
    defenseRate: 0,
    evasion: 0,
    damageReduction: 0,
    resistCriticalRate: 0,
    resistCriticalDamage: 0,
    resistMagicSkillAmp: 0,
    resistSwordSkillAmp: 0,
    ignoreAccuracy: 0,
    ignorePenetration: 0,
    cancelIgnoreDamageReduction: 0,
    cancelIgnoreEvasion: 0,
    finalDamageDown: 0,
}

export type CharacterFormData = {
    battleStyle?: BattleStyles
    attackAttributes: {
        general: AttackAttributes
        pvp?: AttackAttributes
        pve?: AttackAttributes
    }
    defenseAttributes: {
        general: DefenseAttributes
        pvp?: DefenseAttributes
        pve?: DefenseAttributes
    }
}

const attributeTypes = ['attack', 'defense'] as const
type AttributeType = (typeof attributeTypes)[number]
const attributeCategories = ['general', 'pvp', 'pve'] as const
type AttributeCategory = (typeof attributeCategories)[number]

type Props = {
    onChange: (character: CharacterFormData) => void
}
export const CharacterForm = ({ onChange }: Props) => {
    const [battleStyle, setBattleStyle] = useState<BattleStyles>()
    const [attributeType, setAttributeType] = useState<AttributeType>('attack')
    const [attributeCategory, setAttributeCategory] = useState<AttributeCategory>('general')
    const [attackGeneral, setAttackGeneral] = useState<AttackAttributes>(initialAttackAttributes)
    const [defenseGeneral, setDefenseGeneral] = useState<DefenseAttributes>(initialDefenseAttributes)

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target

            if (attributeType === 'attack' && attributeCategory === 'general') {
                setAttackGeneral((prev) => ({ ...prev, [name]: value }))
                return
            }

            if (attributeType === 'defense' && attributeCategory === 'general') {
                setDefenseGeneral((prev) => ({ ...prev, [name]: value }))
                return
            }
        },
        [attributeType, attributeCategory]
    )

    useEffect(() => {
        onChange({
            battleStyle,
            attackAttributes: { general: attackGeneral },
            defenseAttributes: { general: defenseGeneral },
        })
    }, [battleStyle, attackGeneral, defenseGeneral, onChange])

    return (
        <div className="">
            <Select
                name="battle-style"
                label="Estilo de Luta"
                items={battleStyleItems}
                onChange={(e) => {
                    setBattleStyle(e.target.value as BattleStyles)
                }}
                className="pb-1"
            />
            <div className="flex flex-col gap-0.5 pb-0.5">
                <div className="flex justify-evenly  gap-0.5">
                    {attributeTypes.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={cls('w-full p-1 text-[11px]', {
                                ['bg-white bg-opacity-5 opacity-30']: attributeType !== type,
                            })}
                            onClick={() => setAttributeType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="flex justify-evenly gap-0.5">
                    {attributeCategories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={cls('w-full p-1 text-[9px]', {
                                'bg-white bg-opacity-5 opacity-30': attributeCategory === category,
                            })}
                            onClick={() => setAttributeCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            {attributeType === 'attack' &&
                Object.entries(attackAttributes).map(([key, { description }]) => (
                    <Input
                        key={key}
                        type="number"
                        name={key}
                        label={description.pt}
                        onChange={handleChange}
                        value={attackGeneral?.[key as keyof AttackAttributes]}
                        min={0}
                    />
                ))}
            {attributeType === 'defense' &&
                Object.entries(defenseAttributes).map(([key, { description }]) => (
                    <Input
                        key={key}
                        type="number"
                        name={key}
                        label={description.pt}
                        onChange={handleChange}
                        value={defenseGeneral?.[key as keyof DefenseAttributes]}
                        min={0}
                    />
                ))}
        </div>
    )
}