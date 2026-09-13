/**
 * An animated GIF showcase card for the hero banner.
 * Expects the gif at /public/hero.gif.
 */
export function HeroGif() {
  return (
    <div className="hero-gif-tilt w-[300px] rounded-[1.75rem] bg-white p-2.5 shadow-[0_30px_60px_-15px_rgba(15,40,50,0.25)] ring-1 ring-black/5">
      <img
        src="/hero.gif"
        alt="Pulse dashboard in motion"
        className="h-[300px] w-full rounded-[1.35rem] object-cover"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
