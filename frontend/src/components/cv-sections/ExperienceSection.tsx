import { Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { Experience } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid nếu chưa có, hoặc dùng Math.random

interface Props {
    data: Experience[];
    onChange: (data: Experience[]) => void;
}

export function ExperienceSection({ data, onChange }: Props) {

    const addExperience = () => {
        const newExp: Experience = {
            id: uuidv4(),
            position: 'Vị trí',
            companyName: 'Tên công ty',
            startDate: '',
            endDate: '',
            description: ''
        };
        onChange([newExp, ...data]); // Thêm lên đầu
    };

    const updateExperience = (index: number, field: keyof Experience, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeExperience = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-4">
            <Button onClick={addExperience} variant="outline" className="w-full border-dashed border-2">
                <Plus className="w-4 h-4 mr-2" /> Thêm kinh nghiệm làm việc
            </Button>

            {data.map((exp, idx) => (
                <Card key={exp.id} className="relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-opacity"
                        onClick={() => removeExperience(exp.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <CardHeader className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(idx, 'position', e.target.value)}
                                placeholder="Chức danh / Vị trí"
                                className="font-bold"
                            />
                            <Input
                                value={exp.companyName}
                                onChange={(e) => updateExperience(idx, 'companyName', e.target.value)}
                                placeholder="Tên công ty"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div className="flex gap-2 items-center w-full">
                                <Input
                                    type="date" // Hoặc text nếu muốn nhập tự do "Jan 2024"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(idx, 'startDate', e.target.value)}
                                    className="w-1/2 text-sm"
                                />
                                <span>-</span>
                                <Input
                                    type="date"
                                    value={exp.endDate}
                                    placeholder="Present / Ngày kết thúc"
                                    onChange={(e) => updateExperience(idx, 'endDate', e.target.value)}
                                    className="w-1/2 text-sm"
                                />
                            </div>
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                            placeholder="Mô tả công việc, thành tích đạt được..."
                            className="min-h-[100px]"
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}