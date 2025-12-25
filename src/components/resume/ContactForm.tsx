import { useRef } from 'react';
import { ContactInfo } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, X, Github } from 'lucide-react';

interface ContactFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export const ContactForm = ({ data, onChange }: ContactFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ ...data, profileImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground font-body">Let's start with your basic contact details</p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center overflow-hidden">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          {data.profileImage && (
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md hover:bg-destructive/90 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Camera className="h-4 w-4 text-accent" />
            Profile Photo (optional)
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="text-sm"
          >
            {data.profileImage ? 'Change Photo' : 'Upload Photo'}
          </Button>
          <p className="text-xs text-muted-foreground">
            Recommended: Square image, at least 200x200px
          </p>
        </div>
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
            <Label htmlFor="github" className="flex items-center gap-2 text-foreground font-medium">
              <Github className="h-4 w-4 text-accent" />
              GitHub (optional)
            </Label>
            <Input
              id="github"
              placeholder="github.com/johndoe"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </div>
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
  );
};
