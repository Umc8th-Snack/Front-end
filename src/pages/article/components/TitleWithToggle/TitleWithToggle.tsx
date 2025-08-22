import { useEffect, useMemo, useRef, useState } from 'react';

function useSplitFirstLine(text: string, font: string, maxWidth: number) {
    const [first, setFirst] = useState('');
    const [rest, setRest] = useState('');

    useEffect(() => {
        if (!text || !maxWidth) {
            setFirst(text || '');
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

export default function TitleWithToggle({ title }: { title: string }) {
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
            <h1 className="text-24px-semibold md:text-28px-semibold lg:text-36px-semibold col-span-2 leading-tight">
                {first}
            </h1>

            {rest && (
                <div>
                    <span className="text-24px-semibold md:text-28px-semibold lg:text-36px-semibold leading-none break-words">
                        {rest}
                    </span>
                </div>
            )}
        </div>
    );
}
