import ErrorAlertIcon from '@/assets/errorAlert.svg?react';

interface ErrorMessageProps {
    message?: string;
    className?: string;
}

const ErrorMessage = ({ message = 'E90004', className = '' }: ErrorMessageProps) => {
    return (
        <div className={`flex items-center gap-0.5 ${className}`}>
            <ErrorAlertIcon />
            <span className="text-danger text-[9px]">{message}</span>
        </div>
    );
};

export default ErrorMessage;
