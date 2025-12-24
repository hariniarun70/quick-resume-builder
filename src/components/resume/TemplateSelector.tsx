import { cn } from '@/lib/utils';
import { Check, Layout, Layers } from 'lucide-react';

interface TemplateSelectorProps {
  selected: 'classic' | 'modern';
  onChange: (template: 'classic' | 'modern') => void;
}

export const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Choose Your Template</h2>
        <p className="text-muted-foreground font-body">Select a design that fits your style</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Classic Template */}
        <button
          onClick={() => onChange('classic')}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group",
            selected === 'classic'
              ? "border-accent bg-accent/5 shadow-elegant"
              : "border-border hover:border-muted-foreground/50 hover:shadow-card"
          )}
        >
          {selected === 'classic' && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-accent flex items-center justify-center shadow-card">
              <Check className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
          )}

          {/* Template Preview */}
          <div className="aspect-[8.5/11] rounded-lg bg-card border border-border overflow-hidden mb-4">
            <div className="h-full p-4 flex flex-col">
              {/* Header */}
              <div className="text-center pb-3 border-b border-border">
                <div className="h-4 w-24 bg-primary/80 rounded mx-auto mb-2" />
                <div className="h-2 w-32 bg-muted-foreground/30 rounded mx-auto" />
              </div>
              {/* Content */}
              <div className="flex-1 pt-3 space-y-3">
                <div className="space-y-1">
                  <div className="h-2.5 w-16 bg-primary/60 rounded" />
                  <div className="h-1.5 w-full bg-muted rounded" />
                  <div className="h-1.5 w-4/5 bg-muted rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-2.5 w-20 bg-primary/60 rounded" />
                  <div className="h-1.5 w-full bg-muted rounded" />
                  <div className="h-1.5 w-3/4 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">Classic</h3>
              <p className="text-sm text-muted-foreground">Traditional & Professional</p>
            </div>
          </div>
        </button>

        {/* Modern Template */}
        <button
          onClick={() => onChange('modern')}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group",
            selected === 'modern'
              ? "border-accent bg-accent/5 shadow-elegant"
              : "border-border hover:border-muted-foreground/50 hover:shadow-card"
          )}
        >
          {selected === 'modern' && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-accent flex items-center justify-center shadow-card">
              <Check className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
          )}

          {/* Template Preview */}
          <div className="aspect-[8.5/11] rounded-lg bg-card border border-border overflow-hidden mb-4">
            <div className="h-full flex">
              {/* Sidebar */}
              <div className="w-1/3 bg-primary/90 p-3 space-y-3">
                <div className="h-8 w-8 rounded-full bg-primary-foreground/20 mx-auto" />
                <div className="h-2 w-12 bg-primary-foreground/40 rounded mx-auto" />
                <div className="space-y-1 pt-2">
                  <div className="h-1.5 w-full bg-primary-foreground/20 rounded" />
                  <div className="h-1.5 w-3/4 bg-primary-foreground/20 rounded" />
                </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 p-3 space-y-3">
                <div className="space-y-1">
                  <div className="h-2.5 w-16 bg-accent rounded" />
                  <div className="h-1.5 w-full bg-muted rounded" />
                  <div className="h-1.5 w-4/5 bg-muted rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-2.5 w-14 bg-accent rounded" />
                  <div className="h-1.5 w-full bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">Modern</h3>
              <p className="text-sm text-muted-foreground">Contemporary & Bold</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
