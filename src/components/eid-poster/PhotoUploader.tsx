import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';

interface Props {
  photos: string[];
  maxPhotos: number;
  onAdd: (dataUrl: string) => void;
  onRemove: (index: number) => void;
}

export default function PhotoUploader({ photos, maxPhotos, onAdd, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onAdd(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div>
      <label className="minecraft-text text-mc-pixel text-foreground mb-2 block">
        📸 YOUR PHOTO{maxPhotos > 1 ? 'S' : ''} ({photos.length}/{maxPhotos})
      </label>
      <div className="flex gap-3 flex-wrap">
        {photos.map((src, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-accent/50">
            <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {photos.length < maxPhotos && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-accent/40 flex flex-col items-center justify-center gap-1 hover:border-accent transition-colors text-muted-foreground hover:text-accent"
          >
            <ImagePlus className="w-5 h-5" />
            <span className="text-[9px]">Add</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
