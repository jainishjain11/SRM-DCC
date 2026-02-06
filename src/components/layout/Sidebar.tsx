import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Sparkles, 
  BarChart3, 
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard, 
    enabled: true 
  },
  { 
    name: 'Companies', 
    href: '/companies', 
    icon: Building2, 
    enabled: true 
  },
  { 
    name: 'Skills', 
    href: '/skills', 
    icon: Sparkles, 
    enabled: false,
    comingSoonReason: 'Requires skill & role tables integration'
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3, 
    enabled: true 
  },
  { 
    name: 'Innovation', 
    href: '/innovation', 
    icon: Lightbulb, 
    enabled: false,
    comingSoonReason: 'Requires innovation framework data'
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DCC</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">SRM DCC</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">D</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            const linkContent = (
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive && item.enabled
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : item.enabled
                    ? "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    : "text-muted-foreground cursor-not-allowed opacity-60"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {!item.enabled && <Lock className="h-3.5 w-3.5" />}
                  </>
                )}
              </div>
            );

            if (!item.enabled) {
              return (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>{linkContent}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p className="font-medium">Coming Soon</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.comingSoonReason}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            }

            return (
              <li key={item.name}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink to={item.href}>{linkContent}</NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavLink to={item.href}>{linkContent}</NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
