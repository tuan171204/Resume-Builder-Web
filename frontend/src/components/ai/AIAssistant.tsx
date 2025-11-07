import { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Check, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

interface AIAssistantProps {
  context: string;
  onAccept: (text: string) => void;
  onClose: () => void;
}

export function AIAssistant({ context, onAccept, onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [role, setRole] = useState('developer');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; timestamp: string }>>([
    {
      text: 'Kỹ sư phần mềm senior với hơn 5 năm kinh nghiệm phát triển full-stack...',
      timestamp: '2 giờ trước'
    }
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockText = context === 'summary'
        ? `${role === 'developer' ? 'Lập trình viên' : role === 'designer' ? 'Nhà thiết kế' : 'Chuyên gia'} có kinh nghiệm với thành tích xuất sắc trong việc cung cấp giải pháp chất lượng cao. Thành thạo các công nghệ và framework hiện đại, với khả năng giải quyết vấn đề mạnh mẽ và niềm đam mê học hỏi liên tục. Có chuyên môn được chứng minh trong xây dựng ứng dụng có khả năng mở rộng và dẫn dắt đội ngũ phát triển đạt thành công.`
        : `• Dẫn dắt phát triển các giải pháp sáng tạo sử dụng công nghệ tiên tiến\n• Hợp tác với các đội ngũ liên chức năng để giao dự án đúng hạn\n• Triển khai các thực hành tốt nhất và cải thiện chất lượng mã 40%\n• Hướng dẫn các lập trình viên junior và thực hiện đánh giá mã`;
      
      setGeneratedText(mockText);
      setHistory([{ text: mockText, timestamp: 'Vừa xong' }, ...history]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    setGeneratedText('');
    handleGenerate();
  };

  const handleAccept = () => {
    onAccept(generatedText);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Trình tạo nội dung AI
          </DialogTitle>
          <DialogDescription>
            Tạo nội dung chuyên nghiệp cho CV của bạn bằng AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mô tả kinh nghiệm hoặc yêu cầu của bạn</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  context === 'summary'
                    ? "Ví dụ: Tôi là lập trình viên với 5 năm kinh nghiệm về React và Node.js..."
                    : "Ví dụ: Dẫn dắt đội ngũ 5 lập trình viên xây dựng nền tảng thương mại điện tử..."
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Loại vai trò</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Lập trình viên</SelectItem>
                  <SelectItem value="designer">Nhà thiết kế</SelectItem>
                  <SelectItem value="manager">Quản lý Sản phẩm</SelectItem>
                  <SelectItem value="marketer">Chuyên viên Marketing</SelectItem>
                  <SelectItem value="analyst">Chuyên viên Phân tích Dữ liệu</SelectItem>
                  <SelectItem value="engineer">Kỹ sư</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Tạo bằng AI
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          {generatedText && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Nội dung đã tạo</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRegenerate}
                    className="gap-2 text-[#6366F1]"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Tạo lại
                  </Button>
                </div>
                
                <Card className="bg-gradient-to-r from-[#6366F1]/5 to-[#8B5CF6]/5 border-[#6366F1]/20">
                  <CardContent className="pt-6">
                    <p className="text-sm text-[#1E293B] whitespace-pre-wrap leading-relaxed">
                      {generatedText}
                    </p>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Chấp nhận & Áp dụng
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* History Section */}
          {history.length > 0 && !isGenerating && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Nội dung đã tạo gần đây
                </Label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {history.slice(0, 3).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setGeneratedText(item.text)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#6366F1] hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm text-[#1E293B] line-clamp-2 mb-1">
                        {item.text}
                      </p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
