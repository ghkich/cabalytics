'use client'
import Link from 'next/link'
import { cls } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = { href: string; className?: string; goBackText?: string; goBackHref?: string; children: React.ReactNode }

export function NavigationLink({ href, className, goBackText, goBackHref, children }: Props) {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link
            href={isActive && goBackHref ? goBackHref : href}
            className={cls(
                'group relative px-2 text-xs text-neutral-500 transition-colors duration-200 hover:text-neutral-400',
                {
                    'text-neutral-300 hover:text-neutral-300': isActive,
                },
                className
            )}
        >
            {isActive && goBackText ? goBackText : children}
        </Link>
    )
}