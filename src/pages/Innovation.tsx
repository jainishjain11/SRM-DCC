import { ComingSoonBlock } from '@/components/ui/ComingSoonBlock';
import { Lightbulb, Award, FlaskConical, Rocket, Building } from 'lucide-react';

const innovationTiers = [
  {
    tier: 1,
    name: 'Foundation',
    description: 'Basic understanding and application of existing solutions',
    icon: Building,
  },
  {
    tier: 2,
    name: 'Application',
    description: 'Creative application of knowledge to solve real problems',
    icon: FlaskConical,
  },
  {
    tier: 3,
    name: 'Industry Collaboration',
    description: 'Working with industry partners on innovative projects',
    icon: Building,
  },
  {
    tier: 4,
    name: 'Research & Development',
    description: 'Contributing to original research and patent development',
    icon: Award,
  },
  {
    tier: 5,
    name: 'Breakthrough Innovation',
    description: 'Creating novel solutions with significant industry impact',
    icon: Rocket,
  },
];

export default function Innovation() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1>Innovation</h1>
        <p className="text-muted-foreground mt-1">
          Innovation framework and research roadmap
        </p>
      </div>

      {/* Coming soon notice */}
      <div className="enterprise-card p-6 bg-warning/5 border-warning/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-warning/10">
            <Lightbulb className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Innovation Module — Coming Soon</h2>
            <p className="text-muted-foreground mt-1">
              This module presents the five-tier innovation framework. Full functionality activates with innovation tracking data.
            </p>
          </div>
        </div>
      </div>

      {/* Five-tier framework */}
      <section>
        <h2 className="text-base font-medium mb-4">Five-Tier Innovation Framework</h2>
        <div className="space-y-3">
          {innovationTiers.map((tier) => (
            <div key={tier.tier} className="enterprise-card p-4 flex items-start gap-4">
              <div className="flex items-center gap-3 min-w-[120px]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">T{tier.tier}</span>
                </div>
                <tier.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
              {tier.tier >= 3 && (
                <span className="ml-auto text-xs px-2 py-1 bg-primary/10 text-primary rounded-full shrink-0">
                  Industry Involved
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Planned features */}
      <section>
        <h2 className="text-base font-medium mb-4">Planned Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComingSoonBlock
            title="Innovation Tracking"
            description="Track student progress through the innovation tiers with measurable milestones."
            requiredData="Innovation activity logs & tier progression data"
          />
          <ComingSoonBlock
            title="IP & Research Roadmap"
            description="Document and showcase intellectual property and research contributions."
            requiredData="Patent filings, research publications & project data"
          />
          <ComingSoonBlock
            title="Industry Partnership Impact"
            description="Measure the outcomes of industry collaborations at Tier 3 and above."
            requiredData="Partnership agreements & project outcome metrics"
          />
          <ComingSoonBlock
            title="Innovation Leaderboard"
            description="Recognize top innovators and breakthrough projects."
            requiredData="Innovation scoring system & recognition criteria"
          />
        </div>
      </section>

      {/* Note about future */}
      <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-md">
        <p>
          <strong>Note:</strong> The Innovation module is designed to integrate with industry partners 
          starting from Tier 3. This creates pathways for students to contribute to real-world 
          innovation projects while building their professional portfolios.
        </p>
      </div>
    </div>
  );
}