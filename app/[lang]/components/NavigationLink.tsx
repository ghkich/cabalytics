'use client'
import Link from 'next/link'
import { cls } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

export function NavigationLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link
            href={href}
            className={cls(
                'group relative px-2 py-4 text-xs text-neutral-500 transition-colors duration-200 hover:text-neutral-300',
                {
                    'text-neutral-300 hover:text-neutral-300': isActive,
                }
            )}
        >
            {children}
        </Link>
    )
}