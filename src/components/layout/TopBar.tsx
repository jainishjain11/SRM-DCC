import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-card px-6 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search companies, technologies..."
          className="pl-10 bg-secondary border-0 focus-visible:ring-1"
        />
      </div>

      {/* Right side - placeholder for future features */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          Digital Career Compass
        </span>
      </div>
    </header>
  );
}
