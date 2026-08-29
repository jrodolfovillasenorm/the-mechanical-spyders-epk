import { useEffect, useRef } from "react";

import type { Video } from "../../types/video";
import type { YouTubePlayer } from "../../types/youtube";

import { useVideos } from "../../context/VideoContext";

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playerRef = useRef<YouTubePlayer | null>(null);

  const { registerPlayer, unregisterPlayer } = useVideos();

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !containerRef.current || !window.YT) {
        return;
      }

      const player = new window.YT.Player(containerRef.current, {
        videoId: video.youtubeId,

        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },

        events: {
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.PLAYING) {
              window.dispatchEvent(
                new CustomEvent("spyder-video-play", {
                  detail: {
                    id: video.id,
                  },
                }),
              );
            }
          },
        },
      });

      playerRef.current = player;

      registerPlayer(video.id, player);
    };

    if (window.YT) {
      createPlayer();
    } else {
      const previous = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!existingScript) {
        const script = document.createElement("script");

        script.src = "https://www.youtube.com/iframe_api";

        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;

      unregisterPlayer(video.id);

      playerRef.current = null;
    };
  }, [video.id, video.youtubeId, registerPlayer, unregisterPlayer]);

  return (
    <article className="group">
      <div
        className="
        relative
        rounded-[2rem]
        border border-white/10
        bg-[#080a0f]
        p-3
        shadow-[0_0_35px_rgba(0,0,0,0.5)]
        transition-all duration-500
        group-hover:border-white/20
        group-hover:shadow-[0_0_45px_rgba(0,0,0,0.65)]
    "
      >
        <div
          className="
            relative
            aspect-video
            overflow-hidden
            rounded-[1.5rem]
            bg-black
            ring-1 ring-inset ring-white/5
        "
        >
          <div
            ref={containerRef}
            className="youtube-player absolute inset-0 h-full w-full"
          />

          {/* CRT glass */}
          <div
            className="
                pointer-events-none
                absolute inset-0
                rounded-[1.5rem]
                bg-[radial-gradient(
                    ellipse_at_center,
                    transparent_55%,
                    rgba(0,0,0,0.25)
                )]
            "
          />

          {/* Screen reflection */}
          <div
            className="
                pointer-events-none
                absolute inset-x-0 top-0
                h-1/3
                bg-gradient-to-b
                from-white/[0.035]
                to-transparent
            "
          />
        </div>
      </div>

      <h3
        className="
                    mt-4
                    text-center
                    text-sm
                    tracking-[0.12em]
                    text-white/80
                    transition-colors
                    duration-300
                    group-hover:text-white
                "
      >
        {video.title}
      </h3>
    </article>
  );
}
