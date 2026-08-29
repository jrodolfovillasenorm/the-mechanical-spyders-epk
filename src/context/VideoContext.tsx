import {
    createContext,
    useContext,
    useEffect,
    useRef,
} from 'react'

import type {
    YouTubeAPI,
    YouTubePlayer,
} from '../types/youtube'

declare global {
    interface Window {
        YT?: YouTubeAPI
        onYouTubeIframeAPIReady?: () => void
    }
}

interface VideoContextValue {
    registerPlayer: (
        id: string,
        player: YouTubePlayer
    ) => void

    unregisterPlayer: (id: string) => void
}

const VideoContext =
    createContext<VideoContextValue | null>(null)

export function VideoProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const playersRef =
        useRef<Map<string, YouTubePlayer>>(new Map())

    useEffect(() => {
        /*
         * Music started:
         * pause every YouTube player.
         */
        const handleMusicPlay = () => {
            playersRef.current.forEach((player) => {
                player.pauseVideo()
            })
        }

        /*
         * A YouTube video started:
         * pause every other YouTube player.
         */
        const handleVideoPlay = (
            event: Event
        ) => {
            const customEvent =
                event as CustomEvent<{ id: string }>

            const activeId =
                customEvent.detail?.id

            if (!activeId) {
                return
            }

            playersRef.current.forEach(
                (player, id) => {
                    if (id !== activeId) {
                        player.pauseVideo()
                    }
                }
            )
        }

        window.addEventListener(
            'spyder-music-play',
            handleMusicPlay
        )

        window.addEventListener(
            'spyder-video-play',
            handleVideoPlay
        )

        return () => {
            window.removeEventListener(
                'spyder-music-play',
                handleMusicPlay
            )

            window.removeEventListener(
                'spyder-video-play',
                handleVideoPlay
            )
        }
    }, [])

    const registerPlayer = (
        id: string,
        player: YouTubePlayer
    ) => {
        playersRef.current.set(id, player)
    }

    const unregisterPlayer = (id: string) => {
        const player =
            playersRef.current.get(id)

        if (player) {
            player.destroy()
            playersRef.current.delete(id)
        }
    }

    return (
        <VideoContext.Provider
            value={{
                registerPlayer,
                unregisterPlayer,
            }}
        >
            {children}
        </VideoContext.Provider>
    )
}

export function useVideos() {
    const context =
        useContext(VideoContext)

    if (!context) {
        throw new Error(
            'useVideos must be used inside VideoProvider'
        )
    }

    return context
}