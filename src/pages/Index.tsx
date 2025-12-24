import { useState } from 'react';
import { ResumeData, initialResumeData } from '@/types/resume';
import { ContactForm } from '@/components/resume/ContactForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ProjectsForm } from '@/components/resume/ProjectsForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { StepIndicator } from '@/components/resume/StepIndicator';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, Sparkles } from 'lucide-react';

const STEPS = ['Contact', 'Education', 'Skills', 'Projects', 'Experience', 'Template'];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPreview(true);
    }
  };

  const handlePrevious = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactForm
            data={resumeData.contact}
            onChange={(contact) => setResumeData({ ...resumeData, contact })}
          />
        );
      case 1:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        );
      case 2:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
        );
      case 3:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
        );
      case 4:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        );
      case 5:
        return (
          <TemplateSelector
            selected={resumeData.template}
            onChange={(template) => setResumeData({ ...resumeData, template })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-6xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-navy flex items-center justify-center shadow-card">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">ResumeCraft</span>
          </div>
          
          {!showPreview && (
            <div className="hidden md:block">
              <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />
            </div>
          )}

          {showPreview && (
            <span className="text-sm font-medium text-accent flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Preview Mode
            </span>
          )}
        </div>
        
        {/* Mobile Step Indicator */}
        {!showPreview && (
          <div className="md:hidden pb-3 px-4 overflow-x-auto">
            <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl py-8 px-4">
        {showPreview ? (
          <ResumePreview data={resumeData} />
        ) : (
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-6 md:p-8">
            {renderStep()}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 && !showPreview}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {showPreview ? 'Edit Resume' : 'Previous'}
          </Button>

          <Button
            variant={currentStep === STEPS.length - 1 && !showPreview ? 'accent' : 'default'}
            onClick={handleNext}
            className="gap-2"
          >
            {showPreview ? (
              <>
                Looks Great!
                <Sparkles className="h-4 w-4" />
              </>
            ) : currentStep === STEPS.length - 1 ? (
              <>
                Preview Resume
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-6xl py-6 text-center text-sm text-muted-foreground">
          <p>Create beautiful resumes in minutes. Download as PDF or HTML.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
