import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cls(...args: ClassValue[]) {
    return twMerge(clsx(args))
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getBuildTypeColor = (type: 'attacker' | 'defender') => {
    return type === 'attacker' ? 'text-emerald-400' : 'text-red-400'
}