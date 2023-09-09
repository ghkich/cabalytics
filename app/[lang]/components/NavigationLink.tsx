'use client'
import Link from 'next/link'
import { cls } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = { href: string; className?: string; children: React.ReactNode }

export function NavigationLink({ href, className, children }: Props) {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link
            href={href}
            className={cls(
                'group relative px-2 py-4 text-xs text-neutral-400 transition-colors duration-200 hover:text-neutral-300',
                {
                    'text-neutral-100 hover:text-neutral-100': isActive,
                },
                className
            )}
        >
            {children}
        </Link>
    )
}