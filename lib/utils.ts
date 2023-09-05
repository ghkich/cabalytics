import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cls(...args: ClassValue[]) {
    return twMerge(clsx(args))
}

export const debounceAsync = <T, Args extends any[]>(func: (...args: Args) => Promise<T>, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null

    return (...args: Args): Promise<T> => {
        return new Promise((resolve, reject) => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(async () => {
                try {
                    const result = await func(...args)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }, delay)
        })
    }
}