export const ColorPalette = ({ title, colors }: { title: string; colors: { name: string; variable: string }[] }) => (
  <div className="mb-8">
    <h3 className="mb-4 text-xl font-semibold capitalize text-foreground">{title}</h3>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-sm">
          <div
            className="h-20 w-full rounded-md shadow-sm border border-border/50"
            style={{ backgroundColor: `var(${color.variable})` }}
          />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold text-foreground/80">{color.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground select-all">{color.variable}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TypeScale = ({ role, sizeClass, weightClass = "font-normal", description }: any) => (
  <div className="flex flex-col gap-2 border-b border-border py-4 first:pt-0 last:border-0">
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-xs text-muted-foreground">{role}</span>
      <span className="font-mono text-xs text-muted-foreground opacity-50">{sizeClass} • {weightClass}</span>
    </div>
    <p className={`${sizeClass} ${weightClass} text-foreground`}>
      The quick brown fox jumps over the lazy dog.
    </p>
    {description && <p className="text-sm text-muted-foreground">{description}</p>}
  </div>
);

export const SpacingBlock = ({ name, size }: { name: string; size: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 text-sm font-mono text-muted-foreground">{name}</div>
    <div className={`bg-primary h-6 ${size}`} title={`Class: ${size}`}></div>
    <div className="text-xs text-muted-foreground/50 font-mono hidden sm:block">
      {/* Visual representation of width */}
    </div>
  </div>
);

export const RadiusBlock = ({ name, variable, tailwindClass }: { name: string; variable: string; tailwindClass?: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className={`h-24 w-24 border-2 border-primary bg-primary/10 flex items-center justify-center text-xs font-mono text-primary ${tailwindClass}`}
      style={!tailwindClass ? { borderRadius: `var(${variable})` } : {}}
    >
      Token
    </div>
    <span className="font-mono text-sm font-medium">{name}</span>
    <span className="font-mono text-xs text-muted-foreground">{variable}</span>
  </div>
);
