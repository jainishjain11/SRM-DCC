import { Lock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComingSoonBlockProps {
  title: string;
  description: string;
  requiredData?: string;
  className?: string;
}

export function ComingSoonBlock({ 
  title, 
  description, 
  requiredData,
  className 
}: ComingSoonBlockProps) {
  return (
    <div className={cn(
      "relative border border-border rounded-md p-6 bg-muted/30",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-warning/10">
          <Lock className="h-5 w-5 text-warning" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground">{title}</h3>
            <span className="status-badge coming-soon">Coming Soon</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {requiredData && (
            <div className="flex items-start gap-2 mt-3 p-3 rounded-md bg-background border border-border">
              <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Required:</span> {requiredData}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
