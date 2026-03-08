export interface PosterTemplate {
  id: string;
  name: string;
  description: string;
  photoCount: number;
  layout: 'single-large' | 'two-side' | 'three-collage' | 'circle-profile' | 'full-bg' | 'minimal-center';
  bgGradient: string;
  accentColor: string;
  textColor: string;
}

export const posterTemplates: PosterTemplate[] = [
  {
    id: 'elegant-green',
    name: 'Elegant Green',
    description: 'Single large photo with greeting above',
    photoCount: 1,
    layout: 'single-large',
    bgGradient: 'linear-gradient(135deg, #0d3b2e 0%, #1a5c3a 50%, #0d3b2e 100%)',
    accentColor: '#d4af37',
    textColor: '#ffffff',
  },
  {
    id: 'royal-duo',
    name: 'Royal Duo',
    description: 'Two side-by-side photos with greeting',
    photoCount: 2,
    layout: 'two-side',
    bgGradient: 'linear-gradient(135deg, #1a1a4e 0%, #2d2d7a 50%, #1a1a4e 100%)',
    accentColor: '#d4af37',
    textColor: '#ffffff',
  },
  {
    id: 'golden-collage',
    name: 'Golden Collage',
    description: 'Three-photo collage layout',
    photoCount: 3,
    layout: 'three-collage',
    bgGradient: 'linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #1a3a1a 100%)',
    accentColor: '#ffd700',
    textColor: '#ffffff',
  },
  {
    id: 'crescent-frame',
    name: 'Crescent Frame',
    description: 'Circular profile with decorative border',
    photoCount: 1,
    layout: 'circle-profile',
    bgGradient: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 50%, #0a1628 100%)',
    accentColor: '#d4af37',
    textColor: '#ffffff',
  },
  {
    id: 'full-festive',
    name: 'Full Festive',
    description: 'Full background with text overlay',
    photoCount: 1,
    layout: 'full-bg',
    bgGradient: 'linear-gradient(135deg, #0d3b2e 0%, #1a5c3a 100%)',
    accentColor: '#ffd700',
    textColor: '#ffffff',
  },
  {
    id: 'minimal-white',
    name: 'Minimal Eid',
    description: 'Minimal design with centered photo',
    photoCount: 1,
    layout: 'minimal-center',
    bgGradient: 'linear-gradient(135deg, #f8f4e8 0%, #fff8e7 50%, #f8f4e8 100%)',
    accentColor: '#0d3b2e',
    textColor: '#1a3a1a',
  },
];
