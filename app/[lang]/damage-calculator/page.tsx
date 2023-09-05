import React from 'react'
import { DamageResult } from '@/app/[lang]/damage-calculator/DamageResult'
import { DamageCalculatorProvider } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { AttackerForm } from '@/app/[lang]/damage-calculator/AttackerForm'
import { DefenderForm } from '@/app/[lang]/damage-calculator/DefenderForm'

export default async function DamageCalculator() {
    return (
        <div className="">
            <DamageCalculatorProvider>
                <div className="flex">
                    <div className="min-w-[240px]">
                        <AttackerForm />
                    </div>
                    <div className="flex w-full flex-col items-center px-2">
                        <DamageResult />
                    </div>
                    <div className="min-w-[240px]">
                        <DefenderForm />
                    </div>
                </div>
            </DamageCalculatorProvider>
        </div>
    )
}