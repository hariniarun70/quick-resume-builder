import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Languages, Heart, Trophy, BookOpen, Plus, X } from 'lucide-react';

interface OptionalSectionsFormProps {
  languages: string[];
  hobbies: string[];
  sports: string[];
  courses: string[];
  onLanguagesChange: (data: string[]) => void;
  onHobbiesChange: (data: string[]) => void;
  onSportsChange: (data: string[]) => void;
  onCoursesChange: (data: string[]) => void;
}

export const OptionalSectionsForm = ({
  languages,
  hobbies,
  sports,
  courses,
  onLanguagesChange,
  onHobbiesChange,
  onSportsChange,
  onCoursesChange,
}: OptionalSectionsFormProps) => {
  const [newLanguage, setNewLanguage] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newSport, setNewSport] = useState('');
  const [newCourse, setNewCourse] = useState('');

  const addItem = (
    value: string,
    setValue: (val: string) => void,
    list: string[],
    onChange: (data: string[]) => void
  ) => {
    if (value.trim() && !list.includes(value.trim())) {
      onChange([...list, value.trim()]);
      setValue('');
    }
  };

  const removeItem = (item: string, list: string[], onChange: (data: string[]) => void) => {
    onChange(list.filter((i) => i !== item));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    value: string,
    setValue: (val: string) => void,
    list: string[],
    onChange: (data: string[]) => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(value, setValue, list, onChange);
    }
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    items: string[],
    newValue: string,
    setNewValue: (val: string) => void,
    onChange: (data: string[]) => void,
    placeholder: string
  ) => (
    <Card className="p-4 bg-secondary/20 border-border">
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          {icon}
          {title}
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, newValue, setNewValue, items, onChange)}
          />
          <Button
            onClick={() => addItem(newValue, setNewValue, items, onChange)}
            variant="accent"
            size="icon"
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 cursor-default group animate-scale-in"
              >
                {item}
                <button
                  onClick={() => removeItem(item, items, onChange)}
                  className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Optional Details</h2>
        <p className="text-muted-foreground font-body">Add languages, hobbies, sports, and courses (all optional)</p>
      </div>

      <div className="space-y-4">
        {renderSection(
          'Languages Known',
          <Languages className="h-4 w-4 text-accent" />,
          languages,
          newLanguage,
          setNewLanguage,
          onLanguagesChange,
          'e.g., English, Hindi, Spanish'
        )}

        {renderSection(
          'Hobbies',
          <Heart className="h-4 w-4 text-accent" />,
          hobbies,
          newHobby,
          setNewHobby,
          onHobbiesChange,
          'e.g., Reading, Photography'
        )}

        {renderSection(
          'Sports',
          <Trophy className="h-4 w-4 text-accent" />,
          sports,
          newSport,
          setNewSport,
          onSportsChange,
          'e.g., Cricket, Basketball'
        )}

        {renderSection(
          'Courses',
          <BookOpen className="h-4 w-4 text-accent" />,
          courses,
          newCourse,
          setNewCourse,
          onCoursesChange,
          'e.g., Machine Learning, Web Development'
        )}
      </div>
    </div>
  );
};
