'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cls } from '@/app/lib/utils'

const routes = [
    { href: '/', label: 'About' },
    { href: '/damage-calculator', label: 'Damage Calculator' },
    { href: '#', label: 'Collection Appraiser' },
]

export const Navigation = () => {
    const pathname = usePathname()
    return (
        <nav className="flex max-w-3xl items-center gap-3">
            {routes.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cls(
                        'text-[10px] text-neutral-600 transition-colors duration-200 hover:text-neutral-500 ',
                        {
                            'text-neutral-300 hover:text-neutral-300': pathname === href,
                        }
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}