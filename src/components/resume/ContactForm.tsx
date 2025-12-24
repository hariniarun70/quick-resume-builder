import { ContactInfo } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ContactFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export const ContactForm = ({ data, onChange }: ContactFormProps) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground font-body">Let's start with your basic contact details</p>
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-foreground font-medium">
            <User className="h-4 w-4 text-accent" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-foreground font-medium">
              <Mail className="h-4 w-4 text-accent" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-foreground font-medium">
              <Phone className="h-4 w-4 text-accent" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="h-4 w-4 text-accent" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2 text-foreground font-medium">
              <Linkedin className="h-4 w-4 text-accent" />
              LinkedIn (optional)
            </Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2 text-foreground font-medium">
              <Globe className="h-4 w-4 text-accent" />
              Website (optional)
            </Label>
            <Input
              id="website"
              placeholder="johndoe.com"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
