import { useState } from 'react';
import { Download, FileText, Clock, CheckCircle, XCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';

interface ExportJob {
  id: string;
  cvName: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  createdAt: string;
  fileUrl?: string;
  progress?: number;
}

export function ExportHistory() {
  const [selectedJob, setSelectedJob] = useState<ExportJob | null>(null);
  const [exports] = useState<ExportJob[]>([
    {
      id: '1',
      cvName: 'Senior Developer Resume',
      status: 'done',
      createdAt: '2 hours ago',
      fileUrl: '/downloads/senior-developer-resume.pdf'
    },
    {
      id: '2',
      cvName: 'Full Stack Portfolio',
      status: 'processing',
      createdAt: '5 minutes ago',
      progress: 65
    },
    {
      id: '3',
      cvName: 'Product Manager CV',
      status: 'done',
      createdAt: '1 day ago',
      fileUrl: '/downloads/product-manager-cv.pdf'
    },
    {
      id: '4',
      cvName: 'Technical Lead Resume',
      status: 'pending',
      createdAt: '10 minutes ago'
    },
    {
      id: '5',
      cvName: 'Backend Developer CV',
      status: 'failed',
      createdAt: '3 days ago'
    },
    {
      id: '6',
      cvName: 'Frontend Specialist Resume',
      status: 'done',
      createdAt: '5 days ago',
      fileUrl: '/downloads/frontend-specialist-resume.pdf'
    }
  ]);

  const getStatusBadge = (status: ExportJob['status']) => {
    switch (status) {
      case 'done':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Done
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
    }
  };

  const handleDownload = (job: ExportJob) => {
    if (job.fileUrl) {
      toast.success(`Downloading ${job.cvName}...`);
    }
  };

  const handleRetry = (job: ExportJob) => {
    toast.success(`Retrying export for ${job.cvName}...`);
  };

  const handleCancel = (job: ExportJob) => {
    toast.success('Export cancelled');
    setSelectedJob(null);
  };

  const handleViewDetails = (job: ExportJob) => {
    setSelectedJob(job);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#1E293B] mb-2">Export History</h1>
        <p className="text-gray-600">View and manage your CV export jobs</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Exports</p>
                <p className="text-2xl text-[#6366F1]">{exports.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#6366F1]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl text-green-600">
                  {exports.filter(e => e.status === 'done').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl text-blue-600">
                  {exports.filter(e => e.status === 'processing' || e.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl text-red-600">
                  {exports.filter(e => e.status === 'failed').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export History Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>View and download your exported CVs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CV Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exports.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-[#1E293B]">{job.cvName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell className="text-gray-600">{job.createdAt}</TableCell>
                  <TableCell>
                    {job.status === 'processing' && job.progress ? (
                      <div className="flex items-center gap-2">
                        <Progress value={job.progress} className="w-24" />
                        <span className="text-sm text-gray-600">{job.progress}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {job.status === 'done' && job.fileUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(job)}
                          className="gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      )}
                      {job.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetry(job)}
                          className="gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Retry
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetails(job)}
                        className="gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Details Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Details</DialogTitle>
              <DialogDescription>
                View detailed information about this export job
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">CV Name</p>
                <p className="text-[#1E293B]">{selectedJob.cvName}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Status</p>
                <div>{getStatusBadge(selectedJob.status)}</div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Created At</p>
                <p className="text-[#1E293B]">{selectedJob.createdAt}</p>
              </div>

              {selectedJob.status === 'processing' && selectedJob.progress && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Progress</p>
                  <div className="space-y-2">
                    <Progress value={selectedJob.progress} />
                    <p className="text-sm text-gray-600">{selectedJob.progress}% complete</p>
                  </div>
                </div>
              )}

              {selectedJob.status === 'done' && selectedJob.fileUrl && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Download Link</p>
                  <Button
                    onClick={() => handleDownload(selectedJob)}
                    className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              )}

              {selectedJob.status === 'processing' && (
                <Button
                  variant="outline"
                  onClick={() => handleCancel(selectedJob)}
                  className="w-full"
                >
                  Cancel Export
                </Button>
              )}

              {selectedJob.status === 'failed' && (
                <Button
                  onClick={() => handleRetry(selectedJob)}
                  className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Export
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
