import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SpyderInvaders from "./SpyderInvaders";

const photos = [
  "/photos/bio/Rat.jpeg",
  "/photos/bio/Warp.jpeg",
  "/photos/bio/Van.jpeg",
  "/photos/bio/Vik.jpeg",
  "/photos/bio/Zag.jpeg",
];

export default function BioSection() {
  const dossierRef = useRef<HTMLDivElement | null>(null);
  const [photo, setPhoto] = useState(0);
  const [blink, setBlink] = useState(true);
  const [engaged, setEngaged] = useState(false);
  const [canEngage, setCanEngage] = useState(false);
  const { content } = useLanguage();

  //////////////////////
  // Visual transmission
  useEffect(() => {
    if (engaged) return;

    const slideshow = window.setInterval(
      () => setPhoto((current) => (current + 1) % photos.length),
      3500,
    );
    const blinking = window.setInterval(
      () => setBlink((current) => !current),
      700,
    );

    return () => {
      window.clearInterval(slideshow);
      window.clearInterval(blinking);
    };
  }, [engaged]);

  //////////////////////////////
  useEffect(() => {
    const dossier = dossierRef.current;

    if (!dossier) return;

    const handleScroll = () => {
      const threshold = 40;
      const noScroll = dossier.scrollHeight <= dossier.clientHeight + 1;
      const reachedBottom =
        noScroll ||
        dossier.scrollTop + dossier.clientHeight >=
          dossier.scrollHeight - threshold;

      setCanEngage(reachedBottom);
    };

    dossier.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => dossier.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="bio" className="relative px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.45em] text-[#7CFF6B]/45">
            {content.bio.subtitle}
          </p>

          <h2 className="mt-3 text-4xl tracking-[0.12em] md:text-5xl">
            {content.bio.title}
          </h2>
        </div>

        {/* Panels */}
        <div className="grid gap-10 lg:grid-cols-[40fr_60fr] lg:items-stretch">
          {/* ================================================= */}
          {/* LEFT — DOSSIER */}
          {/* ================================================= */}
          <div className="flex min-h-[383px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm lg:h-[383px]">
            {/* Dossier header */}
            <div className="border-b border-white/10 px-8 py-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/70">
                    {content.bio.subject}
                    <br />
                    {content.bio.description}
                  </p>
                </div>

                <div className="text-right font-mono text-[10px] tracking-[0.2em] text-white/35">
                  {content.bio.status}
                  <br />
                  <span className="text-[#7CFF6B]/60">
                    {content.bio.active}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable dossier */}
            <div
              ref={dossierRef}
              className="min-h-0 flex-1 space-y-8 overflow-y-auto px-8 py-8 text-white/70 leading-8"
            >
              {/* Photos */}
              <figure>
                <img
                  src="/photos/bio/Zag.jpeg"
                  alt=""
                  className="w-full rounded-xl object-cover"
                />

                <figcaption className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.bios[0]}
                </figcaption>
              </figure>

              <div>
                <p>{content.bio.bios[1]}</p>
              </div>

              <figure>
                <img
                  src="/photos/bio/Van.jpeg"
                  alt=""
                  className="w-full rounded-xl object-cover"
                />

                <figcaption className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.bios[2]}
                </figcaption>
              </figure>

              <div>
                <p>{content.bio.bios[3]}</p>
              </div>

              <figure>
                <img
                  src="/photos/bio/Vik.jpeg"
                  alt=""
                  className="w-full rounded-xl object-cover"
                />

                <figcaption className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.bios[4]}
                </figcaption>
              </figure>

              <div>
                <p>{content.bio.bios[5]}</p>
              </div>

              <figure>
                <img
                  src="/photos/bio/Rat.jpeg"
                  alt=""
                  className="w-full rounded-xl object-cover"
                />

                <figcaption className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.bios[6]}
                </figcaption>
              </figure>

              <div>
                <p>{content.bio.bios[7]}</p>
              </div>

              <figure>
                <img
                  src="/photos/bio/Warp.jpeg"
                  alt=""
                  className="w-full rounded-xl object-cover"
                />

                <figcaption className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.bios[8]}
                </figcaption>
              </figure>

              <div>
                <p>{content.bio.bios[9]}</p>
              </div>
              {/* Photos end */}

              {/* End of file */}
              <div className="pt-4">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/45">
                  {content.bio.eof}
                </p>
              </div>

              {/* Engage */}
              <div className="flex min-h-[130px] flex-col items-center justify-center gap-4 pb-10">
                {!canEngage ? (
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/25">
                    {content.bio.keepScrolling}
                  </p>
                ) : (
                  <>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-[#7CFF6B]/50">
                      {content.bio.ready}
                    </p>

                    <button
                      type="button"
                      onClick={() => setEngaged(true)}
                      className="rounded-xl border border-[#7CFF6B]/40 px-10 py-3 font-mono text-sm tracking-[0.3em] text-[#7CFF6B] transition-all duration-300 hover:border-[#7CFF6B] hover:bg-[#7CFF6B]/10 hover:shadow-[0_0_25px_rgba(124,255,107,0.12)]"
                    >
                      {content.bio.engage}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT — VISUAL TRANSMISSION / GAME */}
          {/* ================================================= */}
          <div className="h-[197px] overflow-hidden rounded-[2rem] md:h-[383px] border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {!engaged ? (
              <div className="relative h-full w-full">
                {/* Slideshow */}
                {photos.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={[
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms]",
                      photo === index ? "opacity-35" : "opacity-0",
                    ].join(" ")}
                  />
                ))}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Green atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,255,107,0.08),transparent_70%)]" />

                {/* Metadata */}
                <div className="absolute left-6 top-6 font-mono text-[9px] leading-5 tracking-[0.25em] text-[#7CFF6B]/45">
                  FILE 001
                  <br />
                  VISUAL SIGNAL ACTIVE
                </div>

                {/* Keep scrolling */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="font-mono text-[10px] tracking-[0.35em] text-[#7CFF6B]/60">
                    VISUAL TRANSMISSION
                  </p>

                  <h3
                    className={[
                      "mt-5 font-mono text-2xl tracking-[0.35em] text-[#7CFF6B] transition-opacity duration-300",
                      blink ? "opacity-100" : "opacity-20",
                    ].join(" ")}
                  >
                    KEEP
                    <br />
                    SCROLLING
                  </h3>

                  {/* Slideshow indicator */}
                  <div className="mt-8 flex gap-2">
                    {photos.map((_, index) => (
                      <div
                        key={index}
                        className={[
                          "h-1.5 w-8 rounded-full transition-all duration-500",
                          photo === index ? "bg-[#7CFF6B]" : "bg-[#7CFF6B]/20",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full">
                <SpyderInvaders />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
