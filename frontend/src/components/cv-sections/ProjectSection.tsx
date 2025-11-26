import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import type { Project } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    data: Project[];
    onChange: (data: Project[]) => void;
}

export function ProjectSection({ data, onChange }: Props) {

    const addProject = () => {
        onChange([{
            id: uuidv4(), name: 'Tên dự án', description: '',
            startDate: '', endDate: '', technologies: []
        }, ...data]);
    };

    const updateProject = (index: number, field: keyof Project, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeProject = (id: string) => onChange(data.filter(item => item.id !== id));

    // Hàm thêm công nghệ (Skill tag)
    const addTech = (index: number, tech: string) => {
        if (!tech.trim()) return;
        const currentTechs = data[index].technologies || [];
        updateProject(index, 'technologies', [...currentTechs, tech]);
    };

    const removeTech = (projIndex: number, techIndex: number) => {
        const currentTechs = [...data[projIndex].technologies];
        currentTechs.splice(techIndex, 1);
        updateProject(projIndex, 'technologies', currentTechs);
    };

    return (
        <div className="space-y-4">
            <Button onClick={addProject} variant="outline" className="w-full border-dashed border-2">
                <Plus className="w-4 h-4 mr-2" /> Thêm dự án
            </Button>

            {data.map((proj, idx) => (
                <Card key={proj.id} className="relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100" onClick={() => removeProject(proj.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardHeader className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <Input value={proj.name} onChange={e => updateProject(idx, 'name', e.target.value)} placeholder="Tên dự án" className="font-bold" />
                            <div className="flex gap-2 items-center">
                                <Input value={proj.startDate} onChange={e => updateProject(idx, 'startDate', e.target.value)} placeholder="Bắt đầu" className="text-sm" />
                                <span>-</span>
                                <Input value={proj.endDate} onChange={e => updateProject(idx, 'endDate', e.target.value)} placeholder="Kết thúc" className="text-sm" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Textarea value={proj.description} onChange={e => updateProject(idx, 'description', e.target.value)} placeholder="Mô tả dự án..." />

                        {/* Tech Tags Input */}
                        <div>
                            <Input
                                placeholder="Nhập công nghệ sử dụng và nhấn Enter (VD: React, Node.js)..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTech(idx, e.currentTarget.value);
                                        e.currentTarget.value = '';
                                    }
                                }}
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {proj.technologies?.map((tech, tIdx) => (
                                    <Badge key={tIdx} variant="secondary" className="gap-1 pr-1">
                                        {tech}
                                        <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTech(idx, tIdx)} />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}