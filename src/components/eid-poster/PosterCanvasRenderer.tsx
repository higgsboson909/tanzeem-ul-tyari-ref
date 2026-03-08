import { forwardRef } from 'react';
import type { PosterTemplate } from './templates';

interface Props {
  template: PosterTemplate;
  photos: string[];
  name: string;
  greeting: string;
  message: string;
}

/**
 * A 1080×1080 poster rendered as HTML — captured via html-to-image.
 * We render at 1080px in a scaled-down container for preview.
 */
const PosterCanvasRenderer = forwardRef<HTMLDivElement, Props>(
  ({ template, photos, name, greeting, message }, ref) => {
    const accent = template.accentColor;
    const textCol = template.textColor;
    const placeholder = (w: number, h: number, round = false) => (
      <div
        style={{
          width: w,
          height: h,
          borderRadius: round ? '50%' : 12,
          border: `4px dashed ${accent}66`,
          background: `${accent}11`,
        }}
      />
    );

    const renderPhoto = (idx: number, w: number, h: number, round = false) => {
      const src = photos[idx];
      if (!src) return placeholder(w, h, round);
      return (
        <img
          src={src}
          alt=""
          style={{
            width: w,
            height: h,
            objectFit: 'cover',
            borderRadius: round ? '50%' : 12,
            border: `4px solid ${accent}`,
          }}
        />
      );
    };

    const greetingFrom = name ? `from ${name}` : '';

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          background: template.bgGradient,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Segoe UI', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Decorative bg elements */}
        <svg
          viewBox="0 0 200 200"
          style={{ position: 'absolute', top: 30, right: 30, width: 120, height: 120, opacity: 0.15 }}
          fill={accent}
        >
          <path d="M100 0C110 60 140 90 200 100C140 110 110 140 100 200C90 140 60 110 0 100C60 90 90 60 100 0Z" />
        </svg>
        <svg
          viewBox="0 0 200 200"
          style={{ position: 'absolute', bottom: 80, left: 30, width: 80, height: 80, opacity: 0.12 }}
          fill={accent}
        >
          <path d="M100 0C110 60 140 90 200 100C140 110 110 140 100 200C90 140 60 110 0 100C60 90 90 60 100 0Z" />
        </svg>
        {/* Crescent moon */}
        <svg
          viewBox="0 0 100 100"
          style={{ position: 'absolute', top: 40, left: 50, width: 90, height: 90, opacity: 0.2 }}
          fill={accent}
        >
          <circle cx="50" cy="50" r="45" />
          <circle cx="65" cy="40" r="38" fill={template.bgGradient.includes('#f8f4e8') ? '#f8f4e8' : '#0d3b2e'} />
        </svg>
        {/* Lantern top */}
        <svg
          viewBox="0 0 60 100"
          style={{ position: 'absolute', top: 0, right: 180, width: 40, height: 70, opacity: 0.18 }}
          fill={accent}
        >
          <rect x="25" y="0" width="10" height="15" rx="2" />
          <ellipse cx="30" cy="55" rx="25" ry="40" />
          <ellipse cx="30" cy="55" rx="15" ry="30" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
        </svg>

        {/* Content by layout */}
        {template.layout === 'single-large' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <p style={{ color: accent, fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', fontWeight: 600 }}>
              ✦ {greeting} ✦
            </p>
            {renderPhoto(0, 500, 500)}
            {greetingFrom && (
              <p style={{ color: textCol, fontSize: 36, fontWeight: 700 }}>{greeting} {greetingFrom}</p>
            )}
            {message && <p style={{ color: `${textCol}cc`, fontSize: 24, maxWidth: 700, textAlign: 'center' }}>{message}</p>}
          </div>
        )}

        {template.layout === 'two-side' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <p style={{ color: accent, fontSize: 52, fontWeight: 800, letterSpacing: 4 }}>{greeting}</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {renderPhoto(0, 360, 400)}
              {renderPhoto(1, 360, 400)}
            </div>
            {greetingFrom && <p style={{ color: textCol, fontSize: 32 }}>{greetingFrom}</p>}
            {message && <p style={{ color: `${textCol}cc`, fontSize: 22, maxWidth: 700, textAlign: 'center' }}>{message}</p>}
          </div>
        )}

        {template.layout === 'three-collage' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <p style={{ color: accent, fontSize: 48, fontWeight: 800, letterSpacing: 3 }}>{greeting}</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {renderPhoto(0, 340, 420)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {renderPhoto(1, 280, 200)}
                {renderPhoto(2, 280, 200)}
              </div>
            </div>
            {greetingFrom && <p style={{ color: textCol, fontSize: 30 }}>{greetingFrom}</p>}
            {message && <p style={{ color: `${textCol}cc`, fontSize: 20, maxWidth: 700, textAlign: 'center' }}>{message}</p>}
          </div>
        )}

        {template.layout === 'circle-profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            {/* Outer decorative ring */}
            <div
              style={{
                width: 440,
                height: 440,
                borderRadius: '50%',
                border: `6px solid ${accent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 60px ${accent}33`,
              }}
            >
              {renderPhoto(0, 400, 400, true)}
            </div>
            <p style={{ color: accent, fontSize: 52, fontWeight: 800, letterSpacing: 4 }}>{greeting}</p>
            {greetingFrom && <p style={{ color: textCol, fontSize: 30 }}>{greetingFrom}</p>}
            {message && <p style={{ color: `${textCol}cc`, fontSize: 22, maxWidth: 700, textAlign: 'center' }}>{message}</p>}
          </div>
        )}

        {template.layout === 'full-bg' && (
          <>
            {photos[0] && (
              <img
                src={photos[0]}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: 1080,
                  height: 1080,
                  objectFit: 'cover',
                  opacity: 0.35,
                }}
              />
            )}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                background: 'rgba(0,0,0,0.4)',
                padding: '60px 80px',
                borderRadius: 20,
                border: `2px solid ${accent}44`,
              }}
            >
              <p style={{ color: accent, fontSize: 60, fontWeight: 900, letterSpacing: 6 }}>{greeting}</p>
              {greetingFrom && <p style={{ color: textCol, fontSize: 36 }}>{greetingFrom}</p>}
              {message && <p style={{ color: `${textCol}dd`, fontSize: 26, maxWidth: 600, textAlign: 'center' }}>{message}</p>}
            </div>
          </>
        )}

        {template.layout === 'minimal-center' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <p style={{ color: accent, fontSize: 18, letterSpacing: 8, textTransform: 'uppercase' }}>✦ EID UL FITR ✦</p>
            {renderPhoto(0, 400, 400)}
            <p style={{ color: accent, fontSize: 48, fontWeight: 800 }}>{greeting}</p>
            {greetingFrom && <p style={{ color: textCol, fontSize: 28 }}>{greetingFrom}</p>}
            {message && <p style={{ color: `${textCol}cc`, fontSize: 22, maxWidth: 600, textAlign: 'center' }}>{message}</p>}
          </div>
        )}

        {/* Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: 0.7,
          }}
        >
          <img src="/logo.png" alt="" style={{ width: 28, height: 28, borderRadius: 4 }} />
          <span style={{ color: textCol, fontSize: 14, letterSpacing: 2, fontWeight: 600 }}>
            TANZEEM-UL-TYARI
          </span>
        </div>
      </div>
    );
  }
);

PosterCanvasRenderer.displayName = 'PosterCanvasRenderer';
export default PosterCanvasRenderer;
