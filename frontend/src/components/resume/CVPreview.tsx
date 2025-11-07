import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

export function CVPreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleExport = () => {
    toast.success('Exporting CV to PDF...');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => navigate(`/cv/edit/${id}`)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            onClick={handleExport}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* CV Preview */}
      <div className="flex justify-center">
        <Card className="w-full max-w-[8.5in] rounded-xl shadow-lg border-gray-200 bg-white">
          <CardContent className="p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl text-[#1E293B] mb-2">John Doe</h1>
              <p className="text-lg text-gray-600 mb-4">Senior Software Developer</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>john.doe@example.com</span>
                <span>•</span>
                <span>+1 (555) 123-4567</span>
                <span>•</span>
                <span>linkedin.com/in/johndoe</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Professional Summary */}
            <div className="mb-6">
              <h2 className="text-xl text-[#6366F1] mb-3 uppercase tracking-wide">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Experienced software developer with 5+ years of expertise in full-stack development. 
                Proven track record of delivering high-quality solutions using React, Node.js, and cloud technologies. 
                Strong problem-solving abilities and a passion for continuous learning and innovation.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Work Experience */}
            <div className="mb-6">
              <h2 className="text-xl text-[#6366F1] mb-4 uppercase tracking-wide">
                Work Experience
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg text-[#1E293B]">Senior Developer</h3>
                      <p className="text-gray-600">Tech Corp</p>
                    </div>
                    <p className="text-sm text-gray-500">Jan 2022 - Present</p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Led development of scalable web applications using React and Node.js</li>
                    <li>Improved application performance by 40% through optimization techniques</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                    <li>Collaborated with cross-functional teams to deliver projects on time</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg text-[#1E293B]">Full Stack Developer</h3>
                      <p className="text-gray-600">Digital Solutions Inc</p>
                    </div>
                    <p className="text-sm text-gray-500">Jun 2019 - Dec 2021</p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Developed and maintained multiple client projects using modern frameworks</li>
                    <li>Implemented RESTful APIs and database solutions</li>
                    <li>Participated in agile development processes and sprint planning</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xl text-[#6366F1] mb-4 uppercase tracking-wide">
                Education
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg text-[#1E293B]">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-600">University of Technology</p>
                </div>
                <p className="text-sm text-gray-500">2015 - 2019</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Skills */}
            <div>
              <h2 className="text-xl text-[#6366F1] mb-3 uppercase tracking-wide">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Agile', 'Leadership'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
