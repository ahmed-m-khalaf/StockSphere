export default function SkeletonCard({ className = '' }) {
    return (
        <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse ${className}`}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="h-5 w-16 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                </div>
                <div className="h-6 w-14 bg-gray-200 rounded-full" />
            </div>
            <div className="h-7 w-20 bg-gray-200 rounded mt-3" />
        </div>
    );
}

export function SkeletonTable({ rows = 4 }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="bg-gray-50 h-12 border-b border-gray-100" />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center px-6 py-4 border-b border-gray-50 last:border-0">
                    <div className="h-4 w-16 bg-gray-200 rounded mr-8" />
                    <div className="h-4 w-32 bg-gray-100 rounded mr-auto" />
                    <div className="h-4 w-20 bg-gray-200 rounded mr-8" />
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
            ))}
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
            <div className="h-64 bg-gray-100 rounded-xl" />
        </div>
    );
}
