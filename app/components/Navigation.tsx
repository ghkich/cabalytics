'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const routes = [
    { href: '/', label: 'Home' },
    { href: '/damage-calculator', label: 'Damage Calculator' },
    { href: '#', label: 'Collection' },
]

export const Navigation = () => {
    const pathname = usePathname()
    return (
        <nav className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="flex items-center gap-2">
                {routes.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={clsx('text-[10px] text-white text-opacity-20 hover:text-opacity-75', href === pathname && 'text-opacity-100')}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}