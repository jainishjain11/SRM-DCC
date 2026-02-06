import { ComingSoonBlock } from '@/components/ui/ComingSoonBlock';
import { Sparkles, Target, GitMerge, Layers } from 'lucide-react';

export default function Skills() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1>Skills</h1>
        <p className="text-muted-foreground mt-1">
          Skill mapping and role requirement analysis
        </p>
      </div>

      {/* Coming soon notice */}
      <div className="enterprise-card p-6 bg-warning/5 border-warning/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-warning/10">
            <Sparkles className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Skills Module — Coming Soon</h2>
            <p className="text-muted-foreground mt-1">
              This module will activate when skill and role tables are integrated into the database.
            </p>
          </div>
        </div>
      </div>

      {/* Planned features */}
      <section>
        <h2 className="text-base font-medium mb-4">Planned Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComingSoonBlock
            title="Company → Skill Mapping"
            description="Understand which skills each company prioritizes based on their technology stack and job requirements."
            requiredData="Skills database with company associations"
            className="h-full"
          />
          <ComingSoonBlock
            title="Skill Depth Analysis"
            description="Differentiate between foundational knowledge and deep expertise requirements."
            requiredData="Skill proficiency levels & assessment criteria"
            className="h-full"
          />
          <ComingSoonBlock
            title="Role Expectations"
            description="See exactly what skills are expected for specific roles at different companies."
            requiredData="Role definitions & skill requirement matrices"
            className="h-full"
          />
          <ComingSoonBlock
            title="Skill Overlap Analysis"
            description="Identify transferable skills across different companies and roles."
            requiredData="Cross-company skill comparison data"
            className="h-full"
          />
        </div>
      </section>

      {/* Roadmap preview */}
      <section className="enterprise-card p-6">
        <h2 className="font-medium mb-6">Skills Module Roadmap</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-muted">
              <Layers className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Phase 1: Skill Taxonomy</h3>
              <p className="text-sm text-muted-foreground">
                Establish a standardized skill classification system aligned with industry standards.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-muted">
              <GitMerge className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Phase 2: Company Mapping</h3>
              <p className="text-sm text-muted-foreground">
                Link skills to companies based on job postings and technology stacks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-muted">
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Phase 3: Gap Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Enable students to compare their skills against company requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
