import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  name: string;
  greeting: string;
  message: string;
  onNameChange: (v: string) => void;
  onGreetingChange: (v: string) => void;
  onMessageChange: (v: string) => void;
}

export default function PosterForm({
  name, greeting, message,
  onNameChange, onGreetingChange, onMessageChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="minecraft-text text-mc-small md:text-xs text-accent">
        ✍️ YOUR DETAILS
      </h2>

      <div className="space-y-2">
        <Label className="minecraft-text text-mc-pixel">Your Name (optional)</Label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Ahmed"
          className="bg-card border-border"
        />
      </div>

      <div className="space-y-2">
        <Label className="minecraft-text text-mc-pixel">Greeting Text</Label>
        <Input
          value={greeting}
          onChange={(e) => onGreetingChange(e.target.value)}
          placeholder="Eid Mubarak"
          className="bg-card border-border"
        />
      </div>

      <div className="space-y-2">
        <Label className="minecraft-text text-mc-pixel">Optional Message (max 100 chars)</Label>
        <Input
          value={message}
          onChange={(e) => onMessageChange(e.target.value.slice(0, 100))}
          placeholder="May this Eid bring happiness and peace."
          className="bg-card border-border"
        />
        <p className="text-[10px] text-muted-foreground text-right">{message.length}/100</p>
      </div>
    </div>
  );
}
