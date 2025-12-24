import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Trash2 } from 'lucide-react';
import { Activity } from '@/types/resume';

interface ActivitiesFormProps {
  data: Activity[];
  onChange: (data: Activity[]) => void;
}

const activityTypes = [
  { value: 'paper', label: 'Paper Presentation' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'club', label: 'Club Membership' },
  { value: 'extracurricular', label: 'Extra-curricular' },
  { value: 'cocurricular', label: 'Co-curricular' },
] as const;

export const ActivitiesForm = ({ data, onChange }: ActivitiesFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    type: 'extracurricular',
    title: '',
    description: '',
    date: '',
  });

  const addActivity = () => {
    if (newActivity.title) {
      onChange([
        ...data,
        { ...newActivity, id: crypto.randomUUID() },
      ]);
      setNewActivity({ type: 'extracurricular', title: '', description: '', date: '' });
      setIsAdding(false);
    }
  };

  const removeActivity = (id: string) => {
    onChange(data.filter((a) => a.id !== id));
  };

  const getTypeLabel = (type: Activity['type']) => {
    return activityTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Activities & Participation</h2>
        <p className="text-muted-foreground font-body">Add your participations, clubs, and activities</p>
      </div>

      {/* Existing Activities */}
      {data.length > 0 && (
        <div className="space-y-3">
          {data.map((activity) => (
            <Card key={activity.id} className="p-4 bg-secondary/30 border-border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {getTypeLabel(activity.type)}
                    </Badge>
                    {activity.date && (
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">{activity.title}</h3>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeActivity(activity.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Form */}
      {isAdding ? (
        <Card className="p-4 border-accent/50 bg-accent/5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Activity Type *</Label>
                <Select
                  value={newActivity.type}
                  onValueChange={(value: Activity['type']) => setNewActivity({ ...newActivity, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date (optional)</Label>
                <Input
                  placeholder="Jan 2024"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="e.g., IEEE Robotics Club, National Hackathon Winner"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="Brief description of your involvement..."
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addActivity} variant="accent">
                Add Activity
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Activity
        </Button>
      )}
    </div>
  );
};
