import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">문제가 발생했습니다</h1>
                    <p className="mb-4 text-gray-600">페이지를 불러오는 중 오류가 발생했습니다.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        페이지 새로고침
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
