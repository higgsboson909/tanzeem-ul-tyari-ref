import { useState, useRef, useCallback } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, Loader2 } from 'lucide-react';
import TemplateSelector from '@/components/eid-poster/TemplateSelector';
import PhotoUploader from '@/components/eid-poster/PhotoUploader';
import PosterForm from '@/components/eid-poster/PosterForm';
import PosterCanvasRenderer from '@/components/eid-poster/PosterCanvasRenderer';
import { posterTemplates } from '@/components/eid-poster/templates';

export default function EidPosterPage() {
  const [templateId, setTemplateId] = useState(posterTemplates[0].id);
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Eid Mubarak');
  const [message, setMessage] = useState('');
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const template = posterTemplates.find((t) => t.id === templateId) || posterTemplates[0];

  const addPhoto = useCallback(
    (dataUrl: string) => {
      if (photos.length < template.photoCount) {
        setPhotos((p) => [...p, dataUrl]);
      }
    },
    [photos.length, template.photoCount]
  );

  const removePhoto = useCallback((idx: number) => {
    setPhotos((p) => p.filter((_, i) => i !== idx));
  }, []);

  const handleGenerate = () => {
    setGenerated(true);
    setGenerating(true);
    // small delay to let the hidden renderer mount
    setTimeout(() => setGenerating(false), 600);
  };

  const download = async (format: 'png' | 'jpg') => {
    if (!posterRef.current) return;
    const fn = format === 'png' ? toPng : toJpeg;
    const dataUrl = await fn(posterRef.current, {
      width: 1080,
      height: 1080,
      pixelRatio: 1,
      quality: 0.95,
    });
    const link = document.createElement('a');
    link.download = `eid-poster-tanzeem-ul-tyari.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="minecraft-text text-mc-small md:text-mc-medium gradient-text mb-2">
          🌙 CREATE YOUR EID POSTER
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Upload your photos and generate a beautiful Eid greeting poster in seconds.
        </p>
      </div>

      {/* Section 1 — Templates */}
      <section className="mb-10">
        <TemplateSelector selected={templateId} onSelect={(id) => { setTemplateId(id); setGenerated(false); }} />
      </section>

      {/* Section 2 — Inputs */}
      <section className="grid md:grid-cols-2 gap-8 mb-10">
        <PhotoUploader
          photos={photos}
          maxPhotos={template.photoCount}
          onAdd={addPhoto}
          onRemove={removePhoto}
        />
        <PosterForm
          name={name}
          greeting={greeting}
          message={message}
          onNameChange={setName}
          onGreetingChange={setGreeting}
          onMessageChange={setMessage}
        />
      </section>

      {/* Generate button */}
      <div className="text-center mb-10">
        <Button
          onClick={handleGenerate}
          size="lg"
          className="minecraft-text text-mc-pixel gap-2 px-8"
          disabled={generating}
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          GENERATE POSTER
        </Button>
      </div>

      {/* Section 3 — Preview & Download */}
      {generated && (
        <section className="flex flex-col items-center gap-6">
          {/* Scaled preview */}
          <div className="w-full max-w-[540px] aspect-square overflow-hidden rounded-xl border-2 border-accent/30 shadow-xl">
            <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 1080, height: 1080 }}>
              <PosterCanvasRenderer
                ref={posterRef}
                template={template}
                photos={photos}
                name={name}
                greeting={greeting}
                message={message}
              />
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-4">
            <Button onClick={() => download('png')} variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download PNG
            </Button>
            <Button onClick={() => download('jpg')} variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download JPG
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
