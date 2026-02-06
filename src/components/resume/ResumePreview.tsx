import { useRef } from 'react';
import { ResumeData } from '@/types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast.loading('Generating PDF...', { id: 'pdf-generation' });

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.contact.fullName || 'resume'}.pdf`);

      toast.success('PDF downloaded successfully!', { id: 'pdf-generation' });
    } catch (error) {
      toast.error('Failed to generate PDF', { id: 'pdf-generation' });
      console.error('PDF generation error:', error);
    }
  };

  const handleDownloadHTML = () => {
    if (!resumeRef.current) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.contact.fullName || 'Resume'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-[210mm] mx-auto shadow-xl">
    ${resumeRef.current.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.contact.fullName || 'resume'}.html`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('HTML downloaded successfully!');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-display font-semibold text-foreground">Preview</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadHTML}>
            <FileText className="h-4 w-4 mr-1" />
            HTML
          </Button>
          <Button variant="accent" size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-muted p-4 rounded-xl">
        <div
          className="bg-card rounded-lg shadow-elegant overflow-hidden mx-auto"
          style={{ width: '100%', maxWidth: '210mm' }}
        >
          <div
            ref={resumeRef}
            className="w-full"
          >
            {data.template === 'classic' ? (
              <ClassicTemplate data={data} />
            ) : (
              <ModernTemplate data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
