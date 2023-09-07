import { useCallback, useState } from 'react'
import { CalculateSkillDamageRequest, CalculateSkillDamageResponse } from '@/app/api/calculate-skill-damage/route'
import debounce from 'lodash.debounce'

export const useCalculateSkillDamage = () => {
    const [damage, setDamage] = useState<CalculateSkillDamageResponse>()
    const [isCalculating, setIsCalculating] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculateDamage = useCallback(
        debounce(async ({ attacker, defender, skill }: CalculateSkillDamageRequest) => {
            setIsCalculating(true)
            const res = await fetch('/api/calculate-skill-damage', {
                method: 'POST',
                body: JSON.stringify({ attacker, defender, skill }),
            })
            if (res.status === 400) {
                setDamage({ normal: 0, average: 0, critical: 0 })
                setIsCalculating(false)
            } else {
                const newDamage = await res.json()
                setDamage(newDamage)
                setIsCalculating(false)
            }
        }, 500),
        []
    )

    return { damage, calculateDamage, isCalculating }
}