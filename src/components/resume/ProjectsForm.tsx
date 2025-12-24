import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FolderCode, Plus, Trash2, Link } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Projects</h2>
        <p className="text-muted-foreground font-body">Showcase your best work</p>
      </div>

      <div className="space-y-6">
        {data.map((proj, index) => (
          <div
            key={proj.id}
            className="p-5 rounded-xl bg-card border border-border shadow-card animate-scale-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderCode className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">Project {index + 1}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(proj.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${proj.id}`}>Project Name</Label>
                  <Input
                    id={`name-${proj.id}`}
                    placeholder="E-commerce Platform"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-${proj.id}`} className="flex items-center gap-1">
                    <Link className="h-3 w-3" />
                    Link (optional)
                  </Label>
                  <Input
                    id={`link-${proj.id}`}
                    placeholder="github.com/username/project"
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`technologies-${proj.id}`}>Technologies Used</Label>
                <Input
                  id={`technologies-${proj.id}`}
                  placeholder="React, Node.js, PostgreSQL"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${proj.id}`}>Description</Label>
                <Textarea
                  id={`description-${proj.id}`}
                  placeholder="Describe what the project does and your role in it..."
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addProject}
          className="w-full border-dashed border-2 h-14 hover:border-accent hover:text-accent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
};
