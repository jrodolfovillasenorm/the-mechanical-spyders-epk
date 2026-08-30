import { useState } from 'react'

import { gallery } from '../../data/gallery'
import { useLanguage } from '../../context/LanguageContext'

export default function GallerySection() {
  const { content } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section
      id="gallery"
      className="relative px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.45em] text-[#7CFF6B]/45">
            {content.gallery.subtitle}
          </p>

          <h2 className="mt-3 text-4xl tracking-[0.12em] md:text-5xl">
            {content.gallery.title}
          </h2>
        </div>

        {/* Mosaic */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {gallery.map((item, index) => (
            <button
              key={`${item.image}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              className={[
                'group relative overflow-hidden rounded-2xl',
                'bg-white/[0.03] border border-white/10',
                'text-left',
                'focus:outline-none focus:ring-1 focus:ring-[#7CFF6B]/50',
                index % 7 === 0
                  ? 'col-span-2 row-span-2 aspect-square'
                  : index % 5 === 0
                    ? 'col-span-2 aspect-[2/1]'
                    : 'aspect-square',
              ].join(' ')}
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="
                  absolute inset-0
                  h-full w-full
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
              />

              {/* Image atmosphere */}
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

              {/* Caption */}
              <div
                className="
                  absolute inset-x-0 bottom-0
                  translate-y-2
                  bg-gradient-to-t from-black/90 via-black/50 to-transparent
                  px-4 pb-4 pt-12
                  opacity-0
                  transition-all duration-300
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#7CFF6B]/80">
                  FILE {String(index + 1).padStart(3, '0')}
                </p>

                <p className="mt-1 font-mono text-xs leading-5 tracking-[0.08em] text-white/80">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded image */}
      {selected !== null && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/90
            p-6
            md:p-12
          "
          onClick={() => setSelected(null)}
        >
          <div
            className="
              relative
              max-h-full max-w-6xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={gallery[selected].image}
              alt={gallery[selected].caption}
              className="
                max-h-[75vh]
                w-auto max-w-full
                rounded-2xl
                object-contain
                shadow-[0_0_50px_rgba(0,0,0,0.6)]
              "
            />

            <div className="mt-4 text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/60">
                FILE {String(selected + 1).padStart(3, '0')}
              </p>

              <p className="mt-2 font-mono text-xs tracking-[0.08em] text-white/70">
                {gallery[selected].caption}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="
                absolute -right-2 -top-2
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-white/10
                bg-black/70
                font-mono text-sm
                text-white/60
                transition-colors
                hover:border-[#7CFF6B]/50
                hover:text-[#7CFF6B]
                md:-right-5 md:-top-5
              "
              aria-label="Close gallery"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}