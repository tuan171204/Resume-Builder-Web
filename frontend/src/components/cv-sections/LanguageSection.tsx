import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import type { Language } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    data: Language[];
    onChange: (data: Language[]) => void;
}

export function LanguageSection({ data, onChange }: Props) {
    const addLang = () => {
        onChange([...data, { id: uuidv4(), language: '', level: '' }]);
    };

    const updateLang = (index: number, field: keyof Language, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const removeLang = (id: string) => onChange(data.filter(l => l.id !== id));

    return (
        <div className="space-y-4">
            <Button onClick={addLang} variant="outline" className="w-full border-dashed border-2">
                <Plus className="w-4 h-4 mr-2" /> Thêm ngôn ngữ
            </Button>
            {data.map((lang, idx) => (
                <Card key={lang.id}>
                    <CardContent className="p-4 flex gap-3 items-center">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <Input
                                placeholder="Ngôn ngữ (VD: Tiếng Anh)"
                                value={lang.language}
                                onChange={(e) => updateLang(idx, 'language', e.target.value)}
                            />
                            <Input
                                placeholder="Trình độ (VD: IELTS 7.0)"
                                value={lang.level}
                                onChange={(e) => updateLang(idx, 'level', e.target.value)}
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeLang(lang.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}