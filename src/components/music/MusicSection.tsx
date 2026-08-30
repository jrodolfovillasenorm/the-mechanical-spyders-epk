import { tracks } from '../../data/tracks'
import { videos } from '../../data/videos'
import { useLanguage } from '../../context/LanguageContext'

import AlbumCard from './AlbumCard'
import VideoCard from './VideoCard'

export default function MusicSection() {
    const { content } = useLanguage()

    return (
        <section
            id="music"
            className="relative px-6 py-32 md:px-12 lg:px-20 mb-0"
        >
            <div className="mx-auto max-w-7xl">
                {/* =========================
                    MUSIC
                ========================= */}
                <div className="mb-12 text-center">
                    <p className="font-mono text-xs tracking-[0.45em] text-[#7CFF6B]/45">
                        {content.music.nowReceiving}
                    </p>

                    <h2 className="mt-3 text-4xl tracking-[0.12em] md:text-5xl">
                        {content.music.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-0 md:grid-cols-3 lg:grid-cols-4">
                    {tracks.map((track) => (
                        <AlbumCard
                            key={track.id}
                            track={track}
                        />
                    ))}
                </div>

                {/* =========================
                    VISUAL TRANSMISSIONS
                ========================= */}
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}