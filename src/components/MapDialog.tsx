import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface MapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  name: string;
}

const MapDialog = ({ open, onOpenChange, address, name }: MapDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('주소가 복사되었습니다');
    setTimeout(() => setCopied(false), 2000);
  };

  const mapQuery = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=16`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin size={20} className="text-primary" />
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-56 bg-muted">
          <iframe
            title="지도"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-xl px-3 py-2.5">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{address}</span>
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '복사됨' : '복사'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
