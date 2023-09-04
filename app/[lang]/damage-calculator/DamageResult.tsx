'use client'
import React from 'react'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export const DamageResult = () => {
    const { damage } = useDamageCalculator()

    return (
        <div className="flex gap-2">
            <div className="text-yellow-400">{damage.normal?.toFixed()}</div>
            <div className="text-blue-400">{damage.critical?.toFixed()}</div>
        </div>
    )
}