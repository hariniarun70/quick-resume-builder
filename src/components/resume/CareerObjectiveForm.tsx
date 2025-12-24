import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Target } from 'lucide-react';
import { CareerObjective } from '@/types/resume';

interface CareerObjectiveFormProps {
  data: CareerObjective;
  onChange: (data: CareerObjective) => void;
}

export const CareerObjectiveForm = ({ data, onChange }: CareerObjectiveFormProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Career Objective</h2>
        <p className="text-muted-foreground font-body">Write a compelling summary of your career goals</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective" className="flex items-center gap-2 text-foreground font-medium">
          <Target className="h-4 w-4 text-accent" />
          Your Objective
        </Label>
        <Textarea
          id="objective"
          placeholder="A motivated professional seeking to leverage my skills in [field] to contribute to [company/industry]. With [X years] of experience in [area], I aim to..."
          value={data.objective}
          onChange={(e) => onChange({ objective: e.target.value })}
          className="min-h-[150px]"
        />
        <p className="text-xs text-muted-foreground">
          Tip: Keep it concise (2-4 sentences) and highlight your key strengths and goals.
        </p>
      </div>
    </div>
  );
};
