import { useEffect, useMemo, useRef, useState } from 'react';

import ToggleSwitch from '@/shared/components/button/ToggleSwitch';

function useSplitFirstLine(text: string, font: string, maxWidth: number) {
    const [first, setFirst] = useState<string>('');
    const [rest, setRest] = useState<string>('');

    useEffect(() => {
        if (!text) {
            setFirst('');
            setRest('');
            return;
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setFirst(text);
            setRest('');
            return;
        }
        ctx.font = font;

        const words = text.split(' ');
        let line = '';
        let idx = 0;
        for (; idx < words.length; idx++) {
            const next = line ? `${line} ${words[idx]}` : words[idx];
            if (ctx.measureText(next).width <= maxWidth) line = next;
            else break;
        }
        setFirst(line || words[0] || '');
        setRest(words.slice(line ? idx : 1).join(' '));
    }, [text, font, maxWidth]);

    return { first, rest };
}

export default function TitleWithToggle({
    title,
    onToggleChange,
    checked = false,
}: {
    title: string;
    onToggleChange: (v: boolean) => void;
    checked?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setWidth(el.clientWidth));
        ro.observe(el);
        setWidth(el.clientWidth);
        return () => ro.disconnect();
    }, []);

    const font = useMemo(() => 'text-36px-semibold', []);
    const { first, rest } = useSplitFirstLine(title, font, width);

    return (
        <div ref={containerRef} className="w-full">
            {/* 첫 줄 전체 */}
            <h1 className="text-36px-semibold col-span-2 leading-tight">{first}</h1>

            {/* 두 번째 줄 + 토글 */}
            <div className="grid grid-cols-[1fr_auto] gap-4">
                <span className="text-36px-semibold self-center leading-none break-words">{rest}</span>
                <div className="mt-[-40px] flex items-center gap-2 self-center">
                    <span className="text-20px-medium text-black-70 leading-none">메모장</span>
                    <ToggleSwitch onChange={onToggleChange} checked={checked} />
                </div>
            </div>
        </div>
    );
}
