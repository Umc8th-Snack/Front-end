// TODO: Chip 컴포넌트가 레이아웃에 통합되면 이 파일 삭제하기
import { useState } from 'react';

import Chip from '../shared/components/Chip';

const categories = ['정치', '경제', '사회'];

const ChipTest = () => {
    const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

    const handleClick = (label: string) => {
        setSelectedSet((prev) => {
            const newSet = new Set(prev);
            newSet.has(label) ? newSet.delete(label) : newSet.add(label);
            return newSet;
        });
    };

    return (
        <div className="mt-4 flex gap-4">
            {categories.map((label) => (
                <Chip key={label} label={label} selected={selectedSet.has(label)} onClick={() => handleClick(label)} />
            ))}
        </div>
    );
};

export default ChipTest;
