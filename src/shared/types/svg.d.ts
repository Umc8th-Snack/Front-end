declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
} //.svg 파일을 불러올 때 ReactComponent로 사용할 수 있다고 명시
