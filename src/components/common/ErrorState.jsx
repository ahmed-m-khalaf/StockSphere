import { Link } from 'react-router-dom';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops!</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
            <div className="flex gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        Try Again
                    </button>
                )}
                <Link
                    to="/"
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
