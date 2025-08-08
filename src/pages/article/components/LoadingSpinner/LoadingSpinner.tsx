interface LoadingSpinnerProps {
    headerHeight?: number;
}

const LoadingSpinner = ({ headerHeight = 64 }: LoadingSpinnerProps) => {
    return (
        <div
            className="flex w-full items-center justify-center"
            style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        >
            <div className="relative h-20 w-20">
                <div className="border-t-main absolute inset-0 animate-spin rounded-full border-6 border-[#ffd760] shadow-sm" />
            </div>
        </div>
    );
};

export default LoadingSpinner;
