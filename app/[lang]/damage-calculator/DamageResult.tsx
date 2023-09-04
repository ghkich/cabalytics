'use client'
import React from 'react'
import { useDamageCalculator } from '@/app/[lang]/damage-calculator/damage-calculator-provider'

export const DamageResult = () => {
    const { damage } = useDamageCalculator()

    return (
        <div className="flex h-full w-full justify-center gap-3 bg-neutral-800 bg-opacity-20 px-4 py-10">
            <div className="text-yellow-400">{damage.normal?.toFixed()}</div>
            <div className="opacity-20">/</div>
            <div className="text-blue-400">{damage.critical?.toFixed()}</div>
        </div>
    )
}