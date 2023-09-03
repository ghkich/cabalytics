'use client'
import Link from 'next/link'
import { cls } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

export function NavigationLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <Link
            href={href}
            className={cls('text-[10px] text-neutral-600 transition-colors duration-200 hover:text-neutral-500 ', {
                'text-neutral-300 hover:text-neutral-300': pathname === href,
            })}
        >
            {children}
        </Link>
    )
}