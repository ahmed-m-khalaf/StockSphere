export default function LoadingSpinner({ size = 'md', text = '' }) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-10 h-10',
        lg: 'w-14 h-14',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`relative ${sizeClasses[size]}`}>
                
                {/* Outer soft glow ring */}
                <div className="
                    absolute inset-0 rounded-full 
                    bg-gradient-to-tr from-primary-300/20 to-primary-600/30 
                    blur-md animate-pulse
                " />

                {/* Main ring */}
                <div className="
                    absolute inset-0 border-4 border-primary-200 
                    rounded-full
                " />

                {/* Animated top segment */}
                <div className="
                    absolute inset-0 border-4 border-t-primary-600 
                    border-r-transparent border-b-transparent border-l-transparent
                    rounded-full animate-spin
                " />
            </div>

            {text && (
                <p className="text-sm text-gray-600 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}
