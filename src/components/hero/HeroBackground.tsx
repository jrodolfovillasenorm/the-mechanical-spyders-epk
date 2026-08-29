import { useEffect, useState } from 'react'

const images = [
    '/photos/hero/Warp.jpeg',
    '/photos/hero/Rat.jpeg',
    '/photos/hero/Zag.jpeg',
    '/photos/hero/Van.jpeg',
    '/photos/hero/Vik.jpeg',
]

export default function HeroBackground() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div id="hero-background" className="absolute inset-0 z-0 pointer-events-none">

            {/* Floating hero panel */}
            <div
                className="
                    absolute inset-y-15 inset-x-8
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-black/20
                    shadow-[0_0_40px_rgba(0,0,0,0.45)]
                "
            >
                {images.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        className={[
                            'absolute inset-10 h-full w-full object-cover',
                            'transition-all duration-[4000ms] ease-in-out',
                            'scale-110 blur-md brightness-75 saturate-125',
                            index === i
                                ? 'opacity-25'
                                : 'opacity-0 scale-[1.18]',
                        ].join(' ')}
                    />
                ))}

                {/* Color wash */}
                <div
                    className="
                        absolute inset-0
                        bg-[radial-gradient(circle_at_center,rgba(0,215,255,0.08),transparent_60%)]
                    "
                />

                {/* Dark gradient for readability */}
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-b
                        from-black/10
                        via-black/45
                        to-[#05070B]
                    "
                />

                {/* Subtle inner edge */}
                <div
                    className="
                        absolute inset-0
                        rounded-2xl
                        ring-1
                        ring-inset
                        ring-white/5
                    "
                />
            </div>
        </div>
    )
}