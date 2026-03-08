import { posterTemplates, type PosterTemplate } from './templates';
import { cn } from '@/lib/utils';

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

function TemplatePreview({ template }: { template: PosterTemplate }) {
  const accent = template.accentColor;
  const text = template.textColor;

  return (
    <div
      className="w-full aspect-square rounded-md overflow-hidden relative flex flex-col items-center justify-center p-3"
      style={{ background: template.bgGradient }}
    >
      {/* Decorative elements */}
      <svg viewBox="0 0 100 100" className="absolute top-1 right-1 w-6 h-6 opacity-60" fill={accent}>
        <path d="M50 0C55 30 70 45 100 50C70 55 55 70 50 100C45 70 30 55 0 50C30 45 45 30 50 0Z" />
      </svg>
      <svg viewBox="0 0 40 40" className="absolute bottom-2 left-2 w-4 h-4 opacity-40" fill={accent}>
        <circle cx="20" cy="20" r="18" fill="none" stroke={accent} strokeWidth="2" />
        <path d="M20 2A18 18 0 0 1 20 38A14 14 0 0 0 20 2Z" />
      </svg>

      {/* Photo placeholders */}
      {template.layout === 'single-large' && (
        <div className="w-12 h-12 rounded border-2 mb-1" style={{ borderColor: accent, background: `${accent}22` }} />
      )}
      {template.layout === 'two-side' && (
        <div className="flex gap-1 mb-1">
          <div className="w-8 h-8 rounded border-2" style={{ borderColor: accent, background: `${accent}22` }} />
          <div className="w-8 h-8 rounded border-2" style={{ borderColor: accent, background: `${accent}22` }} />
        </div>
      )}
      {template.layout === 'three-collage' && (
        <div className="grid grid-cols-2 gap-1 mb-1">
          <div className="w-7 h-7 rounded border-2 row-span-2" style={{ borderColor: accent, background: `${accent}22` }} />
          <div className="w-7 h-5 rounded border-2" style={{ borderColor: accent, background: `${accent}22` }} />
          <div className="w-7 h-5 rounded border-2" style={{ borderColor: accent, background: `${accent}22` }} />
        </div>
      )}
      {template.layout === 'circle-profile' && (
        <div className="w-12 h-12 rounded-full border-2 mb-1" style={{ borderColor: accent, background: `${accent}22` }} />
      )}
      {template.layout === 'full-bg' && (
        <div className="w-16 h-10 rounded border-2 mb-1 opacity-50" style={{ borderColor: accent, background: `${accent}22` }} />
      )}
      {template.layout === 'minimal-center' && (
        <div className="w-10 h-10 rounded border-2 mb-1" style={{ borderColor: accent, background: `${accent}22` }} />
      )}

      <p className="text-[8px] font-bold tracking-wider" style={{ color: text }}>
        EID MUBARAK
      </p>
    </div>
  );
}

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="minecraft-text text-mc-small md:text-xs text-accent mb-3">
        🌙 CHOOSE A TEMPLATE
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible">
        {posterTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              'shrink-0 w-36 md:w-full rounded-lg border-2 p-1.5 transition-all hover:scale-105',
              selected === t.id
                ? 'border-accent shadow-lg shadow-accent/20 scale-105'
                : 'border-border/50 hover:border-accent/50'
            )}
          >
            <TemplatePreview template={t} />
            <p className="minecraft-text text-mc-pixel mt-1.5 text-foreground truncate">
              {t.name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
