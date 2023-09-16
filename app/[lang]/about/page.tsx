import React from 'react'
import { Locale } from '@/i18n.config'
import { getTranslations } from '@/lib/dictionary'
import { Card } from '@/app/[lang]/components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/sharp-light-svg-icons'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFlaskGear } from '@fortawesome/pro-duotone-svg-icons'

export default async function About({ params }: { params: { lang: Locale } }) {
    const t = await getTranslations(params.lang)

    return (
        <div className="animate-slide-in-short space-y-1 pt-1.5 text-sm text-neutral-400">
            <div className="flex flex-col gap-0.5 md:flex-row">
                <div className="flex flex-col gap-0.5 md:w-2/3">
                    <Card className="relative space-y-4 overflow-hidden bg-neutral-900 px-10 pb-6 pt-14 text-neutral-400">
                        <p>{t('about.hello')}</p>
                        <FontAwesomeIcon
                            icon={faFlaskGear}
                            className="absolute bottom-0 right-0 translate-x-[25px] translate-y-[65px] text-[250px] text-neutral-700 opacity-10"
                        />
                    </Card>
                    <Card className="bg-neutral-850 px-10 py-6 text-neutral-450">
                        <p>{t('about.what_is')}</p>
                    </Card>
                    <Card className="space-y-4 bg-neutral-900 px-10 py-6 text-neutral-450">
                        <p>{t('about.history_paragraph_1')}</p>
                        <p>{t('about.history_paragraph_2')}</p>
                        <p>{t('about.history_paragraph_3')}</p>
                        <p>{t('about.history_paragraph_4')}</p>
                        <p>{t('about.history_paragraph_5')}</p>
                        <p>{t('about.history_paragraph_6')}</p>
                    </Card>
                    <Card className="bg-neutral-910 bg-opacity-70">
                        <p className="text-xs leading-normal text-neutral-600">{t('about.footer_note')}</p>
                    </Card>
                </div>
                <div className="w-[5px] self-stretch bg-neutral-900 bg-opacity-50"></div>
                <div className="flex flex-col gap-0.5 md:w-1/3">
                    <Card className="bg-neutral-850 py-4 text-center">
                        <h2 className="text-xs text-neutral-400">
                            Versão 5.00a - <span className="text-[11px] text-orange-300">Alpha Release</span>
                        </h2>
                    </Card>
                    <Card className="bg-neutral-900 text-xs leading-normal">
                        <p>
                            <span className="text-orange-300">{t('about.side_note')}</span>{' '}
                        </p>
                        <p>{t('about.side_note_2')}</p>
                    </Card>
                    <Card className="bg-neutral-850 text-xs leading-normal">
                        <p>{t('about.help_text')}</p>
                    </Card>
                    <Card className="bg-neutral-900 text-xs">
                        <div className="flex items-center justify-around">
                            <a
                                href="mailto:gh.kich@gmail.com"
                                className="text-neutral-400 transition-colors duration-200 hover:text-neutral-300"
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> E-mail
                            </a>
                            <a
                                href="https://twitter.com/ghkich"
                                target="_blank"
                                className="text-neutral-400 transition-colors duration-200 hover:text-neutral-300"
                            >
                                <FontAwesomeIcon icon={faXTwitter} className="mr-1" /> Twitter
                            </a>
                            <a
                                href="https://www.instagram.com/gustavo.kich/"
                                target="_blank"
                                className="text-neutral-400 transition-colors duration-200 hover:text-neutral-300"
                            >
                                <FontAwesomeIcon icon={faInstagram} className="mr-1" /> Instagram
                            </a>
                        </div>
                    </Card>
                    <Card className="bg-neutral-875 text-xs leading-normal">
                        <p className="text-neutral-400">{t('about.credits')}</p>
                        <ul className="space-y-1 text-neutral-500">
                            <li>
                                <span className="text-neutral-300">Jota</span> - {t('about.credits_jota')}
                            </li>
                            <li>
                                <span className="text-neutral-300">Mr. Wormy</span> - {t('about.credits_wormy')}{' '}
                                <a href="https://mrwormy.tiiny.site/" target="_blank" className="text-neutral-400">
                                    link
                                </a>
                                .
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
}