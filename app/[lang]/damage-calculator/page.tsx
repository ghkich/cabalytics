import React from 'react'
import { DamageTabs } from '@/app/[lang]/damage-calculator/DamageTabs'
import { DamageCalculatorProvider } from '@/app/[lang]/damage-calculator/damage-calculator-provider'
import { AttackerForm } from '@/app/[lang]/damage-calculator/AttackerForm'
import { DefenderForm } from '@/app/[lang]/damage-calculator/DefenderForm'

export default async function DamageCalculator() {
    return (
        <div className="">
            <DamageCalculatorProvider>
                <div className="flex flex-col gap-1.5 md:flex-row">
                    <div className="animate-slide-in min-w-[240px]">
                        <AttackerForm />
                    </div>
                    <div className="animate-slide-in flex w-full flex-col items-center">
                        <DamageTabs />
                    </div>
                    <div className="animate-slide-in min-w-[240px]">
                        <DefenderForm />
                    </div>
                </div>
            </DamageCalculatorProvider>
        </div>
    )
}