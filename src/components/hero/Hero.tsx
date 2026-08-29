import { useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import HeroBackground from './HeroBackground'

export default function Hero() {
    const { language, setLanguage, content } = useLanguage()
    const transmissionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = transmissionRef.current

        if (!element) return

        let animationFrame: number
        let position = 0
        let lastTime = performance.now()

        const speed = 12

        const animate = (time: number) => {
            const delta = (time - lastTime) / 1000
            lastTime = time

            position += speed * delta

            const maxScroll =
                element.scrollHeight - element.clientHeight

            if (maxScroll > 0) {
                if (position >= maxScroll) {
                    position = 0
                }

                element.scrollTop = position
            }

            animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [language])

    return (
        <section className="relative flex min-h-screen items-center px-6 py-20 md:px-12 lg:px-20">
            <HeroBackground />

            {/* Language selector */}
            <div className="absolute right-6 top-6 z-20 flex gap-4 text-xs tracking-[0.25em] md:right-12 md:top-8">
                <button
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'text-white' : 'text-white/35 transition hover:text-white'}
                >
                    EN
                </button>

                <button
                    onClick={() => setLanguage('es')}
                    className={language === 'es' ? 'text-white' : 'text-white/35 transition hover:text-white'}
                >
                    ES
                </button>

                <button
                    onClick={() => setLanguage('spyder')}
                    className={language === 'spyder' ? 'text-white' : 'text-white/35 transition hover:text-white'}
                    aria-label="SpyderCode"
                >
                    AS
                </button>
            </div>

            {/* Main grid */}
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                {/* LEFT — BAND NAME */}
                <div className="flex flex-col justify-center lg:col-span-2">

                    <p className="mb-6 text-xs tracking-[0.5em] text-[#7CFF6B]">
                        {content.hero.transmission}
                    </p>

                    <h1 className="text-1xl font-light tracking-[0.22em] text-cyan-100/90 sm:text-1xl md:text-2xl px-4"
                        style={{ fontFamily: 'var(--font-title)' }}
                    >
                        Ziggety Zag &
                    </h1>

                    <h2 className="mt-5 text-3xl font-black uppercase leading-[0.92] tracking-[0.08em] text-cyan drop-shadow-[0_0_18px_rgba(0,215,255,0.25)] sm:text-4xl md:text-5xl lg:text-6xl"
                        style={{ fontFamily: 'var(--font-band)', letterSpacing: '0.04em', lineHeight: '1.8em' }}
                    >
                        The Mechanical Spyders
                    </h2>

                    <div className="mt-10 flex items-center gap-4 text-xs tracking-[0.3em] text-[#7CFF6B]">
                        <span className="h-px w-12 bg-white/30" />

                        <span>
                            {content.hero.scroll}
                        </span>
                    </div>
                </div>

                {/* RIGHT — TRANSMISSION */}
                <div className="flex items-center lg:col-span-1">
                    <div className="relative w-full">
                        {/* Technical labels */}
                        <div className="mb-2 flex justify-between text-[9px] tracking-[0.3em] text-white/35">
                            <span>{content.hero.signal} // ZZS-001</span>
                            <span>{content.hero.active}</span>
                        </div>

                        {/* Transmission window */}
                        <div className="relative overflow-hidden border border-white/20 bg-black/35 backdrop-blur-sm">
                            {/* Top bar */}
                            <div className="flex items-center justify-between border-b border-cyan-400/20 px-4 py-3 text-[10px] tracking-[0.25em] text-white/50">
                                <span>TRANSMISSION</span>

                                <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                                    LIVE
                                </span>
                            </div>

                            {/* Scroll area */}
                            <div
                                ref={transmissionRef}
                                className="h-72 overflow-hidden px-5 py-6 md:h-80"
                            >
                                <div
                                    className="space-y-6 text-[26px] leading-6 tracking-[0.08em] text-[#7CFF6B]"
                                    style={{ fontFamily: 'var(--font-terminal)' }}
                                >
                                    {content.hero.crawl.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}

                                    {/* Repeat content to make the scroll continuous */}
                                    {content.hero.crawl.map((text, index) => (
                                        <p key={`repeat-${index}`}>{text}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom fade */}
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        {/* Bottom technical label */}
                        <div className="mt-2 flex justify-between text-[9px] tracking-[0.25em] text-white/25">
                            <span>{content.hero.freq}: 77.03</span>
                            <span>{content.hero.spyder}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <div className="text-lg text-white/40 animate-bounce">
                    ↓
                </div>
            </div>
        </section>
    )
}