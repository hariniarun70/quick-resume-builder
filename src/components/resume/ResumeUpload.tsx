import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ResumeData } from '@/types/resume';

interface ResumeUploadProps {
  onDataExtracted: (data: Partial<ResumeData>) => void;
}

export const ResumeUpload = ({ onDataExtracted }: ResumeUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['text/plain', 'text/html', 'application/pdf'];
    const allowedExtensions = ['.txt', '.html', '.htm', '.pdf', '.doc', '.docx'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      toast.error('Please upload a .txt, .html, or .pdf resume file');
      return;
    }

    setIsLoading(true);
    toast.loading('Extracting details from your resume...', { id: 'resume-upload' });

    try {
      let resumeText = '';

      if (file.type === 'text/plain' || fileExt === '.txt') {
        resumeText = await extractTextFromFile(file);
      } else if (file.type === 'text/html' || fileExt === '.html' || fileExt === '.htm') {
        const htmlText = await extractTextFromFile(file);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        resumeText = doc.body.textContent || '';
      } else {
        // For PDF/DOC files, read as text (best effort)
        resumeText = await extractTextFromFile(file);
      }

      if (!resumeText.trim()) {
        toast.error('Could not extract text from the file. Please try a .txt or .html file.', { id: 'resume-upload' });
        setIsLoading(false);
        return;
      }

      // Send to edge function for AI parsing
      const { data, error } = await supabase.functions.invoke('parse-resume', {
        body: { resumeText: resumeText.substring(0, 15000) }, // Limit text length
      });

      if (error) {
        throw new Error(error.message || 'Failed to parse resume');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const parsed = data?.data;
      if (!parsed) {
        throw new Error('No data extracted');
      }

      // Map parsed data to ResumeData format (excluding photo)
      const extractedData: Partial<ResumeData> = {
        contact: {
          fullName: parsed.fullName || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          location: parsed.location || '',
          linkedin: parsed.linkedin || '',
          github: parsed.github || '',
          website: parsed.website || '',
          profileImage: '', // Never import photo
        },
        careerObjective: {
          objective: parsed.objective || '',
        },
        education: (parsed.education || []).map((edu: any, i: number) => ({
          id: `imported-edu-${i}`,
          institution: edu.institution || '',
          degree: edu.degree || '',
          field: edu.field || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          gpa: edu.gpa || '',
        })),
        experience: (parsed.experience || []).map((exp: any, i: number) => ({
          id: `imported-exp-${i}`,
          company: exp.company || '',
          position: exp.position || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          current: exp.current || false,
          description: exp.description || '',
        })),
        projects: (parsed.projects || []).map((proj: any, i: number) => ({
          id: `imported-proj-${i}`,
          name: proj.name || '',
          description: proj.description || '',
          technologies: proj.technologies || '',
          link: proj.link || '',
        })),
        certifications: (parsed.certifications || []).map((cert: any, i: number) => ({
          id: `imported-cert-${i}`,
          name: cert.name || '',
          issuer: cert.issuer || '',
          date: cert.date || '',
          link: cert.link || '',
        })),
        skills: {
          technical: parsed.technicalSkills || [],
          soft: parsed.softSkills || [],
        },
        languages: parsed.languages || [],
        hobbies: parsed.hobbies || [],
        sports: parsed.sports || [],
        courses: parsed.courses || [],
        activities: (parsed.activities || []).map((act: any, i: number) => ({
          id: `imported-act-${i}`,
          type: act.type || 'extracurricular',
          title: act.title || '',
          description: act.description || '',
          date: act.date || '',
        })),
      };

      onDataExtracted(extractedData);
      toast.success('Resume details extracted successfully! Review and edit as needed.', { id: 'resume-upload' });
    } catch (error) {
      console.error('Resume upload error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to extract resume details',
        { id: 'resume-upload' }
      );
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.html,.htm,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
        id="resume-upload"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Parsing...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Import Resume
          </>
        )}
      </Button>
      <span className="text-xs text-muted-foreground hidden sm:inline">
        Upload .txt or .html to auto-fill
      </span>
    </div>
  );
};
