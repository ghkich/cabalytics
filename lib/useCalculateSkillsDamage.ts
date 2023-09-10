import React, { useState } from 'react'
import { CalculateSkillsDamageRequest, CalculateSkillsDamageResponse } from '@/app/api/calculate-skills-damage/route'
import debounce from 'lodash.debounce'
import { delay } from '@/lib/utils'

export const useCalculateSkillsDamage = () => {
    const [skillsDamage, setSkillsDamage] = useState<CalculateSkillsDamageResponse>()
    const [isCalculating, setIsCalculating] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculateSkillsDamage = React.useCallback(
        debounce(async ({ attacker, defender, skills }: CalculateSkillsDamageRequest) => {
            setIsCalculating(true)

            // Simulate additional time for calculation
            await delay(350)

            const res = await fetch('/api/calculate-skills-damage', {
                method: 'POST',
                body: JSON.stringify({ attacker, defender, skills }),
            })
            if (res.status === 400) {
                setIsCalculating(false)
            } else {
                const newDamage = await res.json()
                setSkillsDamage(newDamage)
                setIsCalculating(false)
            }
        }, 500),
        []
    )

    return { calculateSkillsDamage, skillsDamage, isCalculating }
}