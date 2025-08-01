import React from 'react';

import ErrorAlertIcon from '@/assets/errorAlert.svg?react';

interface ErrorMessageProps {
    message?: string;
    className?: string;
}

const ErrorMessage = ({ message = 'E90004', className = '' }: ErrorMessageProps) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <ErrorAlertIcon />
            <span className="text-9px-medium text-danger">{message}</span>
        </div>
    );
};

export default ErrorMessage;
