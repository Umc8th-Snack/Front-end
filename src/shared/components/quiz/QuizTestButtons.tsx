interface QuizTestButtonsProps {
    testMode: 'allCorrect' | 'partialCorrect' | 'allWrong';
    onTestModeChange: (mode: 'allCorrect' | 'partialCorrect' | 'allWrong') => void;
}

const QuizTestButtons = ({ testMode, onTestModeChange }: QuizTestButtonsProps) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <button
                onClick={() => onTestModeChange('allCorrect')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    testMode === 'allCorrect'
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
                모두 맞춤
            </button>
            <button
                onClick={() => onTestModeChange('partialCorrect')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    testMode === 'partialCorrect'
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
                일부 맞춤
            </button>
            <button
                onClick={() => onTestModeChange('allWrong')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    testMode === 'allWrong'
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
                모두 틀림
            </button>
        </div>
    );
};

export default QuizTestButtons;
