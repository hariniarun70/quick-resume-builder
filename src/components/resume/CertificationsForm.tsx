import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Award, Plus, Trash2 } from 'lucide-react';
import { Certification } from '@/types/resume';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsForm = ({ data, onChange }: CertificationsFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCert, setNewCert] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    link: '',
  });

  const addCertification = () => {
    if (newCert.name && newCert.issuer) {
      onChange([
        ...data,
        { ...newCert, id: crypto.randomUUID() },
      ]);
      setNewCert({ name: '', issuer: '', date: '', link: '' });
      setIsAdding(false);
    }
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Certifications</h2>
        <p className="text-muted-foreground font-body">Add your professional certifications</p>
      </div>

      {/* Existing Certifications */}
      {data.length > 0 && (
        <div className="space-y-3">
          {data.map((cert) => (
            <Card key={cert.id} className="p-4 bg-secondary/30 border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                  {cert.link && (
                    <p className="text-xs text-accent truncate max-w-[200px]">{cert.link}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
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
                <Label>Certification Name *</Label>
                <Input
                  placeholder="AWS Solutions Architect"
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Issuer *</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  placeholder="Jan 2024"
                  value={newCert.date}
                  onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Link (optional)</Label>
                <Input
                  placeholder="https://credential.url"
                  value={newCert.link}
                  onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addCertification} variant="accent">
                Add Certification
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
          Add Certification
        </Button>
      )}
    </div>
  );
};
