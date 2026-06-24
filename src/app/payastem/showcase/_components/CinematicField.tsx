type CinematicFieldProps = {
  particleCount?: number;
  className?: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

export function CinematicField({ particleCount = 22, className = "" }: CinematicFieldProps) {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: seededRandom(i + 1) * 100,
    size: 1 + seededRandom(i + 2) * 2,
    duration: 10 + seededRandom(i + 3) * 14,
    delay: seededRandom(i + 4) * -20,
  }));

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="ps-grid-bg ps-mask-fade absolute inset-0 opacity-60" />

      <div className="absolute inset-0">
        <div
          className="ps-glowline absolute left-[8%] top-[22%] h-px w-[35%] bg-gradient-to-r from-transparent via-ps-cyan/70 to-transparent"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="ps-glowline absolute right-[6%] top-[58%] h-px w-[28%] bg-gradient-to-r from-transparent via-ps-gold/60 to-transparent"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="ps-glowline absolute left-[18%] top-[78%] h-px w-[22%] bg-gradient-to-r from-transparent via-ps-cyan/50 to-transparent"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(221,153,22,0.10) 0%, rgba(0,200,255,0.05) 45%, transparent 70%)",
        }}
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className="ps-particle absolute rounded-full bg-ps-cyan/60"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: "0 0 6px rgba(0,200,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}
