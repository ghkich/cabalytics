import { useCallback, useState } from 'react'
import { CalculateDamageRequest, Damage } from '@/app/api/calculate-damage/route'
import debounce from 'lodash.debounce'

export const useCalculateSkillDamage = () => {
    const [damage, setDamage] = useState<Damage>({ normal: 0, average: 0, critical: 0 })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculateSkillDamage = useCallback(
        debounce(async ({ attacker, defender, skill }: CalculateDamageRequest) => {
            const res = await fetch('/api/calculate-damage', {
                method: 'POST',
                body: JSON.stringify({ attacker, defender, skill }),
            })
            console.log(defender.defense)
            if (res.status === 400) {
                setDamage({ normal: 0, average: 0, critical: 0 })
                return { normal: 0, average: 0, critical: 0 }
            } else {
                const newDamage = await res.json()
                setDamage(newDamage)
                return newDamage
            }
        }, 500),
        []
    )

    return { damage, calculateSkillDamage }
}