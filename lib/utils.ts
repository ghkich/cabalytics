import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cls(...args: ClassValue[]) {
    return twMerge(clsx(args))
}

export type AccentColor = 'emerald' | 'red'

export const getAccentColorByType = (type: 'attacker' | 'defender'): AccentColor =>
    type === 'attacker' ? 'emerald' : 'red'

export const getTwColorClassNameByAccent = (accentColor?: AccentColor) => {
    if (!accentColor) return 'text-neutral-400'
    return accentColor === 'emerald' ? 'text-emerald-400' : 'text-red-400'
}