import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(
      data.map((exp) => {
        if (exp.id === id) {
          const updated = { ...exp, [field]: value };
          if (field === 'current' && value === true) {
            updated.endDate = 'Present';
          }
          return updated;
        }
        return exp;
      })
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Experience</h2>
        <p className="text-muted-foreground font-body">Add your work experience</p>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div
            key={exp.id}
            className="p-5 rounded-xl bg-card border border-border shadow-card animate-scale-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">Experience {index + 1}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    placeholder="Tech Corp Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    placeholder="Software Engineer"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    placeholder="Jan 2022"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${exp.id}`}
                    placeholder="Dec 2023"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    updateExperience(exp.id, 'current', checked === true)
                  }
                />
                <Label
                  htmlFor={`current-${exp.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  placeholder="• Describe your responsibilities and achievements&#10;• Use bullet points for clarity&#10;• Quantify results when possible"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addExperience}
          className="w-full border-dashed border-2 h-14 hover:border-accent hover:text-accent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};
