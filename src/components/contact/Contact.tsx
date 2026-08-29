const contacts = [
  {
    label: "WHATSAPP",
    value: "+52 55 2184 3230",
    href: "https://wa.me/525521843230",
    description: "DIRECT COMMUNICATION CHANNELS",
  },
  {
    label: "EMAIL",
    value: "themechanicalspyders@gmail.com",
    href: "mailto:themechanicalspyders@gmail.com",
    description: "ELECTRONIC MAIL CHANNEL",
  },
  {
    label: "INSTAGRAM",
    value: "/themechanicalspyders",
    href: "https://instagram.com/themechanicalspyders",
    description: "VISUAL TRANSMISSION",
  },
  {
    label: "YOUTUBE",
    value: "The Mechanical Spyders",
    href: "https://www.youtube.com/@MechanicalSpydersOficial",
    description: "VIDEO TRANSMISSION",
  },
  {
    label: "SPOTIFY",
    value: "Ziggety Zag & The Mechanical Spyders",
    href: "https://open.spotify.com/intl-es/artist/7M8ClYl16ZCmf6qhfwNgUP",
    description: "AUDIO TRANSMISSION",
  },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative mt-10 border-t border-white/10 px-6 py-14 md:px-12 lg:px-20 mt-40"
    >
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,255,107,0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.4em] text-[#7CFF6B]/45">
              TRANSMISSION FILE 003
            </p>

            <h2 className="mt-2 text-3xl tracking-[0.12em] md:text-4xl">
              CONTACT
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7CFF6B] shadow-[0_0_8px_rgba(124,255,107,0.8)]" />
            SIGNAL ONLINE
          </div>
        </div>

        {/* COMMUNICATION ARRAY */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm">
          {/* Array header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#7CFF6B]/60">
                COMMUNICATION ARRAY
              </span>

              <span className="hidden h-px w-12 bg-[#7CFF6B]/20 sm:block" />

              <span className="hidden font-mono text-[11px] tracking-[0.2em] text-white/20 sm:block">
                OPEN CHANNEL
              </span>
            </div>

            <span className="font-mono text-[11px] tracking-[0.2em] text-[#7CFF6B]/40">
              05 ACTIVE
            </span>
          </div>

          {/* Channels */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5">
            {contacts.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border-b border-white/10 px-5 py-6 transition-all duration-300 hover:bg-[#7CFF6B]/[0.04] sm:border-r lg:border-b-0 last:border-r-0"
              >
                {/* Channel number */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-[#7CFF6B]/30">
                    0{index + 1}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#7CFF6B]/40 transition-all duration-300 group-hover:bg-[#7CFF6B] group-hover:shadow-[0_0_7px_rgba(124,255,107,0.8)]" />
                </div>

                {/* Label */}
                <p className="font-mono text-xs tracking-[0.25em] text-[#7CFF6B]/65">
                  {contact.label}
                </p>

                {/* Value */}
                <p className="mt-2 truncate text-base text-white/65 transition-colors duration-300 group-hover:text-white">
                  {contact.value}
                </p>

                {/* Description */}
                <p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-white/20">
                  {contact.description}
                </p>

                {/* Arrow */}
                <span className="absolute bottom-5 right-5 font-mono text-base text-[#7CFF6B]/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#7CFF6B]">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM SYSTEM BAR */}
        <div className="mt-7 flex flex-col gap-4 font-mono text-[10px] tracking-[0.2em] text-white/20 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#7CFF6B]/35">SIGNAL READY</span>

            <span className="h-px w-10 bg-[#7CFF6B]/15" />

            <span>ALL CHANNELS ACCEPTING TRANSMISSIONS</span>
          </div>

          <div className="text-left md:text-right">
            ZIGGETY ZAG &amp; THE MECHANICAL SPYDERS
            <span className="mx-2 text-white/10">//</span>© 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
