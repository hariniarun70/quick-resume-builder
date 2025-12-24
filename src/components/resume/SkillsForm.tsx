import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'SQL', 'Git', 'AWS', 'Docker', 'Agile', 'Communication',
    'Problem Solving', 'Leadership', 'Project Management'
  ].filter(skill => !data.includes(skill));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Skills</h2>
        <p className="text-muted-foreground font-body">Add your technical and soft skills</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newSkill" className="flex items-center gap-2 text-foreground font-medium">
            <Sparkles className="h-4 w-4 text-accent" />
            Add a Skill
          </Label>
          <div className="flex gap-2">
            <Input
              id="newSkill"
              placeholder="e.g., JavaScript, Project Management"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={addSkill} variant="accent" className="shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.length > 0 && (
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 cursor-default group animate-scale-in"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {suggestedSkills.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <Label className="text-muted-foreground text-sm">Quick Add Suggestions</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.slice(0, 8).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                  onClick={() => onChange([...data, skill])}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
