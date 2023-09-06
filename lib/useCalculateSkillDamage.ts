import { useCallback, useState } from 'react'
import { CalculateDamageRequest, Damage } from '@/app/api/calculate-damage/route'
import debounce from 'lodash.debounce'

export const useCalculateSkillDamage = () => {
    const [damage, setDamage] = useState<Damage>()
    const [isCalculating, setIsCalculating] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculateSkillDamage = useCallback(
        debounce(async ({ attacker, defender, skill }: CalculateDamageRequest) => {
            setIsCalculating(true)
            const res = await fetch('/api/calculate-damage', {
                method: 'POST',
                body: JSON.stringify({ attacker, defender, skill }),
            })
            if (res.status === 400) {
                setDamage({ normal: 0, average: 0, critical: 0 })
                setIsCalculating(false)
                return { normal: 0, average: 0, critical: 0 }
            } else {
                const newDamage = await res.json()
                setDamage(newDamage)
                setIsCalculating(false)
                return newDamage
            }
        }, 500),
        []
    )

    return { damage, calculateSkillDamage, isCalculating }
}