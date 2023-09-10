'use client'
import React from 'react'
import { DamageTabs } from '@/app/[lang]/damage-calculator/DamageTabs'
import { CharacterBuildsProvider } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { CharacterForm } from '@/app/[lang]/damage-calculator/CharacterForm/CharacterForm'

export default function DamageCalculator() {
    return (
        <div className="">
            <CharacterBuildsProvider>
                <div className="flex flex-col gap-1.5 md:flex-row">
                    <div className="animate-slide-in min-w-[240px]">
                        <CharacterForm buildType="attacker" />
                    </div>
                    <div className="animate-slide-in flex w-full flex-col items-center">
                        <DamageTabs />
                    </div>
                    <div className="animate-slide-in min-w-[240px]">
                        <CharacterForm buildType="defender" />
                    </div>
                </div>
            </CharacterBuildsProvider>
        </div>
    )
}