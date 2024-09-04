import React from "react";

const BlogPostSkeleton = () => {
    return (
        <div className="p-2 w-full">
            <div className="container mx-auto px-4 bg-gray-200 p-4 rounded-lg animate-pulse">
                <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div> {/* Skeleton for image */}
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div> {/* Skeleton for title */}
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div> {/* Skeleton for date */}
            </div>
        </div>
    );
};

export default BlogPostSkeleton;
