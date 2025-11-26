import { Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { Education } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid nếu chưa có, hoặc dùng Math.random

interface Props {
    data: Education[];
    onChange: (data: Education[]) => void;
}

export function EducationSection({ data, onChange }: Props) {

    const addEducation = () => {
        const newEdu: Education = {
            id: uuidv4(),
            schoolName: 'Tên trường',
            degree: 'Bằng cấp',
            fieldOfStudy: 'Ngành học',
            startDate: '',
            endDate: '',
            description: ''
        };
        onChange([newEdu, ...data]); // Thêm lên đầu
    };

    const updateEducation = (index: number, field: keyof Education, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeEducation = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-4">
            <Button onClick={addEducation} variant="outline" className="w-full border-dashed border-2">
                <Plus className="w-4 h-4 mr-2" /> Thêm kinh nghiệm làm việc
            </Button>

            {data.map((edu, idx) => (
                <Card key={edu.id} className="relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-opacity"
                        onClick={() => removeEducation(edu.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <CardHeader className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <Input
                                value={edu.schoolName}
                                onChange={(e) => updateEducation(idx, 'schoolName', e.target.value)}
                                placeholder="Tên trường"
                                className="font-bold"
                            />
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                                placeholder="Bằng cấp"
                            />
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => updateEducation(idx, 'fieldOfStudy', e.target.value)}
                                placeholder="Chuyên ngành"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div className="flex gap-2 items-center w-full">
                                <Input
                                    type="date" // Hoặc text nếu muốn nhập tự do "Jan 2024"
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(idx, 'startDate', e.target.value)}
                                    className="w-1/2 text-sm"
                                />
                                <span>-</span>
                                <Input
                                    type="date"
                                    value={edu.endDate}
                                    placeholder="Present / Ngày kết thúc"
                                    onChange={(e) => updateEducation(idx, 'endDate', e.target.value)}
                                    className="w-1/2 text-sm"
                                />
                            </div>
                        </div>
                        <Textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(idx, 'description', e.target.value)}
                            placeholder="Mô tả công việc, thành tích đạt được..."
                            className="min-h-[100px]"
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}