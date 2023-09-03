import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cls(...args: ClassValue[]) {
    return twMerge(clsx(args))
}