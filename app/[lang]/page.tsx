'use client'
import React from 'react'
import { DamageTabs } from '@/app/[lang]/damage-calculator/DamageTabs'
import { CharacterBuildsProvider } from '@/app/[lang]/damage-calculator/CharacterForm/character-builds-provider'
import { CharacterForm } from '@/app/[lang]/damage-calculator/CharacterForm/CharacterForm'

export default function DamageCalculator() {
    return (
        <div className="pt-1.5">
            <CharacterBuildsProvider>
                <div className="flex flex-col gap-1.5 md:flex-row">
                    <div className="min-w-[240px] animate-slide-in-short">
                        <CharacterForm buildType="attacker" />
                    </div>
                    <div className="flex w-full animate-slide-in-short flex-col items-center">
                        <DamageTabs />
                    </div>
                    <div className="min-w-[240px] animate-slide-in-short">
                        <CharacterForm buildType="defender" />
                    </div>
                </div>
            </CharacterBuildsProvider>
        </div>
    )
}