import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import type { Track } from '../types/tracks'

interface MusicContextValue {
    currentTrack: Track | null
    isPlaying: boolean
    volume: number
    play: (track: Track) => void
    toggle: (track: Track) => void
    pause: () => void
    setVolume: (volume: number) => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function MusicProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [currentTrack, setCurrentTrack] =
        useState<Track | null>(null)

    const [isPlaying, setIsPlaying] = useState(false)

    const [volume, setVolumeState] = useState(0.8)

    /*
     * Create the audio element once.
     */
    useEffect(() => {
        const audio = new Audio()

        audio.preload = 'metadata'
        audio.volume = volume

        audioRef.current = audio

        const handlePlay = () => {
            setIsPlaying(true)
        }

        const handlePause = () => {
            setIsPlaying(false)
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.pause()
            audio.removeAttribute('src')
            audio.load()

            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)

            audioRef.current = null
        }
    }, [])

    /*
     * Keep the audio volume synchronized with React state.
     */
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    /*
     * Pause music when a YouTube video starts.
     */
    useEffect(() => {
        const handleVideoPlay = () => {
            audioRef.current?.pause()
        }

        window.addEventListener(
            'spyder-video-play',
            handleVideoPlay
        )

        return () => {
            window.removeEventListener(
                'spyder-video-play',
                handleVideoPlay
            )
        }
    }, [])

    const pause = () => {
        audioRef.current?.pause()
    }

    const play = (track: Track) => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        /*
         * Tell YouTube players to stop before music starts.
         */
        window.dispatchEvent(
            new CustomEvent('spyder-music-play')
        )

        if (currentTrack?.id !== track.id) {
            audio.pause()

            audio.src = track.audio
            audio.currentTime = 0

            setCurrentTrack(track)
        }

        audio.play().catch((error) => {
            console.error(
                'Unable to play track:',
                error
            )
        })
    }

    const toggle = (track: Track) => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        const sameTrack =
            currentTrack?.id === track.id

        if (!sameTrack) {
            play(track)
            return
        }

        if (audio.paused) {
            play(track)
        } else {
            audio.pause()
        }
    }

    const setVolume = (value: number) => {
        const normalized = Math.min(
            1,
            Math.max(0, value)
        )

        setVolumeState(normalized)
    }

    return (
        <MusicContext.Provider
            value={{
                currentTrack,
                isPlaying,
                volume,
                play,
                toggle,
                pause,
                setVolume,
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}

export function useMusic() {
    const context = useContext(MusicContext)

    if (!context) {
        throw new Error(
            'useMusic must be used inside MusicProvider'
        )
    }

    return context
}