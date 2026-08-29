export interface YouTubePlayer {
    pauseVideo: () => void
    playVideo: () => void
    destroy: () => void
}

export interface YouTubePlayerConstructor {
    new(
        element: HTMLElement,
        options: {
            videoId: string
            playerVars?: Record<string, number | string>
            events?: {
                onStateChange?: (event: {
                    data: number
                }) => void
            }
        }
    ): YouTubePlayer
}

export interface YouTubeAPI {
    Player: YouTubePlayerConstructor
    PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
    }
}