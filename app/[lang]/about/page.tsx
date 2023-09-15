import React from 'react'
import { Locale } from '@/i18n.config'
import { getTranslations } from '@/lib/dictionary'
import { TextCard } from '@/app/[lang]/components/TextCard'

export default async function About({ params }: { params: { lang: Locale } }) {
    const t = await getTranslations(params.lang)

    return (
        <div className="animate-slide-in-short space-y-1.5 text-sm text-neutral-400">
            <h1 className="w-full bg-neutral-910 p-4 text-center uppercase">{t('navigation.about')}</h1>
            <div className="flex gap-1">
                <div className="flex w-2/3 flex-col gap-1">
                    <TextCard title={'Sobre a Cabalc'}>
                        <p>
                            A Cabalc é uma calculadora de dano para o Cabal Online que tem o objetivo de fornecer uma
                            estimativa mais precisa do dano de um personagem em diferentes cenários do jogo. E, dessa
                            forma, ajudar os jogadores a tomarem decisões mais assertivas sobre seus personagens.
                        </p>
                    </TextCard>
                    <TextCard title={'Sobre o autor e a jornada'}>
                        <p>Olá! Eu sou StarrK, o criador da Cabalc.</p>
                        <p>
                            Eu voltei a jogar Cabal Online depois de uma pausa de quase 12 anos e fiquei empolgado em
                            dar continuidade ao projeto, que foi um dos primeiros apps que criei e que me fez perceber
                            minha paixão pelo universo web.
                        </p>
                        <p>
                            Eu lembro que parei a manutenção da Cabalc quando a ESTsoft lançou um Episódio com grandes
                            mudanças nas fórmulas de dano do jogo. Na época, eu fiz algumas tentativas para decifrar as
                            novas fórmulas, mas como eu já havia parado de jogar Cabal, acabei deixando de lado.
                        </p>
                        <p>
                            Eu sei que, hoje em dia, o Combat Power serve como um bom indicador do potencial de dano de
                            um personagem, mas ainda não consegue fornecer detalhes específicos para cada situação do
                            jogo. E, como eu sou um grande entusiasta em entender como as coisas funcionam nos mais
                            mínimos detalhes, isso me motivou a retomar minha busca pelas fórmulas exatas de dano do
                            jogo.
                        </p>
                        <p>
                            Embora eu ainda não tenha desvendado completamente as fórmulas, estou feliz com os
                            resultados que obtive até momento. Já fiz diversos testes com as classes AA, MA e GU e em
                            breve farei com as demais classes e outros cenários.
                        </p>
                        <p>
                            Inclusive, estou aberto a toda forma de contribuição, seja ela em testes, feedback ou
                            sugestões para melhorias. Se tiver interesse em ajudar ou encontrar algum bug, não hesite em
                            me enviar uma mensagem em qualquer uma das minhas redes sociais.
                        </p>
                        <p>
                            Obrigado por usar este app ou por qualquer contribuição que possa oferecer. Espero que a
                            Cabalc ajude você a melhorar sua experiência com o Cabal. Valeu e bom jogo!
                        </p>
                    </TextCard>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                    <TextCard title={'Status de desenvolvimento'}>
                        <p>
                            Tenha em mente que a versão atual da Cabalc está em desenvolvimento e algumas
                            funcionalidades ainda estão incompletas. Ela também pode conter bugs e apresentar resultados
                            imprecisos. Estou trabalhando para melhorá-la constantemente e sua paciência e feedback
                            serão muito apreciados.
                        </p>
                    </TextCard>
                    <div className="bg-neutral-900 p-4">
                        <h2 className="text-lg">Créditos</h2>
                        <p>Agradeço a todos que me ajudaram ou estão ajudando de alguma forma a criar este app:</p>
                        <ul>
                            <li>Jota - Por me ajudar a testar as fórmulas</li>
                            <li>
                                Mr. Wormy - Por todas as informações que obtive em seu blog e por disponibilizar a
                                fórmula de cálculo do Combat Power neste link: https://mrwormy.tiiny.site/.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-neutral-900 p-4">
                        <h2 className="text-lg">Contato</h2>
                    </div>
                </div>
            </div>
            <div className="w-2/3 bg-neutral-910 p-4 text-xs text-neutral-600">
                Este aplicativo é uma criação independente e não possui qualquer afiliação ou endosso da ESTsoft ou de
                Cabal Online. Foi desenvolvido por um fã do jogo, para fãs do jogo.
            </div>
        </div>
    )
}