type AvatarProps = {
  name: string;
  /** Profil fotoğrafı URL'i — verilmezse veya yüklenemezse isim baş harfine düşer. */
  src?: string | null;
  size?: number;
  className?: string;
};

export function Avatar({ name, src, size = 36, className = "" }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className={`inline-block shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-cta-text ${className}`}
    >
      {initial}
    </span>
  );
}
