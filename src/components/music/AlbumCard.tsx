import { useState } from 'react'
import type { Track } from '../../types/tracks'
import { useMusic } from '../../context/MusicContext'
import { useAccess } from '../../context/AccessContext'
import { useLanguage } from '../../context/LanguageContext'

interface Props {
    track: Track
}

export default function AlbumCard({ track }: Props) {
    const {
        currentTrack,
        isPlaying,
        toggle,
    } = useMusic()
    const { content } = useLanguage()
    const { hasAccess, unlock } = useAccess()
    const [showAccess, setShowAccess] = useState(false)
    const [code, setCode] = useState('')
    const [error, setError] = useState(false)
    const selected = currentTrack?.id === track.id
    const spinning = selected && isPlaying
    const locked = track.private === true && !hasAccess
    const handleClick = () => {
        if (locked) {
            setShowAccess(true)
            setError(false)
            return
        }

        toggle(track)
    }
    const handleUnlock = () => {
        const success = unlock(code)

        if (success) {
            setShowAccess(false)
            setCode('')
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className="group">
            <button
                onClick={handleClick}
                className="w-full text-left"
            >
                <div
                    className={[
                        'relative mx-auto aspect-square w-full max-w-[250px] overflow-hidden transition-all duration-500',
                        selected
                            ? 'rounded-full shadow-[0_0_35px_rgba(255,255,255,0.18)]'
                            : 'rounded-2xl',
                    ].join(' ')}
                >
                    {/* Artwork */}
                    <img
                        src={track.artwork}
                        alt={track.title}
                        className={[
                            'h-full w-full object-cover transition-all duration-500',
                            spinning ? 'animate-spin-slow' : '',
                            locked
                                ? 'scale-100 brightness-50 saturate-50'
                                : '',
                        ].join(' ')}
                    />

                    {/* Locked overlay */}
                    {locked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 text-center">
                            <div className="text-3xl opacity-80">
                                🔒
                            </div>

                            <div className="mt-3 text-sm tracking-[0.25em] text-white/90">
                                UNRELEASED
                            </div>

                            <div className="mt-1 text-[10px] tracking-[0.18em] text-white/45">
                                SPYDER CODE REQUIRED
                            </div>
                        </div>
                    )}

                    {/* Vinyl grooves */}
                    {selected && (
                        <>
                            <div className="absolute inset-[8%] rounded-full border border-white/10" />
                            <div className="absolute inset-[20%] rounded-full border border-white/10" />
                            <div className="absolute inset-[32%] rounded-full border border-white/10" />
                        </>
                    )}

                    {/* Center label */}
                    {selected && (
                        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/70 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                    )}

                    {/* Play / Pause */}
                    {!locked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 text-2xl backdrop-blur-sm">
                                {spinning ? '❚❚' : '▶'}
                            </div>
                        </div>
                    )}
                </div>
            </button>

            <div className="mt-4 text-center">
                <h3 className="text-lg tracking-[0.08em]">
                    {track.title}
                </h3>

                <p className="mt-1 text-xs tracking-[0.15em] text-white/45">
                    {track.released
                        ? content.music.released
                        : locked
                            ? content.music.locked
                            : content.music.preRelease}
                </p>
            </div>

            {/* Access dialog */}
            {showAccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#080b12]/95 p-8 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
                        <div className="text-center">
                            <div className="text-xs tracking-[0.3em] text-white/40">
                                {content.music.locked}
                            </div>

                            <h2 className="mt-3 text-2xl tracking-[0.08em]">
                                {track.title}
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-white/50">
                                {content.music.code}
                            </p>
                        </div>

                        <div className="mt-6">
                            <input
                                type="text"
                                value={code}
                                onChange={(event) => {
                                    setCode(event.target.value)
                                    setError(false)
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleUnlock()
                                    }
                                }}
                                placeholder="SPYDER CODE"
                                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-center text-sm tracking-[0.2em] outline-none transition-colors placeholder:text-white/20 focus:border-white/30"
                                autoFocus
                            />

                            {error && (
                                <p className="mt-3 text-center text-xs tracking-[0.1em] text-red-300/70">
                                    INVALID ACCESS CODE
                                </p>
                            )}

                            <button
                                onClick={handleUnlock}
                                className="mt-4 w-full rounded-lg border border-white/15 bg-white/5 py-3 text-xs tracking-[0.2em] transition-all hover:bg-white/10"
                            >
                                CONNECT
                            </button>

                            <button
                                onClick={() => {
                                    setShowAccess(false)
                                    setCode('')
                                    setError(false)
                                }}
                                className="mt-3 w-full py-2 text-xs tracking-[0.15em] text-white/30 transition-colors hover:text-white/60"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}