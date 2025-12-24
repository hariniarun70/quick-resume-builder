import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Code, Users, Plus, X } from 'lucide-react';
import { Skills } from '@/types/resume';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newTechnical, setNewTechnical] = useState('');
  const [newSoft, setNewSoft] = useState('');

  const addSkill = (type: 'technical' | 'soft', value: string, setValue: (val: string) => void) => {
    if (value.trim() && !data[type].includes(value.trim())) {
      onChange({
        ...data,
        [type]: [...data[type], value.trim()],
      });
      setValue('');
    }
  };

  const removeSkill = (type: 'technical' | 'soft', skill: string) => {
    onChange({
      ...data,
      [type]: data[type].filter((s) => s !== skill),
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    type: 'technical' | 'soft',
    value: string,
    setValue: (val: string) => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type, value, setValue);
    }
  };

  const suggestedTechnical = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'SQL', 'Git', 'AWS', 'Docker', 'Java', 'C++', 'MongoDB',
  ].filter(skill => !data.technical.includes(skill));

  const suggestedSoft = [
    'Communication', 'Problem Solving', 'Leadership', 'Teamwork',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity',
  ].filter(skill => !data.soft.includes(skill));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Skills</h2>
        <p className="text-muted-foreground font-body">Add your technical and soft skills separately</p>
      </div>

      {/* Technical Skills */}
      <Card className="p-4 bg-secondary/20 border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newTechnical" className="flex items-center gap-2 text-foreground font-medium">
              <Code className="h-4 w-4 text-accent" />
              Technical Skills
            </Label>
            <div className="flex gap-2">
              <Input
                id="newTechnical"
                placeholder="e.g., JavaScript, Python, AWS"
                value={newTechnical}
                onChange={(e) => setNewTechnical(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'technical', newTechnical, setNewTechnical)}
              />
              <Button
                onClick={() => addSkill('technical', newTechnical, setNewTechnical)}
                variant="accent"
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {data.technical.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.technical.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 cursor-default group animate-scale-in"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill('technical', skill)}
                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {suggestedTechnical.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <Label className="text-muted-foreground text-xs">Quick Add</Label>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTechnical.slice(0, 6).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-2 py-1 text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                    onClick={() => addSkill('technical', skill, setNewTechnical)}
                  >
                    <Plus className="h-2.5 w-2.5 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Soft Skills */}
      <Card className="p-4 bg-secondary/20 border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newSoft" className="flex items-center gap-2 text-foreground font-medium">
              <Users className="h-4 w-4 text-accent" />
              Soft Skills
            </Label>
            <div className="flex gap-2">
              <Input
                id="newSoft"
                placeholder="e.g., Communication, Leadership"
                value={newSoft}
                onChange={(e) => setNewSoft(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'soft', newSoft, setNewSoft)}
              />
              <Button
                onClick={() => addSkill('soft', newSoft, setNewSoft)}
                variant="accent"
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {data.soft.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.soft.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-accent/10 text-accent border-0 hover:bg-accent/20 cursor-default group animate-scale-in"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill('soft', skill)}
                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {suggestedSoft.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <Label className="text-muted-foreground text-xs">Quick Add</Label>
              <div className="flex flex-wrap gap-1.5">
                {suggestedSoft.slice(0, 6).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-2 py-1 text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                    onClick={() => addSkill('soft', skill, setNewSoft)}
                  >
                    <Plus className="h-2.5 w-2.5 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
