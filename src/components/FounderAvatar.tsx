import { cn } from "@/lib/utils";

interface Props {
  name: string;
  role: string;
  quote?: string;
  photo?: string;
  /** Zoom factor on the portrait (1 = original framing) */
  photoZoom?: number;
  /** CSS object-position for the portrait */
  photoPosition?: string;
  /** Add a natural drop-shadow behind the subject (use with a transparent PNG) */
  photoShadow?: boolean;
  /** Background color class for the inner photo circle */
  photoBg?: string;
}

export function FounderAvatar({
  name,
  role,
  quote,
  photo,
  photoZoom = 1,
  photoPosition = "center 20%",
  photoShadow,
  photoBg = "bg-photo-bg",
}: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center rounded-3xl border border-black/10 bg-card/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand hover:shadow-glow">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-brand p-[3px] text-3xl font-bold text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-105 animate-gradient">
          {photo ? (
            <div className={cn("relative h-full w-full overflow-hidden rounded-full", photoBg)}>
              <img
                src={photo}
                alt={`Portrait de ${name}, co-fondateur de LexNotis`}
                loading="lazy"
                className={cn("h-full w-full object-cover", photoShadow && "shadow-portrait")}
                style={{
                  objectPosition: photoPosition,
                  transform: `scale(${photoZoom})`,
                }}
              />
              {/* Uniform lighting + shading across every portrait */}
              <div className="pointer-events-none absolute inset-0 rounded-full portrait-light" />
              <div className="pointer-events-none absolute inset-0 rounded-full portrait-vignette" />
            </div>
          ) : (
            initials
          )}
        </div>
      </div>



      <h3 className="text-xl font-semibold tracking-tight text-foreground">{name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {role}
      </p>
      {quote && (
        <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
          « {quote} »
        </p>
      )}
    </div>
  );
}
